// import { getAllPosts } from "../../utils/getPostData.mjs";
import { getAllPosts } from "./theme/utils/getPostArticleData.mjs";

export default {
  async paths() {
    const posts = await getAllPosts();
    
    if (!posts || !Array.isArray(posts)) {
      console.warn('No posts data available');
      return [];
    }

    const routes = posts
      .filter(post => post && post.id)
      .map(post => ({
        params: { id: post.id.toString() },
        content: post.content // 可选：预加载内容
      }));
      
    console.log('Generated article routes:', routes);
    return routes;
  }
}; 