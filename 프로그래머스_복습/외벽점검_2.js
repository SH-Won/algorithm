const getPermutation = (dist,max) =>{
    if(max === 1) return dist.map(el => [el]);
    let result = [];
    let array = [];
    let visited = Array(dist.length).fill(false);
    const permutation = (count) =>{
        if(count === max){
            result.push([...array])
            return;
        }
        for(let i=0; i<dist.length; i++){
            if(!visited[i]){
                visited[i] = true;
                array.push(dist[i]);
                permutation(count+1);
                array.pop();
                visited[i] = false;
            }
        }
    }
    permutation(0);
    return result;
}
const solution = (n,weak,dist) =>{
    const len = weak.length
    let weakPoints = Array.from({length:len*2 - 1},(_,i)=> i < len ? weak[i] : weak[i-len] + n);
    dist.sort((a,b) => b-a);
    for(let count = 1; count<=dist.length; count++){
        const friends = getPermutation(dist,count);
        for(let i=0; i<friends.length; i++){
            for(let j=0; j<len; j++){
                let line = weakPoints.slice(j,j+len);
                for(let k=0; k<friends[i].length; k++){
                    const friend = friends[i][k];
                    const coverRange = line[0] +friend;
                    line = line.filter(el => el > coverRange);
                    if(!line.length) return count;
                }
            }
        }
    }
    return -1;
}

// console.log(solution(12,[1,5,6,10],[1,2,3,4]))
console.log(solution(12,[1,3,4,9,10],[3,5,7]))