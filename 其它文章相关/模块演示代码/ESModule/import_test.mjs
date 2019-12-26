// import { a, b, add, c } from './export_test.mjs';
// console.log(a); // 100
// console.log(b); // [1, 2, 3]
// console.log(c); // {name: 'lee',age: 25}
// console.log(add(2, 3));  // 5

// import {a, reduce} from './export_test.mjs';

import * as Test from './export_test.mjs';
import Add from './export_test.mjs';

console.log(Test.a);
console.log(Test.reduce(5, 2));
// console.log(Add(5, 2));
console.log(Add)