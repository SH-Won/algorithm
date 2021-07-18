const fs = require('fs');
const [N,M] = fs.readFileSync('/dev/stdin').toString().split(' ').map(num=> parseInt(num));
let result ='';
let output =[];
let visited = Array(N);

function dfs(idx,cnt){
    if(cnt === M){
        result += `${output.join(' ')}\n`;
        return
    }

    for(let i=idx; i<N; i++){
        if(visited[i]===true) continue;
        visited[i]=true;
        output.push(i+1);
        dfs(i,cnt+1);
        output.pop();
        visited[i]=false;
        
    }
}
dfs(0,0);
console.log(result.trim());