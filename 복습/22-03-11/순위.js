const solution = (n,results) =>{
    const graph = Array.from({length:n+1},()=>Array(n+1).fill(false));
    results.forEach(([player1,player2])=>{
        graph[player1][player2] = 1;
        graph[player2][player1] = -1;
        graph[player1][player1] = 0;
        graph[player2][player2] = 0;
    })
    for(let i=1; i<=n; i++){
        for(let j=1; j<=n; j++){
            for(let k=1; k<=n; k++){
                if(graph[j][i] === 1 && graph[i][k] === 1) graph[j][k] = 1;
                else if(graph[j][i] === -1 && graph[i][k] === -1) graph[j][k] = -1; 
            }
        }
    }
    let answer = 0;
    for(let i=0; i<graph.length; i++){
        const isNotValid = graph[i].slice(1).some(el => el === false);
        if(isNotValid) continue;
        answer++;
    }
    return answer;
}