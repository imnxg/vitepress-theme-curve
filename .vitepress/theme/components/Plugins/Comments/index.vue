<!-- 评论 -->
<template>
  <div
    ref="mainCommentRef"
    id="main-comment"
    class="comment"
  >
    <div v-if="!fill" class="title">
      <span class="name">
        <i class="iconfont icon-chat"></i>
        评论
      </span>
      <span class="tool" @click="router.go('/pages/privacy')"> 隐私政策 </span>
    </div>
    
    <!-- 评论系统 -->
    <CourseComments :fill="fill" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import CourseComments from './CourseComments.vue';

const { theme } = useData();
const router = useRouter();
const fill = ref(false);

onMounted(() => {
  console.log('Comments component mounted');
  console.log('Theme:', theme.value);
});
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 2rem;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 3rem 0 1rem 0;
    padding: 0 6px;
    .name {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      .iconfont {
        font-size: 26px;
        font-weight: normal;
        margin-right: 8px;
      }
    }
    .tool {
      opacity: 0.6;
      font-size: 14px;
      cursor: pointer;
      transition:
        opacity 0.3s,
        color 0.3s;
      &:hover {
        opacity: 1;
        color: var(--main-color);
      }
    }
  }
}
</style>
