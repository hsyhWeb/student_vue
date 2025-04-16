<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'
import { computed } from 'vue'

const route = useRoute()
const showSidebar = computed(() => route.path !== '/login' && route.path !== '/register')
</script>

<template>
  <div class="app-container">
    <SideBar v-if="showSidebar" class="sidebar" />
    <div class="main-content" :class="{ 'login-page': route.path === '/login' || route.path === '/register' }">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 200px;
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
}

.main-content {
  flex: 1;
}

.main-content:not(.login-page) {
  padding: 20px;
}
</style>
