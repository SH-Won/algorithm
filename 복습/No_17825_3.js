// const input = '1 2 3 4 1 2 3 4 1 2';
// const input = '1 1 1 1 1 1 1 1 1 1';
// const input = '5 1 2 3 4 5 5 3 2 4'
// const input = '5 5 5 5 5 5 5 5 5 5'
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

function Horse(pos,isEnd){
    this.pos = pos;
    this.isEnd = isEnd;
}
const moveHorse = (order,dice) =>{
    const nPos = [1,2,3,4,5,21,7,8,9,10,24,12,13,14,15,26,17,18,19,20,-1,22,23,29,25,29,27,28,29,30,31,20];
    const score = [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,13,16,19,22,24,28,29,26,25,30,35]
    const horses = Array.from({length:4},()=> new Horse(0,false));
    let totalScore = 0;
loop:for(let i=0; i<dice.length; i++){
        const move = dice[i];
        const horseNumber = order[i];
        const horse = horses[horseNumber];
        if(horse.isEnd) continue;
        for(let m=0; m<move; m++){
            if(nPos[horse.pos] === -1){
               horse.isEnd = true;
               continue loop;
            }
            if( m!==0 && m <=move-1 && horse.pos === 5) horse.pos = 6;
            else if( m!==0 && m <=move-1 && horse.pos === 10) horse.pos = 11;
            else if( m!==0 && m <=move-1 && horse.pos === 15) horse.pos = 16;
            else horse.pos = nPos[horse.pos];
        }
        for(let number=0; number<4; number++){
            if(horseNumber === number) continue;
            if(horses[number].isEnd) continue;
            if(horses[number].pos === horse.pos) return 0;
        }
        totalScore +=score[horse.pos];
    }
    return totalScore;
}
const getMaxScore = (dice) =>{
    let order = Array(10);
    let maxScore = 0;
    const makeOrder = (count) =>{
        if(count === 10){
             const score = moveHorse(order,dice);
             maxScore = Math.max(maxScore,score);
             return;
        }
        for(let i=0; i<4; i++){
            order[count] = i;
            makeOrder(count+1);
        }
    }
    makeOrder(0);
    return maxScore;
}
const solution = (input) =>{
    const dice = input.split(' ').map(Number);
    const answer = getMaxScore(dice);
    console.log(answer);
}
solution(input);