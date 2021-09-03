//const student = ['YYYYY','SYSYS','YYYYY','YSYYS','YYYYY'];
//const student = ['SSSSY','YYYYY','YYYYY','YYYYY','YYYYY'];
const student = ['SSSSS','SSSSS','SSSSS','SSSSS','SSSSS'];
//const fs = require('fs');
//const student = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let visited = Array.from({length:student.length},()=>Array(student.length).fill(false));

let reputedSeven = 0;

const bfs = (y,x) =>{
    let checkVisited = Array.from({length:5},()=>Array(5).fill(false));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<student.length && x<student.length)
    let queue = [[y,x]];
    checkVisited[y][x] = true;
    let y_count = student[y][x] ==='Y'? 1 : 0;
    let visitedCount = 0;
    while(queue.length && y_count <=3){
        const [cy,cx] = queue.shift();
        visitedCount++;
        [[1,0],[-1,0],[0,1],[0,-1]]
        .forEach(([my,mx])=>{
            const [ny,nx] = [cy+my,cx+mx];
            if(!isValidPos(ny,nx) || !visited[ny][nx] || checkVisited[ny][nx]) return;
            
            checkVisited[ny][nx] = true;
            student[ny][nx] === 'Y' ? y_count++ : y_count;
            
            queue.push([ny,nx]);
        })

    }
    if(y_count >=4 || visitedCount !==7) return false;
    
    
     return true;

}
const dfs = (count,index) =>{

    if(count ===7 && bfs(Math.floor((index-1)/5) , (index-1)%5)){
        reputedSeven++;
        return;
    }


    for(let i=index; i<25; i++){
        visited[Math.floor(i/5)][i%5] = true;
        dfs(count+1,i+1);
        visited[Math.floor(i/5)][i%5] = false;

    }
}
dfs(0,0);

console.log(reputedSeven);