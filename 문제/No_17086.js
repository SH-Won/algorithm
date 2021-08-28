//const input = ['5 4','0 0 1 0','0 0 0 0','1 0 0 0','0 0 0 0','0 0 0 1'];
//const input = ['7 4','0 0 0 1','0 1 0 0','0 0 0 0','0 0 0 1','0 0 0 0','0 1 0 0','0 0 0 1']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num=>+num);
let shark = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(num =>+num));
let startShark =[]
for(let i=0; i<shark.length; i++){
    let index = -1;
    while(true){
        index = shark[i].indexOf(1,index+1);
        if(index === -1){
            break;
        }
        startShark.push([i,index]);
    }
}


const bfs =(start) =>{
    const isValidPos = (y,x) => (y>=0 && x>=0 & y<N && x<M);
    const distance = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]
    let queue = [...start];
    let count = -1;
   while(queue.length){
       let length = queue.length;
    while(length--){
        const [cy,cx] = queue.shift();

        distance.forEach(([my,mx])=>{
            const [ny,nx] = [cy+my,cx+mx];
            if(!isValidPos(ny,nx) || shark[ny][nx] ) return;
            shark[ny][nx] = 1;
            queue.push([ny,nx]);
        })
        
    }
    count++;
}
return count;
    
}
let answer = bfs(startShark);
console.log(answer);