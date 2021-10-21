//const input = ['2','4 0 0 0 0 0 0 0 0','4 0 0 0 0 0 0 0 0'];
//const input = ['2','4 0 0 0 1 1 1 0 0','0 0 0 0 0 0 0 0 0'];
//const input = ['2','0 4 4 4 4 4 4 4 4 4','0 4 4 4 4 4 4 4 4 4'];
//const input = ['2','4 3 2 1 0 4 3 2 1','1 2 3 4 1 2 3 4 0'];
//const input = ['9','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0','4 4 4 4 4 4 4 4 0'];
const input = [
'9',
'1 2 4 3 0 2 1 0 3',
'1 2 1 2 0 0 0 0 1',
'3 4 2 3 1 2 3 4 0',
'0 1 2 3 4 2 1 0 0',
'0 0 0 0 0 0 1 4 4',
'0 4 0 4 0 4 0 4 0',
'0 4 2 2 2 2 2 2 2',
'1 1 1 1 1 1 1 1 0',
'0 2 0 3 0 1 0 2 0'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const innings = +input[0];
const players = Array.from({length:innings},(_,i)=>input[i+1].split(' ').map(Number));

const solution = () =>{
    let entry = Array(9);
    let assigned = Array(9).fill(false);
    let maxScore = 0;

    const game = () =>{
        let totalScore = 0;
        let inning = 0;
        let index = 0;
        let base = Array(4).fill(false);
        while(inning < innings){
            base.fill(false);
            let outCount = 3;
            while(outCount){
                const number = entry[index % 9];
                const score = players[inning][number];
                if( score === 0)outCount--;
                else{
                  for (let i = 3; i > 0; i--) {
                    if (base[i]) {
                      i + score >= 4 ? totalScore++ : (base[i + score] = true);
                      base[i] = false;
                    }
                  }
                  score === 4 ? totalScore++ : (base[score] = true);
                }
               index++;
            }
            inning++;
        }
        return totalScore;
    }

    const makeEntry = (count) =>{
        if(count === 9){
           maxScore = Math.max(maxScore,game());
           return;
        }
        // if(count ===3){
        //     entry[count] = 0;
        //     return makeEntry(count+1);
        // }
        for(let i=0; i<=8; i++){
            if(count !== 3 && i===0) continue;
            if(!assigned[i]){
                assigned[i] = true;
                entry[count] = i
                makeEntry(count+1);
                assigned[i] = false;
            }
        }
    }

    makeEntry(0);
    console.log(maxScore);
}
solution();