// const input = ['4 4','3 0 1 4']
// const input = ['4 8','3 1 2 3 4 1 1 2']
// const input = ['3 5','0 0 0 2 0']
// const input = ['5 5','1 0 3 2 4']; // 2
// const input = ['4 8','3 2 1 2 1 0 3 2'] // 9
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    const [H,W] = input[0].split(' ').map(Number);
    const height = input[1].split(' ').map(Number);
    let water = 0;
    for(let h=H; h>=1; h--){
        let first = null , second = null;
        for(let w=0; w<W; w++){
            if(first===null && height[w] >= h) first = w;
            else if(first!== null && height[w] >= h) second = w;
            
            if(first!== null && second !==null){
               water += (second - first - 1)
               first= second , second = null;
            }
        }
    }
    console.log(water);
}
solution(input);