const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<4 && x<4);

const findCard = (y,x,count,cardNumber,board) =>{
    let visited = Array.from({length:4},()=>Array(4).fill(false));
    visited[y][x] = true;
    let queue = [[y,x,count]];

    while(queue.length){
        const [cy,cx,count] =queue.shift();
        if(board[cy][cx] === cardNumber){
            board[cy][cx] = 0;

            return [cy,cx,count+1];
        }
        for(let i=0; i<4; i++){
            let [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx)) continue;
            // visited[ny][nx] 를 continue 로 처리하면 이미 Ctrl 를 누른상태로 가는 곳을 보장할 수 가 없다.
            // (0,3) 에서 queue 에 (1,3) 과 (0,0)  추가 될것이고 (1,3) 먼저 queue 에 들어갔으므로, (1,0) 이 추가된다.
            // (0,0) 에서 (1,0) 을 추가하려고 할때 이미 (1,0) 이 추가 되었으므로 continue 로 처리하면 Ctrl 로 갈 수 있는 곳을 보장 할 수 없다.
            if(!visited[ny][nx]){
            queue.push([ny,nx,count+1]);
            visited[ny][nx] = true;
            }

            while(true){
                if(!isValidPos(ny,nx)){
                   const [ey,ex] = [ny-dy[i],nx-dx[i]];
                   if(!visited[ey][ex]){
                       queue.push([ey,ex,count+1]);
                       visited[ey][ex] = true;
                    }
                   break;
                }
                if(board[ny][nx]){
                    if(!visited[ny][nx]){
                        queue.push([ny,nx,count+1]);
                        visited[ny][nx] = true;
                    }
                    break;
                }
                
                ny+=dy[i] , nx+=dx[i]
            }

        }
    }
}
const getMaxNumber = (board) => {
    let max = 0;
    for(let i=0; i<4; i++){
       max = Math.max(max,...board[i]);
    }
    return max ;
}

const solution = (board,r,c) =>{
    const n = getMaxNumber(board);
    let visited = Array(n+1).fill(false);
    visited[0] = true;
    let order = Array(n);
    let min = Infinity;
    const cardOrder = (index) => {
        if(index === n){

            let copyBoard = Array.from({length:4},(_,i)=>[...board[i]]);
            let [sy,sx] = [r,c];
            let count = 0;
            for(let i=0; i<order.length; i++){
                const [y,x,cnt] = findCard(sy,sx,count,order[i],copyBoard);
                //console.log(cnt);
                sy = y , sx = x, count = cnt;
                //console.log(copyBoard.map(row => row.join(' ')).join('\n'))
                const [ny,nx,nCnt] =findCard(sy,sx,count,order[i],copyBoard);
                sy = ny , sx = nx, count = nCnt;
                //console.log(nCnt);
                
            }
            min = Math.min(count,min);
            return;
        }
        for(let i=1; i<=n; i++){
            if(!visited[i]){
                visited[i] = true;
                order[index] = i;
                cardOrder(index+1);
                visited[i] = false;
            }
        }
    }
    cardOrder(0);
    return min;
}
//const [board,r,c] = [[[1,0,0,3],[2,0,0,0],[0,0,0,2],[3,0,1,0]],1,0];
const [board,r,c] =[[[3,0,0,2],[0,0,1,0],[0,1,0,0],[2,0,0,3]],0,1]
console.log(solution(board,r,c));