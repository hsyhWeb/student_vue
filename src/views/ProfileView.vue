<script setup lang="ts">
import { ref } from 'vue'

const userInfo = ref({
  name: '张老师',
  school: '示例中学',
  subject: '数学',
  usageCount: 128
})
</script>

<template>
  <div class="profile-view">
    <div class="user-card">
      <div class="avatar">{{ userInfo.name[0] }}</div>
      <div class="info">
        <h2>{{ userInfo.name }}</h2>
        <p>{{ userInfo.school }} - {{ userInfo.subject }}教师</p>
        <p>已使用 {{ userInfo.usageCount }} 次</p>
      </div>
    </div>
    
    <div class="settings">
      <h3>设置</h3>
      <!-- 添加设置项 -->
    </div>
  </div>
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-right: 20px;
}

.info h2 {
  margin: 0 0 8px;
}

.info p {
  margin: 4px 0;
  color: #606266;
}

.settings {
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style> 