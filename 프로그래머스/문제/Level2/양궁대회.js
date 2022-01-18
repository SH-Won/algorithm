const solution = (n,info) =>{
    let diff = -1;
    let answer = Array(11).fill(0);
    let ryan = Array(11).fill(0);
    const shootBow = (arrowCount,count) =>{
         if(count === 11){
             let a=0 ,r = 0;
             for(let i=0; i<11; i++){
                 if(info[i] === 0 && ryan[i] === 0) continue;
                 if(info[i] >= ryan[i]) a += (10-i);
                 else r+=(10-i);
             }
             if(a >= r) return;
             if(r-a >= diff){
                 let flag = true;
                 if(diff === r-a){
                     for(let i=10; i>=0; i--){
                         if(answer[i] === ryan[i]) continue;
                         if(answer[i] > ryan[i]) flag = false;
                         break;
                     }
                 }
                 diff = r-a;
                 if(flag) ryan.forEach((num,i)=> answer[i] = num);
             }
             return;
         }
         for(let i=arrowCount; i>=0; i--){
            ryan[count] = i;
            shootBow(arrowCount-i,count+1);
         }
    }
    shootBow(n,0);
    return diff === -1 ? [-1] : answer;
}
// console.log(solution(5,[2,1,1,1,0,0,0,0,0,0,0]))
// console.log(solution(1,[1,0,0,0,0,0,0,0,0,0,0]))
console.log(solution(9,[0,0,1,2,0,1,1,1,1,1,1]))
// console.log(solution(10,[0,0,0,0,0,0,0,0,3,4,3]))