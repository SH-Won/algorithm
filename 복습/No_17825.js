//const dice =[1,2,3,4,1,2,3,4,1,2];
//const dice =[1,1,1,1,1,1,1,1,1,1];
//const dice = [5,1,2,3,4,5,5,3,2,4];
//const dice = [5,5,5,5,5,5,5,5,5,5];
const fs = require('fs');
const dice = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number);
class Horse{
    constructor(pos,isFinish){
        this.pos = pos;
        this.isFinish = false;
    }
}
const solution = () =>{
    let horseArr = Array(10);
    const nPos = [1,2,3,4,5,21,7,8,9,10,24,12,13,14,15,26,17,18,19,20,-1,22,23,29,25,29,27,28,29,30,31,20];
    const score =[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,13,16,19,22,24,28,27,26,25,30,35] // score[20] = 40
    let maxScore = 0;
    const yutPaly = () => {
        let horses = Array.from({length:4},()=>new Horse(0,false));
        let totalScore = 0;
       loop:for(let i=0; i<horseArr.length; i++){
            const number = horseArr[i];
            let horse = horses[number];
            if(horse.isFinish) continue;
            let horsePos = horse.pos;
            const move = dice[i];
            for(let m=0; m<move; m++){
                if(nPos[horsePos] === -1){
                    horse.isFinish = true;
                    continue loop;
                }
                if(m >0 && m<=move-1 && horsePos === 5) horsePos = 6;
                else if(m >0 && m<=move-1 && horsePos === 10) horsePos = 11;
                else if(m >0 && m<=move-1 && horsePos === 15) horsePos = 16;
                else horsePos = nPos[horsePos];
            }
            for(let horseNumber =0; horseNumber<4; horseNumber++){
                if(horseNumber === number) continue;
                if(horses[horseNumber].isFinish) continue;
                if(horses[horseNumber].pos === horsePos) return 0;
            }
            horse.pos = horsePos;
            totalScore +=score[horsePos];
        }
        return totalScore;
    }

    const horseOrder = (count) =>{
        if(count === 10){
           const score = yutPaly();
           return maxScore = Math.max(score,maxScore);
        }
        for(let i=0; i<4; i++){
           horseArr[count] = i;
           horseOrder(count+1);
        }
    }
    horseOrder(0);
    console.log(maxScore);
}
solution();