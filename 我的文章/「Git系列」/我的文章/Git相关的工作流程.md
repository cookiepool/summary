# Git flow工作流程
Git flow主要是建立在分支上面，根据不同的分支我们区分出不同的功能。

## 主要的分支
### Master分支
master分支上存放的是最稳定的正式版的代码，并且该分支的代码应该是随时可在开发环境中使用的代码（Production Ready state）。

> 命名：master

### Develop分支
develop分支是保存当前最新版本开发成果的分支。

> 命名：develop

### Feature分支
Feature分支通常叫做功能分支，也可以叫做个人分支，一般命名为 feature/XXXX,该分支就是每一个开发人员进行开发的分支，比如做一些功能、需求之类的东西，这个分支上的代码变更最终合并回develop分支或者干脆被抛弃掉（例如实验性且效果不好的代码变更）。

> 命名：feature通常是从develope上拉取 所有通常用 dev_功能描述_英文名 来命名。比如 feature/dev_refresh_molierzhang

### Release分支
Release分支通常叫做发布分支，也可以叫做测试-发布分支，一般命名为 Release/1.2.3（后面是版本号）,该分支是为测试-发布新的产品版本而开辟的。

> 命名：release/1.2.3 后面跟对应的版本号

### Hotfix
Hotfix叫热修复分支，除了是计划外创建的以外，hotfix分支与release分支十分相似，当已经发布的版本（Master上代码）遇到了异常情况或者发现了严重到必须立即修复的软件缺陷的时候，就需要从master分支上指定的tag版本拉取hotfix分支来组织代码的紧急修复工作。

> 命名：Hotfix/1.2.3 后面跟对应的版本号

- 流程图
![](https://imgkr.cn-bj.ufileos.com/8bb22466-eb83-4834-8372-ed0d7b692dfc.png)

## 使用Git flow工作流会用到的一些git命令
- 当你在本地建立了一个新的分支（比如说develop分支），然后你想将这个分支推送到远端仓库，你需要这样。

因为远端仓库没有我们新建的分支信息，我们需要执行以下命令来设置upstream
```
git push --set--upstream origin develop
```

- 你可以建立分支的时候指定分支
```
git checkout -b hotfix/1.0.1 master
```
比如上面的命令，我如果当前在dev分支下，但是我想建立基于master的分支，想上面那样操作就可以了。

- 你可以在当前的分支下去推送另外分支的代码到远程仓库
一般情况下，在当前的哪个分支就只能推送当前分支到远程仓库，一般我们使用`git push`这个命令。如果我们想推送其他分支信息，那我们可以指定

```
git push origin develop
```
上面的命令，即使我们在master分支也可以推送develop的commit代码到远程仓库

# Github flow工作流程
.........待续..........

# 参考资料
[GitFlow流程](https://www.jianshu.com/p/4948dc76c52c)

[Gitflow工作流程](https://www.cnblogs.com/jeffery-zou/p/10280167.html)

[团队协作中的 Github flow 工作流程](https://zhuanlan.zhihu.com/p/39148914)

[Git分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)

[Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)