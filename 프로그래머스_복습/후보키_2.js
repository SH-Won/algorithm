const solution = (relation) =>{
    let indexArr = [];
    let candidate = new Set();
    const [row,column] = [relation.length, relation[0].length];
    const combination = (index,count,max) =>{
        if(count === max){
            const copyCandi = Array.from(candidate);
            const check = copyCandi.some(candi =>{
                for(let i=0; i<candi.length; i++){
                    if(!indexArr.includes(candi[i])) return false
                }
                return true;
            })
            if(!check){
                let key = new Set();
                for(let i=0; i<row; i++){
                    let attribute = ''
                    for(let j=0; j<indexArr.length; j++){
                        attribute += `${relation[i][indexArr[j]]},`
                    }
                    if(key.has(attribute)) break;
                    key.add(attribute);
                }
                if(key.size === row) candidate.add([...indexArr])
            }
            return;
        }
        for(let i=index; i<column; i++){
             indexArr.push(i);
             combination(i+1,count+1,max);
             indexArr.pop();
        }
    }
    for(let max=1; max<=column; max++){
        combination(0,0,max);
    }
    return candidate.size;
}
console.log(solution([["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]]))