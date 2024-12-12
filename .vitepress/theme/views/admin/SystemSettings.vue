<template>
  <div class="settings-container">
    <div class="settings-header">
      <h2>系统设置</h2>
    </div>
    
    <div class="settings-content">
      <div class="settings-section">
        <h3>基本设置</h3>
        <div class="setting-item">
          <label>网站标题</label>
          <input type="text" v-model="settings.siteTitle">
        </div>
        <div class="setting-item">
          <label>网站描述</label>
          <textarea v-model="settings.siteDescription"></textarea>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>主题设置</h3>
        <div class="setting-item">
          <label>主题模式</label>
          <select v-model="settings.themeMode">
            <option value="light">浅色</option>
            <option value="dark">深色</option>
            <option value="auto">跟随系统</option>
          </select>
        </div>
        <div class="setting-item">
          <label>主题色</label>
          <input type="color" v-model="settings.themeColor">
        </div>
      </div>
      
      <div class="settings-section">
        <h3>其他设置</h3>
        <div class="setting-item">
          <label>开启评论</label>
          <div class="switch">
            <input 
              type="checkbox" 
              v-model="settings.enableComments"
              id="commentSwitch"
            >
            <label for="commentSwitch"></label>
          </div>
        </div>
      </div>
      
      <div class="settings-actions">
        <button class="save-btn" @click="handleSave">保存设置</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const settings = ref({
  siteTitle: 'My Blog',
  siteDescription: '这是一个基于 VitePress 的博客',
  themeMode: 'auto',
  themeColor: '#3eaf7c',
  enableComments: true
})

const handleSave = () => {
  // 实现保存设置逻辑
  window.$message.success('设置保存成功')
}
</script>

<style lang="scss" scoped>
.settings-container {
  padding: 20px;
  
  .settings-header {
    margin-bottom: 30px;
    
    h2 {
      font-size: 24px;
      color: var(--main-font-color);
    }
  }
  
  .settings-content {
    max-width: 800px;
    
    .settings-section {
      margin-bottom: 40px;
      padding: 20px;
      background-color: var(--main-card-background);
      border: 1px solid var(--main-card-border);
      border-radius: 12px;
      
      h3 {
        margin-bottom: 20px;
        font-size: 18px;
        color: var(--main-font-color);
      }
      
      .setting-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        label {
          width: 120px;
          color: var(--main-font-second-color);
        }
        
        input[type="text"],
        textarea,
        select {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--main-card-border);
          border-radius: 8px;
          background-color: var(--main-card-second-background);
          color: var(--main-font-color);
          
          &:focus {
            border-color: var(--main-color);
            outline: none;
          }
        }
        
        textarea {
          height: 100px;
          resize: vertical;
        }
        
        .switch {
          position: relative;
          width: 50px;
          height: 24px;
          
          input {
            display: none;
            
            &:checked + label {
              background-color: var(--main-color);
              
              &:after {
                transform: translateX(26px);
              }
            }
          }
          
          label {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--main-font-second-color);
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s;
            
            &:after {
              content: '';
              position: absolute;
              top: 2px;
              left: 2px;
              width: 20px;
              height: 20px;
              background-color: #fff;
              border-radius: 50%;
              transition: all 0.3s;
            }
          }
        }
      }
    }
    
    .settings-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      
      .save-btn {
        padding: 10px 24px;
        border: none;
        border-radius: 8px;
        background-color: var(--main-color);
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        transition: opacity 0.3s;
        
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}
</style> 