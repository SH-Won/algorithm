//const board =[[0,0,0],[0,0,0],[0,0,0]];
const board = [[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]]
//const board = [[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]];
// const solution = (board) =>{
//     let cost = Array.from({length:board.length},()=>Array(board.length).fill(Infinity));
//     const dy = [1,-1,0,0];
//     const dx = [0,0,1,-1];
//     const isValidPos = (y,x) => (y>=0 && x>=0 && y<board.length &&x<board.length);
//     cost[0][0] = 0;
//     let queue = [[0,0,-1,0]];
//     while(queue.length){
//         const [y,x,dir,c] = queue.shift();
//         for(let i=0; i<4; i++){
//             const [ny,nx] = [y+dy[i],x+dx[i]];
//             if(!isValidPos(ny,nx) || board[ny][nx] === 1) continue;
//             if(dir === -1){
//                 queue.push([ny,nx,i,100]);
//                 cost[ny][nx] = 100;
//                 continue;
//             }
//             const addCost = i === dir ? 100 : 600;
//             if(cost[ny][nx] >= c+addCost ){
//                 queue.push([ny,nx,i,c+addCost]);
//                 cost[ny][nx] = c+addCost;
//             }
//         } 
//     }
//     console.log(cost.map(r => r.join('    ')).join('\n'))
//     return cost[board.length-1][board.length-1];
// }
const solution = (board) => {
    let cost = Array.from({length:board.length},()=>Array.from({length:board.length},()=>Array(4).fill(Infinity)));
    const dy = [1,-1,0,0];
    const dx = [0,0,1,-1];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<board.length &&x<board.length);
    cost[0][0].forEach((num,index)=>cost[0][0][index] = 0);
    let queue = [];
    for(let i=0; i<4; i++){
        const [ny,nx]=[dy[i],dx[i]];
        if(!isValidPos(ny,nx) || board[ny][nx]) continue;
        cost[ny][nx][i] = 100;
        queue.push([ny,nx,i,100]); 
    }
    while(queue.length){
        const [y,x,dir,c] = queue.shift();
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || board[ny][nx]) continue;
            const nextCost = i === dir ? 100 : 600;
            if(cost[ny][nx][i] > c+nextCost){
                queue.push([ny,nx,i,c+nextCost]);
                cost[ny][nx][i] = c+nextCost;
            }
        }
    }
    return Math.min(...cost[board.length-1][board.length-1]);
}
solution(board);