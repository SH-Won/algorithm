// const input = [
// '1',
// '4 4',
// '0 0 0 0',
// '1 0 0 0',
// '0 0 1 0',
// '0 1 0 0',
// ]
// const input = [
// '1',
// '5 5',
// '0 1 1 0 1',
// '0 0 1 0 1',
// '0 1 0 1 1',
// '0 1 0 1 0',
// '1 1 0 1 0',
// ] //ans -1
// const input = [
// '3',
// '4 5',
// '0 1 1 1',
// '1 1 0 1',
// '1 1 1 1',
// '1 1 1 0',
// '1 1 1 0',
// ] //ans 3
// const input = ['5','1 1','0'] //ans 0;
// const input = [
// '2',
// '5 3',
// '0 0 0 0 0',
// '1 0 1 1 0',
// '1 0 1 1 0',
// ]
const input = [
'1',
'4 4',
'0 0 1 1',
'0 0 1 1',
'0 0 1 1',
'1 1 1 0'
]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const K = +input[0];
const [W,H] = input[1].split(' ').map(Number);
const map = Array.from({length:H},(_,i)=>input[i+2].split(' '));
let timeTable = Array.from({length:H},()=>Array.from({length:W},()=>Array(K+1).fill(Infinity)));
const isValidPos = (y,x) =>(y>=0 && x>=0 && y<H && x<W);
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const hy = [-1,-2,-2,-1,1,2,2,1];
const hx = [-2,-1,1,2,2,1,-1,-2];
const solution = () =>{
    timeTable[0][0]= 0;
    let queue = [[0,0,0,K]];
    while(queue.length){
        const [y,x,time,k] = queue.shift();
        if(y===H-1 && x===W-1) return console.log(time);
        
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || timeTable[ny][nx][k] <= time+1 || map[ny][nx] ==='1' ) continue;
            queue.push([ny,nx,time+1,k]);
            timeTable[ny][nx][k] = time+1;
        }
        for(let i=0; i<8; i++){
            const [ny,nx] = [y+hy[i],x+hx[i]];
            if(!k ||!isValidPos(ny,nx) || timeTable[ny][nx][k-1] <= time+1 || map[ny][nx] ==='1') continue;
            timeTable[ny][nx][k-1] = time+1
            queue.push([ny,nx,time+1,k-1]);

        }
    }
    console.log(-1);
}
solution();