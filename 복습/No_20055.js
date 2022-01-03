//const input = ['3 2','1 2 1 2 1 2'];
// const input = ['3 6','10 10 10 10 10 10'];
// const input = ['4 5','10 1 10 6 3 4 8 2']
const input = ['5 8','100 99 60 80 30 20 10 89 99 100']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getZeroCount = (A) =>{
    return A.reduce((acc,dura) => acc+= dura === 0 ? 1 : 0 ,0);
}
const moveRobot = (robots,A,N) =>{
    if(robots[N-1]) robots[N-1] = false;
    for(let i=N-2; i>=0; i--){
        if(!robots[i]) continue;
        if(!robots[i+1] && A[i+1]){
            robots[i+1] = true, robots[i] =false;
            A[i+1]--;
        }
    }
    if(robots[N-1]) robots[N-1] = false;
}
const solution = (input) =>{
    const [N,K] = input[0].split(' ').map(Number);
    let A = input[1].split(' ').map(Number);
    let robots = Array(N).fill(false);
    let stage = 0;
    while(getZeroCount(A) < K){
        stage++;
        robots.unshift(robots.pop());
        A.unshift(A.pop());
        moveRobot(robots,A,N);
        if(A[0]){
            A[0]--;
            robots[0] = true;
        }
    }
    console.log(stage);
}
solution(input);