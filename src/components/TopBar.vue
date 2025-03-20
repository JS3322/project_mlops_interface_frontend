<template>
  <nav class="top-bar">
    <div class="menu-container">
      <router-link to="/a" class="menu-item">A</router-link>
      <router-link to="/b" class="menu-item">B</router-link>
      <router-link to="/c" class="menu-item">C</router-link>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.top-bar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.menu-container {
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
}

.menu-item {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.router-link-active {
  color: #42b983;
  font-weight: bold;
}
</style> 