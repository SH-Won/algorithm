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
const fishInfo = Array.from({length:M},(_,i)=>input[i+1].split(' ').map(num => +num -1));
const shark = input[M+1].split(' ').map(num => +num -1);
const dy = [0,-1,-1,-1,0,1,1,1] , dx = [-1,-1,0,1,1,1,0,-1];
const sdy = [-1,0,1,0] , sdx = [0,-1,0,1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<4 && x<4);
class Fish{
    constructor(y,x,dir){
        this.y = y;
        this.x = x;
        this.dir = dir;
    }
}
class Smell{
    constructor(y,x,time){
        this.y = y;
        this.x = x;
        this.time = time;
    }
}
function fade(){
    this.time--;
}
function move(){
    let {y,x,dir} = this , [sy,sx] = this.shark , count = 8;
    while(count--){
        const [ny,nx] = [y+dy[dir],x+dx[dir]];
        if(!isValidPos(ny,nx) || this.smellMap[ny][nx] || (ny === sy && nx === sx) ){
            dir = dir - 1 === -1 ? 7 : dir-1;
            continue;
        }
        this.y = ny , this.x = nx, this.dir = dir;
        break;
    }
}
const sharkMove = (shark,map,smellMap) =>{
    let fishMap = map.map(row => row.map(fishArr => { return fishArr.length ? fishArr.length : 0}))
    let maxEatCount = -1 , maxDirection ;
    let direction = Array(3);
    let [sy,sx] = shark;
    const getDirection = (y,x,count,eatCount) =>{
        if(count === 3){
           if(eatCount > maxEatCount){
               maxEatCount = eatCount;
               maxDirection = [...direction];
           }
           return;
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+sdy[i],x+sdx[i]];
            if(!isValidPos(ny,nx)) continue;
            const fishCount = fishMap[ny][nx];
            fishMap[ny][nx] = 0;
            direction[count] = i;
            getDirection(ny,nx,count+1,eatCount+fishCount);
            fishMap[ny][nx] = fishCount;
        }
    }
    getDirection(sy,sx,0,0);
    
    for(let i=0; i<maxDirection.length; i++){
        const dir = maxDirection[i];
        [sy,sx] = [sy+sdy[dir],sx+sdx[dir]];
        if(map[sy][sx].length){
            map[sy][sx] = [];
            smellMap[sy][sx] = new Smell(sy,sx,2);
        }
    }
    shark[0] = sy , shark[1] = sx;
}
const organizeSmellMap = (smellMap) =>{
    for(let y=0; y<4; y++){
        for(let x=0; x<4; x++){
            const smell = smellMap[y][x];
            if(smell && !smell.time) smellMap[y][x] = null
        }
    }
}
const solution = (S,fishInfo,shark) =>{
    let map = Array.from({length:4},()=>Array.from({length:4},()=>[]));
    let smellMap = Array.from({length:4},()=>Array(4).fill(null));
    Fish.prototype.smellMap = smellMap;
    Fish.prototype.move = move;
    Fish.prototype.shark = shark;
    Smell.prototype.fade = fade;
    for(let i=0; i<fishInfo.length; i++){
        const [y,x,dir] = fishInfo[i];
        map[y][x].push(new Fish(y,x,dir));
    }
    let preFishes = [];
    while(S--){
        const current = map;
        map = Array.from({length:4},()=>Array.from({length:4},()=>[]));
        organizeSmellMap(smellMap);
        for(let y=0; y<4; y++){
            for(let x=0; x<4; x++){
                if(current[y][x].length){
                    for(let i=0; i<current[y][x].length; i++){
                        const fish = current[y][x][i];
                        preFishes.push(new Fish(fish.y,fish.x,fish.dir));
                        fish.move();
                        map[fish.y][fish.x].push(fish);
                    }
                }
                const smell = smellMap[y][x];
                if(smell) smell.fade();
            }
        }
        sharkMove(shark,map,smellMap);
        while(preFishes.length){
            const fish = preFishes.pop();
            map[fish.y][fish.x].push(fish);
        }
    }
    const sum = map.reduce((acc,cur)=> acc+=cur.reduce((acc,cur)=>acc+=cur.length,0),0);
    console.log(sum);
}
solution(S,fishInfo,shark);