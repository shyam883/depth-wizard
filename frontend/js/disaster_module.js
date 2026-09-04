/**
 * DEPTH WIZARD — Disaster Management Intelligence Suite
 * Modules:
 * - Dynamic Flood Inundation & Vulnerability Modeling
 * - Pre/Post Disaster Damage Assessment & Differential Analysis
 * - Emergency Access & Safe Evacuation Routing
 */

window.DisasterModule = {
  activeScenario: null,
  simulatedWaterLevel: 2.5,
  damageSplitPosition: 50, // Percentage 0..100

  init(scenario) {
    this.activeScenario = scenario;
  },

  /**
   * Calculates dynamic flood inundation statistics based on water height slider
   */
  evaluateFloodRisk(waterLevelM) {
    this.simulatedWaterLevel = waterLevelM;
    if (!this.activeScenario) return null;

    let criticalCount = 0;
    let moderateCount = 0;
    let safeCount = 0;

    const evaluatedStructures = this.activeScenario.structures.map(s => {
      const margin = s.elevation_m - waterLevelM;
      let status = "safe";
      let statusNote = `+${margin.toFixed(1)}m Freeboard (Dry)`;

      if (margin < 0.2) {
        status = "critical";
        criticalCount++;
        statusNote = `Submerged by ${(waterLevelM - s.elevation_m).toFixed(1)}m water`;
      } else if (margin < 1.8) {
        status = "moderate";
        moderateCount++;
        statusNote = `Critical Margin: only +${margin.toFixed(1)}m above water`;
      } else {
        safeCount++;
      }

      return {
        ...s,
        current_status: status,
        statusNote
      };
    });

    // Update ThreeViewer flood water level
    if (window.ThreeViewer) {
      window.ThreeViewer.setWaterElevation(waterLevelM * 0.8);
    }

    return {
      waterLevelM,
      total: this.activeScenario.structures.length,
      criticalCount,
      moderateCount,
      safeCount,
      vulnerableTotal: criticalCount + moderateCount,
      vulnerabilityPercentage: Math.round(((criticalCount + moderateCount) / this.activeScenario.structures.length) * 100),
      structures: evaluatedStructures
    };
  },

  /**
   * Evaluates Emergency Corridors based on active inundation & debris obstruction
   */
  evaluateCorridors(waterLevelM) {
    if (!this.activeScenario) return [];

    return this.activeScenario.evacuation_corridors.map(c => {
      let activeStatus = c.status;
      let note = c.ndrf_suitability;

      if (c.id.includes("2") && waterLevelM > 1.0) {
        activeStatus = "INUNDATED / BLOCKED";
        note = "Impassable. Divert to High-Ground Ridge Spur.";
      }

      return {
        ...c,
        activeStatus,
        note
      };
    });
  }
};
