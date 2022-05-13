const solution = maps =>{
    const [n,m] = [maps.length , maps[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<n && x<m);
    const count = Array.from({length:n},()=>Array(m).fill(Infinity));
    const queue = [[0,0]];
    count[0][0] = 1;
    while(queue.length){
        const [y,x] = queue.shift();
        if(y === n-1 && x === m-1) return count[n-1][m-1];
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || count[ny][nx] <= count[y][x] + 1 || maps[ny][nx] === 0 ) continue;
            count[ny][nx] = count[y][x] + 1;
            queue.push([ny,nx]);
        }
    }
    return -1;
}