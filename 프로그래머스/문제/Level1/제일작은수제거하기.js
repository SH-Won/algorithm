function solution(arr) {
   arr.splice(arr.indexOf(Math.min(...arr)),1)
   
   let answer = arr;
    
   return answer.length ===0 ?[-1] :answer;
}