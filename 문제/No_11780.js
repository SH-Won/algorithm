const input = ['5','14','1 2 2','1 3 3','1 4 1','1 5 10','2 4 2','3 4 1','3 5 1','4 5 3','3 5 10','3 1 8','1 4 2','5 1 7','3 4 2','5 2 4'];

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const solution = input =>{
    const n = +input[0];
    const m = +input[1];
    // const edge = Array.from({length:n+1},()=>[]);
    const dist = Array.from({length:n+1},()=>Array(n+1).fill(Infinity));
    const next = Array.from({length:n+1},()=>Array(n+1).fill(-1));
    for(let i=2; i<2+m; i++){
        const [from,to,cost] = input[i].split(' ').map(Number);
        dist[from][to] = Math.min(dist[from][to],cost);
        dist[from][from] = 0;
        dist[to][to] = 0;
        next[from][to] = from;
    }
    for(let i=1; i<=n; i++){
        for(let j=1; j<=n; j++){
            for(let k=1; k<=n; k++){
                if(dist[j][k] > dist[j][i] + dist[i][k]){
                    dist[j][k] = dist[j][i] + dist[i][k];
                    next[j][k] = next[i][k];
                }
            }
        }
    }
    let answer = {dist:'', path:''};
    for(let i=1; i<=n; i++){
        for(let j=1; j<=n; j++){
            if(dist[i][j] === Infinity) answer.dist+='0 ';
            else answer.dist+=`${dist[i][j]} `
        }
        answer.dist+='\n';
    }
    for(let i=1; i<=n; i++){
        for(let j=1; j<=n; j++){
            if(next[i][j] === -1) answer.path += `0\n`;
            else{
                const arr = [j];
                let pre = next[i][arr[arr.length-1]];
                while(pre !== -1){
                    arr.push(pre);
                    pre = next[i][arr[arr.length-1]];
                }
                answer.path += `${arr.length} ${arr.reverse().join(' ')}\n`;
            }
        }
    }
    console.log(answer.dist + answer.path.trim());
}
solution(input);