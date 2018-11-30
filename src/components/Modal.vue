<template>
  <transition :enter-class="modal.enter" :leave-class="modal.leaveActive">
    <div :class="modal.mask">
      <div :class="[modal.container, {[modal.containerWidth]: fixedWidthContainer}]">
        <button
            :class="modal.buttonClose"
            @click="$emit('close')"
            aria-label="close"
        >
          <font-awesome-icon icon="plus" :transform="{ rotate: 45 }" />
        </button>

        <header :class="modal.header">
          <slot name="header"></slot>
        </header>

        <div :class="modal.body">
          <slot name="body"></slot>
        </div>

        <footer :class="modal.footer">
          <slot name="footer">
            <button
                @click="$emit('close')"
                :class="modal.button"
                class="button"
            >
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
    props: {
      fixedWidthContainer: {
        type: Boolean,
        default: false
      }
    }
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

    & .containerWidth {
      width: 50%;
    }

    @media (320px <= width <= 500px) {
      & .containerWidth {
        width: 98%;
      }
    }
  }

  .container {
    position: relative;
    width: 50%;
    padding: 5rem;
    background-color: #fff;
    border-radius: 1rem;
    box-sizing: border-box;
    transition: all .3s ease;
  }

  @media (768px <= width <= 992px) {
    .container {
      width: 80%;
    }
  }

  @media (320px <= width <= 768px) {
    .container {
      width: 98%;
    }
  }

  .header {
    margin-bottom: 3rem;
  }

  .body {
    display: flex;
    margin-bottom: 3rem;
  }

  .footer {
    display: flex;
    justify-content: center;
  }

  .header h3 {
    margin: 0;
    font-size: var(--main-font-size);
  }

  .button {
    text-transform: uppercase;
  }

  .buttonClose {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 4rem;
    height: 4rem;
    padding: 0;
    background: transparent;
    border: 5px solid var(--circle-color);
    border-radius: 50%;
    cursor: pointer;
    font-size: 2rem;
    color: var(--circle-color);

    &:hover {
      color: #D7D8DB;
      border-color: #D7D8DB;
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