# 解构赋值
## 数组解构

- 基本解构
```
let arr = ['Lee', 12, true];
let [name, age, boy] = arr; // 解构就相当于let name = arr[0];
console.log(name, age, boy);
```

- 省略解构
```
// 如果你想省略，要这样才行
let arr = ['Lee', 12, true];
let [name, , boy] = arr;
console.log(name, boy);
```

- 预留默认值
在数组的解构赋值表达式中可以为数组的任意位置添加默认值，当指定位置的属性不存在或其值为 undefined 时使用默认值。
```
let arr = ['lee', 12, undefined];
let [name = 'haoo', age = 25, boy = true, weight = 56] = arr;
console.log(name, age, boy, weight);
```

- 嵌套的数组解构
```
let arr = ['lee', [90, 98, 92]];
let [name, [chinese, math, english]] = arr;
console.log(name, chinese, math, english);

// 可以省略
let [name, [, math, english]] = arr;
console.log(name, math, english);
```

- 数组不定元素解构
```
let arr = ['red', 'green', ['blue', 'pink']];
// 其实这儿结合了展开语法
let [first, ...other] = arr;
console.log(first); // red
// 不会扁平化
console.log(other); // ['green', ['blue', 'pink']]
```

## 对象解构
- 基本解构
```
const person = {
  name: 'jsPool',
  country: 'China',
  sexual: 'female',
  age: 38
};
let {age, sexual} = person;
console.log(age); // 20
console.log(sexual); // female
```

- 解构时取别名
```
let me = {
  name: 'lee',
  age: 26
};
let {name: firstName, age: myAge} = me;
console.log(firstName, myAge);
```

- 解构时赋予默认值
```
let me = {
  name: 'lee',
  age: 26,
  sexual: undefined
};
let {name = 'Lee', age = 27, sexual = 'male', weight = 56} = me;
console.log(name, age, sexual, weight);
```

- 对象的嵌套解构
```
let student = {
  name:'jsPool',
  age:20,
  scores:{
    math:95,
    chinese:98,
    english:93
  }
};
let {name, age, scores: {
  math,
  english,
  chinese
}} = student;
console.log(name, age, math, english, chinese);
```

# 展开语法

展开语法使用...三个点来操作，跟函数的剩余参数一样，都是三个点，但是用法不一样，不可混淆。

- 替换apply的调用
```
// 替代apply
let arr = [55, 100, 48, 32, 89];
let result = Math.min.apply(null, arr);
console.log(result);

// 使用...
let arr = [55, 100, 48, 32, 89];
let result = Math.min(...arr);
console.log(result);
```

- 代替concat
```
// 代替concat
let arr = [1, 2, 3];
let result = [4, 5, 6].concat(arr);
console.log(result);

let arr = [1, 2, 3];
let result = [4, 5, 6, ...arr];
console.log(result);

// 可以灵活的放到头部
let arr = [1, 2, 3];
let result = [...arr, 4, 5, 6];
console.log(result);
```

- 转换类数组对象
```
// 转换类数组对象
// es5
let fn = function() {
  console.log(Array.prototype.slice.apply(arguments));
}
fn(1,2,3)

//扩展运算符
let fn = function() {
  console.log([...arguments]);
}
fn(1,2,3)
```

> 展开语法其实也可以展开对象，但是还是起草方案，还没成为标准

# 函数的剩余参数
函数的剩余参数也是...，注意区分

- 基本用法
```
function fn(a, b, ...args) {
  console.log(a, b, args);
  console.log(arguments);
}
fn(1, 2, 3, 4, 5);
```
输出结果：
![2019-12-27_151440.png](https://i.loli.net/2019/12/27/XHwzMbyFm1QYA2C.png)

> 注意：剩余参数只能写在函数参数的最后，不能写在前面或者中间。