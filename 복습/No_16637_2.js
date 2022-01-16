// const input = ['9','3+8*7-9*2'];
// const input = ['5','8*3+5'];
// const input = ['7','8*3+5+2']
// const input =['19','1*2+3*4*5-6*7*8*9*0']
// const input =['19','1*2+3*4*5-6*7*8*9*9']
// const input = ['19','1-9-1-9-1-9-1-9-1-9']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const calc = (op,num1,num2) =>{
    switch(op){
        case '+' : return num1+num2;
        case '-' : return num1-num2;
        case '*' : return num1*num2;
    }
}
const getMax = (numbers,ops) =>{
    let max = -Infinity;
    const putBracket = (index,numbers,ops) =>{
           const result = numbers.reduce((acc,cur,index)=>{
               if(index === 0) return acc;
               acc = calc(ops[index-1],acc,cur);
               return acc;
           },numbers[0])
           max = Math.max(result,max);

        for(let i=index; i<ops.length; i++){
            let copyNumbers = [...numbers];
            let copyOps = [...ops];
            const num = calc(copyOps[i],copyNumbers[i],copyNumbers[i+1]);
            copyNumbers.splice(i,2,num);
            copyOps.splice(i,1);
            putBracket(i+1,copyNumbers,copyOps);
        }
    }
    putBracket(0,numbers,ops);
    return max;
}
const solution = (input) =>{
    const N = +input[0];
    const numbers = input[1].split(/[^0-9]/g).map(Number);
    const ops = input[1].split(/[0-9]/g).slice(1,-1);
    const answer = getMax(numbers,ops);
    console.log(answer);
}
solution(input);