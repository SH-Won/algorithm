const getPermutation = (max,arr) =>{
    if(max === 1) return arr.map(el => [el]);
    const result = [];
    arr.forEach((el,idx,origin)=>{
        const rest = [...origin.slice(0,idx),...origin.slice(idx+1)];
        const perms = getPermutation(max-1,rest);
        const attach = perms.map(perm => [el,...perm]);
        result.push(...attach);
    })
    return result;
}
const solution = (n,weak,dist) =>{
    const len = weak.length;
    const weakPoints = Array.from({length:len*2 + 1},(_,i)=> i < len ? weak[i] : weak[i-len]+n);
    dist.sort((a,b) => b-a);
    for(let max=1; max<=dist.length; max++){
        const friends = getPermutation(max,dist);
        for(let i=0; i<friends.length; i++){
            for(let j=0; j<len; j++){
                let line = weakPoints.slice(j,j+len);
                for(let k=0; k<friends[i].length; k++){
                    const friend = friends[i][k];
                    const coverRange = line[0] + friend;
                    line = line.filter(el => el > coverRange);
                }
                if(!line.length) return max;
            }
        }
    }
    return -1;
}
// console.log(solution(12,[1,5,6,10],[1,2,3,4]));
console.log(solution(12,[1,3,4,9,10],[3,5,7]))