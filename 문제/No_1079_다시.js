// const input = [
//     '4',
//     '500 500 500 500',
//     '1 4 3 -2',
//     '-2 1 4 3',
//     '3 -2 1 4',
//     '4 3 -2 1',
//     '1'
//     ]
// const input = [
// '5',
// '500 500 500 500 501',
// '1 4 3 -2 5',
// '-2 1 4 3 5',
// '3 -2 1 4 5',
// '4 3 -2 1 5',
// '5 4 3 -2 1',
// '1'
// ]
// const input = [
// '6',
// '500 500 500 500 500 500',
// '-3 -3 -3 -3 -3 -3',
// '2 2 2 2 2 2',
// '-4 -4 -4 -4 -4 -4',
// '6 6 6 6 6 6',
// '7 7 7 7 7 7',
// '-8 -8 -8 -8 -8 -8',
// '0'
// ]
// const input = [
// '4',
// '501 499 499 499',
// '1 2 3 4',
// '-26 -6 1 -7',
// '5 19 1 19',
// '-1 -20 -19 -13',
// '0'
// ]
const input = [
    '1',
    '800',
    '5',
    '0'
]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = input =>{
    const N = +input[0];
    const guilty = input[1].split(' ').map(Number);
    const R = Array.from({length:N},(_,i)=> input[i+2].split(' ').map(Number));
    const eunjin = +input[N+2];
    const alive = Array(N).fill(true);
    let answer = 0;
    const gameStart = (people,days) =>{
        if(!alive[eunjin] || people === 1){
            answer = Math.max(answer,days);
            return;
        }
        if(people % 2 === 0){ // night;
            for(let i=0; i<N; i++){
                if(i === eunjin || !alive[i]) continue;
                alive[i] = false;
                for(let j=0; j<N; j++){
                    if(j === i) continue;
                    guilty[j] += R[i][j];
                }
                gameStart(people-1,days+1);
                for(let j=0; j<N; j++){
                    if(j === i) continue;
                    guilty[j] -= R[i][j];
                }
                alive[i] = true;
            }

        }else{ // day
            let person = {guilty:-Infinity , number:null};
            for(let i=0; i<N; i++){
                if(!alive[i]) continue;
                if(guilty[i] > person.guilty){
                   person.guilty = guilty[i] , person.number = i;
                }
            }
            alive[person.number] = false;
            gameStart(people-1,days);
            alive[person.number] = true;
        }
    }
    gameStart(N,0);
    console.log(answer);
}
solution(input);