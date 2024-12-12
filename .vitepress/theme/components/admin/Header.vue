<template>
  <div class="admin-header">
    <div class="header-left">
      <button class="collapse-btn" @click="toggleSidebar">
        <span class="iconfont" :class="isMobile ? 
          (collapsed ? 'icon-menu-unfold' : 'icon-menu-fold') : 
          (collapsed ? 'icon-menu-fold' : 'icon-menu-unfold')"
        ></span>
      </button>
      <div class="breadcrumb">
        <span v-for="(item, index) in breadcrumbs" 
          :key="index"
          class="breadcrumb-item"
        >
          {{ item }}
          <span v-if="index < breadcrumbs.length - 1" class="separator">/</span>
        </span>
      </div>
    </div>
    <div class="header-right">
      <div class="user-info">
        <span class="username hide-on-mobile">{{ username }}</span>
        <div class="avatar">
          <img :src="avatar" alt="avatar">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import { useSidebarCollapse } from '@/composables/useSidebarCollapse'

const route = useRoute()
const username = ref('Admin')
const avatar = ref('/avatar.jpg')
const { collapsed, toggleCollapsed } = useSidebarCollapse()
const isMobile = ref(window.innerWidth <= 768)

// 监听窗口大小变化
onMounted(() => {
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768
  }
  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

// 面包屑导航映射
const breadcrumbMap = {
  dashboard: '仪表盘',
  users: '用户管理',
  posts: '文章管理',
  comments: '评论管理',
  settings: '系统设置'
}

// 面包屑导航
const breadcrumbs = computed(() => {
  const path = route.path
  const parts = path.split('/').filter(Boolean)
  const lastPart = parts[parts.length - 1]
  return ['管理后台', breadcrumbMap[lastPart] || lastPart]
})

// 切换侧边栏
const toggleSidebar = () => {
  toggleCollapsed()
}
</script>

<style lang="scss" scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: var(--main-card-background);
  border-bottom: 1px solid var(--main-card-border);
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 20px;
    
    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 8px;
      background-color: transparent;
      cursor: pointer;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: var(--main-card-second-background);
      }
      
      .iconfont {
        font-size: 20px;
        color: var(--main-font-color);
      }
    }
    
    .breadcrumb {
      display: flex;
      align-items: center;
      
      .breadcrumb-item {
        color: var(--main-font-color);
        
        .separator {
          margin: 0 8px;
          color: var(--main-font-second-color);
        }
        
        &:last-child {
          color: var(--main-color);
        }
      }
    }
  }
  
  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      
      .username {
        color: var(--main-font-color);
      }
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    
    .header-left {
      gap: 10px;
      
      .breadcrumb {
        font-size: 14px;
      }
    }
    
    .header-right {
      .hide-on-mobile {
        display: none;
      }
    }
  }
}
</style> 