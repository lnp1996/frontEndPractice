/**
 * 找出最大子段和以及最大子数组
 * 1.最简单的思路就是暴力求解，找以每个值开头的最大值
 * 2.我们发现正确的子数组都有一个共同的特点：
 *      以正数开始，且之前的所有数构成的数组的和为负数，
 *      因此每次子数组的和为负数，就清零。
 * @param 
**/
// function getMaxSubSum(arr){
//     let maxSum = 0;
//     for(let i= 0; i<arr.length;i++){
//         let tempSum = 0;
//         for(let j = i;j < arr.length;j++){
//             tempSum += arr[j]
//             maxSum = Math.max(tempSum,maxSum)
//         }
//     }
//     return maxSum
// }

// 2.
function getMaxSubSum(arr){
    let maxSum = 0;
    let subSum = 0; 
    for(let item of arr){
        subSum += item
        maxSum = Math.max(subSum,maxSum)
        if(subSum<0) subSum = 0
    }
    return maxSum
}

console.log( getMaxSubSum([-1, 2, 3, -9]) ); // 5
console.log( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
console.log( getMaxSubSum([-2, -1, 1, 2]) ); // 3
console.log( getMaxSubSum([1, 2, 3]) ); // 6
console.log( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100

