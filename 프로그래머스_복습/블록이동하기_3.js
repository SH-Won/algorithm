
const getMinTime = (board) =>{
     const n = board.length;
     const isValidPos = (y,x) => (y>=0 && x>=0 && y<n && x<n);
     const [dy,dx] = [[0,0,-1,1],[-1,1,0,0]];
     const [LEFT,RIGHT,UP,DOWN] = [0,1,2,3];
     const [y,x] = [0,1];
     const destination = `${n-1},${n-1}`;
     let visit = new Set();
     visit.add('0,0,0,1');
     const getNextPos = (left,right) =>{
         let next = [];
         const horizon = left[y] === right[y] ? true : false;
            for(let dir=0; dir<4; dir++){
                const [ly,lx,ry,rx] = [left[y]+dy[dir], left[x]+dx[dir], right[y]+dy[dir], right[x]+dx[dir]]
                if(!isValidPos(ly,lx) || !isValidPos(ry,rx) || board[ly][lx] || board[ry][rx] ) continue;
                next.push([[ly,lx],[ry,rx]]);
                if((horizon && (dir === UP || dir === DOWN)) || 
                   (!horizon && (dir === LEFT || dir === RIGHT))) 
                   next.push([left,[ly,lx]],[right,[ry,rx]]);                
            }
        return next;
     }
     let queue =[[[0,0],[0,1],0]];
     while(queue.length){
         const [left,right,time] = queue.shift();
         if(left.join(',') === destination || right.join(',') === destination) return time;
         const nextPos = getNextPos(left,right);
         for(let i=0; i<nextPos.length; i++){
             const [left,right] = nextPos[i];
             const next = `${left.join(',')},${right.join(',')}`;
             if(!visit.has(next)){
                 queue.push([left,right,time+1]);
                 visit.add(next);
             }
         }
     }

}
const solution = (board) =>{
    return getMinTime(board);
}
const board = [[0, 0, 0, 1, 1],[0, 0, 0, 1, 0],[0, 1, 0, 1, 1],[1, 1, 0, 0, 1],[0, 0, 0, 0, 0]];
console.log(solution(board));