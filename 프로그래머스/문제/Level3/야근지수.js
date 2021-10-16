const solution = (n,works) =>{
   const sum = works.reduce((acc,cur)=>acc+=cur,0);
   if(sum <=n) return 0;
   works.sort((a,b)=>a-b);
   while(n){
       const max = works[works.length-1];
       for(let i=works.length-1; i>=0; i--){
           if(!n) break;
           if(works[i] >= max){
               works[i]--;
               n--
           }
       }
   }
   return works.reduce((acc,cur)=>acc+=(cur**2),0);
}
console.log(solution(1,[2,1,2]))
