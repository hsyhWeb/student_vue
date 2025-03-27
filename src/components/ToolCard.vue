<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
  isNew?: boolean
}>()
</script>

<template>
  <div class="tool-card">
    <div class="icon">{{ icon }}</div>
    <div class="content">
      <div class="title">
        {{ title }}
        <span v-if="isNew" class="new-tag">推荐</span>
      </div>
      <div class="description">{{ description }}</div>
    </div>
    <div class="star">⭐</div>
  </div>
</template>

<style scoped>
.tool-card {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
}

.icon {
  font-size: 24px;
  margin-right: 16px;
  flex-shrink: 0;
}

.content {
  flex: 1;
}

.title {
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.new-tag {
  background-color: #ff4d4f;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.description {
  color: #666;
  font-size: 14px;
}

.star {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.3;
  cursor: pointer;
}

.star:hover {
  opacity: 1;
}
</style> 