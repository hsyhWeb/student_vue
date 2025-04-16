<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const gender = ref('1')
const role = ref('1')
const errorMessage = ref('')
const showPanel = ref(false)
const showBackground = ref(false)
const isError = ref(false)
const avatarFile = ref<File | null>(null)

onMounted(() => {
  showBackground.value = true
  showPanel.value = true
})

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    isError.value = true
    return
  }

  if (!avatarFile.value) {
    errorMessage.value = '请选择头像文件'
    isError.value = true
    return
  }

  const formData = new FormData()
  formData.append('username', username.value)
  formData.append('password', password.value)
  formData.append('gender', gender.value)
  formData.append('role', role.value)
  formData.append('avatar', avatarFile.value)

  try {
    const response = await axios.post('http://127.0.0.1:5000/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.status === 200) {
      errorMessage.value = '注册成功'
      isError.value = false
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      errorMessage.value = response.data.message || '注册失败'
      isError.value = true
    }
  } catch (error: any) {
    if (error.response?.data?.status === 401) {
      errorMessage.value = error.response.data.message || '注册失败'
    } else {
      errorMessage.value = '注册失败，请重试'
    }
    isError.value = true
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-container">
    <Transition name="fade">
      <img v-if="showBackground" alt="背景图片" class="background" src="@/assets/background.jpg" />
    </Transition>
    <div class="panel-wrapper">
      <Transition name="fade">
        <div v-if="showPanel" class="panel">
          <div class="content">
            <div class="panel-left">
              <img alt="register background" class="register-background" src="@/assets/loginback.png" />
            </div>
            <div class="panel-right">
              <div class="title">注册账号</div>
              <div class="description">创建你的私人助手账号</div>
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
                <div class="form-item">
                  <label>确认密码</label>
                  <input
                    v-model="confirmPassword"
                    type="password"
                    placeholder="请再次输入密码"
                  />
                </div>
                <div class="form-item">
                  <label>性别</label>
                  <select v-model="gender" class="select-input">
                    <option value="1">男</option>
                    <option value="2">女</option>
                  </select>
                </div>
                <div class="form-item">
                  <label>角色</label>
                  <select v-model="role" class="select-input">
                    <option value="1">学生</option>
                    <option value="2">老师</option>
                    <option value="3">管理员</option>
                  </select>
                </div>
                <div class="form-item">
                  <label>头像</label>
                  <input
                    type="file"
                    accept="image/*"
                    @change="(e) => avatarFile = e.target.files?.[0] || null"
                  />
                </div>
              </div>
              <div v-if="errorMessage" :class="['message', { 'error': isError, 'success': !isError }]">
                {{ errorMessage }}
              </div>
              <div class="button-wrapper">
                <button class="register-btn" @click="handleRegister">注册</button>
              </div>
              <div class="button-wrapper">
                <button class="login-btn" @click="goToLogin">返回登录</button>
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

.register-container {
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

.register-background {
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

.form-item input,
.select-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

.form-item input:focus,
.select-input:focus {
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

.register-btn {
  background-color: #409eff;
  color: white;
}

.register-btn:hover {
  background-color: #66b1ff;
}

.login-btn {
  background-color: #f5f7fa;
  color: #606266;
}

.login-btn:hover {
  background-color: #e4e7ed;
}

.message {
  margin-top: 10px;
  text-align: center;
  padding: 8px;
  border-radius: 4px;
}

.message.error {
  color: #f56c6c;
  background-color: #fef0f0;
}

.message.success {
  color: #67c23a;
  background-color: #f0f9eb;
}
</style> 