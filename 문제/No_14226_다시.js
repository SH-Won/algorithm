
const input ='6';
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = +input;
let visited = Array.from({length:1001},()=>Array(1001).fill(false));
let answer = bfs(1);

console.log(answer);

function bfs(start){
    let queue = [[start,0,0]];

    while(queue.length){
        const [cImoge,clipBoard,time] =queue.shift();
        
        if(cImoge === N ) return time;

        if(cImoge <=0 || cImoge > 1000) continue;

        
        // 클립보드를 저장한다.
        if(!visited[cImoge][cImoge]){
            visited[cImoge][cImoge]  = true;
            queue.push([cImoge,cImoge,time+1])
        }
        //화면에 이모티콘을 제거한다
        if(!visited[cImoge-1][clipBoard]){
            visited[cImoge-1][clipBoard] =true;
            queue.push([cImoge-1,clipBoard,time+1])
        }
        // 클립보드에있는 이모티콘을 화면에 복사한다
        if(clipBoard && clipBoard +cImoge <=1000 ){
            if(!visited[cImoge+clipBoard][clipBoard]){
                visited[cImoge+clipBoard][clipBoard] =true;
                queue.push([cImoge+clipBoard,clipBoard,time+1])
            }
        }
        
        
      

        
    }

}
