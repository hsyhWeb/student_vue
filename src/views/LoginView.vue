<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')
const showPanel = ref(false)
const showBackground = ref(false)

onMounted(() => {
  showBackground.value = true
  showPanel.value = true
})

const handleLogin = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/login', {
      username: username.value,
      password: password.value
    })

    if (response.status >= 200 && response.status < 300) {
      if (response.data?.user) {
        const userData = {
          ...response.data.user,
          isAuthenticated: true
        }
        localStorage.setItem('userInfo', JSON.stringify(userData))
      }
      router.push('/discover')
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      errorMessage.value = error.response.data?.message || '用户名或密码错误'
    } else {
      errorMessage.value = '登录失败，请重试'
    }
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login-container">
    <Transition name="fade">
      <img v-if="showBackground" alt="背景图片" class="background" src="@/assets/background.jpg" />
    </Transition>
    <div class="panel-wrapper">
      <Transition name="fade">
        <div v-if="showPanel" class="panel">
          <div class="content">
            <div class="panel-left">
              <img alt="login background" class="login-background" src="@/assets/loginback.png" />
            </div>
            <div class="panel-right">
              <div class="title">让AI提高你的效率</div>
              <div class="description">开始创建你的私人助手账号</div>
              <div class="form">
                <div class="form-item">
                  <label>用户名</label>
                  <input
                    v-model="username"
                    type="text"
                    placeholder="请输入用户名"
                  />
                </div>
                <div class="form-item">
                  <label>密码</label>
                  <input
                    v-model="password"
                    type="password"
                    placeholder="请输入密码"
                  />
                </div>
              </div>
              <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </div>
              <div class="button-wrapper">
                <button class="login-btn" @click="handleLogin">登录</button>
              </div>
              <div class="button-wrapper">
                <button class="register-btn" @click="goToRegister">注册</button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.login-container {
  min-height: 100vh;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -10;
}

.panel-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.panel {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.content {
  display: flex;
}

.title {
  font-size: 24px;
  margin-top: 60px;
  font-weight: bold;
}

.description {
  margin-top: 20px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
}

.panel-left {
  box-sizing: border-box;
  height: 700px;
  width: 50%;
  border-radius: 5px 0 0 5px;
  position: relative;
  overflow: hidden;
}

.login-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.panel-right {
  padding: 30px;
  width: 50%;
}

.form {
  margin-top: 30px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-item input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

.form-item input:focus {
  outline: none;
  border-color: #409eff;
}

.error-message {
  color: #f56c6c;
  margin-top: 10px;
  text-align: center;
}

.button-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.login-btn, .register-btn {
  width: 300px;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn {
  background-color: #409eff;
  color: white;
}

.login-btn:hover {
  background-color: #66b1ff;
}

.register-btn {
  background-color: #f5f7fa;
  color: #606266;
}

.register-btn:hover {
  background-color: #e4e7ed;
}
</style> 