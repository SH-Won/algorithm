let ex = "100-200*300-500+20";
console.log(solution(ex));
function solution(expression){
    let operator = expression.split('').filter(ex => ex ==='-' || ex==='*' || ex==='+');
    let numbers = expression.split(/[-*+]/g).map(num =>+num);
    const prior = [
        ['+','*','-'],
        ['+','-','*'],
        ['*','+','-'],
        ['*','-','+'],
        ['-','*','+'],
        ['-','+','*']
    ]
    // console.log(numbers);
    // console.log(operator);
    let answer = 0;
    
    for(let i=0; i<prior.length; i++){
        let copyNumbers = [...numbers];
        let copyOp = [...operator];

        for(let j=0; j<prior[i].length; j++){
           
            for(let k=0; k<copyOp.length; k++){
                if(copyOp[k] === prior[i][j]){
                    if(copyOp[k] === '-'){
                       
                        copyNumbers[k] -=copyNumbers[k+1];
                        copyNumbers.splice(k+1,1);
                        copyOp.splice(k,1);
                        k--;
                    }
                    else if(copyOp[k] === '+'){
                       
                        copyNumbers[k] +=copyNumbers[k+1];
                        copyNumbers.splice(k+1,1);
                        copyOp.splice(k,1);
                        k--;
                    }
                    else{
                        copyNumbers[k] *=copyNumbers[k+1];
                        copyNumbers.splice(k+1,1);
                        copyOp.splice(k,1);
                        k--;
                    }
                }

            }

        }
        if(Math.abs(copyNumbers[0]) > answer) answer = Math.abs(copyNumbers[0])
    }

    return answer;

}