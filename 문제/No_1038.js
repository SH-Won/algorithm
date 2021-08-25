//N번 째 감소하는수 ?

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();
// const N = +input;

const array = ['9','8','7','6','5','4','3','2','1','0'];
const X = [];
dfs("",0);
function dfs(curNumber,index){
    if(index === array.length) return;


    for(let i=index; i<array.length; i++){
         nextNumber = curNumber+array[i];
         X.push(Number(nextNumber));
         dfs(nextNumber,i+1);
    }
}
X.sort((a,b)=>a-b);
//console.log(X[N] ===undefined ? -1 : X[N]);
console.log(3 ===undefined)
