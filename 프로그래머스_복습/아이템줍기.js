const getMinDistance = (cy,cx,iy,ix,map) =>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=1 && x>=1 && y<=100 && x<=100);
    let dist = Array.from({length:101},()=>Array(101).fill(-1));
    dist[cy][cx] = 0;
    let queue = [[cy,cx]];
    while(queue.length){
        const [y,x] = queue.shift();
        if(y === iy && x=== ix) return dist[y][x] / 2;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || map[ny][nx] !==1 || dist[ny][nx] !==-1) continue;
            dist[ny][nx] = dist[y][x] + 1;
            queue.push([ny,nx]);
        }
    }

}
const makePath = (x1,y1,x2,y2,map) =>{
    for(let y=y1; y<=y2; y++){
        for(let x=x1; x<=x2; x++){
            if((y===y1 || y===y2 || x=== x1 || x===x2) && map[y][x] !== -1) map[y][x] = 1;
            else map[y][x] = -1;
        }
    }

}
const solution = (rectangle,characterX,characterY,itemX,itemY) =>{
    let map = Array.from({length:101},()=>Array(101).fill(0));
    rectangle.forEach(([x1,y1,x2,y2]) => makePath(x1*2,y1*2,x2*2,y2*2,map));
    
    return getMinDistance(characterY*2,characterX*2,itemY*2,itemX*2,map);
}
const [r,cx,cy,ix,iy] = [[[1,1,7,4],[3,2,5,5],[4,3,6,9],[2,6,8,8]],1,3,7,8]; 
// const [r,cx,cy,ix,iy] = [[[1,1,8,4],[2,2,4,9],[3,6,9,8],[6,3,7,7]],9,7,6,1,1]
console.log(solution(r,cx,cy,ix,iy));