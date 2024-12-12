<template>
  <div class="sidebar-wrapper">
    <!-- 遮罩层 -->
    <div 
      v-show="!collapsed && isMobile" 
      class="sidebar-mask"
      @click="toggleCollapsed"
    ></div>
    
    <div class="admin-sidebar" :class="{ collapsed, mobile: isMobile }">
      <div class="sidebar-header">
        <span class="iconfont icon-dashboard logo"></span>
        <h1 class="title" v-if="!collapsed">管理后台</h1>
      </div>
      
      <div class="sidebar-menu">
        <div 
          v-for="menu in menus" 
          :key="menu.path"
          class="menu-item"
          :class="{ active: isActive(menu.path) }"
          @click="handleMenuClick(menu.path)"
        >
          <span class="iconfont" :class="menu.icon"></span>
          <span class="label" v-if="!collapsed">{{ menu.label }}</span>
        </div>
      </div>

      <!-- 收缩/展开按钮 -->
      <button 
        class="collapse-trigger"
        @click="toggleCollapsed"
        :title="collapsed ? '展开菜单' : '收起菜单'"
      >
        <span class="iconfont" :class="collapsed ? 'icon-menu-unfold' : 'icon-menu-fold'"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import { useSidebarCollapse } from '@/composables/useSidebarCollapse'

const route = useRoute()
const router = useRouter()
const { collapsed, toggleCollapsed } = useSidebarCollapse()

// 是否为移动端
const isMobile = ref(false)

// 检查是否为移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// 监听窗口大小变化
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// 处理菜单点击
const handleMenuClick = (path) => {
  router.go(path)
}

// 菜单配置
const menus = [
  { 
    label: '仪表盘',
    path: '/pages/admin/dashboard',
    icon: 'icon-dashboard'
  },
  {
    label: '用户管理',
    path: '/pages/admin/users',
    icon: 'icon-users'
  },
  {
    label: '文章管理',
    path: '/pages/admin/posts',
    icon: 'icon-article'
  },
  {
    label: '评论管理',
    path: '/pages/admin/comments',
    icon: 'icon-comment'
  },
  {
    label: '系统设置',
    path: '/pages/admin/settings',
    icon: 'icon-setting'
  }
]

// 判断当前路由是否激活
const isActive = (path) => {
  return route.path === path || route.path === path.replace('/pages', '')
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  position: relative;
  z-index: 1000;

  .sidebar-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .admin-sidebar {
    position: relative;
    width: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--main-card-background);
    border-right: 1px solid var(--main-card-border);
    transition: all 0.3s;
    z-index: 1000;
    
    // 收缩/展开触发器
    .collapse-trigger {
      position: absolute;
      right: -16px;
      top: 50%;
      transform: translateY(-50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--main-card-background);
      border: 1px solid var(--main-card-border);
      color: var(--main-font-color);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      z-index: 1001;
      
      &:hover {
        color: var(--main-color);
        background-color: var(--main-color-bg);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      .iconfont {
        font-size: 14px;
      }
    }
    
    &.collapsed {
      width: 64px;
      
      .sidebar-header {
        padding: 16px 0;
        justify-content: center;
        
        .logo {
          margin: 0;
        }
      }
      
      .menu-item {
        padding: 10px 0;
        justify-content: center;
        
        .iconfont {
          margin: 0;
          font-size: 18px;
        }
      }
      
      .sidebar-footer {
        padding: 12px 0;
        
        .collapse-btn {
          justify-content: center;
          padding: 8px 0;
          
          .iconfont {
            margin: 0;
          }
        }
      }
    }
    
    &.mobile {
      position: fixed;
      transform: translateX(0);
      
      &.collapsed {
        transform: translateX(-100%);
      }

      // 移动端按钮样式
      .collapse-trigger {
        right: -40px;
        width: 40px;
        height: 40px;
        border-radius: 0 4px 4px 0;
        border-left: none;
        
        &:hover {
          box-shadow: none;
        }
      }
    }
    
    .sidebar-header {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--main-card-border);
      
      .logo {
        font-size: 20px;
        margin-right: 8px;
        color: var(--main-color);
      }
      
      .title {
        font-size: 16px;
        color: var(--main-font-color);
        white-space: nowrap;
      }
    }
    
    .sidebar-menu {
      flex: 1;
      padding: 12px 0;
      overflow-y: auto;
      
      .menu-item {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 10px 16px;
        color: var(--main-font-color);
        text-decoration: none;
        transition: all 0.3s;
        
        .iconfont {
          font-size: 16px;
          margin-right: 8px;
        }
        
        .label {
          font-size: 14px;
          white-space: nowrap;
        }
        
        &:hover {
          color: var(--main-color);
          background-color: var(--main-color-bg);
        }
        
        &.active {
          color: var(--main-color);
          background-color: var(--main-color-bg);
        }
      }
    }
    
    .sidebar-footer {
      padding: 12px 16px;
      border-top: 1px solid var(--main-card-border);
      
      .collapse-btn {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        background-color: transparent;
        color: var(--main-font-color);
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover {
          background-color: var(--main-color-bg);
          color: var(--main-color);
        }
        
        .iconfont {
          font-size: 16px;
          margin-right: 8px;
        }
        
        .label {
          font-size: 14px;
          white-space: nowrap;
        }
      }
    }
  }

  // 移动端样式调整
  @media (max-width: 768px) {
    .admin-sidebar {
      &.mobile {
        width: 200px !important;
        
        &.collapsed {
          width: 200px !important;
        }
      }
    }
  }
}
</style> 