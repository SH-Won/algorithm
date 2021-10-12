const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) =>(y>=0 && x>=0 && y<5 && x<5);

const isCovid = (y,x,place) =>{
    let visited = Array.from({length:5}, ()=>Array(5).fill(false));
    visited[y][x] = true;
    let queue = [[y,x]];
    let depth = 2;
    while(queue.length && depth--){
        let length = queue.length;
        while(length--){
            const [cy,cx] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [cy+dy[i],cx+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || place[ny][nx] ==='X') continue;
                visited[ny][nx] = true;
                queue.push([ny,nx]);
            }
        }
        let isExist = queue.some(([y,x])=> place[y][x] ==='P');
        if(isExist) return true;
    }
   return false;
}
const checkCovid = (check,place) =>{
    for(let y=0; y<5; y++){
        for(let x=0; x<5; x++){
            if(place[y][x] ==='P' && isCovid(y,x,place)){
                check.push(0);
                return check
            }
        }
    }
    check.push(1);
    return check
} 

const solution = (places) =>{
    return places.reduce(checkCovid,[]);
}
const places = [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];
console.log(solution(places));