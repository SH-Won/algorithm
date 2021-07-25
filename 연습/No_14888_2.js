const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input =[
//     '3',
//     '3 4 5',
//     '1 0 1 0'
// ]

const N = +input[0];
const numbers = input[1].split(' ').map(num=> +num);
const op = input[2].split(' ').map(num=> +num);
const [PLUS,MINUS,MULTIPLE,DIV] = [0,1,2,3];
let [max,min] = [-Infinity,Infinity];

function operation(operate,ran1,ran2){
    switch(operate){
        case PLUS : 
          return ran1+ran2;
        case MINUS :
          return ran1-ran2;
        case MULTIPLE :
          return ran1 * ran2;
        case DIV :
          return ran1 < 0 ? 
              -1 * Math.floor(Math.abs(ran1) / ran2) :
              Math.floor( ran1 / ran2 )
    }

}
function dfs(count,ran1,used=[0,0,0,0]){
    if(count === N){
        
        max = Math.max(ran1,max);
        min = Math.min(ran1,min);

        return;
    }
    for(let i=0; i<4; i++){
        if(used[i] === op[i]) continue;

        
        let temp = [...used];
        temp[i]+=1;
        
        let ran2 = operation(i,ran1,numbers[count]);
        dfs(count+1,ran2,temp);
    }
}
dfs(1,numbers[0]);
console.log(`${max}\n${min}`.trim());
