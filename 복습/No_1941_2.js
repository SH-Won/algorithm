//const classroom = ['YYYYY','SYSYS','YYYYY','YSYYS','YYYYY']
//const classroom = ['SSSSY','YYYYY','YYYYY','YYYYY','YYYYY'];
const classroom = ['SSSSS','SSSSS','SSSSS','SSSSS','SSSSS'];
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
//const classroom = Array.from({length:5},(_,i)=>input[i].split(''));

const solution = () =>{
    let reputedSeven = 0;
    let cVisited = Array.from({length:5},()=>Array(5).fill(false));
    let pVisited = Array.from({length:5},()=>Array(5).fill(false));
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    const isValidPos =(y,x) =>(y>=0 && x>=0 && y<5 && x<5);
    const isPossible = (y,x) =>{
        pVisited[y][x] = true;
        let queue = [[y,x]];
        let count = 0;
        let yCount = 0;
        while(queue.length){
            const [cy,cx] = queue.shift();
            classroom[cy][cx] ==='Y' ? yCount++ : yCount;
            count++;
            for(let i=0; i<distance.length; i++){
                const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
                if(!isValidPos(ny,nx) || !cVisited[ny][nx] || pVisited[ny][nx]) continue;
                pVisited[ny][nx] = true;
                queue.push([ny,nx]);
            }
        }
        pVisited = pVisited.map(array => array.fill(false));
        
        if(count !== 7 || yCount >=4) return false;
        return true;
    }
    const combination = (index,count) =>{
        if(count === 7){
            const [y,x] = [Math.floor((index-1)/5),(index-1) % 5];
            if(isPossible(y,x)) reputedSeven++;
            return;
        }

       for(let i=index; i<25; i++){
           const [y,x] = [Math.floor(i/5),i % 5];
           if(cVisited[y][x]) continue;
           cVisited[y][x] = true;
           combination(i+1,count+1);
           cVisited[y][x] = false;
       }
    }
    combination(0,0);
    return console.log(reputedSeven);
}
solution();