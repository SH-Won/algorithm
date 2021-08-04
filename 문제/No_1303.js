const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '5 5',
//     'WBWWW',
//     'WWWWW',
//     'BBBBB',
//     'BBBWW',
//     'WWWWW'
// ]
const [column,row]=input[0].split(' ').map(num=>+num);
let battleField = Array.from({length:row},(_,i)=>input[i+1].split(''));

let whiteForce = 0;
let blueForce = 0;

for(let i=0; i<row; i++){
    for(let j=0; j<column; j++){
       
       if(battleField[i][j] === 'W' || battleField[i][j] ==='B'){
           battleField[i][j] ==='W' ?
            whiteForce+= bfs(i,j,battleField[i][j]) :
            blueForce+= bfs(i,j,battleField[i][j]);
       }
       
    }

}
console.log(whiteForce+' '+blueForce);

function bfs(y,x,color){
    let queue = [[y,x]];
    let power=1;
    battleField[y][x] =1;
    while(queue.length){
        const [curY,curX] = queue.shift();

        [[curY+1,curX],[curY-1,curX],[curY,curX+1],[curY,curX-1]]
        .forEach(([y,x])=>{
            if(y<0 || x<0 ||  y>=row || x>=column) return;
            if(battleField[y][x] === color){
                battleField[y][x] = 1;
                queue.push([y,x]);
                power++;
            }
        })

    }
    return power**2;
}