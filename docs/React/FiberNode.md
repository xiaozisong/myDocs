# React源码
 记录学习React源码的过程，学习React框架的编程思维😄

### Fiber Node
 何为Fiber Node？
 React中组件所**return出来的DOM结构**所形成的**DOM树**中的每一个**子节点**都可以称为一个**fiberNode**
 ```js 
 function App () {
  return (
    // 其中的div和span标签都称为fiberNode
    <div>Hello
      <span>React</span> 
    </div> 
  )
 } 
 ```
 但fiberNode的形式不只是标签，也有可能是一个函数组件
 ```js
 function App () {
  return (
    <div>
      <Son /> {/* 组件 */}
    </div>
  )
 }
 ```
 那react中是如何区分这些fiberNode的呢？我们来看看react中的具体代码实现
 ```js 
export class FiberNode {
	// 标识 function component | class component
	type: any;
	// FunctionComponent 、HostRoot 、 HostComponent 、 HostText、 ContextProvider、 Fragment 等
	tag: WorkTag;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.type = null;
	}
}
 ```
当然真实的fiberNode构造函数显然不止这两个属性，后续的属性会慢慢介绍到，当然除了fiberNode还要引入一个fiberRootNode的概念

### FiberRootNode
什么是FiberRootNode？很简单，FiberRootNode是整个React应用的根节点，也就是React.render()所创建的结果，
它包含了以下属性
```js 
export class FiberRootNode {
	containerInfo: Container; // 当前容器信息
	current: FiberNode; // 指向当前渲染的Fiber节点
	constructor(container: Container, hostRoorFiber: FiberNode) {
		this.container = container;
		this.current = hostRoorFiber;
		hostRoorFiber.stateNode = this;
	}
}
```
这里只展示一部分属性，真实的源码中有大量属性，以后会介绍。
FiberRootNode是一个将当前root节点信息保存在内存中的，而React.render()所创建的是一个真实DOM元素。
这个真实的DOM元素叫做**rootFiber**，它们的连接关系是 rootFiber.stateNode ————> FiberRootNode
FiberRootNode.current ————> rootFiber，从而确定当前整颗应用的Root树
