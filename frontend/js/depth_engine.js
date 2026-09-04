/**
 * DEPTH WIZARD — Client-Side Monocular Depth Estimation Engine
 * Implements real-time luminance-gradient fusion, edge disparity extraction,
 * multi-colormap transforms, and interactive depth probe sampling.
 */

window.DepthEngine = {
  activeColormap: "turbo",
  cachedDepthBuffer: null, // Float32Array normalized [0..1]
  cachedWidth: 0,
  cachedHeight: 0,

  /**
   * Processes an HTMLImageElement or HTMLCanvasElement to extract a monocular depth field.
   * @param {HTMLImageElement|HTMLCanvasElement} sourceElement
   * @param {Object} options
   * @returns {HTMLCanvasElement} depthCanvas
   */
  estimateDepth(sourceElement, options = {}) {
    const width = options.width || 640;
    const height = options.height || 420;
    const colormap = options.colormap || this.activeColormap;
    const focalBias = options.focalBias || 1.0;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
    tempCtx.drawImage(sourceElement, 0, 0, width, height);

    const imgData = tempCtx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const totalPixels = width * height;

    this.cachedDepthBuffer = new Float32Array(totalPixels);
    this.cachedWidth = width;
    this.cachedHeight = height;

    // 1. Calculate luminance and gradients
    const grayBuffer = new Float32Array(totalPixels);
    for (let i = 0; i < totalPixels; i++) {
      const idx = i * 4;
      grayBuffer[i] = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255.0;
    }

    // 2. Monocular depth synthesis combining perspective vanishing line, atmospheric haze & high-frequency edges
    for (let y = 0; y < height; y++) {
      const perspectiveGradient = Math.pow(y / height, 1.2 * focalBias); // Near at bottom, far at top
      
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        const gray = grayBuffer[i];

        // Edge gradient approximation (Sobel-lite)
        let edge = 0;
        if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
          const dx = grayBuffer[i + 1] - grayBuffer[i - 1];
          const dy = grayBuffer[i + width] - grayBuffer[i - width];
          edge = Math.sqrt(dx * dx + dy * dy);
        }

        // Depth formulation: Blend perspective geometric prior, inverse luminance, and structural contrast
        let rawDepth = 0.60 * perspectiveGradient + 0.25 * (1.0 - gray) + 0.15 * Math.min(1.0, edge * 3.0);
        this.cachedDepthBuffer[i] = Math.max(0.0, Math.min(1.0, rawDepth));
      }
    }

    // 3. Render colormapped depth map onto output canvas
    const depthCanvas = document.createElement("canvas");
    depthCanvas.width = width;
    depthCanvas.height = height;
    const depthCtx = depthCanvas.getContext("2d");
    const outImgData = depthCtx.createImageData(width, height);
    const outData = outImgData.data;

    for (let i = 0; i < totalPixels; i++) {
      const depthVal = this.cachedDepthBuffer[i];
      const rgb = this.getColormapRGB(depthVal, colormap);
      const outIdx = i * 4;
      outData[outIdx] = rgb[0];
      outData[outIdx + 1] = rgb[1];
      outData[outIdx + 2] = rgb[2];
      outData[outIdx + 3] = 255;
    }

    depthCtx.putImageData(outImgData, 0, 0);
    return depthCanvas;
  },

  /**
   * Samples depth at normalized coordinates (u, v) in range [0..1]
   * Returns estimated distance in relative meters.
   */
  sampleDepthAt(normX, normY, maxScaleMeters = 45.0) {
    if (!this.cachedDepthBuffer) return { depthNorm: 0.5, meters: 22.5, elevationRel: 5.0 };
    
    const x = Math.floor(Math.max(0, Math.min(1, normX)) * (this.cachedWidth - 1));
    const y = Math.floor(Math.max(0, Math.min(1, normY)) * (this.cachedHeight - 1));
    const idx = y * this.cachedWidth + x;
    const depthNorm = this.cachedDepthBuffer[idx] || 0.5;

    // Convert normalized disparity to metric estimate
    const meters = 2.0 + depthNorm * maxScaleMeters;
    const elevationRel = (1.0 - normY) * 18.0 + (depthNorm * 6.0);

    return {
      depthNorm: Number(depthNorm.toFixed(3)),
      meters: Number(meters.toFixed(1)),
      elevationRel: Number(elevationRel.toFixed(1))
    };
  },

  /**
   * Maps a [0..1] value to [r, g, b]
   */
  getColormapRGB(t, colormap = "turbo") {
    t = Math.max(0.0, Math.min(1.0, t));
    
    if (colormap === "turbo") {
      const r = Math.min(255, Math.max(0, 34.61 + t * (1172.33 + t * (-10793.56 + t * (33300.12 + t * (-38394.49 + t * 14825.05))))));
      const g = Math.min(255, Math.max(0, 23.31 + t * (557.33 + t * (1225.33 + t * (-3574.96 + t * (1073.77 + t * 707.56))))));
      const b = Math.min(255, Math.max(0, 27.2 + t * (3211.1 - t * (15327.97 - t * (27814.0 - t * (22569.18 - t * 6838.66))))));
      return [Math.round(r), Math.round(g), Math.round(b)];
    } else if (colormap === "spectral") {
      const x = t * 4.0;
      const r = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(x - 3.0))));
      const g = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(x - 2.0))));
      const b = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(x - 1.0))));
      return [Math.round(r), Math.round(g), Math.round(b)];
    } else if (colormap === "viridis") {
      const r = Math.round(255 * (0.28 + 0.72 * t * t));
      const g = Math.round(255 * (0.05 + 0.9 * t));
      const b = Math.round(255 * (0.35 + 0.65 * (1.0 - Math.abs(t - 0.5) * 2)));
      return [r, g, b];
    } else if (colormap === "inferno") {
      const r = Math.round(Math.min(255, 255 * Math.pow(t, 0.7) * 1.2));
      const g = Math.round(Math.min(255, 255 * Math.pow(t, 1.8)));
      const b = Math.round(Math.min(255, 255 * Math.sin(t * Math.PI * 0.9)));
      return [r, g, b];
    } else {
      // Grayscale
      const v = Math.round(t * 255);
      return [v, v, v];
    }
  }
};
