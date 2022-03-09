const rotate = (block) =>{
    let height = Math.max(...block.map(el => el[0]));
    let width = Math.max(...block.map(el => el[1]));
    let temp ;
    const result = [block];
    for(let i=0; i<3; i++){
        const rotateBlock = result[result.length-1].map(([y,x]) => [x,height-y]).sort();
        result.push(rotateBlock);
        temp = width;
        width = height;
        height = temp;
    }
    return result.sort()[0];
}
const locate = (block) =>{
    const minY = Math.min(...block.map(el => el[0]));
    const minX = Math.min(...block.map(el => el[1]));
    return block.map(([y,x]) => [y-minY,x-minX]).sort()
}
const getBlock = (y,x,board) =>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const fill = board[y][x] === 0 ? 1 : 0;
    board[y][x] = fill;
    let queue = [[y,x]] , idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= board.length || nx >= board[0].length || board[ny][nx] === fill) continue;
            queue.push([ny,nx]);
            board[ny][nx] = fill;
        }
    }
    return queue.sort();
}
const process = (y,x,board) =>{
    let block = getBlock(y,x,board);
    block = locate(block);
    block = rotate(block);
    return block;
}
const solution = (game_board,table) =>{
    const spaces = [];
    const puzzles = []
    for(let y=0; y<table.length; y++){
        for(let x=0; x<table[0].length; x++){
            if(game_board[y][x] === 0) spaces.push(process(y,x,game_board));
            if(table[y][x] === 1) puzzles.push(process(y,x,table));
        }
    }
    let answer = 0;
    for(let i=0; i<spaces.length; i++){
        const space = spaces[i].join(',');
        for(let j=0; j<puzzles.length; j++){
            const puzzle = puzzles[j].join(',');
            if(space === puzzle){
                answer += spaces[i].length;
                puzzles.splice(j,1);
                break;
            }
        }
    }
    return answer;
}
console.log(solution([[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]],[[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]]))