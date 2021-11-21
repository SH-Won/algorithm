const solution = (k,dungeons) =>{
    let max = 0;
    let order = Array(dungeons.length);
    let visited = Array(dungeons.length).fill(false);
    const makeOrder = (count) =>{
        if(count === dungeons.length){
            let currentK = k;
            let count = 0;
            for(let i=0; i<order.length; i++){
                const number = order[i];
                const [limit,consume] = dungeons[number];
                if(currentK < limit) return max = Math.max(max,count);
                else{
                    currentK -=consume;
                    count++;
                }
            }
            return max = Math.max(max,count);
        }
        for(let i=0; i<dungeons.length; i++){
            if(!visited[i]){
                visited[i] = true;
                order[count] = i;
                makeOrder(count+1);
                visited[i] = false;
            }
        }
    }
    makeOrder(0);
    return max;
}
const [K,dungeons] = [80,[[80,20],[50,40],[30,10]]];
console.log(solution(K,dungeons));