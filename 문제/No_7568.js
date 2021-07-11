const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dunchiArr = input.slice(1);
const rank = [];


for(let i=0; i<dunchiArr.length; i++){
    let count=0;
    let [x,y]=dunchiArr[i].split(' ').map(num => parseInt(num));

    for(let j=0; j<dunchiArr.length; j++){
        if(j===i) continue;
    
       let [x1,y1]=dunchiArr[j].split(' ').map(num => parseInt(num));

       if(x<x1 && y<y1) count+=1

    }
    rank.push(count+1);
}
console.log(rank.join(' '));
//https://www.acmicpc.net/problem/1018