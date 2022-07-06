<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todos';

const todos = useTodoStore();
const { list, filter } = storeToRefs(todos);
const {
  filteredTodos,
  addTodo,
  setFilter,
  toggleTodo,
  removeTodo,
} = todos;

const text = ref('');

const handleInput = (e) => {
  text.value = e.target.value;
};

const handleSubmit = () => {
  const { value } = text;
  addTodo(value);
  text.value = '';
};

</script>

<template>
  <div class="card">
    <div class="card-header">

      <form class="d-flex" role="search" @submit.prevent="handleSubmit">
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
          :class="{active: filter === 'ALL'}"
          @click="setFilter('ALL')"
        >All</button>
        <button
          type="button"
          class="btn btn-outline-primary"
          :class="{active: filter === 'FINISHED'}"
          @click="setFilter('FINISHED')"
        >Finished</button>
        <button
          type="button"
          class="btn btn-outline-primary"
          :class="{active: filter === 'UNFINISHED'}"
          @click="setFilter('UNFINISHED')"
        >Unfinished</button>
      </div>
    </div>
  </div>
</template>
