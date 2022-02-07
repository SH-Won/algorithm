const input = ['5 3','5 4 3 2 1','1 3','2 4','5 5'];
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const arr = input[1].split(' ').map(Number);
    for(let i=1; i<arr.length; i++) arr[i] += arr[i-1];
    let answer = '';
    for(let idx=2; idx<2+M; idx++){
        const [i,j] = input[idx].split(' ').map(num => +num -1);
        answer += `${arr[j] - (i-1 < 0 ? 0 : arr[i-1])}\n`
    }
    console.log(answer.trim())
}
solution(input);
