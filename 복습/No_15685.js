//const input =['3','3 3 0 1','4 2 1 3','4 2 2 1'];
//const input = ['4','3 3 0 1','4 2 1 3','4 2 2 1','2 7 3 4'];
//const input = ['10','5 5 0 0','5 6 0 0','5 7 0 0','5 8 0 0','5 9 0 0','6 5 0 0','6 6 0 0','6 7 0 0','6 8 0 0','6 9 0 0'];
const input = ['4','50 50 0 10','50 50 1 10','50 50 2 10','50 50 3 10'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
let visited = Array.from({length:101},()=>Array(101).fill(false));
class DrangonCurve{
    constructor(x,y,d,g){
        this.x = x;
        this.y = y;
        this.d = d;
        this.g = g;
        
    }
}
DrangonCurve.prototype.distance = [[0,-1],[-1,0],[0,1],[1,0]]
DrangonCurve.prototype.curve = function(){
    let [x,y,d,g] = [this.x, this.y, this.d, this.g];
    let dir = [d];
    visited[x][y] = true;
    const [nx,ny] = [x+this.distance[(d+3)%4][0],y+this.distance[(d+3)%4][1]];
    visited[nx][ny] = true;
    x = nx;
    y = ny;
    while(g--){
        let length = dir.length;
        while(length--){
            const d = dir[length];
            const [mx,my] = [this.distance[d][0],this.distance[d][1]];
            dir.push((d+1)%4)
            x+=mx;
            y+=my;
            visited[x][y]= true;
        }
    }
}
let dragonCurves = input.slice(1).map(string => new DrangonCurve(...string.split(' ').map(Number)));

dragonCurves.forEach(dragonCurve => dragonCurve.curve());
let count =0;
for(let x=0; x<100; x++){
    for(let y=0; y<100; y++){
        if(visited[x][y] && visited[x+1][y] && visited[x][y+1] && visited[x+1][y+1])
        count++;
    }
}
console.log(count);

