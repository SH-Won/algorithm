//const input = ['5','6 8 2 6 2','3 2 3 4 6','6 7 3 3 2','7 2 5 3 6','8 9 5 2 7'];
// const input =[
//     "7",
// "9 9 9 9 9 9 9",
// "9 2 1 2 1 2 9",
// "9 1 8 7 8 1 9",
// "9 2 7 9 7 2 9",
// "9 1 8 7 8 1 9",
// "9 2 1 2 1 2 9",
// "9 9 9 9 9 9 9",
// ]
// 비가 안올수도 있음?????
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const place = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(num =>+num));
let visited = Array.from({length:N},()=>Array(N).fill(false));
let max = -Infinity;

for(let i=0; i<place.length; i++){
    const maxCount = Math.max(...place[i]);
    maxCount > max ? max =maxCount : max;
}


const bfs = (start,safety) =>{
    
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);

    let queue =[start];
    visited[start[0]][start[1]] =true;
    
    while(queue.length){
        const [cy,cx] = queue.shift();
        
        [[1,0],[-1,0],[0,1],[0,-1]]
        .forEach(([my,mx])=>{
            const [ny,nx] = [cy+my,cx+mx];
            if(!isValidPos(ny,nx) || place[ny][nx] <= safety || visited[ny][nx]) return;
            
            visited[ny][nx] =true;
            
            queue.push([ny,nx]);
        })

    }

    
}
let answer = 0;
for(let i=0; i<max; i++){
    
    let count = 0;
    for(let j=0; j<N; j++){
        for(let k=0; k<N; k++){
            if(!visited[j][k] && place[j][k] > i){
                
                bfs([j,k],i);
                count++;
            }
        }
    }
    count > answer ? answer=count : answer;
    count =0;
   
    visited = visited.map(array => array.fill(false))
    
    
}
console.log(answer);