const isPrime = (number) =>{
    if(number <= 1) return false;
    if(number === 2) return true;
    for(let i=2; i<=Math.sqrt(number); i++){
        if(number % i === 0) return false;
    }
    return true;
}
const solution = numbers =>{
    let answer = 0;
    const checked = new Set();
    const visited = Array(numbers.length).fill(false);
    const dfs = (max,curNumber) =>{
        if(curNumber.length === max){
            if(checked.has(+curNumber)) return;
            checked.add(+curNumber);
            if(isPrime(+curNumber)) answer++;
            return;
        }
        for(let i=0; i<numbers.length; i++){
            if(visited[i]) continue;
            visited[i] = true;
            const nextNumber = curNumber + numbers[i];
            dfs(max,nextNumber);
            visited[i] = false;
        }
    }
    for(let max=1; max<=numbers.length; max++) dfs(max,"");
    return answer;
}
console.log(solution('011'));