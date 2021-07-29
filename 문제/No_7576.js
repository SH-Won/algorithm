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
// const input =[
//     '5 5',
//     '-1 1 0 0 0',
//     '0 -1 -1 -1 0',
//     '0 -1 -1 -1 0',
//     '0 -1 -1 -1 0',
//     '0 0 0 0 0'
// ]
const [row,column] =stringToNumberArr(input[0]);
let graph = Array.from({length:column},(_,i)=> stringToNumberArr(input[i+1]));
let firstTomato = [];
const distance = [[1,0],[-1,0],[0,1],[0,-1]];
for(let i=0; i<graph.length; i++){
    let index = -1;
    while(true){
        index = graph[i].indexOf(1,index+1);
        
        if(index === -1) break;
        
        firstTomato.push([i,index])
    }
}


    let days = bfs(firstTomato);
   for(let i=0; i<column; i++){
       if(graph[i].includes(0)){
           console.log(-1);
       }
       if(i ===column -1){
           console.log(days);
       }
   }

function bfs(start){
    let queue = [...start];
    let curX,curY,nextX,nextY;
    let startIndex =0;
    let endIndex ;
    let days = -1;
    
    while(queue.length){
        let change = 0;
        endIndex =queue.length;
        for(let i=startIndex; i<endIndex; i++){
            [curY,curX] = queue[i];

            distance.forEach(([y,x])=>{
                nextX = curX+x;
                nextY = curY+y;
                if(nextX < 0 || nextY <0 || nextX >=row || nextY >=column)
                  return;
                if(graph[nextY][nextX] === 0 ){
                    change = 1;
                    graph[nextY][nextX] = 1;
                    queue.push([nextY,nextX]);
                }

            })
        }
        days++;
        if(change === 0) break;
        
        startIndex = endIndex;
    }
    return days;
}

function stringToNumberArr(arr){
    return arr.split(' ').map(num => +num);
}
// function isRipe(arr){
//     for(let i=0; i<arr.length; i++){
//         if(arr[i].indexOf(0) !== -1){

//             return false;
//         }
//         if(i === arr.length -1){
//             return true;
//         }
//     }
// }

