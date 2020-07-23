# 概述

插件是打包压缩的HTML、CSS、JavaScript、图片和其他web平台技术文件，它加强了Google Chrome浏览器的交互体验。由于插件基于Web技术，因此所有开放给Web使用的APIs也同样适用于插件开发。

插件涵盖了非常广的功能，它涵盖了修改用户内容、交互方式或者扩展浏览器本身的能力。

## 插件文件

插件有各种各样的文件和大量目录，但是这一切都依靠 **[manifest]()** 支撑。即使是一些基础但非常有用的插件也有可能只是使用了manifest文件和一些工具栏图标。

manifest文件真正的文件名是`manifest.json`，是它将插件的各类信息提供给浏览器，它声明了插件可能用到的大部分文件和能力。

``` json
{
  "name": "My Extension",
  "version": "2.1",
  "description": "Gets information from Google.",
  "icons": {
    "128": "icon_16.png",
    "128": "icon_32.png",
    "128": "icon_48.png",
    "128": "icon_128.png"
  },
  "background": {
    "persistent": false,
    "scripts": ["background_script.js"]
  },
  "permissions": ["https://*.google.com/", "activeTab"],
  "browser_action": {
    "default_icon": "icon_16.png",
    "default_popup": "popup.html"
  }
}
```

插件必须有一个展示在浏览器工具栏的图标。工具栏图标易于发现使用，也能让用户知道自己安装了些什么插件。大部分用户和插件交互都是点击图标后弹出的浮层完成的。


| ![browser_arrow](https://developer.chrome.com/static/images/overview/browser_arrow.png) | ![mappy](https://developer.chrome.com/static/images/overview/mappy.png) |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| This [Google Mail Checker extension]() uses a [browser action]().                       | This [Mappy extension]() uses a [page action]() and [content script](). |
|                                                                                         |

### 引用文件

插件文件可以使用相对URL路径，就像在常见的HTML文件中一样。

```html
<img src="images/my_image.png">
```

另外，文件也可通过绝对路径引用。

```
chrome-extension://<extensionID>/<pathToFile>
```

在绝对路径中，`<extensionID>`是唯一标识，这是插件系统为每个插件生成的独一无二的ID。这个ID可以通过前往URL **chrome://extensions** 中查看。`<pathToFile>`则是插件顶层目录的位置，它使用的是相对路径。

当开发未打包的插件时，插件ID是可以修改的。另外，未打包的插件如果从不同的目录中加载，那么ID也会随之改变；而插件打包后，ID还会再次变动。如果插件的代码依赖于绝对路径，则可使用
[**chrome.runtime.getURL()**]()方法获取运行时路径。

## 结构

插件的结构依赖于它的功能，但是健壮的插件则需要包含以下多种组件：

- [Manifest]()
- [后台脚本]()
- [UI元素]()
- [内容脚本]()
- [选项页面]()

### 后台脚本

[**后台脚本**]()是插件的事件处理程序；它含有处理浏览器重要事件的监听器。当有事件触发时，它才开始活动，一个高效后台脚本应该只在用到的时候加载，空闲的时候卸载（监听）。

### UI元素

[**插件的交互界面**]()应该聚焦目标且精简。交互界面应该加强定制化的浏览器体验而不是搞得更混乱。大部分插件都涉及到 [**browser action**]() 或者 [**page action**]()，不过也包含了其他形式的交互，如 [**菜单**]()，使用 [**omnibox**]，以及快捷键。

插件UI页面如 [**弹出框**]，可以包含一个有JavaScript逻辑的HTML页面。插件也可以调用 [**tabs.create**]() 或者 `window.open()` 展示其他页面。

包含页面行为和弹出层的插件可以使用 [**declarative content**]() API设置什么时候展示弹出层的后台脚本。当条件达成时，后台脚本会于弹出层通信使页面恢复交互。

![popuparc](https://developer.chrome.com/static/images/overview/popuparc.png)

### 内容脚本

插件可以使用 [**内容脚本**]() 读写网页。内容脚本包含的JavaScript可以在浏览器已经加载的页面中执行，还可以修改DOM。

![contentscriptarc](https://developer.chrome.com/static/images/overview/contentscriptarc.png)

内容脚本可以与插件通过 [**messages**]() 通信，用 [**storage**]()储存数据。

![messagingarc](https://developer.chrome.com/static/images/overview/messagingarc.png)

### 选项页面

就像插件允许用户自定义Chrome浏览器一样，[**选项页面**]() 则是插件的自定义入口，选项可以给用户自由开关他们需要的功能。

## 使用Chrome APIs

为了获取普通页面API的访问权限，插件也可以使用和浏览器紧密结合的 [插件规格APIs]()，这样插件就可以像网页一样使用标准的 `window.open()`方法来打开URL，不过插件可以使用 [**tabs.query**]() API 指定从哪个具体窗口打开这个URL。

### 异步方法 vs. 同步方法

大部分 Chrome API 是同步的：函数会立即返回而不必等待它们执行完成。如果插件需要一个异步操作的返回值，你可以传递一个回调进去。回调会在函数返回后延迟一会、也可能更久才执行。

如果插件需要将用户从当前标签页导航到一个新的URL上，它需要获取当前标签的ID然后更新标签地址为新的URL地址。

如果 [**tabs.query**]() 方法是同步的，那么看起来应该是这样：

```js
// 代码实际无法工作！
var tab = chrome.tabs.query({'active': true}); // 错误!!!
chrome.tabs.update(tab.id, {url:newUrl});
someOtherFunction();
```

上面这段代码之所以失败是因为 `query()` 方法是异步的。他不会等待结果执行完成才返回，实际上它并没有返回任何值。如果一个方法是异步的，那么他的函数签名中可以看到回调参数：

```ts
// 异步方法的回调参数签名
chrome.tabs.query(queryInfo: object, callback: function)
```

想要获取一个标签页并更新他的URL，插件必须使用回调参数

```js
// 这段代码就可以执行地棒棒哒
chrome.tabs.query({'active': true}, function(tabs) {
  chrome.tabs.update(tabs[0].id, {url: newUrl});
});
someOtherFunction();
```

在上述代码中，代码按照这个顺序执行：1, 4, 2。第二行回调函数在 `query()` 调用完成之后才执行，而且只在当前选中的标签页更新。这些事情都发生在 `query()` 返回之后，虽然 `update()` 是异步的，但是并不需要回调函数，因为插件不会在页面更新之后做别的事。

```ts
// 同步方法没有回调选项，在下面的例子中，会立即返回一个字符串
chrome.runtime.getURL(): string
```

这个同步方法返回一个字符串类型的URL，当然也没有其他异步的事情要处理。

### **更多细节**

想要了解其中的更多内容，请查看 [Chrome API 参考文档]()，看看下面的视频

![]()

## 页面间通信
插件中不同的组件需要彼此通信的需求是很常见的。通过使用 [**chrome.extension**]()方法，如：`getViews()` 和 `getBackgroundPage()`等，不同的HTML页面就可以发现彼此。如果一个页面需要使用其他插件页面，前者可以调用后者暴露出来的函数操作后者的DOM。另外，插件的所有组件都可以通过 [**storage**]() API获取储存的值，也可以通过 [**消息传递**]() 与彼此通信。

## 数据存储和隐身模式

插件可以通过 [**storage**]() API 储存数据——也就是 HTML5的 [**web stroage API**]()，或者向服务器获取数据。当插件需要储存功能时，首先需要考虑当前是否在隐身模式中。通常情况下，隐身模式不会启动插件。

*隐身模式*需要保证窗口不留任何踪迹。处理隐身模式的数据时，插件需要遵从这项保证。如果一个插件需要向浏览器历史中存储数据，那么在隐身模式中就不应该这么做。不过，插件依旧可以在这种情况下保存用户配置。

你可以使用 [**tabs.Tab**]() 或 [**windows.Window**]()对象 中的 `incognito` 属性检查当前窗口是否处于隐身模式。

```js
function saveTabData(tab) {
  if (tab.incognito) {
    return;
  } else {
    chrome.storage.local.set({data: tab.url});
  }
}
```

## 下一步

在阅读了本节以及 [**第一步**]() 教程之后，你应该有足够的基础开发一款插件了！想要更深入地理解自定义Chrome的世界，可以查看下面的资源：

- 在[**调试教程**]()中学习有关插件调试的内容。
- [chrome.*APIs 文档]()：Chrome插件拥有非常强大的API远超常规的web访问能力，在这个文档里你能看到所有API。
- [开发者指南]()：包含大量文档和进阶插件教程链接