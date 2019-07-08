// MAP
const map = L.map("issMap").setView([0, 0], 2); //[coordinates], initial zoom amount
let path = [];
let markers = new L.FeatureGroup();

const issIcon = L.icon({
  iconUrl: "img/space-station.svg",
  iconSize: [32, 92],
  iconAnchor: [16, 46]
});
const userIcon = L.icon({
  iconUrl: "img/userloc.svg",
  iconSize: [50, 110],
  iconAnchor: [25, 55],
  className: "pulse"
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png ", {
  maxZoom: 19 //max zoom allowed
}).addTo(map);

// ISS Icon
const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

map.addLayer(markers);

// Daylight Map
L.terminator().addTo(map);

// Follow ISS Control Button
const centerISScontrol = L.control({ position: "bottomleft" });

centerISScontrol.onAdd = function(map) {
  let div = L.DomUtil.create("div", "centerISScontrol");

  div.innerHTML =
    '<form>Follow ISS  <input id="centralizeISS" name="centralizeISS" type="checkbox" onclick="followISS()" aria-label="Check to follow the ISS on the map" title="Check to follow the ISS on the map" checked/></form>';
  return div;
};

centerISScontrol.addTo(map);
