import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './TrailMap.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const TrailMap = (props) => {
    console.log(props)
  const mapContainerRef = useRef(null);

  var data = props.map_data
  var lgnNum = data.longitude
  var latNum = data.latitude
  var zoomNum = 10.5

//   var coordinates = data.map_info.features[0].geometry.coordinates
//   console.log('printing features...')
//   console.log(coordinates)

  // Calculate the optimal zoomNum
  const calculateZoom = () => {
      var coordinates = data.map_info.features[0].geometry.coordinates
      console.log(coordinates)
      var lgnMin = 10000;
      var lgnMax = -10000;
      var latMin = 10000;
      var latMax = -10000;
      for (let coord of coordinates) {
          if (coord[0] < lgnMin) {
              lgnMin = coord[0];
          }
          if (coord[0] > lgnMax) {
              lgnMax = coord[0]
          }
          if (coord[1] < latMin) {
              latMin = coord[1]
          }
          if (coord[1] > latMax) {
              latMax = coord[1]
          }
      }
      return [
          45 * Math.sqrt(Math.abs(lgnMin - lgnMax) * Math.abs(lgnMin - lgnMax) + Math.abs(latMin - latMax) * Math.abs(latMin - latMax)),
          (lgnMin + lgnMax) / 2.0,
          (latMin + latMax) / 2.0
        ];
  };
  console.log('range', calculateZoom()[0]);
  zoomNum = 150.0 / (calculateZoom()[0] / 3.0 + 9.9);
  lgnNum = calculateZoom()[1];
  console.log('adjusted lgnNum', lgnNum)
  latNum = calculateZoom()[2];
  console.log('adjusted latNum', latNum);
  
  console.log('printing adjusted zoomNum', zoomNum);

  const [lng, setLng] = useState(lgnNum);
  const [lat, setLat] = useState(latNum);
  const [zoom, setZoom] = useState(zoomNum);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    
    var trail_json = props.map_data.map_info
    
    map.on('load', function () {

            map.addSource( 'trail', {
                'type': 'geojson',
                'data': trail_json
            });
            map.addLayer({
                'id': 'trail',
                'type': 'line',
                'source': 'trail',
                'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#D03F0C',
                    'line-width': 5
                }
            });
        
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return  <div className='map-holder' ref={mapContainerRef} />
};

export default TrailMap;