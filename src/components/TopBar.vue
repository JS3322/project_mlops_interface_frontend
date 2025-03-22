<template>
  <nav class="top-bar">
    <div class="left-section">
      <div class="auth-section">
        <div class="auth-dropdown" @click="toggleDropdown" :class="{ 'is-authenticated': authStore.token }">
          <span v-if="authStore.token" class="auth-text">인증됨</span>
          <span v-else class="auth-text">인증</span>
          <div v-if="showDropdown" class="dropdown-content" @click.stop>
            <div v-if="!authStore.token" class="token-input-container">
              <input 
                v-model="tokenInput"
                type="text"
                placeholder="토큰을 입력하세요"
                class="token-input"
                @keyup.enter="handleTokenSubmit"
              >
              <div class="token-buttons">
                <button @click="handleTokenSubmit" class="token-submit">확인</button>
                <button @click="toggleDropdown" class="token-cancel">취소</button>
              </div>
            </div>
            <button v-else @click="handleLogout" class="logout-button">로그아웃</button>
          </div>
        </div>
      </div>
    </div>
    <div class="right-section">
      <router-link to="/" class="menu-item">챗봇</router-link>
      <router-link to="/b" class="menu-item">B</router-link>
      <router-link to="/c" class="menu-item">C</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const showDropdown = ref(false)
const tokenInput = ref('')

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (!showDropdown.value) {
    tokenInput.value = ''
  }
}

const handleTokenSubmit = () => {
  if (tokenInput.value.trim()) {
    authStore.setToken(tokenInput.value.trim())
    showDropdown.value = false
    tokenInput.value = ''
  }
}

const handleLogout = () => {
  authStore.setToken('')
  showDropdown.value = false
}
</script>

<style scoped>
.top-bar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.auth-section {
  position: relative;
}

.auth-dropdown {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f5;
  transition: all 0.2s ease;
}

.auth-dropdown:hover {
  background-color: #e8e8e8;
}

.auth-dropdown.is-authenticated {
  background-color: #42b983;
}

.auth-dropdown.is-authenticated .auth-text {
  color: white;
}

.auth-dropdown.is-authenticated:hover {
  background-color: #3aa876;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 250px;
  z-index: 1000;
}

.token-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.token-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
}

.token-buttons {
  display: flex;
  gap: 0.5rem;
}

.token-submit, .token-cancel, .logout-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  flex: 1;
}

.token-submit {
  background-color: #42b983;
  color: white;
}

.token-submit:hover {
  background-color: #3aa876;
}

.token-cancel, .logout-button {
  background-color: #f5f5f5;
  color: #333;
}

.token-cancel:hover, .logout-button:hover {
  background-color: #e8e8e8;
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