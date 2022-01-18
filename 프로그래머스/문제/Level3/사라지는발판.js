
const solution = (board,aloc,bloc) =>{
    const [R,C] = [board.length, board[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);
    let visited = Array.from({length:R},()=>Array(C).fill(false));
    const [ay,ax,by,bx] = [...aloc,...bloc];
    let queue = [[ay,ax,by,bx,0]];
    while(queue.length){
        const [ay,ax,by,bx,move] = queue.shift();
        let nextA = [];
        for(let i=0; i<4; i++){
            const [ny,nx] = [ay+dy[i],ax+dx[i]];
            if(!isValidPos(ny,nx) || !board[ny][nx] || visited[ny][nx]) continue;
            nextA.push([ny,nx]);
        }
        let nextB = [];
        for(let i=0; i<4; i++){
            const [ny,nx] = [by+dy[i],bx+dx[i]];
            if(!isValidPos(ny,nx) || !board[ny][nx] || visited[ny][nx]) continue;
            nextB.push([ny,nx]);
        }
        if(ay === by && ax === bx){
            if(!nextA.length) return move;
            return move+1;
        }

    }
}