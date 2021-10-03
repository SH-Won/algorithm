//const [N,expression] = ['9','3+8*7-9*2'];
//const input = ['9','3+8*7-9*2']
//const input = ['5','8*3+5']
// const input = ['7','8*3+5+2']
// const input =['19','1*2+3*4*5-6*7*8*9*0']
//const input =['19','1*2+3*4*5-6*7*8*9*9']
//const input = ['19','1-9-1-9-1-9-1-9-1-9']

//const fs = require('fs');
//const [N,expression] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    let numberArr = expression.split(/[^0-9]/).map(Number);
    let operationArr = expression.split(/[0-9]/).slice(1,-1);
    let max = -Infinity;
    const operate = (operation,num1,num2) =>{
        switch(operation){
            case '+' : return num1+num2;
            case '-' : return num1-num2;
            case '*' : return num1*num2;
        }
    }
    const dfs = (index,numArr,opArr) =>{
        const sum = numArr.reduce((acc,cur,index)=>{
           if(index === 0) return acc+=cur;
           return acc=operate(opArr[index-1],acc,cur)
        },0)
        max = Math.max(max,sum);

        for(let i=index; i<opArr.length; i++){
            let copyNum = [...numArr];
            let copyOp = [...opArr];
            const sum = operate(copyOp[i],copyNum[i],copyNum[i+1])
            copyNum.splice(i,2,sum);
            copyOp.splice(i,1);
            dfs(i+1,copyNum,copyOp);
        }
       

    }
    dfs(0,numberArr,operationArr);
    console.log(max);
}
solution();