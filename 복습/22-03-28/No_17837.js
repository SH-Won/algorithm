// const input = [
// '4 4',
// '0 0 2 0',
// '0 0 1 0',
// '0 0 1 2',
// '0 2 0 0',
// '2 1 1',
// '3 2 3',
// '2 2 1',
// '4 1 2'
// ]
// const input = [
// '4 4',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '1 1 1',
// '1 2 1',
// '1 3 1',
// '1 4 1'
// ]
// const input = [
// '4 4',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '1 1 1',
// '1 2 1',
// '1 3 1',
// '2 4 3'
// ]
// const input = [
// '4 4',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '0 0 0 0',
// '1 1 1',
// '1 2 1',
// '1 3 1',
// '3 3 3'
// ]
const input = [
    '6 10',
    '0 1 2 0 1 1',
    '1 2 0 1 1 0',
    '2 1 0 1 1 0',
    '1 0 1 1 0 2',
    '2 0 1 2 0 1',
    '0 2 1 0 2 1',
    '1 1 1',
    '2 2 2',
    '3 3 4',
    '4 4 1',
    '5 5 3',
    '6 6 2',
    '1 6 3',
    '6 1 2',
    '2 4 3',
    '4 2 1',
    ]
// const fs =require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Horse{
    constructor(y,x,dir){
        this.y = y;
        this.x = x;
        this.dir = dir;
    }
}
function move(){
    const {y,x,dir} = this;
    const [ny,nx] = [y+this.dy[dir],x+this.dx[dir]];
    const horseIndex = this.horseMap[y][x].findIndex(horse => horse === this);
    let nextHorses = [];
    if(!this.isValidPos(ny,nx) || this.map[ny][nx] === 2){
        this.dir = dir <= 1 ? (dir === 1 ? 0 : 1) : (dir === 2 ? 3 : 2);
        const [ny,nx] = [y+this.dy[this.dir],x+this.dx[this.dir]];
        if(!this.isValidPos(ny,nx) || this.map[ny][nx] === 2 ) return false;
        return this.move();
    }
    else if(this.map[ny][nx] === 0){
        nextHorses = this.horseMap[y][x].splice(horseIndex);
    }
    else if(this.map[ny][nx] === 1){
        nextHorses = this.horseMap[y][x].splice(horseIndex).reverse();
    }
    if(this.horseMap[ny][nx].length + nextHorses.length >= 4) return true;
    nextHorses.forEach(horse => (horse.y = ny , horse.x = nx));
    this.horseMap[ny][nx].push(...nextHorses);
    return false;
}
function isValidPos(y,x){
    return y >= 0 && x >= 0 && y < this.N && x < this.N;
}
const solution = input =>{
    const [N,K] = input[0].split(' ').map(Number);
    const map = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    const horseMap = Array.from({length:N},()=>Array.from({length:N},()=> []));
    const [dy,dx] = [[0,0,-1,1],[1,-1,0,0]];
    const horses = Array.from({length:K},(_,i)=>new Horse(...input[i+1+N].split(' ').map(num => +num -1)));
    horses.forEach(horse => horseMap[horse.y][horse.x].push(horse));
    Horse.prototype.dy = dy, Horse.prototype.dx = dx , Horse.prototype.horseMap = horseMap;
    Horse.prototype.map = map , Horse.prototype.N = N ;
    Horse.prototype.isValidPos = isValidPos ,Horse.prototype.move = move;
    let count = 0;
    while(count < 1000){
        count++;
        for(let i=0; i<horses.length; i++){
            const horse = horses[i];
            const isEnd = horse.move();
            if(isEnd) return console.log(count);
        }
    }
    console.log(-1);
}
solution(input);