<script setup>
import Navbar from './components/Navbar.vue';
import TodoCard from './components/TodoCard.vue';
</script>

<template>
  <Navbar brand="The Todo" />
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-4 mt-4">
        <TodoCard />
      </div>
    </div>
  </div>
</template>

<style></style>
