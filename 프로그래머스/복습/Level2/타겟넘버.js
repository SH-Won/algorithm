console.log(solution([1,1,1,1,1],3))
function solution(numbers, target){
    let answer = 0;
    const [PLUS,MINUS] =[0,1];
    
    const operate = (operation,num1,num2) =>{
        switch(operation){
            case PLUS :
              return num1+num2;
            case MINUS :
              return num1-num2;
        }
    }
    dfs(0,0);

    function dfs(count,curNumber){

        if(count === numbers.length){
            if(curNumber === target) answer++;
            return
        }
        for(let i=0; i<=1; i++){
            let nextNumber = operate(i,curNumber,numbers[count]);

            dfs(count+1,nextNumber);
        }
    }
    return answer;
    

}