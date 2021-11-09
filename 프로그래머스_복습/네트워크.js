const solution = (n,computers) =>{
    let visited = Array(n).fill(false);   
    
    const bfs = (computer) =>{
        visited[computer] = true;
        let queue = [computer];
        while(queue.length){
            const curCom = queue.shift();
            for(let nextCom=0; nextCom<computers[curCom].length; nextCom++){
                if(nextCom === curCom || !computers[curCom][nextCom] || visited[nextCom]) continue;
                visited[nextCom] = true;
                queue.push(nextCom);
            }
        }
    }
    let answer = 0;
    for(let computer=0; computer<n; computer++){
        if(!visited[computer]){
           bfs(computer);
           answer++;
        }
    }
    return answer;
}
const [n,computers] = [3,[[1, 1, 0], [1, 1, 1], [0, 1, 1]]]
console.log(solution(n,computers));