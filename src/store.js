import Vue from 'vue';
import Vuex from 'vuex';
import { DATES, handleErrors } from './utils';

Vue.use(Vuex);

const API = 'https://jsonplaceholder.typicode.com/';

export default new Vuex.Store({
  state: {
    DATES,
    data: [],
    titleTodo: '',
    isEmptyTitleTodo: false,
    isShowModal: false,
    isShowDialog: false
  },

  mutations: {
    /**
     * Сохраняем полученные данные
     *
     * @param {object} state
     * @param {object} response - данные полученные с сервера
     */
    setData(state, response) {
      state.data = response;
    },

    /**
     * Добавляем задачу
     *
     * @param {object} state
     * @param {object} payload - объект задачи
     */
    pushTodo(state, payload) {
      state.data.push(payload)
    },

    /**
     * Меняем свойство задачи
     *
     * @param {object} state
     * @param {number} index - индекс объекта задачи в массиве
     * @param {boolean} isEdit - редактируемая задача
     */
    editTodo(state, { index, isEdit }) {
      state.data[index].edit = isEdit;
    },

    /**
     * Отмечаем выполненую задачу
     *
     * @param {object} state
     * @param {number} index - индекс объекта задачи в массиве
     * @param {boolean} isCompleted - выполненная задача
     */
    completeTodo(state, { index, isCompleted }) {
      state.data[index].completed = isCompleted;
    },

    /**
     * Удаляем задачу
     *
     * @param {object} state
     * @param {number} index - индекс объекта задачи в массиве
     */
    removeTodo(state, index) {
      state.data.splice(index, 1)
    },

    /**
     * Обновляем текст заголовока
     *
     * @param {object} state
     * @param {string} str - текст заголовка
     */
    updateTitle(state, str) {
      state.titleTodo = str;
    },

    /**
     * Изменяем свойство отображения для модального окна
     *
     * @param {object} state
     * @param {string} key - ключ свойства
     * @param {boolean} isShow - отображение
     */
    toggleModal(state, { key, isShow }) {
      state[`isShow${key}`] = isShow;
    },

    /**
     * Изменяем свойство для проверки на пустой заголовок перед создание задачи
     *
     * @param {object} state
     * @param {boolean} isEmpty - пустое значение
     */
    changeIsEmptyTitle(state, isEmpty) {
      state.isEmptyTitleTodo = isEmpty;
    },
  },

  actions: {
    /**
     * Загружаем данные
     *
     * @param commit
     */
    loadData({ commit }) {
      fetch(`${API}users/1/todos`, { method: 'get' })
        .then(handleErrors)
        .then(response => {
          const customResponse = response.map(obj => ({ ...obj, edit: false }));
          commit('setData', customResponse);
        })
        .catch(error => console.error(error))
    },

    /**
     * Отправляем запрос на создание задачи, в ответе получаем переданный объект со случайным id
     *
     * @param commit
     * @param {object} state
     * @param {String} title - заголовок задачи
     */
    sendData({ commit, state }, title) {
      let body = JSON.stringify({ title, completed: false, edit: false, userId: 1 });

      fetch(`${API}todos`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body
      })
        .then(handleErrors)
        .then(response => commit('pushTodo', response))
        .catch(error => console.error(error))
    }
  }
})
