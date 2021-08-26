const [A,B] = [2,162];
//const fs = require('fs');
//const [A,B] =fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num =>+num);
let answer = bfs(A);
console.log(answer);

function bfs(start){
    let queue =[[start,1]];
    let startIndex = 0;
    let endIndex;
    while(startIndex !== queue.length){
        endIndex = queue.length;
        for(let i=startIndex; i<endIndex; i++){
            const [cNum,count]= queue[i];
            const next = [cNum*2,parseInt(""+cNum+"1")];
            for(let i=0; i<next.length; i++){
                if(next[i] === B){
                    return count+1;
                }
                if(next[i] < B) queue.push([next[i],count+1])
            }
        }
        startIndex=endIndex;
    }
    return -1;

}

// function bfs(start){
    
//     let queue = [start];
//     let count =0;
//     let isExist = false;
//     while(queue.length){
        
//         let length = queue.length;
//         while(length--){
//             const cNum =queue.shift();
//             const next = [cNum*2,parseInt(""+cNum+"1")];
           
//             for(let i=0; i<next.length; i++){
//                 if(next[i] === B){
//                     isExist=true;
//                     return count+=2;
                    
//                 }
//                 if(next[i] < B) queue.push(next[i])
//             }
             
//         }
//         //if(isExist) return count; 
//         count++;
        
//         // isExist = queue.some(num => num ===B);
//         // if(isExist) return count+1;

//     }

//     return -1
 
// }