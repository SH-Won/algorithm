const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const input = [
//     '7',
//     '2 3 1 2 3 4',
//     '5 2 4 6 1 7 5',
// ]
// 10 + 12 + 7 = 29;
const N = +input[0];
const distance = input[1].split(' ').map(num => +num);
const oilPrice = input[2].split(' ').map(num => +num);
let start =0;
let sum =0;
for(let i=0; i<oilPrice.length; i++){
    if(i < start) continue;
      
    for(let j=i+1; j<oilPrice.length; j++ ){
        if(oilPrice[i] >= oilPrice[j] || j===oilPrice.length-1){
            start = j;
            let distanceArr = distance.slice(i,j);
            let distanceSum = distanceArr.reduce((acc,cur)=> acc+=cur);
            // console.log(distanceArr);
            // console.log(distanceSum);
            sum+= distanceSum * oilPrice[i]; 
            break;
            
        }
    }
}
console.log(sum);
//  4 3 2 1
// 5 6 2 3 2
