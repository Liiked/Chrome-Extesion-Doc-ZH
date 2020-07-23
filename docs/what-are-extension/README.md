# 插件是什么

插件是基于HTML、Javascript和CSS技术之上，并以此自义定浏览体验的小型程序。它加强了Chrome的功能和行为更好地满足个人偏好和需求。

通常而言插件是由朝同一目标前进的多个功能组成的，一个插件最好只实现[一个目标]()以便于理解和定义。

提供给用户的界面应精简且专一，这个界面可以从一个展示在右边的小图标（如 [Google Mail Checker extesion]()）到[覆盖]()整个页面那么大。

插件文件会打包到一个`.crx`包中供用户下载和使用，也就是说插件可以不依赖来自网络的任何内容，这点和传统的web应用很不一样。

插件可以通过[Chrome 开发者面板]()分发到[Chrome 应用商店]()。更多信息请看[应用商店开发者文档]()

## Hello Exstensions

通过这个小例子你就可以快速掌握开发插件的基本要点。首先新建一个文件夹存储插件文件，或者你可以从[示例]()中下载下来。

接着，将名为`manifest.json`文件添加到目录里面：

```json
{
  "name": "Hello Extensions",
  "description" : "Base Level Extension",
  "version": "1.0",
  "manifest_version": 2
}
```

每个插件都需要一个`manifest`，虽然大部分插件并不需要真的用到里面的配置。在这个例子中，我们的插件需要一个弹出框文件和图标，所以我们要把他们放在[`browser_action`]()中：

```json {6,7,8,9}
{
    "name": "Hello Extensions",
    "description" : "Base Level Extension",
    "version": "1.0",
    "manifest_version": 2,
    "browser_action": {
      "default_popup": "hello.html",
      "default_icon": "hello_extensions.png"
    }
  }
```

从这里在下载[hello_extensions.png]()图片，然后创建`hello.html`的文件：

```html
<html>
  <body>
    <h1>Hello Extensions</h1>
  </body>
</html>
```

当用户点击图标时，插件就会展示`hello.html`了。下一步，我们给`manifest.json`加一个命令来启动快捷键。这个步骤非常有趣，不过也不是必要的：

```json {10,11,12,13,14,15,16,17,18}
{
  "name": "Hello Extensions",
  "description" : "Base Level Extension",
  "version": "1.0",
  "manifest_version": 2,
  "browser_action": {
    "default_popup": "hello.html",
    "default_icon": "hello_extensions.png"
  },
  "commands": {
    "_execute_browser_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+F",
        "mac": "MacCtrl+Shift+F"
      },
      "description": "Opens hello.html"
    }
  }
}
```

最后一步就是把这个插件安装到你本地了

1. 浏览器地址栏中输入`chrome://extensions`，或者你也可以从Chrome菜单，选中 **更多工具** 然后进入 **扩展程序**
2. 进入之后打开右上角的 **开发者模式**
3. 点击 **加载已解压的扩展程序** 然后找到并选择你的"Hello Extension"插件目录

恭喜！你现在可以使用示例插件了，点击`hello_world.png`小图标，或者按下键盘快捷键 `Ctrl+Shift+F`。

## 下一步

1. 继续学习例子[第一步]()
2. 阅读 [导览]()
3. 查看 [Chromium 博客]() 跟上潮流
4. 订阅 [chromium-extensions 小组]()

## 功能视频（wall预告）

[技术视频]()
[开发者 snapshots]()
