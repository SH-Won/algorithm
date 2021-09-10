//const input = ['2 20 50','50 30','20 40'];
// const input =['2 40 50','50 30','20 40'];
// const input =['2 20 50','50 30','30 40'];
// const input =['3 5 10','10 15 20','20 30 25','40 22 10'];
// const input = ['4 10 50','10 100 20 90','80 100 60 70','70 20 30 40','50 20 100 10'];
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,L,R] = input[0].split(' ').map(num => +num);
const country = Array.from({length:N}, (_,i) =>input[i+1].split(' ').map(num => +num));

const solution = (country) =>{
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    let count =0;
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<N);
    let isMove = false;
    const bfs =(y,x) =>{
        let queue = [[y,x]];
        visited[y][x] = true;
        let startIndex = 0;
        let endIndex;
        
        while(startIndex !==queue.length){
            endIndex = queue.length;
            for(let i=startIndex; i<endIndex; i++){
                const [cy,cx] = queue[i];

                for(let i=0; i<distance.length; i++){
                    const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
                    if(!isValidPos(ny,nx) || visited[ny][nx]) continue;
                    const diff = Math.abs(country[cy][cx] - country[ny][nx])
                    if(diff < L || diff > R) continue;
                    visited[ny][nx] = true;
                    queue.push([ny,nx]);
                }
            }
            startIndex = endIndex;
        }
        if(queue.length ===1) return 

        const unionCountry = queue.length;
        const unionNumber = queue.reduce((acc,cur)=>acc+=country[cur[0]][cur[1]],0);
        isMove = true;
        for(let i=0; i<queue.length; i++){
            const [y,x] = queue[i];
            country[y][x] = Math.floor(unionNumber / unionCountry);
        }

    }
    
    while (true) {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (!visited[i][j]) {
            bfs(i, j);
          }
        }
      }
      if (!isMove) return count;
      visited = visited.map((array) => array.fill(false));
      isMove = false;
      count++;
    }
}
console.log(solution(country));