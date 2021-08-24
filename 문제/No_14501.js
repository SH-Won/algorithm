//const input =['10','5 50','4 40','3 30','2 20','1 10','1 10','2 20','3 30','4 40','5 50']
//const input =['10','5 10','5 9','5 8','5 7','5 6','5 10','5 9','5 8','5 7','5 6']
//const input =['7','3 10','5 20','1 10','1 20','2 15','4 40','2 200']
const input =['10','1 1','1 2','1 3','1 4','1 5','1 6','1 7','1 8','1 9','1 10']
// const fs = require('fs');
// const input= fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const schedule = Array.from({length:input.length},(_,i)=>input[i].split(' ').map(num =>+num));

console.log(schedule);

let answer = 0;

dfs(1,0);
console.log(answer);

function dfs(days,cost){

    // if(days === schedule[0][0]+1){
    //     cost >answer ? answer=cost : answer;
    //     return
    // }
    if(days >= schedule[0][0]+1){
        cost > answer ? answer=cost : answer;
          return
    }

    for(let i=days; i<=schedule[0][0]; i++){
         const [costDays,curCost] = schedule[i];
         const [nextdays,nextCost] =[costDays+i,curCost+cost]
        //  if(nextdays > schedule[0][0]+1 ){
        //      cost > answer ? answer=cost : answer;
        //      continue;
        //  }
        nextdays <= schedule[0][0] + 1 ?
         dfs(nextdays,nextCost) :
         cost > answer ? answer=cost : answer;
    }

}

// 10 10 10 0  0  0  0
// 10 20 20 20 20 20 20
//  