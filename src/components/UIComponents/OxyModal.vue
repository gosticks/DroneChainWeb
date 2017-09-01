<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <slot name="container">
          DEFAULT CONTENT
        </slot>

      </div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style>
.modal-mask {
  position: fixed;
  overflow: scroll;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .8);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 7px 0;
}

.modal-default-button {
  float: right;
}


.modal-wrapper .close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
}

.modal-container {
  position: relative;
  max-width: 60%;
  min-height: 300px;
  /* width: 50%; */
  margin: 0px auto;
  padding: 7px;
  /* // background-color: #fff;
  border-radius: 2px;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, .33); */
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-spinner {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
