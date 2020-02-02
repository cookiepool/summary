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
默认情况下，constructor 方法返回实例对象 this ，但是也可以指定 constructor 方法返回一个全新的对象，让返回的实例对象不是该类的实例。比如以下代码
```
class Test {
  constructor() {
    return Object.create(null);
  }
}
```
上面的代码我们在new Test时返回的就不是实例对象本身了。

### 一些理解
这个一定要把JS的原型链搞清楚，我贴一张图：
![](https://imgkr.cn-bj.ufileos.com/012a2e9c-7027-4766-a88c-a6e628fc3185.png)

先来一串代码：
```
class A {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  printInfo() {
    console.log('输出两个值为：' + this.x + '----' + this.y);
  }
}

let a_instance = new A(26, 27);
a_instance.printInfo();

console.log(a_instance.hasOwnProperty('x'));
console.log(a_instance.hasOwnProperty('y'));
console.log(a_instance.hasOwnProperty('printInfo'));
console.log(a_instance.__proto__.hasOwnProperty('printInfo'));
```
输出的结果为：
```
输出两个值为：26----27
true
true
false
true
```
关于后面的为什么是true true false true这样的结果，我的理解是这样的。首先A这个类我们有个构造函数，里面有两个this赋值语句，在我们执行new A(26, 27)时，最终生成的a_instance这个对象上面就包含了x, y两个属性，所以前两个console.log输出为true。但是为什么a_instance.hasOwnProperty('printInfo')返回为false（表明不是a_instance上的属性，按照上面A类的定义的printInfo方法，他应该在A.prototype上面，也就是原型对象），但是我们却可以调用a_instance.printInfo()并且执行成功呢。因为JS的执行机制在这儿是按照原型链来查找的，a_instance上面虽然没得printInfo，但是a_instance.__proto__上面有，也就是A.prototype上面。这里捋一下查找流程：

- a_instance.printInfo();
- 首先查找a_instance对象本身，发现没有printInfo这个方法。
- 查找a_instance的__proto__，发现A.prototype，这个上面有printInfo方法，停止查找并执行。

如果我们去调用一个不存在的方法，它的流程就是这样
- a_instance.printIt();
- 首先查找a_instance对象本身，发现没有printIt这个方法。
- 查找a_instance的__proto__，发现A.prototype，这个上面没有printIt方法，继续。
- 查找A.prototype.__proto__，发现Object.prototype，这个上面没有printIt方法，继续。
- 查找Object.prototype.__proto__，发现没得这个属性，结束并抛出错误 `TypeError: a_instance.printIt is not a function`。


### 补充__proto__和prototype
1、JS里所有的对象都有proto属性(对象，函数)，指向构造该对象的构造函数的原型。
2、只有函数function才具有prototype属性。这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

## super()方法
super 这个关键字，既可以当做函数使用，也可以当做对象使用。这两种情况下，它的用法完全不同。

### 当作函数使用
我们主要使用super方法是在子类继承父类的时候，因为ES6规定子类的构造函数必须执行一次 super 函数，否则会报错。比如下面的继承代码：
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

class Dog extends Animal {
  animalLegs = 0;

  constructor(name, legs) {
    super(name);
    this.animalLegs = legs;
  }

  printInfo() {
    console.log(this.animalName);
    console.log(this.animalLegs);
  }
}

let newDog = new Dog('diandian', 4);
newDog.printInfo(); // 输出：diandian 4
```
- 注意：子类里面的构造函数的this关键字必须在调用super()方法过后使用，不然会报错。ES6的继承机制实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。
- 当你在子类里面声明了constructor函数，那么就必须显示的调用super()函数，不然会报错，如果你的子类默认没有声明constructor函数，那么JS会给你添加一个默认的。
- 当作函数使用时只能写在constructor里面。 

### 当作对象使用

- super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

上代码：
```
class A {
  constructor() {

  }

  say() {
    console.log('hahahahhah')
  }
}

class B extends A {
  constructor() {
    super()
  }

  sayA() {
    super.say();
  }
}

let instance = new B();
instance.sayA(); // hahahahhah
```

- 在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。

- 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
```
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
```