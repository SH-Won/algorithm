const dy = [1,-1,0,0], dx = [0,0,1,-1];
const getBlock = (start,board,value) =>{
    const [sy,sx] = start;
    const [row,column] = [board.length, board[0].length];
    board[sy][sx] = -1;
    let queue = [[sy,sx]], idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if( ny < 0 || nx <0 || ny >= row || nx >=column  || board[ny][nx] !== value) continue;
            queue.push([ny,nx]);
            board[ny][nx] = -1;
        }
    } 
    return queue.sort();
}
const rotate = (block) =>{
    let width = Math.max(...block.map(el => el[1])) //- Math.min(...block.map(el => el[1]));
    let height = Math.max(...block.map(el => el[0])) //-Math.min(...block.map(el => el[0]));
    let temp ;
    let result = [block];
    for(let i=0; i<3; i++){
        const rotateBlock = result[result.length-1].map(([y,x])=>[x,height-y]).sort();
        //                                          [0,0],[1,-1],[1,0],[1,1]; [1,1],[2,0],[1,0],[0,0];    
        result.push([...rotateBlock]);
        temp = width;
        width = height;
        height = temp;
    }
    // console.log(block);
    // console.log(result);
    return result.sort()[0];
}
const locate = (block) =>{
    let minY = Math.min(...block.map(el => el[0]));
    let minX = Math.min(...block.map(el => el[1]));
    return block.map(([y,x]) => [y-minY,x-minX]).sort();
}
const solution = (gameBoard,table) =>{
    let spaces = [] , puzzles = [] , answer = 0;
    for(let y=0; y<gameBoard.length; y++){
        for(let x=0; x<gameBoard[0].length; x++){
            if(gameBoard[y][x] === 0){
                let space = getBlock([y,x],gameBoard,0);
                space = locate(space);
                // console.log(space);
                space = rotate(space);
                spaces.push(space); 
            }
            if(table[y][x] === 1){
                let puzzle = getBlock([y,x],table,1);
                puzzle = locate(puzzle);
                puzzle = rotate(puzzle);
                puzzles.push(puzzle);
            }
        }
    }
    //  console.log(spaces);
    //  console.log(puzzles);
    for(let i=0; i<spaces.length; i++){
        const space = spaces[i].reduce((acc,cur)=> acc+=`${cur.join(',')},` ,"")
        for(let j=0; j<puzzles.length; j++){
            const puzzle = puzzles[j].reduce((acc,cur)=> acc+=`${cur.join(',')},`,"")
            // console.log(space);
            if(space === puzzle){
                // console.log(puzzles[j].length);
                answer+= puzzles[j].length;
                puzzles.splice(j,1);
                break;
            }
        }
    }
    return answer;
}
const [gameBoard,table] = [[[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]],[[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]]];
// const [gameBoard,table] = [[[0,0,0],[1,1,0],[1,1,1]],[[1,1,1],[1,0,0],[0,0,0]]]
console.log(solution(gameBoard,table))