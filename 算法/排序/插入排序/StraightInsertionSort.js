let arr = [12, 12, 89, 33, 6, 8, 99, 23];

function InsertionSort(arr) {
  let arrLength = arr.length;

  if(arrLength <= 1) {
    return;
  }

  // 我们把左边当作已排好的序列，右边当作没拍好的序列，每一次内循环下来就会做好一次左边部分的排序（升序）
  for (let i = 1; i < arrLength; i++) {
    // 选出一个值
    let value = arr[i];
    let j = i - 1;
    for(; j >= 0; j--) {
      // 大于升序 小于降序
      if(arr[j] < value) {
        arr[j + 1] = arr[j]; 
      }else {
        break;
      }
    }
    arr[j + 1] = value;
  }
}

InsertionSort(arr);
console.log(arr);