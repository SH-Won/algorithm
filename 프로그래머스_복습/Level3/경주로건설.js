const solution = board =>{
    const N = board.length;
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const costs = Array.from({length:N},()=>Array.from({length:N},()=>Array(4).fill(Infinity)));
    const queue = [];
    dy.forEach((_,i) => (queue.push([0,0,i]) , costs[0][0][i] = 0));
    while(queue.length){
        const [y,x,d] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || board[ny][nx]) continue;
            let nextCost = costs[y][x][d];
            d === i ? nextCost+=100 : nextCost+=600;
            if(costs[ny][nx][i] > nextCost){
                queue.push([ny,nx,i]);
                costs[ny][nx][i] = nextCost;
            }
        }
    }
    return Math.min(...costs[N-1][N-1]);
}
// console.log(solution([[0,0,0],[0,0,0],[0,0,0]]))
console.log(solution([[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]]))