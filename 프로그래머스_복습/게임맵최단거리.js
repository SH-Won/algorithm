const getMinDistance = (maps) =>{
    const [n,m] = [maps.length , maps[0].length];
    const dy = [1,-1,0,0];
    const dx = [0,0,1,-1];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<n && x<m);
    let distance = Array.from({length:n},()=>Array(m).fill(0));
    distance[0][0] = 1;
    let queue = [[0,0]];
    while(queue.length){
        const [y,x] = queue.shift();
        if(y === n-1 && x=== m-1) return distance[y][x];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || distance[ny][nx] || maps[ny][nx] === 0) continue; 
            distance[ny][nx] = distance[y][x] + 1;
            queue.push([ny,nx]);
        }
    }
    return -1;
}
const solution = (maps) =>{
    return getMinDistance(maps);

}