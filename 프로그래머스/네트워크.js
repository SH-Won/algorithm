// const computer =[
//     [1,1,0],
//     [1,1,0],
//     [0,0,1]
// ]
const computers =[
    [1,1,0],
    [1,1,1],
    [0,1,1]
]
// i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j] =1
console.log(solution(3,computers))

function solution(n,computers){
    let visited = Array(n).fill(false);
    let answer = 0;

    for(let i=0; i<visited.length; i++){
        if(!visited[i]){
            bfs(i);
            answer++;
        }
    }
    

    function bfs(visitNumber){
        let queue =[visitNumber];
        visited[visitNumber]= true;

        while(queue.length){
            const cur = queue.shift();

            for(let i=0; i<computers[cur].length; i++){
                if(i !== cur && !visited[i] && computers[cur][i] === 1){
                    visited[i] =true;
                    queue.push(i);
                    
                }
            }

        }
    }
    return answer;
}