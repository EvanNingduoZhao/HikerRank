import React, { useRef, useEffect, useState, Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './SampleMap.css';

mapboxgl.accessToken = 
    'pk.eyJ1IjoiYXJpYWRuZS1iYWkiLCJhIjoiY2tneHFraTE4MG1tOTJ4bzM1aTR2Y2dsaCJ9.yBbBBE0hqfP3MGFYg1OvQA';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-80.01);
  const [lat, setLat] = useState(40.43);
  const [zoom, setZoom] = useState(10.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v11',
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
    
    map.on('load', function () {
        // Add an image to use as a custom marker
        map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
          map.addSource('points', {
          'type': 'geojson',
          'data': {
          'type': 'FeatureCollection',
          'features': [
          {
          // feature for Mapbox DC
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [
          -79.942727,
          40.439518
          ]
          },
          'properties': {
          'title': 'Westinghouse Memorial'
          }
          },
          {
          // feature for Mapbox SF
          'type': 'Feature',
          'geometry': {
          'type': 'Point',
          'coordinates': [-79.945208, 40.430710]
          },
          'properties': {
          'title': 'Schenley Park Overlook'
          }
          }
          ]
          }
        });
         
        // Add a symbol layer
        map.addLayer({
          'id': 'points',
          'type': 'symbol',
          'source': 'points',
          'layout': {
          'icon-image': 'custom-marker',
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
          ],
          'text-offset': [0, 1.25],
          'text-anchor': 'top'
          }
          });
          }
          );
        });
  
        // straight line between two markers
        map.on('load', function () {
          map.addSource('route1', {
          'type': 'geojson',
          'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
          'type': 'LineString',
          'coordinates': [
          [-79.942727, 40.439518],
          [-79.945208, 40.430710]
          ]
          }
          }
          });
          map.addLayer({
          'id': 'route1',
          'type': 'line',
          'source': 'route1',
          'layout': {
          'line-join': 'round',
          'line-cap': 'round'
          },
          'paint': {
          'line-color': '#358',
          'line-width': 4
          }
          });
          });
      
          map.on('load', function () {
            map.addSource('route2', {
            'type': 'geojson',
            'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
            'type': 'LineString',
            'coordinates': [
              [
                -439.94742393493647,
                40.434845856430506
              ],
              [
                -439.9474561214447,
                40.43474786208924
              ],
              [
                -439.94757413864136,
                40.43433138454553
              ],
              [
                -439.94762778282166,
                40.43424972197956
              ],
              [
                -439.9478530883789,
                40.4341108953898
              ],
              [
                -439.94800329208374,
                40.434012899977404
              ],
              [
                -439.94806766510004,
                40.43396390221767
              ],
              [
                -439.948046207428,
                40.43384140766208
              ],
              [
                -439.9479925632476,
                40.4336944139008
              ],
              [
                -439.94790673255915,
                40.433588251540066
              ],
              [
                -439.9477243423462,
                40.433416758141696
              ],
              [
                -439.9475419521332,
                40.43329426258937
              ],
              [
                -439.9474883079529,
                40.4332289315369
              ],
              [
                -439.94749903678894,
                40.43317176681389
              ],
              [
                -439.94757413864136,
                40.43307377003286
              ],
              [
                -439.94773507118225,
                40.433000272353375
              ],
              [
                -439.9480998516083,
                40.43293494101527
              ],
              [
                -439.94834661483765,
                40.432918608170795
              ],
              [
                -439.9485504627227,
                40.43277977883286
              ],
              [
                -439.9486470222473,
                40.43258378398544
              ],
              [
                -439.94866847991943,
                40.432248958132924
              ],
              [
                -439.9485397338867,
                40.432020295617065
              ],
              [
                -439.94842171669006,
                40.43179979888322
              ],
              [
                -439.94836807250977,
                40.43166096723546
              ],
              [
                -439.9484324455261,
                40.43154663507503
              ],
              [
                -439.94852900505066,
                40.43144046932341
              ],
              [
                -439.94874358177185,
                40.43126897044754
              ],
              [
                -439.9488079547882,
                40.431154637620644
              ],
              [
                -439.94874358177185,
                40.43097497135706
              ],
              [
                -439.9486577510834,
                40.430811637973626
              ],
              [
                -439.94850754737854,
                40.43067688763366
              ],
              [
                -439.94833052158356,
                40.43057072050898
              ],
              [
                -439.9482071399689,
                40.430431886323774
              ],
              [
                -439.94807839393616,
                40.430256301502666
              ],
              [
                -439.94790673255915,
                40.43011746666834
              ],
              [
                -439.9475258588791,
                40.4298969636954
              ],
              [
                -439.9473971128464,
                40.42974996131174
              ],
              [
                -439.94733273983,
                40.42952537371628
              ],
              [
                -439.94733810424805,
                40.42931711909394
              ],
              [
                -439.9473112821579,
                40.42922728356757
              ],
              [
                -439.94723081588745,
                40.42914561480308
              ],
              [
                -439.94699478149414,
                40.429076196275304
              ],
              [
                -439.94652807712555,
                40.429104780383646
              ],
              [
                -439.94600772857666,
                40.42923545043856
              ],
              [
                -439.94540691375727,
                40.42954170738487
              ],
              [
                -439.9449133872986,
                40.42973362769373
              ],
              [
                -439.9447363615036,
                40.42987246332044
              ],
              [
                -439.9446022510528,
                40.429999048494984
              ],
              [
                -439.94427502155304,
                40.430150133713994
              ],
              [
                -439.9441570043564,
                40.43026038487578
              ],
              [
                -439.9438351392746,
                40.430444136410486
              ],
              [
                -439.9433845281601,
                40.43063197079366
              ],
              [
                -439.9428480863571,
                40.43088105471007
              ],
              [
                -439.94181275367737,
                40.43147313572638
              ],
              [
                -439.94145870208735,
                40.43169363353131
              ],
              [
                -439.94099736213684,
                40.432114210673014
              ],
              [
                -439.9402678012848,
                40.43242045450956
              ],
              [
                -439.9400532245636,
                40.43248578634753
              ],
              [
                -439.9393129348755,
                40.432596033680156
              ],
              [
                -439.9390608072281,
                40.43261644983301
              ],
              [
                -439.9387174844741,
                40.43268586470642
              ],
              [
                -439.9385243654251,
                40.432751196286524
              ],
              [
                -439.9380791187286,
                40.432861443184
              ],
              [
                -439.9378699064255,
                40.43282877745546
              ],
              [
                -439.93771970272064,
                40.43278794527244
              ]
            ]
            }
            }
            });
            map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route2',
            'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
            'paint': {
            'line-color': '#728',
            'line-width': 3
            }
            });
            });
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      
      <div className='map_container' ref={mapContainerRef} />

      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>

    </div>
  );
};

export default Map;
