const solution = (expression) =>{
    let numbers = expression.split(/[^0-9]/g).map(Number);
    let op = expression.replace(/[0-9]/g,'').split('');
    const prior = [
        ['+','-','*'],
        ['+','*','-'],
        ['-','+','*'],
        ['-','*','+'],
        ['*','+','-'],
        ['*','-','+'],
    ]
    let max = 0;
    
    for(let i=0; i<prior.length; i++){
        let copyNumbers = [...numbers];
        let copyOp = [...op];
        for(let j=0; j<prior[i].length; j++){
            const curOp = prior[i][j];
            for(let k=0; k<copyOp.length; k++){
                if(copyOp[k] !== curOp) continue;
                if(curOp === '-'){
                    const number = copyNumbers[k] - copyNumbers[k+1];
                    copyNumbers.splice(k,2,number);
                    copyOp.splice(k,1);
                }
                else if(curOp === '+'){
                    const number = copyNumbers[k] + copyNumbers[k+1];
                    copyNumbers.splice(k,2,number);
                    copyOp.splice(k,1);
                }
                else{
                    const number = copyNumbers[k] * copyNumbers[k+1];
                    copyNumbers.splice(k,2,number);
                    copyOp.splice(k,1);
                }
                k--;
            }
        }
        max = Math.max(max,Math.abs(copyNumbers[0]));
    }
    return max;
}

// console.log(solution("100-200*300-500+20"));
console.log(solution("50*6-3*2"));