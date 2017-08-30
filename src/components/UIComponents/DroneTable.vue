<template>
  <div class="drone-table">
    <template v-if="drones.length > 0">
      <table>
        <thead>
          <th>Icon</th>
          <th>Status</th>
          <th>Battery</th>
          <th>Position</th>
          <th>Wallet</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="drone in drones" @click="selectDrone(drone)">
            <td><img :src="drone.img"></td>
            <td>{{drone.status}}</td>
            <td>{{drone.battery}}</td>
            <td>{{drone.position[0]}}, {{drone.position[1]}}</td>
            <td>{{drone.wallet}}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <h3>No drones.</h3>
      <p>No drones are connected to the table.</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    drones: {
      type: Array,
      default: () => { return [] },
      required: false
    }
  },

  methods: {
    selectDrone: function (drone) {
      console.debug('Selected drone', drone)
      this.$emit('select', drone)
    }
  }
}
</script>

<style lang="scss">
  .drone-table {
    width: 100%;

    > table {
      width: 100%;

    }

    > table th {
      text-align: center;
    }
  }
</style>
