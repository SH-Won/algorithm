//const input =['3','3 3 0 1','4 2 1 3','4 2 2 1'];
//const input = ['4','3 3 0 1','4 2 1 3','4 2 2 1','2 7 3 4'];
//const input = ['10','5 5 0 0','5 6 0 0','5 7 0 0','5 8 0 0','5 9 0 0','6 5 0 0','6 6 0 0','6 7 0 0','6 8 0 0','6 9 0 0'];
//const input = ['4','50 50 0 10','50 50 1 10','50 50 2 10','50 50 3 10'];

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

function DragonCurve(x,y,d,g){
    this.x = x;
    this.y = y;
    this.d = d;
    this.g = g;
}
function curve(){
    let {x,y,d,g} = this;
    this.map[y][x] = true ;
    const firstDir = (d+3) % 4;
    y+=this.dy[firstDir] , x+=this.dx[firstDir] , this.map[y][x] = true;
    let dir = [d];
    while(g--){
        let length = dir.length;
        while(length--){
            const nDir = dir[length];
            const [ny,nx] = [y+this.dy[nDir],x+this.dx[nDir]];
            dir.push( (nDir+1) % 4);
            this.map[ny][nx] = true , y=ny , x = nx; 
        }
    }    
}
const solution = (input) =>{
    const N = +input[0];
    let map = Array.from({length:100},()=>Array(100).fill(false));
    DragonCurve.prototype.dy = [-1,0,1,0] , DragonCurve.prototype.dx = [0,-1,0,1];
    DragonCurve.prototype.curve = curve , DragonCurve.prototype.map = map;
    const dragonCurves = Array.from({length:N},(_,i) => new DragonCurve(...input[i+1].split(' ').map(Number)));
    dragonCurves.forEach(dc => dc.curve());
    let answer = 0;
    for(let y=1; y<100; y++){
        for(let x=1; x<100; x++){
             if(map[y][x] && map[y-1][x] && map[y][x-1] && map[y-1][x-1]){
                 answer++;
             }
        }
    }
    console.log(answer);
}
solution(input);