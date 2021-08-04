const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = +input

// ***
// * *
// ***
let result ='';
for(let i=0; i<N; i++){
    for(let j=0; j<N; j++){
        star(i,j,N);
    }
    result +='\n';
}
console.log(result.trim());
function star(y,x,size){
    if(y % 3 === 1 && x % 3 ===1){
           result +=' '
    }
    else{
        if(size === 1){
            result +='*';
        }
        else{
            star(Math.floor(y/3),Math.floor(x/3),size/3);
        }
    }

}

