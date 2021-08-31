//const input = ['5 4','3 1','3 2','4 3','5 3']
//const input =['12 11','2 1','3 2','4 2','5 1','2 5','6 7','7 8','8 9','9 10','10 11','11 12'];
//const input =['6 5','1 2','2 3','3 1','4 5','5 6'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num => +num);
const network = Array.from({length:N+1},()=>[]);
let visited = Array(N+1).fill(false);
for(let i=0; i<M; i++){
    const [com1,com2] = input[i+1].split(' ').map(num =>+num);
    network[com2].push(com1);
}
let count = Array(N+1).fill(0);

for(let i=1; i<=N; i++){
    bfs(i);
    visited.fill(false);
}
//console.log(network);
//console.log(count);
let max = Math.max(...count);
let answer =""
for (let i=1; i<count.length; i++){
    if(count[i] === max){
        answer+=`${i} `
    }
}
console.log(answer.trim());
function bfs(start){
    let queue = [start];
    count[start] = 1;
    visited[start] = true;
    if(network[start].length === 0) return;
    while(queue.length){
        const computer = queue.shift();
        
        for(let i=0; i<network[computer].length; i++){
            const nextComputer = network[computer][i];
            if(!visited[nextComputer]){
                queue.push(nextComputer);
                //만약 1->4,5 
                //     4-> 5,6
                //     5-> 6
                visited[nextComputer] = true;

                count[start]++;
            }
        }
    }

}