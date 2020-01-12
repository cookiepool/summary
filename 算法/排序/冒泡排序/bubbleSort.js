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
  // 判断数组长度
  if(arrTestAnotner.length <= 1) {
    return;
  }
  // 定义一个变量用来保存数组长度，避免每次循环都计算一次
  let arrLength = arrTestAnotner.length;
  for (let i = 0; i < arrLength; ++i) {
    // 定义一个提前退出循环的标识
    let flag = false;

    // arrLength - i - 1这里多减去一个1，是为了避免内层循环越界
    for (let j = 0; j < arrLength - i - 1; ++j) {
      countAnother++;
      // 大于为升序，小于为降序
      if (arrTestAnotner[j] < arrTestAnotner[j + 1]) {
        // 利用解构来赋值
        [arrTestAnotner[j], arrTestAnotner[j + 1]] = [
          arrTestAnotner[j + 1],
          arrTestAnotner[j]
        ];
        flag = true;
      }
    }
    
    // 如果内层循环了一圈都没数据交换，则表明确实是排好序了，所以结束外层循环
    if(!flag) break;
  }
}

bubbleSortAnother(arrTestAnotner);
console.log(arrTestAnotner);
console.log(countAnother);
