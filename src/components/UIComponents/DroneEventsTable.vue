<template>
  <div :class="{'shadow-box':shadow}">
    <div class="loading-events" v-if="data.length === 0">
      <beat-loader :color="'#000000'" :loading="true"></beat-loader>
      <p>Loading drone data</p>
    </div>
    <div v-else>
      <table class="events-list-table">
        <tbody>
          <tr v-for="row in data"><td>{{row}}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BeatLoader from 'vue-spinner/src/BounceLoader.vue'

export default {
  components: {
    BeatLoader
  },
  props: {
    shadow: {
      default: true,
      required: false,
      type: Boolean
    },
    data: {
      default: () => { return [] },
      required: false,
      type: Array
    }
  }
}
</script>

<style lang="scss">
  .events-list-table {
    width: 100%;
    text-align: left;
    tr {
      border-bottom: 1px solid #eee;
      
      &:last-child {
        border-bottom-color: #FFF;
      }

      td {
        padding: 10px;
      }
    }
  }
  .loading-events {
    padding-top: 25px;
    text-align: center;

    .v-spinner {
      display: inline-block;
    }
  }
</style>
