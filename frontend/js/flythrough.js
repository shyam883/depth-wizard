/**
 * DEPTH WIZARD — Cinematic 3D Drone Flythrough Engine
 * Generates dynamic 3D spline trajectories over reconstructed scenes
 * and drives the real-time Drone HUD Flight Telemetry.
 */

window.FlythroughEngine = {
  isPlaying: false,
  progress: 0.0,
  speed: 0.0015,
  cameraAltitudeOffset: 12.0,
  curve: null,
  lookAtCurve: null,
  hudElements: {},
  onHudUpdateCallback: null,

  init(hudElementIds = {}) {
    this.hudElements = hudElementIds;
  },

  buildFlightPath(scenario) {
    // Generate an elliptical Catmull-Rom spline path with altitude variations
    const points = [
      new THREE.Vector3(-35, 18 + this.cameraAltitudeOffset, 30),
      new THREE.Vector3(-15, 12 + this.cameraAltitudeOffset, 10),
      new THREE.Vector3(10, 15 + this.cameraAltitudeOffset, -15),
      new THREE.Vector3(30, 22 + this.cameraAltitudeOffset, 0),
      new THREE.Vector3(20, 16 + this.cameraAltitudeOffset, 25),
      new THREE.Vector3(-10, 14 + this.cameraAltitudeOffset, 35)
    ];

    const lookTargets = [
      new THREE.Vector3(-10, 6, 15),
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(15, 8, -5),
      new THREE.Vector3(10, 5, 10),
      new THREE.Vector3(-5, 7, 10),
      new THREE.Vector3(-15, 5, 20)
    ];

    this.curve = new THREE.CatmullRomCurve3(points, true);
    this.lookAtCurve = new THREE.CatmullRomCurve3(lookTargets, true);
    this.progress = 0.0;
  },

  start() {
    if (!this.curve) this.buildFlightPath();
    this.isPlaying = true;
    if (window.ThreeViewer && window.ThreeViewer.controls) {
      window.ThreeViewer.controls.enabled = false;
    }
  },

  pause() {
    this.isPlaying = false;
  },

  stop() {
    this.isPlaying = false;
    this.progress = 0.0;
    if (window.ThreeViewer && window.ThreeViewer.controls) {
      window.ThreeViewer.controls.enabled = true;
    }
  },

  setSpeed(val) {
    this.speed = parseFloat(val);
  },

  setAltitude(val) {
    this.cameraAltitudeOffset = parseFloat(val);
    this.buildFlightPath();
  },

  update(delta = 16) {
    if (!this.isPlaying || !this.curve || !window.ThreeViewer || !window.ThreeViewer.camera) return;

    this.progress = (this.progress + this.speed) % 1.0;

    const camPos = this.curve.getPointAt(this.progress);
    const lookTarget = this.lookAtCurve.getPointAt(this.progress);

    window.ThreeViewer.camera.position.copy(camPos);
    window.ThreeViewer.camera.lookAt(lookTarget);

    // Update HUD Telemetry
    const altitudeM = Math.round(camPos.y * 1.8);
    const relElevM = Math.round((camPos.y - 12) * 1.2);
    const distTraveledKm = (this.progress * 2.8).toFixed(2);
    const speedKmh = Math.round(this.speed * 18000);
    const headingDeg = Math.round((this.progress * 360) % 360);

    const telemetry = {
      altitudeM,
      relElevM,
      distTraveledKm,
      speedKmh,
      headingDeg,
      confidence: 84 + Math.round(Math.sin(this.progress * 20) * 4),
      visibleStructures: 6
    };

    if (this.onHudUpdateCallback) {
      this.onHudUpdateCallback(telemetry);
    }
  }
};

// Hook flythrough update to main ThreeViewer animation loop
(function hookFlythrough() {
  const checkInterval = setInterval(() => {
    if (window.ThreeViewer && window.ThreeViewer.animate) {
      const origAnimate = window.ThreeViewer.animate.bind(window.ThreeViewer);
      window.ThreeViewer.animate = function () {
        origAnimate();
        window.FlythroughEngine.update();
      };
      clearInterval(checkInterval);
    }
  }, 100);
})();
