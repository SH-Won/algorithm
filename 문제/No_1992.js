const fs = require('fs');
const [N,...quadMatrix] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const quadMatrix = [
//     '11110000',
// '11110000',
// '00011100',
// '00011100',
// '11110000',
// '11110000',
// '11110011',
// '11110011',

// ]


const quad = (matrix) =>{
    const n = matrix.length;
    const sum = matrix.reduce((acc,cur)=> acc+=cur.split('').map(num=>+num).reduce((acc,cur)=>acc+=cur,0),0);

    if(sum ===0 || sum ===n*n){
        return sum===0 ? '0' : '1'
    }

    const splitIndex =  n / 2;
    const arr1 = matrix.slice(0,splitIndex).map(row => row.slice(0,splitIndex));
    const arr2 = matrix.slice(0,splitIndex).map(row => row.slice(splitIndex));
    const arr3 = matrix.slice(splitIndex).map(row => row.slice(0,splitIndex));
    const arr4 = matrix.slice(splitIndex).map(row => row.slice(splitIndex))

    return '('+quad(arr1)+quad(arr2)+quad(arr3)+quad(arr4)+')'
}

function solution(quadMatrix){
    let answer = quad(quadMatrix);
    return answer;
}
console.log(solution(quadMatrix));