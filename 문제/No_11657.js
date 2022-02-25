// const input = ['3 4','1 2 4','1 3 3','2 3 -1','3 1 -2']
// const input = ['3 4','1 2 4','1 3 3','2 3 -4','3 1 -2']
// const input = ['3 2','1 2 4','1 2 3']
// const input = ['3 2','2 3 -2','3 2 -2']; // -1 -1
// const input = ['4 3','1 2 1','3 4 -1','4 3 -1'] //  1 -1 -1;
// const input = ['2 3','1 2 3','1 2 2','1 2 1'] // 1
// const input = ['3 1','2 3 -10000']; // -1 -1 
// const input = ['4 5','1 4 3','4 2 4','2 3 -4','3 4 -2','4 3 3']; // -1
// const input = ['3 2','2 3 -1','3 2 -1'] //  -1 -1
// const input = ['3 3','1 2 3','2 1 -1000','2 1 5']; //  -1
const input = ['2 2','1 2 -1','2 1 -1']; // -1

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const bellmanFord = (edge) =>{
    const n = edge.length;
    const dist = Array(n).fill(Infinity);
    dist[1] = 0;
    for(let i=0; i<n; i++){
        for(let j=1; j<n; j++){
            for(const {to,distance} of edge[j]){
                if(dist[to] > dist[j] + distance){
                    if(i === n-1) return -1;
                    dist[to] = dist[j] + distance;
                }
            }
        }
    }
    return dist;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const edge = Array.from({length:N+1},()=>[]);
    for(let i=1; i<1+M; i++){
        const [from,to,distance] = input[i].split(' ').map(Number);
        edge[from].push({to,distance});
    }
    const dist = bellmanFord(edge);
    if(dist === -1) return console.log(-1);
    let answer = '';
    for(let i=2; i<dist.length; i++){
        if(dist[i] == Infinity) answer +='-1\n';
        else answer +=`${dist[i]}\n`;
    }
    console.log(answer.trim());
}
solution(input);