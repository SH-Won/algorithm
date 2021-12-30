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
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,K] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const [dy,dx] = [[0,1,0,-1],[1,0,-1,0]];
// 동 남 서 북;
const [EAST,SOUTH,WEST,NORTH] = [0,1,2,3];

const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);

const getNextDir = (dir,bottomNumber,mapNumber) =>{
    if(bottomNumber === mapNumber) return dir;
    if(bottomNumber > mapNumber){
       return dir+1 > 3 ? 0 : dir+1;
    }
    else{
       return dir-1 < 0 ? 3 : dir-1;
    }
}
const getScore = (y,x,map,scoreMap) =>{
    scoreMap[y][x] = -1;
    const match = map[y][x];
    let queue =[[y,x]], idx = 0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || scoreMap[ny][nx] === -1 || map[ny][nx] !== match) continue;
            queue.push([ny,nx]);
            scoreMap[ny][nx] = -1;
        }
    }

    queue.forEach(([y,x]) => scoreMap[y][x] = queue.length * match);
    return scoreMap[y][x];
}
const moveDice = (dice,dir) =>{
    const [U,N,E,W,S,D] = [0,1,2,3,4,5];
    if(dir === EAST){
       [dice[E],dice[D]] = [dice[D],dice[E]];
       [dice[E],dice[U]] = [dice[U],dice[E]];
       [dice[U],dice[W]] = [dice[W],dice[U]];
    }
    else if(dir === WEST){
       [dice[W],dice[D]] = [dice[D],dice[W]];
       [dice[W],dice[U]] = [dice[U],dice[W]];
       [dice[U],dice[E]] = [dice[E],dice[U]];
    }
    else if(dir === SOUTH){
       [dice[S],dice[D]] = [dice[D],dice[S]];
       [dice[S],dice[U]] = [dice[U],dice[S]];
       [dice[U],dice[N]] = [dice[N],dice[U]];
    }
    else if(dir === NORTH){
        [dice[N],dice[D]] = [dice[D],dice[N]];
        [dice[N],dice[U]] = [dice[U],dice[N]];
        [dice[U],dice[S]] = [dice[S],dice[U]];
    }
}
const solution = (map,K) =>{
    let [y,x,d] = [0,0,0];
    let dice = [1,2,3,4,5,6];
    let scoreMap = Array.from({length:N} ,()=>Array(M).fill(0));
    let score = 0;
    while(K--){
        const [ny,nx] = [y+dy[d],x+dx[d]];
        if(!isValidPos(ny,nx)){
            d = (d+2) % 4;
        }
        [y,x] = [y+dy[d],x+dx[d]];
        moveDice(dice,d);
        if(scoreMap[y][x]) score+=scoreMap[y][x];
        else score+=getScore(y,x,map,scoreMap);
        d = getNextDir(d,dice[5],map[y][x])
    }
    console.log(score);
}
solution(map,K);