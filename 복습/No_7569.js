// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = [
    '5 3 2',
    '0 0 0 0 0',
    '0 0 0 0 0',
    '0 0 0 0 0',
    '0 0 0 0 0',
    '0 0 1 0 0',
    '0 0 0 0 0'
]
let inputIndex =0;
const [column,row,depth]=stringToNumberArr(input[inputIndex++]);
let tomatoBox = Array.from({length:depth},()=>Array.from({length:row},()=>stringToNumberArr(input[inputIndex++])));

let tomatoStart = [];
let isRipe = true;
for(let i=0; i<depth; i++){
    for(let j=0; j<row; j++){
        if(tomatoBox[i][j].includes(0)) isRipe = false;
        let index = -1;
        while(true){
            index = tomatoBox[i][j].indexOf(1,index+1);
            if(index === -1) break;
            tomatoStart.push([i,j,index]);
        }
    }
}

isRipe ? console.log(0) : console.log(getDays())

function getDays(){
    let days = bfs(tomatoStart);
    loop1:for(let i=0; i<depth; i++){
            for(let j=0; j<row; j++){
              if(tomatoBox[i][j].includes(0)){
                 days = -1;
                 break loop1;
              }
          }
       }
       return days;
}


function bfs(start){
    let queue = [...start];
    let startIndex = 0;
    let endIndex,change;
    let days = 0;
    const distance = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
    while(queue.length){
        endIndex = queue.length;
        change =0;
        for(let i=startIndex; i<endIndex; i++){
            const [curZ,curY,curX] = queue[i];

            distance.forEach(([z,y,x])=>{
                const [nextZ,nextY,nextX]= [curZ+z,curY+y,curX+x];
                if(nextZ <0 || nextY <0 || nextX <0 || nextZ >=depth || nextY >=row || nextX >=column)
                return;
                if(!tomatoBox[nextZ][nextY][nextX]){
                    change = 1;
                    tomatoBox[nextZ][nextY][nextX] = 1;
                    queue.push([nextZ,nextY,nextX])
                }
            })
        }
        if(change === 0) break;
        days++;
        startIndex=endIndex;

    }
    return days;
    
}
function stringToNumberArr(arr){
    return arr.split(' ').map(num=>+num);
}