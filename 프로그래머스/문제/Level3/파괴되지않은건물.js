const solution = (board,skill) =>{
    const [R,C] = [board.length, board[0].length]
    let accMap = Array.from({length:R+1},()=>Array(C+1).fill(0));
    for(let i=0; i<skill.length; i++){
        const [type,r1,c1,r2,c2,degree] = skill[i];
        if(type === 1){
           accMap[r1][c1] -= degree;
           accMap[r1][c2+1] +=degree;
           accMap[r2+1][c1] +=degree;
           accMap[r2+1][c2+1] -=degree;
        }
        else{
           accMap[r1][c1] +=degree;
           accMap[r1][c2+1] -=degree;
           accMap[r2+1][c1] -=degree;
           accMap[r2+1][c2+1] +=degree;
        }
    }
    for(let y=0; y<R; y++){
        for(let x=1; x<C; x++){
            accMap[y][x] += accMap[y][x-1];
        }
    }
    for(let x=0; x<C; x++){
        for(let y=1; y<R; y++){
            accMap[y][x] += accMap[y-1][x];
        }
    }
    let answer = 0;
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(board[y][x]+accMap[y][x] > 0) answer++;
        }
    }
    return answer;
}
// console.log(solution([[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5]],[[1,0,0,3,4,4],[1,2,0,2,3,2],[2,1,0,3,1,2],[1,0,1,3,3,1]]))
console.log(solution([[1,2,3],[4,5,6],[7,8,9]],[[1,1,1,2,2,4],[1,0,0,1,1,2],[2,2,0,2,0,100]]))