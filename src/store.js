import Vue from 'vue';
import Vuex from 'vuex';
import DATES from './utils';

Vue.use(Vuex);

const STORAGE_KEY = 'test-task-todo-list';

export default new Vuex.Store({
  state: {
    DATES,
    storageData: []
  },

  mutations: {
    /**
     * Получаем сохранненые данные в локальном хранилище
     * @param {object} state
     */
    getStorageData(state) {
      state.storageData = localStorage.getItem(STORAGE_KEY) || [];
    },

    /**
     * Сохраняем данные в локальном хранилище
     * @param {object} state
     */
    setStorageData(state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.storageData));
    },

    /**
     * Добавляем задачу в storageData
     * @param {object} state
     * @param {object} payload объект задачи
     */
    pushTodo(state, payload) {
      state.storageData.push(payload)
    },

    /**
     * Меняем свойство задачи
     * @param {object} state
     * @param {number} index индекс объекта задачи в массиве
     * @param {boolean} isEdit редактируемая задача
     */
    editTodo(state, { index, isEdit }) {
      state.storageData[index].edit = isEdit;
    },

    /**
     * Отмечаем выполненую задачу
     * @param {object} state
     * @param {number} index индекс объекта задачи в массиве
     * @param {boolean} isCompleted выполненная задача
     */
    completeTodo(state, { index, isCompleted }) {
      state.storageData[index].completed = isCompleted;
    },

    /**
     * Удаляем задачу из локального хранилища
     * @param {object} state
     * @param {number} index индекс объекта задачи в массиве
     */
    removeTodo(state, index) {
      state.storageData.splice(index, 1)
    }
  },
})
