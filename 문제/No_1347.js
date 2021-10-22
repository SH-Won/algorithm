// const input = ['5','RRFRF']
// const input = ['6','LFFRFF']
// const input = ['14','LFLFRRFLFRRFLF']
// const input = ['19','FLFRFFRFFFRFFRFLFLL']
const input = ['31','FRFFFFFFLLFRFFFFFLLFRFFFFLFFLFF']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const command = input[1];
const dy = [1,0,-1,0];
const dx = [0,-1,0,1];

const solution = () =>{
    let maze = Array.from({length:101},()=>Array(101).fill('#'));
    let dir = 0;
    let [y,x] = [50,50];
    maze[y][x] = '.';
    let xRange = [50,50];
    let yRange = [50,50];
    for(let i=0; i<N; i++){
        if(command[i] === 'R') dir = dir===3 ? 0 : dir+1;
        else if(command[i] === 'L') dir = dir===0 ? 3 : dir-1;
        else{
            y+=dy[dir] , x+=dx[dir];
            maze[y][x] ='.'
            xRange[0] = Math.min(xRange[0],x);
            xRange[1] = Math.max(xRange[1],x);
            yRange[0] = Math.min(yRange[0],y);
            yRange[1] = Math.max(yRange[1],y);
        }
    }
    //console.log(xRange,yRange);
    let answer ='';
    for(let y=yRange[0]; y<=yRange[1]; y++){
        answer+=`${maze[y].slice(xRange[0],xRange[1]+1).join('')}\n`
    }
    console.log(answer.trim());
}
solution();