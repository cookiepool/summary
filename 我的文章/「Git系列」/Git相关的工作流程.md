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

# 参考资料
[GitFlow流程](https://www.jianshu.com/p/4948dc76c52c)

[Gitflow工作流程](https://www.cnblogs.com/jeffery-zou/p/10280167.html)

[团队协作中的 Github flow 工作流程](https://zhuanlan.zhihu.com/p/39148914)