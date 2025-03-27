<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ToolCard from '@/components/ToolCard.vue'
import TopNav from '@/components/TopNav.vue'

const router = useRouter()

const handleToolClick = (tool: any) => {
  if (tool.title === '知识库问答') {
    router.push('/chat/knowledge')
  } else if (tool.title === 'PPT生成') {
    router.push('/chat/ppt')
  } else if (tool.title === '成绩分析') {
    router.push('/chat/grade')
  }
}

const tools = ref([
  {
    icon: '📊',
    title: 'PPT生成',
    description: 'AI智能生成PPT演示文稿',
    isNew: true
  },
  {
    icon: '📝',
    title: '知识库问答',
    description: '快速解读文档、图片、音视频',
    isNew: true
  },
  {
    icon: '📈',
    title: '成绩分析',
    description: 'AI智能分析学生成绩数据',
    isNew: true
  },
  {
    icon: '📊',
    title: '智能数据分析',
    description: 'AI帮你数据分析和制作图表',
    isNew: true
  },
  {
    icon: '🎨',
    title: 'AI绘画',
    description: 'AI智能生成图片',
    isNew: true
  },
  {
    icon: '🔊',
    title: '语音合成',
    description: '快速生成配音视频'
  },
  {
    icon: '📚',
    title: '智能出题',
    description: '快速生成选择、判断、问答、排序题'
  },
  {
    icon: '✍️',
    title: '智能评阅',
    description: 'AI智能评阅口语、翻译、作文'
  }
])
</script>

<template>
  <div class="discover-view">
    <TopNav />
    <div class="tools-grid">
      <ToolCard
        v-for="tool in tools"
        :key="tool.title"
        v-bind="tool"
        class="tool-card"
        @click="handleToolClick(tool)"
      />
    </div>
  </div>
</template>

<style scoped>
.discover-view {
  padding: 20px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}

.tool-card {
  background: white;
  border-radius: 8px;
  transition: all 0.3s;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style> 