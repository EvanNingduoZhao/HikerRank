import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './HomeMap.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const HomeMap = (props) => {
    console.log(props)
  const mapContainerRef = useRef(null);
  const clicked_trail = props.clicked_trail
  var coordinates;
  // var map;
  
  const calculateZoom = (coordinates) => {
      // console.log(coordinates)
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
  }

  async function getClickedTrail() { 
    if (props.clicked) {
        var selected_trail = [];
        await fetch(`/api/trail/${props.clicked_trail}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('HomeMap, fetch clicked trail result', result);
                    selected_trail = result;
                },
                (error) => {
                    selected_trail = {'foo' : 'bar'};
                }
            )
        console.log('HomeMap, fetch clicked trail assign', selected_trail);
        return selected_trail;
    } else {
        return {'foo':'bar'};
    }
  }

  var lgnNum = -80.01;
  var latNum = 40.43;
  var zoomNum = 10;

  const [lng, setLng] = useState(lgnNum);
  const [lat, setLat] = useState(latNum);
  const [zoom, setZoom] = useState(zoomNum);

  console.log('HomeMap clicked', props.clicked);
  async function updateMapDisplay() {
    if (props.clicked) {
      // calculate center and zoom Level
      console.log('clicked trail, HomeMap.js', clicked_trail)
      var coordinates;
      await getClickedTrail().then(
        (result) => {
          coordinates = result.map_info.features[0].geometry.coordinates;
          console.log('HomeMap, testing .then', coordinates);
        }
      )
      .then(
        () => {
          // var coordinates = select_trail.map_info.features[0].geometry.coordinates
          zoomNum = 150.0 / (calculateZoom(coordinates)[0] / 3.0 + 9.9);
          lgnNum = calculateZoom(coordinates)[1];
          latNum = calculateZoom(coordinates)[2];
          console.log('After click: lgnNum', lgnNum, 'latNum', latNum, 'zoomNum', zoomNum)
        }
      )
    }
  }
  // updateMapDisplay().then(
  //   () => {
  //     setLng(lgnNum);
  //     setLat(latNum);
  //     setZoom(zoomNum);
  //     // console.log('HomeMap, check state', lgn, lat, zoom);
  //   }
  // );
  console.log('lgnNum', lgnNum, 'latNum', latNum, 'zoomNum', zoomNum);
  

  // Initialize map when component mounts
  useEffect(() => {

    console.log('mount, update, useEffect in HomeMap')
    if (props.clicked) {
      coordinates = clicked_trail.map_info.features[0].geometry.coordinates;
      zoomNum = 150.0 / (calculateZoom(coordinates)[0] / 3.0 + 9.9);
      lgnNum = calculateZoom(coordinates)[1];
      latNum = calculateZoom(coordinates)[2];
      console.log('After click: lgnNum', lgnNum, 'latNum', latNum, 'zoomNum', zoomNum)
    } else {
      lgnNum = -80.01;
      latNum = 40.43;
      zoomNum = 10;
    }
 
        console.log('reset state', lng, lat, zoom);

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/outdoors-v11',
          center: [lgnNum, latNum],
          zoom: zoomNum
        });
    
        // Add navigation control (the +/- zoom buttons)
        console.log('HomeMap Loading Map...');
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
        map.on('move', () => {
          setLng(map.getCenter().lng.toFixed(4));
          setLat(map.getCenter().lat.toFixed(4));
          setZoom(map.getZoom().toFixed(2));
        });

        var trails = props.map_json_list
        console.log(trails)
        
        map.on('load', function () {
            for (let map_json of trails) {

                var source_name = map_json.name;

                var trail_json = map_json.map_info;

                map.addSource( source_name, {
                    'type': 'geojson',
                    'data': trail_json
                });
                map.addLayer({
                    'id': source_name,
                    'type': 'line',
                    'source': source_name,
                    'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#085027',
                        'line-width': zoomNum / 8.0
                    }
                });
            }
            
        });

        // Clean up on unmount
        return () => map.remove();
 
    
  }, [props.clicked_trail]); // eslint-disable-line react-hooks/exhaustive-deps

  return  <div className='map-holder' ref={mapContainerRef} />
};

export default HomeMap;