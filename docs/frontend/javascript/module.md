# 模块化

模块(Module)：一块具有独立功能的代码，可以是一个函数、一个对象、甚至一个字符串或数字，通常存储为一个单独的 JS 文件。

## 概述

过去，JS 很难编写大型应用，因为有以下两个问题：

1. **全局变量污染**
2. **难以管理的依赖关系**

这些问题，都导致了 JS 无法进行精细的模块划分，因为精细的模块划分会导致更多的全局污染以及更加复杂的依赖关系

于是，先后出现了两大模块化标准，用于解决以上两个问题：

- **CommonJS**
- **ES6 Module**

> 注意：上面提到的两个均是模块化**标准**，具体的实现需要依托于 JS 的执行环境

## CommonJS

### node

目前，只有 node 环境才支持 CommonJS 模块化标准，所以，要使用 CommonJS，必须要先安装 node

官网地址：<https://nodejs.org/zh-cn/>

浏览器运行的是 html 页面，并加载页面中通过 script 元素引入的 js

![image](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/sjxh/assets3/2019-12-02-10-57-23.png)

nodejs 直接运行某个 js 文件，该文件被称之为入口文件

![image](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/sjxh/assets3/2019-12-02-10-59-43.png)

nodejs 遵循 EcmaScript 标准，但由于脱离了浏览器环境，因此：

1. 你可以在 nodejs 中使用 EcmaScript 标准的任何语法或 api，例如：循环、判断、数组、对象等
2. 你不能在 nodejs 中使用浏览器的 web api，例如：dom 对象、window 对象、document 对象等

### CommonJS 标准和使用

node 中的所有代码均在 CommonJS 规范下运行

具体规范如下：

1. 一个 JS 文件即为一个模块
2. 如果一个模块需要暴露一些数据或功能供其他模块使用，需要使用代码`module.exports = xxx`，该过程称之为模块的**导出**
3. 如果一个模块需要使用另一个模块导出的内容，需要使用代码`require("模块路径")`
    1. 路径必须以./或../开头
    2. 如果模块文件后缀名为.js，可以省略后缀名
    3. require 函数返回的是模块导出的内容
4. 模块中的所有全局代码产生的变量、函数，均不会对全局造成任何污染，仅在模块内使用
5. 模块具有缓存，第一次导入模块时会缓存模块的导出，之后再导入同一个模块，直接使用之前缓存的结果。

有了 CommonJS 模块化，代码就会形成下面的结构：

![image](https://cdn.jsdelivr.net/gh/qiuxchao/CDN/sjxh/assets3/2019-12-02-11-15-01.png)

同时也解决了 JS 的两个问题

**原理**

node 实际上是将模块文件中的代码放置到一个函数环境中执行

当调用`require`函数时，它会按照以下的步骤处理：

```js
// require函数的原理

function require(modulePath) {
 //1. 获取模块的绝对路径
 var moduleId = abs(modulePath)
 //2. 查看模块是否缓存过
 if (cache[moduleId]) {
  return cache[moduleId]
 }
 //3. 执行模块，得到执行结果
 var module = {
  exports: {}
 }
 function _moduleExcutor(module, exports) {
  // 这里是你模块中的代码
 }
 _moduleExcutor.call(module.exports, module, module.exports)
 //4. 缓存模块
 cache[moduleId] = module.exports
 //5. 返回结果
 return module.exports
}
```

## ES6 module

由于种种原因，CommonJS 标准难以在浏览器中实现，因此一直在浏览器端一直没有合适的模块化标准，直到 ES6 标准出现

ES6 规范了浏览器的模块化标准，一经发布，各大浏览器厂商纷纷在自己的浏览器中实现了该规范

### 模块的引入

浏览器使用以下方式引入一个 ES6 模块文件

```html
<script src="入口文件" type="module">
```

### 标准和使用

1. 模块的导出分为两种，**基本导出**和**默认导出**

可以将整个模块的导出想象成一个对象，**基本导出**导出的是该对象的某个属性，**默认导出**导出的是该对象的特殊属性`default`

```js
//导出结果：想象成一个对象
{
    a: xxx, //基本导出
    b: xxx, //基本导出
    default: xxx, //默认导出
    c: xxx //基本导出
}
```

可以看出：

1. 基本导出可以有多个，默认导出只能有一个
2. 基本导出必须要有名字，默认导出由于有特殊名字，所以可以不用写名字

导出方式：

```js
export var a = 1 //基本导出 a = 1
export var b = function(){} //基本导出 b = function(){}
export function method(){}  //基本导出 method = function(){}
var c = 3;
export {c} //基本导出 c = 3
export { c as temp } //基本导出 temp = 3

export default 3 //默认导出 default = 3
export default function(){} //默认导出 default = function(){}
export { c as default } //默认导出 default = 3

export {a, b, c as default} //基本导出 a=1, b=function(){}, 默认导出 default = 3
```

2. **模块的导入**

使用以下的代码导入模块

```js
import { a, b } from '模块路径' //导入属性 a、b，放到变量a、b中
import { a as temp1, b as temp2 } from '模块路径' //导入属性a、b，放到变量temp1、temp2 中
import { default as a } from '模块路径' //导入属性default，放入变量a中，default是关键字，不能作为变量名，必须定义别名
import { default as a, b } from '模块路径' //导入属性default、b，放入变量a、b中
import c from '模块路径' //相当于 import {default as c} from "模块路径"
import c, { a, b } from '模块路径' //相当于 import {default as c, a, b} from "模块路径"
import * as obj from '模块路径' //将模块对象放入到变量obj中
import '模块路径' //不导入任何内容，仅执行一次模块
```

导入模块时，注意以下细节

1). ES6 module 采用依赖预加载模式，所有模块导入代码均会提升到代码顶部<br>
2). 不能将导入代码放置到判断、循环中<br>
3). 导入的内容放置到**常量**中，不可更改<br>
4). ES6 module 使用了缓存，保证每个模块仅加载一次

### 重新导出

“重新导出（Re-export）”语法 `export ... from ...` 允许导入内容，并立即将其导出（可能是用的是其他的名字），就像这样：

```js
export {sayHi} from './say.js'; // 重新导出 sayHi

export {default as User} from './user.js'; // 重新导出 default
```

为什么要这样做？我们看一个实际开发中的用例。

想象一下，我们正在编写一个 “package”：一个包含大量模块的文件夹，其中一些功能是导出到外部的（像 NPM 这样的工具允许我们发布和分发这样的 package，但我们不是必须要去使用它们），并且其中一些模块仅仅是供其他 package 中的模块内部使用的 “helpers”。

文件结构可能是这样的：

```
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

我们希望通过单个入口暴露包的功能。

换句话说，想要使用我们的包的人，应该只从“主文件” `auth/index.js` 导入。

像这样：

```js
import {login, logout} from 'auth/index.js'
```

“主文件”，`auth/index.js` 导出了我们希望在包中提供的所有功能。

这样做是因为，其他使用我们包的开发者不应该干预其内部结构，不应该搜索我们包的文件夹中的文件。我们只在 `auth/index.js` 中导出必要的部分，并保持其他内容“不可见”。

由于实际导出的功能分散在 package 中，所以我们可以将它们导入到 `auth/index.js`，然后再从中导出它们：

```js
// 📁 auth/index.js

// 导入 login/logout 然后立即导出它们
import {login, logout} from './helpers.js';
export {login, logout};

// 将默认导出导入为 User，然后导出它
import User from './user.js';
export {User};
...
```

现在使用我们 package 的人可以 `import {login} from "auth/index.js"`。

语法 `export ... from ...` 只是上面这种导入-导出的简写：

```js
// 📁 auth/index.js
// 重新导出 login/logout
export {login, logout} from './helpers.js';

// 将默认导出重新导出为 User
export {default as User} from './user.js';
...
```

`export ... from` 与 `import/export` 相比的显着区别是重新导出的模块在当前文件中不可用。所以在上面的 `auth/index.js` 示例中，我们不能使用重新导出的 `login/logout` 函数。

#### 重新导出默认导出

重新导出时，默认导出需要单独处理。

假设我们有一个 `user.js` 脚本，其中写了 `export default class User`，并且我们想重新导出类 `User`：

```js
// 📁 user.js
export default class User {
  // ...
}
```

我们可能会遇到两个问题：

1. `export User from './user.js'` 无效。这会导致一个语法错误。
    要重新导出默认导出，我们必须明确写出 export {default as User}，就像上面的例子中那样。

2. `export * from './user.js'` 重新导出只导出了命名的导出，但是忽略了默认的导出。
    如果我们想将命名的导出和默认的导出都重新导出，那么需要两条语句：

```js
export * from './user.js'; // 重新导出命名的导出
export {default} from './user.js'; // 重新导出默认的导出
```

重新导出一个默认导出的这种奇怪现象，是某些开发者不喜欢默认导出，而是喜欢命名的导出的原因之一。

### 动态导入

我们在前面章节中介绍的导出和导入语句称为“静态”导入。语法非常简单且严格。

首先，我们不能动态生成 `import` 的任何参数。

模块路径必须是原始类型字符串，不能是函数调用，下面这样的 `import` 行不通：

```js
import ... from getModuleName(); // Error, only from "string" is allowed
```

其次，我们无法根据条件或者在运行时导入：

```js
if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
```

这是因为 `import`/`export` 旨在提供代码结构的主干。这是非常好的事儿，因为这样便于分析代码结构，可以收集模块，可以使用特殊工具将收集的模块打包到一个文件中，可以删除未使用的导出（“tree-shaken”）。这些只有在 `import`/`export` 结构简单且固定的情况下才能够实现。

但是，我们如何才能动态地按需导入模块呢？

#### import() 表达式

`import(module)` 表达式加载模块并返回一个 `promise`，该 `promise` `resolve` 为一个包含其所有导出的模块对象。我们可以在代码中的任意位置调用这个表达式。

我们可以在代码中的任意位置动态地使用它。例如：

```js
let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)
```

或者，如果在异步函数中，我们可以使用 `let module = await import(modulePath)`。

例如，如果我们有以下模块 `say.js`：

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

……那么，可以像下面这样进行动态导入：

```js
let {hi, bye} = await import('./say.js');

hi();
bye();
```

或者，如果 `say.js` 有默认的导出：

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

……那么，为了访问它，我们可以使用模块对象的 `default` 属性：

```js
let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
```

这是一个完整的示例：

:::details index.html
```html
<!doctype html>
<script>
  async function load() {
    let say = await import('./say.js');
    say.hi(); // Hello!
    say.bye(); // Bye!
    say.default(); // Module loaded (export default)!
  }
</script>
<button onclick="load()">Click me</button>
```
:::

:::details say.js
```js
<!doctype html>
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}

export default function() {
  alert("Module loaded (export default)!");
}
:::

::: warning
动态导入在常规脚本中工作时，它们不需要 `script type="module"`.
:::

::: warning
尽管 `import()` 看起来像一个函数调用，但它只是一种特殊语法，只是恰好使用了括号（类似于 `super()`）。

因此，我们不能将 `import` 复制到一个变量中，或者对其使用 `call`/`apply`。因为它不是一个函数。
:::