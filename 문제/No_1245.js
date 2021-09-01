const input = [
    "8 7",
"4 3 2 2 1 0 1",
"3 3 3 2 1 0 1",
"2 2 2 2 1 0 0",
"2 1 1 1 1 0 0",
"1 1 0 0 0 1 0",
"0 0 0 1 1 1 0",
"0 1 2 2 1 1 0",
"0 1 1 1 2 1 0",
]

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(num =>+num);
let farm = Array.from({length:N},(_,i) => input[i+1].split(' ').map(num => +num));
let min = Infinity;
let count = 0;
for(let i=0; i<N; i++){
   min = Math.min(min,...farm[i])
}
const isValidPos =(y,x) => (y >=0 && x>=0 && y<N && x<M);
const distance = [[1,0],[-1,0],[0,1],[0,-1],[-1,1],[-1,-1],[1,1],[1,-1]];
const dfs = (y,x) =>{

    farm[y][x] =min;
    distance.forEach(([my,mx])=>{
        const [ny,nx] = [y+my,x+mx];
        if(!isValidPos(ny,nx) || farm[ny][nx] === min) return;
        dfs(ny,nx);
    })

}
for(let i=0; i<N; i++){
    for(let j=0; j<M; j++){
        if(farm[i][j] !== min){
            dfs(i,j);
            count++;
        }
    }
}
console.log(count);