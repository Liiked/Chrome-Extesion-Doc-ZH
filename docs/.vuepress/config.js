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
      }
      // { title: "Guide", path: "/guide/" },
      // { title: "External", path: "https://google.com" },
    ]
  }
};
