import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'
import { useAdminStore } from '../store/modules/admin'

export function useAuthCheck() {
  const router = useRouter()
  const adminStore = useAdminStore()
  let checkInterval: NodeJS.Timer | null = null

  const checkAuth = () => {
    if (!adminStore.checkLoginStatus()) {
      // token 失效，清除状态并跳转到登录页
      adminStore.logout()
      router.go('/pages/admin/login')
    }
  }

  onMounted(() => {
    // 立即检查一次
    checkAuth()
    // 设置定时检查（每分钟检查一次）
    checkInterval = setInterval(checkAuth, 60 * 1000)
  })

  onUnmounted(() => {
    // 清除定时器
    if (checkInterval) {
      clearInterval(checkInterval)
    }
  })

  return {
    checkAuth
  }
} 