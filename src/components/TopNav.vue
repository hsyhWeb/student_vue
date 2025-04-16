<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['categoryChange', 'search'])

// 从localStorage获取用户角色
const userRole = computed(() => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo).role : 'student'
})

// 动态生成分类
const allCategories = ref([
  { label: '全部', value: 'all', roles: ['admin', 'teacher', 'student'] },
  { label: '教学助手', value: 'teaching', roles: ['admin', 'teacher'] },
  { label: '学生助手', value: 'student', roles: ['admin', 'student'] },
  { label: '管理助手', value: 'management', roles: ['admin'] },
  { label: '评价助手', value: 'evaluation', roles: ['admin', 'teacher'] },
  { label: '工具', value: 'tools', roles: ['admin'] }
])

// 过滤可见分类
const visibleCategories = computed(() => {
  return allCategories.value.filter(cat => 
    cat.value === 'all' || 
    (cat.roles && cat.roles.includes(userRole.value))
  )
})

// 初始化分类状态
const categories = ref(visibleCategories.value.map(cat => ({
  ...cat,
  active: cat.value === 'all'
})))

const searchQuery = ref('')

const handleCategoryClick = (cat: any) => {
  categories.value.forEach(c => c.active = false)
  cat.active = true
  searchQuery.value = ''
  emit('categoryChange', cat.value)
  emit('search', '')
}

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
  if (target.value) {
    categories.value.forEach(c => c.active = c.value === 'all')
  }
  emit('search', target.value)
}
</script>

<template>
  <div class="top-nav">
    <nav class="nav-buttons">
      <button
        v-for="(cat, index) in categories"
        :key="index"
        class="nav-btn"
        :class="{ active: cat.active }"
        @click="handleCategoryClick(cat)"
      >
        {{ cat.label }}
      </button>
    </nav>
    <div class="search">
      <input 
        type="text" 
        placeholder="搜索工具" 
        :value="searchQuery"
        @input="handleSearch"
      />
      <span class="help-icon">?</span>
    </div>
  </div>
</template>

<style scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.nav-buttons {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.nav-btn {
  padding: 6px 16px;
  border: 1px solid #e6e6e6;
  border-radius: 16px;
  background: white;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  white-space: nowrap;
  transition: all 0.3s;
}

.nav-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.nav-btn.active {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

.search {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.search input {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  width: 240px;
  background: #f5f5f5;
}

.help-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f4f4f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
}
</style> 