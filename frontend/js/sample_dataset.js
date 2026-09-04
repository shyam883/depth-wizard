/**
 * DEPTH WIZARD — Pre-configured Disaster Scenarios Dataset
 * Smart India Hackathon 2026 | Problem Statement SIH26175
 */

window.DISASTER_DATASET = [
  {
    id: "wayanad_landslide",
    title: "Wayanad Valley Landslide & River Debris",
    subtitle: "Chooralmala Sector, Meppadi, Wayanad (Kerala)",
    type: "Landslide & Mudflow",
    date: "2024 Monsoon Surge",
    coordinates: { lat: 11.5280, lng: 76.1750, crs: "EPSG:4326 (WGS84)" },
    gsd_estimate: "0.28 m/pixel",
    description: "Steep highland drainage basin with debris flow, severed Bailey bridge approaches, collapsed riverbanks, and cut-off residential clusters.",
    ai_summary: "Depth variation indicates a severe -18.4m elevation drop along the central drainage gorge. 4 residential structures are in critical debris-impact zones with 3 viable high-ground evacuation spurs identified.",
    stats: {
      vulnerable_structures: 14,
      critical_structures: 5,
      max_elevation_relief: 42.6,
      slope_angle: "28.4°",
      confidence: 84
    },
    structures: [
      { id: "STR-01", name: "Community Tea Plantation Office", type: "building", height_m: 14.8, elevation_m: 18.2, confidence: 86, bbox: [160, 120, 95, 75], status: "safe", risk: "Low Risk (High Ridge)" },
      { id: "STR-02", name: "Residential Cluster Block 3", type: "building", height_m: 8.3, elevation_m: 4.1, confidence: 82, bbox: [290, 240, 80, 65], status: "critical", risk: "Critical (Debris Path)" },
      { id: "STR-03", name: "Bailey Bridge Abutment Structure", type: "wall", height_m: 6.5, elevation_m: 1.8, confidence: 79, bbox: [410, 310, 110, 45], status: "critical", risk: "Severed / Inundated" },
      { id: "STR-04", name: "Highland Forest Canopy", type: "tree", height_m: 16.2, elevation_m: 29.5, confidence: 88, bbox: [40, 40, 120, 90], status: "safe", risk: "Stable Terrain" },
      { id: "STR-05", name: "Power Transmission Pylon #14", type: "pole", height_m: 22.0, elevation_m: 21.0, confidence: 76, bbox: [520, 110, 35, 95], status: "moderate", risk: "Soil Erosion Alert" },
      { id: "STR-06", name: "Hillside Terraced Homestead", type: "building", height_m: 7.2, elevation_m: 11.5, confidence: 81, bbox: [220, 175, 70, 55], status: "moderate", risk: "Moderate Slope Risk" }
    ],
    evacuation_corridors: [
      { id: "EV-1", name: "Northern Ridge Spur (Safe Ascent)", status: "CLEAR", clearance_elevation: "+12.4m above debris", ndrf_suitability: "Recommended Primary Route" },
      { id: "EV-2", name: "River Bank Service Track", status: "BLOCKED", clearance_elevation: "-1.2m (Submerged/Debris)", ndrf_suitability: "Impassable for Rescue Vehicles" },
      { id: "EV-3", name: "Upper Plantation Helipad Clearing", status: "ACCESSIBLE", clearance_elevation: "+22.5m ASL", ndrf_suitability: "Suitable for ALH / Mi-17 Winching" }
    ],
    preset_theme: "valley"
  },
  {
    id: "chennai_urban_flood",
    title: "Chennai Urban Basin Inundation",
    subtitle: "Velachery - Pallikaranai Marshland Corridor (Tamil Nadu)",
    type: "Urban Flash Flood",
    date: "Cyclone Michaung Inundation",
    coordinates: { lat: 12.9815, lng: 80.2180, crs: "EPSG:4326 (WGS84)" },
    gsd_estimate: "0.18 m/pixel",
    description: "High-density residential urban pocket with 1.8m standing storm water, submerged ground-floor apartments, transformer blackouts, and stalled vehicles.",
    ai_summary: "Flat urban relief with micro-depressions. 23 ground-floor apartments are inundated above 1.2m. The primary 100ft arterial corridor is submerged, but the elevated railway embankment offers an emergency boat launch zone.",
    stats: {
      vulnerable_structures: 23,
      critical_structures: 11,
      max_elevation_relief: 8.4,
      slope_angle: "1.2°",
      confidence: 88
    },
    structures: [
      { id: "STR-C1", name: "G+3 Apartment Complex A", type: "building", height_m: 13.5, elevation_m: 1.4, confidence: 89, bbox: [140, 180, 110, 90], status: "moderate", risk: "Ground Floor Inundated" },
      { id: "STR-C2", name: "Low-lying Commercial Plaza", type: "building", height_m: 9.2, elevation_m: 0.4, confidence: 84, bbox: [290, 260, 130, 85], status: "critical", risk: "Severe 1.8m Submergence" },
      { id: "STR-C3", name: "Electrical Distribution Transformer", type: "pole", height_m: 4.8, elevation_m: 0.6, confidence: 75, bbox: [450, 310, 40, 50], status: "critical", risk: "Submerged (Electrocution Hazard)" },
      { id: "STR-C4", name: "Elevated Flyover Ramp", type: "road", height_m: 7.5, elevation_m: 7.2, confidence: 91, bbox: [60, 70, 240, 50], status: "safe", risk: "High & Dry / Staging Area" },
      { id: "STR-C5", name: "Primary Health Center", type: "building", height_m: 11.0, elevation_m: 2.1, confidence: 87, bbox: [470, 150, 95, 75], status: "moderate", risk: "Perimeter Flooded, Upper Floor Safe" }
    ],
    evacuation_corridors: [
      { id: "EV-C1", name: "Elevated Metro Concourse Flyway", status: "CLEAR", clearance_elevation: "+7.5m dry zone", ndrf_suitability: "Ideal Pedestrian Evacuation" },
      { id: "EV-C2", name: "Main 100ft Inner Ring Road", status: "BLOCKED", clearance_elevation: "-1.8m water depth", ndrf_suitability: "Inflatable NDRF Dinghy Only" }
    ],
    preset_theme: "urban_flood"
  },
  {
    id: "chamoli_flash_flood",
    title: "Chamoli Rishi Ganga Glacial Flood Gorge",
    subtitle: "Tapovan - Raini Sector, Chamoli (Uttarakhand)",
    type: "Glacial Outburst / Flash Flood",
    date: "Himalayan Flash Event",
    coordinates: { lat: 30.5528, lng: 79.5672, crs: "EPSG:4326 (WGS84)" },
    gsd_estimate: "0.35 m/pixel",
    description: "V-shaped rocky gorge with turbulent mud-rock slurry, swept barrage structures, scour walls, and cut-off mountain roads.",
    ai_summary: "Extreme vertical terrain with gorge depth exceeding 85m. Road link NH-58 severed at km 42. High-elevation rocky spur identified at +34m suitable for emergency ropeway anchorage.",
    stats: {
      vulnerable_structures: 9,
      critical_structures: 6,
      max_elevation_relief: 88.5,
      slope_angle: "36.8°",
      confidence: 82
    },
    structures: [
      { id: "STR-CH1", name: "Hydropower Tunnel Portal Intake", type: "wall", height_m: 15.2, elevation_m: 3.2, confidence: 85, bbox: [180, 210, 120, 80], status: "critical", risk: "Silt Influx / Submerged" },
      { id: "STR-CH2", name: "Barrage Control Substation", type: "building", height_m: 11.4, elevation_m: 5.6, confidence: 80, bbox: [330, 160, 90, 70], status: "critical", risk: "Scour Hazard" },
      { id: "STR-CH3", name: "Upper Village Cliff Dwellings", type: "building", height_m: 8.6, elevation_m: 48.0, confidence: 83, bbox: [80, 40, 95, 60], status: "safe", risk: "Safe from Surge" },
      { id: "STR-CH4", name: "Gorge Suspension Cable Anchor", type: "pole", height_m: 18.0, elevation_m: 34.0, confidence: 78, bbox: [460, 90, 45, 80], status: "safe", risk: "Anchor Point Intact" }
    ],
    evacuation_corridors: [
      { id: "EV-CH1", name: "Upper Cliff Mule Path", status: "CLEAR", clearance_elevation: "+45m high contour", ndrf_suitability: "Foot Evacuation Only" },
      { id: "EV-CH2", name: "Riverbed Transit Track", status: "DESTROYED", clearance_elevation: "-14m debris fill", ndrf_suitability: "Strict No-Go Zone" }
    ],
    preset_theme: "gorge"
  },
  {
    id: "delhi_yamuna_floodplain",
    title: "Yamuna River Urban Floodplain Inundation",
    subtitle: "Old Railway Bridge - Kashmere Gate Sector (Delhi NCR)",
    type: "Riverine Overtopping",
    date: "Monsoon River Spate",
    coordinates: { lat: 28.6650, lng: 77.2450, crs: "EPSG:4326 (WGS84)" },
    gsd_estimate: "0.22 m/pixel",
    description: "Expansive low-gradient riverbank with temporary hutments, submerged Ring Road slipways, waterlogged pumping stations, and cattle shelters.",
    ai_summary: "Low relief gradient with broad water sheet extension. 18 temporary settlements submerged. Ring Road floodwall holding with +1.1m freeboard margin.",
    stats: {
      vulnerable_structures: 18,
      critical_structures: 8,
      max_elevation_relief: 12.1,
      slope_angle: "0.8°",
      confidence: 86
    },
    structures: [
      { id: "STR-Y1", name: "Flood Embankment Bund Wall", type: "wall", height_m: 4.5, elevation_m: 4.2, confidence: 90, bbox: [80, 140, 220, 35], status: "moderate", risk: "Seepage Warning" },
      { id: "STR-Y2", name: "Water Pumping Booster Station", type: "building", height_m: 7.8, elevation_m: 1.1, confidence: 84, bbox: [320, 220, 85, 65], status: "critical", risk: "Equipment Inundation" },
      { id: "STR-Y3", name: "Monastery High Ground Pavilion", type: "building", height_m: 16.4, elevation_m: 8.5, confidence: 88, bbox: [460, 90, 110, 90], status: "safe", risk: "Designated Relief Camp" },
      { id: "STR-Y4", name: "High-Tension Transmission Tower", type: "pole", height_m: 28.0, elevation_m: 3.5, confidence: 82, bbox: [210, 60, 40, 110], status: "moderate", risk: "Base Waterlogged" }
    ],
    evacuation_corridors: [
      { id: "EV-Y1", name: "ISBT Elevated Flyover Arterial", status: "CLEAR", clearance_elevation: "+6.8m elevation", ndrf_suitability: "High Capacity Vehicle Convoy" },
      { id: "EV-Y2", name: "Monastery Ghat Ramp", status: "CAUTION", clearance_elevation: "+0.4m water edge", ndrf_suitability: "Shallow Boat & Tractor" }
    ],
    preset_theme: "river_flood"
  },
  {
    id: "urban_earthquake_rubble",
    title: "Urban Structural Damage & Collapse Zone",
    subtitle: "Dense Historic Core (Earthquake Impact Simulation)",
    type: "Structural Collapse",
    date: "Seismic Impact Scenario",
    coordinates: { lat: 23.2420, lng: 69.6669, crs: "EPSG:4326 (WGS84)" },
    gsd_estimate: "0.15 m/pixel",
    description: "Pancake structural collapse of multi-story unreinforced masonry, tilted facades, pulverized rubble mounds, and blocked emergency access alleys.",
    ai_summary: "Differential height analysis reveals a 65% height loss in Block B indicating catastrophic vertical collapse. Void pockets detected in north rubble pile with estimated 2.4m cavity.",
    stats: {
      vulnerable_structures: 31,
      critical_structures: 16,
      max_elevation_relief: 18.0,
      slope_angle: "4.2°",
      confidence: 85
    },
    structures: [
      { id: "STR-E1", name: "Collapsed Commercial Complex", type: "building", height_m: 4.2, elevation_m: 0.0, confidence: 87, bbox: [190, 190, 130, 95], status: "critical", risk: "Total Pancake Collapse (Orig ~16m)" },
      { id: "STR-E2", name: "Leaning 4-Story Masonry Block", type: "building", height_m: 13.8, elevation_m: 0.2, confidence: 79, bbox: [350, 130, 90, 105], status: "critical", risk: "8.4° Lateral Tilt (Imminent Collapse)" },
      { id: "STR-E3", name: "Reinforced Concrete Hospital Wing", type: "building", height_m: 21.5, elevation_m: 0.5, confidence: 91, bbox: [50, 70, 120, 120], status: "safe", risk: "Structurally Intact / Triage Center" },
      { id: "STR-E4", name: "Fallen Overhead Water Tank", type: "pole", height_m: 2.1, elevation_m: 0.0, confidence: 76, bbox: [480, 270, 60, 50], status: "critical", risk: "Debris Blocking Alley" }
    ],
    evacuation_corridors: [
      { id: "EV-E1", name: "Main Hospital Boulevard", status: "CLEAR", clearance_elevation: "Clear 14m wide corridor", ndrf_suitability: "Heavy Earthmovers & Ambulances" },
      { id: "EV-E2", name: "Old Bazaar Narrow Alley", status: "BLOCKED", clearance_elevation: "Debris mound 3.2m high", ndrf_suitability: "K9 Search & Rescue Teams Only" }
    ],
    preset_theme: "earthquake"
  }
];

// Helper to generate rich realistic procedural canvases for images & depth maps
window.ScenarioCanvasGenerator = {
  createScenarioCanvas(scenario, mode = "rgb") {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 420;
    const ctx = canvas.getContext("2d");
    
    if (mode === "rgb") {
      this.renderRGB(ctx, scenario);
    } else if (mode === "depth") {
      this.renderDepth(ctx, scenario, "turbo");
    } else if (mode === "damage_pre") {
      this.renderDamagePair(ctx, scenario, "pre");
    } else if (mode === "damage_post") {
      this.renderDamagePair(ctx, scenario, "post");
    }
    return canvas;
  },

  renderRGB(ctx, scenario) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    
    // Background gradient
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    if (scenario.preset_theme === "valley" || scenario.preset_theme === "gorge") {
      sky.addColorStop(0, "#2c3e50");
      sky.addColorStop(0.3, "#4b6584");
      sky.addColorStop(0.6, "#2d98da");
      sky.addColorStop(1, "#1e272e");
    } else if (scenario.preset_theme === "urban_flood" || scenario.preset_theme === "river_flood") {
      sky.addColorStop(0, "#3d4a54");
      sky.addColorStop(0.4, "#576574");
      sky.addColorStop(0.7, "#485460");
      sky.addColorStop(1, "#2f3542");
    } else {
      sky.addColorStop(0, "#485460");
      sky.addColorStop(0.5, "#778ca3");
      sky.addColorStop(1, "#2f3542");
    }
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Terrain slopes / contours
    ctx.fillStyle = scenario.preset_theme === "valley" ? "#1e3725" : (scenario.preset_theme === "gorge" ? "#38332c" : "#2f3640");
    ctx.beginPath();
    ctx.moveTo(0, h * 0.4);
    ctx.bezierCurveTo(w * 0.25, h * 0.25, w * 0.65, h * 0.55, w, h * 0.35);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    // River / Flood Channel
    if (scenario.preset_theme === "valley" || scenario.preset_theme === "gorge") {
      ctx.fillStyle = "#8395a7"; // Muddy debris flow
      ctx.beginPath();
      ctx.moveTo(w * 0.45, h * 0.35);
      ctx.bezierCurveTo(w * 0.5, h * 0.55, w * 0.35, h * 0.75, w * 0.4, h);
      ctx.lineTo(w * 0.65, h);
      ctx.bezierCurveTo(w * 0.6, h * 0.75, w * 0.7, h * 0.55, w * 0.6, h * 0.35);
      ctx.fill();
    } else if (scenario.preset_theme === "urban_flood" || scenario.preset_theme === "river_flood") {
      ctx.fillStyle = "#3867d6"; // Flood water
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.65);
      ctx.bezierCurveTo(w * 0.3, h * 0.62, w * 0.7, h * 0.68, w, h * 0.64);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }

    // Render detected structures
    scenario.structures.forEach(s => {
      const [bx, by, bw, bh] = s.bbox;
      if (s.type === "building") {
        // Building facade & roof
        ctx.fillStyle = s.status === "critical" ? "#e74c3c" : (s.status === "moderate" ? "#f39c12" : "#3498db");
        ctx.fillRect(bx, by, bw, bh);
        
        // Roof perspective
        ctx.fillStyle = "#ecf0f1";
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + bw * 0.2, by - bh * 0.25);
        ctx.lineTo(bx + bw * 1.2, by - bh * 0.25);
        ctx.lineTo(bx + bw, by);
        ctx.fill();

        // Facade windows
        ctx.fillStyle = "#2c3e50";
        for (let ix = bx + 8; ix < bx + bw - 10; ix += 18) {
          for (let iy = by + 10; iy < by + bh - 10; iy += 16) {
            ctx.fillRect(ix, iy, 10, 10);
          }
        }
      } else if (s.type === "tree") {
        ctx.fillStyle = "#27ae60";
        ctx.beginPath();
        ctx.arc(bx + bw/2, by + bh/2, bw/2, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.type === "pole") {
        ctx.strokeStyle = "#d1d8e0";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bx + bw/2, by + bh);
        ctx.lineTo(bx + bw/2, by);
        ctx.stroke();
        ctx.strokeRect(bx, by, bw, bh * 0.3);
      } else if (s.type === "wall" || s.type === "road") {
        ctx.fillStyle = "#95a5a6";
        ctx.fillRect(bx, by, bw, bh);
      }

      // Small subtle ID label on RGB
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(bx, by - 14, 52, 12);
      ctx.fillStyle = "#00f0ff";
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillText(s.id, bx + 2, by - 4);
    });

    // Technical HUD overlay markings (simulated drone/satellite sensor stream)
    ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    ctx.lineWidth = 1;
    // Crosshair in center
    ctx.beginPath();
    ctx.moveTo(w/2 - 15, h/2); ctx.lineTo(w/2 + 15, h/2);
    ctx.moveTo(w/2, h/2 - 15); ctx.lineTo(w/2, h/2 + 15);
    ctx.stroke();

    // Corner brackets
    const b = 15;
    ctx.strokeRect(b, b, 20, 20);
    ctx.strokeRect(w - b - 20, b, 20, 20);
    ctx.strokeRect(b, h - b - 20, 20, 20);
    ctx.strokeRect(w - b - 20, h - b - 20, 20, 20);

    // Sensor text stamp
    ctx.fillStyle = "rgba(0, 240, 255, 0.85)";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillText(`SENSOR: MONO_RGB_RAW | GSD: ~${scenario.gsd_estimate}`, 25, 30);
    ctx.fillText(`LOC: ${scenario.coordinates.lat.toFixed(4)}°N, ${scenario.coordinates.lng.toFixed(4)}°E`, 25, 44);
  },

  renderDepth(ctx, scenario, colormap = "turbo") {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    
    // Depth base gradient: Near at bottom (hot/red or close), Far at top (dark blue or deep)
    for (let y = 0; y < h; y++) {
      const normY = y / h; // 0 = far, 1 = near
      let color;
      if (colormap === "turbo") {
        color = this.turboColor(normY);
      } else if (colormap === "spectral") {
        color = this.spectralColor(normY);
      } else if (colormap === "viridis") {
        color = this.viridisColor(normY);
      } else {
        const v = Math.floor(normY * 255);
        color = `rgb(${v},${v},${v})`;
      }
      ctx.fillStyle = color;
      ctx.fillRect(0, y, w, 1);
    }

    // Add structure depth steps
    scenario.structures.forEach(s => {
      const [bx, by, bw, bh] = s.bbox;
      const baseNorm = (by + bh) / h;
      // Structures stand out (higher = closer in depth)
      const structDepth = Math.min(1.0, baseNorm + (s.height_m / 40.0));
      
      let structColor;
      if (colormap === "turbo") structColor = this.turboColor(structDepth);
      else if (colormap === "spectral") structColor = this.spectralColor(structDepth);
      else if (colormap === "viridis") structColor = this.viridisColor(structDepth);
      else {
        const v = Math.floor(structDepth * 255);
        structColor = `rgb(${v},${v},${v})`;
      }

      ctx.fillStyle = structColor;
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, bw, bh);

      // Depth contour lines
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(bx, by + bh - 16, bw, 16);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillText(`H: ~${s.height_m}m`, bx + 4, by + bh - 4);
    });

    // Depth HUD
    ctx.fillStyle = "rgba(0, 240, 255, 0.9)";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillText(`AI MONOCULAR DEPTH ESTIMATION [COLORMAP: ${colormap.toUpperCase()}]`, 25, 30);
    ctx.fillText(`CONFIDENCE: ${scenario.stats.confidence}% | SCALE: INFERRED METRIC`, 25, 44);
  },

  renderDamagePair(ctx, scenario, phase = "pre") {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    this.renderRGB(ctx, scenario);

    if (phase === "pre") {
      // Pristine pre-disaster status
      ctx.fillStyle = "rgba(0, 255, 128, 0.15)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#00ff80";
      ctx.font = "bold 14px 'JetBrains Mono', monospace";
      ctx.fillText("PRE-DISASTER BASELINE (ARCHIVAL)", 25, 30);
    } else {
      // Post-disaster damage highlights
      ctx.fillStyle = "rgba(255, 0, 50, 0.2)";
      ctx.fillRect(0, 0, w, h);

      // Structural collapse marks
      scenario.structures.filter(s => s.status === "critical").forEach(s => {
        const [bx, by, bw, bh] = s.bbox;
        ctx.strokeStyle = "#ff0055";
        ctx.lineWidth = 3;
        ctx.strokeRect(bx - 4, by - 4, bw + 8, bh + 8);
        
        ctx.fillStyle = "#ff0055";
        ctx.font = "bold 10px 'JetBrains Mono', monospace";
        ctx.fillText("COLLAPSE / SUBMERGED", bx, by - 6);
      });

      ctx.fillStyle = "#ff0055";
      ctx.font = "bold 14px 'JetBrains Mono', monospace";
      ctx.fillText("POST-DISASTER AI DAMAGE ASSESSMENT", 25, 30);
    }
  },

  // Colormap math
  turboColor(t) {
    const r = Math.min(255, Math.max(0, 34.61 + t * (1172.33 + t * (-10793.56 + t * (33300.12 + t * (-38394.49 + t * 14825.05))))));
    const g = Math.min(255, Math.max(0, 23.31 + t * (557.33 + t * (1225.33 + t * (-3574.96 + t * (1073.77 + t * 707.56))))));
    const b = Math.min(255, Math.max(0, 27.2 + t * (3211.1 - t * (15327.97 - t * (27814.0 - t * (22569.18 - t * 6838.66))))));
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  },

  spectralColor(t) {
    const x = t * 4.0;
    const r = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(x - 3.0))));
    const g = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(x - 2.0))));
    const b = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(x - 1.0))));
    return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  },

  viridisColor(t) {
    // Viridis approx: purple -> teal -> yellow
    const r = Math.round(255 * (0.28 + 0.72 * t * t));
    const g = Math.round(255 * (0.05 + 0.9 * t));
    const b = Math.round(255 * (0.35 + 0.65 * (1.0 - Math.abs(t - 0.5) * 2)));
    return `rgb(${r},${g},${b})`;
  }
};
