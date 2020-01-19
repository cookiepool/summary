# 开始
这个考察的就是对filter、map这些函数以及对parseInt、parseFloat这些方法的掌握程度。我们先举一个例子看看输出。

```
let arr = [1, 3, 5];
console.log(arr.map(parseInt)); // 输出：(3) [1, NaN, NaN]
console.log(arr.filter(parseInt)); // 输出：[1]
console.log(arr.forEach(parseInt)); // 输出：undefined
```

# parseInt、parseFloat

## paserInt
这个方法可以有两个参数。
```
parseInt(string, radix)
```
- string 表示你要转换的数。如果被解析参数的第一个字符无法被转化成数值类型，则返回 NaN。
- radix 表示你当前要转换的数的进制(2-36之间，没在生范围返回NaN，0和undifined要注意下，见下面处理)，如果你不写这个参数，默认是10进制，这儿注意下，这个参数是声明你要转换的数的进制，而不是要把数的结果转成你指定的进制，不能搞混淆。parseInt最终转换的结果都是十进制数。

![](https://imgkr.cn-bj.ufileos.com/3cb99c16-659c-4ae3-96d9-d62e646a23f3.png)

在 radix 为 undefined，或者 radix 为 0 或者没有指定的情况下，JavaScript 作如下处理：

- 如果字符串 string 以"0x"或者"0X"开头, 则 radix 是 16 (16进制).
- 如果字符串 string 以"0"开头, radix 是8（八进制）或者10（十进制），具体值由实现环境决定。ECMAScript 5 规定使用 10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出 radix 参数的值
- 如果字符串 string 以其它任何值开头，则 radix 是 10 (十进制)

## paserFloat
```
parseFloat(string)
```

这个就没有parseInt那么复杂了，将string转换为浮点数，转不了直接NaN。

# 最后
明白了这个过后，我们再来看前面的那几个的输出为什么会这样
```
let arr = [1, 3, 5];
console.log(arr.map(parseInt)); // 输出：(3) [1, NaN, NaN]
console.log(arr.filter(parseInt)); // 输出：[1]
console.log(arr.forEach(parseInt)); // 输出：undefined
```
map、filter、forEach、reduce这几个都是从ES5继承过来的方法。
这里我以map为例子来进行分析
```
parseInt(1, 0) // radix为0以十进制来操作，得到1
parseInt(3, 2) // radix为2，满足2-36的要求，但是二进制里面不存在3，转不了，返回NaN
parseInt(5, 3) // radix为3，满足2-36的要求，但是三进制里面不存在3，转不了，返回NaN
```
所以最终返回的[1, NaN, NaN]

