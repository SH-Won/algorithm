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
const input = [
    '10 25',
    '1 1 1',
    '1 1 2',
    '1 1 3',
    '1 1 4',
    '1 1 5',
    '1 1 6',
    '1 1 7',
    '1 1 8',
    '2 1 1',
    '2 1 1',
    '2 1'
    ]

// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

class Fish{
    constructor(y,x,d){
        this.y = y;
        this.x = x;
        this.d = d;
    }
}
function move(){
    let count = 8;
    let {y,x,d,shark} = this;
    while(count--){
        const [ny,nx] = [y+this.dy[d],x+this.dx[d]];
        if(ny < 0 || nx < 0 || ny >=4 || nx >=4 || (ny === shark.y && nx === shark.x) || this.smellMap[ny][nx]){
            d = d-1 === -1 ? 7 : d-1;
            continue;
        }
        this.y = ny , this.x = nx, this.d = d;
        return;
    }
}
class Smell{
    constructor(y,x,durability){
        this.y = y;
        this.x = x;
        this.durability = durability;
    }
}
const setSmellMap = (smellMap) =>{
    for(let y=0; y<4; y++){
        for(let x=0; x<4; x++){
            const smell = smellMap[y][x];
            if(smell && !smell.durability) smellMap[y][x] = null;
        }
    }
}
const moveShark = (shark,map,smellMap) =>{
    let fishMap = map.map(row => row.map(arr => arr.length ? arr.length : 0));
    let max = {dir:null, sum:-1};
    let sharkDir = Array(3);
    const [dy,dx] = [[-1,0,1,0],[0,-1,0,1]];
    const eatFish = (y,x,count,sum) =>{
        if(count === 3){
            if(sum > max.sum){
               max.sum = sum;
               max.dir = [...sharkDir];
            }
            return;
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >=4 || nx >=4) continue;
            const fishCount = fishMap[ny][nx];
            fishMap[ny][nx] = 0;
            sharkDir[count] = i;
            eatFish(ny,nx,count+1,sum+fishCount);
            fishMap[ny][nx] = fishCount;
        }
    }
    let {y,x} = shark;
    eatFish(y,x,0,0);
    sharkDir = max.dir;
    for(let i=0; i<sharkDir.length; i++){
        const dir = sharkDir[i];
        y+=dy[dir], x+=dx[dir];
        if(fishMap[y][x]){
            smellMap[y][x] = new Smell(y,x,2);
            map[y][x] = [];
        }
    }
    shark.y = y , shark.x = x;
}
const solution = (input) =>{
    let [M,S] = input[0].split(' ').map(Number);
    let map = Array.from({length:4},()=>Array.from({length:4},()=>[]));
    let smellMap = Array.from({length:4},()=>Array(4).fill(null));
    for(let i=1; i<M+1; i++){
        const [y,x,d] = input[i].split(' ').map(num => +num -1);
        map[y][x].push(new Fish(y,x,d));
    }
    const sharkInfo = input[M+1].split(' ').map(num => +num - 1);
    let shark = {y:sharkInfo[0],x:sharkInfo[1]};
    const [dy,dx] = [[0,-1,-1,-1,0,1,1,1],[-1,-1,0,1,1,1,0,-1]];
    Fish.prototype.dy = dy , Fish.prototype.dx = dx , Fish.prototype.smellMap = smellMap;
    Fish.prototype.shark = shark , Fish.prototype.move = move;
    let prevFishes = [];
    while(S--){
        const current = map;
        setSmellMap(smellMap);
        map = Array.from({length:4},()=>Array.from({length:4},()=>[]))
        for(let y=0; y<4; y++){
            for(let x=0; x<4; x++){
                if(current[y][x].length){
                   for(let i=0; i<current[y][x].length; i++){
                       const fish = current[y][x][i];
                       prevFishes.push(new Fish(fish.y,fish.x,fish.d));
                       fish.move();
                       map[fish.y][fish.x].push(fish);
                   }
                }
                if(smellMap[y][x]) smellMap[y][x].durability--;
            }
        }
        moveShark(shark,map,smellMap);
        while(prevFishes.length){
            const fish = prevFishes.pop();
            map[fish.y][fish.x].push(fish);
        }
    }
    const answer = map.reduce((acc,cur) => acc+=cur.reduce((acc,cur) => acc+=cur.length,0),0);
    console.log(answer);
}
solution(input);