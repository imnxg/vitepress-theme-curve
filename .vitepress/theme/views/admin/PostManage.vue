<template>
  <div class="post-manage-container">
    <div class="manage-header">
      <h2>文章管理</h2>
      <div class="header-actions">
        <div class="search-box">
          <span class="iconfont icon-search"></span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索文章..."
            @input="handleSearch"
          >
        </div>
        <button class="add-btn" @click="handleAddPost">
          <span class="iconfont icon-add"></span>
          新建文章
        </button>
      </div>
    </div>
    
    <div class="post-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>作者</th>
            <th>分类</th>
            <th>状态</th>
            <th>发布时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.author }}</td>
            <td>
              <span class="category-tag">{{ post.category }}</span>
            </td>
            <td>
              <span class="status-tag" :class="post.status">
                {{ post.status === 'published' ? '已发布' : '草稿' }}
              </span>
            </td>
            <td>{{ post.publishTime }}</td>
            <td class="actions">
              <button class="edit-btn" @click="handleEdit(post)">编辑</button>
              <button class="delete-btn" @click="handleDelete(post)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const posts = ref([
  {
    id: 1,
    title: 'VitePress主题开发指南',
    author: 'Admin',
    category: '技术',
    status: 'published',
    publishTime: '2024-01-20 15:30'
  },
  {
    id: 2,
    title: '如何使用Vue3',
    author: 'Admin',
    category: '教程',
    status: 'draft',
    publishTime: '2024-01-19 10:20'
  }
])

const handleSearch = () => {
  // 实现搜索逻辑
}

const handleAddPost = () => {
  // 实现新建文章逻辑
}

const handleEdit = (post) => {
  // 实现编辑逻辑
}

const handleDelete = (post) => {
  // 实现删除逻辑
}
</script>

<style lang="scss" scoped>
.post-manage-container {
  padding: 20px;
  
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h2 {
      font-size: 24px;
      color: var(--main-font-color);
    }
    
    .header-actions {
      display: flex;
      gap: 15px;
      
      .search-box {
        position: relative;
        
        .iconfont {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--main-font-second-color);
        }
        
        input {
          width: 200px;
          height: 36px;
          padding: 0 35px;
          border: 1px solid var(--main-card-border);
          border-radius: 8px;
          background-color: var(--main-card-second-background);
          color: var(--main-font-color);
          
          &:focus {
            border-color: var(--main-color);
            outline: none;
          }
        }
      }
      
      .add-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        height: 36px;
        padding: 0 15px;
        border: none;
        border-radius: 8px;
        background-color: var(--main-color);
        color: #fff;
        cursor: pointer;
        transition: opacity 0.3s;
        
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
  
  .post-table {
    background-color: var(--main-card-background);
    border: 1px solid var(--main-card-border);
    border-radius: 12px;
    overflow: hidden;
    
    table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid var(--main-card-border);
      }
      
      th {
        background-color: var(--main-card-second-background);
        color: var(--main-font-second-color);
        font-weight: normal;
      }
      
      td {
        color: var(--main-font-color);
      }
      
      .category-tag {
        padding: 4px 8px;
        border-radius: 4px;
        background-color: var(--main-color-bg);
        color: var(--main-color);
      }
      
      .status-tag {
        padding: 4px 8px;
        border-radius: 4px;
        
        &.published {
          background-color: var(--success-color-bg);
          color: var(--success-color);
        }
        
        &.draft {
          background-color: var(--warning-color-bg);
          color: var(--warning-color);
        }
      }
      
      .actions {
        display: flex;
        gap: 10px;
        
        button {
          padding: 4px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.3s;
          
          &:hover {
            opacity: 0.9;
          }
        }
        
        .edit-btn {
          background-color: var(--main-color-bg);
          color: var(--main-color);
        }
        
        .delete-btn {
          background-color: var(--error-color-bg);
          color: var(--error-color);
        }
      }
    }
    
    @media (max-width: 768px) {
      overflow-x: auto;
      
      table {
        min-width: 800px;
      }
      
      .manage-header {
        flex-direction: column;
        gap: 15px;
        
        .header-actions {
          width: 100%;
          justify-content: space-between;
          
          .search-box {
            flex: 1;
            margin-right: 10px;
            
            input {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style> 