## 简介
lottie动画时爱彼迎出品的动画工具，支持android\ios\web。

github: https://github.com/airbnb/lottie-web
社区动画：https://lottiefiles.com/
web文档地址：http://airbnb.io/lottie/#/web

## 在Vue上面使用
安装好lottie-web的包
```
npm install lottie-web
```
首先在页面引入lottie-web的动画方法和动画json文件
```
// 举例
import lottie from "lottie-web";
import loadingAnima from "../assets/loading.json";
```
创建动画
```
let anima = lottie.loadAnimation({
  // path: "https://assets9.lottiefiles.com/packages/lf20_4VI5RF.json",
  animationData: loadingAnima,
  container: this.$refs.lottieAnima,
  renderer: "svg",
  loop: false,
  autoplay: true
});
```
上面的path和animationData任选一个，如果你的动画文件在线上，那就选path，如果你的动画文件在本地，就选animationData。

其他的参数详见官方文档，比如事件监听、操作动画的函数等。

web文档地址：http://airbnb.io/lottie/#/web