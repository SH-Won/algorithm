
// let arr = [
//     'but',
//     'i',
//     'wont',
//     'hesitate',
//     'no',
//     'more',
//     'no',
//     'more',
//     'it',
//     'cannot',
//     'wait',
//     'im',
//     'yours',
//     ]

const fs = require('fs');
let [N,...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

arr = arr.filter((v,i)=> arr.indexOf(v) === i).sort((a,b)=>{
    if(a.length === b.length) return a.localeCompare(b);
    return a.length -b.length
})
console.log(arr.join('\n'))