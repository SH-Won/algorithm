const isBuildable = (x,y,structure,builded) =>{
    if(structure === 0){
        if(y === 0) return true;
        const isPossible = builded.some(([bx,by,bs])=>{
            if((bx === x && by === y-1 && bs === structure) || 
               (bx === x-1 && by === y && bs !== structure) ||
               (bx === x && by === y && bs !== structure))
               return true;
        })
        return isPossible;
    }
    else{
        if(builded.find(([bx,by,bs]) => bx === x-1 && by === y && bs === structure) &&
           builded.find(([bx,by,bs]) => bx === x+1 && by === y && bs === structure))
           return true;
        const isPossible = builded.some(([bx,by,bs])=>{
            if((bx === x && by === y-1 && bs !== structure )||
               (bx === x+1 && by === y-1 && bs !== structure))
               return true;
        })
        return isPossible;
    }
}
const destroy = (x,y,structure,builded) =>{
    const copyBuiled = [...builded];
    const destroyIdx = copyBuiled.findIndex(([bx,by,bs]) => bx === x && by === y && bs === structure);
    copyBuiled.splice(destroyIdx,1);
    for(let i=0; i<copyBuiled.length; i++){
        const [x,y,a] = copyBuiled[i];
        if(!isBuildable(x,y,a,copyBuiled)) return -1;
    }
    return destroyIdx;
}
const solution = (n,build_frame) =>{
    //[x,y,a,b]  / a(구조물) 0=기둥 1=보 / b(설치유무)  0=삭제 1=설치
    const builded = [];
    for(let i=0; i<build_frame.length; i++){
        const [x,y,a,b] = build_frame[i];
        if(b === 1 && isBuildable(x,y,a,builded)) builded.push([x,y,a]);
        else{
            const destroyIdx = destroy(x,y,a,builded);
            if(destroyIdx !== -1) builded.splice(destroyIdx,1); 
        }
    }
    return builded.sort((a,b) =>{
        if(a[0] === b[0]){
            if(a[1] === b[1]) return a[2] - b[2];
            return a[1] - b[1];
        }
        return a[0] - b[0];
    })
}
// console.log(solution(5,[[1,0,0,1],[1,1,1,1],[2,1,0,1],[2,2,1,1],[5,0,0,1],[5,1,0,1],[4,2,1,1],[3,2,1,1]]))
console.log(solution(5,[[0,0,0,1],[2,0,0,1],[4,0,0,1],[0,1,1,1],[1,1,1,1],[2,1,1,1],[3,1,1,1],[2,0,0,0],[1,1,1,0],[2,2,0,1]]))

