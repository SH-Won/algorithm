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
const checkX = [-1,-1,0,1,-1,0,2,-1,1,-1,-1,-1];

const getBlock = (y,x,board) =>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const color = board[y][x];
    let queue = [[y,x]] ,idx = 0;
    while(idx < queue.length){
       const [y,x] = queue[idx++];
       for(let i=0; i<4; i++){
         const [ny,nx] = [y+dy[i],x+dx[i]];
         if(ny < 0 || nx < 0 || ny >= board.length || nx >= board.length || board[ny][nx] !== color) continue;
         queue.push([ny,nx]);
         board[ny][nx] = 0;
       }
    }
    return {blocks:queue,color};
}
const getMatrix = (blocks) =>{
   let matrix = Array.from({length:3},()=>Array(3).fill(0));
   const minY = Math.min(...blocks.map(el => el[0]));
   const minX = Math.min(...blocks.map(el => el[1]));
   for(let i=0; i<blocks.length; i++){
     const [y,x] = blocks[i];
     matrix[y-minY][x-minX] = 1;
   }
   return {matrix,minX};
}
const findRect = (matrix,minX) =>{
   let nth ;
   for(let i=0; i<12; i++){
      const isFind = ((matrix,rect) =>{
        for(let y=0; y<3; y++){
          for(let x=0; x<3; x++){
            if(matrix[y][x] !== rect[y][x]) return false;
          }
        }
        return true
      })(matrix,rect[i]);
      if(isFind){
         nth = i;
         break;
      }
   }
   let nonX = checkX[nth] === -1 ? -1 : checkX[nth] + minX;
   return {isRemovable : isPossible[nth] , nonX}
}
const aboveBlockCheck = (blocks,nonX,board) =>{
   for(let i=0; i<blocks.length; i++){
     let [y,x] = blocks[i];
     if(x === nonX) continue;
     while(--y >=0){
       if(board[y][x]) return true;
     }
   }
   return false;
}
const removeBlock = (y,x,flag,board,visited) =>{
    if(visited[y][x]) return 0;
    const {blocks,color} = getBlock(y,x,board);
    const {matrix,minX}  = getMatrix(blocks);
    const {isRemovable,nonX} = findRect(matrix,minX);
    if(isRemovable){
      if(aboveBlockCheck(blocks,nonX,board)){
         blocks.forEach(([y,x]) => board[y][x] = color);
         return 0;
      }else{
        flag = true;
        return 1;
      }
    }
    else{
       blocks.forEach(([y,x]) => (visited[y][x] = true, board[y][x] = color))
       return 0;
    }
}
const solution = board => {
    const N = board.length;
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    let flag = false; // 블록이 사라졌는지 확인하는 플래그
    let answer = 0;
    for(let y=0; y<N; y++){
        if(flag) y=0;
        flag = false;
        for(let x=0; x<N; x++){
           if(board[y][x]) answer += removeBlock(y,x,flag,board,visited);
        }
    }
    return answer;
}
console.log(solution([[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,4,0,0,0],[0,0,0,0,0,4,4,0,0,0],[0,0,0,0,3,0,4,0,0,0],[0,0,0,2,3,0,0,0,5,5],[1,2,2,2,3,3,0,0,0,5],[1,1,1,0,0,0,0,0,0,5]]))
