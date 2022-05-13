// const input =[
// '4 5 1',
// '4 1 2 3 3',
// '6 1 1 3 3',
// '5 6 1 3 2',
// '5 5 6 5 5'
// ]
// const input = [
// '4 5 2',
// '4 1 2 3 3',
// '6 1 1 3 3',
// '5 6 1 3 2',
// '5 5 6 5 5',
// ]
// const input =[
// '4 5 3',
// '4 1 2 3 3',
// '6 1 1 3 3',
// '5 6 1 3 2',
// '5 5 6 5 5',
// ]
// const input = [
// '4 5 7',
// '4 1 2 3 3',
// '6 1 1 3 3',
// '5 6 1 3 2',
// '5 5 6 5 5'
// ]
// const input = [
//     '4 5 1000',
//     '4 1 2 3 3',
//     '6 1 1 3 3',
//     '5 6 1 3 2',
//     '5 5 6 5 5'
//     ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[0,1,0,-1],[1,0,-1,0]] // 동 남 서 북
const getScore = (y,x,map,scoreMap) =>{
    if(scoreMap[y][x]) return scoreMap[y][x];
    const B = map[y][x];
    map[y][x] = 0;
    let queue = [[y,x]], idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= map.length || nx >= map[0].length || map[ny][nx] !== B) continue;
            queue.push([ny,nx]);
            map[ny][nx] = 0;
        }
    }
    const score = B * queue.length;
    queue.forEach(([y,x]) => (scoreMap[y][x] = score , map[y][x] = B));
    return score
}
const moveDice = (dir,dice) =>{
    const [U,N,E,W,S,D] = [0,1,2,3,4,5];
    const trans = [[[E,D],[E,U],[U,W]],[[S,D],[S,U],[U,N]],[[W,D],[W,U],[U,E]],[[N,D],[N,U],[U,S]]];
    trans[dir].forEach(([face1,face2]) => [dice[face1],dice[face2]] = [dice[face2],dice[face1]]);
}
const solution = input =>{
    let [N,M,K] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(Number));
    const scoreMap = Array.from({length:N},()=>Array(M).fill(0));
    const dice = [1,2,3,4,5,6] // 윗 북 동 서 남 아랫
    let [y,x,d] = [0,0,0];
    let score = 0;
    while(K--){
        let [ny,nx] = [y+dy[d],x+dx[d]];
        if(ny < 0 || nx < 0 || ny >= N || nx >= M){
           const nd = (d+2) % 4 ;
           [ny,nx,d] = [y+dy[nd],x+dx[nd],nd];
        }
        y = ny, x = nx;
        moveDice(d,dice);
        const A = dice[5];
        const B = map[y][x];
        score += getScore(y,x,map,scoreMap);
        if(A === B) continue;
        if(A > B) d = (d+1+4) % 4;
        else d = (d-1+4) % 4;
    }
    console.log(score);
}
solution(input);