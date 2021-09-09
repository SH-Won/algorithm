//const classroom = ['YYYYY','SYSYS','YYYYY','YSYYS','YYYYY']
//const classroom = ['SSSSY','YYYYY','YYYYY','YYYYY','YYYYY'];
//const classroom = ['SSSSS','SSSSS','SSSSS','SSSSS','SSSSS'];
const fs = require('fs');
const classroom = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = (classroom) =>{
    let reputedSeven = 0;
    let cVisited = Array.from({length:5},()=>Array(5).fill(false));
    let pVisited = Array.from({length:5},()=>Array(5).fill(false));
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<5 && x<5);
    const isPossible = (y,x) =>{
        let queue=[[y,x]];
        pVisited[y][x] =true;
        let yCount = classroom[y][x] ==='Y' ? 1 : 0;
        let allCount = 0;
        while(queue.length && yCount <=3){
            const [cy,cx] = queue.shift();
            allCount++;

            for(let i=0; i<distance.length; i++){
                const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
                if(!isValidPos(ny,nx) || !cVisited[ny][nx] || pVisited[ny][nx]) continue;
                pVisited[ny][nx] = true;
                queue.push([ny,nx]);
                classroom[ny][nx] === 'Y' ? yCount++ : yCount
            }
            
        }
        pVisited = pVisited.map(array => array.fill(false));
        if(allCount !== 7 || yCount >=4 ) return false;

       return true;
    }
    const combination =(count,idx) =>{
        if(count === 7){
            const [y,x] = [Math.floor((idx-1)/5) , (idx-1) % 5]
             if(isPossible(y,x)){
                 reputedSeven++;
             }
             return;
        }
        for(let i=idx; i<25; i++){
            const [ny,nx] = [Math.floor(i/5),i%5];
            cVisited[ny][nx] = true;
            combination(count+1,i+1);
            cVisited[ny][nx] = false;
        }

    }
    combination(0,0);
    return console.log(reputedSeven);
}
solution(classroom);
