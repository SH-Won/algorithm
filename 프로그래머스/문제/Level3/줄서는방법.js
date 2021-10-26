const solution =(n,k) =>{
   let number = Array(n).fill(1).map((num,index) => num+index);
   let answer = Array(n);
   let index = 0;
   k--;
   while(n--){
      let nth = 1;
      for(let i=1; i<=n; i++){
          nth*=i;
       }
    //    console.log(nth);
      const current = Math.floor( k / nth) %  number.length;
    //   k-=current;
      answer[index] = number[current];
      //console.log(number[current]);
      number.splice(current,1);
      index++;
   }
   return answer;
}
console.log(solution(4,5));
// 1 2 3 4  
// 1 2 4 3
// 1 3 2 4
// 1 3 4 2  3번째
// 1 4 2 3  4번째
// 1 4 3 2
