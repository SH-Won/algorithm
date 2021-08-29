const [str1,str2] = ['adaabc','aababbc'];
// const fs = require('fs');
// const [str1,str2] = fs.readFileSync('/dev/stdin').toString().trim().split(' ');
let minCount =Infinity;

for(let i=0; i<=str2.length - str1.length; i++){
    const compareString = str2.slice(i,i+str1.length);
    let count = 0;
    for(let j=0; j<compareString.length; j++){
        if(str1[j] !== compareString[j]){
            count++;
        }
    }
    minCount = Math.min(minCount,count);
}
console.log(minCount);

