const solution = (relation) =>{
    const col = relation[0].length;
    const row = relation.length;
    let candidate = new Set();
    let indexArr = [];
    
    const combination = (start,count,max) =>{
        if(count === max){
            let copyCandi = Array.from(candidate);
            //let check = true;
            const isCheck = copyCandi.some(el =>{
                
                for(let i=0; i<el.length; i++){
                    let isExist = indexArr.includes(el[i]);
                    if(!isExist) return false;
                }
                return true;
            })
            
            // for(let i=0; i<copyCandi.length; i++){
            //     let isExist = true;
            //     for(let j=0; j<copyCandi[i].length; j++){
            //         if(!indexArr.includes(copyCandi[i][j])){
            //             isExist = false;
            //             break;
            //         }
            //     }
            //     if(isExist){
            //         check =false;
            //         break;
            //     }
            // }
            console.log(indexArr)
            if(!isCheck){
                let key = new Set();
                for(let i=0; i<row; i++){
                    const temp = relation[i].filter((el,index)=>{
                        if(indexArr.includes(index)) return el;
                    }).join('');
                    if(key.has(temp)) break;
                    else key.add(temp);
                }
                console.log(indexArr);
                console.log(key);
                if(key.size === row) candidate.add([...indexArr]);
            }
            return;
        }

        for(let i=start; i<col; i++){
            indexArr.push(i);
            combination(i+1,count+1,max);
            indexArr.pop();
        }
    }
    for(let max=1; max<=col; max++){
        combination(0,0,max);
    }

    return candidate.size;
}
console.log(solution([["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]]));