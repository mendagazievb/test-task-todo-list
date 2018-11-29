<template>
  <transition :enter-class="modal.enter" :leave-class="modal.leaveActive">
    <div :class="modal.mask">
      <div :class="modal.container">
        <button @click="$emit('close')">
          закрыть
        </button>

        <header :class="modal.header">
          <slot name="header"></slot>
        </header>

        <div :class="modal.body">
          <slot name="body"></slot>
        </div>

        <footer :class="modal.footer">
          <slot name="footer">
            <button :class="modal.button" @click="$emit('close')">
              ок
            </button>
          </slot>
        </footer>

      </div>
    </div>
  </transition>
</template>

<script>
  export default {

  }
</script>

<style lang="postcss" module="modal">
  .mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(80, 227, 164, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .3s ease;
  }

  .container {
    box-sizing: border-box;
    max-width: 750px;
    padding: 100px;
    background-color: #fff;
    border-radius: 4px;
    transition: all .3s ease;
  }

  .header h3 {
    font-size: 33px;
    color: #3e434f;
  }

  .body {
    margin: 20px 0;
  }

  .button {
    background-color:  #50e3a4;
    padding: 10px 40px;
    border: 0;
    border-radius: 50px;
    color: #fff;
    box-shadow: 0 3px 10px 0 rgba(62, 192, 136, 0.8);
    font-size: 30px;
    text-transform: uppercase;
    cursor: pointer;

    &:focus {
      box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      /*outline: 0;*/
    }
  }

  .enter {
    opacity: 0;
  }

  .leaveActive {
    opacity: 0;
  }

  .enter .container,
  .leaveActive .container {
    transform: scale(1.1);
  }
</style>

<style>

</style>