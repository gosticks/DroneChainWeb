<template>
  <div class="container"><h3><small>Current Drone Status</small></h3>
    <div class="row" style="padding-bottom: 25px;">
      <stats-card class="columns four shadow-box">
        <div class="icon-big text-center" slot="header">
          <i :class="batteryClass"></i>
        </div>
        <div class="numbers" slot="content">
          {{battery}}
        </div>
        <div class="stats" slot="footer">
          <span>Battery</span>
        </div>
      </stats-card>
      <stats-card class="columns four shadow-box">
        <div class="icon-big text-center" slot="header">
          <i class="ion-cash"></i>
        </div>
        <div class="numbers" slot="content">
          {{etherium}}
        </div>
        <div class="stats" slot="footer">
          <span>Ether</span>
        </div>
      </stats-card>
      <stats-card class="columns four shadow-box">
        <div class="icon-big text-center" slot="header">
          <i class="ion-wifi"></i>
        </div>
        <div class="numbers" slot="content">
          Medium
        </div>
        <div class="stats" slot="footer">
          <span>Connection</span>
        </div>
      </stats-card>
      
    </div>
    <div class="row">

      <mapbox :prepopulate="true" ref="map" :origin="origin" :destination="target"  class="shadow-box" style="position: relative; height: 500px; margin-bottom: 25px;"></mapbox>
      <div class="shadow-box">
        <div style="background-color: #EEE; padding: 7px; color: #333; font-size: 20px; text-align: left;">Logs</div>
        <event-table :shadow="false" :data="events"></event-table>
      </div>
    </div>
  </div>
</template>

<script>
import Mapbox from '../UIComponents/MapboxFlyover'
import EventTable from '../UIComponents/DroneEventsTable'
import EthInterface from '../../webProvider'
import {Data} from '../../dataProvider'
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
      events: []
    }
  },

  mounted () {
    EthInterface(
      (error) => {
        console.error(error)
      },
      (success) => {
        console.error(success)
      }
    )

    this.mockShitUp()
  },

  methods: {
    start: function () {
      this.$refs.map.start()
    },
    currentDrone: function () {
      return Data.getDroneById(this.$route.params.id)
    },

    mockShitUp: function () {
      setTimeout(() => {
        this.events.push({
          desc: 'Started delivery ',
          time: (new Date()).toTimeString()
        })
      }, 2000)

      setTimeout(() => {
        this.events.unshift({
          desc: 'Flying to DroneHanger (Eckenheim)',
          time: (new Date()).toTimeString()
        })
      }, 4000)

      setTimeout(() => {
        this.events.unshift({
          desc: 'Preparing charging sequence ',
          time: (new Date()).toTimeString()
        })
      }, 6000)

      setTimeout(() => {
        this.events.unshift({
          desc: 'Started charging sequence',
          time: (new Date()).toTimeString()
        })
      }, 8000)

      setTimeout(() => {
        // let timeout = 15000 / (100 - this.battery)
        let self = this
        let interval
        let batteryTimer = function () {
          self.drone.battery += 0.01
          if (self.drone.battery >= 1) {
            clearInterval(interval)
            self.drone.battery = 1.0
          }
        }
        interval = setInterval(batteryTimer, 100)
      }, 9000)
    }
  },

  computed: {
    batteryClass: function () {
      let batteryStatus = this.drone.battery
      // console.log(batteryStatus)
      if (batteryStatus < 0.08) {
        return 'ion-battery-empty'
      }

      if (batteryStatus < 0.50) {
        return 'ion-battery-low'
      }

      if (batteryStatus < 0.80) {
        return 'ion-battery-half'
      }

      return 'ion-battery-full'
    },
    wallet: function () {
      return this.drone.wallet
    },
    etherium: function () {
      return this.drone.balance
    },
    battery: function () {
      return Math.round(this.drone.battery * 100) + '%'
    },
    target: function () {
      return this.drone.order ? this.drone.order.target : []
    },
    origin: function () {
      // console.log('Origin', this.drone.position)
      return this.drone ? this.drone.position : []
    }
  }
}
</script>

<style>
</style>
