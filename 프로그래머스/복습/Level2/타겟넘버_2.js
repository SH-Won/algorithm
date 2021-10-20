const solution = (numbers,target) =>{
    const [PLUS,MINUS] = [0,1];
    let ways = 0;
    const dfs = (count,curNum) =>{
        if(count === numbers.length){
           return curNum === target ? ways++ : ways;
        }
        for(let i=0; i<=1; i++){
            const nextNum = i===PLUS ? curNum + numbers[count] : curNum - numbers[count];
            dfs(count+1,nextNum);
        }
    }
    dfs(0,0);
    return ways;
}