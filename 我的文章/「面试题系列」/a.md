

```
    const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];
    // concat + 递归
    function flat(arr) {
      let arrResult = [];
      arr.forEach((item) => { // 注意，这儿一定要用箭头函数，用function声明的函数的话，你下面的arguments.callee指向的就不是flat了，而是这个地方的回调函数。
        if (Array.isArray(item)) {
          arrResult = arrResult.concat(arguments.callee(item));   // 递归
          // 或者用扩展运算符
          // arrResult.push(...arguments.callee(item));
        } else {
          arrResult.push(item);
        }
      });
      return arrResult;
    }
    flat(arr)
```



# 展开一层数组的方案
- concat + ...展开运算符

```
let arr = [12, 13, 14, 15, [16, 17, [18, 19]]];
console.log([].concat(...arr));
console.log([].concat(arr));
console.log([...arr]);
```
注意上面输出的结果的不同
![](https://imgkr.cn-bj.ufileos.com/b6a0420c-de26-4ec6-b04f-8fff7d2d8d1e.png)

- concat + apply

```
let arr2 = [12, 13, 14, 15, [16, 17, [18, 19]]];

console.log(Array.prototype.concat.apply(arr2));
console.log(Array.prototype.concat.apply([], arr2));
console.log([].concat.apply([], arr2));
```
输出结果
![](https://imgkr.cn-bj.ufileos.com/e3cf64d0-0258-4f02-8e27-3420ef6b65fd.png)

# 使用栈的思想
```
let arr5 = [1, 2, 3, [4, 5, [6, 7, [9, 10]]], 'haoo', {name: 'lee'}];

function flatArray5(data) {
  let result = [];

  let stack = [].concat(data);

  while(stack.length > 0) {
    const value = stack.pop();
    if(Array.isArray(value)) {
      stack.push(...value);
    }else {
      result.unshift(value);
    }
  }

  return result;
}

console.log(flatArray5(arr5));
```
# 通过传入参数来控制降维层数
```
// 通过传入参数来控制降维层数
let arr6 = [1, 2, 3, [4, 5, [6, 7, [9, 10]]], 'haoo', {name: 'lee'}];

function flatArray6(data, num = 1) {
  if(typeof num !== 'number') {
    return data;
  }

  return num > 0 ?
    data.reduce((acum, current, currentIndex, arrSelf) => {
      return acum.concat(Array.isArray(current) ? flatArray6(current, num - 1) : current);
    }, []) : data.slice();
}

console.log(flatArray6(arr6, Infinity));
```

- Infinity - 1还是等于Infinity。
- 如果传入的参数是小于1的负整数，则直接不降维返回原数组。

# 添加到数组原型链上
```
// 在原型链上实现flatArray
let arr7 = [1, 2, 3, [4, 5, [6, 7, [9, 10]]], 'haoo', {name: 'lee'}];

Array.prototype.flatArray = function(num = 1) {
  if(!Number(num) || Number(num) <= 0) {
    return this;
  }

  let arr = this.slice();

  while(num > 0) {
    if(arr.some(value => Array.isArray(value))) {
      arr = Array.prototype.concat.apply([], arr);
    }else {
      break;
    }
    num--;
  }

  return arr;
}

console.log(arr7.flatArray(Infinity))
```
# 考虑稀疏数组（空位情况）

JS自带的flat数组可以去除数组里面的空位，ES5 大多数数组方法对空位的处理都会选择跳过空位包括：forEach(), filter(), reduce(), every() 和 some() 都会跳过空位。

所以呢实现跳过空位我们使用上面的reduce方法来实现就可以了

```
// 在原型链上实现flatArrayEmpty，忽略空位
let arr8 = [1, 2, , , 3, [4, 5, [6, 7, [9, 10]]], 'haoo', {name: 'lee'}];

Array.prototype.flatArrayEmpty = function(num = 1) {
  if(!Number(num) || Number(num) <= 0) {
    return this;
  }

  if(num > 0) {
    return this.reduce((acum, curr, currIdx, arrSelf) => {
      return acum.concat(Array.isArray(curr) ? curr.flatArrayEmpty(--num) : curr);
    }, [])
  }else {
    return this.slice();
  }
}

console.log(arr8.flatArrayEmpty(Infinity))
```