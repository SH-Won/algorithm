//const input = ['4','0 1 2 3','4 0 5 6','7 1 0 2','3 4 5 0'];
//const input = ['6','0 1 2 3 4 5','1 0 2 3 4 5','1 2 0 3 4 5','1 2 3 0 4 5','1 2 3 4 0 5','1 2 3 4 5 0']
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
const N = +input[0];
const table = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(num => +num));

solution();
function solution(){
    let ability = Array.from({length:N+1},()=>Array(N+1).fill(0));
    for(let i=1; i<N; i++){
        for(let j=i+1; j<=N; j++){
            ability[i][j] = table[i-1][j-1] + table[j-1][i-1];                    
        }
    }
    let visited = Array(N+1).fill(false);
    let min = Infinity;
    const getTeamAbility = (team) =>{
        let totalAbility = 0;
        for(let i=0; i<team.length-1; i++){
            const player1 = team[i];
            for(let j=i+1; j<team.length; j++){
                const player2 = team[j]; 
                totalAbility += ability[player1][player2]
            }
        }
        return totalAbility;
    }
    
    const dfs =(idx,count) =>{
        
        if(count === N/2){
            const team = visited.reduce(
              (acc, cur, index) => {
                if (index === 0) return acc;
                if (cur) acc[0].push(index);
                else acc[1].push(index);
                return acc;
              },
              Array.from({ length: 2 }, () => [])
            );

            const sum1 = getTeamAbility(team[0]);
            const sum2 = getTeamAbility(team[1]);
            min = Math.min(min,Math.abs(sum1-sum2));
            return;
        }

        for(let i=idx; i<=N; i++){
            if(count === 0 && i ===2) break;
            if(!visited[i]){
                visited[i] = true;
                dfs(i+1,count+1);
                visited[i] = false;
            }
        }

    }
    dfs(1,0);
    return console.log(min);
}