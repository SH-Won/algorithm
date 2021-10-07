// const input = [
// '7 6 2 3 15 6 9 8',
// '3 1 1 8 14 7 10 1',
// '6 1 13 6 4 3 11 4',
// '16 1 8 7 5 2 12 2'
// ]
// const input = [
// '16 7 1 4 4 3 12 8',
// '14 7 7 6 3 4 10 2',
// '5 2 15 2 8 3 6 4',
// '11 8 2 4 13 5 9 4',
// ]
// const input = [
// '12 6 14 5 4 5 6 7',
// '15 1 11 7 3 7 7 5',
// '10 3 8 3 16 6 1 1',
// '5 8 2 7 13 6 9 2',
// ]
const input = [
    '2 6 10 8 6 7 9 4',
    '1 7 16 6 4 2 5 8',
    '3 7 8 6 7 6 14 8',
    '12 7 15 4 11 3 13 3',
    ]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const dy =[-1,-1,0,1,1,1,0,-1];
const dx =[0,-1,-1,-1,0,1,1,1];
class Fish{
    constructor(y,x,dir,number,isAlive){
        this.y = y;
        this.x = x;
        this.dir = dir-1;
        this.number = number;
        this.isAlive = isAlive;
    }
}

const fishes = [];
let shark = {y:null,x:null,dir:null,sum:null};
for(let y=0; y<input.length; y++){
    const info = input[y].split(' ').map(Number);
    let x = 0;
    let j = 0;
    while(j < info.length){
        const [number,dir] = [info[j],info[j+1]];
        if(y===0 && x===0){
            shark.y = y , shark.x = x, shark.dir = dir-1, shark.sum = number;
            x+=1;
            j+=2;
            continue;
        }
        fishes.push(new Fish(y,x,dir,number,true));
        x+=1;
        j+=2;
    }
}
fishes.sort((a,b)=>a.number-b.number);

const isValidPos =(y,x) => ( y>=0 & x>=0 && y<4 && x<4);

const fishMove = (fish,shark,map) =>{
    let {y,x,dir} = fish;
    let [ny,nx] = [y+dy[dir],x+dx[dir]];
    while(true){
        if(!isValidPos(ny,nx) || (ny ===shark.y && nx === shark.x)){
            dir = dir+1 === 8 ? 0 : dir+1;
            [ny,nx] = [y+dy[dir],x+dx[dir]];
            continue;
        }
        else break;
    }
    fish.dir = dir;
    if(map[ny][nx]){
        let swapFish = map[ny][nx];
        swapFish.y = y , swapFish.x = x , fish.y = ny , fish.x = nx;
        [map[y][x],map[ny][nx]] = [map[ny][nx], map[y][x]];
    }
    else{
        fish.y = ny , fish.x = nx;
        map[ny][nx] = fish;
        map[y][x] = 0;
    }
    
}
const getMax = (fishes,shark) =>{
    let max = 0;
    const dfs = (fishes,shark) =>{
        if(shark.sum > max) max = shark.sum; 

        let copyFishes = Array.from({length:fishes.length},(_,i)=> new Fish(fishes[i].y,fishes[i].x,fishes[i].dir+1,fishes[i].number,fishes[i].isAlive));
        let copyMap = Array.from({length:4},()=>Array(4).fill(0));
        copyFishes.forEach(fish => copyMap[fish.y][fish.x] = fish);
        copyFishes.forEach(fish => fish.isAlive && fishMove(fish,shark,copyMap));

        for(let i=1; i<4; i++){
            const {y,x,dir,sum} = shark;
            const [ny,nx] = [y+dy[dir]*i,x+dx[dir]*i];
            if(!isValidPos(ny,nx) || !copyMap[ny][nx] || !copyMap[ny][nx].isAlive ) continue;
        
            let fish = copyMap[ny][nx];
            fish.isAlive = false;
            const nShark = {y:fish.y,x:fish.x,dir:fish.dir,sum:sum+fish.number};
            dfs(copyFishes,nShark,copyMap);
            fish.isAlive = true;
        }
    }
    dfs(fishes,shark);
    return max;
}

const solution = (fishes,shark) =>{
    const max = getMax(fishes,shark);
    return console.log(max);
}
solution(fishes,shark);
