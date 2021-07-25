const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input =[
//     '8 16',
//     '32 4',
//     '17 5',
//     '0 0'
// ]
const arr = Array.from({length:input.length},(_,i)=> input[i].split(' ').map(num => +num));

let i =0; 
let string ='';
while(true){

    if(arr[i][0] ===0 && arr[i][1]===0) break;
    
    else if(arr[i][0] % arr[i][1] === 0 ) string+='multiple\n'

    else if(arr[i][1] % arr[i][0] ===0) string+='factor\n'

    else
        string += 'neither\n';
    
    i++
    

}
console.log(string.trim());