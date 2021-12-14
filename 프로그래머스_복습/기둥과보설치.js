const isBuildable = (x,y,builded,structure) =>{
    if(structure === 0){
        if(y === 0) return true;
        const buildable = builded.some(([bx,by,bs]) => 
        (bx === x && by === y-1 && bs === structure) ||
        (bx === x-1 && by===y && bs !==structure) ||
        (bx === x && by === y && bs !==structure)
        )
        return buildable;
    }
    else{
        if(builded.find(([bx,by,bs]) =>(bx === x-1 && by === y && bs === structure ))&&
           builded.find(([bx,by,bs]) => (bx=== x+1 && by === y && bs === structure)) ){
               return true;
           }
        const buildable = builded.some(([bx,by,bs])=>
        (bx === x && by === y-1 && bs !== structure) ||
        (bx === x+1 && by === y-1 && bs !==structure) 
        )
        return buildable;
    }

}
const destroy = (x,y,builded,structure) =>{
    let copyBuilded = [...builded];
    const index = copyBuilded.findIndex(([bx,by,bs])=> bx === x && by === y && bs === structure);
    copyBuilded.splice(index,1);

    for(let i=0; i<copyBuilded.length; i++){
        const [x,y,a] = copyBuilded[i];
        if(!isBuildable(x,y,copyBuilded,a)){
            return ;
        }
    }
    builded.splice(index,1);
    return true;
}

const solution = (n,build_frame) =>{
    // x 가로 y 세로 // 0 기둥 1 보 // 0 삭제 1 설치 바닥 보 x 벽면 벗어나게 x
    let builded = [];
    for(let i=0; i<build_frame.length; i++){
        const [x,y,a,b] = build_frame[i];
        if(b === 0){
            destroy(x,y,builded,a);
        }
        else{
            if(isBuildable(x,y,builded,a)){
                builded.push([x,y,a]);
            }
        }
    }
    return builded.sort((a,b)=>{
        if(a[0] === b[0]){
            if(a[1] === b[1]) return a[2] - b[2];
            return a[1] - b[1];
        }
        return a[0] - b[0]
    });
}
// console.log(solution(5,[[1,0,0,1],[1,1,1,1],[2,1,0,1],[2,2,1,1],[5,0,0,1],[5,1,0,1],[4,2,1,1],[3,2,1,1]]))
console.log(solution(5,[[0,0,0,1],[2,0,0,1],[4,0,0,1],[0,1,1,1],[1,1,1,1],[2,1,1,1],[3,1,1,1],[2,0,0,0],[1,1,1,0],[2,2,0,1]]))