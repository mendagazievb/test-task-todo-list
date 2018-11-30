<template>
  <ul :class="list.list">
    <li
        v-for="(todo, index) in storageData"
        :key="`todo-${index}`"
        :class="list.item"
    >
      <div v-show="!todo.edit" :class="list.itemInner">
        <p
            @click="editTodo({ index, isEdit: true })"
            :class="{[list.completed]: todo.completed}"
        >
          {{ todo.title }}
        </p>

        <span :class="list.buttonInner">
          <button
              @click="copyBuffer(todo.title)"
              class="button"
              :class="list.button"
              aria-label="copy title">
            <font-awesome-icon icon="copy" />
          </button>

          <button
              @click="removeTodo(index)"
              class="button"
              :class="list.button"
              aria-label="remove todo">
            <font-awesome-icon icon="trash" />
          </button>
        </span>
      </div>

      <textarea
          v-if="todo.edit"
          v-model="todo.title"
          @blur="checkTitle(todo.title, index)"
          @keyup.enter="checkTitle(todo.title, index)"
          :class="list.text"
          class="textarea"
          rows="1"
          v-focus>
      </textarea>

      <label :class="list.checkboxInner">
        <input
            :class="[list.visuallyHidden, list.checkbox]"
            :checked="todo.completed"
            @change="setCompleted(index, $event)"
            type="checkbox"
        >
        <span :class="list.checkboxMask"></span>
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
    margin-bottom: 2rem;
    padding: 0;
    list-style-type: none;

    & .button {
      font-size: 1.5rem;
      padding: 1rem 1.5rem;

      &:first-child {
        margin-right: .5rem;
      }
    }
  }

  .item {
    display: flex;
    margin-bottom: 3rem;
  }

  .text {
    display: flex;
    flex-grow: 1;
    margin-right: 2rem;
    border: 0;
    border-radius: .4rem;

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, .5);
    }
  }

  .itemInner {
    position: relative;
    flex-grow: 1;
    cursor: pointer;

    &:hover .buttonInner {
      display: flex;
    }

    & p {
      padding: .5rem 0;
      padding-right: 2rem;
      word-break: break-all;
    }
  }

  .buttonInner {
    position: absolute;
    top: 50%;
    right: 2rem;
    display: none;
    transform: translateY(-50%);
  }

  .completed {
    color: var(--completed-color);
  }

  .visuallyHidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }

  .checkboxInner {
    position: relative;
    display: flex;
    align-items: center;
    padding-right: 5.4rem;
    cursor: pointer;

    &:hover .checkboxMask {
      border-color: var(--green-color);
    }

    & .checkbox:checked ~ .checkboxMask {
      border-color: var(--green-color);

      &::after {
        position: absolute;
      }
    }

    & .checkboxMask {
      position: absolute;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 5px solid #eef0f5;
      
      &::after {
        content: '';
        top: 50%;
        left: 50%;
        width: 2rem;
        height: 1.5rem;
        transform: translate(-50%, -50%);
        background: #fff url(../assets/checked.png) no-repeat;
        background-size: cover;
      }
    }
  }
</style>