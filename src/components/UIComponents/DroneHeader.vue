<template>
  <div class="header container">
      <div class="nav-bar branding">
        <div class="left">
          <ul>
            <li><div class="center">BRANDNAMEO</div></li>
          </ul>
        </div>
        
        <div class="right">
          <ul>
            <li  class="cart-button"><i class="ion-navicon-round"></i></li>
          </ul>
        </div>
      </div>
      <!-- <portal to="modal">
        <div class="container">
          <template v-if="cartLength !== 0"> 
            <oxy-cart-view></oxy-cart-view>
          </template>
          <template v-else>
            <h3>Cart Empry</h3>
            <p>Items added to the cart can be seen here.</p>
          </template> 
          <button @click="closeModal()">Close modal</button>
        </div>
      </portal> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  $nav-bar-height: 40px;
  .nav-bar {
    padding: 7px 0px;
    height: $nav-bar-height;
    border-bottom: 2px solid #333;
    //line-height: $nav-bar-height;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */

    > .left, .right, .center {
      display: inline;

      > ul {
        list-style: none;
        text-decoration: none;

        li {
          cursor: pointer;
          i {
            font-size: 2.2rem;
          }

          .items-in-cart {
            display: inline-block;
            font-size: 2.2rem;
            font-weight: 100;
            opacity: 0.6
          }
        }
      }
    }

    .left {
      float: left;
      padding-left: 15px;
    }
    .right {
      float: right;
      padding-right: 15px;
    }
    .center {
      float: center;
    }
  }

  .header {
    .branding {
      text-align: center;
    }
  
    .cart-button {
      border-radius: 7px;
      padding: 0 7px;
      &:hover {
        background-color: #EEE; 
      }

      &:activer {
        background-color: #000;
        color: #000;
      }
    }
  }

  .product-table {
    width: 100%;

    .table-button {
      top: 3px;
      padding: 5px;
    }

    i {
      color: #000;
      display: inline-block;
      font-size: 14px;

      &.ion-ios-close-empty {
        font-size: 22px;
        line-height: 30px;
      }
    }
  }
</style>
