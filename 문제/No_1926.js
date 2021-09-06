const input = [
    '6 5',
    '1 1 0 1 1',
    '0 1 1 0 0',
    '0 0 0 0 0',
    '1 0 1 1 1',
    '0 0 1 1 1',
    '0 0 1 1 1'
]

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n,m] =input[0].split(' ').map(num => +num);
let map = Array.from({length:n},(_,i) => input[i+1].split(' '));

let maxArea = 0;
let count =0;

const bfs = (start) =>{
     let queue=[start];
     let area = 1;

     map[start[0]][start[1]] = '0'
     const isValidPos = (y,x) => ( y>=0 && x>=0 && y<n && x<m); 
     while(queue.length){
         const [cy,cx] = queue.shift();

         [[1,0],[-1,0],[0,1],[0,-1]]
         .forEach(([my,mx])=>{
             const [ny,nx] = [cy+my,cx+mx];
             if(!isValidPos(ny,nx) || map[ny][nx] !=='1') return;

             queue.push([ny,nx]);
             area++;
             map[ny][nx] ='0';
         })

     }
     return area;
}

for(let i=0; i<n; i++){
    for(let j=0; j<m; j++){
        if(map[i][j] === '1'){
            let area = bfs([i,j]);
            maxArea = Math.max(area,maxArea);
            count++;
        }
    }
}

console.log(`${count}\n${maxArea}`)
