// const fs =require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');


const input=[
    '2','10 8 17','0 0','1 0','1 1','4 2','4 3','4 5',
    '2 4','3 4','7 4','8 4','9 4','7 5','8 5','9 5',
    '7 6','8 6','9 6','10 10 1','5 5']
let T = +input[0];
let inputIndex = 1;
let graph,bugCount ;
const distance = [[1,0],[-1,0],[0,1],[0,-1]];

while(T--){
    let [row,column,carbageCount] = stringToNumberArr(input[inputIndex++]);
    graph = Array.from({length:column},()=> Array(row).fill(0));
    bugCount = 0;
    let x,y ;
    while(carbageCount--){
       let [r,c] = stringToNumberArr(input[inputIndex++]);
        graph[c][r] = 1;
    }
    while(true){
        let x,y ;
        
    for(let i=0; i<column; i++){

        if(graph[i].indexOf(1) === -1) continue;

        y=i;
        x=graph[i].indexOf(1)
        break;
    }
   

    if(x === undefined && y===undefined) break;

    bugCount++;
    bfs(y,x)

    }
    console.log(bugCount);

    
    function bfs(y,x){
        let queue = [[y,x]];
        let curX,curY,nextX,nextY;

        while(queue.length){
            [curY,curX] = queue.shift();
            if(graph[curY][curX] === 0) continue;

            graph[curY][curX] = 0;

            distance.forEach(([y,x])=>{
                nextX = curX + x;
                nextY = curY + y;
                if(nextX < 0 || nextY < 0 || nextX >=row || nextY >=column){
                    return;
                }
                if(graph[nextY][nextX]){
                    queue.push([nextY,nextX]);
                }
            })
            
        }

    
    }
}
    


   




function stringToNumberArr(arr){
    return arr.split(' ').map(num => +num);
}