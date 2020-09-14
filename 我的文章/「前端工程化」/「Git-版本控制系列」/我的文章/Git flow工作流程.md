# Git flow工作流程
Git flow主要是建立在分支上面，根据不同的分支我们区分出不同的功能。

![](https://s1.ax1x.com/2020/09/06/weQs4s.png)

## 主要的分支
### Master分支
master分支上存放的是最稳定的正式版的代码，并且该分支的代码应该是随时可在开发环境中使用的代码（Production Ready state）。

> 命名：master

- master分支存放的是随时可供在生产环境中部署的稳定版本代码
- master分支保存官方发布版本历史，release tag标识不同的发布版本
- 一个项目只能有一个master分支
- 仅在发布新的可供部署的代码时才更新master分支上的代码
- 每次更新master，都需对master添加指定格式的tag，用于发布或回滚
- master分支是保护分支，不可直接push到远程仓master分支
- master分支代码只能被release分支或hotfix分支合并

### Develop分支
develop分支是保存当前最新版本开发成果的分支。

> 命名：develop

- develop分支是保存当前最新开发成果的分支
- 一个项目只能有一个develop分支
- develop分支衍生出各个feature分支
- develop分支是保护分支，不可直接push到远程仓库develop分支
- develop分支不能与master分支直接交互

### Feature分支
Feature分支通常叫做功能分支，也可以叫做个人分支，一般命名为 feature/XXXX,该分支就是每一个开发人员进行开发的分支，比如做一些功能、需求之类的东西，这个分支上的代码变更最终合并回develop分支或者干脆被抛弃掉（例如实验性且效果不好的代码变更）。

> 命名：feature通常是从develop上拉取 所有通常用 dev_功能描述_英文名 来命名。比如 feature/dev_refresh_molierzhang

- 命名规则：feature/*
- develop分支的功能分支
- feature分支使用develop分支作为它们的父类分支
- 以功能为单位从develop拉一个feature分支
- 每个feature分支颗粒要尽量小，以利于快速迭代和避免冲突
- 当其中一个feature分支完成后，它会合并回develop分支
- 当一个功能因为各种原因不开发了或者放弃了，这个分支直接废弃，不影响develop分支
- feature分支代码可以保存在开发者自己的代码库中而不强制提交到主代码库里
- feature分支只与develop分支交互，不能与master分支直接交互

### Release分支
Release分支通常叫做发布分支，也可以叫做测试-发布分支，一般命名为 Release/1.2.3（后面是版本号）,该分支是为测试-发布新的产品版本而开辟的。

> 命名：release/v1.0.0

- 命名规则：release/，“”以本次发布的版本号为标识
- release分支主要用来为发布新版的测试、修复做准备
- 当需要为发布新版做准备时，从develop衍生出一个release分支
- release分支可以从develop分支上指定commit派生出
- release分支测试通过后，合并到master分支并且给master标记一个版本号
- release分支一旦建立就将独立，不可再从其他分支pull代码
- 必须合并回develop分支和master分支

### Hotfix
hotfix叫热修复分支，除了是计划外创建的以外，hotfix分支与release分支十分相似，当已经发布的版本（Master上代码）遇到了异常情况或者发现了严重到必须立即修复的软件缺陷的时候，就需要从master分支上指定的tag版本拉取hotfix分支来组织代码的紧急修复工作。

> 命名：hotfix/当前版本号
> eg：hotfix/v1.0.0

- 命名规则：hotfix/*
- hotfix分支用来快速给已发布产品修复bug或微调功能
- 只能从master分支指定tag版本衍生出来
- 一旦完成修复bug，必须合并回master分支和develop分支
- master被合并后，应该被标记一个新的版本号
- hotfix分支一旦建立就将独立，不可再从其他分支pull代码

# 参考资料

Git Flow 使用经验总结：https://segmentfault.com/a/1190000017800324

Git分支管理策略：http://www.ruanyifeng.com/blog/2012/07/git.html

Gitflow工作流程：https://www.cnblogs.com/jeffery-zou/p/10280167.html

Git Flow 的正确使用姿势：https://www.jianshu.com/p/41910dc6ef29