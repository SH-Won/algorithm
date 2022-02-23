// const input = ['2 3','1 1 1','0 3 0','0 0 3'];
const input = ['4 2','2 3 2','0 6 1']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    const [M,N] = input[0].split(' ').map(Number);
    let larva = Array(2*M).fill(0);
    let bee = Array.from({length:M},()=>Array(M).fill(1));
    for(let i=1; i<1+N; i++){
        const [zero,one,two] = input[i].split(' ').map(Number);
        larva[zero]++;
        larva[zero+one]++;
    }
    let i = 0 , sum = 0;
    for(let y=M-1; y>=0; y--){
        sum += larva[i++];
        bee[y][0]+=sum;
    }
    for(let x=1; x<M; x++){
        sum += larva[i++];
        bee[0][x]+=sum;
    }
    for(let y=1; y<M; y++){
        for(let x=1; x<M; x++){
            bee[y][x] = bee[0][x];
        }
    }
    let answer = '';
    bee.forEach(row => answer+=`${row.join(' ')}\n`);
    console.log(answer.trim());
}
solution(input);