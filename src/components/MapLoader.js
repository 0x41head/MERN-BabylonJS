import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useNavigate } from 'react-router-dom';

import '../css/Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ5YW5naXJvdWQiLCJhIjoiY2xmY3FqbThpMDd1NzN6dDc2dXltaGd2aSJ9.wBILi9ev5Tk-sbkP0kQ95A';
 
export default function MapLoader() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(5);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(1.5);
    const navigate = useNavigate()
 
useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
        preserveDrawingBuffer: true
    });
});
 
useEffect(() => {
if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
    });
});

const TakeScreenshot = async () =>{
    var img= await map.current.getCanvas().toDataURL();
    //console.log(img)
    navigate(`/cuboid`,{state: img})
}
 
return (
        <div>
            <div className="top-left-bar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div className="bottom-right-bar">
                <button onClick={()=>{TakeScreenshot()}}>Generate Cuboid</button>
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}