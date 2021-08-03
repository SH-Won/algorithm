// const fs = require('fs');
// const input = +fs.readFileSync('/dev/stdin').toString().trim();


const input = 27;




//***
//* *
//***
let result ='';
for(let i=0; i<input; i++){
    for(let j=0; j<input; j++){
          star(i,j,input)
    }
    result +='\n';
}
console.log(result.trim());
function star(y,x,number){
   if(y % 3 ===1 && x%3 ===1){
       result +=' '
   }
   else{
       if(number===1){
           result +='*';
       }
       else{
           star(Math.floor(y /3 ),Math.floor(x/3),number/3)
       }
   }
}