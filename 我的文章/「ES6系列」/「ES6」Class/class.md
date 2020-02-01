# 简介
在ES5规范中，不存在类的说法，我们的实例都是通过构造函数来实现。不像C++、java可以声明一个类，然后通过new运算符来声明一个实例。ES6标准发布后，javascript也可以使用class来声明类，通过extends来实现继承。但是ES6的class的本质只是一个语法糖，javascript的底层实现并没有变。

# 开始
## ES5写法
```
// ES5写法
function Person(sex) {
  this.sex = sex;
}

Person.prototype.say = function() {
  console.log('大家好！');
}

Person.prototype.printInfo = function() {
  console.log(`你的性别是${this.sex}`);
}

let onePerson = new Person('男');
onePerson.say();
onePerson.printInfo();
```

## ES6写法
```
// ES6写法
class Person {
  constructor(sex) {
    this.sex = sex;
  }

  say() {
    console.log('大家好！');
  }
  printInfo() {
    console.log(`你的性别是${this.sex}`);
  }
}

let onePerson = new Person('男');
onePerson.say();
onePerson.printInfo();
```
可以看出，ES6的类，完全可以看作构造函数的另一种写法。

## constructor方法
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
```
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```
## 取值函数（getter）和存值函数（setter）
...........

## 定义实例属性
我们定义实例属性一般是定义在this上面，比如上面的 `this.sex = sex` 。如果我们打印sex
```
console.log(onePerson.sex);
```
它会输出 `男`。

我们也可以把实例属性写在类的顶部，去掉this关键词。像这样
```
class Animal {
  animalName = '';

  constructor(animalName) {
    this.animalName = animalName;
  }

  printInfo() {
    console.log(this.animalName);
  }
}

let animal = new Animal('dog');
animal.printInfo();
```
- 函数里面一定要加上this关键字