const solution = relation =>{
    const [row,column] = [relation.length, relation[0].length];
    let indexArr = [];
    let candidateKey = new Set();
    const combination = (index,count,max) =>{
        if(count === max ){
           const copyCandi = Array.from(candidateKey);
           const check = copyCandi.some(keyArr =>{
               for(let i=0; i<keyArr.length; i++){
                   if(!indexArr.includes(keyArr[i])) return false;
               }
               return true;
           })
           if(!check){
               let keyMap = new Set();
               for(let i=0; i<relation.length; i++){
                   let key = "";
                   for(let j=0; j<indexArr.length; j++){
                       const idx = indexArr[j];
                       key += `${relation[i][idx]},`;
                   }
                   if(keyMap.has(key)) break;
                   keyMap.add(key);
               }
               if(keyMap.size === row) candidateKey.add([...indexArr]);
               return;
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
    return candidateKey.size;
}
console.log(solution([["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]]))
