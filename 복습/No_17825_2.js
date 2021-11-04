//const dice =[1,2,3,4,1,2,3,4,1,2];
//const dice =[1,1,1,1,1,1,1,1,1,1];
//const dice = [5,1,2,3,4,5,5,3,2,4];
//const dice = [5,5,5,5,5,5,5,5,5,5];
const fs = require('fs');
const dice = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);
const nPos = [1,2,3,4,5,21,7,8,9,10,24,12,13,14,15,26,17,18,19,20,-1,22,23,29,25,29,27,28,29,30,31,20];
const score =[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,13,16,19,22,24,28,27,26,25,30,35]

class Horse{
    constructor(pos,isEnd){
        this.pos = pos;
        this.isEnd = isEnd;
    }
}
const yutPlay = (order) =>{
    let horses = Array.from({length:4},()=>new Horse(0,false))
    let sum = 0;
loop:for(let i=0; i<10; i++){
        const horseNumber = order[i];
        const move = dice[i];
        let horse = horses[horseNumber];
        if(horse.isEnd) continue;
        for(let m=0; m<move; m++){
            if(nPos[horse.pos] === -1){
                horse.isEnd = true;
                continue loop;
            }
            
            if( m>0 && m<=move-1 && horse.pos === 5) horse.pos = 6;
            else if( m>0 && m<=move-1 && horse.pos === 10) horse.pos = 11;
            else if( m>0 && m<=move-1 && horse.pos === 15) horse.pos = 16;
            else horse.pos = nPos[horse.pos];
        }
    
        for(let number=0; number<4; number++){
            if(horseNumber === number) continue;
            if(horses[number].isEnd) continue;
            if(horses[number].pos === horse.pos) return 0;
        }
        sum +=score[horse.pos];
    }
    return sum;
}

const solution = () =>{
    let order = Array(10);
    let gameScore = 0;
    const dfs = (count) =>{
        if(count === 10){
            const score = yutPlay(order);
            gameScore = Math.max(gameScore,score);
            return;
        }
        for(let i=0; i<4; i++){
            order[count] = i;
            dfs(count+1);
        }
    }
    dfs(0);
    console.log(gameScore);
}
console.time("1");
solution();
console.timeEnd("1");