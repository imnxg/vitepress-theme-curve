<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="admin-main" :class="{ 'menu-collapsed': collapsed }">
      <AdminHeader />
      <div class="admin-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AdminHeader from './Header.vue'
import AdminSidebar from './Sidebar.vue'
import { useSidebarCollapse } from '@/composables/useSidebarCollapse'

const { collapsed } = useSidebarCollapse()


</script>

<style lang="scss" scoped>
.admin-layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: var(--main-background);
  z-index: 999;
  
  .admin-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: calc(100% - 200px);
    transition: width 0.3s;
    
    &.menu-collapsed {
      width: calc(100% - 64px);
    }
    
    .admin-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;

      :deep(.VPDoc) {
        padding: 0 !important;
        
        .container {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      }
    }
  }

  // 响应式布局
  @media (max-width: 768px) {
    .admin-main {
      width: 100% !important;
    }
  }
}
</style> 