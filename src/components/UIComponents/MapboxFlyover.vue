<template>
  <div>
    <mapbox class="map-current-location" @map-load="mapLoaded" access-token="pk.eyJ1Ijoid2xhZCIsImEiOiJBaG5QR3NNIn0.JqV3gbK0TfJ2LzTmrc3YZQ" :map-options="mapOptions"></mapbox>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import Mapbox from 'mapbox-gl-vue'
import * as turf from '@turf/turf'
export default {
  components: {
    Mapbox
  },
  props: {
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
      this.map.fitBounds([this.origin, position])
      this.setup()
    },

    mapLoaded: function (map) {
      this.map = map
      this.drawDrone()
      // console.debug('Center at origin since no destination.')
      if (this.destination.length === 2) {
        this.target = this.destination
      }
      if (this.target) {
        this.setup()
        this.map.fitBounds([this.origin, this.target])
      } else {
        this.map.flyTo({center: this.origin, zoom: 13})
      }
    },
    resetMap: function () {
      this.map.removeSource('route')
      this.map.removeSource('point')
      this.map.removeLayer('route')
      this.map.removeLayer('point')
    },
    setup: function () {
      this.route = this.processRoute()
      this.map.fitBounds([this.origin, this.target])
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
          'line-width': 2,
          'line-color': '#007cbf'
        }
      })

      this.fitBounds()
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
      // Calculate the distance in kilometers between route start/end point.
      var lineDistance = turf.lineDistance(lineString, 'kilometers')

      var arc = []

      // Draw an arc between the `origin` & `destination` of the two points
      for (var i = 0; i < lineDistance; i++) {
        var segment = turf.along(lineString, i / 1000 * lineDistance, 'kilometers')
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
      var bounds = this.route.features[0].geometry.coordinates.reduce(function (bounds, coord) {
        return bounds.extend(coord)
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]))
      this.map.fitBounds(bounds, {
        padding: 20
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
