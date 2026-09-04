/**
 * DEPTH WIZARD — SIH 2026 Judge "Wow Moment" Guided Tour
 * Sequenced 8-Step Interactive Presentation Walkthrough
 */

window.JudgeTour = {
  currentStep: 0,
  isActive: false,

  steps: [
    {
      step: 1,
      title: "Step 1: Input 2D RGB Image",
      badge: "NO LiDAR / NO DRONE DATA",
      description: "Judge loads an ordinary single 2D aerial or street image. The system validates pixel matrix and confirms: 'No LiDAR detected. No multi-view stereo required.'",
      action: () => {
        if (window.App) window.App.switchTab("console");
      }
    },
    {
      step: 2,
      title: "Step 2: AI Pipeline Execution",
      badge: "LATENCY < 450ms",
      description: "Monocular depth estimation transforms raw RGB into continuous disparity field using transformer-based architectural priors.",
      action: () => {
        if (window.App) window.App.runPipelineAnimation();
      }
    },
    {
      step: 3,
      title: "Step 3: Depth Map Visualization",
      badge: "TURBO / SPECTRAL WIPES",
      description: "Explore the interactive RGB <-> Depth slider and colormaps. Visualizing near-to-far relief contours in high clarity.",
      action: () => {
        if (window.App) {
          window.App.switchTab("console");
          const slider = document.getElementById("rgb-depth-slider");
          if (slider) { slider.value = 50; slider.dispatchEvent(new Event("input")); }
        }
      }
    },
    {
      step: 4,
      title: "Step 4: 3D Scene Reconstruction",
      badge: "THREE.JS WEBGL 60FPS",
      description: "The 2D image instantly lifts into an interactive 3D terrain heightfield with 100,000+ RGB point cloud particles and extruded buildings.",
      action: () => {
        if (window.App) window.App.switchTab("scene3d");
      }
    },
    {
      step: 5,
      title: "Step 5: Autonomous 3D Flythrough",
      badge: "DRONE HUD TELEMETRY",
      description: "Click 'Enter Flythrough' to simulate a reconnaissance drone flying through the reconstructed terrain with live altitude and heading telemetry.",
      action: () => {
        if (window.App) {
          window.App.switchTab("scene3d");
          if (window.FlythroughEngine) window.FlythroughEngine.start();
        }
      }
    },
    {
      step: 6,
      title: "Step 6: Single-View Height Telemetry",
      badge: "ESTIMATED ~14.8m (84% CONFIDENCE)",
      description: "Click any 3D structure or inspect the Height Intelligence table to view inferred elevation, baseline perspective offset, and uncertainty intervals.",
      action: () => {
        if (window.App) {
          window.App.switchTab("console");
          window.App.highlightStructure("STR-01");
        }
      }
    },
    {
      step: 7,
      title: "Step 7: Disaster Management & Flood Simulation",
      badge: "DYNAMIC INUNDATION MODEL",
      description: "Switch to Disaster Mode. Adjust the flood water slider to see real-time submergence of roads and buildings with automated vulnerability tallies.",
      action: () => {
        if (window.App) window.App.switchTab("disaster");
      }
    },
    {
      step: 8,
      title: "Step 8: NDMA Situation Report & Responsible AI",
      badge: "MISSION READY",
      description: "Export formal NDRF/NDMA situation briefings while upholding technical credibility through clear single-view scale ambiguity disclosures.",
      action: () => {
        if (window.App) window.App.switchTab("reports");
      }
    }
  ],

  start() {
    this.isActive = true;
    this.currentStep = 0;
    this.renderStepModal();
  },

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.renderStepModal();
    } else {
      this.end();
    }
  },

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStepModal();
    }
  },

  end() {
    this.isActive = false;
    const modal = document.getElementById("judge-tour-modal");
    if (modal) modal.classList.add("hidden");
    if (window.FlythroughEngine) window.FlythroughEngine.stop();
  },

  renderStepModal() {
    const modal = document.getElementById("judge-tour-modal");
    if (!modal) return;
    modal.classList.remove("hidden");

    const stepData = this.steps[this.currentStep];
    stepData.action();

    document.getElementById("tour-step-badge").innerText = `STEP ${stepData.step} OF ${this.steps.length} — ${stepData.badge}`;
    document.getElementById("tour-step-title").innerText = stepData.title;
    document.getElementById("tour-step-desc").innerText = stepData.description;

    const prevBtn = document.getElementById("tour-prev-btn");
    const nextBtn = document.getElementById("tour-next-btn");
    
    if (prevBtn) prevBtn.disabled = (this.currentStep === 0);
    if (nextBtn) nextBtn.innerText = (this.currentStep === this.steps.length - 1) ? "FINISH TOUR" : "NEXT STEP →";
  }
};
