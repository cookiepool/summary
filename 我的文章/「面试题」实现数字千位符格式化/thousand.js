// 方法1
let num = 456021354125.05;
console.log(num.toLocaleString());

// 封装一个方法
function toThousandNumber(value) {
  // 进来先进行类型检测，不是数字类型直接返回
  if(typeof value !== 'number') {
    return;
  }

  // 把number类型转换为string类型，注意，这个转换会去掉小数点后面的.00，如果小数点后面有数字不会去掉
  let num = (value).toString();
  // 定义一个保存结果的变量
  let result = '';

  // 循环进行截取、拼凑。
  while(num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  // 截取到最后肯定有部分的数字长度会小于3，我们也需要拼凑上去，
  // 这儿即使你传数字零进来也没问题，toString()把0转换成了'0'，在if('0')中是会判断为true的
  if(num) {
    result = num + result;
  }

  // 返回结果
  return result;
}

console.log(toThousandNumber(6021354125.06));

// 使用正则表达式
let testNum = 5415421445.0855;
let regExp = new RegExp(/\B(?=(\d{3})+(?!\d))/g);
console.log(testNum.toString().replace(regExp, ','));

let regExpFinal = new RegExp(/(?<!\.\d*)\B(?=(\d{3})+(?!\d))/g);
console.log(testNum.toString().replace(regExpFinal, ','));

