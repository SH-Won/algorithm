
let lottos =[0, 0, 0, 0, 0, 0];
let win_nums =[38, 19, 20, 40, 15, 25]

console.log(solution(lottos,win_nums));
function solution(lottos,win_nums){
let rank = [6,6,5,4,3,2,1];
let zeroCount = 0;
let array = lottos.reduce((acc,cur,index,array)=>{
    cur === 0 ? zeroCount++ : zeroCount;
    let isExist = win_nums.indexOf(cur);
    if(isExist === -1){
        acc.push(cur);
    }
    
    return acc;

},[])

let correctCount = lottos.length - array.length;
let maxCount = correctCount +zeroCount;

return [rank[maxCount],rank[correctCount]];

}


