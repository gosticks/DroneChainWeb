<template>
  <div class="drone-table">
    <template v-if="drones.length > 0">
      <table>
        <thead>
          <th></th>
          <th>Status</th>
          <th><i class="ion-battery-empty"></i> Battery</th>
          <th><i class="ion-cash"></i> Balance</th>
          <th><i class="ion-bag"></i> Wallet</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="drone in drones" @click="selectDrone(drone)">
            <td><img :src="drone.img" class="table-image"></td>
            <td><span class="tag" :class="{success: drone.status === 'idle'}">{{drone.status}}</span></td>
            <td>{{battery(drone.battery)}}</td>
            <td>{{drone.balance}} ETH</td>
            <td>{{drone.wallet}}</td>
            <td></td>
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
    },
    battery: function (battery) {
      return Math.round(battery * 100) + '%'
    }
  }
}
</script>

<style lang="scss">
  span.tag {
    background-color:#3498db;
    color: #FFF; 
    padding: 4px 10px;
    border-radius: 15px;
    text-transform: capitalize;
    &.success{
      background-color: #2ecc71;
    }
  }
  .drone-table {
    width: 100%;
    .table-image {
      width: 80px;

    }

    > table {
      width: 100%;
      cursor: pointer;
    }

    > table tr {
      cursor: pointer;
      text-align: center;

      &:hover {
        background-color: #eee;
      }
    }
    > table th {
      vertical-align: middle;
    }
  }
</style>
