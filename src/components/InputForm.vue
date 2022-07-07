<script setup>
import { ref } from 'vue';
defineProps(['placeholder'])
const emit = defineEmits(['submit-form']);

const text = ref('');

const handleInput = (e) => {
  text.value = e.target.value;
};

const handleSubmit = () => {
  const { value } = text;
  emit('submit-form', value);
  text.value = '';
};
</script>

<template>
  <form class="d-flex" role="search" @submit.prevent="handleSubmit">
    <input
      class="form-control me-2"
      type="search"
      :placeholder="placeholder"
      aria-label="Enter todo"
      :value="text"
      @input="handleInput"
    />
    <button
      class="btn btn-outline-success"
      type="submit"
    >Add</button>
  </form>

</template>
