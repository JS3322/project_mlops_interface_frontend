<script setup>
import TopBar from './components/TopBar.vue'
</script>

<template>
  <div class="app">
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background-color: #f9f9f9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
</style>
