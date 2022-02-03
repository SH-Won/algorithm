// const input = '02:00'
// const input = '00:10'
const input = '20:20'
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();

const bfs = (seconds) =>{
    let count = Array.from({length:3601},()=>Array(2).fill(Infinity));
    count[0][0] = 0 , count[30][1] = 1;
    let queue = [[0,0],[30,1]];
    let minCount = Infinity , flag = false;
    while(queue.length){
        const [sec , isCook] = queue.shift();
        if(sec === seconds){
            flag = true;
            let c = count[sec][isCook];
            if(!isCook) c++;
            minCount = Math.min(minCount,c);
        }
        if(flag) continue;
        if(isCook && sec+30 <=3600 && count[sec+30][isCook] > count[sec][isCook] + 1){
            queue.push([sec+30,isCook]);
            count[sec+30][isCook] = count[sec][isCook] +1;
        }
        else if(!sec && !isCook && count[sec][1] > count[sec][0] +1){
            queue.push([sec,1]);
            count[sec][1] = count[sec][0] +1
        }
        const next = [sec+10,sec+60,sec+600];
        for(let i=0; i<next.length; i++){
            const nextSec = next[i];
            if(nextSec > seconds) continue;
            if(count[nextSec][isCook] > count[sec][isCook] +1 ){
                count[nextSec][isCook] = count[sec][isCook] +1;
                queue.push([nextSec,isCook]);
            }
        }
    }
    return minCount;
}
const solution = input =>{
    const [M,S] = input.split(':');
    const seconds = 60*M + 1*S;
    const answer = bfs(seconds);
    console.log(answer);
}
solution(input);

// for(let i=10; i<=3600; i+=10){
//     const [m,s] = [i/60 >>0 , i%60];
//     const time = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
//     console.log(time);
//     solution(time);
// }
