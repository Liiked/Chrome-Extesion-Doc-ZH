# 第一步

插件是由各式各种的组件组成的，包括：
1. [后台脚本(background script)]()
2. [内容脚本(content script)]()
3. [选项页面]()
4. [UI元素]()

以及其他处理插件逻辑的脚本。

插件的组成部分基于web开发技术：HTML，JavaScript，CSS，每个插件的内部组件所依赖的功能可能并不需要这其中的所有东西。

本节教程也会介绍一个只允许更改 [**developer.chrome.com**]() 页面背景色的例子，其中会使用到Chrome插件非常多核心的功能，并以此向你介绍他们的功能和关系。

在开始之前，你也同样需要新建一个插件目录。或者你可以直接下载 [代码]()

## 创建Manifest

每个插件都需要 [manifest]()。在目录中创建一个名为`manifest.json`的文件，然后填入下面的代码（想偷懒的话可以直接[下载]() ）

```json
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "manifest_version": 2
}
```

添加了`manifest`的插件目录，可以通过开发者模式以最新的代码加载进来。

1. 打开`chrome://extensions`插件管理页面
  - 插件管理页面也可通过菜单中 **更多工具** -> **扩展程序** 打开。
2. 点击右上方的 **开发者模式**
3. 加载已解压的扩展程序，然后选中插件目录

![load_extension](https://developer.chrome.com/static/images/get_started/load_extension.png)

Ta-da！你已经成功安装了插件，因为我们没有在manifest里面添加icon，所以会展示一个原生的图标。

## 添加指令

虽然已经安装了插件，但是并没有任何指令。在插件工作根目录中创建`background.js`文件（或者[从这下载]()）。

包含 **后台脚本** 在内的众多功能都需要预先从manifest中注册才可使用。在manifest中注册后台脚本，写上路径地址以及它的行为方式：

```json {5,6,7,8}
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "manifest_version": 2
}
```

现在插件知道了它应该调用一个非持久化的后台脚本，然后从这个脚本中查找插件需要监听的事件对象。

这个插件安装好之后还需要从持久化的数据中获得一些其他信息。所以我们需要在 **后台脚本** 注册监听事件 [`runtime.onInstalled`]()，在`onInstalled`监听器内部，插件使用 **[storage]()** API设置了一个值，这样一来插件就能获取这个值并更新它了。

```js
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});
```

大部分API，包括 **[stroage]()** API，必须先在manifest的 `"permissions"` 中注册完毕之后才可使用。

```json {5}
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "permissions": ["storage"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "manifest_version": 2
}
```

现在我们回到插件管理页面，点击重新加载按钮，新按钮 **审查视图** 出现了，后面还带着一个链接 **background page**

![view_background](https://developer.chrome.com/static/images/get_started/view_background.png)

点击这个链接查看后台脚本的控制台输出`"The color is green"`

## 使用用户界面

一个插件可以设置非常多的[交互点]()，不过我们这个例子里只用到了[popup]()。在目录中新建一个叫做`popup.html`的文件（[直接下载]()），给我们的插件加上一个按钮来改变背景色。

```html {13}
<!DOCTYPE html>
  <html>
  <head>
    <style>
      button {
        height: 30px;
        width: 30px;
        outline: none;
      }
    </style>
  </head>
  <body>
    <button id="changeColor"></button>
  </body>
</html>
```

就像 **后台脚本** 一样，这个文件也需要在manifest的 `page_action`中注册。

```json {10,11,12}
{
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "permissions": ["storage"],
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "page_action": {
      "default_popup": "popup.html"
    },
    "manifest_version": 2
  }
```

配置工具栏图标的地方在`page_action`的`default_icons`中。你可以从这[下载图片]()，解压这个文件，然后放到插件根目录下。我们还需要更新manifest，这样插件才知道怎么使用这张图片：


```json {12,13,14,15,16,17}
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "permissions": ["storage"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "page_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/get_started16.png",
      "32": "images/get_started32.png",
      "48": "images/get_started48.png",
      "128": "images/get_started128.png"
    }
  },
  "manifest_version": 2
}
```

插件的图标还会展示在插件管理页面，权限警告弹框，以及favicon中。所有这些图片都要在manifest的[`icons`]()中指定

```json {19,20,21,22,23,24}
 {
    "name": "Getting Started Example",
    "version": "1.0",
    "description": "Build an Extension!",
    "permissions": ["storage"],
    "background": {
      "scripts": ["background.js"],
      "persistent": false
    },
    "page_action": {
      "default_popup": "popup.html",
      "default_icon": {
        "16": "images/get_started16.png",
        "32": "images/get_started32.png",
        "48": "images/get_started48.png",
        "128": "images/get_started128.png"
      }
    },
    "icons": {
      "16": "images/get_started16.png",
      "32": "images/get_started32.png",
      "48": "images/get_started48.png",
      "128": "images/get_started128.png"
    },
    "manifest_version": 2
  }
```

目前如果插件被重新加载，它会展示成一个灰色的图标，但是用户还是可以点击交互，这是由于我们虽然已经配置了`page_action`，但是没有告诉浏览器什么时候用户可以与`popup.html`交互导致的。

我们需要在 **后台脚本** 的`runtime.onInstalled` 中使用 `declarativeContent` API：

```js {5,6,7,8,9,10,11,12,13}
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
```

同样，我们也要注册manifest的permission字段

```json {4}
 {
    "name": "Getting Started Example",
    ...
    "permissions": ["declarativeContent", "storage"],
    ...
}
```

现在浏览器会在用户前往包含`"developer.chrome.com"`的URL时，工具栏会展示一个全彩色的页面按钮，当图标是彩色的时候，用户才可以点击查看`popup.html`。

我们这个小节的最后一步就是给按钮添加上颜色，新建一个名为`popup.js`的文件放到插件目录中（[下载文件]()），然后填入下面的代码：

```js
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
```

这个代码会抓取`popup.html`上的按钮，然后获取我们存储的颜色数据，再将这个颜色应用到我们的按钮上。需要将`popup.js` script标签加到 `popup.html`里

```html {5}
<!DOCTYPE html>
<html>
...
  <body>
    <button id="changeColor"></button>
    <script src="popup.js"></script>
  </body>
</html>
```

重新加载插件就可以看到绿色的按钮了

## 页面逻辑

插件现在知道popup需要在 **[developer.chrome.com]()** 才可交互，然后显示一个有颜色的按钮，但是我们的例子还需要更多的用户逻辑。将下列代码拷贝至 `popup.js`:

```js {3,4,5,6,7,8,9,10}
let changeColor = document.getElementById('changeColor');
...
changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};
```

这段代码给按钮添加了一个点击事件，触发一段 **[程序性注入的内容脚本]()**，然后将当前页面的背景色调整为按钮的颜色。程序性注入功能允许用户注入脚本，而不是插入任意的代码到页面上。

manifest需要注册 [`activeTab`]() 权限(permission)，这样插件就暂时获得了 `tabs` API的访问权限。要开启这项功能还需调用`tabs.executeScript`。

```json {4}
{
  "name": "Getting Started Example",
  ...
  "permissions": ["activeTab", "declarativeContent", "storage"],
  ...
}
```

插件终于获得了完整的功能！重载插件，刷新这个页面，打开popup然后点击按钮将页面变绿！

不过用户可能想把页面变成不同的颜色。

## 用户选项

插件目前只支持把页面改成绿色，这对于用户来说太糟糕了。给用户提供一个配置页面不仅加强了用户对于插件的功能控制，更提供了定制化的用户体验。

在插件目录中新建一个 `options.html` 文件（[从这下载]()），然后将下列代码复制进去：

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      button {
        height: 30px;
        width: 30px;
        outline: none;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <div id="buttonDiv">
    </div>
    <div>
      <p>Choose a different background color!</p>
    </div>
  </body>
  <script src="options.js"></script>
</html>
```

然后在manifest中注册页面

```json {4}
{
  "name": "Getting Started Example",
  ...
  "options_page": "options.html",
  ...
  "manifest_version": 2
}
```

重新加载插件，然后点击 **详细信息**

![click_details](https://developer.chrome.com/static/images/get_started/click_details.png)

滚动到详细页面然后选择 **扩展程序选项** 查看选项页面，不过现在它应该是个空页面。

![options](https://developer.chrome.com/static/images/get_started/options.png)

最后一步就是添加逻辑了。在插件目录中新建一个名为 `options.js` 的文件（[从这下载]()），然后将下列代码复制进去

```js 
let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
```

现在我们给添加了4种颜色选项。当用户点击按钮时，插件全局存储的颜色值会更新。

## 下一步

恭喜！现在我们的示例已经实现了极简又完整的功能。

- [Chrome 插件概览]()：介绍了插件结构的大量细节以及一些你需要熟悉的关键概念
- [调试教程]()：学习更多如何调试插件的技巧
- [chrome.*APIs 文档]()：Chrome插件拥有非常强大的API远超常规的web访问能力，在这个文档里你能看到所有API。
- [开发者指南]()：包含大量文档和进阶插件教程链接

