const expression = "100-200*300-500+20";
let num = expression.split(/[^0-9]/);

console.log(solution(expression));


function solution(expression){
    let answer = 0;
    let numArr = expression.split(/[^0-9]/).map(num =>+num);
    let op  =[];
    let ways =[
        ['+','-','*'],
        ['+','*','-'],
        ['-','+','*'],
        ['-','*','+'],
        ['*','+','-'],
        ['*','-','+']
    ]
    for(let i=0; i<expression.length; i++){
        if(expression[i] === '*' ||
           expression[i] === '-' ||
           expression[i] === '+'  ){
               op.push(expression[i])
           }
    }
    for(let i=0; i<ways.length; i++){
        let copyNum = [...numArr];
        let copyOp = [...op];
        for(let j=0; j<ways[i].length; j++){
            for(k=0; k<copyOp.length; k++){
                if(copyOp[k] === ways[i][j]){
                     if(copyOp[k] === '+'){
                         copyNum[k] += copyNum[k+1];
                         copyNum.splice(k+1,1);
                         copyOp.splice(k,1);
                         k--;

                    } else if(copyOp[k] === '*'){
                        copyNum[k] *= copyNum[k+1];
                        copyNum.splice(k+1,1);
                        copyOp.splice(k,1);
                        k--;
                        

                    } else{
                        copyNum[k] -= copyNum[k+1];
                        copyNum.splice(k+1,1);
                        copyOp.splice(k,1);
                        k--;
                    }
                    
                }
            }

        }
        answer < Math.abs(copyNum[0]) ?
        answer = Math.abs(copyNum[0]) : answer
        
    }
    return answer;

}
