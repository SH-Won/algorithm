const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =['4','aba','abab','abcabc','a'];
const N = +input[0];
const groupWord = Array.from({length:N},(_,i)=>input[i+1]);
let count = 0;

for(let i=0; i<groupWord.length; i++){
    if(groupCheck(groupWord[i])){
        count++;
    }
}
console.log(count);

function groupCheck(string){
    let check = true;
    let count = 0;
    
    while(count < string.length){

       
        let index = count-1;
        let alphabet = string[count];
        let quantity=0;
        
        while(true){
           
            
            index = string.indexOf(alphabet,index+1);
            if(index === -1) break;
            count++;
            quantity++;
        }
        
        
        
        
        if(!string.includes(`${alphabet.repeat(quantity)}`)){
            
            check=false;
            
            break;
        }
       quantity =0;
        
    }
    return check;
   
}
