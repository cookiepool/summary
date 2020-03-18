# 简介
最近在学习React，这过程中遇到过许多不明白的地方，因此总结出来分享给大家。了解了这些知识后学习React更加容易上手。

下面的各种概念我都没有写得很深入，只是给大家一个引子，方便大家在学习的过程中更加体系化，我相信这些都是大家在学习React的时候必定会去了解的知识。

每个概念我都附上了我查找学习过程参考的文章，感谢这些大佬的分享。

# 相关知识
## 1、为什么要引入 React
## 2、为什么要用 className 而不用 class
## 3、为什么属性要用小驼峰
## 4、为什么 constructor 里要调用 super 和传递 props
## 5、为什么组件用大写开头
## 6、为什么调用方法要 bind this
## 7、为什么要 setState，而不是直接 this.state.xx = oo
## 8、setState 是同步还是异步相关问题

**以上8点是学习React必定绕不过的，因为社区的`@桃翁`大佬已经总结了，这里不再赘述。同时感谢大佬解惑，让我在学习的时候少走了许多弯路。下面附上原作者的地址。**

[新手学习 react 迷惑的点(一)](https://juejin.im/post/5d6be5c95188255aee7aa4e0)

[新手学习 react 迷惑的点(二)](https://juejin.im/post/5d6f127bf265da03cf7aab6d)

## 9、为什么我下载了react的包还要下载react-dom这个包
react在v0.14之前是没有“搞分离”的，所有东西都在react里面。但是后来fb搞出了react-native，所以这之后分离了出来，react包含了Web和Mobile的核心部分，负责DOM部分的分在了react-dom里面，Mobile部分就分在了react-native里面。所以我们在Web开发时除了安装引入react以外还要安装引入react-dom。同理在react-router里面也细分出了react-router-dom和react-router-native。

### 参考资料

[为什么react和react-dom要分成两个包？](https://www.zhihu.com/question/336664883)

## 10、为什么React的生命周期钩子函数有那么多版本
React在几个版本里面迭代过几次钩子函数，这里我先贴几张图。

- 16.3之前

![](https://imgkr.cn-bj.ufileos.com/e8923bb7-b3ad-4d02-a5a5-8fed1c65dad8.png) 

- 仅16.3

![](https://imgkr.cn-bj.ufileos.com/68ae4927-8e40-4ab3-aeb5-b4ef844677a2.png)

- 16.4及以后

![](https://imgkr.cn-bj.ufileos.com/33a501dc-ef7f-42b1-ad69-9cae3d1271d9.png)

我估计目前大多数人用的React版本应该都是16.4及以后的了，所以我们关注16.4版本后的生命周期钩子函数。

这里总结下，目前移除的钩子函数有：
- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

然后新版本里面包括新增的钩子函数完整如下：
- static getDerivedStateFromProps
- getSnapshotBeforeUpdate
- shouldComponentUpdate
- componentDidMount
- componentDidUpdate
- componentWillUnmount

### 参考资料

[React v16.3之后的组件生命周期函数](https://zhuanlan.zhihu.com/p/38030418)

[我对 React v16.4 生命周期的理解](https://juejin.im/post/5b6f1800f265da282d45a79a)

## 11、React可以创建哪些类型的组件
这个我目前还在摸索学习当中，目前我了解到的有这些

#### 1、类组件
使用ES6的class声明创建，ES5使用的React.createClass方法（这个方法不再介绍）。
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <p>This is a react component</p>
      </div>
    )
  }
}
```
#### 函数式组件（无状态组件）
使用声明函数的方式来创建组件。
```
import React from 'react';

export default function FuncComponentTest(props) {
  return (
    <div>
      <p>这是函数式组件</p>
      <p>{ props.name }</p>
    </div>
  )
}
```
特点：

1、优点
无需实例化，无生命周期，只负责渲染，性能更好。如果你的组件没有涉及到内部状态，只是用来渲染数据，那么就用函数式组件，性能较好。

2、缺点
上面的优点相应就会带来缺点
没有实例化，无法使用ref；没有生命周期方法；shouldComponentUpdate方法没有，重复渲染都没法避免。

#### PureComponent（纯组件）
React v15.3.0中新增的一个特性。

PureReactComponent 组件和 ReactComponent 组件的区别就是它在 shouldComponentUpdate 中会默认判断新旧属性和状态是否相等，如果没有改变则返回 `false`，因此它得以减少组件的重渲染。

因此相比于 Component ，PureComponent 有性能上的更大提升：

> 减少了组件无意义的重渲染（当 state 和 props 没有发生变化时），当结合 immutable 数据时其优更为明显；隔离了父组件与子组件的> 状态变化；

```
import React from 'react';

class PureComponentTest extends React.PureComponent {
  render() {
    return (
      <div>
        <p>这是纯组件</p>
      </div>
    )
  }
}

export default PureComponentTest;
```

#### 高阶组件
研究中......

### 参考资料

[React 中的各种组件](https://zhuanlan.zhihu.com/p/30659051)
[React PureComponent 使用指南](https://wulv.site/2017-05-31/react-purecomponent.html)
[React 的性能优化（一）当 PureComponent 遇上 ImmutableJS](https://juejin.im/post/59cdaaccf265da066f6ac83b)
[【react总结（一）】:一次性彻底弄懂组件（函数式组件、PureComponent、React.memo、高阶组件）](https://juejin.im/post/5d118039e51d4556db694a40)
[React 中的五种组件形式](https://juejin.im/post/596d65d66fb9a06bae1e19e2)
[【DailyENJS第7期】掌握 React 函数式组件](https://juejin.im/post/5d46f1eb6fb9a06b122f2087)
[React（二）：类组件、函数式组件](https://juejin.im/post/5c0dfa265188257a5a2514d6)

## 12、怎么进行React的路由管理
使用React开发单页面项目肯定是要用到路由，目前主要是使用react-router，我在查阅的时候有替代方案，叫`@reach/router`,[链接](https://github.com/reach/router)，react-router不像Vue的路由可以进行集中管理，有时候用起来十分分散。

### 参考资料
[React Router Config（React 集中配置式路由）](https://blog.csdn.net/roamingcode/article/details/95235079)

[react-router-dom实现全局路由登陆拦截](https://www.cnblogs.com/kdcg/p/9309600.html)

[在react中如何设置路由](https://www.html.cn/qa/react/14256.html)

[官方教程](https://reacttraining.com/react-router/web/)

[React-Router动态路由设计最佳实践](https://segmentfault.com/a/1190000011765141)