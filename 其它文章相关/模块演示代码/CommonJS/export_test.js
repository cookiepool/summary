let a = 100;
let b = [1, 2, 3];
let c = {
  name: 'lee',
  age: 25
};

function add(a, b) {
  return a + b;
}

// 三种导出方法，取其中一个即可
/* 第一种导出方法 */
// module.exports = {
//   a,
//   b,
//   c,
//   add
// }

/* 第二种导出方法 */
// module.exports.a = a;
// module.exports.b = b;
// module.exports.c = c;
// module.exports.add = add;

/* 第三种导出方法 */
// exports.a = a;
// exports.b = b;
// exports.c = c;
// exports.add = add;

// 混合使用
exports.a = a;
exports.b = b;
module.exports.c = c;
module.exports.add = add;