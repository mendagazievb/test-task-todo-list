<template>
  <ul :class="list.list">
    <li
        v-for="(todo, index) in storageData"
        :key="`todo-${index}`"
        :class="list.item"
    >
      <div v-show="!todo.edit">
        <p
            @click="editTodo({ index, isEdit: true })"
            :class="{[list.done]: todo.completed}"
        >
          {{ todo.title }}
        </p>

        <button @click="copyBuffer(todo.title)">Скопировать текст в буфер</button>
        <button @click="removeTodo(index)">Удалить задачу</button>
      </div>

      <input
          v-if="todo.edit"
          v-model="todo.title"
          @blur="checkTitle(todo.title, index)"
          @keyup.enter="checkTitle(todo.title, index)"
          v-focus
          type="text"
      >

      <label>
        <input
            :checked="todo.completed"
            @change="setCompleted(index, $event)"
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

    watch: {
      storageData(data) {
        // При изменении данных сохраняем их в local storage
        this.setStorageData();
      }
    },

    mounted() {
      // Вызываем метод для получения списка данных с local storage
      this.getStorageData();
    },

    methods: {
      ...mapMutations([
        'getStorageData',
        'setStorageData',
        'editTodo',
        'removeTodo',
        'completeTodo'
      ]),

      /**
       * Проверяем полученный текст
       * @param {string} title текст
       * @param {number} index индекс задачи в списке
       */
      checkTitle(title, index) {
        title.trim().length
          ? this.editTodo({ index, isEdit: false })
          : this.removeTodo(index);
      },

      /**
       * Отмечаем выполненность задачи, сохраняем в local storage
       * @param {number} index индекс задачи в списке
       * @param {object} e event
       */
      setCompleted(index, e) {
        this.completeTodo({ index, isCompleted: e.target.checked });
        this.setStorageData();
      },

      /**
       * Копируем текст в буфер
       * @param {string} text текст
       */
      copyBuffer(text) {
        navigator.clipboard.writeText(text)
          .then(() => this.$emit('copy'))
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