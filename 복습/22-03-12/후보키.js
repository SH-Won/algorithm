// 멱집합
const getCombination = (arr,max) =>{
    if(max === 1) return arr.map(el => [el]);
    const result = [];
    arr.forEach((el,idx,origin) =>{
        const rest = origin.slice(idx+1);
        const perms = getCombination(rest,max-1);
        const attach = perms.map(perm => [el,...perm]);
        result.push(...attach);
    })
    return result;
}
const isExist = (key,candidate) => {
    const copyCandi = Array.from(candidate);
    return copyCandi.some(candi =>{
        for(let i=0; i<candi.length; i++){
            if(!key.includes(candi[i])) return false;
        }
        return true;
    })
}
const isValidKey = (key,relation) =>{
    const set = new Set();
    for(let i=0; i<relation.length; i++){
        let keyString = '';
        for(let j=0; j<key.length; j++){
            keyString += `${relation[i][key[j]]} `;
        }
        if(set.has(keyString)) return false;
        set.add(keyString);
    }
    return true;
}
const solution = relation =>{
    const [r,c] = [relation.length, relation[0].length];
    const candidate = new Set();
    const arr = Array(c).fill().map((v,i) => i);
    for(let max=1; max<=c; max++){
        const combination = getCombination(arr,max);
        for(let i=0; i<combination.length; i++){
            const key = combination[i];
            if(!isExist(key,candidate) && isValidKey(key,relation)){
                candidate.add(key);
            }
        }
    }
    return candidate.size;
}
console.log(solution([["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]]))