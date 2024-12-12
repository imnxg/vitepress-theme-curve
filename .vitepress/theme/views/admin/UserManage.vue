<template>
  <AdminLayout>
    <div class="user-manage-container">
      <div class="manage-header">
        <h2>用户管理</h2>
        <div class="header-actions">
          <div class="search-box">
            <span class="iconfont icon-search"></span>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索用户..."
              @input="handleSearch"
            >
          </div>
          <button class="add-btn" @click="handleAddUser">
            <span class="iconfont icon-add"></span>
            添加用户
          </button>
        </div>
      </div>
      
      <div class="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>状态</th>
              <th>注册时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span class="role-tag" :class="user.role">{{ user.role }}</span>
              </td>
              <td>
                <span class="status-tag" :class="user.status">
                  {{ user.status === 'active' ? '正常' : '禁用' }}
                </span>
              </td>
              <td>{{ user.registerTime }}</td>
              <td class="actions">
                <button class="edit-btn" @click="handleEdit(user)">
                  <span class="iconfont icon-edit"></span>
                </button>
                <button class="delete-btn" @click="handleDelete(user)">
                  <span class="iconfont icon-delete"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页 -->
      <div class="pagination">
        <button 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >上一页</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >下一页</button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/admin/Layout.vue'

const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(10)

// 模拟用户数据
const users = ref([
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    registerTime: '2024-01-01 12:00'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    role: 'user',
    status: 'active',
    registerTime: '2024-01-02 15:30'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    role: 'user',
    status: 'inactive',
    registerTime: '2024-01-03 09:15'
  }
])

const handleSearch = () => {
  // 实现搜索逻辑
  console.log('搜索:', searchQuery.value)
}

const handleAddUser = () => {
  // 实现添加用户逻辑
  console.log('添加用户')
}

const handleEdit = (user) => {
  // 实现编辑用户逻辑
  console.log('编辑用户:', user)
}

const handleDelete = (user) => {
  // 实现删除用户逻辑
  console.log('删除用户:', user)
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  padding: 20px;
  
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background-color: var(--main-card-background);
    border: 1px solid var(--main-card-border);
    border-radius: 12px;
    
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
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--main-font-second-color);
        }
        
        input {
          width: 200px;
          height: 36px;
          padding: 0 12px 0 35px;
          border: 1px solid var(--main-card-border);
          border-radius: 8px;
          background-color: var(--main-card-second-background);
          color: var(--main-font-color);
          
          &:focus {
            border-color: var(--main-color);
            box-shadow: 0 0 0 2px var(--main-color-bg);
          }
        }
      }
      
      .add-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
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
  
  .user-table {
    background-color: var(--main-card-background);
    border: 1px solid var(--main-card-border);
    border-radius: 12px;
    overflow-x: auto;
    
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
        color: var(--main-font-color);
        font-weight: bold;
      }
      
      td {
        color: var(--main-font-color);
      }
      
      .role-tag, .status-tag {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }
      
      .role-tag {
        &.admin {
          background-color: var(--main-color-bg);
          color: var(--main-color);
        }
        &.user {
          background-color: var(--main-success-color-bg);
          color: var(--main-success-color);
        }
      }
      
      .status-tag {
        &.active {
          background-color: var(--main-success-color-bg);
          color: var(--main-success-color);
        }
        &.inactive {
          background-color: var(--main-error-color-bg);
          color: var(--main-error-color);
        }
      }
      
      .actions {
        display: flex;
        gap: 8px;
        
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.3s;
          
          &:hover {
            opacity: 0.8;
          }
          
          &.edit-btn {
            background-color: var(--main-warning-color-bg);
            color: var(--main-warning-color);
          }
          
          &.delete-btn {
            background-color: var(--main-error-color-bg);
            color: var(--main-error-color);
          }
        }
      }
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
    
    button {
      padding: 8px 16px;
      border: 1px solid var(--main-card-border);
      border-radius: 8px;
      background-color: var(--main-card-background);
      color: var(--main-font-color);
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover:not(:disabled) {
        border-color: var(--main-color);
        color: var(--main-color);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

@media (max-width: 768px) {
  .user-manage-container {
    .manage-header {
      flex-direction: column;
      gap: 15px;
      
      .header-actions {
        flex-direction: column;
        width: 100%;
        
        .search-box {
          width: 100%;
          
          input {
            width: 100%;
          }
        }
        
        .add-btn {
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
}
</style> 