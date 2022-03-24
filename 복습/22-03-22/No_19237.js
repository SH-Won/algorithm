// const input = [
// '5 4 4',
// '0 0 0 0 3',
// '0 2 0 0 0',
// '1 0 0 0 4',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '4 4 3 1',
// '2 3 1 4',
// '4 1 2 3',
// '3 4 2 1',
// '4 3 1 2',
// '2 4 3 1',
// '2 1 3 4',
// '3 4 1 2',
// '4 1 2 3',
// '4 3 2 1',
// '1 4 3 2',
// '1 3 2 4',
// '3 2 1 4',
// '3 4 1 2',
// '3 2 4 1',
// '1 4 2 3',
// '1 4 2 3',
// ]
// const input = [
// '4 2 6',
// '1 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 2',
// '4 3',
// '1 2 3 4',
// '2 3 4 1',
// '3 4 1 2',
// '4 1 2 3',
// '1 2 3 4',
// '2 3 4 1',
// '3 4 1 2',
// '4 1 2 3',
// ]
// const input = [
// '5 4 1',
// '0 0 0 0 3',
// '0 2 0 0 0',
// '1 0 0 0 4',
// '0 0 0 0 0',
// '0 0 0 0 0',
// '4 4 3 1',
// '2 3 1 4',
// '4 1 2 3',
// '3 4 2 1',
// '4 3 1 2',
// '2 4 3 1',
// '2 1 3 4',
// '3 4 1 2',
// '4 1 2 3',
// '4 3 2 1',
// '1 4 3 2',
// '1 3 2 4',
// '3 2 1 4',
// '3 4 1 2',
// '3 2 4 1',
// '1 4 2 3',
// '1 4 2 3'
// ]
// const input = [
//     '5 4 10',
//     '0 0 0 0 3',
//     '0 0 0 0 0',
//     '1 2 0 0 0',
//     '0 0 0 0 4',
//     '0 0 0 0 0',
//     '4 4 3 1',
//     '2 3 1 4',
//     '4 1 2 3',
//     '3 4 2 1',
//     '4 3 1 2',
//     '2 4 3 1',
//     '2 1 3 4',
//     '3 4 1 2',
//     '4 1 2 3',
//     '4 3 2 1',
//     '1 4 3 2',
//     '1 3 2 4',
//     '3 2 1 4',
//     '3 4 1 2',
//     '3 2 4 1',
//     '1 4 2 3',
//     '1 4 2 3',
//     ]
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Shark{
    constructor(y,x,number,dir){
        this.y = y;
        this.x = x;
        this.number = number;
        this.dir = dir;
    }
}
class Smell{
    constructor(number,k){
        this.number = number;
        this.k = k;
    }
}
function move(){
    const {y,x,number,dir,N} = this;
    const direction = this.priorDir[(number-1)*4 + dir];
    for(let i=0; i<direction.length; i++){
        const [dy,dx] = [this.dy[direction[i]],this.dx[direction[i]]];
        const [ny,nx] = [y+dy,x+dx];
        if(ny < 0 || nx < 0 || ny >= N || nx >= N || this.smellMap[ny][nx] ) continue;
        this.y = ny , this.x = nx, this.dir = direction[i]
        return;
    }
    for(let i=0; i<direction.length; i++){
        const [dy,dx] = [this.dy[direction[i]],this.dx[direction[i]]];
        const [ny,nx] = [y+dy,x+dx];
        if(ny < 0 || nx < 0 || ny >= N || nx >= N || this.smellMap[ny][nx].number !== number) continue;
        this.y = ny , this.x = nx, this.dir = direction[i];
        return;
    }
}
const setSmellMap = (smellMap,map,k) =>{
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map.length; x++){
            const smell = smellMap[y][x];
            const shark = map[y][x];
            if(shark) smellMap[y][x] = new Smell(shark.number,k);
            else{
            if(smell && smell.k === 0) smellMap[y][x] = null;
            }
        }
    }

}
const setShark = (shark,map) =>{
    const {y,x,number} = shark;
    if(!map[y][x]) map[y][x] = shark;
    else if(map[y][x].number > number) map[y][x] = shark;
}
const solution = input =>{
    const [N,M,k] = input[0].split(' ').map(Number);
    let map = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let smellMap = Array.from({length:N},()=>Array(N).fill(null));
    const startDir = input[1+N].split(' ').map(num => +num - 1);
    const priorDir = Array.from({length:M*4},(_,i) => input[i+2+N].split(' ').map(num => +num - 1));
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x]) map[y][x] = new Shark(y,x,map[y][x], startDir[map[y][x]-1]);
        }
    }
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    Shark.prototype.smellMap = smellMap , Shark.prototype.priorDir = priorDir;
    Shark.prototype.dy = dy , Shark.prototype.dx = dx, Shark.prototype.N = N;
    Shark.prototype.move = move;
    let times = 0;
    while(times < 1000){
        const current = map;
        map = Array.from({length:N} ,()=>Array(N).fill(null));
        setSmellMap(smellMap,current,k);
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                const shark = current[y][x];
                const smell = smellMap[y][x];
                if(shark){
                    shark.move();
                    setShark(shark,map);
                }
                if(smell) smell.k--;
            }
        }
        times++;
        const sharks = map.flat().filter(el => el);
        if(sharks.length === 1 && sharks[0].number === 1) return console.log(times);
    }
    console.log(-1);
}
solution(input);