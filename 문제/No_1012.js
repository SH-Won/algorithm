const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input=[
//     '2','10 8 17','0 0','1 0','1 1','4 2','4 3','4 5',
//     '2 4','3 4','7 4','8 4','9 4','7 5','8 5','9 5',
//     '7 6','8 6','9 6','10 10 1','5 5']
let T = +input[0];
let inputIndex = 1;
let graph;
const distance = [ [-1,0],[1,0],[0,-1],[0,1]];
let bugCount ;

function stringToNumberArr(string){
    return string.split(' ').map(num => +num);
}
while(T--){
    let [row,column,carbageCount] = stringToNumberArr(input[inputIndex++]);
    graph = Array.from({length:column},()=> Array(row).fill(0));
    bugCount = 0;
    while(carbageCount--){
        const [x,y] = stringToNumberArr(input[inputIndex++]);

        graph[y][x] = 1;

    }
    while(true){
        let x,y ;
        for(let i=0; i<column; i++){
            
            
            if(graph[i].indexOf(1)===-1) continue;

            y=i;
            x = graph[i].indexOf(1);

            break;
           
        }
        if(x===undefined && y===undefined) break;
        
        bugCount++;
        bfs(y,x);

    }
    console.log(bugCount);

    function bfs(x,y){
        let willVisited =[[x,y]];
        let rowCount,columnCount;
        while(willVisited.length > 0){
            [rowCount,columnCount] = willVisited.shift();
    
            if(graph[rowCount][columnCount] === 0) continue;
    
            graph[rowCount][columnCount] =0;
    
            distance.forEach( ([y,x]) =>{
    
                if(rowCount+y < 0 || columnCount+x < 0 || rowCount+y >= column || columnCount+x >= row){
                    return;
                }
                
                if(graph[rowCount+y][columnCount+x]){
                    willVisited.push([rowCount+y,columnCount+x])
                }
            })
    
    
        }
    
    }
    
    
}



