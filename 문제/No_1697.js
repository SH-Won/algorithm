const fs = require('fs');
const [N,K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);
//const [N,K] = [5,100000];
let position ={

}
const distance = [1,-1,2];

bfs(N);


function bfs(start){
    let queue = [start];
    let startIndex = 0;
    let curPos,nextPos,endIndex,change;
    let time = 0;
    position[start] =  1;
    while(queue.length){
       
        change =0;
        endIndex = queue.length;
        for(let i=startIndex; i<endIndex; i++){
            curPos = queue[i];
             if(curPos === K){
                 change=1;
                 console.log(time);
                 break;
             };
           
            distance.forEach((num,index)=>{
                nextPos = curPos + num;
                if(index === distance.length -1){
                    nextPos = curPos * num;
                }
                
                if(!position[nextPos] && nextPos < K+2 && nextPos >=0){
                   
                    position[nextPos] = true;
                    queue.push(nextPos)
                  
                
                }
            })
        }
        if(change ===1) break;
        time++;
        startIndex =endIndex;
        
        
    }
  
    
}
