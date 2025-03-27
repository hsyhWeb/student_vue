<script setup lang="ts">
import { ref } from 'vue'

const histories = ref([
  {
    date: '2024-03-20',
    title: '关于教学设计的讨论',
    preview: '我们讨论了如何优化课程结构...'
  },
  {
    date: '2024-03-19',
    title: '数学试卷分析',
    preview: 'AI帮助分析了学生的答题情况...'
  }
])
</script>

<template>
  <div class="history-view">
    <div
      v-for="item in histories"
      :key="item.date"
      class="history-item"
    >
      <div class="date">{{ item.date }}</div>
      <div class="content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.preview }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-item {
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #e4e7ed;
}

.date {
  width: 100px;
  color: #909399;
}

.content h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.content p {
  margin: 0;
  color: #606266;
}
</style> 