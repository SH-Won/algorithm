// const input = ['6 7','1','5','3','3','5','1']
// const input = ['14 5','1','3','4','2','2','4','3','4','3','3','3','2','3','3']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (input) =>{
    const [N,H] = input[0].split(' ').map(Number);
    let top = Array(H+1).fill(0);
    let bot = Array(H+1).fill(0);
    for(let i=1; i<input.length; i++){
        if(i % 2 === 1) bot[+input[i]]++;
        else top[+input[i]]++;
    }
    for(let i=1; i<=H; i++){
        top[i]+=top[i-1];
        bot[i]+=bot[i-1];
    }
    let count = 0;
    let min = Infinity;
    for(let h=1; h<=H; h++){
        let obs = 0;
        obs += (top[H] - top[h-1]);
        obs += (bot[H] - bot[H-h]);
        if(obs < min){
            min = obs;
            count = 1;
        }
        else if(obs === min) count++;
    }
    console.log(`${min} ${count}`);
}
solution(input);