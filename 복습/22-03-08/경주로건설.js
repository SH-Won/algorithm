const solution = board =>{
    const n = board.length;
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<n && x<n);
    const costs = Array.from({length:n},()=>Array.from({length:n},()=> Array(4).fill(Infinity)));
    const queue = [];
    for(let i=0; i<4; i++){
        const [ny,nx] = [dy[i],dx[i]];
        costs[0][0][i] = 0;
        if(!isValidPos(ny,nx) || board[ny][nx]) continue;
        queue.push([ny,nx,i]);
        costs[ny][nx][i] = 100;
    }
    while(queue.length){
        const [y,x,dir] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || board[ny][nx] ) continue;
            let nextCost = dir === i ? costs[y][x][dir] + 100 : costs[y][x][dir] + 600;
            if(costs[ny][nx][i] > nextCost){
                queue.push([ny,nx,i]);
                costs[ny][nx][i] = nextCost;
            }
        }
    }
    return Math.min(...costs[n-1][n-1]);
}
// console.log(solution([[0,0,0],[0,0,0],[0,0,0]]))
// console.log(solution([[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]]))
// console.log(solution([[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]]))
console.log(solution([[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]]))