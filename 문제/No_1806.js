// const input = ['10 15','5 1 3 5 10 7 4 9 2 8']
// //const fs = require('fs');
// //const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const [N,S] = input[0].split(' ').map(Number);
// const sequence = input[1].split(' ').map(Number);

// const solution = () =>{
//      let partSum = 0;
//      let minLength = Infinity;
//      let left = 0, right=0;
//      for(left; left<N; left++){
//          while(partSum < S && right < N){
//              partSum += sequence[right++];
//          }
//          if(partSum >=S) minLength = Math.min(minLength,right-left);
//          partSum-=sequence[left];
//      }
     
// }
// solution();

