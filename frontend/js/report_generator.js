/**
 * DEPTH WIZARD — NDMA / NDRF Disaster Situation Report Generator
 * Exports professional printable Situation Reports and JSON intelligence matrices.
 */

window.ReportGenerator = {
  generateReportHTML(scenario, floodStats) {
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19) + " IST";
    const waterLevel = floodStats ? floodStats.waterLevelM : 2.5;
    const vulnStructures = floodStats ? floodStats.vulnerableTotal : scenario.stats.vulnerable_structures;

    let structRows = scenario.structures.map((s, idx) => `
      <tr class="border-b border-slate-700/40 text-xs font-mono">
        <td class="p-2 text-cyan-400 font-bold">${s.id}</td>
        <td class="p-2 text-white">${s.name}</td>
        <td class="p-2 uppercase text-slate-400">${s.type}</td>
        <td class="p-2 font-bold text-white">~${s.height_m} m</td>
        <td class="p-2 text-slate-300">+${s.elevation_m} m</td>
        <td class="p-2 text-cyan-300">${s.confidence}%</td>
        <td class="p-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${s.status === 'critical' ? 'bg-red-900/60 text-red-300 border border-red-500' : (s.status === 'moderate' ? 'bg-amber-900/60 text-amber-300 border border-amber-500' : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500')}">
            ${s.status.toUpperCase()}
          </span>
        </td>
      </tr>
    `).join("");

    let routeRows = scenario.evacuation_corridors.map(c => `
      <div class="p-3 bg-slate-900/60 border border-slate-700/60 rounded-lg text-xs font-mono mb-2">
        <div class="flex justify-between items-center mb-1">
          <span class="text-white font-bold">${c.name} (${c.id})</span>
          <span class="px-2 py-0.5 rounded text-[10px] ${c.status === 'CLEAR' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'bg-red-950 text-red-300 border border-red-500'} font-bold">
            ${c.status}
          </span>
        </div>
        <p class="text-slate-400 text-[11px]">${c.ndrf_suitability}</p>
        <div class="text-[10px] text-cyan-400 mt-1">Elevation Clearance: ${c.clearance_elevation}</div>
      </div>
    `).join("");

    return `
      <div id="printable-report" class="bg-slate-950 text-slate-100 p-8 max-w-4xl mx-auto border border-cyan-500/40 rounded-xl space-y-6 shadow-2xl font-sans">
        <!-- Header -->
        <div class="border-b-2 border-cyan-500 pb-4 flex justify-between items-start">
          <div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span class="text-xs font-mono text-cyan-400 tracking-widest uppercase">GOVERNMENT OF INDIA • DISASTER RESPONSE MATRIX</span>
            </div>
            <h1 class="text-2xl font-black text-white tracking-tight mt-1">DEPTH WIZARD — SITUATION INTELLIGENCE REPORT</h1>
            <p class="text-xs text-slate-400 font-mono mt-0.5">Automated Single-View 3D Monocular Spatial Assessment (SIH26175)</p>
          </div>
          <div class="text-right font-mono text-xs text-slate-400">
            <div>REPORT ID: <strong class="text-white">SITREP-2026-${scenario.id.toUpperCase().substring(0, 8)}</strong></div>
            <div>TIMESTAMP: <span class="text-cyan-300">${timestamp}</span></div>
            <div>STATUS: <strong class="text-emerald-400">OFFICIAL NDRF ADVISORY</strong></div>
          </div>
        </div>

        <!-- Incident Metadata Grid -->
        <div class="grid grid-cols-4 gap-3 bg-slate-900/80 p-4 rounded-lg border border-slate-800 text-xs font-mono">
          <div>
            <span class="text-slate-500 block text-[10px]">SCENARIO / INCIDENT</span>
            <span class="text-white font-bold">${scenario.title}</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[10px]">COORDINATES (WGS84)</span>
            <span class="text-cyan-300">${scenario.coordinates.lat.toFixed(4)}°N, ${scenario.coordinates.lng.toFixed(4)}°E</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[10px]">INFERRED WATER SURGE</span>
            <span class="text-amber-400 font-bold">${waterLevel.toFixed(1)} meters</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[10px]">VULNERABLE ASSETS</span>
            <span class="text-rose-400 font-bold">${vulnStructures} / ${scenario.structures.length} Detected</span>
          </div>
        </div>

        <!-- Executive Summary -->
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-2 flex items-center gap-2">
            <span>[1.0] EXECUTIVE AI SPATIAL ASSESSMENT</span>
          </h2>
          <p class="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded border border-slate-800">
            ${scenario.ai_summary}
          </p>
        </div>

        <!-- Structure Heights Matrix -->
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-2">
            [2.0] INFERRED STRUCTURAL HEIGHT & RELIEF MATRIX
          </h2>
          <div class="overflow-x-auto border border-slate-800 rounded-lg">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-900 text-[11px] font-mono text-slate-400 border-b border-slate-700">
                  <th class="p-2">ID</th>
                  <th class="p-2">STRUCTURE</th>
                  <th class="p-2">TYPE</th>
                  <th class="p-2">EST. HEIGHT</th>
                  <th class="p-2">REL. ELEV</th>
                  <th class="p-2">CONFIDENCE</th>
                  <th class="p-2">IMPACT RATING</th>
                </tr>
              </thead>
              <tbody>
                ${structRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Emergency Corridors -->
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-cyan-400 font-mono mb-2">
            [3.0] TACTICAL EVACUATION CORRIDORS & AIRFIELD CLEARANCE
          </h2>
          <div class="grid grid-cols-2 gap-3">
            ${routeRows}
          </div>
        </div>

        <!-- Responsible AI Disclaimer -->
        <div class="p-3 bg-amber-950/30 border border-amber-600/40 rounded-lg text-[11px] text-amber-300/90 font-mono">
          <strong>RESPONSIBLE AI & TECHNICAL LIMITATIONS NOTICE:</strong>
          Single-view height and depth metrics are mathematically inferred approximations from 2D perspective geometry. Exact metric absolute elevations require Ground Control Points (GCP) or calibrated LiDAR. This advisory is intended for rapid emergency triage when traditional GIS data is unavailable.
        </div>

        <!-- Action Buttons in modal -->
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-800 not-printable">
          <button onclick="window.print()" class="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-mono text-xs font-bold shadow-lg flex items-center gap-2">
            🖨️ PRINT / EXPORT PDF
          </button>
          <button onclick="ReportGenerator.exportJSON()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/50 rounded font-mono text-xs font-bold flex items-center gap-2">
            💾 DOWNLOAD SITREP JSON
          </button>
        </div>
      </div>
    `;
  },

  exportJSON() {
    if (!window.App || !window.App.activeScenario) return;
    const data = {
      sitrep_id: `SITREP-2026-${window.App.activeScenario.id.toUpperCase()}`,
      system: "DEPTH WIZARD SIH26175",
      scenario: window.App.activeScenario,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DEPTH_WIZARD_${window.App.activeScenario.id}_SITREP.json`;
    a.click();
  }
};
