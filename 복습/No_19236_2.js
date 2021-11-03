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

//const fs =require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const dy = [-1,-1,0,1,1,1,0,-1];
const dx = [0,-1,-1,-1,0,1,1,1];
class Fish{
    constructor(y,x,number,direction,isAlive){
        this.y = y;
        this.x = x;
        this.number = number;
        this.direction = direction;
        this.isAlive = isAlive;
    }
}
const isValidPos = (y,x) => (y>=0 && x>=0 && y<4 && x<4);

const fishMove = (fish,shark,map) =>{
    let {y,x,direction} = fish;
    let [ny,nx] = [y+dy[direction],x+dx[direction]];
    while(true){
        if(!isValidPos(ny,nx) || (ny ===shark.y && nx === shark.x)){
            direction = direction >=8 ? 0 : direction+1;
            [ny,nx] = [y+dy[direction],x+dx[direction]];
            continue;
        }
        else break;
    }
    fish.direction = direction;
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
const getMax = (fishes,shark) =>{
     let max = 0;
     const dfs = (fishes,shark) =>{
         if(shark.sum > max) max = shark.sum;
         let map = Array.from({length:4},()=>Array(4).fill(null));
         let copyFishes =fishes.map(fish => {return {...fish}});
         copyFishes.forEach(fish => map[fish.y][fish.x] = fish);
         copyFishes.forEach(fish => fish.isAlive && fishMove(fish,shark,map));
         
         for(let i=0; i<4; i++){
             const {y,x,direction} = shark;
             const [ny,nx] = [y+dy[direction]*i,x+dx[direction]*i];
             if(!isValidPos(ny,nx) || !map[ny][nx] || !map[ny][nx].isAlive) continue;
             
             let fish = map[ny][nx];
             fish.isAlive = false;
             const newShark = {y:fish.y , x:fish.x , direction:fish.direction , sum:shark.sum + fish.number};
             dfs(copyFishes,newShark);
             fish.isAlive = true; 
         }
     }
     dfs(fishes,shark);
     return max
}
const solution =(input) =>{
    let map = Array.from({length:4},()=>Array(4));
    let shark = {y:0,x:0,direction:null,sum:0};
    let fishes = [];
    for(let i=0; i<4; i++){
        const info = input[i].split(' ').map(Number);
        let [y,x,j] = [i,0,0];
        while(j < info.length){
            const [number,direction] = [info[j],info[j+1]];
            fishes.push(new Fish(y,x,number,direction-1,true));
            j+=2, x++;
        }
    }
    fishes.sort((a,b)=> a.number - b.number);
    fishes.forEach(fish => map[fish.y][fish.x] = fish);
    map[0][0].isAlive = false , shark.sum = map[0][0].number ,shark.direction = map[0][0].direction;
    const max = getMax(fishes,shark);
    console.log(max);
}
solution(input);


