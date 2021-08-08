const maps =[[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]
console.log(solution(maps));
function solution(maps){

    let visited = Array.from({length:maps.length},(_,i)=>Array(maps[i].length).fill(0));
    let answer = bfs([0,0]);
    
    function bfs(start){
        let queue = [start];
        const distance = [[1,0],[-1,0],[0,1],[0,-1]];
        visited[start[0]][start[1]] = 1;
        
        while(queue.length){
            
             const [curY,curX] = queue.shift();

             distance.forEach(([y,x])=>{
                 const [nextY,nextX] = [curY+y,curX+x];

                 if(nextY <0 || nextX <0 || nextY >=maps.length || nextX >= maps[0].length)
                 return

                 if(!visited[nextY][nextX] && maps[nextY][nextX]){
                     queue.push([nextY,nextX])
                     visited[nextY][nextX] = visited[curY][curX] +1;
                     
                 }
             })

            
            
        }
        return visited[maps.length-1][maps[0].length-1] ===0 ?
               -1 :
               visited[maps.length-1][maps[0].length-1]
    }
    return answer
}