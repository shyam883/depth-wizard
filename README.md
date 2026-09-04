# DEPTH WIZARD — Single-View Height Estimation and 3D Flythrough

> **Smart India Hackathon 2026 | Problem Statement SIH26175**  
> **Theme:** Disaster Management  
> **Tagline:** *“One Image. Depth. Height. 3D. Disaster Intelligence.”*

---

## 1. Executive Summary

During sudden disasters (flash floods, cloudburst landslides, earthquakes, or cyclone storm surges), conventional geospatial intelligence such as **LiDAR point clouds, multi-view drone photogrammetry, or stereoscopic satellite passes** is often unavailable, obstructed by adverse weather, or too slow to deploy within the golden 72-hour search-and-rescue window.

**DEPTH WIZARD** solves this critical bottleneck by transforming a **single, ordinary 2D RGB image** (captured from a mobile phone, news broadcast, handheld camera, or single aerial reconnaissance pass) into:
1. **Dense Monocular Depth Maps** (pixel-wise disparity modeling).
2. **Relative Height & Elevation Estimation** for buildings, infrastructure, trees, and terrain relief.
3. **Interactive 3D WebGL Scene Reconstruction** (displacement heightfield meshes and 100,000+ RGB point clouds).
4. **Cinematic Autonomous 3D Flythrough** with real-time drone HUD flight telemetry.
5. **Disaster Management Analytics** (dynamic flood inundation modeling, pre/post disaster structural damage assessment, emergency access routing, and official NDMA SITREP export).

---

## 2. Key Features

- **Dark Command-Center UX**: Designed specifically for Indian disaster management agencies (NDMA / NDRF / State SDRF) with high information density, cybernetic cyan/blue accents, and clean technical typography.
- **RGB $\leftrightarrow$ Depth Split Screen**: Interactive wipe slider with multiple colormaps (Turbo, Spectral, Viridis, Grayscale) and localized depth probe sampler.
- **Perspective Height Solver**: Pin-hole geometry and vanishing-line algorithms with 1σ statistical uncertainty intervals and reference scale calibration.
- **Three.js WebGL 3D Reconstruction**: 60 FPS real-time rendering supporting textured heightfield terrain, 100k+ particle point clouds, extruded 3D buildings, and raycast click telemetry.
- **Autonomous Drone Flythrough**: Catmull-Rom spline camera trajectories with real-time HUD telemetry (Altitude AGL, Relative Elevation, Distance Traveled, Visible Structures, Heading, and Confidence).
- **Dynamic Flood Simulation**: Real-time water rise slider that dynamically recalculates submerged structures, critical facility risk, and blocked evacuation corridors.
- **Pre / Post Damage Assessment**: Differential structural integrity and pancake collapse detection.
- **GIS Georeferencing Hub**: Leaflet integration with WGS84 coordinates, Ground Sampling Distance (GSD), and clear distinction between *Relative 3D Mode* and *Calibrated GIS Mode*.
- **NDMA Situation Reports**: 1-click printable PDF SITREP and JSON export adhering to national disaster relief briefing templates.
- **Interactive Judge Tour**: 8-step guided presentation mode built directly into the UI for hackathon evaluations.

---

## 3. Mathematical Formulation

### Single-View Perspective Height Estimation

$$H_{est} = \frac{Z_{base} \cdot \Delta y}{f_y \cdot \cos(\theta_{pitch})}$$

Where:
- $H_{est}$: Inferred metric height of the structure (m).
- $Z_{base}$: Inferred base depth along the optical axis (m).
- $\Delta y$: Vertical pixel height ($y_{bottom} - y_{top}$).
- $f_y$: Inferred vertical focal length (px).
- $\theta_{pitch}$: Camera tilt angle inferred from vanishing points and horizon line.

### Scale Ambiguity Resolution

Monocular depth is inherently subject to scale ambiguity ($s \cdot Z$). Depth Wizard resolves scale using semantic reference priors:
- Standard Passenger Vehicle: $\sim 1.5\text{ m}$
- Standard Residential Doorway: $\sim 2.1\text{ m}$
- Standard Residential Story: $\sim 3.2\text{ m}$
- Two-Lane Road Width: $\sim 7.0\text{ m}$

---

## 4. Quick Start Guide

### Option A: 1-Click Zero-Dependency Local Demo (Recommended for Judges)

Run the Python demo launcher:
```bash
python run_demo.py
```
This automatically boots a local HTTP server on port 8080 and opens your default browser to the **Depth Intelligence Console**.

### Option B: FastAPI Backend API

To run the companion FastAPI REST server:
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Access the interactive OpenAPI Swagger docs at `http://127.0.0.1:8000/docs`.

---

## 5. Judge "Wow Moment" Walkthrough Sequence

1. **Step 1 — Input 2D Image**: Load an ordinary image. The system confirms *"No LiDAR detected. No drone data required."*
2. **Step 2 — AI Processing Pipeline**: Real-time pipeline step-through in under 450ms.
3. **Step 3 — Depth Map**: Slide the RGB $\leftrightarrow$ Depth wipe slider to reveal dense terrain relief contours.
4. **Step 4 — 3D Scene**: Switch to **3D Reconstruction** to see the 2D image lift into an interactive 3D WebGL heightfield.
5. **Step 5 — 3D Flythrough**: Click **"Enter Flythrough"** to activate the autonomous drone camera and live HUD flight telemetry.
6. **Step 6 — Click Structure**: Click any 3D building or terrain point to inspect its inferred height (e.g. `~14.8m`), relative elevation (`+18.2m`), and confidence score (`84%`).
7. **Step 7 — Disaster Mode**: Switch to **Disaster Intelligence** and adjust the flood water slider to see real-time submergence and emergency route clearance.
8. **Step 8 — NDMA SITREP**: Export official disaster situation reports and review the **Responsible AI** scale disclosures.

---

## 6. Project Directory Structure

```
depth-wizard/
├── backend/
│   ├── main.py                  # FastAPI server with depth, height, and disaster REST endpoints
│   ├── requirements.txt         # Python dependencies
│   └── inference/
│       ├── depth_engine.py      # Depth Anything / ZoeDepth metric disparity algorithms
│       ├── height_estimator.py  # Perspective geometry and horizon line height solver
│       └── disaster_analyzer.py # Inundation vulnerability and evacuation routing
├── frontend/
│   ├── index.html               # Main Command Center UI, Landing Page & Modals
│   ├── styles/
│   │   └── main.css             # Dark command-center styling, glassmorphism & HUD
│   └── js/
│       ├── sample_dataset.js    # 5 Indian disaster scenarios (Wayanad, Chennai, Chamoli, etc.)
│       ├── depth_engine.js      # Client-side monocular depth estimation & colormapping
│       ├── height_engine.js     # Perspective height solver & uncertainty calculator
│       ├── three_viewer.js      # Three.js 3D WebGL engine (heightfield, 100k points, 3D meshes)
│       ├── flythrough.js        # Catmull-Rom drone flight path & live HUD telemetry
│       ├── disaster_module.js   # Dynamic flood simulator & damage differential analyzer
│       ├── gis_module.js        # Leaflet GIS integration & CRS metadata
│       ├── judge_tour.js        # 8-step interactive guided presentation tour
│       ├── report_generator.js  # Official NDMA / NDRF Situation Report generator
│       └── app.js               # Application state manager & event wiring
├── run_demo.py                  # Zero-dependency local server launcher
└── README.md                    # System documentation & technical blueprint
```

---

## 7. Responsible AI & Limitations Disclosure

Single-view depth estimation provides mathematically inferred spatial information. Absolute elevation accuracy depends on camera intrinsics, scene reference objects, and ground conditions. Depth Wizard clearly presents statistical confidence intervals, avoids unscientific centimeter-level claims from monocular RGB, and provides transparent guidance for disaster relief operators.
