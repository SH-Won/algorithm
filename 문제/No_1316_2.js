const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

let count = 0;
// 3
// happy
// new
// year

for(let i=1; i<=Number(input[0]); i++){
    let word = input[i].split('');
    let letter = [];
    let isGroup = true;
    
   for(let j=0; j<word.length; j++){
        
    if(letter.indexOf(word[j]) === -1){
        letter.push(word[j])
    }
    else{
        if(letter.indexOf(word[j]) !== letter.length-1){
            isGroup=false;
            break;
        }
    }
     
   }

   if(isGroup) count+=1;

}
console.log(count);