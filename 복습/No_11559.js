const input = [
    '......',
    '......',
    '......',
    '......',
    '......',
    '......',
    '......',
    '......',
    '.Y....',
    '.YG...',
    'RRYG..',
    'RRYGG.'
    ]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const downBlock = (board) =>{
    for(let x=0; x<6; x++){
        const line = board.map(row => row[x]).filter(el => el !=='.');
        let y = 12;
        while(y--){
            if(line.length) board[y][x] = line.pop();
            else board[y][x] = '.';
        }
    }
}
const findSameBlock = (y,x,block,board,visited)=>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<board.length && x<board[0].length);
    visited[y][x] = true;
    let queue = [[y,x]], idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || board[ny][nx] !== block ) continue;
            visited[ny][nx] = true;
            queue.push([ny,nx]);
        }
    }
    if(queue.length >= 4){
       queue.forEach(([y,x])=>board[y][x] = '.');
       return true;
    }
    return false;
}
const solution = (input) =>{
    let board = input.map(row => row.split(''));
    let serial = 0;
    let visited = Array.from({length:12},()=>Array(6).fill(false));
    while(true){
        let isEnd = true;
        for(let y=0; y<12; y++){
            for(let x=0; x<6; x++){
                if(!visited[y][x] && board[y][x] !=='.'){
                    const flag = findSameBlock(y,x,board[y][x],board,visited);
                    if(isEnd && flag) isEnd = false;
                }
            }
        }
        if(isEnd) return console.log(serial);
        serial++;
        visited.forEach(row => row.fill(false));
        downBlock(board);
    }
}
solution(input);