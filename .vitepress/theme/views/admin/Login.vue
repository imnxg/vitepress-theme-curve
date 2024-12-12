<template>
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <h2>管理员登录</h2>
        </div>
        <div class="login-form">
          <div class="form-item">
            <span class="iconfont icon-user"></span>
            <input 
              type="text" 
              v-model="username" 
              placeholder="用户名"
              @keyup.enter="handleLogin"
            >
          </div>
          <div class="form-item">
            <span class="iconfont icon-password"></span>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              placeholder="密码"
              @keyup.enter="handleLogin"
            >
            <span 
              class="iconfont" 
              :class="showPassword ? 'icon-eye-open' : 'icon-eye-close'"
              @click="showPassword = !showPassword"
            ></span>
          </div>
          <button class="login-btn" @click="handleLogin">登录</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vitepress'
  import { useAdminStore } from '@/store/modules/admin'
  
  const router = useRouter()
  const adminStore = useAdminStore()
  const username = ref('')
  const password = ref('')
  const showPassword = ref(false)
  
  //如果已经登录，直接跳转到仪表盘
  onMounted(() => {
    if (adminStore.checkLoginStatus()) {
        console.log('已经登录，跳转到仪表盘',adminStore)
      router.go('/pages/admin/dashboard')
    }
  })

  const handleLogin = () => {
    if (!username.value || !password.value) {
      window.$message.warning('请输入用户名和密码')
      return
    }
    
    // TODO：后续调用登录接口，模拟登录成功
    adminStore.login({
      username: username.value,
      token: 'mock-token'
    })
    
    window.$message.success('登录成功')
    router.go('/pages/admin/dashboard')
  }
  </script>
  
  <style lang="scss" scoped>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - var(--header-height));
    padding: 20px;
    
    .login-box {
      width: 100%;
      max-width: 400px;
      padding: 30px;
      border-radius: 16px;
      background-color: var(--main-card-background);
      border: 1px solid var(--main-card-border);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      
      .login-header {
        text-align: center;
        margin-bottom: 30px;
        
        h2 {
          font-size: 24px;
          color: var(--main-font-color);
        }
      }
      
      .login-form {
        .form-item {
          position: relative;
          margin-bottom: 20px;
          
          .iconfont {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 18px;
            color: var(--main-font-second-color);
          }
          
          input {
            width: 100%;
            height: 45px;
            padding: 0 45px;
            border: 1px solid var(--main-card-border);
            border-radius: 8px;
            background-color: var(--main-card-second-background);
            color: var(--main-font-color);
            transition: all 0.3s;
            
            &:focus {
              border-color: var(--main-color);
              box-shadow: 0 0 0 2px var(--main-color-bg);
            }
          }
          
          .icon-eye-open,
          .icon-eye-close {
            left: auto;
            right: 15px;
            cursor: pointer;
            
            &:hover {
              color: var(--main-color);
            }
          }
        }
        
        .login-btn {
          width: 100%;
          height: 45px;
          border: none;
          border-radius: 8px;
          background-color: var(--main-color);
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          
          &:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          
          &:active {
            transform: translateY(0);
          }
        }
      }
    }
  }
  </style> 