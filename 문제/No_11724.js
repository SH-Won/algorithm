// const input = [
// '6 5',
// '1 2',
// '2 5',
// '5 1',
// '3 4',
// '4 6'
// ]
const input =[
'6 8',
'1 2',
'2 5',
'5 1',
'3 4',
'4 6',
'5 4',
'2 4',
'2 3'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const info = Array.from({length:M},(_,i)=>input[i+1].split(' ').map(Number));


const solution = () =>{
    let count = 0;
    let visited = Array(N+1).fill(false);
    const edge = info.reduce((acc,cur)=>{
        const [from,to] = cur;
        acc[from].push(to);
        
        return acc;
    },Array.from({length:N+1},()=>[]));
    
    const bfs = (start) =>{
        visited[start] = true;
        let queue = [start];
        while(queue.length){
            const current = queue.shift();
            for(let i=0; i<edge[current].length; i++){
                const next = edge[current][i];
                if(visited[next]) continue;
                queue.push(next);
                visited[next] = true;
            }
        }
    }
    for(let i=1; i<=N; i++){
        if(!visited[i]){
            bfs(i);
            count++;
        }
    }
     console.log(count);
}
solution();