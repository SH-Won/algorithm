// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = [
    '5 3 2',
    '0 -1 0 0 0',
    '-1 -1 0 0 0',
    '0 0 0 0 0',
    '0 -1 0 0 0',
    '-1 -1 1 0 0',
    '0 0 0 0 0'
]
// const input = [
//     '5 3 2',
//     '1 1 1 1 1',
//     '1 1 1 1 1',
//     '1 1 1 1 1',
//     '1 1 1 1 1',
//     '-1 -1 -1 -1 -1',
//     '1 1 1 1 1'
// ]

let inputIndex = 0;
const [column,row,depth]= stringToNumberArr(input[inputIndex++]);
const distance = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
let tomato = Array.from({length:depth},()=>Array.from({length:row},()=>stringToNumberArr(input[inputIndex++])));
let start = [];

if(isRipe(tomato)){
    console.log(0);
}
else{
    for(let i=0; i<depth; i++){
        for(let j=0; j<row; j++){
            let index = -1;
            while(true){
                index = tomato[i][j].indexOf(1,index+1);
                if(index === -1) break;
                start.push([i,j,index]);
            }
            
        }
    }
    
    let days = bfs(start);
    console.log(tomato);
    for(let i=0; i<depth; i++){
        for(let j=0; j<row; j++){
            if(tomato[i][j].includes(0)){
                console.log(-1);
                return;
            }
            if(i=== depth-1 && j=== row-1){
                console.log(days);
            }
            
        }
    }

}



function bfs(start){
    let queue = [...start];
    let startIndex=0;
    let curX,curY,curZ,nextX,nextY,nextZ,endIndex;
    let days =-1;
    let change ;
    while(queue.length){
        endIndex = queue.length;
        change =0;
        for(let i=startIndex; i<endIndex; i++){
            [curZ,curY,curX] = queue[i];
            distance.forEach(([z,y,x])=>{
                nextZ = curZ+z;
                nextY = curY+y;
                nextX = curX+x;
                if(nextX < 0 || nextY <0 || nextZ <0 ||
                   nextX >= column || nextY >=row || nextZ >=depth)
                   return;
                if(tomato[nextZ][nextY][nextX] === 0 ){
                   change = 1;
                   queue.push([nextZ,nextY,nextX]);
                   tomato[nextZ][nextY][nextX] = 1;

                }
            })
        }
        days++;
        if(change===0) break;
        startIndex = endIndex;
    }
    return days;
}

function isRipe(arr){
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr[i].length; j++){
            if(arr[i][j].includes(0)){
                return false;
            }
            if(i === arr.length-1 && j=== arr[i].length -1){
                return true;
            }
        }
    }
}

function stringToNumberArr(arr){
    return arr.split(' ').map(num => +num);
}