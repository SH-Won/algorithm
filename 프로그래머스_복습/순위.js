//floyd warshall
const solution = (n,results) =>{
    const gameResult = Array.from({length:n+1},()=> Array(n+1).fill(false));
    results.forEach(([player1,player2]) =>{
        gameResult[player1][player2] = 1;
        gameResult[player2][player1] = -1;
        gameResult[player1][player1] = 0;
        gameResult[player2][player2] = 0;
    })
    for(let mid = 1; mid<=n ; mid++){
        for(let player1 = 1; player1<=n; player1++){
            for(let player2 = 1; player2<=n; player2++){
                 if(gameResult[player1][mid] === 1 && gameResult[mid][player2] === 1)
                 gameResult[player1][player2] = 1;
                 else if(gameResult[player1][mid] === -1 && gameResult[mid][player2] === -1)
                 gameResult[player1][player2] = -1;
            }
        }
    }
    let answer = 0;
    loop:for(let i=1; i<=n; i++){
        for(let j=1; j<=n; j++){
             if(gameResult[i][j] === false) continue loop;
        }
        answer++;
    }
    return answer;
}