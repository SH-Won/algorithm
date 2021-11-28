const getPermutation = (dist,n) =>{
    if(n === 1) return dist.map(el => [el]);
    let result = [];
    let temp = [];
    let visited = Array(dist.length).fill(false);
    const permutaion = (count) =>{
        if(count === n){
           result.push([...temp])
           return;
        }
        for(let i=0; i<dist.length; i++){
            if(!visited[i]){
                visited[i] = true;
                temp.push(dist[i]);
                permutaion(count+1);
                temp.pop();
                visited[i] = false;
            }
        }
    }
    permutaion(0);
    return result;
}
const solution = (n,weak,dist) =>{
    const length = weak.length;
    let weakPoint = Array(length*2 - 1);
    for(let i=0; i<weakPoint.length; i++){
        weakPoint[i] = i < weak.length ? weak[i] : weak[i-length] + n;
    }
    dist.sort((a,b)=>b-a);
    for(let count = 1; count<=length; count++){
        const friends = getPermutation(dist,count);
        for(let i=0; i<friends.length; i++){
            for(let j=0; j<length; j++){
                let line = weakPoint.slice(j,j+length);
                for(let k=0; k<friends[i].length; k++){
                    const coverRange = line[0] + friends[i][k];
                    line = line.filter(weak => weak > coverRange);
                    if(!line.length) return count;
                }
            }
        }
    }
    return -1;
}
console.log(solution(12,[1,5,6,10],[1,2,3,4]));
// console.log(solution(12,[1,3,4,9,10],[3,5,7]))