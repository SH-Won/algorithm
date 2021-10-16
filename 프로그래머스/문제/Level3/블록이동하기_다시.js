const bfs = (map) =>{
    const n = map.length;
    let visited = new Set(['1112']);
    let board = Array.from({length:n+2},()=>Array(n+2).fill(1));
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++){
            board[y+1][x+1] = map[y][x];
        }
    }
    const dy = [1,-1,0,0];
    const dx = [0,0,1,-1]
    const dr = [-1,1];
    const [y,x] = [0,1];
    const destination = ""+n+n;
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<n && x<n);
    const nextRobotPos = (left,right)=>{
         let next = [];
         for(let i=0; i<4; i++){
             const [ny1,nx1,ny2,nx2] = [left[y]+dy[i],left[x]+dx[i],right[y]+dy[i],right[x]+dx[i]];
             
             //if(!isValidPos(ny1,nx1) || !isValidPos(ny2,nx2) ) continue;
             if(board[ny1][nx1] ===0 && board[ny2][nx2]===0) next.push([[ny1,nx1],[ny2,nx2]]);
         }    
         if(left[y] === right[y]){
             for(let i=0; i<2; i++){
                 const [ny1,ny2] = [left[y]+dr[i],right[y]+dr[i]];
                 //if(!isValidPos(ny1,left[x]) || !isValidPos(ny2,right[x])) continue;
                 if(board[ny1][left[x]] ===0 && board[ny2][right[x]]===0){
                     next.push([left,[ny1,left[x]]]);
                     next.push([[ny2,right[x]],right])
                 }
             }
         }
         else{
             for(let i=0; i<2; i++){
                 const [nx1,nx2] = [left[x]+dr[i],right[x]+dr[i]];
                // if(!isValidPos(left[y],nx1) || !isValidPos(right[y],nx2)) continue;
                 if(board[left[y]][nx1] ===0 && board[right[y]][nx2] ===0){
                     next.push([left,[left[y],nx1]]);
                     next.push([[right[y],nx2],right]);
                 }
             }
         }  
         
         return next;  
    }
    let queue = [[[1,1],[1,2],0]];
    while(queue.length){
        const [left,right,time] = queue.shift();
        if(left.join('')===destination || right.join('')===destination){
            return time;
        }
        const next = nextRobotPos(left,right);
        for(let i=0; i<next.length; i++){
            const [nl,nr] = next[i]
            const nextPos = nl.join('')+nr.join('');
            if(!visited.has(nextPos)){
                queue.push([nl,nr,time+1]);
                visited.add(nextPos);
            }
        }
    }
}
const solution =(board)=>{
    return bfs(board);
}
const board = [[0, 0, 0, 1, 1],[0, 0, 0, 1, 0],[0, 1, 0, 1, 1],[1, 1, 0, 0, 1],[0, 0, 0, 0, 0]];
console.log(solution(board));