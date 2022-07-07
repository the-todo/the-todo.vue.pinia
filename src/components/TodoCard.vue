<script setup>
import { storeToRefs } from 'pinia';
import { useTodoStore } from '../stores/todos';
import InputForm from './InputForm.vue';

const store = useTodoStore();
const { todos } = storeToRefs(store);
const {
  filteredTodos,
  addTodo,
  setFilter,
  toggleTodo,
  removeTodo,
} = store;

</script>

<template>
  <div class="card">
    <div class="card-header">
      <InputForm
        placeholder="Enter todo..."
        @submit-form="(text) => addTodo(text)"
      />
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
