### 一、Babel 7相关的概念
- @babel/core: babel的核心，核心的api都在包含在这里。

- @babel/cli: 命令行工具，通过命令对js文件进行转换的工具。

- @babel/perset-env: 指定转换的工作环境，这个是官方推荐使用的预置集合。

- @babel/polyfill

  > 相当于一个填充，因为babel本身在借助插件过后只支持转换箭头函数、结构赋值这些语法糖类的语法，而一些新的API或者Promise函数等是无法转换的。@babel/polyfill就是解决这个问题的。@babel/polyfill本身包含了 regenerator runtime and core-js。但是Babel 7.4.0后不推荐使用@babel/polyfill了，所以我们一般在使用@babel/perset-env后配置好core-js和regenerator runtime（这个主要是用来转换await和async语法的）即可。

- babel-loader

  > webpack的加载器，用于调用@babel/core的核心API来完成编译。

- @babel/plugin-transform-runtime

  > 一个可以重复使用 babel注入的帮助程序，以节省代码大小的插件。同时使用这个可以避免全局污染，因为单纯的require各个polyfill，使用的是改写全局prototype的方式实现。

- @babel/runtime

  > @babel/plugin-transform-runtime引入的帮助程序都在@babel/runtime里面，所以要结合@babel/plugin-transform-runtime一起使用的。

- @babel/core与babel-core区别

  > @babel/core是babel 7过后的版本标识，babel-core是以前版本的标识。

- .babelrc和babel.config.js

  > .babelrc和babel.config.js均是babel的配置文件，babel.config.js是bebel 7引入的新的方式。

- core-js@2/core-js@3

  > core-js@2分支中已经不会再添加新特性，新特性都会添加到core-js@3

- @babel/runtime-corejs2/@babel/runtime-corejs3

  > 这个也是结合@babel/plugin-transform-runtime，来使用的。如果你使用的最新的babel，建议使用@babel/runtime-corejs3。



> 顺便提一句，如果你使用了最新的Babel，那么建议corejs和@babel/runtime-corejs都更新到第三版，也就是core-js@3和@babel/runtime-corejs3。

---
在babel 7下：
- babel.config.js 是对整个项目(父子package) 都生效的配置，但要注意babel的执行工作目录。
- .babelrc 是对 待编译文件 生效的配置，子package若想加载.babelrc是需要babel配置babelrcRoots才可以（父package自身的babelrc是默认可用的）。
- 任何package中的babelrc寻找策略是: 只会向上寻找到本包的 package.json 那一级。
- node_modules下面的模块一般都是编译好的，请剔除掉对他们的编译。如有需要，可以把个例加到 babelrcRoots 中。
---
默认情况下.babelrc不作用于子包，那么在babel.config.js下加入一下babelrcRoots来指定即可。
```
module.exports = {
  babelrcRoots: ['.', './frontend', './backend'] // 允许这两个子 package 加载 babelrc 相对配置
}
```
### 二、Babel配置入门指南
首先需要本机安装node.js，使用npm包管理工具来初始化目录，本次操作学习都是在Babel 7上进行的，相较于Babel 6还是有一定区别，单独使用Babel 7需要CLI来完成，所以先安装脚手架和核心@babel/core。
```
npm install @babel/cli @babel/core
```
安装完成后，我们就可以使用cli提供的命令来转换我们的JS代码了，比如建立一个test.js的JS文件，里面包含ES6的内容：
```
let a = [1, 2, 3];

let b = () => {
	console.log('这是箭头函数！');
}

let c = [...a];
```
然后来一波命令：
```
npx babel test.js --watch --out-file test-transform.js
```
> - 注意：npx是npm在5.2.0后附赠的东西，使用这个我们可以避免全局安装这些命令工具，具体大家可以百度。
> - 我的test.js是直接建在跟package.json同级目录下的。
之后我们可以发现输出的test-transform.js没改变，没有转化，这是因为babel是基于插件来实现的，没配置插件肯定什么也不会干，所以需要配置，这里就不介绍单独手动引入插件的方式了。
```
// 转换前
let a = [1, 2, 3];

let b = () => {
	console.log('这是箭头函数！');
}

let c = [...a];

// 转换后
let a = [1, 2, 3];

let b = () => {
	console.log('这是箭头函数！');
}

let c = [...a];
```
你会发现babel本身不做语法转译，你需要借助插件来实现。官方为我们准备了预置集合，从而避免你自己一个一个去映入。

不想每次需要什么插件都去手动引入插件，所以我们就需要祭出@babel/preset-env，先安装这个工具。

```
npm intasll @babel/preset-env
```
然后在根目录建一个babel.config.js来配置babel，在文件中加入以下内容：
```
module.exports = {
	presets: [
		["@babel/preset-env"]
	]
}
```
之后我们再运行一次上面的转换命令，可以得到以下代码：
```
"use strict";

var a = [1, 2, 3];

var b = function b() {
  console.log('这是箭头函数！');
};

var c = [].concat(a);
```
这样ES6新的语法糖就转换成ES5了。
当然，babel.config.js里面还可以指定目标，当满足什么样的条件才去转换语法，不指定targets的情况下，默认是把所有的ES6+都转换成ES5，比如下面的示例：
```
module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": "ie >= 8"
    }]
  ]
}
```
这种只有当在大于ie 8以上的浏览器不支持的语法才会转换。

### @babel/polyfill
babel只能转换一般的语法糖，不能转换新的API，所以就只能祭出polyfill来弥补。首先安装下polyfill，然后引入就可以了。
```
npm install @babel/polyfill
```
然后在JS文件里面引入
```
import "@babel/polyfill";
```
对于使用webpack的同学，可以直接在main入口直接引入，打包过后直接可以使用，如下：
```
entry: {
  main: ["@babel/polyfill", path.resolve(__dirname, "../main.js")]
}
```
> - 注意：这个地方我只是举个栗子，实际上你这样单独操作出来的JS再直接引入某个HTML文件里面其实是没有用的，要结合到打包工具一起使用才行，比如Webpack。
### @babel/preset-env 加强
上面的引入方法是完全引入，导致包非常大，我们可以按需引入，这里又要配置@babel/preset-env，修改babel.config.js代码如下：
```
module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": "ie >= 8",
      "useBulitIns": "entry"
    }]
  ]
}
```
然后运行一下会看到这些代码：
```
"use strict";

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.every");

require("core-js/modules/es6.array.fill");
..........
require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var a = [1, 2, 3];

var b = function b() {
  console.log('这是箭头函数！');
};

var c = [].concat(a);
b();
var d = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("ok");
  }, 2000);
});
d.then(function (res) {
  console.log(res);
});
```
它会一股脑的把所有的包全部引进来，这样嘿不科学，所以usage参数可以做到按需引入，它只会引入相关的包，没使用的ES6+API不会引入相关的包，修改babel.config.js代码：
```
module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": "ie >= 8",
      "useBuiltIns": "usage"
    }]
  ]
}
```
转换过后的代码如下：
```
"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

var a = [1, 2, 3];

var b = function b() {
  console.log('这是箭头函数！');
};

var c = [].concat(a);
b();
var d = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("ok");
  }, 2000);
});
d.then(function (res) {
  console.log(res);
});

```
这样，我们可以看到，我的代码使用了promise，它就只引入promise相关的代码。
> - 注意：这儿使用usage参数后，JS文件里面就不要单独写`import "@babel/polyfill"`这句话了，多此一举。
---
到这儿，问题来了，在使用usage参数后使用babel的cli命令工具（也就是这个：npx babel test.js --watch --out-file test-done.js）会给一段提示，告诉我们要指定core-js@2或者core-js@3，从babel 7.4过后官方就建议这么做了，就是让我们放弃@babel/polyfill。安装core-js@2 

```
npm i core-js@2 -S
```



babel.config.js代码如下：

```
module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": "ie >= 8",
      "useBuiltIns": "usage",
      "corejs": 2
    }]
  ]
}
```
### @babel/runtime、 @babel/plugin-transform-runtime
使用上面这两个包，可以避免重复注入帮助函数（也就是转换class语法这些需要用到的辅助函数）关于这种方式的优点和缺点大家上网查一下就可以了，接下来先安装好包：
```
npm install @babel/plugin-transform-runtime -D
```
上面这个安装到dev依赖就可以了，不用于生产环境
```
npm install @babel/runtime
```
接下来我们配置一下babel.config.js，如下：
```
module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": "ie >= 8",
    }]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"]
  ]
}
```
然后输出一下
```
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var a = [1, 2, 3];

var b = function b() {
  console.log('这是箭头函数！');
};

var c = [].concat(a);
b();
var d = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("ok");
  }, 2000);
});
d.then(function (res) {
  console.log(res);
});

var MM = function MM() {  // 这个是我转换前用class定义的类 class MM {constructor(){}} 这种
  (0, _classCallCheck2["default"])(this, MM);
};
```
发现输出的代码里面没得polyfill了。如果需要polyfill的话就要单独安装以下内容：
```
npm install @babel/runtime-corejs2
```
这里安装这个包之前把我@babel/runtime给卸载了，安装了@babel/runtime-corejs2可以不再安装@babel/runtime，安装完成后再重新配置一下babel.config.js，如下：
```
module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": "ie >= 8",
    }]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 2
    }]
  ]
}
```
然后运行一下，看结果。相比前面的@babel/runtime，这里的polyfill回来了，多了一句这个
```
var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));
```

### 三、结合到webpack来使用
结合webpack的话，还需要以下几个东西：
```
npm install webpack -D
npm install webpack-cli -D
npm install babel-loader -D
```
babel-loader是加载器，要结合webpack来使用的话，这个必须要，同时，在项目根目录建立一个`webpack.config.js`配置文件（这里webpack的知识就不介绍了，详情参考[官网](https://www.webpackjs.com/guides/)）。
### 还是借助@babel/preset-env
然后是webpack.config.js文件
```
const path = require('path');

module.exports = {
    // 指定模式（这个指定可以用来区分开发模式和生产模式，可选值有：'devvlopment','production','none'）
    mode: 'none',
    // 入口
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },

    // 出口
    output: {
        // 出口文件
        path: path.resolve(__dirname, './dist'),
        // 文件名
        filename: './[name][hash:3].js',
    },

    // 加载器
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
            }
        ]
    }
}
```
### 使用core-js代替@babel/polyfill
官方网站上面说从babel 7.4.0后开始放弃babel/polyfill，转而使用core-js。这儿我们又来试一试core-js
首先卸载@babel/polyfill，然后执行以下命令安装core-js@3：

```
npm install core-js@3 regenerator-runtime -S
```
> 这里我发现当在安装core-js@3时会自动安装好regenerator-runtime，所以可以不用再手动安装一次。

因为@babel/polyfill是包含core-js和regenerator-runtime/runtime两部分，所以在不使用@babel/polyfill过后需要把这两个都安装好。

babel.config.js配置如下：

```
module.exports = {
  presets: [
    ['@babel/preset-env', {
      'targets': 'ie >= 8',
      'useBuiltIns': 'usage',
      'corejs': 3
    }]
  ]
};
```





### 使用@babel/plugin-transform-runtime和使用@babel/runtime

为了避免重复注入辅助函数，我们需要借助这两个工具。

```
npm install @babel/plugin-transform-runtime -D

npm install @babel/runtime -S
```

babel.config.js配置如下：

```
module.exports = {
  presets: [
    ['@babel/preset-env', {
      'targets': 'ie >= 8',
      'useBuiltIns': 'usage',
      'corejs': 3
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime']
  ]
};
```



### 使用@babel/plugin-transform-runtime和@babel/runtime-corejs3来实现API的polyfill
前面使用了@babel/preset-env的useBuiltIns来实现API填充，这儿试一试另一种方案，首先卸载掉core-js和regenerator-runtime，然后安装一下两个包
```
npm install @babel/plugin-transform-runtime -D
```
```
npm install @babel/runtime-corejs3 -S
```
安装完成后配置一下babel.config.js
```
module.exports = {
    presets: [
        ['@babel/preset-env']
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', {
            'corejs': 3
        }]
    ]
}
```
注意：这儿我是安装的@babel/runtime-corejs3，所以“'corejs': 3”这个参数不能少，否者会报 Can't resolve '@babel/runtime/helpers/createClass'这种错误，上面这种方式不会污染全局，适合第三方开发。



### 四、推荐配置

最近又去看了一些babel相关的文章，做一个总结，如果你使用的最新的babel，这儿有几个推荐配置。**本配置需要babel在7.4.0及以上，并且不再使用@babel/polyfill**，本次测试我这边的版本如下：

```
"devDependencies": {
  "@babel/cli": "^7.10.4",
  "@babel/core": "^7.10.4",
  "@babel/plugin-transform-runtime": "^7.10.4",
  "@babel/preset-env": "^7.10.4",
  "babel-loader": "^8.1.0",
  "webpack": "^4.43.0",
  "webpack-cli": "^3.3.12"
},
"dependencies": {
  "@babel/runtime": "^7.10.4",
  "core-js": "^3.6.5"
}
```

测试的js文件内容如下：

```
let a = 100;
const b = 200;

let func = () => {
  console.log('箭头函数！');
}

const isHas = [1,2,3].includes(2);

const p = new Promise((resolve, reject) => {
  resolve(100);
});

class Animal {
  constructor() {
    
  }

  say() {
    console.log('lalala!');
  }
}

function delayFunc() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(2333);
    }, 2000)
  });
}

async function testTwo() {
  console.log('start');
  let awaitValue = await delayFunc().catch((err) => {
    console.log(err);
  });
  console.log('end');

  return awaitValue;
}

testTwo().then((res) => {
  console.log(res);
});
```



#### 污染全局的方式，且不考虑帮助函数重复注入

- 配置需要的包

  首先安装好相关的包，这里默认安装好了@babel/core等必要工具

  ```
  npm install @babel/preset-env -D
  
  npm install core-js@3 -S
  
  // 如果你使用了async和await语法，还需要额外安装
  // 安装core-js@3的时候regenerator-runtime其实已经安装好了，可以不用再手动安装一次
  npm install regenerator-runtime -S
  ```

- 配置babel.config.js

  ```
  module.exports = {
    presets: [
      ['@babel/preset-env', {
        'useBuiltIns': 'usage',
        'corejs': 3
      }]
    ]
  };
  ```

  如果你想指定转换支持的浏览器，你可以设置targets参数，比如下面这种：

  ```
  module.exports = {
    presets: [
      ['@babel/preset-env', {
        'targets': 'ie >= 8',
        'useBuiltIns': 'usage',
        'corejs': 3
      }]
    ]
  };
  ```

- 转译过后的结果

  ```
  "use strict";
  
  require("core-js/modules/es.array.includes");
  
  require("core-js/modules/es.object.define-property");
  
  require("core-js/modules/es.object.to-string");
  
  require("core-js/modules/es.promise");
  
  require("core-js/modules/web.timers");
  
  require("regenerator-runtime/runtime");
  
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
  
  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
  
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
  
  var a = 100;
  var b = 200;
  
  var func = function func() {
    console.log('箭头函数！');
  };
  
  var isHas = [1, 2, 3].includes(2);
  var p = new Promise(function (resolve, reject) {
    resolve(100);
  });
  
  var Animal = /*#__PURE__*/function () {
    function Animal() {
      _classCallCheck(this, Animal);
    }
  
    _createClass(Animal, [{
      key: "say",
      value: function say() {
        console.log('lalala!');
      }
    }]);
  
    return Animal;
  }();
  
  function delayFunc() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(2333);
      }, 2000);
    });
  }
  
  function testTwo() {
    return _testTwo.apply(this, arguments);
  }
  
  function _testTwo() {
    _testTwo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var awaitValue;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('start');
              _context.next = 3;
              return delayFunc()["catch"](function (err) {
                console.log(err);
              });
  
            case 3:
              awaitValue = _context.sent;
              console.log('end');
              return _context.abrupt("return", awaitValue);
  
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _testTwo.apply(this, arguments);
  }
  
  testTwo().then(function (res) {
    console.log(res);
  });
  ```

  

####  污染全局的方式，考虑帮助函数重复注入问题

- 配置需要的包

  ```
  npm install @babel/preset-env -D
  
  npm install core-js@3 -S
  
  // 如果你使用了async和await语法，还需要额外安装
  // 安装core-js@3的时候regenerator-runtime其实已经安装好了，可以不用再手动安装一次
  npm install regenerator-runtime -S
  
  // 除了前面需要安装的包，还需安装以下的包
  npm install @babel/plugin-transform-runtime -D
  
  npm install @babel/runtime -S
  ```

- 配置babel.config.js

  ```
  module.exports = {
    presets: [
      ['@babel/preset-env', {
        'useBuiltIns': 'usage',
        'corejs': 3
      }]
    ],
    plugins: [
      ['@babel/plugin-transform-runtime']
    ]
  };
  ```

- 转译过后的结果

  ```
  "use strict";
  
  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
  
  require("core-js/modules/es.array.includes");
  
  require("core-js/modules/es.object.to-string");
  
  require("core-js/modules/es.promise");
  
  require("core-js/modules/web.timers");
  
  var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
  
  require("regenerator-runtime/runtime");
  
  var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
  
  var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
  
  var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
  
  var a = 100;
  var b = 200;
  
  var func = function func() {
    console.log('箭头函数！');
  };
  
  var isHas = [1, 2, 3].includes(2);
  var p = new Promise(function (resolve, reject) {
    resolve(100);
  });
  
  var Animal = /*#__PURE__*/function () {
    function Animal() {
      (0, _classCallCheck2["default"])(this, Animal);
    }
  
    (0, _createClass2["default"])(Animal, [{
      key: "say",
      value: function say() {
        console.log('lalala!');
      }
    }]);
    return Animal;
  }();
  
  function delayFunc() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(2333);
      }, 2000);
    });
  }
  
  function testTwo() {
    return _testTwo.apply(this, arguments);
  }
  
  function _testTwo() {
    _testTwo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var awaitValue;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('start');
              _context.next = 3;
              return delayFunc()["catch"](function (err) {
                console.log(err);
              });
  
            case 3:
              awaitValue = _context.sent;
              console.log('end');
              return _context.abrupt("return", awaitValue);
  
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _testTwo.apply(this, arguments);
  }
  
  testTwo().then(function (res) {
    console.log(res);
  });
  ```

  可以看出，帮助函数现在不是直接被 `inject` 到代码中，而是从 `@babel/runtime` 中引入。

#### 不污染全局的方式，且考虑帮助函数重复注入问题

- 配置需要的包

  ```
  npm install @babel/preset-env -D
  
  // 除了前面需要安装的包，还需安装以下的包
  npm install @babel/plugin-transform-runtime -D
  
  npm install @babel/runtime-corejs3 -S
  ```

  只需要这三个包就够了

- 配置babel.config.js

  ```
  module.exports = {
    presets: [
      ['@babel/preset-env']
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        'corejs': 3
      }]
    ]
  };
  ```

- 转译过后的结果

  ```
  "use strict";
  
  var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
  
  var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
  
  var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
  
  var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));
  
  var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
  
  var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
  
  var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
  
  var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
  
  var _context;
  
  var a = 100;
  var b = 200;
  
  var func = function func() {
    console.log('箭头函数！');
  };
  
  var isHas = (0, _includes["default"])(_context = [1, 2, 3]).call(_context, 2);
  var p = new _promise["default"](function (resolve, reject) {
    resolve(100);
  });
  
  var Animal = /*#__PURE__*/function () {
    function Animal() {
      (0, _classCallCheck2["default"])(this, Animal);
    }
  
    (0, _createClass2["default"])(Animal, [{
      key: "say",
      value: function say() {
        console.log('lalala!');
      }
    }]);
    return Animal;
  }();
  
  function delayFunc() {
    return new _promise["default"](function (resolve, reject) {
      (0, _setTimeout2["default"])(function () {
        reject(2333);
      }, 2000);
    });
  }
  
  function testTwo() {
    return _testTwo.apply(this, arguments);
  }
  
  function _testTwo() {
    _testTwo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var awaitValue;
      return _regenerator["default"].wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('start');
              _context2.next = 3;
              return delayFunc()["catch"](function (err) {
                console.log(err);
              });
  
            case 3:
              awaitValue = _context2.sent;
              console.log('end');
              return _context2.abrupt("return", awaitValue);
  
            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));
    return _testTwo.apply(this, arguments);
  }
  
  testTwo().then(function (res) {
    console.log(res);
  });
  ```

  

### 四、总结

暂时babel就总结到这儿了，顺便熟悉了一下webpack，如有不准确的地方还请各位多多指正，希望有能帮助到你！