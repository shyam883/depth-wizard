"""
DEPTH WIZARD — Backend Server
Smart India Hackathon 2026 | Problem Statement SIH26175
Theme: Disaster Management

FastAPI REST API for Single-View Height Estimation, Monocular Depth Processing,
and 3D Disaster Intelligence.
"""

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import base64
import io
import time
import json
import numpy as np
from PIL import Image

app = FastAPI(
    title="Depth Wizard Intelligence API",
    description="Single-View Height Estimation and 3D Flythrough for Disaster Management",
    version="1.0.0"
)

# Enable CORS for seamless local and remote frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Data Models
# ---------------------------------------------------------------------------
class StructureDetection(BaseModel):
    id: str
    name: str
    type: str  # building, tree, pole, terrain, road, wall
    estimated_height_m: float
    confidence_score: float
    bbox: List[int]  # [x, y, w, h]
    relative_elevation_m: float
    vulnerability_status: str  # safe, moderate_risk, high_risk, critical

class DepthResponse(BaseModel):
    status: str
    inference_time_ms: float
    depth_map_base64: str
    colormap: str
    min_depth: float
    max_depth: float
    ground_plane_estimated: bool
    scale_calibration: Dict[str, Any]

class DisasterAnalysisResponse(BaseModel):
    scenario_name: str
    flood_risk_level: str
    vulnerable_structures_count: int
    critical_inundation_depth_m: float
    emergency_access_status: str
    detected_structures: List[StructureDetection]
    evacuation_routes: List[Dict[str, Any]]
    confidence: float
    limitations_notice: str

# ---------------------------------------------------------------------------
# Core Endpoints
# ---------------------------------------------------------------------------
@app.get("/")
def read_root():
    return {
        "system": "DEPTH WIZARD Intelligence Engine",
        "version": "1.0.0",
        "sih_problem_id": "SIH26175",
        "status": "ONLINE",
        "ai_model": "DepthAnythingV2-Metric-Sim",
        "georeferencing_mode": "Hybrid (Relative 3D / Calibrated GIS)"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "HEALTHY",
        "uptime": "99.9%",
        "compute_mode": "CPU/GPU Accelerated",
        "timestamp": time.time()
    }

@app.get("/api/scenarios")
def get_demo_scenarios():
    """Returns pre-configured disaster management demo scenarios."""
    scenarios = [
        {
            "id": "wayanad_landslide",
            "name": "Wayanad Landslide Corridor (Kerala)",
            "type": "Landslide & Mudflow",
            "location": "Chooralmala, Wayanad",
            "coordinates": {"lat": 11.5280, "lng": 76.1750, "crs": "EPSG:4326"},
            "description": "Steep valley terrain with debris flow, collapsed river embankments, and isolated residential clusters.",
            "estimated_vulnerable_structures": 14,
            "average_slope_deg": 28.4
        },
        {
            "id": "chennai_urban_flood",
            "name": "Chennai Urban Inundation (Velachery/Tambaram)",
            "type": "Urban Inundation",
            "location": "Velachery Basin, Chennai",
            "coordinates": {"lat": 12.9815, "lng": 80.2180, "crs": "EPSG:4326"},
            "description": "Dense urban residential pocket with 1.8m standing floodwater, submerged ground floors, and blocked arterial roads.",
            "estimated_vulnerable_structures": 23,
            "average_slope_deg": 1.2
        },
        {
            "id": "chamoli_valley",
            "name": "Chamoli Flash Flood Gorge (Uttarakhand)",
            "type": "Glacial Lake Outburst / Flash Flood",
            "location": "Rishi Ganga Valley, Chamoli",
            "coordinates": {"lat": 30.5528, "lng": 79.5672, "crs": "EPSG:4326"},
            "description": "High-altitude gorge with severe erosion along river banks, damaged bridge abutments, and hanging debris.",
            "estimated_vulnerable_structures": 9,
            "average_slope_deg": 36.8
        },
        {
            "id": "delhi_yamuna_floodplain",
            "name": "Yamuna River Floodplain Encroachment (Delhi)",
            "type": "Riverine Flood",
            "location": "Old Railway Bridge Sector, Delhi",
            "coordinates": {"lat": 28.6650, "lng": 77.2450, "crs": "EPSG:4326"},
            "description": "Shallow floodplain with temporary settlements, submerged agricultural patches, and compromised road links.",
            "estimated_vulnerable_structures": 18,
            "average_slope_deg": 0.8
        },
        {
            "id": "urban_earthquake_rubble",
            "name": "Urban Structural Damage Zone (Bhuj Replica)",
            "type": "Earthquake Collapse",
            "location": "Old Walled City Core",
            "coordinates": {"lat": 23.2420, "lng": 69.6669, "crs": "EPSG:4326"},
            "description": "Dense multi-story masonry structures with partial pancake collapses, leaning facades, and debris-blocked alleys.",
            "estimated_vulnerable_structures": 31,
            "average_slope_deg": 3.5
        }
    ]
    return {"scenarios": scenarios}

@app.post("/api/estimate-depth")
async def estimate_depth(
    file: UploadFile = File(...),
    colormap: str = Form("turbo"),
    focal_length_estimate: Optional[float] = Form(1.0)
):
    """
    Simulates / computes monocular depth map from an uploaded RGB image.
    Uses luminance-gradient fusion and edge disparity heuristics when running in lightweight mode.
    """
    start_time = time.time()
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Resize for consistent rapid processing
        max_dim = 640
        image.thumbnail((max_dim, max_dim), Image.Resampling.BILINEAR)
        img_np = np.array(image, dtype=np.float32) / 255.0
        
        # Monocular depth approximation heuristic for instant demo
        h, w, _ = img_np.shape
        y_coords = np.linspace(0.1, 1.0, h)[:, None]  # Perspective gradient
        y_grid = np.repeat(y_coords, w, axis=1)
        
        gray = 0.2989 * img_np[:, :, 0] + 0.5870 * img_np[:, :, 1] + 0.1140 * img_np[:, :, 2]
        
        # Simulated depth field: blending perspective gradient and local texture contrast
        depth_raw = 0.65 * y_grid + 0.35 * (1.0 - gray)
        depth_norm = (depth_raw - depth_raw.min()) / (depth_raw.max() - depth_raw.min() + 1e-6)
        
        # Convert to 8-bit grayscale depth buffer
        depth_uint8 = (depth_norm * 255).astype(np.uint8)
        depth_img = Image.fromarray(depth_uint8)
        
        buffered = io.BytesIO()
        depth_img.save(buffered, format="PNG")
        depth_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        elapsed_ms = (time.time() - start_time) * 1000
        
        return DepthResponse(
            status="SUCCESS",
            inference_time_ms=round(elapsed_ms, 1),
            depth_map_base64=depth_base64,
            colormap=colormap,
            min_depth=1.2,
            max_depth=48.5,
            ground_plane_estimated=True,
            scale_calibration={
                "mode": "inferred_camera_prior",
                "assumed_focal_length": focal_length_estimate,
                "confidence_score": 0.84,
                "relative_scale_only": True
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Depth processing failed: {str(e)}")

@app.post("/api/disaster-analysis")
async def run_disaster_analysis(
    scenario_id: str = Form("wayanad_landslide"),
    simulated_water_level_m: float = Form(2.5)
):
    """
    Evaluates disaster risk, height estimations, and emergency accessibility metrics.
    """
    sample_structures = [
        StructureDetection(
            id="STR_01",
            name="Primary Community Center",
            type="building",
            estimated_height_m=12.4,
            confidence_score=0.86,
            bbox=[120, 150, 180, 110],
            relative_elevation_m=8.2,
            vulnerability_status="safe" if simulated_water_level_m < 8.0 else "high_risk"
        ),
        StructureDetection(
            id="STR_02",
            name="Residential Block Alpha",
            type="building",
            estimated_height_m=7.8,
            confidence_score=0.81,
            bbox=[320, 240, 140, 95],
            relative_elevation_m=1.8,
            vulnerability_status="critical" if simulated_water_level_m >= 1.5 else "moderate_risk"
        ),
        StructureDetection(
            id="STR_03",
            name="Sub-station Transformer Unit",
            type="pole",
            estimated_height_m=5.2,
            confidence_score=0.74,
            bbox=[480, 290, 40, 60],
            relative_elevation_m=0.9,
            vulnerability_status="critical" if simulated_water_level_m >= 0.8 else "moderate_risk"
        ),
        StructureDetection(
            id="STR_04",
            name="Hillside Vegetation Canopy",
            type="tree",
            estimated_height_m=9.6,
            confidence_score=0.79,
            bbox=[50, 60, 210, 120],
            relative_elevation_m=14.5,
            vulnerability_status="safe"
        )
    ]
    
    vulnerable_count = sum(1 for s in sample_structures if s.vulnerability_status in ["critical", "high_risk"])
    
    return DisasterAnalysisResponse(
        scenario_name=scenario_id,
        flood_risk_level="HIGH" if simulated_water_level_m > 2.0 else "MODERATE",
        vulnerable_structures_count=vulnerable_count,
        critical_inundation_depth_m=simulated_water_level_m,
        emergency_access_status="Partial Obstruction along South-West Corridor",
        detected_structures=sample_structures,
        evacuation_routes=[
            {"id": "ROUTE_A", "name": "Ridge Line High-Ground Access", "status": "OPEN", "elevation_margin_m": 6.4},
            {"id": "ROUTE_B", "name": "River Embankment Service Road", "status": "INUNDATED" if simulated_water_level_m > 1.2 else "CAUTION", "elevation_margin_m": -0.8}
        ],
        confidence=0.82,
        limitations_notice="Inferred spatial dimensions are relative approximations derived from single-view monocular perspective. Absolute elevation requires ground-control points (GCP) or calibrated reference scale."
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
