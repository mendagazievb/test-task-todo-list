<template>
  <div id="app" class="container">
    <date-view />

    <list @copy="toggleModal({ key: 'Dialog', isShow: true })" />

    <button
        class="button button--big"
        @click="toggleModal({ key: 'Modal', isShow: true })"
        aria-label="create todo">
      <font-awesome-icon icon="plus" />
    </button>

    <app-modal
        v-if="isShowModal"
        @close="toggleModal({ key: 'Modal', isShow: false })"
    >
      <h3 slot="header">Создать новую задачу</h3>

      <textarea
          v-model="title"
          :class="{ error: isEmptyTitleTodo }"
          slot="body"
          class="textarea grow textarea--rad"
          v-focus>
      </textarea>

      <button
          class="button text-upper"
          slot="footer"
          @click="close"
      >
        ок
      </button>
    </app-modal>

    <app-modal
        v-if="isShowDialog"
        @close="toggleModal({ key: 'Dialog', isShow: false })"
        :fixed-width-container="true"
    >
      <p slot="body">Текст скопирован в буфер</p>
    </app-modal>

  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import DateView from './components/DateView';
  import List from './components/List';
  import AppModal from './components/AppModal';

  export default {
    name: 'app',

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },

    components: { DateView, List, AppModal },

    computed: {
      ...mapState([
        'titleTodo',
        'isEmptyTitleTodo',
        'isShowModal',
        'isShowDialog'
      ]),

      title: {
        get() {
          return this.titleTodo;
        },

        set(str) {
          return this.updateTitle(str);
        }
      }
    },

    methods: {
      ...mapMutations([
        'pushTodo',
        'toggleModal',
        'changeIsEmptyTitle',
        'updateTitle'
      ]),

      ...mapActions([
        'sendData'
      ]),

      close() {
        this.changeIsEmptyTitle(false); // Обнуляем свойство

        // Проверяем на пустое поле, если все ок, то добавлем задачу
        this.title.length
          ? this.sendData(this.title)
          : this.changeIsEmptyTitle(true);

        // Если в поле что-то введенно, то сбрасываем свойства
        if (!this.isEmptyTitleTodo) {
          this.updateTitle('');
          this.toggleModal({ key: 'Modal', isShow: false })
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
