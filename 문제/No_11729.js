const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const N = +input;
let count = 0;
let moveLog = []
let result ='';
hanoi(N,'1','2','3');
result+=`${count}\n`

for(let i=0; i<moveLog.length; i++){
    result += `${moveLog[i].join(' ')}\n`;
}
console.log(result.trim());

function hanoi(N,first,second,third){
    if(N <= 0) return;

    else{
        console.log(count);
        hanoi(N-1,first,third,second);
        count++;
        moveLog.push([first,third]);
        hanoi(N-1,second,first,third);
    }
}