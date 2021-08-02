const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '6 4',
//     '1 -1 0 0 0 0',
//     '0 -1 0 0 0 0',
//     '0 0 0 0 -1 0',
//     '0 0 0 0 -1 1'
// ]
// const input =[
//     '6 4',
//     '1 1 1 1 1 1',
//     '1 1 1 1 1 1',
//     '1 1 1 1 1 1',
//     '1 1 1 1 1 1',
// ]
// const input = [
//     '6 4',
//     '0 -1 0 0 0 0',
//     '-1 0 0 0 0 0',
//     '0 0 0 0 0 0',
//     '0 0 0 0 0 1'
// ]
const [column,row]=stringToNumberArr(input[0]);
let tomatoBox = Array.from({length:row},(_,i)=>stringToNumberArr(input[i+1]))
let startTomato = [];
let isRipe = true;


for(let i=0; i<row; i++){
    let index = -1;
    let check = tomatoBox[i].includes(0);
    if(check) isRipe=false;

    while(true){
        index = tomatoBox[i].indexOf(1,index+1);
        if(index ===-1) break;
        startTomato.push([i,index])
    }
}
let days = bfs(startTomato);

for(let i=0; i<row; i++){
    if(tomatoBox[i].includes(0)){
        days = -1;
        break;
    }
}
isRipe ? console.log(0) : console.log(days);

function bfs(start){
    let queue = [...start];
    let startIndex = 0;
    let change;
    let days = 0;
    // const distance = [[1,0],[-1,0],[0,1],[0,-1]]
    while(queue.length){
        const endIndex = queue.length;
        change =0;
        for(let i=startIndex; i<endIndex; i++){
            const [curY,curX] = queue[i];

            [[curY+1,curX],[curY-1,curX],[curY,curX+1],[curY,curX-1]]
            .forEach(([y,x])=>{
                if(y < 0 || x<0 || y>=row || x>=column) return;

                if(!tomatoBox[y][x]){
                    change =1;
                    tomatoBox[y][x] = 1;
                    queue.push([y,x]);
                }
            })
        }
        if(change === 0) break;
        days++;
        startIndex =endIndex;
    }
    return days;
}

function stringToNumberArr(arr){
    return arr.split(' ').map(num =>+num);
}