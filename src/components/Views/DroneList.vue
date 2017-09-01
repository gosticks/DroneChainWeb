<template>
  <div class="container">
    <drone-table :drones="drones" @select="selectDrone"></drone-table>
  </div>
</template>

<script>
import DroneTable from '../UIComponents/DroneTable'
import {Data} from '../../dataProvider'

export default {
  components: {
    DroneTable
  },
  created: function () {
  },
  data () {
    return {
      drones: Data.drones
    }
  },
  methods: {
    selectDrone: function (drone) {
      console.debug('Event from table')
      if (drone.status === 'idle') {
        this.$bus.$emit('setupDrone', drone)
        console.debug('Open modal!')
      } else {
        this.$router.push({ path: 'drone/' + drone.id, params: {id: drone.id} })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
