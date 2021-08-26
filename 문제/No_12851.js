const [N,K] =[5,17];
//const fs = require('fs');
//const [N,K] =fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num=> +num);
let visited =Array(100001).fill(false);
let minTime = 0;
let cnt=0;
bfs();
console.log(minTime+"\n"+count);

function bfs(){
    let queue=[];
    queue.push([N,0]);
    
   
    while(queue.length){
        console.log(queue);
        const [cPos,time]=queue.shift();
        visited[cPos] =true;
        

        
        if(cPos-1 >=0 && !visited[cPos-1]) queue.push([cPos-1,time+1]);
        if(cPos+1 <=100000 && !visited[cPos+1]) queue.push([cPos+1,time+1]);
        if(cPos*2 <=100000 && !visited[cPos*2]) queue.push([2*cPos,time+1]);
        // const nPos = [cPos+1,cPos-1,cPos*2];
        // if(minTime < visited[cPos]) return
        
        
        // for(let i=0; i<nPos.length; i++){

        //    if(nPos[i] <0 || nPos[i] > 100000) continue;
        //    if(nPos[i] === K){
        //        minTime = visited[cPos];
        //        count++;
        //    }
        //    if(visited[nPos[i]] ===0 || visited[nPos[i]] === visited[cPos] +1){
        //        queue.push(nPos[i]);
        //        visited[nPos[i]] = visited[cPos]+1
        //    }
        // }
      
      
    }
    

     
}
