//const S ='18';
const fs = require('fs');
const S = fs.readFileSync('/dev/stdin').toString().trim();
let status = Array.from({length:1001},()=>Array(1001).fill(false));

const bfs =(start) =>{
    let queue = [[start,0,0]];
    status[start][0] = true;

    while(queue.length){
        const [cImoge,clipboard,time] =queue.shift();
        if(cImoge === parseInt(S)){
            return console.log(time);
        }
        if(cImoge <=0 || cImoge >1000) continue;
      
        if(!status[cImoge][cImoge]){
            status[cImoge][cImoge] =true;
            queue.push([cImoge,cImoge,time+1])
        }
        if(clipboard && clipboard + cImoge <=1000){
            if(!status[cImoge+clipboard][clipboard]){
                status[cImoge+clipboard][clipboard] = true;
                queue.push([cImoge+clipboard,clipboard,time+1]);
            }
        }
        if(cImoge-1 >=0 && !status[cImoge-1][clipboard]){
            status[cImoge-1][clipboard] = true;
            queue.push([cImoge-1,clipboard,time+1])
        }
        
    }
}
bfs(1);
