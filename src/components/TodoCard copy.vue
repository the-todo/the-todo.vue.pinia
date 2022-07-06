<script setup>
import { ref, reactive } from 'vue';

const text = ref('');
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

const handleInput = (e) => {
  text.value = e.target.value;
};

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

const addTodo = () => {
  const { value } = text;
  const { list } = todos;
  list.push({ text: value, id: Date.now(), isFinished: false });
  text.value = '';
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
</script>

<template>
  <div class="card">
    <div class="card-header">

      <form class="d-flex" role="search" @submit.prevent="addTodo">
        <input
          class="form-control me-2"
          type="search"
          placeholder="enter todo"
          aria-label="Enter todo"
          :value="text"
          @input="handleInput"
        />
        <button
          class="btn btn-outline-success"
          type="submit"
        >Add</button>
      </form>

    </div>

    <ul class="list-group list-group-flush">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="({ id, isFinished, text }, index) in filteredTodos()"
        :key="id"
      >
        <input
          class="form-check-input mt-0 me-2"
          type="checkbox"
          :checked="isFinished"
          aria-label="..."
          @change="toggleTodo(id)"
        />
        <p
          class="mb-0 me-auto"
          :class="{'text-decoration-line-through': isFinished}"
        >{{ text }}</p>
        <button
          class="btn btn-danger btn-sm"
          @click="removeTodo(id)"
        >Del</button>
      </li>
    </ul>
    <div class="card-footer">
      <div class="btn-group" role="group" aria-label="Basic outlined example">
        <button
          type="button"
          class="btn btn-outline-primary"
          :class="{active: todos.filter === 'ALL'}"
          @click="setFilter('ALL')"
        >All</button>
        <button
          type="button"
          class="btn btn-outline-primary"
          :class="{active: todos.filter === 'FINISHED'}"
          @click="setFilter('FINISHED')"
        >Finished</button>
        <button
          type="button"
          class="btn btn-outline-primary"
          :class="{active: todos.filter === 'UNFINISHED'}"
          @click="setFilter('UNFINISHED')"
        >Unfinished</button>
      </div>
    </div>
  </div>
</template>
