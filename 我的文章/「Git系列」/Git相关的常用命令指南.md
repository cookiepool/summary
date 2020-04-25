### 序言
> **在学习了廖雪峰老师的git教程后把常用的命令总结了出来**
---
> 注：在使用这些命令前请安装好Git软件，地址：https://git-scm.com/downloads，同时去注册一个git类的数据仓库账号，国外的如github、gitlab，国内的如码云等。
### 1、在建好的目录下来初始化一个git项目
> `git init`
### 2、添加文件
#### 2.1、添加所有文件
> `git add .`
#### 2.2、添加指定文件
> `git add 文件名`
>  `eg:  git add readme.md`
### 3、提交到仓库
> `git commit -m "说明"`
> `eg: git commit -m "Update"`
### 4、查看仓库状态
#### 4.1、如果你修改了某个文件，我们可以通过以下命令来查看状态
> `git status`
#### 4.2、如果想知道某个文件具体修改了哪些内容，用以下命令
> `git diff 文件名`
> `eg: git diff readme.md`

- 注：在确认修改无误后需要再次对修改的文件做git add 和 git commit命令来提交到仓库。
### 5、显示从最近到最远的提交日志
> `git log`
### 6、版本回退
在Git中，用HEAD表示当前版本，也就是最新的提交，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
> `git reset --hard HEAD^`
### 7、不想回退版本
找到回退之前的版本的commit版本值（sha1值），来进行反悔操作。
> `git reset --hard commit值`
> `eg: git reset --hard f8dad     注: 这个值只需要取前五位即可。`
### 8、查看回退记录
前面的反悔操作是建立在你还没关闭git bash窗口看得到回退前那个最新版本的commit id值，如果我们关闭了窗口后想反悔怎么办，使用以下命令来查看
> `git relog`
### 9、查看工作区和版本库里面最新版本的区别
> `git diff HEAD -- 文件名`
> `eg: git diff HEAD -- readme.txt`
---
>  注：每次修改，如果不用git add到暂存区，那就不会加入到commit中。
### 10、让文件回到最近一次git commit或git add时的状态。
> `git checkout -- 文件名`
> `eg: git checkout -- readme.txt  //把readme.txt文件在工作区的修改全部撤销`
### 11、删除版本库的文件
> `git rm 文件名`
> `eg: git rm test.txt`
---
> 之后再使用git commit -m "description"，文件就从版本库里面删除了
### 12、把误删的文件恢复到最新版本
> `git checkout HEAD -- test.txt //这个恢复的前提是没有执行commit命令才行。`
---
-  注意：git checkout -- test.txt 针对的是rm test.txt
   如果是git rm test.txt, 参看之前的版本回退, git reset -- hard 文件名
### 13、将本地仓库推送到远端仓库
#### 13.1、建立远端地址
> `git remote add origin 你远端的github地址`
> `eg:  git remote add origin git@github.com:michaelliao/learngit.git`
#### 13.2、推送到远端仓库
> `git push -u origin master //推送到主分支,以后可以直接：git push origin master`
### 14、把创建好的远程仓库上克隆到本地
> `git clone 远程地址`
> `eg: git clone git@github.com:michaelliao/gitskills.git`
---
git里面重要概念--分支（具体概念参考教程：[廖雪峰教程-分支][1]
---
### 15、创建分支
比如我们要创建dev分支：
> `git checkout -b dev`
---
注：git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：
> `git branch dev`
> `git checkout dev`
### 16、切换分支和查看当前分支
#### 16.1、切换
> `git checkout master`
#### 16.2、查看当前分支
> `git branch  //git branch命令会列出所有分支，当前分支前面会标一个*号。`
---
- 注：你切换到分支上过后，就可以专注自己分支的开发，使用git add和git commit来进行操作就可以了。提交过后你切换到master分支是无法查看到刚才你在分支上提交的内容的。
### 17、合并分支
> `git merge dev   //合并指定分支到当前分支(比如这个在master下合并dev)`
### 18、删除分支
> `git branch -d dev //删除dev分支`
### 19、分支合并冲突
> 一般来说在合并分支时与master存在冲突的情况下只能手动去把文件修改一致才行。合并过程冲突的话，可以使用cat 文件名来查看冲突的内容，冲突部分会用<<<<<<< HEAD这样的字样标注。
---
具体操作教程：[分支合并冲突][2]
### 20、分支管理策略
前面的分支操作属于Fast Forward模式，这种模式下，删除分支后，会丢掉分支信息，接下来不使用这种模式。
使用这个模式的其它操作几乎都一样，只是在合并的时候加一个参数和一个commit信息。如下：
> `git merge --no-ff -m 'no-ff' dev`
---
查看分支历史图
> `git log --graph --pretty=oneline --abbrev-commit`
### 21、实际开发使用分支管理的原则
首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。
### 22、bug分支
有时候我们在开发的过程中遇到bug，需要及时去修复，但是目前分支上的开发任务又没法提交，Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等修复bug以后恢复现场后继续工作。
#### 22.1、保存当前分支工作现场
> `git stash //执行了这个命令后用git status就不会看到未提交的信息。`
---
- 注：使用这个命令的前提是你的文件已经git的暂存区里面了。在保存好上面的工作现场后，你就需要去创建自己专门的bug修复分支，来进行修复，之后再合并和删除bug分支即可，做完这些过后你需要恢复我们开始保存好的工作现场。
#### 22.2、恢复工作现场
```
    git stash list //查看工作现场的位置
	
	git stash apply //恢复后，stash内容并不删除，你需要用git stash drop来删除

	git stash pop  //恢复的同时把stash内容也删了

	git stash apply stash@{0} //恢复指定的stash,这个stash@{0}参数可以从git stash list查看
```
### 23、features分支
当我们在开发新功能时需要新建一个分支，但是在开发完过后不要这个功能了，需要删除这个未合并的分支。
> `git branch -D feature //删除未合并的分支需要使用大D。`
### 24、可以抓取和推送的origin的地址
> `git remote -v //如果没有推送权限，就看不到push的地址。`
### 25、推送到分支
####  25.1、推送到主分支
> `git push origin master`
#### 25.2、推送到其它分支
> `git push origin dev`
#### 26、多人协作开发
这个参考教程，比较详细：[多人协作开发][3]
总结为以下几步：
```
查看远程库信息，使用git remote -v；

本地新建的分支如果不推送到远程，对其他人就是不可见的；

从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；

在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；

建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；

从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。
```
---
### 补充
#### 1、将本地分支推送到远程仓库
> `git push --set-upstream origin 分支名`
> `eg: git push --set-upstream origin dev`

  [1]: git%E9%87%8C%E9%9D%A2%E9%87%8D%E8%A6%81%E6%A6%82%E5%BF%B5--%E5%88%86%E6%94%AF%EF%BC%88%E5%85%B7%E4%BD%93%E6%A6%82%E5%BF%B5%E5%8F%82%E8%80%83%E6%95%99%E7%A8%8B%EF%BC%9Ahttps://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840038939c291467cc7c747b1810aab2fb8863508000%EF%BC%89
  [2]: %E5%85%B7%E4%BD%93%E6%93%8D%E4%BD%9C%E8%A7%81%E6%95%99%E7%A8%8B%EF%BC%9Ahttps://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840202368c74be33fbd884e71b570f2cc3c0d1dcf000
  [3]: https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013760174128707b935b0be6fc4fc6ace66c4f15618f8d000