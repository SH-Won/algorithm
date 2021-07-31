const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '6 4',
//     '0100',
//     '1110',
//     '1000',
//     '0000',
//     '0111',
//     '0000'
//]
// const input =[
//     '4 4',
//     '0111',
//     '1111',
//     '1111',
//     '1110'
// ]
const [N,M] = input[0].split(' ').map(num => +num);
let load ;


// let block = [];
// for(let i=1; i<load.length; i++){
//     let index = -1;
//     while(true){
//         index = load[i].indexOf(1,index+1);

//         if(index === -1) break;

//         block.push([i,index]);
//     }
// }


let min = N*M;
// for(let [y,x] of block){
//    visited =Array.from({length:N+1},()=>Array(M+1).fill(0));
//    load[y][x] =0;
//    let way = bfs(1,1);
//    load[y][x] =1;
   
//    if(way && way < min) min = way;
   
// }
for(let i=0; i<N; i++){
    let index = -1;
    while(true){
        //visited = Array.from({length:N+1},()=>Array(M+1).fill(0));
        load = makeLoad();
        index = load[i].indexOf(1,index+1);
        
        if(index === -1) break;
       
        load[i][index] = 0;
        let way = bfs(0,0);
        load = null;

        if(way && way < min) min = way;

        
        
    }
}
console.log(min === N*M ? -1 : min);




function bfs(y,x){
    let queue = [[y,x]];
    load[y][x] = 1;
    
    
    
    while(queue.length){
        
        const [curY,curX] = queue.shift();
        if(curY === N-1 && curX ===M-1) break;
        

        [[curY+1,curX],[curY-1,curX],[curY,curX+1],[curY,curX-1]].forEach(([nextY,nextX])=>{
            
            if(nextY < 0 || nextX < 0 || nextY >=N || nextX >=M) return;

            // if(!load[nextY][nextX] && !visited[nextY][nextX]){
            //     visited[nextY][nextX] = visited[curY][curX] +1;
            //     queue.push([nextY,nextX]);
            // }

            if(load[nextY][nextX] ===0){
                load[nextY][nextX] = load[curY][curX] +1;
                queue.push([nextY,nextX]);
            }
            
            
        }
        )
    }
    return load[N-1][M-1]
    
}

function makeLoad(){
    let load = Array.from({length:N}, (_,i)=> input[i+1].split('').map(num => +num));

    return load;
}
