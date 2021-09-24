const input =[
    '4',
    '14 9 12 10',
    '1 11 5 4',
    '7 15 2 13',
    '6 3 16 8'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +input[0];
const bamboo = Array.from({length:n},(_,i)=>input[i+1].split(' ').map(Number));

const solution = (n,bamboo) =>{
    let max = 0;
    let move = Array.from({length:n},()=>Array(n).fill(0));
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<n && x<n);
    const movePanda = (y,x) =>{

        if(move[y][x]) return move[y][x];

        distance.forEach(([my,mx])=>{
            const [ny,nx] = [y+my,x+mx];
            if(!isValidPos(ny,nx) || bamboo[ny][nx] <= bamboo[y][x]) return;
            move[y][x] = Math.max(move[y][x],movePanda(ny,nx))

        })
        move[y][x]++;
        return move[y][x];
    }
    for(let y=0; y<n; y++){
        for(let x=0; x<n; x++){
            max = Math.max(movePanda(y,x),max);
        }
    }
    return console.log(max);
}
solution(n,bamboo);