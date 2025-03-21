import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  
  function setToken(newToken) {
    token.value = newToken
  }

  function getToken() {
    return token.value
  }

  function clearToken() {
    token.value = ''
  }

  return { token, setToken, getToken, clearToken }
}) 