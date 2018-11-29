<template>
  <div id="app" class="container">
    <date-view />
    <list />

    <button @click="pushTodo({ value: '', checked: false, edit: true })">Создать задачу</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import DateView from './components/DateView';
  import List from './components/List';

  export default {
    name: 'app',

    components: {DateView, List},

    methods: {
      ...mapMutations([
        'pushTodo'
      ])
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
