<template>
  <div>
    <div class="blurable" :class="{blur : showModal}">
      <drone-header></drone-header>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <oxy-modal v-show="showModal">
      <div class="container modal-container" v-if="selectedDrone" slot="container">
        <h5>Please select drone destination</h5>
        <div v-show="modalPage === 1" class="row info-label warning">
          <div class="columns two"><i class="ion-alert"></i></div>
          <div class="columns ten">Target out of charge distance.</div>
        </div>
        <mapbox-flyover ref="map" :origin="selectedDrone.position" class="map-current-location shadow-box" :radius="7"></mapbox-flyover>
        <div v-if="modalPage === 0">
          <div class="search-wrapper">
            <input type="text"
                class="search-input"
                label="Search"
                placeholder="Search"
                v-model="location">
            </input>
            <a class="search-icon"><span class="ti-search"></span></a>
            <a class="clear-icon" v-if="location !== ''" @click="location = ''"><span class="ion-close-round"></span></a>
          </div>
        </div>
        <div v-if="modalPage === 1">
          <h5>Posible Route with DroneChain</h5>
          <table class="drone-stops-table">
            <tr v-for="node in route"><td>{{node}}</td></tr>
          </table>
        </div>
        <div class="modal-btn-bar">
          <button @click="resetModal()">Cancel</button> 
          <button v-if="modalPage === 1" class="button-primary" @click="continuePage()">Confirm Shipment</button>
          <button v-else class="button-primary" @click="continuePage()">Continue</button>
        </div>
      </div>
    </oxy-modal> 
  </div>
</template>

<script>
import {PostNewBooking, FakeData} from './dataProvider'
import MapboxFlyover from './components/UIComponents/MapboxFlyover'
import DroneHeader from './components/UIComponents/DroneHeader'
import OxyModal from './components/UIComponents/OxyModal'

export default {
  components: {
    MapboxFlyover,
    DroneHeader,
    OxyModal
  },
  created () {
    this.$bus.$on('setupDrone', (drone) => {
      console.debug('modal event triggered', drone.id)
      this.showModal = true
      this.selectedDrone = drone
    })
  },

  data () {
    return {
      showModal: false,
      selectedDrone: false,
      modalPage: 0,
      location: '',
      route: ['No route data available.']

    }
  },

  methods: {
    continuePage: function () {
      this.modalPage++

      switch (this.modalPage) {
        case 1:
          this.route = [
            'Drone location (' + this.selectedDrone.position[0] + ', ' + this.selectedDrone.position[1] + ')',
            'Charging Stop (~0.0004 ETH)',
            'Destination (' + FakeData.destionationLoc[0] + ', ' + FakeData.destionationLoc[1] + ')'
          ]
          this.$refs.map.drawRoute(FakeData.route)
          this.$refs.map.drawPoints(FakeData.points)
          this.$refs.map.addTarget(FakeData.destionationLoc)
          break
        case 2:
          this.location = ''
          this.modalPage = 3
          this.selectedDrone.order = { target: FakeData.destionationLoc }
          this.$refs.map.removeRadius()
          this.showModal = false
          this.modalPage = 0
          this.$router.push({ path: 'drone/' + this.selectedDrone.id, params: {id: this.selectedDrone.id} })
          PostNewBooking(FakeData.drone, FakeData.station, () => {})
      }
    },
    resetModal: function () {
      this.showModal = false
      this.modalPage = 0
      this.selectedDrone = false
    }
  }
}
</script>

<style lang="scss">

  .drone-stops-table {
    text-align: left;
    box-sizing: border-box;

    margin-top: 15px; 
    padding: 16px !important;
    width: 100%;
  
    > tr {
      padding: 10px !important;
      border-bottom: 1px solid #EEE;
    }
  }

  .modal-btn-bar {
    text-align: right;
  }

  button {
    border-radius: 0 !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .map-current-location {
    //display: block;
    //position: relative !important;
    width: 100%;
    height: 400px;
    margin-bottom: 50px;
    canvas {
      position: relative !important;
    }
  }
</style>
