<template>
  <div id="app" class="container">
    <date-view />
    <list @copy="showDialog = true"/>

    <button
        class="button button--big"
        @click="showModal = true"
        aria-label="create todo">
      <font-awesome-icon icon="plus" />
    </button>

    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Создать новую задачу</h3>

      <textarea
          v-model="title"
          :class="{error: isEmpty}"
          slot="body"
          class="textarea grow textarea--rad"
          v-focus>
      </textarea>

      <button class="button text-upper" slot="footer" @click="close">
        ок
      </button>
    </modal>

    <modal v-if="showDialog" @close="showDialog = false" :fixed-width-container="true">
      <p slot="body">Текст скопирован в буфер</p>
    </modal>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import DateView from './components/DateView';
  import List from './components/List';
  import Modal from './components/Modal';

  export default {
    name: 'app',

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },

    components: { DateView, List, Modal },

    data() {
      return {
        showModal: false,
        showDialog: false,
        title: '',
        isEmpty: false
      }
    },

    methods: {
      ...mapMutations([
        'pushTodo'
      ]),

      ...mapActions([
        'sendData'
      ]),

      close() {
        // Обнуляем свойство
        this.isEmpty = false;

        // Проверяем на пустое поле, если все ок, то добавлем задачу
        this.title.length
          ? this.sendData(this.title)
          : this.isEmpty = true;

        // Если в поле что-то введенно, то сбрасываем следущие свойства
        if (!this.isEmpty) {
          this.title = '';
          this.showModal = false;
        }
      }
    }
  }
</script>

<style lang="postcss">
  @import "styles/variables.css";
  @import "styles/font.css";
  @import "styles/button.css";
  @import "styles/input.css";
  @import "styles/base.css";

  @media (768px <= width <= 992px) {
    .container {
      width: 80%;
    }
  }

  @media (320px <= width <= 425px) {
    :root {
      --main-font-size: 2rem;
      --big-font-size: 6.5rem;
      --mid-font-size: 2.2rem;
    }

    .button--big {
      bottom: -5rem;
      width: 10rem;
      height: 10rem;
      font-size: 4rem;
    }
  }

  @media (320px <= width <= 768px) {
    .container {
      width: 98%;
      margin: 1rem auto;
      padding: 3rem 2rem;
    }
  }
</style>
