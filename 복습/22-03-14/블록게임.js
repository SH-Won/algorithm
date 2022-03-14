const rect = [
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 0, 0],
    [1, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];
const isPossible = [false,false,true,true,false,true,true,false,true,false,false,false];
const nonCheckX = [-1,-1,0,1,-1,0,2,-1,1,-1,-1,-1];
const findBlock = (y,x,board) =>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const number = board[y][x];
    board[y][x] = 0;
    let queue = [[y,x]], idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= board.length || nx >= board[0].length || board[ny][nx] !== number) continue;
            queue.push([ny,nx]);
            board[ny][nx] = 0;
        }
    }
    return {blocks:queue,number};
}
const findRect = (blocks) =>{
    const minY = Math.min(...blocks.map(el => el[0]));
    const minX = Math.min(...blocks.map(el => el[1]));
    const newRect = Array.from({length:3},()=>Array(3).fill(0));
    blocks.forEach(([y,x]) => newRect[y-minY][x-minX] = 1);
    let nth ;
    for(let i=0; i<12; i++){
        const isFind = ((rect) =>{
            for(let y=0; y<3; y++){
               for(let x=0; x<3; x++){
                   if(rect[y][x] !== newRect[y][x]) return false;
               }
            }
            return true;
        })(rect[i])
        if(isFind){
            nth = i;
            break;
        }
    }
    const nonX = nonCheckX[nth] === -1 ? -1 : nonCheckX[nth] + minX;
    return {isRemovable : isPossible[nth], nonX};
}
const isAboveBlock = (blocks,nonX,board) =>{
    for(let i=0; i<blocks.length; i++){
        let [y,x] = blocks[i];
        if(x === nonX) continue;
        while(--y >= 0){
            if(board[y][x] !== 0) return true;
        }
    }
    return false;
}
const process = (y,x,flag,board,visited) =>{
    if(visited[y][x]) return 0;
    const {blocks,number} = findBlock(y,x,board);
    const {isRemovable,nonX} = findRect(blocks);
    if(isRemovable){
        if(isAboveBlock(blocks,nonX,board)){
           blocks.forEach(([y,x]) => board[y][x] = number);
           return 0;
        }
        else{
            flag = true;
            return 1;
        }
    }
    else{
        blocks.forEach(([y,x]) => (board[y][x] = number,visited[y][x] = true));
        return 0;
    }
}
const solution = board =>{
    let count = 0;
    const visited = Array.from({length:board.length},()=>Array(board[0].length).fill(false));
    let flag = false;
    for(let y=0; y<board.length; y++){
        if(flag) y = 0;
        flag = false;
        for(let x=0; x<board[0].length; x++){
            if(board[y][x] !== 0) count += process(y,x,flag,board,visited);
        }
    }
    return count;
}
console.log(solution([[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,4,0,0,0],[0,0,0,0,0,4,4,0,0,0],[0,0,0,0,3,0,4,0,0,0],[0,0,0,2,3,0,0,0,5,5],[1,2,2,2,3,3,0,0,0,5],[1,1,1,0,0,0,0,0,0,5]]))
