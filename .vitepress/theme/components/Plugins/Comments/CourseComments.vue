<template>
  <div ref="commentRef" id="course-comment" class="comment-content">
    <!-- 发表评论 -->
    <div class="comment-editor">
      <textarea
        v-model="newComment"
        placeholder="写下你的评论..."
        :rows="3"
        class="comment-textarea"
      ></textarea>
      <div class="editor-footer">
        <button 
          class="submit-btn"
          :disabled="!newComment.trim()"
          @click="submitComment"
        >
          发表评论
        </button>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.userID" class="comment-item">
        <div class="comment-header">
          <span class="user-id">用户 {{ comment.userID }}</span>
          <span class="comment-time">{{ formatTime(comment.createTime) }}</span>
        </div>
        <div class="comment-content">
          {{ comment.content }}
        </div>
      </div>
      <!-- 无评论提示 -->
      <div v-if="!comments.length" class="no-comments">
        暂无评论，快来抢沙发吧！
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import dayjs from 'dayjs';

const { theme } = useData();
const route = useRoute();
const comments = ref([]);
const commentRef = ref(null);
const newComment = ref('');

// 格式化时间
const formatTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm');
};

// 获取评论数据
const fetchComments = async () => {
  console.log('=== Fetching Comments ===');
  console.log('Current route:', route.path);
  console.log('Theme:', theme.value);
  
  try {
    const result = {
      code: 'H200',
      data: [
        { userID: 1, content: '这是一条评论', createTime: new Date().toISOString() },
        { userID: 2, content: '这是另一条评论', createTime: new Date().toISOString() },
      ],
    };
    
    console.log('Mock data:', result);
    comments.value = result.data;
    console.log('Comments updated:', comments.value);
  } catch (error) {
    console.error('获取评论失败：', error);
  }
};

onMounted(() => {
  console.log('=== CourseComments Mounted ===');
  console.log('Current route:', route.path);
  fetchComments();
});

// 监听路由变化
watch(() => route.path, (newPath) => {
  console.log('Route changed:', newPath);
  fetchComments();
}, { immediate: true });

// 提交评论
const submitComment = async () => {
  if (!newComment.value.trim()) return;
  
  try {
    // const response = await fetch('http://localhost:8888/course/add/comment', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     content: newComment.value,
    //     userID: 1, 
    //   }),
    // });
    // const result = await response.json();
    
    
    const result = {
      code: 'H200',
      data: {
        userID: 1,
        content: newComment.value,
        createTime: new Date().toISOString(),
      }
    };

    if (result.code === 'H200') {
      // 添加到评论列表
      comments.value.unshift(result.data);
      // 清空输入框
      newComment.value = '';
    }
  } catch (error) {
    console.error('提交评论失败：', error);
  }
};
</script>

<style lang="scss" scoped>
.comment-content {
  margin: 16px 0;
  
  .comment-editor {
    margin-bottom: 24px;
    border: 1px solid var(--main-card-border);
    border-radius: 8px;
    background: var(--main-card-background);
    overflow: hidden;
    
    .comment-textarea {
      width: 100%;
      padding: 16px;
      border: none;
      background: transparent;
      color: var(--main-font-color);
      font-size: 14px;
      line-height: 1.6;
      resize: vertical;
      outline: none;
      
      &::placeholder {
        color: var(--main-font-second-color);
      }
    }
    
    .editor-footer {
      padding: 8px 16px;
      border-top: 1px solid var(--main-card-border);
      display: flex;
      justify-content: flex-end;
      
      .submit-btn {
        padding: 6px 16px;
        border: none;
        border-radius: 4px;
        background: var(--main-color);
        color: white;
        cursor: pointer;
        transition: opacity 0.3s;
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        &:not(:disabled):hover {
          opacity: 0.8;
        }
      }
    }
  }
  
  .comments-list {
    .comment-item {
      padding: 16px;
      margin-bottom: 16px;
      border: 1px solid var(--main-card-border);
      border-radius: 8px;
      background: var(--main-card-background);
      
      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        
        .user-id {
          color: var(--main-color);
          font-weight: bold;
        }
        
        .comment-time {
          color: var(--main-font-second-color);
          font-size: 12px;
        }
      }
      
      .comment-content {
        color: var(--main-font-color);
        line-height: 1.6;
      }
    }
    
    .no-comments {
      text-align: center;
      padding: 32px;
      color: var(--main-font-second-color);
      font-size: 14px;
    }
  }
}
</style> 