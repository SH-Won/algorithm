// const fs = require('fs');
// const [N,M]=fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);
const [N,M]=[3,3];
let solution ='';
let output =[];
function dfs(cnt,idx){
    if(cnt === M){
        solution += `${output.join(' ')}\n`;
        return;
    }

    for(let i=idx; i<N; i++){
        output.push(i+1);
        dfs(cnt + 1, i);
        output.pop();

    }
}
dfs(0,0);
console.log(solution.trim());