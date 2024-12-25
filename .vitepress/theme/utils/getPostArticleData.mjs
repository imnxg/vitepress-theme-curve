import { generateId } from "./commonTools.mjs";
import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs-extra";

/**
 * 动态获取文章 接口数据
 */
async function getPostMDFilePathsFromBackend() {
  try {
    // const response = await fetch('http://localhost:8080/article/getAllArticle');
    // console.log(response);
    // if (!response.ok) {
    //   console.log("tttttt")
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // 假设后端返回的是一个包含Markdown文件路径或URL的数组
    //const filePaths = await response.json();
    const filePaths = {
      code: 'H200',
      message: '请求成功',
      data: [ 'http://localhost:8080/article/get/1','http://localhost:8080/article/get/2' ]
    }
    console.log(filePaths);
    return filePaths.data;
  } catch (error) {
    console.error("从后端获取文章路径时出错:", error);
    throw error;
  }
}
async function fetchMarkdownFile(url) {
  // const url = 'http://localhost:8080/article/get/'+url;
  console.log("fetchMarkdownFile url:", url);
  try {
     // const response = await fetch(url);
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }
  // return await response.text();
    // 模拟返回 markdown 内容
    const content = `---
title: 欢迎使用 Curve
tags: [Hello]
categories: [随便说说]
date: 2024-10-10
description: 欢迎使用 Curve 主题，这是你的第一篇文章
articleGPT: 这是一篇初始化文章，旨在告诉用户一些使用说明和须知。
references:
  - title: vitepress-theme-curve
    url: https://github.com/imsyy/vitepress-theme-curve
---

# 欢迎使用 Curve

你好啊，很高兴你选择了 [vitepress-theme-curve](https://github.com/imsyy/vitepress-theme-curve) ！

这将是你的第一篇文章，你可以查看 [主题文档](https://blog.imsyy.top/pages/categories/%E4%B8%BB%E9%A2%98%E6%96%87%E6%A1%A3) 以了解更多。

## 特性

- Markdown 支持
- 代码高亮
- 链接跳转
- 等等...

## pdf

![PDF文档](http://www.caict.ac.cn/kxyj/qwfb/bps/202408/P020240830315324580655.pdf)

##  视频

![video视频](https://upos-hz-mirrorakam.akamaized.net/upgcxcode/67/16/27473151667/27473151667-1-192.mp4?e=ig8euxZM2rNcNbRg7bdVhwdlhWNjhwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1735120234&gen=playurlv2&os=akam&oi=752066219&trid=62f5f5f629824b559001ae77ebdabaa1T&mid=175268126&platform=html5&og=hw&upsig=357703b371436717ee7c182bb576f717&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform,og&hdnts=exp=1735113034~hmac=877cf9b2f7df9e69f04302f2f139825bcb0827c4ab9abfc43f47b9875eb0c134&bvc=vod&nettype=0&bw=126491&orderid=0,2&buvid=&build=0&mobi_app=&f=T_0_0&logo=80000000)

`;

    return content;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { url, content: `Error: Unable to fetch content from ${url}` };
  }
}

/**
 * 获取 posts 目录下所有 Markdown 文件的路径
 * @returns {Promise<string[]>} - 文件路径数组
 */
// const getPostMDFilePaths = async () => {
//   try {
//     // 获取所有 md 文件路径
//     let paths = await globby(["**.md"], {
//       ignore: ["node_modules", "pages", ".vitepress", "README.md"],
//     });
//     // 过滤路径，只包括 'posts' 目录下的文件
//     return paths.filter((item) => item.includes("posts/"));
//   } catch (error) {
//     console.error("获取文章路径时出错:", error);
//     throw error;
//   }
// };

/**
 * 基于 frontMatter 日期降序排序文章
 * @param {Object} obj1 - 第一篇文章对象
 * @param {Object} obj2 - 第二篇文章对象
 * @returns {number} - 比较结果
 */
const compareDate = (obj1, obj2) => {
  return obj1.date < obj2.date ? 1 : -1;
};
const comparePostPriority = (a, b) => {
  if (a.top && !b.top) {
    return -1;
  }
  if (!a.top && b.top) {
    return 1;
  }
  return compareDate(a, b);
};

/**
 * 获取所有文章，读取其内容并解析 front matter
 * @returns {Promise<Object[]>} - 文章对象数组
 */
export const getAllPosts = async () => {
  try {
    // 获取所有 Markdown 文件的路径
    let paths = await getPostMDFilePathsFromBackend();
    // 读取和处理每个 Markdown 文件的内容
    let posts = await Promise.all(
      paths.map(async (item) => {
        try {
          // 读取文件内容
          // const content = await fs.readFile(item, "utf-8");
          // // 文件的元数据
          // const stat = await fs.stat(item);
          // // 获取文件创建时间和最后修改时间
          // const { birthtimeMs, mtimeMs } = stat;

          // 从后端获取文章路径
          const content = await fetchMarkdownFile(item);
          
          // 解析 front matter
          const { data, content : markdownContent} = matter(content);
          const { title, date, categories, description, tags, top, cover } = data;
          // 计算文章的过期天数
          const expired = Math.floor(
            (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
          );
          const fileNameWithoutExtId = item.split('/').pop().replace('.md', '');
          
          const articleUrlName = item.split("http://localhost:8080/")[1];
          const  id =  generateId(articleUrlName);
          // 返回文章对象
          return {
            id: fileNameWithoutExtId,
            title: title || "未命名文章",
            date: date ? new Date(date).getTime() : birthtimeMs,
            lastModified: date,
            expired,
            tags,
            categories,
            description,
            content: markdownContent,
            // regularPath: `/${item.replace(".md", ".html")}`,
            regularPath: `/article/${fileNameWithoutExtId}`,
            top,
            cover,
          };
        } catch (error) {
          console.error(`处理文章文件 '${item}' 时出错:`, error);
          throw error;
        }
      }),
    );
    // 根据日期排序文章
    posts.sort(comparePostPriority);
    return posts;
  } catch (error) {
    console.error("获取所有文章时出错:", error);
    throw error;
  }
};

/**
 * 获取所有标签及其相关文章的统计信息
 * @param {Object[]} postData - 包含文章信息的数组
 * @returns {Object} - 包含标签统计信息的对象
 */
export const getAllType = (postData) => {
  const tagData = {};
  // 遍历数据
  postData.map((item) => {
    // 检查是否有 tags 属性
    if (!item.tags || item.tags.length === 0) return;
    // 处理标签
    if (typeof item.tags === "string") {
      // 以逗号分隔
      item.tags = item.tags.split(",");
    }
    // 遍历文章的每个标签
    item.tags.forEach((tag) => {
      // 初始化标签的统计信息，如果不存在
      if (!tagData[tag]) {
        tagData[tag] = {
          count: 1,
          articles: [item],
        };
      } else {
        // 如果标签已存在，则增加计数和记录所属文章
        tagData[tag].count++;
        tagData[tag].articles.push(item);
      }
    });
  });
  return tagData;
};

/**
 * 获取所有分类及其相关文章的统计信息
 * @param {Object[]} postData - 包含文章信息的数组
 * @returns {Object} - 包含标签统计信息的对象
 */
export const getAllCategories = (postData) => {
  const catData = {};
  // 遍历数据
  postData.map((item) => {
    if (!item.categories || item.categories.length === 0) return;
    // 处理标签
    if (typeof item.categories === "string") {
      // 以逗号分隔
      item.categories = item.categories.split(",");
    }
    // 遍历文章的每个标签
    item.categories.forEach((tag) => {
      // 初始化标签的统计信息，如果不存在
      if (!catData[tag]) {
        catData[tag] = {
          count: 1,
          articles: [item],
        };
      } else {
        // 如果标签已存在，则增加计数和记录所属文章
        catData[tag].count++;
        catData[tag].articles.push(item);
      }
    });
  });
  return catData;
};

/**
 * 获取所有年份及其相关文章的统计信息
 * @param {Object[]} postData - 包含文章信息的数组
 * @returns {Object} - 包含归档统计信息的对象
 */
export const getAllArchives = (postData) => {
  const archiveData = {};
  // 遍历数据
  postData.forEach((item) => {
    // 检查是否有 date 属性
    if (item.date) {
      // 将时间戳转换为日期对象
      const date = new Date(item.date);
      // 获取年份
      const year = date.getFullYear().toString();
      // 初始化该年份的统计信息，如果不存在
      if (!archiveData[year]) {
        archiveData[year] = {
          count: 1,
          articles: [item],
        };
      } else {
        // 如果年份已存在，则增加计数和记录所属文章
        archiveData[year].count++;
        archiveData[year].articles.push(item);
      }
    }
  });
  // 提取年份并按降序排序
  const sortedYears = Object.keys(archiveData).sort((a, b) => parseInt(b) - parseInt(a));
  return { data: archiveData, year: sortedYears };
};
