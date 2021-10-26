const solution = (relation) =>{
    const row = relation.length;
    const column = relation[0].length;
    let indexArr = [];
    let candidate = new Set();

    const combination = (index,count,max) =>{
        if(count === max){
            const candidateArr = Array.from(candidate);
            const isCandidate = candidateArr.some(candi =>{
                for(let i=0; i<candi.length; i++){
                    const isExist = indexArr.includes(candi[i]);
                    if(!isExist) return false;
                }
                return true;
            })
            if(!isCandidate){
                let key = new Set();
                for(let i=0; i<row; i++){
                    const attribute = relation[i].filter((el,index)=>{
                        if(indexArr.includes(index)) return el
                    }).join('');
                    if(key.has(attribute)) break;
                    key.add(attribute);
                }
                if(key.size === row) candidate.add([...indexArr]);
            }
            return;
        }
        for(let i=index; i<column; i++){
            indexArr.push(i);
            combination(i+1,count+1,max);
            indexArr.pop();
        }

    }
    for(let i=1; i<=column; i++){
        combination(0,0,i);
    }
    return candidate.size;
}