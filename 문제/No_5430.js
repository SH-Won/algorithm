//const input = ['4','RDD','4','[1,2,3,4]','DD','1','[42]','RRD','6','[1,1,2,3,5,8]','D','0','[]']
 const input = ['1','DD','3','[1,2,3]']
//const input = ['3','D','0','[]','R','0','[]','R','0','[]'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const T = +input[0];

const solution = (T) =>{
    let index = 1;
    let answer =""
    while(T--){
        const functions = input[index++];
        const n = +input[index++];
        // let array = input[index] ==='[]' ? [] : input[index++].slice(1,-1).split(/\,/g).map(Number);
        let array = input[index] ==='[]'? [] : input[index++].slice(1,-1).split(',').map(Number);
        if(!array.length) index++;
        let flag = false , reverseCount = 0, startIndex =0 , endIndex = array.length ;
        for(let i=0; i<functions.length; i++){
           const command = functions[i];
           if(command === 'R') reverseCount++;
           else if(command === 'D'){
               if(startIndex >=endIndex){
                   answer+=`error\n`
                   flag = true;
                   break;
               }
               else{
                   if(reverseCount % 2 === 0){
                      startIndex++;
                   }
                   else{
                      endIndex--;
                   }
               }
           }
        }
        if(flag) continue;
        
        answer+= reverseCount % 2 === 0 ? `[${array.slice(startIndex,endIndex).join(',')}]\n` : `[${array.slice(startIndex,endIndex).reverse().join(',')}]\n`
    }
    console.log(answer.trim());
}
solution(T);
