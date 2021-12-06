const dfs = (numbers,targetNumber) =>{
    const [PLUS,MINUS] = [0,1];
    let cnt = 0;
    const operate = (count,number) =>{
        if(count === numbers.length){
           number === targetNumber ? cnt++ : cnt;
           return;
        }
        for(let i=0; i<2; i++){
            let nextNumber;
            if(i===PLUS) nextNumber = number + numbers[count];
            else if(i === MINUS) nextNumber = number - numbers[count];
            operate(count+1,nextNumber);
        }
    }
    operate(0,0);
    return cnt;
}
const bfs = (numbers,targetNumber) =>{
    const end = numbers.length ;
    let queue = [[0,0]],idx = 0;
    let cnt = 0;
    while(idx < queue.length){
        const [curNumber,count] = queue[idx++];
        if(count === end){
            curNumber === targetNumber ? cnt++ : cnt;
            continue;
        }
        
        queue.push([curNumber+numbers[count],count+1],[curNumber-numbers[count],count+1]);
    }
    return cnt;

}
const solution = (numbers,target)=>{
    const answer = dfs(numbers,target);
  //const answer = bfs(numbers,target) // dfs랑 같은 결과
    return answer;
}
console.log(solution([1,1,1,1,1],3));