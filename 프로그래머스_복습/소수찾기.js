const isPrime = (number) =>{
    if(number < 2) return false;
    for(let i=2; i<=Math.sqrt(number); i++){
        if(number % i === 0) return false;
    }
    return true;
}
const solution = (numbers) =>{
    let visited = Array(numbers.length).fill(false);
    let numberVisited = new Set([]);
    let answer = 0;
    const combination = (count,number) =>{
        if(count === numbers.length) return;

        for(let i=0; i<numbers.length; i++){
            if(!visited[i]){
                visited[i] = true;
                const nextNumber = +(number+numbers[i]);
                if(!numberVisited.has(nextNumber) && isPrime(nextNumber)){
                    answer++;
                    numberVisited.add(nextNumber);
                }
                combination(count+1,nextNumber.toString());
                visited[i] = false;
            }
        }

    }
    combination(0,"");
    return answer;
}
console.log(solution("011"));