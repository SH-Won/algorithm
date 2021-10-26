
const bfs = (map) =>{
    const N = map.length;
    let board = Array.from({length:N+2},()=>Array(N+2).fill(1));
    for(let y=1; y<=N; y++){
        for(let x=1; x<=N; x++){
            board[y][x] = map[y-1][x-1];
        }
    }
    const [y,x] = [0,1];
    const dy = [-1,1,0,0];
    const dx = [0,0,-1,1];
    const [UP,DOWN,LEFT,RIGHT] = [0,1,2,3];
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);
    const getNextPos = (left,right) =>{
        let next =[];
        if(left[y] === right[y]){
            for(let dir=0; dir<4; dir++){
                const [ny1,nx1,ny2,nx2] = [left[y]+dy[dir],left[x]+dx[dir],right[y]+dy[dir],right[x]+dx[dir]];
                if(board[ny1][nx1] || board[ny2][nx2]) continue;
                next.push([[ny1,nx1],[ny2,nx2]]);
                if(dir === UP || dir===DOWN){
                   next.push([left,[ny1,nx1]])
                   next.push([[ny2,nx2],right])
                }
            }
        }
        else{
            for(let dir=0; dir<4; dir++){
                const [ny1,nx1,ny2,nx2] = [left[y]+dy[dir],left[x]+dx[dir],right[y]+dy[dir],right[x]+dx[dir]];
                if(board[ny1][nx1] || board[ny2][nx2]) continue;
                next.push([[ny1,nx1],[ny2,nx2]]);
                if(dir === LEFT || dir===RIGHT){
                   next.push([left,[ny1,nx1]])
                   next.push([[ny2,nx2],right])
                }
            }
        }
        return next;
    }
    let visited = new Set();
    visited.add('1112');
    let queue = [[[1,1],[1,2],0]];
    const end =`${N}${N}`
    while(queue.length){

        const [left,right,time] = queue.shift();
        if(left.join('') ===end || right.join('') === end) return time
        const next = getNextPos(left,right);
        for(let i=0; i<next.length; i++){
            const [nextLeft,nextRight] = next[i];
            const nextVisit = nextLeft.join('')+nextRight.join('');
            if(!visited.has(nextVisit)){
                queue.push([nextLeft,nextRight,time+1]);
                visited.add(nextVisit);
            }
        }
    }
    


}
const solution = (board) => {
    return bfs(board);
}
const board = [[0, 0, 0, 1, 1],[0, 0, 0, 1, 0],[0, 1, 0, 1, 1],[1, 1, 0, 0, 1],[0, 0, 0, 0, 0]];
console.log(solution(board));