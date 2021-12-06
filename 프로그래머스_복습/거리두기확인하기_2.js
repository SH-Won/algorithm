const dy =[1,-1,0,0];
const dx =[0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<5 && x<5);
const isCovid = (place,y,x) =>{
    let visited = Array.from({length:5},()=>Array(5).fill(false));
    visited[y][x] = true;
    let queue = [[y,x]];
    let depth = 2;
    while(queue.length && depth--){
        let length = queue.length;
        while(length--){
            const [y,x] = queue.shift();
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] ||place[ny][nx] ==='X') continue;
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            }
        }
        const isPerson = queue.some(([y,x])=> place[y][x] ==='P');
        if(isPerson) return isPerson;
    }
    return false;
}
const checkCovid = (acc,place) =>{
    for(let y=0; y<5; y++){
        for(let x=0; x<5; x++){
            if(place[y][x] ==='P' && isCovid(place,y,x)){
                acc.push(0);
                return acc;
            }
        }
    }
    acc.push(1);
    return acc;
}
const solution = (places) =>{    
    return places.reduce(checkCovid,[])
}
console.log(solution([["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]));
