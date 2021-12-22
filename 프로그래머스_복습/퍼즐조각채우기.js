// 겜보드 0 빈칸  테이블 1이 조각;
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const rotate = (block) =>{
    let height = Math.max(...block.map(el => el[0]));
    let width = Math.max(...block.map(el => el[1]));
    let temp ;
    let result = [block];
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
    return block.map(([y,x])=> [y-minY,x-minX]).sort();
}
const getBlock = (position,match,board) =>{
    const [row,column] = [board.length, board[0].length];
    board[position[0]][position[1]] = -1;
    let queue = [position] , idx=0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >=row || nx >=column ||board[ny][nx] !== match) continue;
            queue.push([ny,nx]);
            board[ny][nx] = -1;
        }
    }
    return queue.sort()
}
const solution = (game_board,table) =>{
    let blanks = [] , puzzles =[];
    for(let y=0; y<game_board.length; y++){
        for(let x=0; x<game_board[0].length; x++){
            if(game_board[y][x] === 0){
               let blank = getBlock([y,x],0,game_board);
               blank = locate(blank);
               blank = rotate(blank);
               blanks.push(blank);
            }
            if(table[y][x] === 1){
                let puzzle = getBlock([y,x],1,table);
                puzzle = locate(puzzle);
                puzzle = rotate(puzzle);
                puzzles.push(puzzle);
            }
        }
    }
    let fillCount = 0;
    for(let i=0; i<blanks.length; i++){
        const blank = blanks[i].join(',');
        for(let j=0; j<puzzles.length; j++){
            const puzzle = puzzles[j].join(',');
            if(blank === puzzle){
                fillCount+=puzzles[j].length;
                puzzles.splice(j,1);
                break;
            }
        }
    }
    return fillCount;
}
console.log(solution([[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]],[[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]]))