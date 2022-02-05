const input = ['3','8']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const binarySearch = (N,k) =>{
    let left = 1;
    let right = N*N;
    let answer ;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        let count = 0;
        for(let i=1; i<=N; i++){
            count += Math.min(N, Math.floor(mid/i))
            if(count >= k) break;
        }
        if(count >= k) answer = mid , right = mid-1;
        else left = mid+1;
    }
    return answer;
}
const solution = input =>{
    const N = +input[0];
    const k = +input[1];
    console.log(binarySearch(N,k));
}
solution(input);
    // 1 2 3
    // 2 4 6
    // 3 6 9 