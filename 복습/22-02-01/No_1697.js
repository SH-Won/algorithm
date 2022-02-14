// const input = '5 17'
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const solution = (input) =>{
    const [N,K] = input.split(' ').map(Number);
    let times = Array(100001).fill(Infinity);
    times[N] = 0;
    let queue = [N];
    while(queue.length){
        const cur = queue.shift();
        if(cur === K) return console.log(times[cur]);
        let nextPos = [cur+1,cur-1,cur*2];
        for(let i=0; i<nextPos.length; i++){
            const next = nextPos[i];
            if(next < 0 || next > 100000 || times[next] <= times[cur] + 1) continue;
            queue.push(next);
            times[next] = times[cur] + 1;
        }
    }
}
solution(input);