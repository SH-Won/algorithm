// const input = ['2 0 3'];
// const input = ['2 1 3','1 1']
// const input = ['5 5 6','1 1','3 2','2 3','5 1','5 4']
// const input = ['5 8 6','1 1','2 2','3 3','4 4','3 1','4 2','5 3','6 4']
// const input = ['5 12 6','1 1','1 3','2 2','2 4','3 1','3 3','4 2','4 4','5 1','5 3','6 2','6 4']
const input = ['5 6 6','1 1','3 1','5 2','4 3','2 3','1 4']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const isPossible = (start,ladder) =>{
    let [y,x] = [1,start];
    let moveX = false;
    while(y < ladder.length-1){
        if(ladder[y][x] && !moveX){
            const nextX = ladder[y][x];
            x = nextX;
            moveX = true;
        }
        else{
            y++;
            moveX = false;
        }
    }
    return x === start;
}
const solution = input => {
    const [N,M,H] = input[0].split(' ').map(Number);
    const ladder = Array.from({length:H+2},()=>Array(N+1).fill(null));
    for(let i=1; i<M+1; i++){
        const [a,b] = input[i].split(' ').map(Number);
        ladder[a][b] = b+1;
        ladder[a][b+1] = b;
    }

    const makeLadder = (index,count,max) =>{
        if(count === max){
            for(let i=1; i<=N; i++){
                if(!isPossible(i,ladder)) return;
            }
            process.exit(console.log(max));
        }
        for(let i=index; i<(N+1)*(H+1); i++){
            const [y,x] = [Math.floor(i/(N+1)) , i % (N+1)];
            if(y === 0 || x === 0 || x === N || ladder[y][x] || ladder[y][x+1] ) continue;
            ladder[y][x] = x+1;
            ladder[y][x+1] = x;
            makeLadder(i+2,count+1,max);
            ladder[y][x] = null;
            ladder[y][x+1] = null;
        }
    }
    for(let max=0; max<=3; max++){
        makeLadder(0,0,max);
    }
    console.log(-1);
}
solution(input);