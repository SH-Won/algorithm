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

const isValidPos = (y,x) => (y>=0 && x>=0 && y<4 && x<4);
function Fish(y,x,d){
    this.y = y;
    this.x = x;
    this.d = d;
}
function Smell(y,x,durability){
    this.y = y;
    this.x = x;
    this.durability = durability;
}
function move(){
    let {y,x,d} = this;
    let [sy,sx] = this.shark;
    let count = 8;
    while(count--){
        const [ny,nx] = [y+this.dy[d],x+this.dx[d]];
        if(!isValidPos(ny,nx) || this.smellMap[ny][nx] || (ny === sy && nx === sx)){
            d = d-1 === -1 ? 7 : d-1;
        }
        else{
            this.y = ny , this.x = nx , this.d = d;
            return;
        }
    }
}
// 상 좌 하 우 
const moveShark = (shark,map,smellMap) =>{
    let fishMap = map.map(row => row.map(fishArr => (fishArr.length ? fishArr.length : 0)));
    let max = {count :-1 , dir : null};
    let dirArr = Array(3);
    let [y,x] = shark;
    const [dy,dx] = [[-1,0,1,0],[0,-1,0,1]];
    const getMax = (y,x,sum,count) =>{
        if(count === 3){
           if(sum > max.count){
              max.count = sum , max.dir = [...dirArr];
           }
           return;
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx)) continue;
            const fishCount = fishMap[ny][nx];
            fishMap[ny][nx] = 0;
            dirArr[count] = i;
            getMax(ny,nx,sum+fishCount,count+1);
            fishMap[ny][nx] = fishCount;
        }
    }
    getMax(y,x,0,0);
    const maxDir = max.dir;
    for(let i=0; i<maxDir.length; i++){
        const dir = maxDir[i];
        [y,x] = [y+dy[dir],x+dx[dir]];
        if(map[y][x].length){
            smellMap[y][x] = new Smell(y,x,2);
            map[y][x] = [];
        }
    }
    shark[0] = y , shark[1] = x;
}
const setAllMap = (map,smellMap) =>{
    const newMap = map;
    for(let y=0; y<4; y++){
        for(let x=0; x<4; x++){
            const smell = smellMap[y][x];
            if(smell && !smell.durability) smellMap[y][x] = null; 
        }
    }
    return newMap;
}
const solution = (input) =>{
    let map = Array.from({length:4},()=>Array.from({length:4},()=>[]));
    let smellMap = Array.from({length:4},()=>Array(4).fill(null));
    let [M,S] = input[0].split(' ').map(Number);
    let fishes = Array.from({length:M}, (_,i)=> new Fish(...input[i+1].split(' ').map(num => +num -1)));
    let shark = input[M+1].split(' ').map(num => +num -1);
    const [dy,dx] = [[0,-1,-1,-1,0,1,1,1],[-1,-1,0,1,1,1,0,-1]];
    Fish.prototype.move = move , Fish.prototype.smellMap = smellMap;
    Fish.prototype.shark = shark , Fish.prototype.dy = dy ,  Fish.prototype.dx = dx;
    fishes.forEach(fish => map[fish.y][fish.x].push(fish));
    let prevFishes = [];
    while(S--){
        const currentMap = setAllMap(map,smellMap);
        map = Array.from({length:4},()=>Array.from({length:4},()=>[]))
        for(let y=0; y<4; y++){
            for(let x=0; x<4; x++){
                const fishArr = currentMap[y][x];
                const smell = smellMap[y][x];
                if(fishArr.length){
                    for(let i=0; i<fishArr.length; i++){
                        const fish = fishArr[i];
                        prevFishes.push(new Fish(fish.y,fish.x,fish.d));
                        fish.move();
                        map[fish.y][fish.x].push(fish);
                    }
                }
                if(smell) smell.durability--;
            }
        }
        moveShark(shark,map,smellMap);
        while(prevFishes.length){
            const fish = prevFishes.pop();
            map[fish.y][fish.x].push(fish);
        }
    }
    const answer = map.reduce((acc,cur) => acc+=cur.reduce((acc,cur)=> acc+=cur.length, 0),0);
    console.log(answer);
}
solution(input);