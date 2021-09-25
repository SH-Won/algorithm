// const [F,S,G,U,D] = [10,1,10,2,1];
//const [F,S,G,U,D] = [100,2,1,1,0];
const fs = require('fs');
const [F,S,G,U,D] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);
let visited = Array(F+1).fill(false);
const move = [U,-D];
const isValidFloor = (floor) => (floor >=1 && floor <=F);
const bfs = () =>{
    visited[S] = true;
    let queue = [[S,0]];
    while(queue.length){
        const [cFloor,count] = queue.shift();
        if(cFloor === G) return console.log(count);

        for(let i=0; i<move.length; i++){
            const nFloor = cFloor+move[i];
            if(!isValidFloor(nFloor) || visited[nFloor]) continue;
            visited[nFloor] = true;
            queue.push([nFloor,count+1]);
        }
    }
    return console.log('use the stairs');
}
bfs();