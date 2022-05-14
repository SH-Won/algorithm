const getCombination = (max,arr) =>{
    if(max === 1) return arr.map(el => [el]);
    const result = [];
    arr.forEach((el,idx,origin) =>{
        const rest = origin.slice(idx+1);
        const combi = getCombination(max-1,rest);
        const attach = combi.map(com => [el,...com]);
        result.push(...attach);
    })
    return result;
}
const isCandidatable = (candidateKey,candi) =>{
    const candiArr = Array.from(candidateKey);
    return !candiArr.some(key =>{
        for(let i=0; i<key.length; i++){
            if(!candi.includes(key[i])) return false;
        }
        return true;
    })
}
const isKey = (candi,relation) =>{
    const count = relation.length;
    const keyMap = new Set();
    for(let i=0; i<count; i++){
        let key ='';
        for(let j=0; j<candi.length; j++){
            key += `${relation[i][candi[j]]},`;
        }
        if(keyMap.has(key)) return false;
        keyMap.add(key);
    }
    return true;
}
const solution = relation =>{
    const column = relation[0].length;
    const indexArr = Array(column).fill().map((_,i) => i);
    const candidateKey = new Set();
    for(let max=1; max<=column; max++){
        const combination = getCombination(max,indexArr);
        for(let i=0; i<combination.length; i++){
            if(!isCandidatable(candidateKey,combination[i]) || !isKey(combination[i],relation)) continue;
            candidateKey.add(combination[i]);
        }
    }
    return candidateKey.size;
}
console.log(solution([["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]]))