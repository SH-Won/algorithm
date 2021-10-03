//const dice =[1,2,3,4,1,2,3,4,1,2];
//const dice =[1,1,1,1,1,1,1,1,1,1];
//const dice = [5,1,2,3,4,5,5,3,2,4];
 const dice = [5,5,5,5,5,5,5,5,5,5];
//const fs = require('fs');
//const dice = fs.readFileSync('/dev/stdin').toString().split(' ').map(Number);

class Horse {
    constructor(pos,isFinish){
        this.pos = pos;
        this.isFinish = isFinish;
    }
}
const solution = () =>{
    let horseArr = Array(10);
    const nPos = [1,2,3,4,5,21,7,8,9,10,27,12,13,14,15,24,17,18,19,20,-1,22,23,29,25,26,29,28,29,30,31,20];
    const score =[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,13,16,19,28,27,26,22,24,25,30,35];

    let max = 0;
   
    const dfs = (count) =>{
        if(count >=10){
            let totalScore = 0;
            // horses = Array(4).fill(new Horse(0,false))를 하면 horses[0] 과 horses[1] 은 같은 주소에 있는 객체를 바라보고 있으므로 horses[0] === horses[1] 
            let horses = Array.from({length:4},()=>new Horse(0,false));
        loop:for(let i=0; i<10; i++){
             
                const number = horseArr[i];
                let horse = horses[number];
                if(horse.isFinish) continue;
                const move = dice[i];
                let horsePos = horse.pos;

                for(let j=0; j<move; j++){
                   if(nPos[horsePos] === -1){
                       horse.isFinish = true;
                       continue loop;
                   }
                   if(j>0 && j<=move-1 && horsePos === 5) horsePos = 6;
                   else if(j>0 && j<=move-1 && horsePos === 10) horsePos = 11;
                   else if(j>0 && j<=move-1 && horsePos === 15) horsePos = 16;
                   else{
                       horsePos = nPos[horsePos];
                   }
                }
                for(let k =0; k<4; k++){
                    if(k === number) continue;
                    if(horses[k].isFinish) continue;
                    if(horsePos === horses[k].pos) return;
                }
                horse.pos = horsePos;
                totalScore+=score[horsePos];
                
            }
            max = Math.max(max,totalScore);
            return

        }

        for(let i=0; i<4; i++){
            horseArr[count] = i;
            dfs(count+1);
        }
    }
    dfs(0);
    console.log(max);
}
solution();