<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const userInfo = ref({
  username: '',
  password: '',
  gender: '',
  role: '',
  status: '',
  isAuthenticated: false
})

const avatarUrl = ref('')
const showFallback = ref(false)

onMounted(async () => {
  const storedUserInfo = localStorage.getItem('userInfo')
  if (storedUserInfo && JSON.parse(storedUserInfo).username) {
    const user = JSON.parse(storedUserInfo)
    userInfo.value = user
    
    try {
      // 主动检查头像是否存在
      const response = await axios.head(`http://127.0.0.1:5000/avatar/${encodeURIComponent(user.username)}`)
      if (response.status === 200) {
        avatarUrl.value = `http://127.0.0.1:5000/avatar/${encodeURIComponent(user.username)}?t=${Date.now()}`
        showFallback.value = false
      }
    } catch (error) {
      // 404或其他错误时直接显示回退
      showFallback.value = true
    }
  }
})

const goToEdit = () => {
  router.push('/edit-profile')
}
</script>

<template>
  <div class="profile-view">
    <div class="user-card">
      <div class="avatar-wrapper">
        <img
          v-if="!showFallback"
          :src="avatarUrl"
          class="avatar-image"
          alt="用户头像"
        />
        <div v-else class="avatar-fallback">{{ userInfo.username?.[0] || '?' }}</div>
      </div>
      <div class="info">
        <h2>用户信息</h2>
        <div class="info-item">
          <span class="label">用户名：</span>
          <span class="value">{{ userInfo.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">密码：</span>
          <span class="value">{{ userInfo.password }}</span>
        </div>
        <div class="info-item">
          <span class="label">性别：</span>
          <span class="value">{{ userInfo.gender }}</span>
        </div>
        <div class="info-item">
          <span class="label">角色：</span>
          <span class="value">{{ userInfo.role }}</span>
        </div>
        <div class="info-item">
          <span class="label">状态：</span>
          <span class="value">{{ userInfo.status }}</span>
        </div>
        <div class="info-item">
          <span class="label">认证状态：</span>
          <span class="value">{{ userInfo.isAuthenticated ? '已认证' : '未认证' }}</span>
        </div>
        <div class="button-wrapper">
          <button class="edit-btn" @click="goToEdit">修改用户信息</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: flex-start;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.avatar-fallback {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: absolute;
  top: 0;
  left: 0;
}

.info {
  flex: 1;
}

.info h2 {
  margin: 0 0 20px;
  color: #303133;
}

.info-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.label {
  width: 100px;
  color: #606266;
  font-weight: 500;
}

.value {
  color: #303133;
  flex: 1;
}

.button-wrapper {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.edit-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.edit-btn:hover {
  background-color: #66b1ff;
}
</style> 