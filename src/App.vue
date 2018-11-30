<template>
  <div id="app" class="container">
    <date-view />
    <list @copy="showDialog = true"/>

    <button @click="showModal = true">Создать задачу</button>

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
      <h3 slot="header">Текст скопирован в буфер</h3>
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
  html,
  body {
    font-family: system-ui;
    background-color: #f0efe9;
  }

  .container {
    margin: 0 auto;
    padding: 100px;
    max-width: 750px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 6px 15px 0 rgba(207, 211, 218, 0.35);
  }

  b {
    font-weight: 500;
    color: #606473;
  }
</style>
