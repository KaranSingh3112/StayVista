

// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     center: [77.2090, 28.6139], // starting position [lng, lat]. Note that lat must be set between -90 and 90
//     zoom: 9 // starting zoom
// });


const map = L.map('map').setView(
    [coordinates[1], coordinates[0]],
    13
);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

L.marker([coordinates[1], coordinates[0]])
    .addTo(map)
    .bindPopup(`
    <h6>${listingTitle}</h6>
    <p>Exact location provided after booking</p>
`);

setTimeout(() => {
    map.invalidateSize();
}, 100);    