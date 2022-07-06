<script setup>
defineProps({
  brand: String,
});
</script>

<template>
  <nav class="navbar bg-light">
    <div class="container">
      <span class="navbar-brand mb-0 h1">
        {{ brand }}
      </span>
    </div>
  </nav>
</template>
