"""
Disaster Analyzer: Inundation risk, damage differential, and access corridor topology
"""

from typing import Dict, List, Any

def assess_flood_inundation(
    structures: List[Dict[str, Any]],
    water_elevation_m: float
) -> Dict[str, Any]:
    """
    Computes flood impact across detected structures based on relative elevation.
    """
    vulnerable = []
    safe = []
    
    for s in structures:
        rel_elev = s.get("relative_elevation_m", 0.0)
        margin = rel_elev - water_elevation_m
        if margin < 0.5:
            vulnerable.append({**s, "inundation_risk": "CRITICAL", "water_depth_at_base_m": round(abs(margin), 2)})
        elif margin < 1.8:
            vulnerable.append({**s, "inundation_risk": "MODERATE", "freeboard_m": round(margin, 2)})
        else:
            safe.append({**s, "inundation_risk": "SAFE", "freeboard_m": round(margin, 2)})
            
    return {
        "water_level_m": water_elevation_m,
        "total_structures": len(structures),
        "vulnerable_count": len(vulnerable),
        "vulnerability_percentage": round((len(vulnerable) / max(1, len(structures))) * 100, 1),
        "vulnerable_structures": vulnerable,
        "safe_structures": safe
    }
