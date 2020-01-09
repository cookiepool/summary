## 开始前
在参考过一些资料和开源的UI组件库后，写下了这篇文章，希望能给大家一些帮助。

> UI组件库前后摸索了差不多近一个星期才勉强学会，其实组件库开发不算特别复杂（复杂组件当我没说 #滑稽保命），期间主要是卡在了目录组织和打包的问题上，目录组织的问题主要是涉及到按需加载的问题，如果一把梭全部引入反而没那么复杂。然后打包问题也是因为按需加载的需要，需要配置不同的webpack配置文件，这里摸索了特别久，最后再看了vant、nutui这些开源的组件库后，还算是入门了吧，这里其实我主要参考了nutui的组织结构，webpack的配置基本也是这么来的。文章虽然含金量不多，希望能帮助到需要自己学习组件库开发的同学。


好了，废话不多说，直接开始！


## 搭建项目
本次开发没有基于Vue CLI来搭建开发环境，而是基于我上次webpack4自己搭建的环境来构建的环境，虽然官方CLI也可以，而且也有自己的库模式来发布组件库。但是为了能够更多的有自己自定义的选项，还是没选择官方脚手架。如果你想要使用官方CLI来开发，那么本文章虽然不能手把手教你，但应该还是可以起到抛砖引玉的作用。

接下来我们需要做这几步，先把目录结构定下来：
- 克隆下该项目[customized-vue-proj-mobile](https://github.com/cookiepool/customized-vue-proj-mobile)
- 修改项目的目录结构如下图所示。

![1.png](https://i.loli.net/2019/12/24/biHQqsyGXcM3fBI.png)

> examples文件夹下用来展示你的组件基本用法。其实相当于把src的文件目录改为了examples

> packages文件夹下用来书写你的组件。

> 修改了结构后还涉及到一些细微的修改，比如文件夹改为你项目的名字（我这儿叫cookie-ui），package.json里面的name根据自己的需要来修改。

> postcss.config.js里面关于px转rem和px转vw|vh那个也要去掉，这儿我们使用px单位来开发。

同时我们需要修改我们的入口，因为默认搭建出来的入口是src。在bulid目录下修改webpack.config.js中以下代码：
```
module.exports = {
  /* 省略代码 */
  entry: {
    main: path.resolve(__dirname, "../examples/main.js")
  },
  resolve: {
    /* 省略代码 */
    '@': path.resolve(__dirname, '../examples')
    /* 省略代码 */
  }
  /* 省略代码 */
}
```
这样一来，再把examples改造一下，便于我们写演示代码。examples目录如下图：

![2.png](https://i.loli.net/2019/12/24/iEI6JFRbcj5kKlo.png)

这个文件夹目录的结构就跟我们平时做单页面开发一样，这里我就不再赘述各个文件夹的功能，其实这个结构也不是非得这样来布置，可以根据自己的情况来规划目录即可。

## 编写组件库
重点主要在packages目录下组件库的编写，目前我的目录结构如下所示：

![3.png](https://i.loli.net/2019/12/24/VBNdJKjvapZTmWl.png)

- components 存放你的组件。
- style 存放你的相关的样式，组件单独的样式我放在了组件目录里面管理了，比如图片你面的button.scss。
- index.js 组件库的注册和导出都在这里。

> style文件夹下的样式大家根据自己需要来规划就好，不一定按我这个方式来

### 1、普通组件
接下来我以一个button组件来举例，先按图建好相关文件，相关代码我会加一些注释，如果你不太清楚Vue插件开发，Sass等这些知识点建议先学习一下相关知识，这里不再展开。

![4.png](https://i.loli.net/2019/12/24/hKHGNgpTle2F7Lx.png)

- button.scss
```
@import '../../style/common/variable.scss';
.cookie-button {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  outline: 0;
  border: 0;
  appearance: none;
  color: #fff;
  font-size: 16px;
  &.cookie-button--primary {
    background-color: $button-primary;
    border: 1px solid $button-primary;
  }
  &.cookie-button--danger {
    background-color: $button-danger;
    border: 1px solid $button-danger;
  }
  &.cookie-button--warning {
    background-color: $button-warning;
    border: 1px solid $button-warning;
  }
  &.cookie-button--info {
    background-color: $button-info;
    border: 1px solid $button-info;
  }
}
/* 加这个代码是为了让按钮点击看起有个反馈效果 */
.cookie-button::before {
  position: absolute;
  content: "";
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0;
  transform: translate(-50%, -50%);
  border: inherit;
  border-color: #000;
  border-radius: inherit;
}
.cookie-button:active::before {
  opacity: 0.1;
}
```

- Button.vue
```
<template>
  <button :class="classSet" @click="handleClick">
    // 这里使用了插槽知识
    <slot></slot>  
  </button>  
</template>


<script>
export default {
  name: 'ck-button',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    classSet() {
      let classResult = `cookie-button cookie-button--${this.type}`;
      return classResult;
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
}
</script>
```

- index.js
```
// 配置对外引用
import Button from './Button.vue';
import './button.scss';

// 提供install方法
// 这里提供一次install是为了便于单独引入buttton组件时进行注册
Button.install = function(Vue) {
  Vue.component(Button.name, Button);
};

// 默认导出方式导出
export default Button;
```
这样我们就实现了一个简单的按钮组件。
我们到根目录的index.js下进行install。在index.js中加入以下代码：
```
/* 组件库对外导出的组件集合，对整个组件进行导出 */

// 导入组件（用于注册所有组件）
import Button from './components/button';


// 定义组件列表
const componentsList = [
  Button
];

const install = function(Vue) {
  // 判断是否安装过
  if(install.installed) return;

  // 注册所有组件
  componentsList.map((component) => {
    Vue.component(component.name, component);
  })
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Button
}
```
然后我们进入我们的examples目录来展示我们的按钮组件，在main.js中全部引入
```
// 引入组件（注册所有）
import CookieUI from '../packages/index.js';
Vue.use(CookieUI);
```
在组件中使用按钮：
```
<div class="box"><ck-button type="primary" @click="testClick">基本按钮</ck-button></div>
<div class="box"><ck-button type="danger">危险按钮</ck-button></div>
<div class="box"><ck-button type="warning">警告按钮</ck-button></div>
<div class="box"><ck-button type="info">信息按钮</ck-button></div>
```
- 注意：`<ck-button>`这个跟你写的组件的name属性相关（比如我这里就是Button.vue里面的name属性），名字只要符合规范即可。

![5.gif](https://i.loli.net/2019/12/24/cXAVg2aOG6FBbev.gif)

### 2、modal组件
这种组件不需要Vue.component()方法来注册，比如常见的Toast、Dialog，我这儿是直接绑定到Vue原型上，在项目里面可以直接使用this调用。

![6.png](https://i.loli.net/2019/12/24/tA2o8kwCPscgGWi.png)

- toast.scss
```
// 定义的变量
@import '../../style/common/variable.scss';
// 使用的弹性布局
@import '../../style/mixins/flex_style.scss';
// 动画相关的样式
@import '../../style/mixins/animation.scss';

.cookie-toast--mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  @include flex-all-center; // Sass的混入语法
  .cookie-toast--dialog {
    max-width: 80vw;
    background-color: rgba(0, 0, 0, 1);
    padding: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    animation: zoomIn .3s ease-out 0s forwards;
  }
  .cookie-toast--content {
    font-size: $font-size-s;
    color: #fff;
  }
}

@include anima-zoomIn
```

- Toast.vue
```
<template>
  <div v-if="show" class="cookie-toast--mask">
    <div class="cookie-toast--dialog">
      <p class="cookie-toast--content">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ck-toast',
  data() {
    return {
      show: false,
      message: ''
    }
  },
  methods: {

  }
}
</script>
```

- index.js
```
import Vue from 'vue';
import toastComponent from './Toast.vue';
import './toast.scss';

const toastConstructor =  Vue.extend(toastComponent);
let instance;

/**
 * 打开toast 
 * @param options {Object}  消息内容options.message，不可省略。停留时间options.duration，可省略，默认为2000（毫秒）
**/
let toast = function(options = {}) {
  if(!instance) {
    instance = new toastConstructor({
      el: document.createElement('div')
    });
  }

  if(instance.show === true) return;

  instance.message = options.message;
  instance.show = true;
  document.body.appendChild(instance.$el)

  let timer = setTimeout(() => {
    instance.show = false;
    clearTimeout(timer);
  }, options.duration || 2000);
}

export default toast;
```
这样，一个Toast就完成了，然后我们需要到index.js里面注册
```
/* 组件库对外导出的组件集合，对整个组件进行导出 */

// 导入组件（用于注册所有组件）
import Button from './components/button';
import Toast from './components/toast';

// 定义组件列表
const componentsList = [
  Button
];

const install = function(Vue) {
  // 判断是否安装过
  if(install.installed) return;

  // 注册所有组件
  componentsList.map((component) => {
    Vue.component(component.name, component);
  })

  Vue.prototype.$toast = Toast;
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Button,
  Toast,
}
```
这样我们就注册好了toast，结合上面mian.js引入button的那段代码，我们可以在项目里面这样使用：
```
this.$toast({message: 'Hello,Toast演示', duration: 1500});
```

![6.gif](https://i.loli.net/2019/12/24/yCagS2Bpxq9bQ7T.gif)

另付Dialog演示，代码这里不再贴出来，后面我会把代码传到github，需要的自取。

![8.gif](https://i.loli.net/2019/12/24/p513agVGH7iMRSs.gif)

> 注：后期我把packages目录下的index.js改为了cookieui.js。

## webpack打包
组件库开发完毕，我们是需要发布到npm上供其他人使用的，不然单独提出来的意义也不大，所以我们首先要做的的就是将UI组件库打包，这儿还是借助了webpack，它专门有针对library进行设置。

### 1、打包准备
这种方式是把所有相关的打包到js中，然后把样式单独抽离出来，形成css文件，最终你打包下来的目录就是一个js和一个css，我们把它发布到npm，当别人下载下来过后，引入方式大概就变成这种样子（这里只是举个例子）：
```
import CookieUI from 'cookie-ui';
import '../cookie-ui/index.css';
Vue.use(CookieUI);
```
首先我们在build的目录下新建三个文件`webpack.lib.base.js`、`webpack.lib.prod.js`、`webpack.lib.prod.disperse.js`。

- webpack.lib.base.js 通用的基本配置
- webpack.lib.prod.js 打包所有组件
- webpack.lib.prod.disperse.js 分组件打包

---

- webpack.lib.base.js
```
// 库打包的主要配置
// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 引入清除打包后文件的插件（最新版的需要解构，不然会报不是构造函数的错，而且名字必须写CleanWebpackPlugin）
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 我们打包组件库时不需要把Vue打包进去
  externals: {
    'vue': {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }	
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              esModule: false,
              fallback: 'file-loader',
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  resolve: {
		alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
    },
    extensions: ['*', '.js', '.vue']
	}
};
```

- webpack.lib.prod.js
```
// 打包所有
// node.js里面自带的操作路径的模块
const path = require("path");
const merge = require('webpack-merge');
const webpackLibBaseConfig = require('./webpack.lib.base.js');
// 用于提取css到文件中
const miniCssExtractPlugin = require('mini-css-extract-plugin');
// 用于压缩css代码
const optimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

module.exports = merge(webpackLibBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    cookieui: path.resolve(__dirname, "../packages/cookieui.js")
  },
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, "../lib"),
    // 打包后生成的js文件
    filename: "[name].js",
    publicPath: "/",
    library: 'cookieui',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader, // 使用miniCssExtractPlugin.loader代替style-loader
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    // 新建miniCssExtractPlugin实例并配置
    new miniCssExtractPlugin({
      filename: '[name].css'
    }),
    // 压缩css
    new optimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
  ]
})
```

- webpack.lib.prod.disperse.js
```
// 用于对组件单独打包，便于按需加载
// 用于拷贝的插件
const copyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const merge = require('webpack-merge');
const webpackLibBaseConfig = require('./webpack.lib.base.js');
// 引入入口配置文件
const entryConfig = require('../packages/entry_config.js');

//定义入口
let entry =  {};
entryConfig.configList.map((item) => {
  let componentName = item.name.toLowerCase();
  entry[componentName] = path.resolve(__dirname, '../packages/components/' + componentName + '/index.js');
});

module.exports = merge(webpackLibBaseConfig, {
  mode: 'production',
  devtool: '#source-map',
  entry,
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, "../lib/packages"),
    // 打包后生成的js文件
    // 解释下这个[name]是怎么来的，它是根据你的entry命名来的，入口叫啥，出口的[name]就叫啥
    filename: "[name]/index.js",
    // 我这儿目前还没有资源引用
    publicPath: "/",
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader, // 使用miniCssExtractPlugin.loader代替style-loader
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
    ]
  },
  plugins: [
    // 新建miniCssExtractPlugin实例并配置
    new miniCssExtractPlugin({
      filename: '[name]/style.css'
    }),
    // 压缩css
    new optimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
  ]
})
```

同时在packages目录下新建一个entry_config.js，这个是用来单独打包组件时的配置
```
module.exports = {
  configList: [
    {
      name: 'button',
      author: 'LEE'
    },
    {
      name: 'toast',
      author: 'LEE'
    },
    {
      name: 'dialog',
      author: 'LEE'
    }
  ]
}
```
> 注：上面涉及的相关的包如果你没有安装的话，手动安装一次即可。

这样一来，webpack就配置完毕了，现在我们还需要修改package.json里面的script，加上以下几句：
```
"lib:all": "webpack --config ./build/webpack.lib.prod.js",
"lib:disp": "webpack --config ./build/webpack.lib.prod.disperse.js"
```
### 2、分别打包
接下来我们分别执行上面的命令，然后你会发现目录下有个lib目录，生成项目如下：

![9.png](https://i.loli.net/2019/12/31/ixTYC1ly8SLR4qM.png)

## npm发布
### 1、发布准备
- 首先你得有一个npm的账号，到官网注册一个即可。[npm](https://www.npmjs.com/)。

- 修改你目录下的package.json

这个根据你情况来写，一般来说name、version、main这几个属性不可省略。同时你得name不能跟npm上其它开发者发布的包重名，像我这个cookie-ui就重复了，所以我改成了vue-cookie-ui。-_-!。。。这里我给个大概参数配置，需要看完整的到仓库自取哈
```
{
  "name": "vue-cookie-ui",
  "version": "1.0.0",
  "description": "A Personal Learning UI library For Vue",
  "main": "lib/cookieui.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js",
    "lib:all": "webpack --config ./build/webpack.lib.prod.js",
    "lib:disp": "webpack --config ./build/webpack.lib.prod.disperse.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/cookiepool/cookie-ui.git"
  },
  "keywords": [
    "UI",
    "Vue",
    "UI-Library"
  ],
  "author": "LEE",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/cookiepool/cookie-ui/issues"
  },
  "homepage": "https://github.com/cookiepool/cookie-ui#readme",
  /* 省略代码 */
}
```
- 新建一个.npmignore文件，用来忽略不发布的文件
```
touch .npmignore
```
加入以下代码
```
.DS_Store
node_modules
/dist
/build

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*

examples/
packages/
public/
babel.config.js
build
postcss.config.js
教程.MD
.gitignore
*.map
*.html
```

### 2、开始发布

前面注册好了和配置好package.json等工作后，在根目录打开bash，输入
```
npm login
```
这里你按照提示登录好账号即可，登录成功过后，再来一个发布命令即可
```
npm publish
```
发布成功过后你就可以到npm查到自己的包了。

![10.png](https://i.loli.net/2019/12/25/m3swjfPpzNU1eYy.png)

## 从npm下载并引用组件

我们发布到npm后就可以从npm下载并使用了
```
npm i vue-cookie-ui
```
下载完成后去我们的项目里面引用（main.js）

### 全部引入
```
// 引入组件（注册所有）
import CookieUI from 'vue-cookie-ui';
import 'vue-cookie-ui/lib/cookieui.css';
Vue.use(CookieUI);
```
![11.gif](https://i.loli.net/2019/12/25/jcAoEOnr1y82DmF.gif)

### 按需引入
```
// 按需加载
// 引入组件
import Button from 'vue-cookie-ui/lib/packages/button';
import 'vue-cookie-ui/lib/packages/button/style.css';
Vue.use(Button)
// 引入modal（Dialog和Toast都要这样注册）
import Toast from 'vue-cookie-ui/lib/packages/toast';
import 'vue-cookie-ui/lib/packages/toast/style.css';
Vue.prototype.$toast = Toast;
```
这里我只按需引入了Toast、Button，Dialog没有引入，演示你会发现Toast正常，Dialog无法工作并出现了报错。

![12.gif](https://i.loli.net/2019/12/25/ChurtnZQJjl6zbG.gif)

![13.png](https://i.loli.net/2019/12/25/Wh6z2vpm4wifyLk.png)

### 借助babel-plugin-component按需引入
安装依赖
```
npm install babel-plugin-component
```

在babel.config.js中加入以下代码：
```
plugins: [[
  // 配置按需引入插件babel-plugin-component
  "component",
  {
    // 库的名字为VUI
    "libraryName": "vue-cookie-ui",
    // 存放库文件的文件夹为lib/packages
    "libDir": "lib/packages",
  }
]]
```
然后你就可以这样引入了，插件会自动帮你转换路径
```
// 使用babel-plugin-component
import { Button, Toast, Dialog } from 'vue-cookie-ui';
Vue.use(Button);
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
```

## 结语
到这里就告一段落了，特别感谢nutui的源代码，给了很多参考，如有错误，还请多多包涵，并指出错误。

前期在社区上也找了许多开发组件库的文章，也感谢这些开源分享的大佬。如果帮助到了你点个赞再走吧！

这里附上代码的github地址：[cookie-ui](https://github.com/cookiepool/cookie-ui)