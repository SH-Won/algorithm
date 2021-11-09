
const solution = (board,r,c) =>{
    const n = board.length;
    let cardCount = Math.max(...board.flat());
    let card = Array(cardCount+1).fill(false);
    let order = Array(cardCount);
    let minTime = Infinity;
    const dr = [1,-1,0,0];
    const dc = [0,0,1,-1];
    const isValidPos = (r,c) => (r>=0 && c>=0 && r<n && c<n);
    const findCard = (r,c,matchCard,time,board) =>{
        let visited = Array.from({length:4},()=>Array(4).fill(false));
        visited[r][c] = true;
        let queue = [[r,c,time]];
        while(queue.length){
            const [cr,cc,time] = queue.shift();
            if(board[cr][cc] === matchCard){
                board[cr][cc] = 0;
                return [cr,cc,time+1];
            }
            for(let i=0; i<4; i++){
                let [nr,nc] = [cr+dr[i],cc+dc[i]];
                if(!isValidPos(nr,nc)) continue;
                if(!visited[nr][nc]){
                    queue.push([nr,nc,time+1]);
                    visited[nr][nc] = true;
                } 
                if(board[nr][nc]) continue;
                
                while(isValidPos(nr,nc) && !board[nr][nc]){
                    nr+=dr[i] , nc+=dc[i];
                }
                if(isValidPos(nr,nc) && !visited[nr][nc]){
                    visited[nr][nc] = true;
                    queue.push([nr,nc,time+1])
                }
                if(!isValidPos(nr,nc) && !visited[nr-dr[i]][nc-dc[i]]){
                    visited[nr-dr[i]][nc-dc[i]] = true;
                    queue.push([nr-dr[i],nc-dc[i],time+1]);
                }
            }
        }
    }
    
    const makeOrder = (count) =>{
        if(count === cardCount) {
            let [sr,sc,time] = [r,c,0];
            let copyBoard = Array.from({length:4},(_,i)=>[...board[i]])
            for(let i=0; i<order.length; i++){
                const matchCard = order[i];
                [sr,sc,time] = findCard(sr,sc,matchCard,time,copyBoard);
                [sr,sc,time] = findCard(sr,sc,matchCard,time,copyBoard);
            }
            minTime = Math.min(time,minTime);
            return;
        }
        for(let i=1; i<=cardCount; i++){
            if(!card[i]){
            order[count]=i;
            card[i] = true;
            makeOrder(count+1);
            card[i] = false;
            }
        }
    }
    makeOrder(0);
    return minTime;
}
const [board,r,c] = [[[1,0,0,3],[2,0,0,0],[0,0,0,2],[3,0,1,0]],1,0];
//const [board,r,c] =[[[3,0,0,2],[0,0,1,0],[0,1,0,0],[2,0,0,3]],0,1]
console.log(solution(board,r,c));