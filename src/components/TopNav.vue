<script setup lang="ts">
const categories = [
  { label: '全部', active: true },
  { label: '教学助手', active: false },
  { label: '科研助手', active: false },
  { label: '效率工具', active: false },
  { label: '其他', active: false },
  { label: '收藏夹', active: false }
]
</script>

<template>
  <div class="top-nav">
    <nav class="nav-buttons">
      <button
        v-for="(cat, index) in categories"
        :key="index"
        class="nav-btn"
        :class="{ active: cat.active }"
      >
        {{ cat.label }}
      </button>
    </nav>
    <div class="search">
      <input type="text" placeholder="搜索工具" />
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