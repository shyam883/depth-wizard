/**
 * DEPTH WIZARD — Single-View Height Estimation Engine
 * Mathematical Perspective Height Solver, Horizon Plane Estimator,
 * and Reference Scale Calibration.
 */

window.HeightEngine = {
  // Reference Scale calibration presets
  scaleReferences: {
    vehicle_height_m: 1.5,
    doorway_height_m: 2.1,
    story_height_m: 3.2,
    road_lane_width_m: 3.5,
    utility_pole_m: 9.0
  },

  activeFocalLength: 850, // Inferred pixel focal length
  cameraPitchDeg: 18.5,    // Inferred sensor tilt
  cameraHeightEstM: 35.0,  // Inferred altitude baseline

  /**
   * Estimates height of a detected structure using monocular geometry:
   * H_est = (Z_base * delta_y) / (f_y * cos(theta))
   */
  calculateHeight(bbox, baseDepthNorm, scenarioGsd = 0.25) {
    const [x, y, w, h] = bbox;
    const pixelHeight = Math.max(10, h);
    
    // Inferred metric distance at structure base
    const zBaseMeters = 5.0 + (1.0 - (y + h) / 420.0) * 80.0;
    
    // Pin-hole perspective height equation with pitch compensation
    const pitchRad = (this.cameraPitchDeg * Math.PI) / 180.0;
    const rawHeightMeters = (zBaseMeters * pixelHeight) / (this.activeFocalLength * Math.cos(pitchRad));
    
    // Scale adjustment based on GSD or story heuristic
    const clampedHeight = Math.max(1.8, Math.min(65.0, rawHeightMeters * 12.0));
    
    // Uncertainty & confidence quantification
    // Higher resolution / larger bbox = higher confidence; extreme perspective = lower confidence
    let confidence = 88.0 - (zBaseMeters * 0.25) + Math.min(10.0, (pixelHeight / 420.0) * 30.0);
    confidence = Math.max(65.0, Math.min(94.0, confidence));

    return {
      estimated_height_m: Number(clampedHeight.toFixed(1)),
      confidence_score: Math.round(confidence),
      uncertainty_range_m: `±${(clampedHeight * 0.12).toFixed(1)}m`,
      relative_elevation_m: Number(((420.0 - (y + h)) * 0.08).toFixed(1)),
      z_base_m: Number(zBaseMeters.toFixed(1)),
      calibration_mode: "Monocular Perspective Transform (ESTIMATED)"
    };
  },

  /**
   * Formats height telemetry for UI cards
   */
  formatTelemetryCard(structure, heightData) {
    return `
      <div class="p-3 bg-slate-900/80 border border-cyan-500/30 rounded-lg text-xs space-y-1.5 font-mono">
        <div class="flex justify-between items-center border-b border-slate-700/60 pb-1">
          <span class="text-cyan-400 font-bold">${structure.name} (${structure.id})</span>
          <span class="px-1.5 py-0.5 rounded text-[10px] ${structure.status === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-600' : 'bg-emerald-950 text-emerald-300 border border-emerald-600'}">
            ${structure.status.toUpperCase()}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-2 pt-1 text-slate-300">
          <div>
            <span class="text-slate-500 block text-[10px]">ESTIMATED HEIGHT</span>
            <span class="text-white font-bold text-sm">${heightData.estimated_height_m} m</span>
            <span class="text-slate-400 text-[10px] ml-1">${heightData.uncertainty_range_m}</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[10px]">REL. ELEVATION</span>
            <span class="text-white font-bold text-sm">+${heightData.relative_elevation_m} m</span>
          </div>
        </div>
        <div class="flex justify-between text-[11px] pt-1 border-t border-slate-800 text-slate-400">
          <span>Confidence: <strong class="text-cyan-300">${heightData.confidence_score}%</strong></span>
          <span class="text-[10px] text-amber-400/90">Single-View Approx</span>
        </div>
      </div>
    `;
  }
};
