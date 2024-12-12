import { defineStore } from 'pinia'

// 用户信息
interface UserInfo {
  username: string
}

// 管理员登录状态
interface AdminState {
  isLoggedIn: boolean
  userInfo: UserInfo | null
  token: string
  tokenExpireTime: number
}

// 管理员登录状态
export const useAdminStore = defineStore('admin', {
    // 初始化管理员登录状态
  state: (): AdminState => ({
    isLoggedIn: false,
    userInfo: null,
    token: '',
    tokenExpireTime: 0
  }),
  // 获取管理员登录状态
  getters: {
    isAuthenticated(): boolean {
      const now = Date.now()
      const isTokenValid = this.token && this.tokenExpireTime > now
      return !!(this.isLoggedIn && isTokenValid && this.userInfo)
    }
  },
  // 管理员登录状态
  actions: {
    login(data: { username: string, token: string }) {
      this.isLoggedIn = true
      this.userInfo = { username: data.username }
      this.token = data.token
      this.tokenExpireTime = Date.now() + 2 * 60 * 60 * 1000
    },
    // 管理员退出登录
    logout() {
      this.isLoggedIn = false
      this.userInfo = null
      this.token = ''
      this.tokenExpireTime = 0
    },
    // 检查管理员登录状态
    checkLoginStatus(): boolean {
      console.log("检查管理员登录状态",this.isAuthenticated)
      return this.isAuthenticated
    }
  },
  // 持久化管理员登录状态
  persist: {
    key: 'admin-store',
    storage: window.localStorage,
    paths: ['isLoggedIn', 'userInfo', 'token', 'tokenExpireTime']
  }
}) 