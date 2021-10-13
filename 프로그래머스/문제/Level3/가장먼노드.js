const [n,vertex] =[6,[[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]];
//console.log(solution(n,vertex));

const bfs = (start,edge,n)=>{
    let visited = Array(n+1).fill(false);
    visited[start] = true;
    let queue = [[start,0]];
    let maxDist = 0;
    let count ;
    let isEnd ;
    while(queue.length){
        isEnd = true;
        const [cNode,dist] = queue.shift();
        for(let i=0; i<edge[cNode].length; i++){
            const nextNode = edge[cNode][i];
            if(visited[nextNode]) continue;
            isEnd = false;
            visited[nextNode] = true;
            queue.push([nextNode,dist+1]);
        }
        if(isEnd){
            if(dist > maxDist){
               count = 1;
               maxDist = dist;
            }
            else if(maxDist === dist){
                count++;
            }
        }
    }
    return count;
}
const solution = (n,vertex) =>{
    
    let edge = vertex.reduce((acc,cur)=>{
      const [from,to] = [cur[0],cur[1]];
      acc[from].push(to);
      acc[to].push(from);
      return acc;
    },Array.from({length:n+1},()=>[]))
    
    return bfs(1,edge,n);
}
console.log(solution(n,vertex));