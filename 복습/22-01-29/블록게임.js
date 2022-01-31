const rect = [
    [[1,1,1],
     [0,0,1],
     [0,0,0]],
    [[1,1,0],
     [1,0,0],
     [1,0,0]],
    [[1,0,0],
     [1,1,1],
     [0,0,0]],
    [[0,1,0],
     [0,1,0],
     [1,1,0]],
    [[1,1,1],
     [1,0,0],
     [0,0,0]],
    [[1,0,0],
     [1,0,0],
     [1,1,0]],
    [[0,0,1],
     [1,1,1],
     [0,0,0]],
    [[1,1,0],
     [0,1,0],
     [0,1,0]],
    [[0,1,0],
     [1,1,1],
     [0,0,0]],
    [[1,0,0],
     [1,1,0],
     [1,0,0]],
    [[1,1,1],
     [0,1,0],
     [0,0,0]],
    [[0,1,0],
     [1,1,0],
     [0,1,0]],
]
const removable = [false,false,true,true,false,true,true,false,true,false,false,false];
const nonCheckX = [-1,-1,0,1,-1,0,2,-1,1,0,-1,-1]

const getBlock = (y,x,board) =>{
    const color = board[y][x];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    board[y][x] = 0;
    let blocks = [[y,x]], idx = 0;
    while(idx < blocks.length){
        const [y,x] = blocks[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i], x+dx[i]];
            if(ny < 0 || nx < 0 || ny >=board.length || nx >=board.length || board[ny][nx] !==color) continue;
            blocks.push([ny,nx]);
            board[ny][nx] = 0;
        }
    }
    return {blocks,color};
}
const getMatrix = (blocks) =>{
    const minY = Math.min(...blocks.map(el => el[0]));
    const minX = Math.min(...blocks.map(el => el[1]));
    let matrix = Array.from({length:3},()=>Array(3).fill(0));
    for(let i=0; i<blocks.length; i++){
        const [y,x] = blocks[i];
        matrix[y-minY][x-minX] = 1;
    }
    return {matrix,minX};
}
const findRect = (matrix) =>{
    let nth ;
    for(let i=0; i<rect.length; i++){
        const flag = ((matrix,rect) =>{
            for(let y=0; y<3; y++){
                for(let x=0; x<3; x++){
                    if(matrix[y][x] !== rect[y][x]) return false;
                }
            }
            return true;
        })(matrix,rect[i])
        if(flag){
            nth = i;
            break;
        }
    }
    return nth;
}
const aboveBlock = (blocks,nth,minX,board) =>{
    const nonX = nonCheckX[nth] === -1 ? -1 : nonCheckX[nth] + minX;
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
     const {matrix,minX} = getMatrix(blocks);
     const nth = findRect(matrix);
     if(removable[nth]){
         if(aboveBlock(blocks,nth,minX,board)){
            blocks.forEach(([y,x]) => board[y][x] = color);
            return 0;
         }else{
            flag = true;
            return 1;
         }
     }else{
        blocks.forEach(([y,x]) => (board[y][x] = color , visited[y][x] = true));
        return 0;
     }
}
const solution = board => {
    const n = board.length; 
    let visited = Array.from({length:n},()=>Array(n).fill(false));
    let flag = false ; // 블록이 제거됬는지 확인하는 flag;
    let answer = 0;
    for(let y=0; y<n; y++){
        if(flag) y=0;
        flag = false;
        for(let x=0; x<n; x++){
            if(board[y][x]){
               answer +=removeBlock(y,x,flag,board,visited);
            }
        }
    }
    return answer;
}

console.log(solution([[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,4,0,0,0],[0,0,0,0,0,4,4,0,0,0],[0,0,0,0,3,0,4,0,0,0],[0,0,0,2,3,0,0,0,5,5],[1,2,2,2,3,3,0,0,0,5],[1,1,1,0,0,0,0,0,0,5]]))
