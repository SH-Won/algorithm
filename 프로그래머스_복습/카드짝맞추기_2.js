const [dr,dc] = [[1,-1,0,0],[0,0,1,-1]];
const isValidPos = (r,c) => (r>=0 && c>=0 && r<4 && c<4);
const findCard = (sr,sc,count,matchCard,board) =>{
    let visited = Array.from({length:4},()=>Array(4).fill(false));
    visited[sr][sc] = true;
    let queue = [[sr,sc,count]];
    while(queue.length){
        const [r,c,cnt] = queue.shift();
        if(board[r][c] === matchCard){
            board[r][c] = 0;
            return [r,c,cnt+1];
        }
        for(let i=0; i<4; i++){
            let [nr,nc] = [r+dr[i],c+dc[i]];
            if(!isValidPos(nr,nc)) continue;
            if(!visited[nr][nc]){
                queue.push([nr,nc,cnt+1]);
                visited[nr][nc] = true;
            }
            if(board[nr][nc]) continue;
            while(isValidPos(nr,nc) && !board[nr][nc]){
                nr+=dr[i] , nc+=dc[i];
            }
            // !visited[nr][nc] 때문에 방문을 했다면 
            // 밑에 if 문으로 넘어가기 때문에 잘못된 로직
            // if(isValidPos(nr,nc) && !visited[nr][nc]){
            //     visited[nr][nc] = true;
            //     queue.push([nr,nc,cnt+1]);
            //     continue;
            // }
            // const [pr,pc] = [nr-dr[i],nc-dc[i]];
            // if(!visited[pr][pc]){
            //      visited[pr][pc] = true;
            //      queue.push([pr,pc,cnt+1]);
            // }

            if(isValidPos(nr,nc)){
                if(!visited[nr][nc]){
                visited[nr][nc] = true;
                queue.push([nr,nc,cnt+1]);
                }
                continue;
            }
            const [pr,pc] = [nr-dr[i],nc-dc[i]];
            if(!visited[pr][pc]){
                 visited[pr][pc] = true;
                 queue.push([pr,pc,cnt+1]);
            }
        }
    }


}
const solution = (board,r,c)=>{
    const maxCardNumber = Math.max(...board.flat());
    let cardOrder = Array(maxCardNumber);
    let visited = Array(maxCardNumber+1).fill(false);
    let min = Infinity;
    const makeOrder = (count) =>{
        if(count === maxCardNumber){
            let copyBoard = board.map(row => [...row]);
            let [sr,sc,count] = [r,c,0];
            for(let i=0; i<cardOrder.length; i++){
                const card = cardOrder[i];
                [sr,sc,count] = findCard(sr,sc,count,card,copyBoard);
                [sr,sc,count] = findCard(sr,sc,count,card,copyBoard);
            }
            min = Math.min(min,count);
            return;
        }
        for(let i=1; i<=maxCardNumber; i++){
            if(!visited[i]){
                visited[i] = true;
                cardOrder[count] = i;
                makeOrder(count+1);
                visited[i] = false;
            }
        }
    }
    makeOrder(0);
    return min;
}
// const [board,r,c] = [[[1,0,0,3],[2,0,0,0],[0,0,0,2],[3,0,1,0]],1,0];
const [board,r,c] =[[[3,0,0,2],[0,0,1,0],[0,1,0,0],[2,0,0,3]],0,1]
console.log(solution(board,r,c));