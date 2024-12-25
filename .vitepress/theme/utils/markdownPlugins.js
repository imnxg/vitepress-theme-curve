// 多媒体渲染插件
export function mediaPlugin(md) {
  // 保存默认的渲染器
  const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  // 添加自定义的渲染规则
  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    const src = token.attrs[srcIndex][1];
    
    console.log('正在处理链接:', src);
    console.log('Token 详情:', {
      type: token.type,
      tag: token.tag,
      attrs: token.attrs,
      content: token.content
    });

    // 1. PDF 文件渲染
    if (src.toLowerCase().endsWith('.pdf')) {
      console.log('检测到 PDF:', src);
      // 使用 fetch 测试 URL 是否可访问
      fetch(src)
        .then(response => {
          console.log('PDF 响应头:', response.headers);
          console.log('PDF 响应状态:', response.status);
        })
        .catch(error => {
          console.error('PDF 加载错误:', error);
        });

      return `
        <div class="pdf-container" style="position: relative; margin: 16px 0;">
          <iframe 
            src="${src}"
            width="100%"
            height="600px"
            style="border: 1px solid #e0e0e0; border-radius: 4px;"
            type="application/pdf"
            onload="console.log('PDF iframe 加载成功')"
            onerror="console.error('PDF iframe 加载失败')"
          ></iframe>
          <div style="margin-top: 10px;">
            <a href="${src}" target="_blank" style="display: inline-block; padding: 8px 16px; background: #4a9eff; color: white; border-radius: 4px; text-decoration: none;">
              下载 PDF
            </a>
          </div>
        </div>
      `;
    }
    
    // 2. 视频文件渲染
    if (src.match(/\.(mp4|webm|ogg)$/i) || src.includes('upos-hz-mirrorakam.akamaized.net')) {
      console.log('检测到视频:', src);
      
      // 检查是否是B站视频
      if (src.includes('upos-hz-mirrorakam.akamaized.net')) {
        // 获取视频预览图
        const posterUrl = `${src}?x-oss-process=video/snapshot,t_0,f_jpg,w_0,h_0,m_fast`;
        
        return `
          <div class="video-container" style="
            margin: 16px 0; 
            position: relative; 
            padding-bottom: 56.25%; 
            height: 0; 
            background: #000;
            border-radius: 8px;
            overflow: hidden;
          ">
            <div class="video-placeholder" style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: url('${posterUrl}');
              background-size: cover;
              background-position: center;
              transition: opacity 0.3s;
            "></div>
            <video 
              controls 
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                transition: opacity 0.3s;
              "
              preload="metadata"
              onloadeddata="this.style.opacity='1'; this.previousElementSibling.style.opacity='0'"
            >
              <source src="${src}" type="video/mp4">
              您的浏览器不支持视频标签。
            </video>
          </div>
        `;
      }
      
      // 其他视频使用相同的处理方式
      return `
        <div class="video-container" style="
          margin: 16px 0;
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
        ">
          <video 
            controls 
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              transition: opacity 0.3s;
            "
            preload="metadata"
            onloadeddata="this.style.opacity='1'"
          >
            <source src="${src}" type="video/mp4">
            您的浏览器不支持视频标签。
          </video>
        </div>
      `;
    }

    // 3. 音频文件渲染
    if (src.match(/\.(mp3|wav|ogg)$/i)) {
      console.log('检测到音频:', src);
      return `
        <div class="audio-container" style="margin: 16px 0;">
          <audio 
            controls 
            style="width: 100%; border-radius: 4px;"
          >
            <source src="${src}" type="audio/${src.split('.').pop()}">
            您的浏览器不支持音频标签。
          </audio>
        </div>
      `;
    }

    // 4. 图片渲染（使用默认渲染器）
    console.log('使用默认图片渲染:', src);
    return defaultRender(tokens, idx, options, env, self);
  };

  // 添加自定义的块级内容渲染规则
  md.renderer.rules.fence = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const code = token.content.trim();
    const info = token.info ? token.info.trim() : '';
    
    // 处理代码块
    if (info) {
      return `<pre><code class="language-${info}">${code}</code></pre>`;
    }
    
    return `<pre><code>${code}</code></pre>`;
  };

  // 确保插件被正确加载
  console.log('mediaPlugin loaded');
} 