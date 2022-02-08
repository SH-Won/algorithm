const input = ['3','1234 3412','1000 1','1 16']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getMinCommand = (A,B) =>{
    let visited = Array(10001).fill(false);
    const trans = ['D','S','L','R'];
    visited[A] = true;
    let queue = [[A,""]], idx =0;
    while(idx <queue.length){
        const [number,com] = queue[idx++];
        if(number === B) return com
        const next = [(number*2) % 10000 , number-1 === -1 ? 9999 : number-1, (number % 1000)*10 + Math.floor(number / 1000) , (number % 10) * 1000 + Math.floor(number / 10)];
        for(let i=0; i<next.length; i++){
           const nextNumber = next[i];
           if(visited[nextNumber]) continue;
           queue.push([nextNumber,com+trans[i]]);
           visited[nextNumber] = true;
        }
    }
}
const solution = input =>{
    let T = +input[0];
    let idx = 1;
    let answer = ''
    while(T--){
        const [A,B] = input[idx++].split(' ').map(Number);
        answer += `${getMinCommand(A,B)}\n`;
    }
    console.log(answer.trim());
}
solution(input);

