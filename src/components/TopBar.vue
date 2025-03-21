<template>
  <nav class="top-bar">
    <div class="menu-container">
      <div class="auth-section">
        <button v-if="!showTokenInput" @click="showTokenInput = true" class="menu-item">인증</button>
        <div v-else class="token-input-container">
          <input 
            v-model="tokenInput"
            type="text"
            placeholder="토큰을 입력하세요"
            class="token-input"
            @keyup.enter="handleTokenSubmit"
          >
          <button @click="handleTokenSubmit" class="token-submit">확인</button>
          <button @click="handleTokenCancel" class="token-cancel">취소</button>
        </div>
        <span v-if="authStore.token" class="auth-status">인증됨</span>
      </div>
      <router-link to="/b" class="menu-item">B</router-link>
      <router-link to="/c" class="menu-item">C</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const showTokenInput = ref(false)
const tokenInput = ref('')

const handleTokenSubmit = () => {
  if (tokenInput.value.trim()) {
    authStore.setToken(tokenInput.value.trim())
    showTokenInput.value = false
    tokenInput.value = ''
  }
}

const handleTokenCancel = () => {
  showTokenInput.value = false
  tokenInput.value = ''
}
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
  align-items: center;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.token-input-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.token-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 200px;
}

.menu-item {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  border: none;
  background: none;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.token-submit, .token-cancel {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.token-submit {
  background-color: #42b983;
  color: white;
}

.token-cancel {
  background-color: #f5f5f5;
  color: #333;
}

.auth-status {
  color: #42b983;
  font-size: 0.9rem;
  font-weight: 500;
}

.router-link-active {
  color: #42b983;
  font-weight: bold;
}
</style> 