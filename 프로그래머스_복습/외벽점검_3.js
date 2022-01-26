const getPermutation = (count,dist) =>{
    if(count === 1) return dist.map(el => [el]);
    let visited = Array(dist.length).fill(false);
    let result = [];
    let friends = [];
    const permutaion = (cnt) =>{
       if(cnt === count){
           result.push([...friends]);
           return;
       }
       for(let i=0; i<dist.length; i++){
           if(!visited[i]){
               visited[i] = true;
               friends.push(dist[i]);
               permutaion(cnt+1);
               friends.pop();
               visited[i] = false;
           }
       }
    }
    permutaion(0);
    return result;
}
const solution = (n,weak,dist) =>{
    const len = weak.length;
    let weakPoints = Array.from({length:2*len-1},(_,i)=> i < len ? weak[i] : weak[i-len]+n);
    dist.sort((a,b) => b-a);
    for(let count=1; count<=dist.length; count++){
        const friends = getPermutation(count,dist);
        for(let i=0; i<friends.length; i++){
            for(let j=0; j<len; j++){
                let lines = weakPoints.slice(j,j+len);
                for(let k=0; k<friends[i].length; k++){
                    const friend = friends[i][k];
                    const range = lines[0]+friend;
                    lines = lines.filter(weak => weak > range);
                }
                if(!lines.length) return count;
            }
        }
    }
    return -1;
}
// console.log(solution(12,[1,5,6,10],[1,2,3,4]))
console.log(solution(12,[1,3,4,9,10],[3,5,7]))