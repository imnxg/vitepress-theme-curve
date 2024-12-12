<template>
    <div class="comment-manage-container">
      <div class="manage-header">
        <h2>评论管理</h2>
        <div class="header-actions">
          <div class="search-box">
            <span class="iconfont icon-search"></span>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索评论..."
              @input="handleSearch"
            >
          </div>
        </div>
      </div>
      
      <div class="comment-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>评论内容</th>
              <th>评论者</th>
              <th>文章</th>
              <th>状态</th>
              <th>评论时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comment in comments" :key="comment.id">
              <td>{{ comment.id }}</td>
              <td>{{ comment.content }}</td>
              <td>{{ comment.author }}</td>
              <td>{{ comment.postTitle }}</td>
              <td>
                <span class="status-tag" :class="comment.status">
                  {{ comment.status === 'approved' ? '已通过' : '待审核' }}
                </span>
              </td>
              <td>{{ comment.createTime }}</td>
              <td class="actions">
                <button 
                  v-if="comment.status === 'pending'"
                  class="approve-btn" 
                  @click="handleApprove(comment)"
                >
                  通过
                </button>
                <button class="delete-btn" @click="handleDelete(comment)">删除</button>
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
  const comments = ref([
    {
      id: 1,
      content: '这篇文章写得很好！',
      author: 'user1',
      postTitle: 'VitePress主题开发指南',
      status: 'approved',
      createTime: '2024-01-20 15:30'
    },
    {
      id: 2,
      content: '期待更新！',
      author: 'user2',
      postTitle: '如何使用Vue3',
      status: 'pending',
      createTime: '2024-01-19 10:20'
    }
  ])
  
  const handleSearch = () => {
    // 实现搜索逻辑
  }
  
  const handleApprove = (comment) => {
    // 实现审核通过逻辑
  }
  
  const handleDelete = (comment) => {
    // 实现删除逻辑
  }
  </script>
  
  <style lang="scss" scoped>
  .comment-manage-container {
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
      }
    }
    
    .comment-table {
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
        
        .status-tag {
          padding: 4px 8px;
          border-radius: 4px;
          
          &.approved {
            background-color: var(--success-color-bg);
            color: var(--success-color);
          }
          
          &.pending {
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
          
          .approve-btn {
            background-color: var(--success-color-bg);
            color: var(--success-color);
          }
          
          .delete-btn {
            background-color: var(--error-color-bg);
            color: var(--error-color);
          }
        }
      }
    }
  }
  </style>