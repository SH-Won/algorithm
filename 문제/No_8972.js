// const input = ['4 5','I....','.....','.R.R.','.....','6']
// const input = [
// '9 10',
// '..........',
// '.........R',
// '..........',
// 'R.........',
// 'R...I.....',
// 'R.........',
// '..........',
// '.........R',
// '....R.....',
// '5558888'
// ]
const input = [
'12 8',
'...I....',
'........',
'........',
'........',
'........',
'RR......',
'......RR',
'R......R',
'........',
'........',
'........',
'...R....',
'66445394444162'
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
class Arduino{
    constructor(y,x){
        this.y = y;
        this.x = x;
    }
}
function move(){
    const {y,x,dy,dx,jongsu} = this;
    let minDist = Infinity , minDir = null;
    for(let i=1; i<=9; i++){
        const [ny,nx] = [y+dy[i],x+dx[i]];
        const dist = Math.abs(jongsu.y - ny) + Math.abs(jongsu.x - nx);
        if(dist < minDist){
            minDist = dist;
            minDir = i;
        }
    }
    this.y = y+dy[minDir] , this.x = x+dx[minDir];
}


const solution = input =>{
    const [R,C] = input[0].split(' ').map(Number);
    const [dy,dx] = [[null,1,1,1,0,0,0,-1,-1,-1],[null,-1,0,1,-1,0,1,-1,0,1]];
    let map = Array.from({length:R},()=>Array.from({length:C},()=>[]));
    let jongsu ;
    const arduinos = [];
    for(let i=1; i<1+R; i++){
        for(let j=0; j<input[i].length; j++){
            if(input[i][j] === 'I') jongsu = {y:i-1, x:j};
            else if(input[i][j] === 'R') arduinos.push(new Arduino(i-1,j));
        }
    }
    const command = input[1+R];
    Arduino.prototype.dy = dy , Arduino.prototype.dx = dx;
    Arduino.prototype.move = move , Arduino.prototype.jongsu = jongsu;
    let m = 0;
    arduinos.forEach(a => map[a.y][a.x].push(a));
    while(m < command.length){
        const dir = +command[m++];
        jongsu.y+=dy[dir] , jongsu.x+=dx[dir];
        if(map[jongsu.y][jongsu.x].length) return console.log(`kraj ${m}`);
        const current = map;
        map = Array.from({length:R},()=>Array.from({length:C},()=>[]));
        for(let y=0; y<R; y++){
            for(let x=0; x<C; x++){
                if(current[y][x].length){
                    const arduino = current[y][x][0];
                    arduino.move();
                    if(arduino.y === jongsu.y && arduino.x === jongsu.x) return console.log(`kraj ${m}`);
                    map[arduino.y][arduino.x].push(arduino);
                }
            }
        }
        for(let y=0; y<R; y++){
            for(let x=0; x<C; x++){
                if(map[y][x].length >= 2) map[y][x] = [];
            }
        }
    }
    let answer = '';
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(y === jongsu.y && x === jongsu.x) answer+='I';
            else if(map[y][x].length) answer+='R';
            else answer+='.';
        }
        answer+='\n';
    }
    console.log(answer.trim());
}
solution(input);