const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0]
const numbers = input[1].split(' ').map(num => +num);
const operations = input[2].split(' ').map(num => +num);
let max = -Infinity;
let min = Infinity;
const [PLUS,MINUS,MULTI,DIV]=[0,1,2,3];

const operate = (operation,ran1,ran2) =>{
    switch(operation){
        case PLUS :
            return ran1+ran2;
        case MINUS :
            return ran1-ran2;
        case MULTI :
            return ran1*ran2;
        case DIV :
            return ran1 < 0 ?
            Math.floor(Math.abs(ran1) / ran2) * (-1) :
            Math.floor(ran1 / ran2)
    }
}
function dfs(index,ran1,used=[0,0,0,0]){
    if(index === N){
        max = Math.max(max,ran1);
        min = Math.min(min,ran1);
        return;
    }

    const ran2 = numbers[index];
    for(let i=0; i<4; i++){
        if(operations[i] === used[i]) continue;
        let temp = [...used];
        temp[i]+=1;
        const result = operate(i,ran1,ran2);

        dfs(index+1,result,temp);

    }
}
dfs(1,numbers[0]);
console.log(max);
console.log(min);
