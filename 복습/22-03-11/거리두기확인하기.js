const isCovid = (y,x,place) =>{
    const visited = Array.from({length:5},()=>Array(5).fill(false));
    visited[y][x] = true;
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<5 && x<5);
    let queue = [[y,x]], idx = 0;
    let depth = 2;
    while(depth--){
        let len = queue.length - idx;
        while(len--){
            const [y,x] = queue[idx++];
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || visited[ny][nx] || place[ny][nx] ==='X') continue;
                queue.push([ny,nx]);
                visited[ny][nx] = true;
            }
        }
        const isPerson = queue.slice(idx).some(([y,x]) => place[y][x] ==='P');
        if(isPerson) return true;
    }
    return false;
}
const checkCovid = (answer,place) =>{
    for(let y=0; y<5; y++){
        for(let x=0; x<5; x++){
            if(place[y][x] ==='P' && isCovid(y,x,place)){
                answer.push(0);
                return answer;
            }
        }
    }
    answer.push(1);
    return answer;
}
const solution = places =>{
    return places.reduce(checkCovid,[]);
}