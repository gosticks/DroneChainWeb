<template>
  <div class="static-map-wrapper">
    <img class="map" :src="url">
    <div>
      <div class="overlay"></div>
      <h4 class="text">{{label}} </h4> 
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

const resizeDebounce = 300
const MAP_API_KEY = ''
const MAP_SERVICE_URL = 'https://maps.googleapis.com/maps/api/staticmap'
export default {
  props: {
    label: {
      required: false,
      type: String,
      default: 'Current Drone Location'
    },
    position: {
      required: false,
      type: Object,
      default: () => {
        return {lat: 40.702147, lng: -74.015794}
      }
    }

  },
  data () {
    return {
      width: 0,
      height: 0
    }
  },

  mounted () {
    window.addEventListener('resize', this.debouncedResize())
    this.width = Math.round(this.$el.clientWidth * 1.5)
    this.height = Math.round(this.$el.clientHeight * 1.5)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.debouncedResize())
  },

  computed: {
    url: function () {
      let computedURL = MAP_SERVICE_URL + '?center=' + this.position.lat + ',' + this.position.lng + '&zoom=13&size=' + this.width + 'x' + this.height + '&markers=color:blue%7label:A%7' + this.position.lat + ',' + this.position.lng + '&maptype=roadmap&format=jpg&visual_refresh=true' + MAP_API_KEY
      // console.log('URL', computedURL)
      return computedURL
    }
  },

  methods: {
    handleResize () {
      this.width = Math.round(this.$el.clientWidth * 1.5)
      this.height = Math.round(this.$el.clientHeight * 1.5)
      // console.debug('Resizing element', this.width, this.height)
    },
    debouncedResize () {
      return _.debounce(this.handleResize, resizeDebounce)
    }
  }
}
</script>

<style>
  .static-map-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .static-map-wrapper:hover .map {
    /* -webkit-transform: scale(1.5);
    transform: scale(1.5);
    -ms-transform: scale(1.5);   
     */
  }

  .static-map-wrapper .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: red; /* For browsers that do not support gradients */
    background: -webkit-linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2) 30%, rgba(0, 0, 0, 0.7)); /* For Safari 5.1 to 6.0 */
    background: -o-linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2) 30%, rgba(0, 0, 0, 0.7)); /* For Opera 11.1 to 12.0 */
    background: -moz-linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2) 30%, rgba(0, 0, 0, 0.7)); /* For Firefox 3.6 to 15 */
    background: linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2) 30%, rgba(0, 0, 0, 0.7)); /* Standard syntax */
  }

  .static-map-wrapper .text {
    position: absolute;
    padding-right: 7px;
    right: 0;
    bottom: 0;
    left:0;
    text-align: right;
    color: #FFF;	
    text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
  }

  .static-map-wrapper .map {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 100%;
    -webkit-transition: all 200ms ease-in;
    -moz-transition: all 200ms ease-in;
    transition: all 200ms ease-in;
  }
</style>
