//
// function initMap()
// {
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 13,
//         center: {
//             lat: 51.501904,
//             lng: -0.115871
//         },
//     });
//     const transitLayer = new google.maps.TransitLayer();
//
//     transitLayer.setMap(map);
// }
//
// window.initMap = initMap;
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
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
        "marker",
    );

    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(-33.91722, 151.23064),
        zoom: 16,
        mapId: "DEMO_MAP_ID",
    });

    //loadIndex(map);
    map.data.loadGeoJson("./zone_data.geojson");
    updateMapStyle(map)

    const iconBase =
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {
        parking: {
            icon: iconBase + "parking_lot_maps.png",
        },
        library: {
            icon: iconBase + "library_maps.png",
        },
        info: {
            icon: iconBase + "info-i_maps.png",
        },
    };
    const features = [
        {
            position: new google.maps.LatLng(-33.91721, 151.2263),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91539, 151.2282),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91747, 151.22912),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.9191, 151.22907),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91725, 151.23011),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91872, 151.23089),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91784, 151.23094),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91682, 151.23149),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.9179, 151.23463),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91666, 151.23468),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.916988, 151.23364),
            type: "info",
        },
        {
            position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
            type: "parking",
        },
        {
            position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
            type: "library",
        },
    ];

    for (let i = 0; i < features.length; i++) {
        const iconImage = document.createElement("img");

        iconImage.src = icons[features[i].type].icon;

        const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: features[i].position,
            content: iconImage,
        });
    }
}

initMap().then(r => {});