// const input = ['2','5 6','0 0 1 0']
// const input = ['3','3 4 5','1 0 1 0']
const input = ['6','1 2 3 4 5 6','2 1 1 1']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const calc = (num1,num2,op) =>{
    const [PLUS,MINUS,MULTI,DIV] = [0,1,2,3];
    switch(op){
        case PLUS : return num1 + num2;
        case MINUS : return num1 - num2;
        case MULTI : return num1 * num2;
        case DIV : 
          return num1 < 0 ? (((-1) * num1) / num2 >>0) * (-1) : num1 / num2 >>0  
    }
}
const getMinAndMax = (N,numbers,ops) =>{
    let accOp = Array(4).fill(0);
    let selectedOp = [];
    let [min,max] = [Infinity,-Infinity];
    const selectOp = (count) =>{
        if(count === N-1){
            let result = numbers[0];
            let numIndex = 1;
            for(let i=0; i<selectedOp.length; i++){
                const op = selectedOp[i];
                result = calc(result,numbers[numIndex++],op);
            }
            min = Math.min(result,min);
            max = Math.max(result,max);
            return;
        }
        for(let i=0; i<4; i++){
            if(accOp[i] === ops[i]) continue;
            accOp[i]++;
            selectedOp.push(i);
            selectOp(count+1);
            selectedOp.pop();
            accOp[i]--;
        }
    }
    selectOp(0);
    return [max,min];
}
const solution = (input) =>{
    const N = +input[0];
    const numbers = input[1].split(' ').map(Number);
    const ops = input[2].split(' ').map(Number);
    const [max,min] = getMinAndMax(N,numbers,ops);
    console.log(`${max}\n${min}`);
}
solution(input);