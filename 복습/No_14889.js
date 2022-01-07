// const input = ['4','0 1 2 3','4 0 5 6','7 1 0 2','3 4 5 0'];
// const input = ['6','0 1 2 3 4 5','1 0 2 3 4 5','1 2 0 3 4 5','1 2 3 0 4 5','1 2 3 4 0 5','1 2 3 4 5 0']
// const input =[
//     '8',
// '0 5 4 5 4 5 4 5',
// '4 0 5 1 2 3 4 5',
// '9 8 0 1 2 3 1 2',
// '9 9 9 0 9 9 9 9',
// '1 1 1 1 0 1 1 1',
// '8 7 6 5 4 0 3 2',
// '9 1 9 1 9 1 0 9',
// '6 5 4 3 2 1 9 0',
// ]

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const getTeamAblility = (team,ability) =>{
    let sum = 0;
    for(let i=0; i<team.length-1; i++){
        const player1 = team[i];
        for(let j=i+1; j<team.length; j++){
            const player2 = team[j];
            sum += (ability[player1][player2] + ability[player2][player1]);
        }
    }
    return sum;
}
const getMinAbility = (N,ability) =>{
    let min = Infinity;
    let startTeam = Array(N/2);
    
    const makeTeam = (count,index) =>{
        if(count === N/2){
            const linkTeam = Array(N).fill().map((v,i)=> i).filter(teamMate => !startTeam.includes(teamMate));
            const [startAbility,linkAbility] = [getTeamAblility(startTeam,ability),getTeamAblility(linkTeam,ability)];
            min = Math.min(min , Math.abs(startAbility - linkAbility));
            return;
        }
        for(let i=index; i<N; i++){
            if(count === 0 && i === 1) break;
            startTeam[count] = i;
            makeTeam(count+1,i+1);
        }
    }
    makeTeam(0,0);
    return min;
}
const solution = (input) =>{
    const N = +input[0];
    const ability = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(Number));
    const answer = getMinAbility(N,ability);
    console.log(answer);
}
solution(input);