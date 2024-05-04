document.addEventListener("DOMContentLoaded", () => {
  const mapOptions = {
    center: [-6.2280988, 106.8060391],
    zoom: 14,
  };

  const map = new L.map("map", mapOptions);

  const layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  map.addLayer(layer);

  const apiKey = "59118f43a1594838b4544b1c90ccd7c8"; // Ganti dengan API key Anda
  let marker = null;

  const addressSearchControl = L.control.addressSearch(apiKey, {
    position: "topleft",
    placeholder: "Masukkan alamat di sini",
    resultCallback: (address) => {
      if (!address) {
        return;
      }
      if (marker !== null) {
        map.removeLayer(marker);
      }
      marker = L.marker([address.lat, address.lon]).addTo(map);
      map.setView([address.lat, address.lon], 15);

      // Update input fields with latitude and longitude
      document.getElementById("latitude").value = address.lat.toFixed(6);
      document.getElementById("longitude").value = address.lon.toFixed(6);
    },
  });

  map.addControl(addressSearchControl);

  map.on("click", (event) => {
    const { lat, lng } = event.latlng;
    console.log("Latitude:", lat, "Longitude:", lng);
  });
});
