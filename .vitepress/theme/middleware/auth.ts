import { useAdminStore } from '../store/modules/admin'

export function useAuthGuard() {
  const adminStore = useAdminStore()
  
  const checkAuth = (path: string) => {
    // 检查是否是管理后台路由
    const isAdminPath = path.startsWith('/admin') || path.startsWith('/pages/admin')
    const isLoginPath = path.endsWith('/login')
    
    // 登录页面不需要验证
    if (isLoginPath) return true
    
    // 管理后台页面需要验证登录状态
    if (isAdminPath) {
      return adminStore.checkLoginStatus()
    }
    
    // 其他页面不需要验证
    return true
  }
  
  return {
    checkAuth
  }
} 