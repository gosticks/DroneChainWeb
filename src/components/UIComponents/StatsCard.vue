<template>
  <div class="card">
    <div class="content">
      <div class="row">
        <div class="columns four">
          <slot name="header"></slot>
        </div>
        <div class="columns eight">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="footer">
        <hr/>
        <slot name="footer"></slot>
      </div>
    </div>
  
  </div>
</template>
<script>
  export default {
    name: 'stats-card'
  }

</script>
<style lang="scss">
  .card {
    padding: 0;
    p {
      padding: 0;
      margin: 0;
    }

    small {
      font-size: 20px;
    }

    .numbers {
      line-height: 60px;
      font-size: 30px;
    }

    .icon-big > i {
      font-size: 40px;
    }

    hr {
      margin: 7px;
    }
  }
</style>
