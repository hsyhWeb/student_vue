<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ToolCard from '@/components/ToolCard.vue'
import TopNav from '@/components/TopNav.vue'

const router = useRouter()
const currentCategory = ref('all')
const searchQuery = ref('')

const handleToolClick = (tool: any) => {
  if (tool.title === '学生成绩聚类分析') {
    router.push('/chat/grade')
  } else if (tool.title === '成都大学教务管理') {
    window.location.href = 'http://localhost/chat/uLKfjGrUiyBVOVAJ'
  } else if (tool.title === '小学制度管理') {
    window.location.href = 'http://localhost/chat/jHqO56xfCK5PQ8l3'
  } else if (tool.title === 'Excel图表生成') {
    window.location.href = 'http://localhost/workflow/GQDvfSiyyn1jF8rs'
  } else if (tool.title === '思维导图') {
    window.location.href = 'http://localhost/workflow/OZLqjEQZqWOVjGas'
  } else if (tool.title === '数学作业批改') {
    window.location.href = 'http://localhost/workflow/Bi34hrrdFRQrJmwR'
  } else if (tool.title === '作文批改') {
    window.location.href = 'http://localhost/workflow/ffJmJeYxtvpzvzNM'
  } else if (tool.title === '理解图片') {
    window.location.href = 'http://localhost/workflow/JByJwlOBETph2VGf'
  } else if (tool.title === '文生图文故事') {
    window.location.href = 'http://localhost/chat/yWP3jhWTOaqlnseZ'
  } else if (tool.title === 'Excel多图表呈现') {
    window.location.href = 'http://localhost/workflow/hKNLer93F2YnC69Y'
  } else if (tool.title === '生成试卷') {
    window.location.href = 'http://localhost/chat/Ct55aFwxta1bsJQO'
  } else if (tool.title === '成都大学财务管理') {
    window.location.href = 'http://localhost/chat/qmduTC01qRRGsdRT'
  } else if (tool.title === '文件分割') {
    window.location.href = 'http://localhost/workflow/OhvSGzNiXzYIshIx'
  } else if (tool.title === '数据库数据读取与分析') {
    window.location.href = 'http://localhost/workflow/U4KQBlbGwdudnYnt'
  } else if (tool.title === '智能体') {
    window.location.href = 'http://localhost/workflow/m0MwT2zqCgsIH1wY'
  }
}

const tools = [
  // 教学助手
  {
    icon: '✍️',
    title: '数学作业批改',
    description: '智能批改数学作业',
    isNew: true,
    category: 'teaching'
  },
  {
    icon: '📝',
    title: '作文批改',
    description: '智能批改作文',
    isNew: true,
    category: 'teaching'
  },
  {
    icon: '📄',
    title: '生成试卷',
    description: '智能生成试卷',
    isNew: true,
    category: 'teaching'
  },
  // 学生助手
  {
    icon: '🖼️',
    title: '理解图片',
    description: '智能理解图片内容',
    isNew: true,
    category: 'student'
  },
  {
    icon: '📖',
    title: '文生图文故事',
    description: '根据文字生成图文故事',
    isNew: true,
    category: 'student'
  },
  {
    icon: '🧠',
    title: '思维导图',
    description: '智能生成思维导图',
    isNew: true,
    category: 'student'
  },
  // 管理助手
  {
    icon: '🏫',
    title: '成都大学教务管理',
    description: '教务管理系统',
    isNew: true,
    category: 'management'
  },
  {
    icon: '💰',
    title: '成都大学财务管理',
    description: '财务管理系统',
    isNew: true,
    category: 'management'
  },
  {
    icon: '📋',
    title: '小学制度管理',
    description: '小学管理制度',
    isNew: true,
    category: 'management'
  },
  // 评价助手
  {
    icon: '📊',
    title: 'Excel图表生成',
    description: '智能生成Excel图表',
    isNew: true,
    category: 'evaluation'
  },
  {
    icon: '📊',
    title: 'Excel多图表呈现',
    description: '多维度数据图表展示',
    isNew: true,
    category: 'evaluation'
  },
  {
    icon: '📈',
    title: '学生成绩聚类分析',
    description: '智能分析学生成绩数据',
    isNew: true,
    category: 'evaluation'
  },
  // 工具
  {
    icon: '✂️',
    title: '文件分割',
    description: '智能文件分割',
    isNew: true,
    category: 'tools'
  },
  {
    icon: '💾',
    title: '数据库数据读取与分析',
    description: '数据库数据分析',
    isNew: true,
    category: 'tools'
  },
  {
    icon: '🤖',
    title: '智能体',
    description: '智能体服务',
    isNew: true,
    category: 'tools'
  }
]

const filteredTools = computed(() => {
  let result = tools
  
  // 根据用户角色过滤
  const userRole = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')!).role 
    : 'student'
  
  result = result.filter(tool => {
    if (userRole === 'admin') return true
    if (userRole === 'teacher') return ['teaching', 'evaluation'].includes(tool.category)
    if (userRole === 'student') return tool.category === 'student'
    return false
  })
  
  // 如果搜索框有内容，只使用搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    return result.filter(tool => 
      tool.title.toLowerCase().includes(query) || 
      tool.description.toLowerCase().includes(query)
    )
  }
  
  // 如果没有搜索内容，使用分类过滤
  if (currentCategory.value !== 'all') {
    result = result.filter(tool => tool.category === currentCategory.value)
  }
  
  return result
})

const handleCategoryChange = (category: string) => {
  currentCategory.value = category
  searchQuery.value = '' // 清除搜索内容
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  if (query) {
    currentCategory.value = 'all' // 当有搜索内容时，重置分类为"全部"
  }
}
</script>

<template>
  <div class="discover-view">
    <TopNav 
      @categoryChange="handleCategoryChange" 
      @search="handleSearch"
    />
    <div class="tools-grid">
      <ToolCard
        v-for="tool in filteredTools"
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