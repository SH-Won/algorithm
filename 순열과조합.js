//순열
const permutation = (max,arr) =>{
    if(max === 1) return arr.map(el => [el]);
    const result = [];
    arr.forEach((num,idx,origin) =>{
        const rest = [...origin.slice(0,idx),...origin.slice(idx+1)];
        const perms = permutation(max-1,rest);
        const attach = perms.map(perm => [num,...perm]);
        result.push(...attach);
    })
    return result
}

//조합
const combination = (max,arr) =>{
    if(max === 1) return arr.map(el => [el]);
    const result = [];
    arr.forEach((num,idx,origin)=>{
        const rest = origin.slice(idx+1);
        const combi = combination(max-1,rest);
        const attach = combi.map(com => [num,...com]);
        result.push(...attach);
    })
    return result;
}

const arr = [1,2,3,4];
console.log(permutation(2,arr));
console.log(combination(2,arr))
