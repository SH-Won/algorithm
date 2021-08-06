const numbers = '011';
console.log(solution(numbers));

function solution(numbers){
    let answer = [];
    let numberArr = numbers.split('');
    let visited = Array(numberArr.length).fill(false);
    //소수는 1과 자기자신으로 밖에 안나뉘어짐
    // 0 과 1은 소수가 아님 

    dfs(numberArr,'');
    function dfs(numArr,curNumber){


        if(curNumber.length === numbers.length+1){
            return;
        }
        
        for(let i=0; i<numArr.length; i++){
            if(!visited[i]){
                visited[i] =true;
                if(isPrime(Number(curNumber+numArr[i]))){
                    if(answer.indexOf(Number(curNumber+numberArr[i]))===-1){
                        answer.push(Number(curNumber+numberArr[i]))
                    }
                }

                dfs(numArr,curNumber+numArr[i])
                visited[i]=false;

            }

        }

    }
    

    function isPrime(number){
        if(number < 2) return false;
        if(number === 2 ) return true;
        
        for(let i=2; i<=Math.sqrt(number); i++){
            if(number % i ===0){
                
                return false;
            }
        }
        return true;

    }
    return answer.length;
    
    

}