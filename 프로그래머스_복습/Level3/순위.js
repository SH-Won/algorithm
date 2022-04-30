const solution = (n,results) => {
    const graph = results.reduce((acc,cur) =>{
      const [player1,player2] = cur;
      acc[player1][player2] = 1;
      acc[player2][player1] = -1;
      acc[player1][player1] = 0;
      acc[player2][player2] = 0;
      return acc;
    },Array.from({length:n+1},()=>Array(n+1).fill(false)));

    for(let i=1; i<=n; i++){
        for(let j=1; j<=n; j++){
            for(let k=1; k<=n; k++){
                if(graph[j][i] === 1 && graph[i][k] === 1) graph[j][k] = 1;
                else if(graph[j][i] === -1 && graph[i][k] === -1) graph[j][k] = -1;
            }
        }
    }
    let answer = 0;
    for(let i=1; i<=n; i++){
        if(graph[i].slice(1).some(el => el === false)) continue;
        answer++;
    }
    return answer;
}
console.log(solution(5,[[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]]))