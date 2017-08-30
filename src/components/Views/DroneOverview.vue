<template>
  <div class="container"><h3><small>Drone</small> {{id}}</h3>
    <div class="row" style="padding-bottom: 25px;">
      <stats-card class="columns four shadow-box">
        <div class="icon-big text-center" slot="header">
          <i class="ion-battery-low"></i>
        </div>
        <div class="numbers" slot="content">
          {{battery}}
        </div>
        <div class="stats" slot="footer">
          <span>Battery</span>
        </div>
      </stats-card>
      <stats-card class="columns eight shadow-box">
        <div class="icon-big text-center" slot="header">
          <i class="ion-bag"></i>
        </div>
        <div class="numbers" slot="content">
          <small style="width: 100%; text-overflow: ellipsis;">{{wallet}}</small>
        </div>
        <div class="stats" slot="footer">
          <span>Wallet</span>
        </div>
      </stats-card>
      
    </div>
    <div class="row">
      <button @click="start()">Start</button>
      <mapbox ref="map" :destination="target"  class="shadow-box" style="position: relative; height: 500px; margin-bottom: 25px;"></mapbox>
      <div class="shadow-box">
        <h4 style="padding: 7px; text-align: left;">Current status</h4>
        <event-table :shadow="false" :data="events"></event-table>
      </div>
    </div>
  </div>
</template>

<script>
import Mapbox from '../UIComponents/MapboxFlyover'
import EventTable from '../UIComponents/DroneEventsTable'
import Data from '../../dataProvider'
import StatsCard from '../UIComponents/StatsCard'
export default {
  components: {
    Mapbox,
    EventTable,
    StatsCard
  },
  data () {
    return {
      id: this.$route.params.id,
      drone: Data.getDroneById(this.$route.params.id),
      product: false,
      events: [
        'Started delivery',
        'Doing stuff',
        'Low battary'
      ]
    }
  },

  methods: {
    start: function () {
      this.$refs.map.start()
    }
  },

  computed: {
    wallet: function () {
      return this.drone.wallet
    },
    etherium: function () {
      return Math.round(this.drone.balance * 100) / 100 + '...'
    },
    battery: function () {
      return Math.round(this.drone.battery * 100) + '%'
    },
    target: function () {
      return this.drone.order ? this.drone.order.target : []
    }
  }
}
</script>

<style>
</style>
