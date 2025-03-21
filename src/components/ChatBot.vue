<template>
  <div class="chat-container">
    <div class="messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" 
           :class="['message', message.type]">
        <div class="message-content">{{ message.text }}</div>
      </div>
    </div>
    <div class="input-container">
      <input 
        v-model="userInput" 
        @keyup.enter="sendMessage"
        placeholder="메시지를 입력하세요..."
        type="text"
        class="message-input"
        :disabled="!authStore.token"
      >
      <button 
        @click="sendMessage" 
        class="send-button"
        :disabled="!authStore.token"
      >전송</button>
    </div>
    <div v-if="!authStore.token" class="auth-warning">
      인증이 필요합니다. 상단의 '인증' 버튼을 클릭하여 토큰을 입력해주세요.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const messages = ref([])
const userInput = ref('')
const messagesContainer = ref(null)
const authStore = useAuthStore()

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || !authStore.token) return

  // 사용자 메시지 추가
  messages.value.push({
    type: 'user',
    text: userInput.value
  })

  const question = userInput.value
  userInput.value = ''

  try {
    // 환경 변수에서 REQUEST_URL 가져오기
    const response = await axios.post(import.meta.env.VITE_REQUEST_URL, {
      question: question
    }, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    // 응답 메시지 추가
    messages.value.push({
      type: 'bot',
      text: response.data.answer
    })
  } catch (error) {
    console.error('Error:', error)
    messages.value.push({
      type: 'error',
      text: '죄송합니다. 오류가 발생했습니다.'
    })
  }

  await scrollToBottom()
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  max-width: 70%;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.user {
  align-self: flex-end;
  background-color: #42b983;
  color: white;
}

.bot {
  align-self: flex-start;
  background-color: #f5f5f5;
  color: #333;
}

.error {
  align-self: center;
  background-color: #ff4444;
  color: white;
}

.input-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-top: 1px solid #eee;
}

.message-input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.message-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.send-button {
  padding: 0.8rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-button:hover:not(:disabled) {
  background-color: #3aa876;
}

.send-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.auth-warning {
  text-align: center;
  color: #ff4444;
  padding: 1rem;
  background-color: #fff;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
}
</style> 