//const input = ['3 2','1 2 1 2 1 2'];
//const input = ['3 6','10 10 10 10 10 10'];
//const input = ['4 5','10 1 10 6 3 4 8 2']
//const input = ['5 8','100 99 60 80 30 20 10 89 99 100']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [N,K]  = input[0].split(' ').map(Number);
let durability = input[1].split(' ').map(Number);

const robotMove = (robots) =>{
    for(let i=N-2; i>=0; i--){
        if(!robots[i]) continue;
        if(!robots[i+1] && durability[i+1]){
            durability[i+1]--;
            robots[i] = false;
            robots[i+1] = true;
        }
    }
}
const getZeroCount = () =>{
    return durability.reduce((acc,cur)=> !cur ? acc+=1 : acc ,0)
}
const solution = () =>{
    let robots = Array(N).fill(false);
    let time = 0;
    
    while(getZeroCount() < K){
        time++;
        durability.unshift(durability.pop());
        robots.unshift(robots.pop());
        if(robots[N-1]) robots[N-1] = false;
        robotMove(robots);
        if(robots[N-1]) robots[N-1] = false;
        if(durability[0]){
            durability[0]--;
            robots[0] = true;
        }
    }
    return console.log(time);
}
solution();