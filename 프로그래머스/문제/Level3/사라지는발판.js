const solution = (board,aloc,bloc) =>{
    const [ay,ax,by,bx] = [...aloc,...bloc]
    const [dy,dx] =[[1,-1,0,0],[0,0,1,-1]];
    const isValidPos =(y,x) => (y>=0 && x>=0 && y<board.length && x<board[0].length);
    function A(ay,ax,by,bx,board){
        let aPos = [false,-1];
        if(!board[ay][ax]) return [false,0];
        board[ay][ax] = 0;
        for(let i=0; i<4; i++){
            const [ny,nx] = [ay+dy[i],ax+dx[i]];
            if(!isValidPos(ny,nx) || !board[ny][nx]) continue;
            let bPos = B(ny,nx,by,bx,board);
            if(!bPos[0]){
                if(aPos[1] === -1 || !aPos[0] || (aPos[0] && aPos[1] > bPos[1] +1)){
                    aPos = [true,bPos[1]+1];
                }
            }
            else if(aPos[1] === -1 || (!aPos[0] && aPos[1] < bPos[1] + 1)){
                aPos = [false,bPos[1]+1];
            }
        }
        board[ay][ax] = 1;
        if(aPos[1] === -1) return [false,0];
        return aPos;
    }
    function B(ay,ax,by,bx,board){
        let bPos = [false,-1];
        if(!board[by][bx]) return [false,0];
        board[by][bx] = 0;
        for(let i=0; i<4; i++){
            const [ny,nx] = [by+dy[i],bx+dx[i]];
            if(!isValidPos(ny,nx) || !board[ny][nx]) continue;
            let aPos = A(ay,ax,ny,nx,board);
            if(!aPos[0]){
                if(bPos[1] === -1 || !bPos[0] || (bPos[0] && bPos[1] > aPos[1] +1)){
                    bPos = [true,aPos[1]+1];
                }
            }
            else if(bPos[1] === -1 || (!bPos[0] && bPos[1] < aPos[1] + 1)){
                bPos = [false,aPos[1]+1];
            }
        }
        board[by][bx] = 1;
        if(bPos[1] === -1) return [false,0];
        return bPos;
    }
    return A(ay,ax,by,bx,board)[1];
}
console.log(solution([[1, 1, 1], [1, 1, 1], [1, 1, 1]],[1,0],[1,2]))
// console.log((solution([[1, 1, 1], [1, 0, 1], [1, 1, 1]],[1,0],[1,2])))