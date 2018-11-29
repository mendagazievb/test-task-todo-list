<template>
  <ul :class="list.list">
    <li v-for="(todo, index) in storageData" :class="list.item">
      <div v-show="!todo.edit">
        <p
            @click="editTodo({ index, isEdit: true })"
            :class="{[list.done]: todo.checked}"
        >
          {{ todo.value }}
        </p>

        <button @click="copyBuffer(todo.value)">Скопировать текст в буфер</button>
        <button @click="removeTodo(index)">Удалить задачу</button>
      </div>

      <input
          v-if="todo.edit"
          v-model="todo.value"
          @blur="saveTodo(todo.value, index)"
          @keyup.enter="saveTodo(todo.value, index)"
          v-focus
          type="text"
      >

      <label>
        <input
            :checked="todo.checked"
            @change="checkTodo(index, $event)"
            type="checkbox"
        >
      </label>
    </li>
  </ul>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: 'list',

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },

    computed: {
      ...mapState([
        'storageData'
      ])
    },

    methods: {
      ...mapMutations([
        'getStorageData',
        'setStorageData',
        'editTodo',
        'removeTodo',
        'completeTodo'
      ]),

      saveTodo(value, index) {
        value.trim().length
          ? this.editTodo({ index, isEdit: false })
          : this.removeTodo(index);
      },

      checkTodo(index, e) {
        this.completeTodo({ index, isCheck: e.target.checked })
      },

      /**
       * Копируем текст в буфер
       * @param {string} text текст
       */
      copyBuffer(text) {
        navigator.clipboard.writeText(text)
          .then(() => alert('succeful'))
          .catch(err => console.error(err))
      },
    }
  }
</script>

<style lang="postcss" module="list">
  .list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .item {
    display: flex;
  }

  .done {
    color: darkred;
  }
</style>