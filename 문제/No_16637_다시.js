//const input = ['9','3+8*7-9*2']
//const input = ['5','8*3+5']
// const input = ['7','8*3+5+2']
// const input =['19','1*2+3*4*5-6*7*8*9*0']
//const input =['19','1*2+3*4*5-6*7*8*9*9']
//const input = ['19','1-9-1-9-1-9-1-9-1-9']

//90분정도 걸림 .....어휴
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const expression = input[1];
const numbers = expression.split(/[^0-9]/g).map(Number);
const operator = expression.split(/[0-9]/g).slice(1,-1);
// console.log(numbers);
// console.log(operator);
let max = -Infinity;
const operate = (operator,ran1,ran2) =>{
    switch(operator){
        case '+': return ran1+ran2;
        case '-' : return ran1-ran2;
        case '*' : return ran1*ran2;
    }
}

const dfs = (idx,numArr,opArr) =>{
    let sum = numArr.reduce((acc,cur,index)=>{
        if(index === 0) return acc+=cur;
        return acc=operate(opArr[index-1],acc,cur);
    },0)
    max = Math.max(sum,max);
    
    
    for(let i=idx; i<opArr.length; i++){
        let copyNum = [...numArr];
        let copyOp = [...opArr];
        const sum = operate(copyOp[i],copyNum[i],copyNum[i+1]);
        copyOp.splice(i,1);
        copyNum.splice(i,2,sum);
        dfs(i+1,copyNum,copyOp); 
    }

}
dfs(0,numbers,operator)
console.log(max);
