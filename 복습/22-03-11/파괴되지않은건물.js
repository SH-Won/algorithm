const solution = (board,skill) =>{
    const [r,c] = [board.length, board[0].length];
    const map = Array.from({length:r+1},()=>Array(c+1).fill(0));
    skill.forEach(([type,r1,c1,r2,c2,degree])=>{
        if(type === 1){
            map[r1][c1] -= degree;
            map[r1][c2+1] += degree;
            map[r2+1][c1] += degree;
            map[r2+1][c2+1] -=degree;
        }else{
            map[r1][c1] += degree;
            map[r1][c2+1] -= degree;
            map[r2+1][c1] -= degree;
            map[r2+1][c2+1] +=degree;
        }
    })
    for(let y=0; y<r; y++){
        for(let x=1; x<c; x++) map[y][x] += map[y][x-1];
    }
    for(let x=0; x<c; x++){
        for(let y=1; y<r; y++) map[y][x] += map[y-1][x];
    }
    let answer = 0;
    for(let y=0; y<r; y++){
        for(let x=0; x<c; x++){
            if(board[y][x] + map[y][x] > 0) answer++;
        }
    }
    return answer;
}