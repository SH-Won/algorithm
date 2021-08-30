//const building = [1, 5, 3, 2, 6, 3, 2, 6, 4, 2, 5, 7, 3, 1, 5];
//const building = [1 ,1000000000, 1000000000, 1 ,1000000000 ,1000000000 ,1]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')
const building = input[1].split(' ').map(num => +num);
let maxCount = 0;

for(let i=0; i<building.length; i++){
   
    let standard ;
    let count = 0;
    for(let j=i+1; j<building.length; j++){
         let tan = (building[j] - building[i]) / (j - i);
         if(j === i+1){
             standard = tan;
             count++;
         }
         
         if(tan > standard){
             count++;
             standard = tan;
         }
    }
    
    for(let k=i-1; k>=0; k--){
        let tan = (building[k] - building[i]) / (i-k)
        if(k === i-1){
            count++;
            standard = tan;
        }
        
        if(tan > standard){
            count++;
            standard =tan;
        }

    }
    maxCount =Math.max(maxCount,count);
}
console.log(maxCount);