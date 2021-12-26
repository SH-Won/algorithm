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
const [dy,dx] = [[-1,-1,0,1,1,1,0,-1],[0,-1,-1,-1,0,1,1,1]];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<4 && x<4);
function Fish(y,x,dir,number){
    this.y = y;
    this.x = x;
    this.dir = dir;
    this.number = number;
}

const fishMove = (fish,shark,map) => {
    let {y,x,dir,number} = fish;
    let [ny,nx] = [y+dy[dir],x+dx[dir]] ,count = 8;
    while(true){
        if(!isValidPos(ny,nx) || (shark.y === ny && shark.x === nx)){
            dir = dir + 1 >=8 ? 0 : dir + 1;
            [ny,nx] = [y+dy[dir],x+dx[dir]];
            continue;
        }
        else break;
    }
    fish.dir = dir;
    if(map[ny][nx]){
        const swapFish = map[ny][nx];
        swapFish.y = y , swapFish.x = x , fish.y = ny , fish.x = nx;
        [map[y][x],map[ny][nx]] = [map[ny][nx],map[y][x]];
    }
    else{
        fish.y = ny, fish.x = nx;
        map[ny][nx] = fish , map[y][x] = null;
    }
}
const solution = (input) =>{
    let map = Array.from({length:4},()=>Array(4));
    let fishes = [] , shark;
    for(let y=0; y<input.length; y++){
        const info = input[y].split(' ').map(Number);
        let j = 0 , x = 0;
        while(j < info.length){
            const [num,dir] = [info[j],info[j+1]];
            fishes.push(new Fish(y,x,dir-1,num));
            map[y][x] = fishes[fishes.length-1];
            j+=2 ,x++; 
        }
    }
    fishes.sort((a,b) => a.number - b.number);
    const {y,x,dir,number} = map[0][0];
    shark = {y,x,dir,sum:number} , fishes.splice(number-1,1), map[0][0] = null;
    let max = 0;
    const moveShark = (fishes,shark) =>{
        if(shark.sum > max) max = shark.sum;
        let copyMap = Array.from({length:4},()=>Array(4).fill(null));
        let copyFishes = fishes.map(fish => ({...fish}));
        copyFishes.forEach(fish => copyMap[fish.y][fish.x] = fish);
        copyFishes.forEach(fish => fishMove(fish,shark,copyMap));
        for(let i=1; i<=3; i++){
            let {y,x,dir,sum} = shark;
            const [ny,nx] = [y+dy[dir]*i ,x+dx[dir]*i];
            if(!isValidPos(ny,nx) || !copyMap[ny][nx]) continue;
            const fish = copyMap[ny][nx] ;
            const fishIndex = copyFishes.findIndex(f => f===fish);
            const newShark = {y:ny,x:nx,dir:fish.dir,sum:sum+fish.number};
            copyFishes.splice(fishIndex,1);
            moveShark(copyFishes,newShark);
            copyFishes.splice(fishIndex,0,fish);
        }
    }
    moveShark(fishes,shark);
    console.log(max);
}
solution(input);