//const input =['5','RRRBB','GGBBB','BBBRR','BBRRR','RRRRR']
const input =[
    '5',
    'RRRBB',
    'GGGBB',
    'BBGRR',
    'BBRRR',
    'RRRRR']

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const paint = Array.from({length:N},(_,i)=>input[i+1].split(''));
let visited = Array.from({length:N},()=>Array(N).fill(false))
const bfs = (start,color,isBlind) =>{
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    let queue= [start];
    visited[start[0]][start[1]] = true;
    while(queue.length){
        const [cy,cx] = queue.shift();

        [[1,0],[-1,0],[0,1],[0,-1]]
        .forEach(([my,mx])=>{
            const [ny,nx] = [cy+my,cx+mx];
            
            if(!isValidPos(ny,nx) ||  visited[ny][nx] ) return;
            
            if(isBlind && (color === 'R' || color ==='G')){
                 if(paint[ny][nx] ==='B' ) return;
                 queue.push([ny,nx]);
                 visited[ny][nx] = true;
            }
            else{
                if(paint[ny][nx] !==color) return;
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            }
  
        })
    }
}
let answer =''
for(let i=0; i<=1; i++){
    const isBlind = i === 1 ? true : false;
    let count =0;
    for(let j=0; j<N; j++){
        for(let k=0; k<N; k++){
            if(!visited[j][k]){
                bfs([j,k],paint[j][k],isBlind);
                count++;
            }
        }
    }
    answer+=`${count} `;
    count =0;
    visited = visited.map(array => array.fill(false));
}
console.log(answer.trim());