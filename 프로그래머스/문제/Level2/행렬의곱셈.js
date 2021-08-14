const arr1 = [[1, 4], [3, 2], [4, 1]];
const arr2 = [[3, 3], [3, 3]];
// (3x2 행렬) x (2x2 행렬) = (arr1.length x arr2[0].length 행렬); 
// 1 4   3 3
// 3 2   3 3
// 4 1
console.log(solution(arr1,arr2))
function solution(arr1,arr2){
   let [row,column] = [arr1.length,arr2[0].length];
   let answer = Array.from({length:row},()=>Array(column).fill(0));

   for(let i=0; i<row; i++){
       for(let j=0; j<column; j++){
           for(let k=0; k<arr2.length; k++){
               answer[i][j] += (arr1[i][k] * arr2[k][j]);
           }
       }
   }
   return answer;
}