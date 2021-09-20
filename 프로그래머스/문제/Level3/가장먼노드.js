const [n,vertex] =[6,[[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]];
console.log(solution(n,vertex));
function solution(n, edge) {
    let visited = Array(n+1).fill(false);
    let node = Array.from({length:n+1},()=>[]);
    for(let i=0; i<edge.length; i++){
        const [from,to] = edge[i];
        node[from].push(to);
        node[to].push(from)
    }

    const bfs = (start) =>{
        visited[start] = true;
        let queue = [[start,0]];
        let count = 0;
        let dist = 0;
        let isEnd ;
        while(queue.length){
            const [cNode,distance] = queue.shift();
            isEnd = true;
            for(let i=0; i<node[cNode].length; i++){
                const nextNode = node[cNode][i];
                if(visited[nextNode]) continue;
                isEnd = false;
                visited[nextNode] = true;
                queue.push([nextNode,distance+1]);
            }
             if(isEnd){
                 if(distance > dist){
                     dist = distance;
                     count = 1;
                 }
                 else if(distance === dist){
                     count++;
                 }   
             }

        }
        return count;
    }
    return bfs(1)  
}