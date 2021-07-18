const fs = require('fs');
const [N,M] = fs.readFileSync('/dev/stdin').toString().split(' ').map(num => parseInt(num));

let output = [];
let result = '';

function dfs(cnt){
    if(cnt === M){
        result += `${output.join(' ')}\n`;
        return
    }
    for(let i=0; i<N; i++){
       
        output.push(i+1);
        dfs(cnt+1);
        output.pop();

    }

}
dfs(0);
console.log(result.trim());