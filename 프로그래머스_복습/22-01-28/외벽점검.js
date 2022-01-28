const getPermutation = (max,dist) =>{
    if(max === 1) return dist.map(el => [el]);
    const result = [];
    dist.forEach((friend,idx,origin) =>{
        const rest = [...origin.slice(0,idx),...origin.slice(idx+1)];
        const perms = getPermutation(max-1,rest);
        const friends = perms.map(perm => [friend,...perm]);
        result.push(...friends);
    })
    return result;
}

const solution = (n,weak,dist) =>{
    const len = weak.length;
    const weakPoints = Array.from({length:2*len -1},(_,i)=> i < len ? weak[i] : weak[i-len]+n);
    dist.sort((a,b) => b-a);
    for(let count=1; count<dist.length; count++){
        const friends = getPermutation(count,dist);
        console.log(friends);
        for(let i=0; i<friends.length; i++){
            const friendArr = friends[i];
            for(let j=0; j<len; j++){
                let line = weakPoints.slice(j,j+len);
                for(let k=0; k<friendArr.length; k++){
                    const friend = friendArr[k];
                    const coverRange = line[0] +friend;
                    line = line.filter(el => el > coverRange);
                }
                if(line.length === 0) return count;
            }
        }
    }
    return -1;
}
console.log(solution(12,[1,5,6,10],[1,2,3,4]))