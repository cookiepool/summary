# Promise是什么
Promise是ES6里面新增的一个特性，用于解决JS里面回调地狱的问题。Promise是异步编程的一种解决方案，它有三种状态，分别是pending-进行中、resolved-已完成、rejected-已失败

当Promise的状态又pending转变为resolved或rejected时，会执行相应的方法，并且状态一旦改变，就无法再次改变状态，这也是它名字promise-承诺的由来。

# 开始使用
## API列表
这里我先把常用的API给列举出来
```
/* 构造函数及原型上的方法 */
Promise();
Promise.prototype.then();
Promise.prototype.catch();
Promise.prototype.finally();
```
---

```
/* 静态方法 */
Promise.all();
Promise.race();
Promise.resolve();
Promise.reject();
```
- 下面这个是一般的用法
```
//声明一个Promise对象
let promiseObj = new Promise((resolve, reject) => {
  setTimeout(() => {
    let randomNum = Math.round(Math.random() * (10 - 1)) + 1;
    if(0 < randomNum && randomNum <= 5) {
      resolve('resolve'); // resolve-成功
    }else {
      reject('reject'); // reject-失败
    }
  }, 2222);
});

promiseObj.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```
## Promise()构造函数
这个不在赘述，使用new关键字实例化一个Promise对象，参数包含一个带有resolve和reject方法的函数。

> 注意：Promise声明实例化时，里面的代码会立即执行。也就是包含resolve和reject这两个参数的那个函数里面的代码。

## Promise.prototype.then()
then方法表示处理Promise的传过来的状态，是resolved还是rejected。then方法参数包含两个回调函数，第一个函数表示处理resolve的结果，第二个函数表示处理reject的结果。比如我上面的代码：
```
promiseObj.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```
我把它改成下面的样子也是可行的。
```
// 一个对应resolve的状态，一个对应reject的状态。
promiseObj.then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
});
```
当然then第二个函数参数是可以省略的。

### 链式调用
then方法调用过后，它的返回值还是一个Promise对象，所以我们可以进行链式调用。

举个例子，不过我们一般不会这样用（我还是以上面最初那个例子为基础）
```
promiseObj.then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
}).then(() => {
  console.log('链式调用')
});
```
输出结果
```
resolve
链式调用
```
这儿还有一个异步请求链式调用的例子
```
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL)
}).then(function funcA() {
  console.log("resolved:", comments)
}, function funcB(err) {
  console.log("rejected:", err)
})
```
这里我们第一次调用getJSON，如果resolve(成功)，进入回调函数执行`return getJSON(post.commentURL)`，这句话执行过后，返回一个新的Promise对象，如果状态变为resolved则执行funcA，如果状态变为rejected则执行funcB。

## Promise.prototype.catch()
Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。当状态变成rejected的时候就会执行catch里面的回调函数。catch方法跟then一样，执行过后返回的是一个新的Promise对象。

```
promiseObj.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```
上面的代码等效于下面的代码
```
promiseObj.then((res) => {
  console.log(res);
}).then(null, (err) => {
  console.log(err);
});
```

- then方法指定的回调函数，如果运行抛出错误，也会被catch方法捕获。
- Promise对象的错误具有冒泡性质，会一直向后传递，直到被捕获为止，也就是说错误总会被下一个catch语句捕获。

## Promise.prototype.finally()
这个也是最新的标准，暂时不要大面积使用

finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。
```
promiseObj.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
}).finally((res) => {
  console.log('finally-' + res);
});
```
上面的代码无论执行了then还是catch，最终还是会执行finally里面的代码。

## Promise.all()
Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
```

let t1 = new Promise((resolve,reject)=>{
  resolve("t1-success")
})
let t2 = new Promise((resolve,reject)=>{
  resolve("t2-success")
})
let t3 =Promise.reject("t3-error");
Promise.all([t1,t2,t3]).then(res=>{
  console.log(res)
}).catch(error=>{
  console.log(error)
})
//打印出来是t3-error
```

- Promise.all用来处理多个异步非常有用
- Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，比如下面这段代码
```
let request = (time,id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`第${id}个请求${time / 1000}秒`)
    }, time)
  })
}
  
let p1 = request(3000,1)
let p2 = request(2000,2)

Promise.all([p1, p2]).then((result) => {
  console.log(result)       // [ '第1个请求3秒', '第2个请求2秒' ]
}).catch((error) => {
  console.log(error)
});
```
即p1的结果在前，即便p1的结果获取的比p2要晚。

## Promise.race()
Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

```

let f1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let f2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([f1, f2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})
```

- 使用Promise.race实现的一段超时处理的代码
```
function delayPromise(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
function timeoutPromise(promise, ms) {
  var timeout = delayPromise(ms).then(function () {
    throw new Error('Operation timed out after ' + ms + ' ms');
  });
  return Promise.race([promise, timeout]);
}
// 运行示例
var taskPromise = new Promise(function(resolve){
  // 随便一些什么处理
  var delay = Math.random() * 2000;
  setTimeout(function(){
    resolve(delay + "ms");
  }, delay);
});
timeoutPromise(taskPromise, 1000).then(function(value){
  console.log("taskPromise在规定时间内结束 : " + value);
}).catch(function(error){
  console.log("发生超时", error);
});
```

## Promise.resolve()
Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。

Promise.resolve()里面的参数分成几种情况。

### 参数是一个 Promise 实例
如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例

```
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('fail');
  }, 1000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(p1);
  }, 2000);
});

p2.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```
最终输出的是`fail`。

### 参数不是具有then方法的对象，或根本就不是对象
```
Promise.resolve("Success").then(function(value) {
  // Promise.resolve方法的参数，会同时传给回调函数。
  console.log(value); // "Success"
}, function(value) {
  // 不会被调用
});
```

### 不带有任何参数
Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。

```
Promise.resolve().then(function () {
  console.log('two');
});
console.log('one');
// one two
```

### 参数是一个thenable对象
thenable对象指的是具有then方法的对象,Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

## Promise.reject()
Promise.reject()方法返回一个带有拒绝原因的Promise对象。

```
new Promise((resolve,reject) => {
  reject(new Error("出错了"));
});
// 等价于
Promise.reject(new Error("出错了"));

Promise.reject(new Error('fail')).catch((err) => { console.log(err) });
```

## Promise.allSettled()
ES2020新增的标准，暂时不要随便用

有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，ES2020 引入Promise.allSettled()方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。

Promise.allSettled跟Promise.all类似, 其参数接受一个Promise的数组, 返回一个新的Promise, 唯一的不同在于, 它不会进行短路, 也就是说当Promise全部处理完成后,我们可以拿到每个Promise的状态, 而不管是否处理成功。

假如有这样的场景：一个页面有三个区域，分别对应三个独立的接口数据，使用 Promise.all 来并发请求三个接口，如果其中任意一个接口出现异常，状态是reject,这会导致页面中该三个区域数据全都无法出来，显然这种状况我们是无法接受，Promise.allSettled的出现就可以解决这个痛点

```
Promise.allSettled([
  Promise.reject({ code: 500, msg: '服务异常' }),
  Promise.resolve({ code: 200, list: [] }),
  Promise.resolve({ code: 200, list: [] })
]).then(res => {
  console.log(res)
  /*
    0: {status: "rejected", reason: {…}}
    1: {status: "fulfilled", value: {…}}
    2: {status: "fulfilled", value: {…}}
  */
  // 过滤掉 rejected 状态，尽可能多的保证页面区域数据渲染
  RenderContent(
    res.filter(el => {
      return el.status !== 'rejected'
    })
  )
})
```

- 注意：这儿有一个不使用allSettled可以解决上面问题的方法
一般情况我们都是这样写的，如果其中一个接口炸了，那么最终返回的值是rejected那个值，并且会执行catch中的回调函数。

```
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject({status: 'fail'});
  }, 1000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({status: 'ok'});
  }, 2000);
});

let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({status: 'ok'});
  }, 2500)
});

Promise.all([p1, p2, p3]).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```
我们修改一下写法可以实现类似allSettled的效果。
```
Promise.all([
  p1.catch(err => err),
  p2.catch(err => err), 
  p3.catch(err => err)
]).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```
最终会执行到then方法里面，并且输出的值为
```
[
  {status: "fail"}
  {status: "ok"}
  {status: "ok"}
]
```

## 补充-async/await
async 函数返回的是一个 Promise 对象。async 函数（包含函数语句、函数表达式、Lambda表达式）会返回一个 Promise 对象，如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象

下面是async/await的一般用法
```
function delayFunc() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2333);
    }, 2000)
  });
}

async function testTwo() {
  console.log('start');
  let awaitValue = await delayFunc();
  console.log('end');

  return awaitValue;
}

testTwo().then((res) => {
  console.log(res);
});
```
上面是模拟一个异步请求，首先会先打印`start`，然后等待2秒过后会打印`end`，之后打印`2333`。上面局部变量awaitValue的值就是2333，最后return的时候使用Promise.resolve(2333)把它封装成了Promise对象。

注意上面的delayFunc函数中的代码可能会返回reject，如果我们把resolve(2333)改成reject(2333), 这时我们会发现console.log('end')，不会打印，相当于这之后的代码没有执行了。因为后面报错了，但是又没有捕获错误。

![](https://imgkr.cn-bj.ufileos.com/c0e1902d-7e13-434d-94cd-1a08184f41fe.png)

捕获错误可以这样，在testTwo()方法后面加catch语句
```
testTwo().then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
```
这样做之后不会在浏览器报错了，但是await后面的end还是不会打印，没有执行，所以我们一般这样做，在delayFunc方法后面直接写上catch，像这样：
```
let awaitValue = await delayFunc().catch((err) => {
  console.log(err);
});
```
这样就可以打印出后面的end了，表明后面的代码也执行了。

[promise与async await](https://juejin.im/post/5b7c021af265da43623c26c6)
[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)
[async 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/async.html)


## 参考资料
[面试问到 Promise，这样回答最完美了](https://mp.weixin.qq.com/s/9sLj0Ylii6mhkAiqiZpvzw)
[看这一篇就够了！浅谈ES6的Promise对象](https://www.jianshu.com/p/c98eb98bd00c)
[前端 Promise 常见的应用场景](https://juejin.im/post/5e9c03bcf265da47e22f2d01)
[你真的懂 Promise 吗？](https://mp.weixin.qq.com/s/zcZwMRg9nymQrp4n6FEldA)
