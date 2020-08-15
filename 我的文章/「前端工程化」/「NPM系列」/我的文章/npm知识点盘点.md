npm知识大整理

我们平时在进行前端开发时，很多时间都在接触`npm`，我们安装依赖、卸载依赖、初始化项目、管理包都在使用`npm`，但是我们大多数情况对这些知识只是一知半解，所以这里对常用的知识做一个总结。

##  什么是npm

`npm`（全称 Node Package Manager，即“node包管理器”）是`Node.js`默认的、用`JavaScript`编写的软件包管理系统。

`npm`会随着`Node.js`自动安装。`npm`模块仓库提供了一个名为“registry”的查询服务，用户可通过本地的`npm`命令下载并安装指定模块。此外用户也可以通过`npm`把自己设计的模块分发到registry上面。

## 常用的命令 

### npm init

npm init命令用来初始化一个package.json，包含一些包的常规信息。输入这个命令后会一路提示你输入相关的信息。

![](https://static01.imgkr.com/temp/c8dc579760d14aa593be70462fd88047.png)

最终生成的json代码如下所示

```
{
  "name": "test",
  "version": "1.0.0",
  "description": "hello",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### npm install

这个命令应该是出场频率最高的了，我们平时主要就在使用这个命令来安装我们需要依赖包。

- 安装包到`dependencies`

  ```
  // 这三个写法等效
  npm install xxx -S
  npm install xxx --save
  npm instsll xxx
  
  // 缩写
  npm i xxx -S
  
  // 指定版本，一般你安装没指定版本的话都是安装的最新版本
  npm install xxx@3.2.1 -S
  ```

- 安装包到`devDependencies`

  ```
  // 这三个写法等效
  npm install xxx -D
  npm install xxx --save-dev
  npm i xxx -D
  
  // 指定版本，一般你安装没指定版本的话都是安装的最新版本
  npm install xxx@3.2.1 -D
  ```

#### dependencies和devDependencies的区别

`dependencies`这个主要用来保持生产环境需要用的包。

`devDependencies`这个主要用来保存开发环境需要用的包。

举个简单的例子，我们在做`Vue`开发时，你路由、状态管理、`babel`的runtime都是打包过后部署到线上需要使用到的包，没有这些包运行就会出现问题。

但是像预处理工具、打包构建工具在打完包生成生产文件过后就不会再依赖了，这种包肯定要安装在开发依赖里面。

查了下资料，官方分`dependencies`和`devDependencies`的原因

> 最终目的是为了减少 node_modules 目录的大小以及 npm install 花费的时间。因为 npm 的依赖是嵌套的，所以可能看上去 package.json 中只有几个依赖，但实际上它又扩散到 N 个，而 N 个又扩散到 N 平方个，一层层扩散出去，可谓子子孙孙无穷尽也。如果能够尽量减少不使用的依赖，那么就能够节省线上机器的硬盘资源，也可以节省部署上线的时间。

### npm uninstall

如果你要卸载某个包，把上面install对应的命令改成uninstall即可。

### npm view package version

这个命令用来查看某个包的最新版本

```
npm view element-ui version
```

### npm view package versions

这个命令用来查看某个包再npm上发布过的所以版本

```
npm view element-ui versions
```

### npm view packageName

这个命令主要用来查看npm上有没有对应名字的包

```
npm view element-ui
```

如果存在element-ui这个包的话，命令行会输出对应的包的信息，那么你如果要发布一个包的话，你的包就不能叫element-ui了。如果不存在这个包，那么对应的命令行会输出404错误信息。

## package.json

`package.json`是`npm`最主要的部分，这个json文件就是npm的配置文件。这里总结了文件里面常用的配置信息

### name属性

name属性定义了你的包的名称，这个名称必须是独一无二的（在npm上面），毕竟如果重复的话你就不能发布到npm上面了，这个包名会作为模块的url。

如果你想发布一个包到npm，借助上面的`npm view packageName`这个命令来查看包名是否被占用。

