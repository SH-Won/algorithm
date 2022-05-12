const isCovid = (y,x,place) =>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const visited = Array.from({length:5},()=>Array(5).fill(false));
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<5 && x<5);
    visited[y][x] = true;
    const queue = [[y,x]];
    let count = 2;
    while(count-- && queue.length){
        let length = queue.length; 
        while(length--){
            const [y,x] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || place[ny][nx] === 'X' || visited[ny][nx]) continue;
                if(place[ny][nx] ==='P') return true;
                visited[ny][nx] = true;
                queue.push([ny,nx]);
            }
        }
    }
    return false;
}
const getAnswer = (answer,place) =>{
    for(let y=0; y<5; y++){
        for(let x=0; x<5; x++){
            if(place[y][x] === 'P' && isCovid(y,x,place)){
                answer.push(0);
                return answer;
            }
        }
    }
    answer.push(1);
    return answer;
}
const solution = places =>{
    return places.reduce(getAnswer,[]);
}
console.log(solution([["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]))