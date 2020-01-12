let arr = [12, 12, 89, 33, 6, 8, 99, 23];

function SelectSort(arr) {
  let arrLength = arr.length;

  if(arrLength <= 1) {
    return;
  }

  for(let i = 0; i < arrLength - 1; i++) {
    // 定义一个变量用来保存找到的最大值或最小值的索引
    let index = i;
    for(let j = i + 1; j < arrLength; j++) {
      // 大于 升序，小于 降序
      if(arr[index] > arr[j]) {
        index = j;
      }
    }
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }
}

SelectSort(arr);
console.log(arr);