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
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function Shark(y,x,dir,number){
    this.y = y;
    this.x = x;
    this.dir = dir;
    this.number = number;
}
function Smell(number,durability){
    this.number = number;
    this.durability = durability;
}
function move(){
    let {y,x,dir,number} = this;
    const direction = this.priorDirection[number-1][dir];
    for(let i=0; i<direction.length; i++){
        const nDir = direction[i];
        const [ny,nx] = [y+this.dy[nDir],x+this.dx[nDir]];
        if(this.isValidPos(ny,nx) && !this.smellMap[ny][nx]){
            this.y = ny , this.x = nx , this.dir = nDir;
            return;
        }
    }
    for(let i=0; i<direction.length; i++){
        const nDir=direction[i];
        const [ny,nx] = [y+this.dy[nDir],x+this.dx[nDir]];
        if(this.isValidPos(ny,nx) && this.smellMap[ny][nx].number === number){
            this.y = ny, this.x = nx, this.dir = nDir;
            return;
        }
    }
}
const setShark = (shark,map) =>{
    const {y,x,number} = shark;
    if(map[y][x] && map[y][x].number > number){
       map[y][x] = shark;
    }
    else if(!map[y][x]) map[y][x] = shark;
}
const setMap = (map,smellMap,k) =>{
    const newMap = map;
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map[0].length; x++){
            const shark = map[y][x];
            const smell = smellMap[y][x];
            if(shark){
                if(!smell) smellMap[y][x] = new Smell(shark.number,k);
                else smellMap[y][x].durability = k;
            }
            else if(smell && !smell.durability) smellMap[y][x] = null;
        }
    }
    return newMap
}

const solution = (input) =>{
    const [N,M,k] = input[0].split(' ').map(Number);
    let map = Array.from({length:N},(_,i) =>input[i+1].split(' ').map(Number));
    const startDirection = input[N+1].split(' ').map(Number);
    const priorDirection = Array.from({length:M},(_,i)=> Array.from({length:4},(_,j) => input[N+2+(i*4 + j)].split(' ').map(num => +num -1)));
    let smellMap = Array.from({length:N}, ()=>Array(N).fill(null));
    const [dy,dx] = [[-1,1,0,0],[0,0,-1,1]];
    Shark.prototype.dy = dy , Shark.prototype.dx = dx;
    Shark.prototype.smellMap = smellMap , Shark.prototype.priorDirection = priorDirection;
    Shark.prototype.move = move, Shark.prototype.isValidPos = function(y,x){ return y>=0 && x>=0 && y<N && x<N};
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x]){
                const number = map[y][x];
                map[y][x] = new Shark(y,x,startDirection[number-1]-1,number);
            }
        }
    }
    let time = 0;
    while(time < 1000){
        const currentMap = setMap(map,smellMap,k);
        map = Array.from({length:map.length} ,()=>Array(map[0].length).fill(null));
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                const shark = currentMap[y][x];
                const smell = smellMap[y][x];
                if(shark){
                    shark.move();
                    setShark(shark,map);
                }
                if(smell){
                    smell.durability--;
                }
            }
        }
        time++;
        const sharks = map.flat().filter(shark => shark);
        if(sharks.length ===1  && sharks[0].number ===1) return console.log(time);
    }
    console.log(-1)
}
solution(input);