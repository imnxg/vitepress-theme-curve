<template>
    <AdminLayout>
      <Content />
    </AdminLayout>
  </template>
  
  <script setup>
  import AdminLayout from '@/components/admin/Layout.vue'
  </script>
  
  <style lang="scss" scoped>
  :deep(.VPDoc) {
    padding: 0 !important;
    
    .container {
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }
  </style> 