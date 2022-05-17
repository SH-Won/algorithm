const rotate = block => {
    let [height,width] = block.reduce((result,[y,x])=>{
        result[0] = Math.max(result[0],y) , result[1] = Math.max(result[1],x);
        return result 
    },[0,0]);
    const blockArr = [block];
    for(let i=0; i<3; i++){
        const rotatedBlock = blockArr[blockArr.length-1].map(([y,x]) => [x,height-y]).sort();
        blockArr.push(rotatedBlock);
        [height,width] = [width,height];
    }
    return blockArr.sort()[0];
}
const locate = block => {
    const [minY,minX] = block.reduce((result,[y,x]) =>{
       result[0] = Math.min(result[0],y), result[1] = Math.min(result[1],x);
       return result;
    },[Infinity,Infinity])
    return block.map(([y,x]) => [y-minY,x-minX]);
}
const getPiece = (y,x,board) =>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y >= 0 && x >= 0 && y<board.length && x<board[0].length);
    const fill = board[y][x] === 0 ? 1 : 0;
    board[y][x] = fill;
    let queue = [[y,x]] , idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || board[ny][nx] === fill) continue;
            board[ny][nx] = fill;
            queue.push([ny,nx]);
        }
    }
    return queue.sort();
}
const process = (y,x,board) =>{
    let block = getPiece(y,x,board);
    block = locate(block);
    block = rotate(block);
    return block;
}
const solution = (game_board,table) =>{
    const puzzles = [];
    const spaces = [];
    for(let y=0; y<table.length; y++){
        for(let x=0; x<table[0].length; x++){
            if(game_board[y][x] === 0) spaces.push(process(y,x,game_board));
            if(table[y][x] === 1) puzzles.push(process(y,x,table));
        }
    }
    let answer = 0;
    // console.log(puzzles,spaces);
    for(let i=0; i<spaces.length; i++){
        const space = spaces[i].join(',');
        for(let j=0; j<puzzles.length; j++){
            const puzzle = puzzles[j].join(',');
            if(space === puzzle){
                answer+= puzzles[j].length;
                puzzles.splice(j,1);
                break;
            }
        }
    }
    return answer;
}
console.log(solution([[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]],[[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]]))