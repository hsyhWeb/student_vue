<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  { icon: '🔄', label: '发现', path: '/discover' },
  { icon: '💬', label: '对话', path: '/chat' },
  { icon: '📜', label: '输出历史', path: '/history' },
  { icon: '👤', label: '我的', path: '/profile' }
])
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/ai-logo.svg" alt="AI助手" />
      <span>AI教师助手</span>
    </div>
    <nav class="menu">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="menu-item"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="label">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  padding: 20px 0;
}

.logo {
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 30px;
}

.logo img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #333;
}

.menu-item:hover {
  background-color: #e6f7ff;
}

.menu-item.router-link-active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.icon {
  margin-right: 10px;
}
</style> 