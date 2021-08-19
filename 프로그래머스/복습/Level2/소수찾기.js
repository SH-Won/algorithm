
console.log(solution("011"))
function solution(numbers){
    let answer = [];
    let visited = Array(numbers.length).fill(false);
    const isPrime = (number) =>{
        if(number < 2) return false;
        if(number === 2) return true;
        for(let i=2; i<=Math.sqrt(number); i++){
            if(number % i ===0) return false;
        }

        return true
    }
    const dfs = (count,curNumber) =>{
        
        if(count === numbers.length){
            return;
        }

        for(let i=0; i<numbers.length; i++){

            if(!visited[i]){
                visited[i] = true;
                const nextNumber = curNumber+numbers[i];

                if(isPrime(Number(nextNumber))){
                    answer.indexOf(Number(nextNumber)) === -1 && answer.push(Number(nextNumber))
                }

                dfs(count+1,nextNumber);
                visited[i]= false;
            }

        }
    }
    dfs(0,"");

    return answer.length;

}