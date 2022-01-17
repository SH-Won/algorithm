// const input = [10,1,10,2,1];
// const input = [100,2,1,1,0]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

const getMinCount = (info) =>{
    const [F,S,G,U,D] = info;
    let count = Array(F+1).fill(Infinity);
    count[S] = 0;
    let queue = [S];
    while(queue.length){
        const cur = queue.shift();
        if(cur === G) return count[G];
        if(cur+U <= F && count[cur+U] > count[cur] + 1){
            count[cur+U] = count[cur] + 1;
            queue.push(cur+U);
        }
        if(cur-D >= 1 && count[cur-D] > count[cur] + 1){
            count[cur-D] = count[cur] + 1;
            queue.push(cur-D);
        }
    }
    return 'use the stairs';
}
const solution = (input) =>{
    const info = input.map(Number);
    return console.log(getMinCount(info));
}
solution(input);