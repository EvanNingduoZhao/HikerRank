import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './HomeMap.css';
import hiking3 from '../../pictures/hiking3.png';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const HomeMap = (props) => {
    console.log("HomeMap props", props)
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
      var zoomTime = 45;
      var disHor = Math.abs(lgnMin - lgnMax);
      var disVer = Math.abs(latMin - latMax);
      if (disHor > 6 * disVer) {
        zoomTime = zoomTime * (disHor / disVer);
      }
      if (disVer > 6 * disHor) {
        zoomTime = zoomTime * (disVer / disHor);
      }
      return [
          zoomTime* Math.sqrt(Math.abs(lgnMin - lgnMax) * Math.abs(lgnMin - lgnMax) + Math.abs(latMin - latMax) * Math.abs(latMin - latMax)),
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
          zoomNum = 148.0 / (calculateZoom(coordinates)[0] / 3.0 + 9.9);
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
      if (props.clicked === true) {
        console.log('HomeMap, clicked, racalculating nums');
        var clicked_json = props.clicked_trail
        if (typeof(clicked_json.map_info.data.geometry.coordinates[0][0]) == typeof(0.123)) {
            coordinates = clicked_json.map_info.data.geometry.coordinates;
            zoomNum = 120.0 / (calculateZoom(coordinates)[0] / 3.0 + 9.9);
            lgnNum = calculateZoom(coordinates)[1];
            latNum = calculateZoom(coordinates)[2];
        } else if (typeof(clicked_json.map_info.data.geometry.coordinates[0][0][0]) == typeof(0.123)) {
            coordinates = clicked_json.map_info.data.geometry.coordinates[0];
            zoomNum = 120.0 / (calculateZoom(coordinates)[0] / 3.0 + 9.9);
            lgnNum = calculateZoom(coordinates)[1];
            latNum = calculateZoom(coordinates)[2];
        } else {
            console.log('HomeMap, unclicked, to original nums');
            lgnNum = -79.56556;
            latNum = 40.58439;
            zoomNum = 7.0;
        }
        console.log('After click: lgnNum', lgnNum, 'latNum', latNum, 'zoomNum', zoomNum)
      } else {
        console.log('HomeMap, unclicked, to original nums');
        lgnNum = -79.56556;
        latNum = 40.58439;
        zoomNum = 7.0;
      }


      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lgnNum, latNum],
        zoom: zoomNum
      });
  
      // Add navigation control (the +/- zoom buttons)
      // console.log('HomeMap Loading Map...');
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');

      const search_bar = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })

      search_bar.setZoom(11.0)

      map.addControl(
        search_bar
      );
  
      // map.on('move', () => {
      //   setLng(map.getCenter().lng.toFixed(4));
      //   setLat(map.getCenter().lat.toFixed(4));
      //   setZoom(map.getZoom().toFixed(2));
      // });

      var trails = props.map_json_list
      console.log(trails)
      
      map.on('load', function () {
          for (let map_json of trails) {

              var source_name = map_json.tname + map_json.url.split('/')[5];
              // console.log('add map_json source name', source_name)

              var trail_json = map_json.map_info;

              map.addSource( source_name, trail_json)

              if (props.clicked && map_json.url == clicked_trail.url) {
                // console.log('HomeMap, layer for clicked trail')
                var back_name = source_name + '_background';
                map.addLayer({
                  'id': back_name,
                  'type': 'line',
                  'source': source_name,
                  'layout': {
                  'line-join': 'round',
                  'line-cap': 'round'
                  },
                  'paint': {
                      'line-color': '#ffe563',
                      'line-width': zoomNum / 1.5
                  }
              });
              }

              // decide trail color by difficulty
              var trail_color = '#085027'
              if (map_json.difficulty == 'Easiest') {
                trail_color = '#07b36b'
              } else if (map_json.difficulty == 'Most Difficult') {
                trail_color = '#0d8b94'
              }

              map.addLayer({
                  'id': source_name,
                  'type': 'line',
                  'source': source_name,
                  'layout': {
                  'line-join': 'round',
                  'line-cap': 'round'
                  },
                  'paint': {
                      'line-color': trail_color,
                      'line-width': zoomNum / 5.0
                  }
              });

              // get the coordinates of the starting point of each trail
              var start_coordinates = map_json.map_info.data.geometry.coordinates[0]
              // console.log("start coordinates", map_json.map_info.data.geometry.coordinates[0], typeof(map_json.map_info.data.geometry.coordinates[0]), typeof(0.123));
              if (typeof(map_json.map_info.data.geometry.coordinates[0][0]) == typeof(0.123)) {
                  map.loadImage(
                    // 'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
                    hiking3,
                    function (error, image) {
                        // console.log('inside adding image', map_json.map_info.data.geometry.coordinates[0])
                        if (error) throw error;
                        var imageName = 'cat' + map_json.url.split('/')[5];
                        // console.log('try to add image with name', imageName);
                        map.addImage(imageName, image);
                        map.addSource(imageName, {
                            'type': 'geojson',
                            'data': {
                                'type': 'FeatureCollection',
                                'features': [
                                    {
                                        'type': 'Feature',
                                        'geometry': {
                                        'type': 'Point',
                                        'coordinates': map_json.map_info.data.geometry.coordinates[0]
                                        }
                                    }
                                ]
                            }
                        });
                        // console.log('added a kitty!')
                        map.addLayer({
                            'id': imageName,
                            'type': 'symbol',
                            'source': imageName,
                            'layout': {
                                'icon-image': imageName,
                                'icon-size': zoomNum / 350.0
                            }
                        });

                        // console.log('url', map_json.url, 'url split', map_json.url.split('/'));

                        // var trail_id = map_json.url.split('/')[5];
                        var trail_page_path = '/trail/' + map_json.url.split('/')[5];

                        map.on('click', imageName, function (e) {
                           var coordinates = map_json.map_info.data.geometry.coordinates[0];
                           var description = '<h3 style="color:#085027;">' + map_json.tname + '</h3>' + '<p style="line-height:130%;">' 
                           + map_json.description.substr(0, 200) + '...' + '</p>'
                           + '<a href=' + trail_page_path + '>More Info</a>';

                           while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                          }
                          new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(description)
                            .addTo(map);      
                        })

                        map.on('mouseenter', imageName, function () {
                          map.getCanvas().style.cursor = 'pointer';
                        });

                        map.on('mouseleave', imageName, function () {
                          map.getCanvas().style.cursor = '';
                        });
                    }
                  );
              } else if (typeof(map_json.map_info.data.geometry.coordinates[0][0][0]) == typeof(0.123)) {
                map.loadImage(
                  // 'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
                  hiking3,
                  function (error, image) {
                      // console.log('inside adding image', map_json.map_info.data.geometry.coordinates[0])
                      if (error) throw error;
                      var imageName = 'cat' + map_json.url.split('/')[5];
                      // console.log('try to add image with name', imageName);
                      map.addImage(imageName, image);
                      map.addSource(imageName, {
                          'type': 'geojson',
                          'data': {
                              'type': 'FeatureCollection',
                              'features': [
                                  {
                                      'type': 'Feature',
                                      'geometry': {
                                      'type': 'Point',
                                      'coordinates': map_json.map_info.data.geometry.coordinates[0][0]
                                      }
                                  }
                              ]
                          }
                      });
                      // console.log('added a kitty!')
                      map.addLayer({
                          'id': imageName,
                          'type': 'symbol',
                          'source': imageName,
                          'layout': {
                              'icon-image': imageName,
                              'icon-size': zoomNum / 300.0
                          }
                      });

                      // console.log('url', map_json.url, 'url split', map_json.url.split('/'));

                      // var trail_id = map_json.url.split('/')[5];
                      var trail_page_path = '/trail/' + map_json.url.split('/')[5];

                      map.on('click', imageName, function (e) {
                         var coordinates = map_json.map_info.data.geometry.coordinates[0][0];
                         var description = '<h3 style="color:#085027;">' + map_json.tname + '</h3>' + '<p style="line-height:130%;">' 
                         + 'Summary: ' + map_json.description.substr(0, 200) + '...' + '</p>'
                         + '<a href=' + trail_page_path + '>More Info</a>';

                         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }
                        new mapboxgl.Popup()
                          .setLngLat(coordinates)
                          .setHTML(description)
                          .addTo(map);      
                      })

                      map.on('mouseenter', imageName, function () {
                        map.getCanvas().style.cursor = 'pointer';
                      });

                      map.on('mouseleave', imageName, function () {
                        map.getCanvas().style.cursor = '';
                      });
                  }
                );
              }
              
          }
          
      });

      // Clean up on unmount
      return () => map.remove();
 
    
  }, [props.clicked_trail, props.map_json_list]); // eslint-disable-line react-hooks/exhaustive-deps

  return  <div className='map-holder' ref={mapContainerRef} />
};

export default HomeMap;