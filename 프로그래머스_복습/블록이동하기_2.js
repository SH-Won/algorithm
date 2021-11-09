const dy = [0,0,-1,1];
const dx = [-1,1,0,0];
const [y,x] = [0,1];
const [LEFT,RIGHT,UP,DOWN] = [0,1,2,3]
const solution = (board) =>{
    const n = board.length;
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<n && x<n);
    const nextRobotPos = (left,right) =>{
        let next = [];
        if(left[y] === right[y]){
            for(let dir=0; dir<4; dir++){
                const [ly,lx,ry,rx] = [left[y]+dy[dir], left[x]+dx[dir], right[y]+dy[dir], right[x]+dx[dir]];
                if(!isValidPos(ly,lx) || !isValidPos(ry,rx) || board[ly][lx] || board[ry][rx] ) continue;
                next.push([[ly,lx],[ry,rx]]);
                if(dir===UP) next.push([[ly,lx],left], [[ry,rx],right]);
                else if(dir ===DOWN) next.push([[ly,lx],left], [[ry,rx],right]);
            }
        }
        else{
            for(let dir=0; dir<4; dir++){
                const [ly,lx,ry,rx] = [left[y]+dy[dir], left[x]+dx[dir], right[y]+dy[dir], right[x]+dx[dir]];
                if(!isValidPos(ly,lx) || !isValidPos(ry,rx) || board[ly][lx] || board[ry][rx] ) continue;
                next.push([[ly,lx],[ry,rx]]);
                if(dir===LEFT) next.push([[ly,lx],left], [[ry,rx],right]);
                else if(dir ===RIGHT) next.push([[ly,lx],left], [[ry,rx],right]);
            }
        }
        return next;
    }
    const destination = `${n-1},${n-1}`;
    let visited = new Set();
    visited.add(`0,0,0,1`);
    let queue = [[[0,0],[0,1],0]];
    while(queue.length){
        const [left,right,time] = queue.shift();
        
        if(left.join(',') === destination || right.join(',') === destination) return time;
        const next = nextRobotPos(left,right);
        for(let i=0; i<next.length; i++){
            const [nLeft,nRight] = next[i];
            const visit = `${nLeft.join(',')},${nRight.join(',')}`;
            if(!visited.has(visit)){
                queue.push([nLeft,nRight,time+1]);
                visited.add(visit);
            }
        }
    }
}

const board = [[0, 0, 0, 1, 1],[0, 0, 0, 1, 0],[0, 1, 0, 1, 1],[1, 1, 0, 0, 1],[0, 0, 0, 0, 0]];
console.log(solution(board));