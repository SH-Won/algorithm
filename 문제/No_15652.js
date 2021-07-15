// const fs = require('fs');
// const [N,M]= fs.readFileSync('/dev/stdin').toString().split(' ').map(num=> parseInt(num));

const [N,M] =[3,3];
let result ='';
let output =[];

function dfs(idx,cnt){
    if(cnt === M){
        result += `${output.join(' ')}\n`;
        return
    }
    for(let i=idx; i<N; i++){
        
        output.push(i+1);
        dfs(i,1+cnt);
        output.pop();

    }
}
dfs(0,0);
console.log(result.trim());