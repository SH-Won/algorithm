// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input =[
    '6',
    '1 2 3 4 5 6',
    '2 1 1 1'
]
const N = +input[0];
const number = input[1].split(' ').map(num => parseInt(num));
const [PLUS,MINUS,MULTI,DIV]=[0,1,2,3];
const ops = input[2].split(' ').map(num=>parseInt(num));
let min = Infinity;
let max = -Infinity;

function operate(operation,ran1,ran2){
    switch(operation){
        case PLUS :
            return ran1+ran2;
        case MINUS :
            return ran1-ran2;
        case MULTI :
            return ran1*ran2;
        case DIV :
            return ran1 < 0
            ? -1 * Math.floor(Math.abs(ran1) /ran2)
            : Math.floor(ran1 / ran2)
    }
}
// [2,0,1,0];
function dfs(cnt,num,used=[0,0,0,0]){
    if(cnt === N){
        max = Math.max(max,num);
        min = Math.min(min,num);
    }
    let ran2 = number[cnt];
    
    for(let i=0 ; i<4; i++){
        if(ops[i] === used[i]) continue;
        let temp = [...used];
        temp[i]+=1;
        let result = operate(i,num,ran2);
        dfs(cnt+1,result,temp);
    }

}
dfs(1,number[0]);
console.log(max ? max : 0);
console.log(min ? min : 0);
