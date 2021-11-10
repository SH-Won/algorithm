

const solution = (board) =>{
    const N = board.length;
    let cost = Array.from({length:N},()=>Array.from({length:N},()=>Array(4).fill(Infinity)));
    const dy = [1,-1,0,0];
    const dx = [0,0,1,-1]; 

    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    let queue = [];
    for(let dir = 0; dir<4; dir++){
        cost[0][0][dir] = 0;
        const [ny,nx] = [dy[dir],dx[dir]];
        if(!isValidPos(ny,nx) || board[ny][nx]) continue;
        queue.push([0,0,dir,0]);
    }
    while(queue.length){
        const [y,x,dir,c] = queue.shift();
        for(let nextDir=0; nextDir<4; nextDir++){
            const [ny,nx] = [y+dy[nextDir],x+dx[nextDir]];
            if(!isValidPos(ny,nx) || board[ny][nx] ) continue;
            const addCost = dir === nextDir ? 100 : 600;
            if(cost[ny][nx][nextDir] > c+addCost){
                cost[ny][nx][nextDir] = c+addCost;
                queue.push([ny,nx,nextDir,c+addCost]);
            }
            
        }
    }
    
    return Math.min(...cost[board.length-1][board.length-1]);
}

// const board =[[0,0,0],[0,0,0],[0,0,0]];
//const board = [[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]]
// const board =[[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]]
const board = [[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]]
console.log(solution(board));