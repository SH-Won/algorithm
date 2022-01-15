// const input = ['4','500 500 500 500','1 4 3 -2','-2 1 4 3','3 -2 1 4','4 3 -2 1','1']
const input = ['5','500 500 500 500 501','1 4 3 -2 5','-2 1 4 3 5','3 -2 1 4 5','4 3 -2 1 5','5 4 3 -2 1','1']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const getDays = (guilty,R,eunjin) =>{
    let people = Array(guilty.length).fill(true);
    let peopleCount = guilty.length;
    let maxDays = 0;
    
    const mafiaGame = (peopleCount,days) =>{
        if(!people[eunjin] || (peopleCount===1 && people[eunjin])){
            maxDays = Math.max(days,maxDays);
            return;
        }
        if(peopleCount % 2 === 0){
           //밤
           for(let i=0; i<people.length; i++){
               if(i === eunjin || !people[i]) continue;
               
               people[i] = false;
               for(let j=0; j<guilty.length; j++){
                  if(people[j]) guilty[j] += R[i][j];
               }
               mafiaGame(peopleCount-1,days+1);
               for(let j=0; j<guilty.length; j++){
                   if(people[j]) guilty[j] -= R[i][j];
               }
               people[i] = true;
           }
        }
        else{
            let maxGuilty = 0 , number;
            for(let i=0; i<guilty.length; i++){
                if(people[i] && guilty[i] > maxGuilty) maxGuilty = guilty[i];
            }
            for(let i=0; i<guilty.length; i++){
                if(people[i] && guilty[i] === maxGuilty){
                    number = i;
                    break;
                }
            }
            people[number] = false;
            mafiaGame(peopleCount-1,days);
            people[number] = true;
        }
    }
    mafiaGame(peopleCount,0)
    return maxDays;
}
const solution = (input) =>{
    const N = +input[0];
    const guilty = input[1].split(' ').map(Number);
    const R = Array.from({length:N},(_,i)=>input[i+2].split(' ').map(Number));
    const eunjin = +input[N+2];

    const answer = getDays(guilty,R,eunjin);
    console.log(answer);
}
solution(input);