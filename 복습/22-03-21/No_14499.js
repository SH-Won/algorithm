// const input = ['4 2 0 0 8','0 2','3 4','5 6','7 8','4 4 4 1 3 3 3 2']
// const input = ['3 3 1 1 9','1 2 3','4 0 5','6 7 8','1 3 2 2 4 4 1 1 3']
// const input = ['2 2 0 0 16','0 2','3 4','4 4 4 4 1 1 1 1 3 3 3 3 2 2 2 2']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const moveDice = (dice,dir) =>{
    const [U,N,E,W,S,D] = [0,1,2,3,4,5];
    const trans = [[[E,D],[E,W],[U,E]],[[W,D],[W,E],[U,W]],[[N,D],[N,S],[U,N]],[[S,D],[S,N],[U,S]]];
    trans[dir].forEach(([dir1,dir2]) => [dice[dir1],dice[dir2]] = [dice[dir2],dice[dir1]]);
}
const solution = input =>{
    // 문제에서 (x,y) 의 형식이지만 개인적으로 헷갈리기 때문에 (y,x) 의 형식으로 바꿈
    let [N,M,y,x,K] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    const command = input[1+N].split(' ').map(num => +num - 1);
    const dice = [0,0,0,0,0,0] // 윗 북 동 서 남 아랫
    const [dy,dx] = [[0,0,-1,1],[1,-1,0,0]];
    let answer = '';
    let idx = 0;
    while(idx < command.length){
        const dir = command[idx++];
        const [ny,nx] = [y+dy[dir],x+dx[dir]];
        if(ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        y = ny , x = nx;
        moveDice(dice,dir);
        if(map[y][x] === 0) map[y][x] = dice[5];
        else{
            dice[5] = map[y][x];
            map[y][x] = 0;
        }
        answer +=`${dice[0]}\n`;
    }
    console.log(answer.trim());
}
solution(input);