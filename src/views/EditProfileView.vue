<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const userInfo = ref({
  id: '',
  username: '',
  password: '',
  gender: '',
  role: '',
  status: '',
  isAuthenticated: false
})

const errorMessage = ref('')
const successMessage = ref('')

onMounted(() => {
  const storedUserInfo = localStorage.getItem('userInfo')
  if (storedUserInfo) {
    userInfo.value = JSON.parse(storedUserInfo)
  }
})

const handleSubmit = async () => {
  try {
    // 准备请求数据（排除id字段）
    const { id, ...updateData } = userInfo.value

    // 发送更新请求
    const response = await axios.put(`http://127.0.0.1:5000/update_user/${id}`, updateData)

    if (response.status === 200) {
      successMessage.value = '更新成功，请重新登录'
      // 延迟跳转到登录页面
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    }
  } catch (error: any) {
    if (error.response?.status === 400) {
      errorMessage.value = error.response.data?.message || '更新失败'
    } else {
      errorMessage.value = '更新失败，请重试'
    }
  }
}

const goBack = () => {
  router.push('/profile')
}
</script>

<template>
  <div class="edit-profile-view">
    <div class="edit-card">
      <h2>修改用户信息</h2>
      <div class="form">
        <div class="form-item">
          <label>用户名</label>
          <input v-model="userInfo.username" type="text" />
        </div>
        <div class="form-item">
          <label>密码</label>
          <input v-model="userInfo.password" type="text" />
        </div>
        <div class="form-item">
          <label>性别</label>
          <select v-model="userInfo.gender" class="select-input">
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>
        <div class="form-item">
          <label>角色</label>
          <select v-model="userInfo.role" class="select-input">
            <option value="student">学生</option>
            <option value="teacher">教师</option>
            <option value="admin">管理员</option>
          </select>
        </div>
        <div class="form-item">
          <label>状态</label>
          <select v-model="userInfo.status" class="select-input">
            <option value="active">正常</option>
            <option value="disabled">禁用</option>
          </select>
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      <div class="button-group">
        <button class="cancel-btn" @click="goBack">取消</button>
        <button class="submit-btn" @click="handleSubmit">保存修改</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-profile-view {
  padding: 20px;
}

.edit-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 0 0 30px;
  text-align: center;
  color: #303133;
}

.form {
  margin-bottom: 30px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  color: #606266;
  font-weight: 500;
}

.form-item input {
  width: 100%;
  padding: 10px;
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
  text-align: center;
  margin-bottom: 20px;
}

.success-message {
  color: #67c23a;
  text-align: center;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.cancel-btn, .submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.cancel-btn {
  background-color: #f5f7fa;
  color: #606266;
}

.cancel-btn:hover {
  background-color: #e4e7ed;
}

.submit-btn {
  background-color: #409eff;
  color: white;
}

.submit-btn:hover {
  background-color: #66b1ff;
}

.select-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
}

.select-input:focus {
  outline: none;
  border-color: #409eff;
}

.select-input option {
  padding: 8px;
}
</style> 