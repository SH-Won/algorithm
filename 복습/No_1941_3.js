// const input = ['YYYYY','SYSYS','YYYYY','YSYYS','YYYYY'];
// const input = ['SSSSS','SSSSS','SSSSS','SSSSS','SSSSS']
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const isLinked = (start,linkMap) =>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const [y,x] = [start / 5 >>0 , start % 5];
    linkMap[y][x] = false;
    let count = 0;
    let queue = [[y,x]], idx=0;
    while(idx < queue.length){
        const [y,x] = queue[idx++];
        count++;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >= 5 || nx >= 5 || !linkMap[ny][nx] ) continue;
            queue.push([ny,nx]);
            linkMap[ny][nx] = false;
        }
    }
    queue.forEach(([y,x])=> linkMap[y][x] = true);
    return count === 7 ;
}
const getWayCount = (map) => {
    let linkMap = Array.from({length:5},()=>Array(5).fill(false));
    let ways = 0;
    const makeSeven = (index,count,Y,S) =>{
        if(count === 7 ){
           if(S > Y && isLinked(index-1,linkMap)) ways++;
           return;
        }
        for(let i=index; i<25; i++){
            const [y,x] = [i / 5 >>0 , i % 5];
            const [nY,nS] = map[y][x] ==='Y' ? [Y+1,S] : [Y,S+1];
            linkMap[y][x] = true;
            makeSeven(i+1,count+1,nY,nS);
            linkMap[y][x] = false;
        }
    }
    makeSeven(0,0,0,0);
    return ways;
}
const solution = (map) =>{
   const answer = getWayCount(map);
   console.log(answer);
}
solution(input);