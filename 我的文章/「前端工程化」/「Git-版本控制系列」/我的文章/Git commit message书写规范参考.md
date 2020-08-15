# 一、简介
commit message，也就是我们在向仓库提交代码的时候写得一句话，比如：`git commit -m '提交新内容'`，理论上-m后面你可以写任何你想要的内容，但是为了让别人知道你这次操作做了什么，还是需要规范一下内容，让别人看了提交信息大概知道你干了什么事情，这儿主要参考了阮一峰老师的[教程](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)，教程里面主要是参考了Angular规范。
# 二、开始
这里先看看message的大致样子：
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
关于各个参数的意义：
## 1、type，scope（可选），subject。
**type**主要是说明commit的类型，目前符合ng规范的有如下几个：
> - feat: 表示新特性
> - fix: 表示修改问题
> - refactor: 表示重构（即不是新增功能，也不是修改bug的代码变动）
> - style: 表示修改代码样式，不影响功能。（不是说css）
> - docs: 表示文档修改
> - test: 表示测试
> - chore: 表示构建过程或辅助工具的变动（比如构建流程, 依赖管理）
---
**scope**是可选参数，表示commit 影响的范围, 比如: route, component, utils, build等等。
**subject**表示commit 目的的简短描述，不超过50个字符。要求：
> - 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
> - 第一个字母小写
> - 结尾不加句号（.）
**body**表示commit 具体修改内容, 可以分为多行。
**footer**表示一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接。
- 注意：这儿在写commit的时候要求换行，记住在写commit的时候不要把引号直接成对写完了，否则敲回车并不会换行，应该先打一个引号写完所有内容后再闭合引号，然后回车就可以了！
## 2、使用工具来规范你的commit
- 这儿关于配置也可以去官网看看[commitizen/cz-cli](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)

首先我们需要安装两个东西，一个是commitizen/cz-cli，这个是主要工具，我们还需要一个适配器cz-conventional-changelog，这个适配器符合angular规范。
- 全局安装
```
npm install -g commitizen cz-conventional-changelog
```
 全局模式下, 需要 ~/.czrc 配置文件, 为 commitizen 指定 Adapter。首先你需要在用户文件夹下见一个`.czrc`的文件（用户文件夹一般砸`C:\Users\你的用户名`），打开git bash，使用命令`touch .czrc`来建立一个文件，然后在目录下打开cmd，执行以下命令：
```
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```
之后你再你的项目目录下使用git cz命令来代替git commit命令了
- 项目局部安装
```
npm install -D commitizen cz-conventional-changelog
```
然后需要在项目package.json中配置一下
```
"script": {
    ...,
    "commit": "git-cz",
},
"config": {
   "commitizen": {
     "path": "node_modules/cz-conventional-changelog"
   }
}
```
这里我测试了全局安装的效果，（这个地方我测试发现git bash不能使用上下箭头来选择选项，只有cmd运行才行-_-）如下图所示：

![演示-2](https://imgkr.cn-bj.ufileos.com/8f10cc17-7b4c-480f-b9f7-808b056f48e2.png)


当然你如果觉得angular的配置不符合自己或者团队的习惯，还可以自定义，这里不再赘述，大家可以参考这篇文章：

[优雅的提交你的 Git Commit Message](https://juejin.im/post/5afc5242f265da0b7f44bee4)
[Git commit message 规范](https://juejin.im/post/5d0b3f8c6fb9a07ec07fc5d0)
