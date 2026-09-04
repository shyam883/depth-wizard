/**
 * DEPTH WIZARD — GIS & Georeferencing Module
 * Integrates Leaflet mapping, Coordinate Reference Systems (WGS84 / UTM),
 * Ground Sampling Distance (GSD), and Relative vs Absolute mode badging.
 */

window.GisModule = {
  map: null,
  marker: null,
  polygon: null,
  tileLayer: null,
  isInitialized: false,

  init(containerId = "gis-map-container") {
    const container = document.getElementById(containerId);
    if (!container || this.isInitialized) return;

    if (window.L) {
      this.map = L.map(containerId, {
        attributionControl: false,
        zoomControl: true
      }).setView([11.5280, 76.1750], 14);

      const isLight = document.body.classList.contains("light-mode");
      const tileUrl = isLight 
        ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

      this.tileLayer = L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: "abcd"
      }).addTo(this.map);

      this.isInitialized = true;
    }
  },

  setTheme(theme = "dark") {
    if (!this.map || !window.L) return;
    if (this.tileLayer) {
      this.map.removeLayer(this.tileLayer);
    }
    const tileUrl = theme === "light"
      ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    this.tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: "abcd"
    }).addTo(this.map);
  },

  updateScenario(scenario) {
    if (!this.map || !window.L || !scenario) return;

    const lat = scenario.coordinates.lat;
    const lng = scenario.coordinates.lng;

    this.map.setView([lat, lng], 14);

    // Remove existing markers
    if (this.marker) this.map.removeLayer(this.marker);
    if (this.polygon) this.map.removeLayer(this.polygon);

    // Custom Cyan Crosshair Marker
    const customIcon = L.divIcon({
      className: "gis-crosshair-icon",
      html: `
        <div style="width:24px;height:24px;border:2px solid #00f0ff;border-radius:50%;background:rgba(0,240,255,0.2);display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px #00f0ff;">
          <div style="width:6px;height:6px;background:#00f0ff;border-radius:50%;"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    this.marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
    this.marker.bindPopup(`
      <div style="font-family:monospace;font-size:11px;color:#0f172a;line-height:1.4;">
        <strong style="color:#0284c7;">${scenario.title}</strong><br/>
        <strong>CRS:</strong> ${scenario.coordinates.crs}<br/>
        <strong>LAT:</strong> ${lat.toFixed(4)}°N | <strong>LNG:</strong> ${lng.toFixed(4)}°E<br/>
        <strong>GSD:</strong> ${scenario.gsd_estimate}
      </div>
    `).openPopup();

    // Reconstructed Scene Bounding Polygon
    const delta = 0.004;
    const bounds = [
      [lat - delta, lng - delta * 1.4],
      [lat + delta, lng - delta * 1.4],
      [lat + delta, lng + delta * 1.4],
      [lat - delta, lng + delta * 1.4]
    ];

    this.polygon = L.polygon(bounds, {
      color: "#00f0ff",
      weight: 1.5,
      dashArray: "4, 4",
      fillColor: "#00f0ff",
      fillOpacity: 0.15
    }).addTo(this.map);
  }
};
