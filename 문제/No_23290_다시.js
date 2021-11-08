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
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [M,S] = input[0].split(' ').map(Number);
const fishInfo = Array.from({length:M},(_,i) =>input[i+1].split(' ').map(num => +num -1));
const shark = input[M+1].split(' ').map(num => +num -1);
const dy = [0,-1,-1,-1,0,1,1,1];
const dx = [-1,-1,0,1,1,1,0,-1];
const sy = [-1,0,1,0];
const sx = [0,-1,0,1];
const isValidPos = (y,x)=>(y>=0 && x>=0 && y<4 && x<4);
class Fish{
    constructor(y,x,dir){
        this.y = y;
        this.x = x;
        this.dir = dir;
    }
    move(){
        let {y,x,dir} = this;
        let count = 8;
        const [sy,sx] = this.shark;
        while(count--){
            const [ny,nx] = [y+dy[dir],x+dx[dir]];
            if(!isValidPos(ny,nx) || this.smellMap[ny][nx] || (sy === ny && sx === nx)){
                dir = dir-1 < 0 ? 7 : dir-1;
                continue;
            } 
            else{
                this.y = ny , this.x = nx , this.dir = dir;
            }
        }
    }
}
class Smell{
    constructor(y,x,durability){
        this.y = y;
        this.x = x;
        this.durability =durability;
    }
    fade(){
        this.durability--;
    }
}
const sharkMove = (shark,map,smellMap) =>{
    let max = {dir:null , sum:-1}
    let dir = Array(3);
    let fishMap = map.map(row => row.map(num =>{ return num.length ? num.length : 0}));
    // console.log(fishMap);
    const dfs = (y,x,count,sum) =>{
        if(count ===3){
           if(sum > max.sum){
               max.dir = [...dir];
               max.sum = sum;
           }
           return;
        }
        
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+sy[i],x+sx[i]];
            if(!isValidPos(ny,nx)) continue;
            const fishCount = fishMap[ny][nx];
            const nextSum = sum+fishCount;
            dir[count]=i;
            fishMap[ny][nx] = 0;
            dfs(ny,nx,count+1,nextSum);
            fishMap[ny][nx] = fishCount;
        }
    }
    let [y,x] = shark;
    dfs(y,x,0,0);
    const direction = max.dir 
    for(let i=0; i<direction.length; i++){
        const dir = direction[i];
        const [ny,nx] = [y+sy[dir],x+sx[dir]];
        if(map[ny][nx].length){
            map[ny][nx] = [];
            smellMap[ny][nx] = new Smell(ny,nx,2);
        }
        y = ny , x = nx;
    }
    return shark = [y,x];
}
const resetMap = (map,smellMap) =>{
    const newBoard = map;
    for(let y=0; y<4; y++){
        for(let x=0; x<4; x++){
            const smell = smellMap[y][x];
            if(smell && !smell.durability) smellMap[y][x] =null
        }
    }
    return newBoard;    
}
const solution = (S,shark) =>{
    let map = Array.from({length:4},()=>Array.from({length:4},()=>[]));
    let smellMap = Array.from({length:4},()=>Array(4).fill(null));
    let preFishes = [];
    for(let i=0; i<M; i++){
        const [y,x,dir] = fishInfo[i];
        map[y][x].push(new Fish(y,x,dir));
    }
    Fish.prototype.smellMap = smellMap;
    
    
    while(S--){
        const currentBoard = resetMap(map,smellMap);
        map = Array.from({length:4},()=>Array.from({length:4},()=>[]));
        Fish.prototype.shark = shark;
        for(let y=0; y<4; y++){
            for(let x=0; x<4; x++){
                const smell = smellMap[y][x];
                if(smell) smell.fade();
                if(currentBoard[y][x].length){
                    for(let i=0; i<currentBoard[y][x].length; i++){
                        const fish = currentBoard[y][x][i];
                        preFishes.push(new Fish(fish.y,fish.x,fish.dir));
                        fish.move();
                        map[fish.y][fish.x].push(fish);
                    }
                }
            }
        }
        //console.log(map);
        //console.log(preFishes);
        // console.log(smellMap);
        shark = sharkMove(shark,map,smellMap);
        preFishes.forEach(fish => map[fish.y][fish.x].push(fish));
        preFishes = [];
    }
    const sum = map.reduce((acc,cur)=>acc+=cur.reduce((acc,cur) => acc+=cur.length,0),0);
    console.log(sum);
}

solution(S,shark);

// let s = [1,1];
// let a = s;
// s[0] = 0 , s[1] = 0
// console.log(a);
