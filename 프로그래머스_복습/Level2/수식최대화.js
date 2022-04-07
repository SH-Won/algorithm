const calc = (num1,num2,op) =>{
    switch(op){
        case '+' :
            return num1+num2;
        case '-' :
            return num1-num2;
        case '*' :
            return num1*num2;
        default : break;
    }

}
const solution = expression =>{
    const ops = expression.replace(/[0-9]/g,"").split('');
    const numbers = expression.split(/[-+*]/g).map(Number);
    const prior = [
        ['+','-','*'],
        ['+','*','-'],
        ['-','+','*'],
        ['-','*','+'],
        ['*','+','-'],
        ['*','-','+']
    ]
    let answer = 0;
    for(let i=0; i<prior.length; i++){
        const copyOps = [...ops];
        const copyNumbers = [...numbers];
        for(let j=0; j<prior[i].length; j++){
            const op = prior[i][j];
            let idx = copyOps.indexOf(op);
            while(idx !==-1){
                copyNumbers.splice(idx,2,calc(copyNumbers[idx],copyNumbers[idx+1],op));
                copyOps.splice(idx,1);
                idx = copyOps.indexOf(op);
            }
        }
        answer  = Math.max(Math.abs(copyNumbers[0]),answer);
    }
    return answer;
}
console.log(solution("100-200*300-500+20"));