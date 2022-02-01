const input = [5,17]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const solution = (input) =>{
    const [N,K] = input;
    let count = Array(100001).fill(-1);
    let times = Array(100001).fill(Infinity);
    let flag = false;
    count[N] = 1 , times[N] = 0;
    let queue = [N];
    while(queue.length){
        const cur = queue.shift();
        if(cur === K)  flag = true;
        if(flag) continue;
        const nextPos = [cur+1,cur-1,cur*2];
        for(let i=0; i<nextPos.length; i++){
            const next = nextPos[i];
            if(next < 0 || next > 100000 ) continue;
            if(count[next] === -1){
                times[next] = times[cur] + 1;
                queue.push(next);
                count[next] = count[cur];
            }
            else if(times[next] === times[cur]+1) count[next] += count[cur];
        }
    }
    console.log(`${times[K]}\n${count[K]}`)
}
solution(input);

