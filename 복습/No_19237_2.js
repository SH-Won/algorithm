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
// // ]
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
class Shark{
    constructor(y,x,dir,number){
        this.y = y;
        this.x = x;
        this.dir = dir;
        this.number = number;
    }
}
class Smell{
    constructor(number,k){
        this.number = number;
        this.k = k;
    }
}
function move(){
    const pDir = (this.number - 1) * 4 + (this.dir - 1);
    const prior = this.priorDirection[pDir];
    for(let i=0; i<4; i++){
        const dir = prior[i];
        const [ny,nx] = [this.y + this.dy[dir], this.x+this.dx[dir]];
        if(!this.isValidPos(ny,nx) || this.smellMap[ny][nx]) continue;
        this.y = ny , this.x = nx , this.dir = dir;
        return;
    }
    for(let i=0; i<4; i++){
        const dir = prior[i];
        const [ny,nx] = [this.y + this.dy[dir], this.x+this.dx[dir]];
        if(this.isValidPos(ny,nx) && this.smellMap[ny][nx].number === this.number){
            this.y = ny , this.x = nx, this.dir = dir;
            return;
        }
    }
}
function fade(){
    this.k--;
}
const setShark = (shark,map) =>{
    const {y,x} = shark;
    if(!map[y][x]) map[y][x] = shark;
    else if(map[y][x].number > shark.number) map[y][x] = shark
}
const setSmell = (smellMap,map,k) =>{
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map.length; x++){
            const shark = map[y][x];
            const smell = smellMap[y][x];
            if(shark){
                if(!smellMap[y][x]) smellMap[y][x] = new Smell(shark.number,k);
                else smellMap[y][x].k = k;
            }
            else if(smell && smell.k === 0) smellMap[y][x] = null
        }
    }
}

const solution = (input) =>{
    let index = 0;
    const [N,M,K] = input[index++].split(' ').map(Number);
    let map = Array.from({length:N},()=>input[index++].split(' ').map(Number));
    const startDirection = input[index++].split(' ').map(Number);
    const priorDirection = Array.from({length:M*4},()=>input[index++].split(' ').map(Number));
    let smellMap = Array.from({length:N},()=>Array(N).fill(null));
    for(let y=0; y<N; y++){
        for(let x=0; x<N; x++){
            if(map[y][x]){
                map[y][x] = new Shark(y,x,startDirection[map[y][x]-1],map[y][x]);
            }
        }
    }
    Shark.prototype.dy = [0,-1,1,0,0];
    Shark.prototype.dx = [0,0,0,-1,1];
    Shark.prototype.smellMap = smellMap;
    Shark.prototype.priorDirection = priorDirection;
    Shark.prototype.isValidPos = function(y,x){ return (y>=0 && x>=0 && y<N && x<N)};
    Shark.prototype.move = move;
    Smell.prototype.fade = fade;
    
    let time = 0;
    while(time < 1000){
        const currentMap = map;
        setSmell(smellMap,map,K);
        map = Array.from({length:N},()=>Array(N).fill(null));
        for(let y=0; y<N; y++){
            for(let x=0; x<N; x++){
                const shark = currentMap[y][x];
                const smell = smellMap[y][x];
                if(shark){
                    shark.move();
                    setShark(shark,map);
                }
                if(smell){
                    smell.fade();
                }
            }
        }
        time++;
        const sharks = map.flat().filter(shark => shark);
        if(sharks.length === 1 && sharks[0].number === 1) return console.log(time);
    }
    console.log(-1);
}
solution(input);