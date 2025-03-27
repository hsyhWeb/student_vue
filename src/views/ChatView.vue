<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

interface Chat {
  id: number
  title: string
  messages: Array<{
    role: 'system' | 'user'
    content: string
    type?: 'text' | 'ppt'
    file?: {
      name: string
      url: string
    }
  }>
  timestamp: string
}

const route = useRoute()
const isKnowledgeMode = computed(() => route.path === '/chat/knowledge')
const isPPTMode = computed(() => route.path === '/chat/ppt')
const isGradeMode = computed(() => route.path === '/chat/grade')

const chats = ref<Chat[]>([{
  id: 1,
  title: isPPTMode.value ? '新建PPT' : isGradeMode.value ? '成绩分析' : '新会话',
  timestamp: new Date().toLocaleString(),
  messages: [{
    role: 'system',
    content: isPPTMode.value 
      ? '欢迎使用AI智能PPT生成功能！\n\n我可以帮您：\n1. 根据主题关键词生成完整PPT\n2. 自动设计PPT版式和主题\n3. 智能生成PPT大纲和内容\n\n请直接输入您想要生成PPT的主题关键词，例如："人工智能发展历程"、"互联网技术趋势"等。\n\n温馨提示：关键词越具体，生成的PPT内容越准确。'
      : isGradeMode.value
      ? '欢迎使用学生成绩分析助手！\n\n我可以帮您：\n1. 分析学生成绩数据\n2. 生成成绩统计报告\n3. 提供成绩改进建议\n\n请上传成绩文件或直接输入您的问题。'
      : '您好！我是您的智能AI小助手。\n为了确保您获得最佳的对话体验，我们建议您在不同的聊天窗口中提出不同类型的问题，通过多无关上下文信息的相互影响，确保每个问题都能得到准确。\n感谢您的理解与配合，祝您使用愉快！'
  }]
}])

const currentChatId = ref(1)
const inputMessage = ref('')
const showChatList = ref(false)

const currentChat = computed(() => {
  return chats.value.find(chat => chat.id === currentChatId.value)
})

const createNewChat = () => {
  const newChat: Chat = {
    id: Date.now(),
    title: isPPTMode.value ? '新建PPT' : isGradeMode.value ? '成绩分析' : '新会话',
    timestamp: new Date().toLocaleString(),
    messages: [{
      role: 'system',
      content: isPPTMode.value 
        ? '欢迎使用AI智能PPT生成功能！\n\n我可以帮您：\n1. 根据主题关键词生成完整PPT\n2. 自动设计PPT版式和主题\n3. 智能生成PPT大纲和内容\n\n请直接输入您想要生成PPT的主题关键词，例如："人工智能发展历程"、"互联网技术趋势"等。\n\n温馨提示：关键词越具体，生成的PPT内容越准确。'
        : isGradeMode.value
        ? '欢迎使用学生成绩分析助手！\n\n我可以帮您：\n1. 分析学生成绩数据\n2. 生成成绩统计报告\n3. 提供成绩改进建议\n\n请上传成绩文件或直接输入您的问题。'
        : '您好！我是您的智能AI小助手。\n为了确保您获得最佳的对话体验，我们建议您在不同的聊天窗口中提出不同类型的问题，通过多无关上下文信息的相互影响，确保每个问题都能得到准确。\n感谢您的理解与配合，祝您使用愉快！'
    }]
  }
  chats.value.unshift(newChat)
  currentChatId.value = newChat.id
  showChatList.value = false
}

const deleteChat = (chatId: number) => {
  const index = chats.value.findIndex(chat => chat.id === chatId)
  if (index > -1) {
    chats.value.splice(index, 1)
    if (chats.value.length === 0) {
      createNewChat()
    } else {
      currentChatId.value = chats.value[0].id
    }
  }
}

const generatePPT = async (keywords: string) => {
  try {
    if (currentChat.value) {
      currentChat.value.messages.push({
        role: 'system',
        content: '正在分析关键词并生成PPT大纲...',
        type: 'text'
      });
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (currentChat.value) {
      currentChat.value.messages.push({
        role: 'system',
        content: '大纲已生成，正在设计PPT版式和主题...',
        type: 'text'
      });
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (currentChat.value) {
      currentChat.value.messages.push({
        role: 'system',
        content: '版式设计完成，正在生成详细内容...',
        type: 'text'
      });
    }

    const response = await fetch('http://localhost:5019/ppt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({ words: keywords }),
    });

    if (!response.ok) {
      throw new Error(`PPT生成失败: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const fileName = `presentation-${Date.now()}.pptx`;

    if (currentChat.value) {
      currentChat.value.messages.push({
        role: 'system',
        content: '✨ PPT生成成功！\n\n包含以下内容：\n1. 主题介绍\n2. 内容大纲\n3. 详细章节\n4. 总结展望\n\n您可以点击下方按钮下载PPT文件。',
        type: 'ppt',
        file: {
          name: fileName,
          url: url
        }
      });
    }

    return url;
  } catch (error) {
    console.error('生成PPT时出错:', error);
    if (currentChat.value) {
      currentChat.value.messages.push({
        role: 'system',
        content: `抱歉，生成PPT时出现错误：${error.message}\n\n可能的原因：\n1. 网络连接不稳定\n2. 服务器暂时无响应\n3. 关键词可能需要更具体\n4. 服务器地址可能无法访问`,
        type: 'text'
      });
    }
    return null;
  }
};

const analyzeGrade = async (message: string, file?: File) => {
  try {
    if (currentChat.value) {
      currentChat.value.messages.push({
        role: 'system',
        content: '正在分析成绩数据...',
        type: 'text'
      });
    }

    const formData = new FormData();
    formData.append('message', message);
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch('http://127.0.0.1:5002/upload_message', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`分析失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (currentChat.value) {
      currentChat.value.messages.push({
        role: 'system',
        content: data.message,
        type: 'text'
      });
    }

    return data;
  } catch (error) {
    console.error('分析成绩时出错:', error);
    if (currentChat.value) {
      currentChat.value.messages.push({
        role: 'system',
        content: `抱歉，分析成绩时出现错误：${error.message}\n\n可能的原因：\n1. 网络连接不稳定\n2. 服务器暂时无响应\n3. 文件格式不正确\n4. 服务器地址可能无法访问`,
        type: 'text'
      });
    }
    return null;
  }
};

const sendMessage = async () => {
  if (!inputMessage.value.trim() || !currentChat.value) return;
  
  const userMessage = inputMessage.value;
  currentChat.value.messages.push({
    role: 'user',
    content: userMessage,
    type: 'text'
  });
  
  inputMessage.value = '';

  if (isPPTMode.value) {
    await generatePPT(userMessage);
  } else if (isGradeMode.value) {
    await analyzeGrade(userMessage, uploadedFiles.value[0]);
  } else {
    currentChat.value.messages.push({
      role: 'system',
      content: '这是一个模拟的AI回复...',
      type: 'text'
    });
  }
};

const uploadedFiles = ref<File[]>([])

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    uploadedFiles.value.push(...Array.from(input.files))
  }
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}

const formatMessage = (content: string) => {
  // 将URL转换为可点击的链接
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, url => `<a href="${url}" target="_blank" class="message-link">${url}</a>`);
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-sidebar" :class="{ active: showChatList }">
      <div class="sidebar-header">
        <button class="new-chat-btn" @click="createNewChat">
          <span>+</span> 新会话
        </button>
      </div>
      <div class="chat-list">
        <div
          v-for="chat in chats"
          :key="chat.id"
          class="chat-item"
          :class="{ active: chat.id === currentChatId }"
          @click="currentChatId = chat.id"
        >
          <div class="chat-info">
            <div class="chat-title">{{ chat.title }}</div>
            <div class="chat-time">{{ chat.timestamp }}</div>
          </div>
          <button 
            class="delete-btn"
            @click.stop="deleteChat(chat.id)"
          >
            ×
          </button>
        </div>
      </div>
      
      <div v-if="isKnowledgeMode || isGradeMode" class="knowledge-upload">
        <h3>{{ isGradeMode ? '成绩文件' : '知识库文档' }}</h3>
        <div class="upload-area">
          <input
            type="file"
            multiple
            @change="handleFileUpload"
            :accept="isGradeMode ? '.xlsx,.xls,.csv' : '.pdf,.doc,.docx,.txt'"
            id="file-upload"
            class="hidden"
          >
          <label for="file-upload" class="upload-btn">
            <span>+ 上传{{ isGradeMode ? '成绩文件' : '文档' }}</span>
          </label>
        </div>
        <div class="file-list">
          <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
            <span class="file-name">{{ file.name }}</span>
            <button class="remove-btn" @click="removeFile(index)">×</button>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-main">
      <div class="chat-header">
        <button class="menu-btn" @click="showChatList = !showChatList">☰</button>
        <h2>{{ isPPTMode ? 'AI智能生成PPT' : isGradeMode ? '学生成绩分析' : currentChat?.title }}</h2>
      </div>

      <div class="messages">
        <div
          v-for="(msg, index) in currentChat?.messages"
          :key="index"
          class="message"
          :class="msg.role"
        >
          <div class="avatar" v-if="msg.role === 'system'">AI</div>
          <div class="content">
            <div v-html="formatMessage(msg.content)"></div>
            <div v-if="msg.type === 'ppt' && msg.file" class="file-download">
              <a :href="msg.file.url" :download="msg.file.name" class="download-link">
                📥 下载PPT文件
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="input-area">
        <div class="input-wrapper">
          <input
            v-model="inputMessage"
            type="text"
            :placeholder="isPPTMode ? '请输入PPT主题关键词' : isGradeMode ? '请上传文件或输入问题' : 'Enter发送'"
            @keyup.enter="sendMessage"
          >
          <div class="action-buttons">
            <button class="action-btn">🎤</button>
            <button class="action-btn">🌐</button>
            <button class="action-btn">∑</button>
            <button class="action-btn">📊</button>
            <button class="action-btn">↻</button>
            <button class="send-btn" @click="sendMessage">▶</button>
          </div>
        </div>
        <div class="terms">
         
          <a href="#">隐私政策</a>
          和
          <a href="#">用户协议</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  height: calc(100vh - 40px);
  background: white;
}

.chat-sidebar {
  width: 240px;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
  background: white;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #e4e7ed;
}

.new-chat-btn {
  width: 100%;
  padding: 8px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
}

.chat-item {
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.chat-item:hover {
  background: #f5f7fa;
}

.chat-item.active {
  background: #e6f7ff;
}

.chat-info {
  flex: 1;
}

.chat-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.chat-time {
  font-size: 12px;
  color: #909399;
}

.delete-btn {
  opacity: 0;
  border: none;
  background: none;
  color: #909399;
  cursor: pointer;
  font-size: 16px;
  padding: 4px 8px;
}

.chat-item:hover .delete-btn {
  opacity: 1;
}

.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.menu-btn {
  display: none;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  margin-right: 12px;
}

@media (max-width: 768px) {
  .chat-sidebar {
    position: fixed;
    left: -240px;
    top: 0;
    bottom: 0;
    transition: left 0.3s;
    z-index: 100;
  }

  .chat-sidebar.active {
    left: 0;
  }

  .menu-btn {
    display: block;
  }
}

.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e4e7ed;
}

.chat-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.message.system {
  padding-left: 40px;
}

.message .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-right: 12px;
}

.message .content {
  background: #f4f4f5;
  padding: 12px 16px;
  border-radius: 8px;
  max-width: 80%;
  white-space: pre-wrap;
}

.message .content :deep(.message-link) {
  color: #1890ff;
  text-decoration: none;
  word-break: break-all;
}

.message .content :deep(.message-link:hover) {
  text-decoration: underline;
}

.message.user {
  flex-direction: row-reverse;
}

.message.user .content {
  background: #e6f7ff;
}

.input-area {
  padding: 20px;
  border-top: 1px solid #e4e7ed;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  padding: 8px;
}

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px 8px;
  color: #606266;
}

.send-btn {
  border: none;
  background: #1890ff;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.terms {
  text-align: center;
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

.terms a {
  color: #1890ff;
  text-decoration: none;
}

.knowledge-upload {
  padding: 16px;
  border-top: 1px solid #e4e7ed;
}

.knowledge-upload h3 {
  font-size: 14px;
  margin: 0 0 12px;
  color: #606266;
}

.upload-area {
  margin-bottom: 12px;
}

.hidden {
  display: none;
}

.upload-btn {
  display: block;
  padding: 8px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  color: #606266;
  transition: all 0.3s;
}

.upload-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.file-list {
  max-height: 200px;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 8px;
}

.file-name {
  font-size: 12px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 160px;
}

.remove-btn {
  border: none;
  background: none;
  color: #909399;
  cursor: pointer;
  padding: 2px 6px;
}

.remove-btn:hover {
  color: #f56c6c;
}

.file-download {
  margin-top: 10px;
  text-align: center;
}

.download-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.download-link:hover {
  background-color: #45a049;
}
</style> 