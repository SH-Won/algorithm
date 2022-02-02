const getBlock = (y,x,value,map) =>{
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    const change = value === 0 ? 1 : 0;
    map[y][x] = change;
    let queue = [[y,x]] , idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= map.length || nx >= map.length || map[ny][nx] !== value) continue;
            queue.push([ny,nx]);
            map[ny][nx] = change;
        }
    }
    return queue.sort();
}
const locate = (block) =>{
    const minY = Math.min(...block.map(el => el[0]));
    const minX = Math.min(...block.map(el => el[1]));
    return block.map(([y,x]) => [y-minY,x-minX]).sort();
}
const rotate = (block) =>{
    let height = Math.max(...block.map(el => el[0]));
    let width = Math.max(...block.map(el => el[1]));
    let temp ;
    const result = [block];
    for(let i=0; i<3; i++){
        const rotateBlock = result[result.length-1].map(([y,x]) => [width-x,y]).sort();
        result.push(rotateBlock);
        temp = width;
        width = height;
        height = temp;
    }
    return result.sort()[0]
}
const process = (y,x,value,map) =>{
    let block = getBlock(y,x,value,map);
    block = locate(block);
    block = rotate(block);
    return block;
}
const solution = (game_board,table) =>{
    const n = game_board.length;
    const space = [] , puzzle = [];
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++){
            if(game_board[y][x] === 0) space.push(process(y,x,0,game_board));
            if(table[y][x] === 1) puzzle.push(process(y,x,1,table))
        }
    }
    let answer = 0;
    for(let i=0; i<space.length; i++){
        const s = space[i].join(' ');
        for(let j=0; j<puzzle.length; j++){
            const p = puzzle[j].join(' ');
            if(s === p){
                answer += puzzle[j].length;
                puzzle.splice(j,1);
                break;
            }
        }
    }
    return answer;
}
console.log(solution([[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]],[[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]]))

