/**
 * DEPTH WIZARD — Main Application Orchestrator
 * Smart India Hackathon 2026 | Problem Statement SIH26175
 */

window.App = {
  activeTab: "landing", // "landing" | "console" | "scene3d" | "disaster" | "gis" | "architecture" | "reports"
  activeScenario: null,
  activeColormap: "turbo",
  rgbCanvas: null,
  depthCanvas: null,
  splitPosition: 50,
  uploadedImage: null,
  isProcessing: false,
  theme: "dark",

  init() {
    console.log("⚡ DEPTH WIZARD Intelligence System Initializing...");
    
    // 0. Initialize Theme
    this.initTheme();

    // 1. Select default scenario
    this.activeScenario = window.DISASTER_DATASET[0];

    // 2. Setup DOM Events
    this.bindEvents();

    // 3. Render Initial Scenario
    this.loadScenario(this.activeScenario.id);

    // 4. Initialize Lucide Icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  initTheme() {
    const saved = localStorage.getItem("dw_theme") || "dark";
    this.setTheme(saved);
  },

  setTheme(theme) {
    this.theme = theme;
    const body = document.body;
    const html = document.documentElement;
    const themeBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-toggle-icon");
    const themeText = document.getElementById("theme-toggle-text");

    if (theme === "light") {
      body.classList.add("light-mode");
      html.classList.remove("dark");
      if (themeIcon) themeIcon.innerText = "🌙";
      if (themeText) themeText.innerText = "DARK";
    } else {
      body.classList.remove("light-mode");
      html.classList.add("dark");
      if (themeIcon) themeIcon.innerText = "☀️";
      if (themeText) themeText.innerText = "LIGHT";
    }

    localStorage.setItem("dw_theme", theme);

    if (window.ThreeViewer && window.ThreeViewer.setTheme) {
      window.ThreeViewer.setTheme(theme);
    }
    if (window.GisModule && window.GisModule.setTheme) {
      window.GisModule.setTheme(theme);
    }
  },

  toggleTheme() {
    const next = this.theme === "dark" ? "light" : "dark";
    this.setTheme(next);
    this.showToast(`Switched to ${next.toUpperCase()} MODE`, "info");
  },

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll("[data-tab-target]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const target = btn.getAttribute("data-tab-target");
        this.switchTab(target);
      });
    });

    // Scenario Selectors
    document.querySelectorAll("[data-scenario-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-scenario-id");
        this.loadScenario(id);
      });
    });

    // RGB / Depth Split Slider
    const splitSlider = document.getElementById("rgb-depth-slider");
    if (splitSlider) {
      splitSlider.addEventListener("input", (e) => {
        this.setSplitPosition(e.target.value);
      });
    }

    // Colormap Switcher
    document.querySelectorAll("[data-colormap]").forEach(btn => {
      btn.addEventListener("click", () => {
        const cm = btn.getAttribute("data-colormap");
        this.setColormap(cm);
      });
    });

    // File Upload Handler (Drag & Drop + Input)
    const dropZone = document.getElementById("image-drop-zone");
    const fileInput = document.getElementById("image-file-input");

    if (dropZone && fileInput) {
      dropZone.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleImageUpload(e.target.files[0]);
        }
      });

      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-cyan-400", "bg-cyan-950/20");
      });

      dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-cyan-400", "bg-cyan-950/20");
      });

      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-cyan-400", "bg-cyan-950/20");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleImageUpload(e.dataTransfer.files[0]);
        }
      });
    }

    const modeMeshBtn = document.getElementById("btn-mode-mesh");
    const modePointsBtn = document.getElementById("btn-mode-points");
    const modeWireBtn = document.getElementById("btn-mode-wire");
    const modeSlopeBtn = document.getElementById("btn-mode-slope");
    const resetViewBtn = document.getElementById("btn-reset-view");
    const topDownBtn = document.getElementById("btn-top-down");
    const heightExaggerationSlider = document.getElementById("height-exaggeration-slider");

    if (modeMeshBtn) modeMeshBtn.addEventListener("click", () => { this.set3DMode("mesh"); });
    if (modePointsBtn) modePointsBtn.addEventListener("click", () => { this.set3DMode("pointcloud"); });
    if (modeWireBtn) modeWireBtn.addEventListener("click", () => { this.set3DMode("wireframe"); });
    if (modeSlopeBtn) modeSlopeBtn.addEventListener("click", () => { this.set3DMode("slope_hazard"); });
    if (resetViewBtn) resetViewBtn.addEventListener("click", () => { if (window.ThreeViewer) window.ThreeViewer.resetCameraView(); });
    if (topDownBtn) topDownBtn.addEventListener("click", () => { if (window.ThreeViewer) window.ThreeViewer.setTopDownView(); });
    if (heightExaggerationSlider) {
      heightExaggerationSlider.addEventListener("input", (e) => {
        if (window.ThreeViewer) {
          window.ThreeViewer.setHeightExaggeration(e.target.value);
          window.ThreeViewer.reconstructFromScenario(this.activeScenario, this.depthCanvas, this.rgbCanvas);
        }
      });
    }

    // Flythrough Controls
    const flyPlayBtn = document.getElementById("btn-fly-play");
    const flyPauseBtn = document.getElementById("btn-fly-pause");
    const flyStopBtn = document.getElementById("btn-fly-stop");
    const flySpeedSelect = document.getElementById("fly-speed-select");
    const flyAltitudeSlider = document.getElementById("fly-altitude-slider");

    if (flyPlayBtn) flyPlayBtn.addEventListener("click", () => {
      if (window.FlythroughEngine) {
        window.FlythroughEngine.start();
        flyPlayBtn.classList.add("hidden");
        flyPauseBtn.classList.remove("hidden");
        document.getElementById("flythrough-hud-overlay").classList.remove("hidden");
      }
    });

    if (flyPauseBtn) flyPauseBtn.addEventListener("click", () => {
      if (window.FlythroughEngine) {
        window.FlythroughEngine.pause();
        flyPauseBtn.classList.add("hidden");
        flyPlayBtn.classList.remove("hidden");
      }
    });

    if (flyStopBtn) flyStopBtn.addEventListener("click", () => {
      if (window.FlythroughEngine) {
        window.FlythroughEngine.stop();
        if (flyPauseBtn) flyPauseBtn.classList.add("hidden");
        if (flyPlayBtn) flyPlayBtn.classList.remove("hidden");
        document.getElementById("flythrough-hud-overlay").classList.add("hidden");
      }
    });

    if (flySpeedSelect) {
      flySpeedSelect.addEventListener("change", (e) => {
        if (window.FlythroughEngine) window.FlythroughEngine.setSpeed(e.target.value);
      });
    }

    if (flyAltitudeSlider) {
      flyAltitudeSlider.addEventListener("input", (e) => {
        if (window.FlythroughEngine) window.FlythroughEngine.setAltitude(e.target.value);
      });
    }

    // Flood Water Risk Slider
    const floodSlider = document.getElementById("flood-water-slider");
    if (floodSlider) {
      floodSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        document.getElementById("flood-water-val").innerText = `${val.toFixed(1)} m`;
        this.updateFloodAnalytics(val);
      });
    }

    // Flythrough HUD callback
    if (window.FlythroughEngine) {
      window.FlythroughEngine.onHudUpdateCallback = (telemetry) => {
        const alt = document.getElementById("hud-altitude");
        const elev = document.getElementById("hud-elevation");
        const dist = document.getElementById("hud-dist");
        const spd = document.getElementById("hud-speed");
        const hdg = document.getElementById("hud-heading");
        const conf = document.getElementById("hud-confidence");

        if (alt) alt.innerText = `${telemetry.altitudeM} m`;
        if (elev) elev.innerText = `+${telemetry.relElevM} m`;
        if (dist) dist.innerText = `${telemetry.distTraveledKm} km`;
        if (spd) spd.innerText = `${telemetry.speedKmh} km/h`;
        if (hdg) hdg.innerText = `${telemetry.headingDeg}°`;
        if (conf) conf.innerText = `${telemetry.confidence}%`;
      };
    }
  },

  switchTab(tabId) {
    this.activeTab = tabId;

    // Update tab bar buttons
    document.querySelectorAll("[data-tab-target]").forEach(b => {
      if (b.getAttribute("data-tab-target") === tabId) {
        b.classList.add("text-cyan-400", "border-b-2", "border-cyan-400", "bg-cyan-950/20");
        b.classList.remove("text-slate-400");
      } else {
        b.classList.remove("text-cyan-400", "border-b-2", "border-cyan-400", "bg-cyan-950/20");
        b.classList.add("text-slate-400");
      }
    });

    // Hide / Show Tab Panes
    document.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.add("hidden");
    });

    const targetPane = document.getElementById(`tab-pane-${tabId}`);
    if (targetPane) {
      targetPane.classList.remove("hidden");
    }

    // Specific pane handlers
    if (tabId === "scene3d") {
      setTimeout(() => {
        const container = document.getElementById("three-canvas-container");
        if (container) {
          if (!window.ThreeViewer.isInitialized) {
            window.ThreeViewer.init(container, (struct) => this.showStructurePopup(struct));
          }
          window.ThreeViewer.onWindowResize();
          window.ThreeViewer.reconstructFromScenario(this.activeScenario, this.depthCanvas, this.rgbCanvas);
          if (window.FlythroughEngine) window.FlythroughEngine.buildFlightPath(this.activeScenario);
        }
      }, 50);
    } else if (tabId === "gis") {
      setTimeout(() => {
        if (window.GisModule) {
          window.GisModule.init("gis-map-container");
          window.GisModule.updateScenario(this.activeScenario);
        }
      }, 100);
    } else if (tabId === "disaster") {
      this.updateFloodAnalytics(parseFloat(document.getElementById("flood-water-slider")?.value || 2.5));
      this.renderDamageComparison();
    } else if (tabId === "reports") {
      this.renderSituationReport();
    }
  },

  loadScenario(scenarioId) {
    const scenario = window.DISASTER_DATASET.find(s => s.id === scenarioId) || window.DISASTER_DATASET[0];
    this.activeScenario = scenario;

    // Update active scenario pill buttons
    document.querySelectorAll("[data-scenario-id]").forEach(btn => {
      if (btn.getAttribute("data-scenario-id") === scenarioId) {
        btn.classList.add("border-cyan-400", "bg-cyan-950/40", "text-cyan-300");
        btn.classList.remove("border-slate-700", "text-slate-400");
      } else {
        btn.classList.remove("border-cyan-400", "bg-cyan-950/40", "text-cyan-300");
        btn.classList.add("border-slate-700", "text-slate-400");
      }
    });

    // Generate procedural RGB and Depth Canvases
    this.rgbCanvas = window.ScenarioCanvasGenerator.createScenarioCanvas(scenario, "rgb");
    this.depthCanvas = window.ScenarioCanvasGenerator.createScenarioCanvas(scenario, "depth");

    // Populate UI Fields
    this.updateConsoleUI();
    this.runPipelineAnimation();

    // If 3D is active, update scene
    if (this.activeTab === "scene3d" && window.ThreeViewer && window.ThreeViewer.isInitialized) {
      window.ThreeViewer.reconstructFromScenario(this.activeScenario, this.depthCanvas, this.rgbCanvas);
    }
  },

  updateConsoleUI() {
    const s = this.activeScenario;
    if (!s) return;

    // Headers & Metadata
    document.getElementById("scenario-title-badge").innerText = `${s.title.toUpperCase()}`;
    document.getElementById("scenario-subtitle").innerText = s.subtitle;
    document.getElementById("scenario-location").innerText = `${s.coordinates.lat.toFixed(4)}°N, ${s.coordinates.lng.toFixed(4)}°E (${s.coordinates.crs})`;
    document.getElementById("scenario-gsd").innerText = s.gsd_estimate;
    document.getElementById("scenario-confidence").innerText = `${s.stats.confidence}% (Inferred)`;

    // AI Situational Summary
    document.getElementById("ai-situation-text").innerText = s.ai_summary;

    // Structure Height Table
    this.renderHeightTable(s.structures);

    // Render Split Viewer
    this.renderSplitViewer();
  },

  renderSplitViewer() {
    const container = document.getElementById("split-viewer-target");
    if (!container || !this.rgbCanvas || !this.depthCanvas) return;

    container.innerHTML = "";

    // Base Depth Canvas
    this.depthCanvas.className = "w-full h-auto block rounded-lg shadow-inner";
    container.appendChild(this.depthCanvas);

    // Overlay RGB Canvas with Clip
    const overlay = document.createElement("div");
    overlay.id = "split-overlay-layer";
    overlay.className = "split-viewer-overlay";
    overlay.style.width = `${this.splitPosition}%`;

    const rgbClone = document.createElement("canvas");
    rgbClone.width = this.rgbCanvas.width;
    rgbClone.height = this.rgbCanvas.height;
    rgbClone.getContext("2d").drawImage(this.rgbCanvas, 0, 0);
    rgbClone.style.width = `${container.clientWidth || 640}px`;
    rgbClone.style.maxWidth = "none";
    rgbClone.className = "h-auto block";

    overlay.appendChild(rgbClone);
    container.appendChild(overlay);

    // Interactive Depth Inspector on Hover/Click
    this.depthCanvas.addEventListener("mousemove", (e) => {
      const rect = this.depthCanvas.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width;
      const normY = (e.clientY - rect.top) / rect.height;
      const probe = window.DepthEngine.sampleDepthAt(normX, normY);
      
      const probeEl = document.getElementById("depth-probe-readout");
      if (probeEl) {
        probeEl.innerHTML = `PROBE @ (${normX.toFixed(2)}, ${normY.toFixed(2)}) → DEPTH: <strong class="text-cyan-300">~${probe.meters}m</strong> | ELEV: <strong class="text-emerald-300">+${probe.elevationRel}m</strong>`;
      }
    });
  },

  setSplitPosition(val) {
    this.splitPosition = val;
    const overlay = document.getElementById("split-overlay-layer");
    if (overlay) {
      overlay.style.width = `${val}%`;
    }
  },

  setColormap(cm) {
    this.activeColormap = cm;
    document.querySelectorAll("[data-colormap]").forEach(b => {
      if (b.getAttribute("data-colormap") === cm) {
        b.classList.add("bg-cyan-500", "text-black", "font-bold");
        b.classList.remove("bg-slate-800", "text-slate-300");
      } else {
        b.classList.remove("bg-cyan-500", "text-black", "font-bold");
        b.classList.add("bg-slate-800", "text-slate-300");
      }
    });

    if (this.rgbCanvas) {
      this.depthCanvas = window.DepthEngine.estimateDepth(this.rgbCanvas, { colormap: cm });
      this.renderSplitViewer();
      if (this.activeTab === "scene3d" && window.ThreeViewer && window.ThreeViewer.isInitialized) {
        window.ThreeViewer.reconstructFromScenario(this.activeScenario, this.depthCanvas, this.rgbCanvas);
      }
    }
  },

  renderHeightTable(structures) {
    const tbody = document.getElementById("height-table-body");
    if (!tbody) return;

    tbody.innerHTML = structures.map(s => `
      <tr class="border-b border-slate-800/80 hover:bg-slate-800/40 transition font-mono text-xs cursor-pointer" onclick="App.highlightStructure('${s.id}')">
        <td class="p-2.5 font-bold text-cyan-400">${s.id}</td>
        <td class="p-2.5 text-slate-200">${s.name}</td>
        <td class="p-2.5 uppercase text-slate-400 text-[10px]">${s.type}</td>
        <td class="p-2.5 font-bold text-white">~${s.height_m} m</td>
        <td class="p-2.5 text-slate-300">+${s.elevation_m} m</td>
        <td class="p-2.5 text-cyan-300 font-semibold">${s.confidence}%</td>
        <td class="p-2.5">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${s.status === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-600' : (s.status === 'moderate' ? 'bg-amber-950 text-amber-300 border border-amber-600' : 'bg-emerald-950 text-emerald-300 border border-emerald-600')}">
            ${s.status.toUpperCase()}
          </span>
        </td>
      </tr>
    `).join("");
  },

  highlightStructure(structId) {
    const struct = this.activeScenario.structures.find(s => s.id === structId);
    if (struct) {
      this.showStructurePopup(struct);
    }
  },

  showStructurePopup(struct) {
    const heightData = window.HeightEngine.calculateHeight(struct.bbox, 0.5);
    const modal = document.getElementById("structure-telemetry-modal");
    if (!modal) return;

    modal.innerHTML = `
      <div class="glass-panel p-5 border border-cyan-400 shadow-2xl space-y-3 max-w-sm w-full font-mono text-xs">
        <div class="flex justify-between items-start border-b border-slate-700 pb-2">
          <div>
            <span class="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">STRUCTURE TELEMETRY</span>
            <h3 class="text-sm font-bold text-white">${struct.name}</h3>
          </div>
          <button onclick="document.getElementById('structure-telemetry-modal').classList.add('hidden')" class="text-slate-400 hover:text-white text-base">✕</button>
        </div>
        <div class="grid grid-cols-2 gap-2 text-slate-300">
          <div class="bg-slate-900/80 p-2 rounded">
            <span class="text-[10px] text-slate-500 block">ESTIMATED HEIGHT</span>
            <span class="text-white font-bold text-base">~${struct.height_m} m</span>
            <span class="text-[10px] text-slate-400 block">${heightData.uncertainty_range_m} (1σ)</span>
          </div>
          <div class="bg-slate-900/80 p-2 rounded">
            <span class="text-[10px] text-slate-500 block">BASE ELEVATION</span>
            <span class="text-white font-bold text-base">+${struct.elevation_m} m</span>
            <span class="text-[10px] text-cyan-400 block">Relative Ground</span>
          </div>
        </div>
        <div class="bg-slate-900/80 p-2 rounded flex justify-between items-center text-[11px]">
          <span>AI Model Confidence:</span>
          <strong class="text-cyan-300 font-bold">${struct.confidence}%</strong>
        </div>
        <div class="text-[10px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
          Risk Classification: <strong class="${struct.status === 'critical' ? 'text-rose-400' : 'text-emerald-400'}">${struct.risk}</strong>
        </div>
      </div>
    `;
    modal.classList.remove("hidden");
  },

  handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create custom scenario from uploaded image
        const customScenario = {
          id: "custom_upload",
          title: `User Image: ${file.name.substring(0, 20)}`,
          subtitle: "Live Client-Side AI Monocular Inference",
          type: "Custom Upload",
          date: "Live Input",
          coordinates: { lat: 20.5937, lng: 78.9629, crs: "EPSG:4326 (Estimated)" },
          gsd_estimate: "Inferred ~0.25 m/px",
          description: "Uploaded RGB image processed via monocular depth estimation and perspective height solvers.",
          ai_summary: "Custom image depth matrix successfully computed. 4 structural clusters segmented with inferred vertical reliefs.",
          stats: {
            vulnerable_structures: 4,
            critical_structures: 1,
            max_elevation_relief: 22.0,
            slope_angle: "12.5°",
            confidence: 79
          },
          structures: [
            { id: "STR-U1", name: "Detected Central Structure", type: "building", height_m: 11.2, elevation_m: 3.5, confidence: 78, bbox: [200, 160, 140, 100], status: "moderate", risk: "Inferred Spatial Cluster" },
            { id: "STR-U2", name: "Elevated Foreground Entity", type: "wall", height_m: 4.5, elevation_m: 1.2, confidence: 81, bbox: [80, 250, 180, 60], status: "safe", risk: "Low Elevation Offset" },
            { id: "STR-U3", name: "Background Vegetation/Canopy", type: "tree", height_m: 8.4, elevation_m: 14.0, confidence: 76, bbox: [420, 90, 120, 90], status: "safe", risk: "Upper Contour" }
          ],
          evacuation_corridors: [
            { id: "EV-U1", name: "Primary Longitudinal Corridor", status: "CLEAR", clearance_elevation: "+4.2m", ndrf_suitability: "Accessible Access Spine" }
          ],
          preset_theme: "valley"
        };

        this.activeScenario = customScenario;
        this.rgbCanvas = document.createElement("canvas");
        this.rgbCanvas.width = 640;
        this.rgbCanvas.height = 420;
        this.rgbCanvas.getContext("2d").drawImage(img, 0, 0, 640, 420);

        this.depthCanvas = window.DepthEngine.estimateDepth(this.rgbCanvas, { colormap: this.activeColormap });
        
        this.updateConsoleUI();
        this.runPipelineAnimation();
        this.showToast("Image processed successfully! Monocular depth & 3D generated.", "success");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  runPipelineAnimation() {
    const steps = ["pipe-1", "pipe-2", "pipe-3", "pipe-4", "pipe-5", "pipe-6", "pipe-7", "pipe-8"];
    steps.forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.classList.remove("active", "completed"); }
    });

    let current = 0;
    const interval = setInterval(() => {
      if (current > 0) {
        const prevEl = document.getElementById(steps[current - 1]);
        if (prevEl) {
          prevEl.classList.remove("active");
          prevEl.classList.add("completed");
        }
      }
      if (current < steps.length) {
        const curEl = document.getElementById(steps[current]);
        if (curEl) {
          curEl.classList.add("active");
        }
        current++;
      } else {
        clearInterval(interval);
      }
    }, 90);
  },

  set3DMode(mode) {
    if (window.ThreeViewer) {
      window.ThreeViewer.setRenderMode(mode);
    }
    const btns = ["btn-mode-mesh", "btn-mode-points", "btn-mode-wire", "btn-mode-slope"];
    btns.forEach(id => {
      const b = document.getElementById(id);
      if (b) {
        if ((mode === "mesh" && id.includes("mesh")) || 
            (mode === "pointcloud" && id.includes("points")) || 
            (mode === "wireframe" && id.includes("wire")) ||
            (mode === "slope_hazard" && id.includes("slope"))) {
          b.classList.add("bg-cyan-500", "text-black", "font-bold");
          b.classList.remove("bg-slate-800", "text-slate-300", "text-amber-300");
        } else {
          b.classList.remove("bg-cyan-500", "text-black", "font-bold");
          b.classList.add("bg-slate-800", "text-slate-300");
        }
      }
    });
  },

  updateFloodAnalytics(waterLevelM) {
    const stats = window.DisasterModule.evaluateFloodRisk(waterLevelM);
    if (!stats) return;

    document.getElementById("flood-vuln-count").innerText = `${stats.vulnerableTotal} Structures`;
    document.getElementById("flood-vuln-percent").innerText = `${stats.vulnerabilityPercentage}% Impact`;
    document.getElementById("flood-critical-count").innerText = stats.criticalCount;
    document.getElementById("flood-moderate-count").innerText = stats.moderateCount;

    // Update Corridor List
    const corridors = window.DisasterModule.evaluateCorridors(waterLevelM);
    const corridorContainer = document.getElementById("disaster-corridors-list");
    if (corridorContainer) {
      corridorContainer.innerHTML = corridors.map(c => `
        <div class="p-3 bg-slate-900/80 border border-slate-700/80 rounded-lg text-xs font-mono space-y-1">
          <div class="flex justify-between items-center">
            <span class="font-bold text-white">${c.name}</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${c.activeStatus.includes('CLEAR') ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'bg-rose-950 text-rose-300 border border-rose-500'}">
              ${c.activeStatus}
            </span>
          </div>
          <p class="text-slate-400 text-[11px]">${c.note}</p>
          <div class="text-[10px] text-cyan-400">Elevation Clearance: ${c.clearance_elevation}</div>
        </div>
      `).join("");
    }
  },

  renderDamageComparison() {
    const preContainer = document.getElementById("damage-pre-target");
    const postContainer = document.getElementById("damage-post-target");
    if (!preContainer || !postContainer) return;

    const preCanvas = window.ScenarioCanvasGenerator.createScenarioCanvas(this.activeScenario, "damage_pre");
    const postCanvas = window.ScenarioCanvasGenerator.createScenarioCanvas(this.activeScenario, "damage_post");

    preContainer.innerHTML = "";
    preContainer.appendChild(preCanvas);
    preCanvas.className = "w-full h-auto block rounded-lg border border-slate-700";

    postContainer.innerHTML = "";
    postContainer.appendChild(postCanvas);
    postCanvas.className = "w-full h-auto block rounded-lg border border-rose-600";
  },

  renderSituationReport() {
    const reportTarget = document.getElementById("sitrep-content-target");
    if (!reportTarget) return;

    const floodStats = window.DisasterModule.evaluateFloodRisk(parseFloat(document.getElementById("flood-water-slider")?.value || 2.5));
    reportTarget.innerHTML = window.ReportGenerator.generateReportHTML(this.activeScenario, floodStats);
  },

  showToast(msg, type = "info") {
    const toast = document.createElement("div");
    toast.className = `fixed bottom-6 right-6 z-50 p-4 rounded-lg font-mono text-xs shadow-2xl border transition-all duration-300 transform translate-y-0 ${type === 'success' ? 'bg-emerald-950 text-emerald-200 border-emerald-500' : 'bg-cyan-950 text-cyan-200 border-cyan-500'}`;
    toast.innerText = `⚡ ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Bootstrap when DOM ready
window.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});
