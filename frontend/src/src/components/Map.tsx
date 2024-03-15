/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import  { useEffect } from "react";
import Pin from "./Pin.tsx";
declare global
{
    interface Window
    {
        initMap: () => void;
    }
}
const Map = ({items}:any) =>
{
    useEffect(() =>
    {
        function updateMapStyle(map:any)
        {
            map.data.setStyle({});
            map.data.setStyle(function(feature:any)
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
        const initMap = () =>
        {
            const mapElement = document.getElementById("map");
            if (!mapElement) return;

            // Initialize the map
            const map = new google.maps.Map(mapElement, {
                center: { lat: 46.3430, lng: -72.5421 },
                zoom: 11,
            });

            map.data.loadGeoJson("./zone_data.geojson");
            updateMapStyle(map);

            const priceTag = document.createElement("div");

            priceTag.className = "price-tag";
            priceTag.textContent = "$2.5M";

            // add marker for house
            new google.maps.Marker({
                map,
                position: { lat: 46.3430, lng: -72.5421 },
                // title: priceTag,
            });

            items?.forEach((item: any) =>
            {
                new google.maps.Marker({
                    map,
                    position: {lat: item.latitude, lng: item.longitude},
                });
                <Pin item={item} key={item.id}/>
            });

            // {items.map((item: { id: number; })=>(
            //     <Pin item={item} key={item.id}/>
            // ))}

        };
        window.initMap = initMap;

        initMap();
    }, []);

    return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default Map;
