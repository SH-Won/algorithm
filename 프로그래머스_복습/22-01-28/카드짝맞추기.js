const getPermutation = (max,array) =>{
    if(max === 1) return array.map(el => [el]);
    const result = [];
    array.forEach((num,idx,origin)=>{
        const rest = [...origin.slice(0,idx),...origin.slice(idx+1)];
        const perms = getPermutation(max-1,rest);
        const attach = perms.map(perm => [num,...perm]);
        result.push(...attach);
    })
    return result;
}
const getMinCount = (r,c,order,board) =>{
    const [dr,dc] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (r,c) => (r>=0 && c>=0 && r<4 && c<4);
    let count = Array.from({length:4},()=>Array(4).fill(Infinity));

    const findCard = (r,c,cardNumber,mCount) =>{
        count.forEach(row => row.fill(Infinity));
        count[r][c] = mCount;
        let queue = [[r,c]]
        while(queue.length){
            const [r,c] = queue.shift();
            if(board[r][c] === cardNumber){
                board[r][c] = 0;
                return [r,c,count[r][c]+1];
            }
            for(let i=0; i<4; i++){
                let [nr,nc] = [r+dr[i],c+dc[i]];
                if(!isValidPos(nr,nc)) continue;
                if(count[nr][nc] > count[r][c] +1){
                    queue.push([nr,nc]);
                    count[nr][nc] = count[r][c] +1;
                }
                if(board[nr][nc]) continue;
                while(isValidPos(nr,nc) && !board[nr][nc]) nr+=dr[i] ,nc+=dc[i];
                
                if(!isValidPos(nr,nc)) nr-=dr[i] , nc-=dc[i];
                if(count[nr][nc] > count[r][c] + 1){
                    queue.push([nr,nc]);
                    count[nr][nc] = count[r][c] +1;
                }
            }
        }
    }
    let mCount = 0;
    for(let i=0; i<order.length; i++){
       [r,c,mCount] = findCard(r,c,order[i],mCount);
       [r,c,mCount] = findCard(r,c,order[i],mCount);
    }
    return mCount;
}
const solution = (board,r,c) =>{
    const maxCardNumber = Math.max(...board.flat());
    const perms = getPermutation(maxCardNumber,Array(maxCardNumber).fill().map((v,i) => i+1));
    let min = Infinity;
    for(let i=0; i<perms.length; i++){
        const copyBoard = board.map(row => [...row]);
        min = Math.min(min,getMinCount(r,c,perms[i],copyBoard))
    }
    return min;
}
// console.log(solution([[1,0,0,3],[2,0,0,0],[0,0,0,2],[3,0,1,0]],1,0))
console.log(solution([[3,0,0,2],[0,0,1,0],[0,1,0,0],[2,0,0,3]],0,1))