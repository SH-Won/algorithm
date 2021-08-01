// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input =[
    '7',
    '0110100',
    '0110101',
    '1110101',
    '0000111',
    '0100000',
    '0111110',
    '0111000'
]

const N = +input[0];
let apartment = Array.from({length:N},(_,i)=>input[i+1].split('').map(num =>+num));
let apartGroup =[];

for(let i=0; i<N; i++){
    for(let j=0; j<N; j++){
        if(apartment[i][j] === 1){
            apartGroup.push(bfs(i,j));         
        }
    }
}
apartGroup.sort((a,b)=>a-b);
console.log(
    `${apartGroup.length}\n${apartGroup.join('\n')}`.trim()
)


function bfs(y,x){
    let queue = [[y,x]];
    let count =0;
    apartment[y][x]=0;
    while(queue.length){
        const [curY,curX] = queue.shift();
        // if(!apartment[curY][curX]) continue

        
        count++;
        
        [[curY+1,curX],[curY-1,curX],[curY,curX+1],[curY,curX-1]]
        .forEach(([y,x])=>{
            if(y < 0 || x<0 || y>=N || x>=N) return;

            if(apartment[y][x]){
                apartment[y][x] = 0;
                queue.push([y,x])
                
            }
        })
    }
    return count;
}