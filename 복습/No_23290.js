// const input = [
// '5 1',
// '4 3 5',
// '1 3 5',
// '2 4 2',
// '2 1 6',
// '3 4 4',
// '4 2'
// ]
// const input = [
// '5 2',
// '4 3 5',
// '1 3 5',
// '2 4 2',
// '2 1 6',
// '3 4 4',
// '4 2'
// ]
// const input = [
// '5 3',
// '4 3 5',
// '1 3 5',
// '2 4 2',
// '2 1 6',
// '3 4 4',
// '4 2'
// ]
// const input = [
// '5 5',
// '4 3 5',
// '1 3 5',
// '2 4 2',
// '2 1 6',
// '3 4 4',
// '4 2'
// ]
// const input = [
// '5 26',
// '4 3 5',
// '1 3 5',
// '2 4 2',
// '2 1 6',
// '3 4 4',
// '4 2'
// ]
// const input = [
//     '1 10',
//     '1 1 1',
//     '4 4'
// ]
// const input = [
// '8 100',
// '1 1 1',
// '1 1 2',
// '1 1 3',
// '1 1 4',
// '1 1 5',
// '1 1 6',
// '1 1 7',
// '1 1 8',
// '1 1'
// ]
// const input = [
//     '10 25',
//     '1 1 1',
//     '1 1 2',
//     '1 1 3',
//     '1 1 4',
//     '1 1 5',
//     '1 1 6',
//     '1 1 7',
//     '1 1 8',
//     '2 1 1',
//     '2 1 1',
//     '2 1'
//     ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [M,S] = input[0].split(' ').map(Number);
const fishInfo = Array.from({length:M},(_,i)=>input[i+1].split(' ').map(num => +num - 1));
const shark = input[M+1].split(' ').map(num => +num -1);
const dy = [0,-1,-1,-1,0,1,1,1];
const dx = [-1,-1,0,1,1,1,0,-1];
const sy = [-1,0,1,0];
const sx = [0,-1,0,1];

class Fish{
    constructor(y,x,dir){
        this.y = y;
        this.x = x;
        this.dir = dir;
    }
}
class Smell{
    constructor(y,x,durability){
        this.y = y;
        this.x = x;
        this.durability = durability;
    }
}
const isValidPos = (y,x) => (y>=0 && x>=0 && y<4 && x<4);
function move(){
    let {y,x,dir} = this;
    const [sy,sx] = this.shark;
    let count = 8;
    while(count--){
        const [ny,nx] = [y+dy[dir],x+dx[dir]];
        if(!isValidPos(ny,nx) || this.smellMap[ny][nx] || (ny === sy && nx === sx)){
            dir = dir-1 < 0 ? 7 : dir-1;
            continue;
        }
        else{
            this.y = ny , this.x = nx , this.dir = dir
            break;
        }
    }
}
function fade(){
    this.durability--;
}
const sharkMove = (shark,map,smellMap) =>{
    let max = {dir:null, sum:-1};
    let direction = Array(3);
    let fishMap = map.map(row => row.map(fishArr => {return fishArr.length ? fishArr.length : 0}));
    
    const getDirection = (y,x,count,sum) =>{
        if(count ===3){
            if(sum > max.sum){
                max.dir = [...direction];
                max.sum = sum;
            }
            return;
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+sy[i],x+sx[i]];
            if(!isValidPos(ny,nx)) continue;
            const fishCount = fishMap[ny][nx];
            direction[count] = i;
            fishMap[ny][nx] = 0;
            getDirection(ny,nx,count+1,sum+fishCount);
            fishMap[ny][nx] = fishCount;
        }
    }
    let [y,x] = shark;
    getDirection(y,x,0,0);
    let sharkDir = max.dir;

    for(let i=0; i<sharkDir.length; i++){
        const dir = sharkDir[i];
        [y,x] = [y+sy[dir],x+sx[dir]];
        if(map[y][x].length){
            map[y][x] = [];
            smellMap[y][x] = new Smell(y,x,2);
        }
    }
    shark[0] = y , shark[1] = x;
}
const removeSmell = (smellMap) =>{
    for(let y=0; y<4; y++){
        for(let x=0; x<4; x++){
            const smell = smellMap[y][x];
            if(smell && !smell.durability) smellMap[y][x] = null
        }
    }
}
const solution = (S,shark) =>{
    let map = Array.from({length:4},()=>Array.from({length:4},()=>[]));
    let smellMap = Array.from({length:4},()=>Array(4).fill(null));
    Fish.prototype.shark = shark;
    Fish.prototype.smellMap = smellMap;
    Fish.prototype.move = move;
    Smell.prototype.fade = fade;
    for(let i=0; i<M; i++){
        const [y,x,dir] = fishInfo[i];
        map[y][x].push(new Fish(y,x,dir));
    }
    let preFishes = [];
    while(S--){
        const currentMap = map;
        map = Array.from({length:4},()=>Array.from({length:4},()=>[]));
        removeSmell(smellMap);

        for(let y=0; y<4; y++){
           for(let x=0; x<4; x++){
               const smell = smellMap[y][x];
               if(smell) smell.fade();
               if(currentMap[y][x].length){
                   for(let i=0; i<currentMap[y][x].length; i++){
                       const fish = currentMap[y][x][i];
                       preFishes.push(new Fish(fish.y,fish.x,fish.dir));
                       fish.move();
                       map[fish.y][fish.x].push(fish);
                   }
               }
           }
        }
        sharkMove(shark,map,smellMap);
        while(preFishes.length){
            const fish = preFishes.pop();
            map[fish.y][fish.x].push(fish);
        }
    }
    const sum = map.reduce((acc,cur)=>acc+=cur.reduce((acc,cur)=> acc+=cur.length,0),0);
    console.log(sum);
}
solution(S,shark);

