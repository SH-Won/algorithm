

function solution(numbers, target){
    numbers.splice(0,0,0);
    
    const [PLUS,MINUS]=[0,1];
    
    let answer = 0;
    const operate =(operate,num1,num2) =>{
        switch(operate){
            case PLUS :
                return num1+num2;
            case MINUS :
                return num1-num2;
        }
        
    }
    bfs(1,numbers[0]);

    function bfs(start,number,used=[0,0]){
        if(start === numbers.length){
            if(number === target ) count++;
            return;
        }
       
        
        for(let i=0; i<2; i++){
            const ran2 = operate(i,number,numbers[start]);
            
            bfs(start+1,ran2);
    
        }

    }
    return answer;

}