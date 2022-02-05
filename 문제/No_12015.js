// const input = ['6','10 20 10 30 20 50'];
const input = ['7','10 20 30 1 2 3 4']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const binarySearch = (num,result) =>{
    let left = 0;
    let right = result.length -1;
    while(left < right){
        const mid = Math.floor((left+right) / 2);
        if(num > result[mid]) left = mid +1;
        else if(num < result[mid]) right = mid;
        else return mid;
    }
    return right;
}
const solution = input =>{
    input[1] = input[1].split(' ').map(Number);
    const result = [+input[1][0]];
    for(let i=1; i<input[1].length; i++){
        if(result[result.length-1] < +input[1][i]){
            result.push(+input[1][i]);
            continue;
        }
        const idx = binarySearch(+input[1][i],result);
        result[idx] = +input[1][i];
    }
    console.log(result.length);
}
solution(input);
