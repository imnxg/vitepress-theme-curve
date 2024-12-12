<template>
    <AdminLayout>
      <div class="dashboard-container">
        <div class="dashboard-header">
          <h2>仪表盘</h2>
          <div class="header-right">
            <span class="welcome">欢迎回来，{{ username }}</span>
            <button class="logout-btn" @click="handleLogout">
              <span class="iconfont icon-logout"></span>
              退出登录
            </button>
          </div>
        </div>
        
        <div class="dashboard-content">
          <!-- 数据概览卡片 -->
          <div class="stats-cards">
            <div class="stat-card" v-for="stat in statistics" :key="stat.title">
              <div class="stat-icon">
                <span class="iconfont" :class="stat.icon"></span>
              </div>
              <div class="stat-info">
                <div class="stat-title">{{ stat.title }}</div>
                <div class="stat-value">{{ stat.value }}</div>
              </div>
            </div>
          </div>
          
          <!-- 最近活动 -->
          <div class="recent-activities">
            <h3>最近活动</h3>
            <div class="activity-list">
              <div class="activity-item" v-for="activity in activities" :key="activity.id">
                <span class="activity-time">{{ activity.time }}</span>
                <span class="activity-content">{{ activity.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vitepress'
  import { useAdminStore } from '@/store/modules/admin'
  import AdminLayout from '@/components/admin/Layout.vue'
  
  const router = useRouter()
  const adminStore = useAdminStore()
  const username = computed(() => adminStore.userInfo?.username || 'Admin')
  
  // 统计数据
  const statistics = ref([
    { title: '文章总数', value: '125', icon: 'icon-article' },
    { title: '用户数量', value: '1,234', icon: 'icon-user' },
    { title: '评论数量', value: '3,456', icon: 'icon-comment' },
    { title: '访问量', value: '45,678', icon: 'icon-view' }
  ])
  
  // 最近活动
  const activities = ref([
    { id: 1, time: '2024-01-20 12:30', content: '新用户注册: user123' },
    { id: 2, time: '2024-01-20 11:45', content: '发布新文章: VitePress主题开发指南' },
    { id: 3, time: '2024-01-20 10:15', content: '更新了网站配置' },
    { id: 4, time: '2024-01-20 09:30', content: '回复了用户评论' }
  ])
  
  // 退出登录
  const handleLogout = () => {
    adminStore.logout()
    router.go('/pages/admin/login')
  }
  </script>
  
  <style lang="scss" scoped>
  .dashboard-container {
    padding: 20px;
    
    .dashboard-header {
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
      
      .header-right {
        display: flex;
        align-items: center;
        gap: 20px;
        
        .welcome {
          color: var(--main-font-second-color);
        }
        
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          background-color: var(--main-error-color);
          color: #fff;
          cursor: pointer;
          transition: opacity 0.3s;
          
          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
    
    .dashboard-content {
      .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
        
        .stat-card {
          display: flex;
          align-items: center;
          padding: 20px;
          background-color: var(--main-card-background);
          border: 1px solid var(--main-card-border);
          border-radius: 12px;
          
          .stat-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            margin-right: 15px;
            border-radius: 10px;
            background-color: var(--main-color-bg);
            
            .iconfont {
              font-size: 24px;
              color: var(--main-color);
            }
          }
          
          .stat-info {
            .stat-title {
              font-size: 14px;
              color: var(--main-font-second-color);
              margin-bottom: 5px;
            }
            
            .stat-value {
              font-size: 24px;
              font-weight: bold;
              color: var(--main-font-color);
            }
          }
        }
      }
      
      .recent-activities {
        padding: 20px;
        background-color: var(--main-card-background);
        border: 1px solid var(--main-card-border);
        border-radius: 12px;
        
        h3 {
          margin-bottom: 20px;
          font-size: 18px;
          color: var(--main-font-color);
        }
        
        .activity-list {
          .activity-item {
            display: flex;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid var(--main-card-border);
            
            &:last-child {
              border-bottom: none;
            }
            
            .activity-time {
              min-width: 150px;
              color: var(--main-font-second-color);
              font-size: 14px;
            }
            
            .activity-content {
              color: var(--main-font-color);
            }
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .dashboard-container {
      .dashboard-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
        
        .header-right {
          flex-direction: column;
        }
      }
    }
  }
  </style>