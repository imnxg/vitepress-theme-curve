import { loadScript, loadCSS } from "./commonTools.mjs";

const initComments = async (themeConfig) => {
  try {
    // 必要数据
    const option = themeConfig.comment;
    const commentType = option.type;
    if (!option.enable) return false;
    
    console.log("开始加载评论系统:", commentType);
    
    switch (commentType) {
      case "artalk":
        // 引入资源
        await loadCSS(`${option[commentType].server}/dist/Artalk.css`);
        return await new Promise((resolve, reject) => {
          loadScript(`${option[commentType].server}/dist/Artalk.js`, {
            callback: () => {
              if (typeof Artalk === "object") {
                resolve(Artalk);
              } else {
                reject(new Error("Artalk 初始化失败"));
              }
            },
          });
        });
      case "twikoo":
        // 引入资源
        return await new Promise((resolve, reject) => {
          loadScript(option[commentType].js, {
            callback: () => {
              if (typeof twikoo === "object") {
                resolve(twikoo);
              } else {
                reject(new Error("Twikoo 初始化失败"));
              }
            },
          });
        });
      case "course":
        return true; // 直接返回 true，因为不需要加载额外资源
      default:
        return false;
    }
  } catch (error) {
    console.error(`${commentType} 初始化失败`, error);
    throw error;
  }
};

export default initComments;
