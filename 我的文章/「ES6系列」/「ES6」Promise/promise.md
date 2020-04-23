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
## 参考资料
[面试问到 Promise，这样回答最完美了](https://mp.weixin.qq.com/s/9sLj0Ylii6mhkAiqiZpvzw)
[看这一篇就够了！浅谈ES6的Promise对象](https://www.jianshu.com/p/c98eb98bd00c)
[前端 Promise 常见的应用场景](https://juejin.im/post/5e9c03bcf265da47e22f2d01)
