<template>
  <div>
    <mapbox class="map-current-location" @map-load="mapLoaded" access-token="pk.eyJ1Ijoid2xhZCIsImEiOiJBaG5QR3NNIn0.JqV3gbK0TfJ2LzTmrc3YZQ" :map-options="mapOptions"></mapbox>
  </div>
</template>

<script>
import {FakeData} from '../../dataProvider'
import mapboxgl from 'mapbox-gl'
import Mapbox from 'mapbox-gl-vue'
import * as turf from '@turf/turf'
export default {
  components: {
    Mapbox
  },
  props: {
    prepopulate: {
      required: false,
      default: 0,
      type: Boolean
    },
    radius: {
      required: false,
      default: 0,
      type: Number
    },
    mapStyle: {
      required: false,
      default: 'streets',
      type: String
    },
    // San Francisco
    origin: {
      required: false,
      default: () => { return [-122.414, 37.776] },
      type: Array
    },
    // Washington DC
    destination: {
      required: false,
      default: () => { return [] },
      type: Array
    }
  },

  methods: {
    addTarget: function (position) {
      this.target = position
      this.setup()
    },

    mapLoaded: function (map) {
      this.map = map
      if (this.prepopulate) {
        this.drawRoute(FakeData.route)
        this.drawPoints(FakeData.points)
      }
      // console.debug('Center at origin since no destination.')
      if (this.destination.length === 2) {
        this.target = this.destination
      }
      if (this.radius > 0) {
        this.drawRadius(this.radius)
      }
      if (this.target) {
        this.setup()
        this.map.fitBounds([this.origin, this.target])
      } else {
        this.map.flyTo({center: this.origin, zoom: 13})
      }
      this.drawDrone()
    },

    removeRadius: function () {
      // Remove drone power radius.
      this.map.removeLayer('power_circle')
    },

    drawRadius: function (distance) {
      console.debug('Drawing circle radius')
      this.map.addSource('power_circle', this.createGeoJSONCircle(this.origin, distance))

      this.map.addLayer({
        'id': 'power_circle',
        'type': 'fill',
        'source': 'power_circle',
        'layout': {},
        'paint': {
          'fill-color': 'green',
          'fill-opacity': 0.2
        }
      })
    },

    resetMap: function () {
      this.map.removeSource('route')
      this.map.removeSource('point')
      this.map.removeLayer('route')
      this.map.removeLayer('point')
    },
    setup: function () {
      this.route = this.processRoute()
      console.debug('Updating Map for target', this.target)
      if (this.map.getSource('route')) {
        this.map.removeSource('route')
      }
      this.map.addSource('route', {
        'type': 'geojson',
        'data': this.route
      })

      // Draw line on route
      this.map.addLayer({
        'id': 'route',
        'source': 'route',
        'type': 'line',
        'paint': {
          'line-color': '#e74c3c',
          'line-dasharray': [2.0, 1.0],
          'line-width': {
            'base': 3.0,
            'stops': [[15, 3.0], [20, 3.0]]
          }
        }
      })
      this.fitBounds()
    },

    drawPoints (geojson) {
      if (this.map.getLayer('points')) {
        this.getLayer('points').setSource('geojson')
        return
      }
      console.warn('Drawing points', geojson)
      this.map.addLayer({
        'id': 'points_array',
        'type': 'symbol',
        'source': geojson,
        'layout': {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      })
    },

    createGeoJSONCircle (center, radiusInKm, points) {
      if (!points) points = 64
      var coords = {
        latitude: center[1],
        longitude: center[0]
      }
      var km = radiusInKm

      var ret = []
      var distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180))
      var distanceY = km / 110.574

      var theta, x, y
      for (var i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI)
        x = distanceX * Math.cos(theta)
        y = distanceY * Math.sin(theta)

        ret.push([coords.longitude + x, coords.latitude + y])
      }
      ret.push(ret[0])

      return {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [{
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [ret]
            }
          }]
        }
      }
    },

    drawRoute (geojson) {
      if (this.map.getLayer('route_complex')) {
        this.map.getLayer('route_complex').setData(geojson)
      } else {
        this.map.addLayer({
          'id': 'route_complex',
          'type': 'line',
          'source': geojson,
          'paint': {
            'line-width': 4,
            'line-color': '#007cbf'
          }
        })
      }
    },

    drawDrone () {
      this.map.addSource('point', {
        'type': 'geojson',
        'data': this.point
      })
      // Draw drone icon
      this.map.addLayer({
        'id': 'point',
        'source': 'point',
        'type': 'symbol',
        'layout': {
          'icon-image': 'airport-15',
          'icon-rotate': 90
        }
      })
    },
    reset () {
      this.counter = 0
      this.point.features[0].geometry.coordinates = this.origin
    },
    start () {
      // Update the source with this new data.
      this.reset()
      this.animate()
    },
    animate () {
      // Update point geometry to a new position based on counter denoting
      // the index to access the arc.
      this.point.features[0].geometry.coordinates = this.route.features[0].geometry.coordinates[this.counter]

      // Update the source with this new data.
      this.map.getSource('point').setData(this.point)

      // Request the next frame of animation so long as destination has not
      // been reached.
      if (this.point.features[0].geometry.coordinates[0] !== this.target[0]) {
        requestAnimationFrame(this.animate)
      } else {
        this.resetMap()
      }

      this.counter = this.counter + 1
    },

    processRoute () {
      var lineString = turf.lineString([this.origin, this.target])
      //console.log('Computing line string', lineString)
      // Calculate the distance in kilometers between route start/end point.
      var lineDistance = turf.lineDistance(lineString, 'meters')
      //console.log('Route distance', lineDistance)
      var arc = []

      // Draw an arc between the `origin` & `destination` of the two points
      for (var i = 0; i < lineDistance; i++) {
        var segment = turf.along(lineString, i / 1000 * lineDistance, 'meters')
        arc.push(segment.geometry.coordinates)
      }

      console.debug(arc)

      return {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': arc
          }
        }]
      }
    },

    fitBounds () {
      let coordinates = this.route.features[0].geometry.coordinates
      // console.log(this.route)
      var bounds = this.route.features[0].geometry.coordinates.reduce(function (bounds, coord) {
        return bounds.extend(coord)
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]))
      this.map.fitBounds(bounds, {
        padding: 60
      })
    }
  },

  computed: {
    point: function () {
      return {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': this.origin
          }
        }]
      }
    }
  },

  watch: {
    destination: function () {
      if (this.destination.length === 2) {
        this.target = this.destination
        this.setup()
      }
    }
  },

  data () {
    return {
      target: false,
      map: false,
      route: false,
      conuter: 0,
      mapOptions: {
        style: 'mapbox://styles/mapbox/' + this.mapStyle + '-v9',
        center: this.origin,
        zoom: 7
      }
    }
  }
}
</script>

<style>

</style>
