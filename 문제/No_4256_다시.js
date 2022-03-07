const input = ['2','4','3 2 1 4','2 3 4 1','8','3 6 5 4 8 7 1 2','5 6 8 4 3 1 2 7']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    let idx = 0
    let T = +input[idx++];
    let answer = '';
    while(T--){
        const n = +input[idx++];
        const preOrder = input[idx++].split(' ');
        const inOrder = input[idx++].split(' ');
        const postOrder = (start,end,root) =>{
            for(let i=start; i<end; i++){
                if(preOrder[root] === inOrder[i]){
                     postOrder(start,i,root+1);
                     postOrder(i+1,end,root+i-start+1);
                     answer+=`${preOrder[root]} `;
                }
            }
        }
        postOrder(0,n,0);
        answer+='\n';
    }
    console.log(answer.trim());
}
solution(input);