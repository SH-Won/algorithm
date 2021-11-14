//  const input = ['10','1 2 0 1 3 2 1 5 4 2']
//const input = ['3','0 1 0']; // ans -1;
// const input = ['5','0 0 0 1 0']
const input = ['1','0']
// const input = ['5','1 0 0 1 0'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const A = input[1].split(' ').map(Number);

const solution = () =>{
    let dp = Array(N).fill(Infinity);
    dp[0] = 0;
    let queue = [[0,0]];
    let idx = 0;
    while(idx < queue.length){
        const [current,time] = queue[idx++];
        const jump = A[current];
        if(current === N-1) return console.log(time);
        for(let next=current+jump; next>current; next-- ){
            if(next >= N || dp[next] <= time+1) continue;
            
            dp[next] = time+1;
            queue.push([next,time+1]);
        }
    }
    console.log(-1);
}
solution();