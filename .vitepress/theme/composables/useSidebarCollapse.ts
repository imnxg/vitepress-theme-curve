import { ref } from 'vue'

const collapsed = ref(false)

export function useSidebarCollapse() {
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value
  }

  return {
    collapsed,
    toggleCollapsed
  }
} 