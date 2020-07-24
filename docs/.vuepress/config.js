module.exports = {
  title: "Chrome 插件开发中文文档",
  description: "Just playing around",
  displayAllHeaders: true,
  themeConfig: {
    nav: [{ text: "什么是插件？", link: "/what-are-extension" }],
    sidebar: [
      // "/what_are_extension",
      { title: "什么是插件？", path: "/what-are-extension/" },
      { title: "第一步", path: "/get-started-tutorial/" },
      {
        title: "概述",
        path: "/overview/",
        collaspse: true,
        children: [
          {
            title: "Manifest 格式",
            path: "/overview/manifest-format/"
          },
          {
            title: "管理事件",
            path: "/overview/manifest-format/"
          },
          {
            title: "设计用户界面",
            path: "/overview/manifest-format/"
          },
          {
            title: "内容脚本",
            path: "/overview/manifest-format/"
          },
          {
            title: "权限与警告",
            path: "/overview/manifest-format/"
          },
          {
            title: "用户选项",
            path: "/overview/manifest-format/"
          }
        ]
      },
      {
        title: "开发者指南",
        path: "/developer-guide/",
        collaspse: true,
        children: [
          {
            title: "精进性能",
            path: "/developer-guide/reach-peak-performance/"
          },
          {
            title: "保护用户隐私",
            path: "/developer-guide/protect-user-privacy/"
          },
          { title: "安全性", path: "/developer-guide/stay-secure/" },
          { title: "调试", path: "/developer-guide/debugging/" },
          { title: "OAuth", path: "/developer-guide/oauth/" },
          { title: "可访问性", path: "/developer-guide/accessbility/" },
          {
            title: "内容安全策略",
            path: "/developer-guide/content-security-policy/"
          },
          { title: "跨域XHR", path: "/developer-guide/corss-origin-xhr/" },
          { title: "国际化", path: "/developer-guide/internationalization/" },
          { title: "消息传递", path: "/developer-guide/message-passing/" },
          { title: "原生消息传递", path: "/developer-guide/native-messaging/" },
          { title: "匹配模式", path: "/developer-guide/match-patterns/" },
          {
            title: "插件质量指南和FAQ",
            path: "/developer-guide/extension-quality-guidlines-faq/"
          }
        ]
      }
      // { title: "Guide", path: "/guide/" },
      // { title: "External", path: "https://google.com" },
    ]
  }
};
