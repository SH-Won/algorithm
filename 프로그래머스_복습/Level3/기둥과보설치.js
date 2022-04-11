const isBuildable = (x,y,structure,builded) =>{
    let isBuilded ;
    if(structure === 0){
        if(y === 0) isBuilded = true;
        else{
            isBuilded = builded.some(([bx,by,bs]) =>
            (bx === x && by === y-1 && bs === structure) ||
            (bx === x && by === y && bs !== structure) ||
            (bx === x-1 && by === y && bs !==structure)
            )
        }
    }else{
        if(builded.find(([bx,by,bs]) => (bx === x-1 && by === y && bs === structure)) &&
           builded.find(([bx,by,bs]) => (bx === x+1 && by === y && bs === structure))) isBuilded = true;
        else{
            isBuilded = builded.some(([bx,by,bs])=>
            (bx === x && by === y-1 && bs !== structure) ||
            (bx === x+1 && by === y-1 && bs !==structure)
            )
        }
    }
    return isBuilded;
}
const destroy = (x,y,structure,builded) =>{
    const copyBuilded = [...builded];
    const idx = copyBuilded.findIndex(([bx,by,bs]) => bx === x && by === y && bs === structure);
    copyBuilded.splice(idx,1);
    for(let i=0; i<copyBuilded.length; i++){
        const [x,y,a] = copyBuilded[i];
        if(!isBuildable(x,y,a,copyBuilded)) return;
    }
    builded.splice(idx,1);
}
const solution = (n,build_frame) =>{
    const builded = [];
    // [x,y,a,b] a (0 = column , 1 = beam) b(0 = destroy, 1 = build) ;
    build_frame.forEach(([x,y,a,b])=>{
        if(b === 1 && isBuildable(x,y,a,builded)) builded.push([x,y,a]); 
        else if(b === 0) destroy(x,y,a,builded);
    })
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