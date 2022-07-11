import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todos', {
  state: () => ({
    list: [
      { id: 1, isFinished: false, text: 'Do Washing' },
      { id: 2, isFinished: true, text: 'Do Dish' },
      { id: 3, isFinished: false, text: 'Do Cleaning' },
      { id: 4, isFinished: true, text: 'Learn Go' },
      { id: 5, isFinished: true, text: 'Learn Rust' },
    ],
    // 'ALL' | 'FINISHED' | 'UNFINISHED'
    filter: 'ALL',
  }),
  getters: {
    finishedTodos: () => {
      return this.list.filter(todo => todo.isFinished);
    },
    unfinishedTodos: () => {
      return this.list.filter(todo => !todo.isFinished);
    },
    filteredTodos: () => {
      if (this.filter === 'FINISHED') {
        return this.finishedTodos();
      } else if (this.filter === 'UNFINISHED') {
        return this.unfinishedTodos();
      }
      return this.list;
    },
  },
  actions: {
    addTodo: (text) => {
      this.list.push({ text, id: Date.now(), isFinished: false });
    },
    setFilter: (filter) => {
      this.filter = filter;
    },
    toggleTodo: (id) => {
      const index = this.list.findIndex(todo => todo.id === id);
      const todo = this.list[index];
      this.list = [
        ...this.list.slice(0, index),
        {
          ...this.todo,
          isFinished: !todo.isFinished,
        },
        ...this.list.slice(index + 1),
      ];
    },
    removeTodo: (id) => {
      const index = this.list.findIndex(todo => todo.id === id);
      this.list = [
        ...this.list.slice(0, index),
        ...this.list.slice(index + 1),
      ];
    },
  },
});
