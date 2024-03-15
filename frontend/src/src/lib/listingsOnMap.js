function updateMapStyle(map)
{
    map.data.setStyle({});
    map.data.setStyle(function(feature)
    {
        const aqi = feature.getProperty('AQI');
        const disaster_index = feature.getProperty('disaster_index');
        const crime_index = feature.getProperty('crime_index');
        let airQualityIndex = Math.min(255, aqi*6);
        let disasterIndexColor = Math.min(255, disaster_index*3);
        let crimeIndexColor =Math.min(255, crime_index*3);
        const color = "rgb(" + airQualityIndex + "," + disasterIndexColor + "," + crimeIndexColor + ")";
        return {
            fillColor: color,
            strokeWeight: 0,
            strokeColor: color,
            strokeOpacity:0.5,
            fillOpacity:0.5
        };
    });
}

let map;
async function initMap()
{
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
        "marker",
    );

    map = new Map(document.getElementById("map"), {
        center: { lat: 46.3430, lng: -72.5421 },
        zoom: 12,
        mapId: "4504f8b37365c3d0",
    });

    //loadIndex(map);
    map.data.loadGeoJson("./zone_data.geojson");
    updateMapStyle(map)

    const priceTag = document.createElement("div");

    priceTag.className = "price-tag";
    priceTag.textContent = "$2.5M";

    // add marker for house
    const marker = new AdvancedMarkerElement({
        map,
        position: { lat: 46.3430, lng: -72.5421 },
        content: priceTag,
    });
}
initMap().then(() => {});