// 0 은 기둥 1 은 보 0 은 삭제 1은 설치
const isColumnBuildable = (builded,x,y) =>{
    if(y === 0) return true;
    const isBuildable = builded.some(([bx,by,kind])=>{
        if( (by === y-1 && bx === x && kind === 0) || 
            (bx === x-1 && by === y && kind === 1) ||
            (bx === x && by === y && kind === 1)) return true;
        return false;
    })
    return isBuildable;
}
const isBeamBuildable = (builded,x,y) =>{
    if(builded.some(([bx,by,kind])=> (bx === x-1 && by ===y && kind === 1)) &&
    builded.some(([bx,by,kind])=> ( bx === x+1 && by === y && kind ===1))){
           return true;
       }
    const isBuildable = builded.some(([bx,by,kind])=>{
        if((bx===x && by === y-1 && kind === 0) ||
           (bx === x+1 && by === y-1 && kind === 0) ) return true;
        return false;           
    })
    return isBuildable;
}

const destroy =(builded,x,y,kind) =>{
    let copyBuild = [...builded];
    const destroyIndex = copyBuild.findIndex(([bx,by,bk])=> (bx === x && by === y && bk ===kind));
    copyBuild.splice(destroyIndex,1);
    for(let i=0; i<copyBuild.length; i++){
        const [x,y,kind] = copyBuild[i];
        if(kind === 0){
            if(!isColumnBuildable(copyBuild,x,y)) return;
        }
        else{
            if(!isBeamBuildable(copyBuild,x,y)) return;
        }
    }
    builded.splice(destroyIndex,1);

}

const solution = (n,build_frame) =>{
    let builded = [];
    for(let i=0; i<build_frame.length; i++){
        const [x,y,a,b] = build_frame[i];
        if(b === 0){
           destroy(builded,x,y,a);
        }
        else if(a === 0 && b===1){
            if(isColumnBuildable(builded,x,y)) builded.push([x,y,a])
        }
        else if(a===1 && b === 1){
            if(isBeamBuildable(builded,x,y)) builded.push([x,y,a]);
        }
    }
    builded.sort((a,b)=>{
        if(a[0] === b[0]){
            if(a[1] === b[1]) return a[2] - b[2];
            return a[1] - b[1];
        }
        return a[0] - b[0];
    })
    return builded;
}
// const [n,build_frame]=[5,[[1,0,0,1],[1,1,1,1],[2,1,0,1],[2,2,1,1],[5,0,0,1],[5,1,0,1],[4,2,1,1],[3,2,1,1]]];
const [n,build_frame] =[5,[[0,0,0,1],[2,0,0,1],[4,0,0,1],[0,1,1,1],[1,1,1,1],[2,1,1,1],[3,1,1,1],[2,0,0,0],[1,1,1,0],[2,2,0,1]]]
console.log(solution(n,build_frame));
