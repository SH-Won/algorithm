// const input = ['4 7','20 15 10 17']
const input = ['5 20','4 42 40 26 46']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const binarySearch = (M,tree) =>{
    let left = 0;
    let right = 10e8;
    let height = 0;
    while(left <= right){
        const mid = Math.floor((left+right) / 2);
        let meters = 0;
        for(let i=0; i<tree.length; i++){
            if(tree[i] <= mid) continue;
            meters += tree[i] - mid;
            if(meters >= M) break;
        }
        if(meters >= M) left = mid+1 , height = mid;
        else right = mid -1;
    }
    return height;
}
const solution = input =>{
    const [N,M] = input[0].split(' ').map(Number);
    const tree = input[1].split(' ').map(Number);
    
    console.log(binarySearch(M,tree))
}
solution(input);
