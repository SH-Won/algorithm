function solution(lottos,win_nums){
   const rank = [6,6,5,4,3,2,1];
   let zeroCount =0;
   let correctCount=0;
   lottos.forEach(num=>
       num === 0 ? zeroCount++ : win_nums.indexOf(num) !==-1 ? correctCount++ : correctCount
   )
   const maxCount = zeroCount + correctCount;
   return [rank[maxCount],rank[correctCount]];
}