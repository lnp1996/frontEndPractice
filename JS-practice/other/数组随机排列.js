
// 所有可能排列的出现次数
let count = {
    '123': 0,
    '132': 0,
    '213': 0,
    '231': 0,
    '321': 0,
    '312': 0
  };
  
  for (let i = 0; i < 1000000; i++) {
    let array = [1, 2, 3];
    array = shuffle(array);
    count[array.join('')]++;
  }
  
  // 显示所有可能排列的出现次数
  for (let key in count) {
    console.log(`${key}: ${count[key]}`);
  }
  
/***
 * 数组随机排列
 * 
**/
  function shuffle(arr){
      let newArr = []
      for(let i=0;i<arr.length;i++){
  //         console.log(arr)
          let randomIndex = Math.floor(Math.random()*arr.length)
  //         console.log(randomIndex)
          newArr.push(arr[randomIndex])
  //         console.log(newArr)
          arr.splice(randomIndex,1)
          i--;
      }
      return newArr
  }