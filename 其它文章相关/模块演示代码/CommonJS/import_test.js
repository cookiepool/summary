const obj = require('./export_test.js');

console.log(obj.a); // 100
console.log(obj.b); // [1, 2, 3]
console.log(obj.c); // {name: 'lee',age: 25}
console.log(obj.add(2, 3));  // 5