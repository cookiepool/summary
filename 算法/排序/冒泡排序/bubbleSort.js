// 冒泡排序
// 错误写法一
// function bubbleSort(arr) {
//   for(let i = 0; i < arr.length; i++) {
//     for(let j = i; j < arr.length - 1; j++) {
//       if(arr[j] > arr[j + 1]) {
//         let temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//       }
//     }
//   }
// }

// let arr = [12, 89, 33, 6, 8, 99, 23];
// bubbleSort(arr);
// console.log(arr);

// 错误写法二
let arrTest = [12, 12, 89, 33, 6, 8, 99, 23];
let count = 0;
function bubbleSort(arrTest) {
  for (let i = 0; i < arrTest.length - 1; i++) {
    for (let j = i + 1; j < arrTest.length; j++) {
      count++;
      if (arrTest[i] > arrTest[j]) {
        let temp = arrTest[i];
        arrTest[i] = arrTest[j];
        arrTest[j] = temp;
      }
    }
  }
}
bubbleSort(arrTest);
console.log(arrTest);
console.log(count);

let arrTestAnotner = [12, 12, 89, 33, 6, 8, 99, 23];
let countAnother = 0;
function bubbleSortAnother(arrTestAnotner) {
  let len = arrTestAnotner.length - 1;
  for (let i = 0; i < len; ++i) {
    for (let j = 0; j < len - i; ++j) {
      countAnother++;
      if (arrTestAnotner[j] > arrTestAnotner[j + 1]) {
        [arrTestAnotner[j], arrTestAnotner[j + 1]] = [
          arrTestAnotner[j + 1],
          arrTestAnotner[j]
        ];
      }
    }
  }
}

bubbleSortAnother(arrTestAnotner);
console.log(arrTestAnotner);
console.log(countAnother);
