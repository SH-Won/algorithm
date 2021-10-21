const input = ['4','500 500 500 500','1 4 3 -2','-2 1 4 3','3 -2 1 4','4 3 -2 1','1']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = () =>{
    let index = 0;
    const N = +input[index++];
    let guilty = input[index++].split(' ').map(Number);
    const R = Array.from({length:N},()=>input[index++].split(' ').map(Number));
    const eunjin = +input[index];
    let isDead = Array(N).fill(false);
    let maxNight = 0;
    const dfs = (night,people) =>{

        if(people === 1 || isDead[eunjin]){
             maxNight = Math.max(maxNight,night);
             return;
        }
        if(people % 2 === 0){
            for(let i=0; i<N; i++){
                if(i===eunjin || isDead[i]) continue;
                isDead[i] = true;
                for(let j=0; j<guilty.length; j++){
                    if(!isDead[j])
                    guilty[j]+=R[i][j];
                }
                dfs(night+1,people-1);
                
                for(let j=0; j<guilty.length; j++){
                    if(!isDead[j])
                    guilty[j]-=R[i][j];
                }
                isDead[i] = false;
            }
        }
        else {
            let maxGuilty = -Infinity;
            let kill ;
            for(let i=0; i<guilty.length; i++){
                if(guilty[i] > maxGuilty && !isDead[i]){
                    maxGuilty = guilty[i];
                    kill = i;
                }
            }
            if(kill === eunjin){
                maxNight = Math.max(maxNight,night);
            }
            isDead[kill] = true;
            dfs(night,people-1);
            isDead[kill] = false;
        }
    }
    dfs(0,N);
    console.log(maxNight);
}
solution();