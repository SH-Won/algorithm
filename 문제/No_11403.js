const input = ['3','0 1 0','0 0 1','1 0 0'];
// const input = [
// '7',
// '0 0 0 1 0 0 0',
// '0 0 0 0 0 0 1',
// '0 0 0 0 0 0 0',
// '0 0 0 0 1 1 0',
// '1 0 0 0 0 0 0',
// '0 0 0 0 0 0 1',
// '0 0 1 0 0 0 0',
// ]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input => {
    const N = +input[0];
    const graph = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    
    // floyd - warshall;
    for(let i=0; i<N; i++){
        for(let j=0; j<N; j++){
            for(let k=0; k<N; k++){
                if(graph[j][i] && graph[i][k]) graph[j][k] = 1;
            }
        }
    }
    console.log(graph.map(row => row.join(' ')).join('\n'))
}
solution(input);