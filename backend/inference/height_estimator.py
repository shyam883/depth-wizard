"""
Height Estimator: Relative Height and Perspective Geometry Analytics
"""

import numpy as np
from typing import Dict, List, Any

def calculate_structure_height(
    bbox: List[int],
    depth_map: np.ndarray,
    camera_height_m: float = 30.0,
    focal_length_px: float = 800.0
) -> Dict[str, Any]:
    """
    Computes structure height from bounding box pixels and depth disparity.
    Mathematical relationship:
    H_est = (Z_base * (y_bottom - y_top)) / f_y
    """
    x, y, w, h = bbox
    img_h, img_w = depth_map.shape
    
    # Clip bounding box
    x1 = max(0, x)
    y1 = max(0, y)
    x2 = min(img_w - 1, x + w)
    y2 = min(img_h - 1, y + h)
    
    if y2 <= y1 or x2 <= x1:
        return {"height_m": 0.0, "confidence": 0.0}
        
    base_depth = float(depth_map[y2, (x1 + x2) // 2]) * 50.0  # Scale factor to meters
    pixel_height = float(y2 - y1)
    
    # Perspective height formula
    estimated_h = (base_depth * pixel_height) / focal_length_px
    estimated_h = max(1.5, min(45.0, estimated_h))  # Reasonable structure bounds
    
    confidence = 0.85 - (0.15 * (1.0 - (pixel_height / img_h)))
    
    return {
        "estimated_height_m": round(estimated_h, 1),
        "confidence_score": round(max(0.60, min(0.95, confidence)), 2),
        "relative_elevation_m": round(base_depth * 0.15, 1)
    }
