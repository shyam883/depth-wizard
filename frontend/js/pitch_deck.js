/**
 * DEPTH WIZARD — Interactive Pitch Deck & Presentation Suite
 * SIH 2026 Presentation Slides for Judges
 */

window.PitchDeck = {
  currentSlide: 0,
  slides: [
    {
      title: "SIH 2026 Problem Statement SIH26175",
      subtitle: "Depth Wizard: Single-View Height Estimation & 3D Flythrough",
      tag: "THE CHALLENGE",
      content: `
        <div class="space-y-4 font-mono text-xs">
          <div class="p-4 bg-slate-900 rounded-lg border border-slate-700">
            <h4 class="text-sm font-bold text-rose-400 mb-2">CRITICAL DISASTER DILEMMA:</h4>
            <p class="text-slate-300 leading-relaxed">
              In rapid-onset disasters (flash floods, cloudburst landslides, urban collapses), ground-truth LiDAR and multi-view drone fleets take <strong>24–72 hours</strong> to deploy. Disaster responders (NDRF, SDRF, Armed Forces) are left with only <strong>arbitrary 2D smartphone/satellite photos</strong> with zero 3D depth, verticality, or terrain relief.
            </p>
          </div>
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="p-3 bg-slate-950 rounded border border-slate-800">
              <span class="text-rose-400 font-bold block text-sm">NO LiDAR</span>
              <span class="text-[10px] text-slate-400">Too heavy & costly</span>
            </div>
            <div class="p-3 bg-slate-950 rounded border border-slate-800">
              <span class="text-amber-400 font-bold block text-sm">NO STEREO</span>
              <span class="text-[10px] text-slate-400">Single image available</span>
            </div>
            <div class="p-3 bg-slate-950 rounded border border-slate-800">
              <span class="text-cyan-400 font-bold block text-sm">NO TIME</span>
              <span class="text-[10px] text-slate-400">72-hour golden window</span>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "Our Solution: DEPTH WIZARD",
      subtitle: "One Image. Depth. Height. 3D. Disaster Intelligence.",
      tag: "THE BREAKTHROUGH",
      content: `
        <div class="space-y-4 font-mono text-xs">
          <div class="p-4 bg-slate-900 rounded-lg border border-cyan-500/40">
            <h4 class="text-sm font-bold text-cyan-400 mb-2">END-TO-END RECONSTRUCTION PIPELINE:</h4>
            <p class="text-slate-300 leading-relaxed">
              Depth Wizard transforms any single standard 2D RGB photo into an actionable 3D situational spatial model with <strong>dense monocular depth maps, perspective height telemetry, 100k+ point clouds, autonomous drone flythrough, and dynamic flood inundation simulations</strong> in under 500ms.
            </p>
          </div>
          <div class="grid grid-cols-4 gap-2 text-center text-[11px]">
            <div class="p-2.5 bg-slate-950 rounded border border-cyan-500/30 text-cyan-300">01 Monocular Depth</div>
            <div class="p-2.5 bg-slate-950 rounded border border-cyan-500/30 text-cyan-300">02 Height Solver</div>
            <div class="p-2.5 bg-slate-950 rounded border border-cyan-500/30 text-cyan-300">03 WebGL 3D Mesh</div>
            <div class="p-2.5 bg-slate-950 rounded border border-cyan-500/30 text-cyan-300">04 Flood & NDRF Hub</div>
          </div>
        </div>
      `
    },
    {
      title: "Mathematical Depth-to-Height Formulation",
      subtitle: "Pinhole Geometry & Vanishing Line Horizon Rectification",
      tag: "CORE ALGORITHM",
      content: `
        <div class="space-y-3 font-mono text-xs">
          <div class="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center text-cyan-300 font-bold text-sm">
            H_est = (Z_base · Δy) / (f_y · cos(θ_pitch))
          </div>
          <div class="grid grid-cols-2 gap-3 text-slate-300">
            <div class="p-3 bg-slate-900/80 rounded border border-slate-800 space-y-1">
              <strong class="text-white block">Perspective Variables:</strong>
              <div>• <strong>Z_base:</strong> Inferred optical depth at structure footing</div>
              <div>• <strong>Δy:</strong> Vertical pixel delta between roofline & base</div>
              <div>• <strong>f_y:</strong> Inferred focal length from camera prior</div>
              <div>• <strong>θ_pitch:</strong> Tilt angle from horizon estimation</div>
            </div>
            <div class="p-3 bg-slate-900/80 rounded border border-slate-800 space-y-1">
              <strong class="text-white block">Scale Ambiguity Resolution:</strong>
              <div>• Vehicle Prior: ~1.5m</div>
              <div>• Story Prior: ~3.2m</div>
              <div>• Road Width: ~7.0m</div>
              <div>• User Interactive Drag-and-Calibrate Ruler</div>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "Tactical Disaster Intelligence Modules",
      subtitle: "Engineered specifically for NDRF, SDRF, and NDMA Operations",
      tag: "DISASTER USE CASE",
      content: `
        <div class="grid grid-cols-3 gap-3 font-mono text-xs">
          <div class="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
            <div class="text-blue-400 font-bold">🌊 FLOOD INUNDATION</div>
            <p class="text-slate-300 text-[11px]">
              Dynamic water level slider calculates submerged buildings, water depth at doorsteps, and isolated islands.
            </p>
          </div>
          <div class="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
            <div class="text-rose-400 font-bold">🏚️ DAMAGE DIFFERENTIAL</div>
            <p class="text-slate-300 text-[11px]">
              Pre vs Post disaster visual split-screen detects pancake collapses, tilted facades, and rubble piles.
            </p>
          </div>
          <div class="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
            <div class="text-emerald-400 font-bold">🚁 EVACUATION ROUTING</div>
            <p class="text-slate-300 text-[11px]">
              Identifies safe high-ground ridge spines, blocked muddy roads, and emergency helicopter landing zones.
            </p>
          </div>
        </div>
      `
    },
    {
      title: "Why Depth Wizard Wins vs Existing Solutions",
      subtitle: "Comparative Edge & Performance Matrix",
      tag: "COMPETITIVE ADVANTAGE",
      content: `
        <div class="overflow-x-auto border border-slate-800 rounded-lg font-mono text-xs">
          <table class="w-full text-left">
            <thead class="bg-slate-900 text-slate-400 border-b border-slate-800 text-[11px]">
              <tr>
                <th class="p-2.5">FEATURE</th>
                <th class="p-2.5">AIRBORNE LiDAR</th>
                <th class="p-2.5">DRONE STEREO</th>
                <th class="p-2.5 text-cyan-400 font-bold">DEPTH WIZARD</th>
              </tr>
            </thead>
            <tbody class="text-slate-300 text-[11px]">
              <tr class="border-b border-slate-800/60">
                <td class="p-2.5 font-bold">Input Required</td>
                <td class="p-2.5 text-slate-400">LiDAR Pod ($80k+)</td>
                <td class="p-2.5 text-slate-400">Multi-Angle Overlaps</td>
                <td class="p-2.5 text-cyan-300 font-bold">Single 2D JPG/PNG</td>
              </tr>
              <tr class="border-b border-slate-800/60">
                <td class="p-2.5 font-bold">Deploy Time</td>
                <td class="p-2.5 text-rose-400">24 – 48 Hours</td>
                <td class="p-2.5 text-amber-400">4 – 8 Hours</td>
                <td class="p-2.5 text-emerald-400 font-bold">&lt; 1 Second</td>
              </tr>
              <tr class="border-b border-slate-800/60">
                <td class="p-2.5 font-bold">Compute Setup</td>
                <td class="p-2.5 text-slate-400">Cloud Cluster / GPU</td>
                <td class="p-2.5 text-slate-400">Heavy Photogrammetry</td>
                <td class="p-2.5 text-emerald-400 font-bold">100% Client-Side WebGL</td>
              </tr>
              <tr>
                <td class="p-2.5 font-bold">Disaster Telemetry</td>
                <td class="p-2.5 text-slate-400">Raw Points Only</td>
                <td class="p-2.5 text-slate-400">Orthomosaic Only</td>
                <td class="p-2.5 text-cyan-300 font-bold">NDMA SITREP + Flythrough</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  ],

  show() {
    const modal = document.getElementById("pitch-deck-modal");
    if (!modal) return;
    this.currentSlide = 0;
    this.render();
    modal.classList.remove("hidden");
  },

  hide() {
    const modal = document.getElementById("pitch-deck-modal");
    if (modal) modal.classList.add("hidden");
  },

  next() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
      this.render();
    }
  },

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.render();
    }
  },

  render() {
    const s = this.slides[this.currentSlide];
    document.getElementById("deck-slide-tag").innerText = `SLIDE ${this.currentSlide + 1} OF ${this.slides.length} — ${s.tag}`;
    document.getElementById("deck-slide-title").innerText = s.title;
    document.getElementById("deck-slide-subtitle").innerText = s.subtitle;
    document.getElementById("deck-slide-body").innerHTML = s.content;

    const prevBtn = document.getElementById("deck-prev-btn");
    const nextBtn = document.getElementById("deck-next-btn");
    if (prevBtn) prevBtn.disabled = (this.currentSlide === 0);
    if (nextBtn) nextBtn.disabled = (this.currentSlide === this.slides.length - 1);
  }
};
