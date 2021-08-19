console.log(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]))
function solution(maps){
    let visited = Array.from({length:maps.length},(_,i)=>Array(maps[i].length).fill(0));

    const bfs = (start) =>{
        let queue = [start];
        const distance = [[1,0],[-1,0],[0,1],[0,-1]];
        const isValidPos = (y,x) => (y>=0 && x>=0 && y<maps.length && x<maps[0].length)
        visited[start[0]][start[1]] =1;

        while(queue.length){
            const [cy,cx] =queue.shift();
            distance.forEach(([y,x])=>{
                const [ny,nx] =[cy+y,cx+x]
                if(!isValidPos(ny,nx) || visited[ny][nx] || !maps[ny][nx])
                return
                queue.push([ny,nx])
                visited[ny][nx] = visited[cy][cx] + 1;
            })
        }

        return visited[maps.length-1][maps[0].length-1]

    }
    let answer = bfs([0,0]);

    return answer === 0 ? -1 : answer

}