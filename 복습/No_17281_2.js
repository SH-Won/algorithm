// const input = ['2','4 0 0 0 0 0 0 0 0','4 0 0 0 0 0 0 0 0'];
// const input = ['2','4 0 0 0 1 1 1 0 0','0 0 0 0 0 0 0 0 0'];
// const input = ['2','0 4 4 4 4 4 4 4 4 4','0 4 4 4 4 4 4 4 4 4'];
// const input = ['2','4 3 2 1 0 4 3 2 1','1 2 3 4 1 2 3 4 0'];
// const input = ['9','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0'];
// const input = [
//     '9',
//     '1 2 4 3 0 2 1 0 3',
//     '1 2 1 2 0 0 0 0 1',
//     '3 4 2 3 1 2 3 4 0',
//     '0 1 2 3 4 2 1 0 0',
//     '0 0 0 0 0 0 1 4 4',
//     '0 4 0 4 0 4 0 4 0',
//     '0 4 2 2 2 2 2 2 2',
//     '1 1 1 1 1 1 1 1 0',
//     '0 2 0 3 0 1 0 2 0'
//     ]
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getScore = (innings,result,entry) =>{
    let totalScore = 0;
    let base = Array(4).fill(false);
    let inning = -1,nth = -1;
    while(++inning < innings){
        let outCount = 0;
        base.fill(false);
        while(outCount < 3){
            nth = nth+1 > 8 ? 0 : nth+1;
            const player = entry[nth];
            const score = result[inning][player];
            if(!score){
                outCount++;
                continue;
            }
            for(let i=3; i>0; i--){
                const runner = base[i];
                if(runner){
                    i + score >= 4 ? totalScore++ : base[i+score] = true;
                    base[i] =false;
                }
            }
            score === 4 ? totalScore++ : base[score] = true;
        }
    }
    return totalScore;
}
const getMaxScore = (innings,result) =>{
    let entry = Array(9);
    let selected = Array(9).fill(false);
    let maxScore = 0;
    const makeEntry = (count) =>{
        if(count === 3){
            entry[count] = 0;
            return makeEntry(count+1);
        }
        if(count === 9){
           const score = getScore(innings,result,entry);
           maxScore = Math.max(maxScore,score);
           return;
        }
        for(let i=1; i<9; i++){
            if(!selected[i]){
               selected[i] = true;
               entry[count] = i;
               makeEntry(count+1);
               selected[i] = false;
            }
        }

    }
    makeEntry(0);
    return maxScore;
}
const solution = (input) =>{
    const innings = +input[0];
    const result = Array.from({length:innings},(_,i)=>input[i+1].split(' ').map(Number));
    const answer = getMaxScore(innings,result);
    console.log(answer);
}
solution(input);