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
// const input = [
//     '2 6 10 8 6 7 9 4',
//     '1 7 16 6 4 2 5 8',
//     '3 7 8 6 7 6 14 8',
//     '12 7 15 4 11 3 13 3',
//     ]

const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Fish{
    constructor(y,x,number,dir){
        this.y = y;
        this.x = x;
        this.number = number;
        this.dir = dir;
    }
}
const moveFish = (fish,shark,map) =>{
    let {y,x,dir} = fish;
    while(true){
        const [ny,nx] = [y+fish.dy[dir],x+fish.dx[dir]];
        if(ny < 0 || nx < 0 || ny >=4 || nx >= 4 || (shark.y === ny && shark.x === nx)){
            dir = dir+1 > 7 ? 0 : dir+1;
            continue;
        }
        else break;
    }
    const [ny,nx] = [y+fish.dy[dir],x+fish.dx[dir]];
    if(map[ny][nx]){
       const swapFish = map[ny][nx];
       swapFish.y = y , swapFish.x = x;
    }
    
    fish.y = ny , fish.x = nx , fish.dir = dir;
    [map[ny][nx] ,map[y][x]] = [map[y][x],map[ny][nx]];
}
const solution = input =>{
    let shark ;
    const fishes = [];
    for(let y=0; y<4; y++){
        const info = input[y].split(' ').map(Number);
        let x = 0;
        while(x < 4){
            const [number,dir] = [info[x*2],info[x*2+1]];
            if(y === 0 && x === 0) shark = {y,x,dir:dir-1,sum:number};
            else fishes.push(new Fish(y,x,number,dir-1));
            x++;
        }
    }
    const [dy,dx]  = [[-1,-1,0,1,1,1,0,-1],[0,-1,-1,-1,0,1,1,1]] 
    Fish.prototype.dy = dy, Fish.prototype.dx = dx;
    fishes.sort((a,b) => a.number - b.number);
    let max = 0;
    const moveShark = (fishes,shark) =>{
        const {y,x,dir,sum} = shark;
        max = Math.max(sum,max);
        const copyFishes = fishes.map(fish => new Fish(fish.y,fish.x,fish.number,fish.dir));
        const copyMap = Array.from({length:4},()=>Array(4).fill(null));
        copyFishes.forEach(fish => copyMap[fish.y][fish.x] = fish);
        copyFishes.forEach(fish => moveFish(fish,shark,copyMap))
        
        for(let i=1; i<4; i++){
            const [ny,nx] = [y+dy[dir]*i,x+dx[dir]*i];
            if(ny < 0 || nx < 0 || ny >= 4 || nx >= 4 || !copyMap[ny][nx]) continue;
            const fish = copyMap[ny][nx];
            const newShark = {y:ny,x:nx,sum:sum + fish.number, dir:fish.dir};
            const fishIndex = copyFishes.findIndex(copyFish => copyFish === fish);
            copyFishes.splice(fishIndex,1);
            moveShark(copyFishes,newShark);
            copyFishes.splice(fishIndex,0,fish);
        }
    }
    moveShark(fishes,shark);
    console.log(max);
}
solution(input);