# 简介
这里收集一些在学习的react的一些知识点，了解了这些知识后学习react跟容易上手。

# 相关要点
## 为什么我下载了react的包还要下载react-dom这个包
react在v0.14之前是没有“搞分离”的，所有东西都在react里面。但是后来fb搞出了react-native，所以这之后分离了出来，react包含了Web和Mobile的核心部分，负责DOM部分的分在了react-dom里面，Mobile部分就分在了react-native里面。所以我们在Web开发时除了安装引入react以外还要安装引入react-dom。同理在react-router里面也细分出了react-router-dom和react-router-native。

- 参考资料
[为什么react和react-dom要分成两个包？](https://www.zhihu.com/question/336664883)