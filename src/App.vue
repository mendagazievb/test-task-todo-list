<template>
  <div id="app" class="container">
    <date-view />
    <list @copy="showDialog = true"/>

    <button
        class="button--big"
        @click="showModal = true"
        aria-label="create todo">
      <font-awesome-icon icon="plus" />
    </button>

    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Создать новую задачу</h3>

      <input
          v-model="title"
          :class="{error: isEmpty}"
          slot="body"
          v-focus
          type="text"
      >

      <button slot="footer" @click="close">
        ок
      </button>
    </modal>

    <modal v-if="showDialog" @close="showDialog = false">
      <p slot="body">Текст скопирован в буфер</p>
    </modal>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
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

      close() {
        this.isEmpty = false;
        let temp = { title: this.title, edit: false, completed: false };

        this.title.length
          ? this.pushTodo(temp)
          : this.isEmpty = true;

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
</style>
