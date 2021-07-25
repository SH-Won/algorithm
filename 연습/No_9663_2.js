const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();


const N = +input;

// let queen = Array.from({length:N},()=>Array(N).fill(0));
let queen = Array(N).fill(0);

let way =0;
function dfs(count){
    if(count === N ){
        way++;
        return;
    }

    for(let i=1; i<=N; i++){
           queen[count]=i;

        if(check(count)){
            
            dfs(count+1)
        }
        
    }

}
function check(count){
    for(let j=0; j<count; j++){
        if(queen[j] === queen[count]) return false;

        if(Math.abs(queen[count] - queen[j]) === count - j) return false;
    }
    return true;

}
dfs(0);
console.log(way);