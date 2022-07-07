import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useTodoStore = defineStore('todosaa', () => {
  const todos = reactive({
    list: [
      { id: 1, isFinished: false, text: 'Do Washing' },
      { id: 2, isFinished: true, text: 'Do Dish' },
      { id: 3, isFinished: false, text: 'Do Cleaning' },
      { id: 4, isFinished: true, text: 'Learn Go' },
      { id: 5, isFinished: true, text: 'Learn Rust' },
    ],
    // 'ALL' | 'FINISHED' | 'UNFINISHED'
    filter: 'ALL',
  });

  const finishedTodos = () => {
    return todos.list.filter(todo => todo.isFinished);
  };
  
  const unfinishedTodos = () => {
    return todos.list.filter(todo => !todo.isFinished);
  };
  
  const filteredTodos = () => {
    const { filter, list } = todos;
    if (filter === 'FINISHED') {
      return finishedTodos();
    } else if (filter === 'UNFINISHED') {
      return unfinishedTodos();
    }
    return list;
  };

  const addTodo = (text) => {
    const { list } = todos;
    list.push({ text, id: Date.now(), isFinished: false });
  };
  
  const setFilter = (filter) => {
    todos.filter = filter;
  };
  
  const toggleTodo = (id) => {
    const { list } = todos;
    const index = list.findIndex(todo => todo.id === id);
    const todo = list[index];
    todos.list = [
      ...list.slice(0, index),
      {
        ...todo,
        isFinished: !todo.isFinished,
      },
      ...list.slice(index + 1),
    ];
  };
  
  const removeTodo = (id) => {
    const { list } = todos;
    const index = list.findIndex(todo => todo.id === id);
    todos.list = [
      ...list.slice(0, index),
      ...list.slice(index + 1),
    ];
  };

  return {
    todos,
    filteredTodos,
    addTodo,
    setFilter,
    toggleTodo,
    removeTodo,
  };
});
