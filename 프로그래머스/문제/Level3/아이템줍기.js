const dy = [1,-1,0,0], dx=[0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<101 && x<101);
const getMinDistance = (map,characterY,characterX,itemY,itemX) =>{
    let queue = [[characterY,characterX,0]];
    map[characterY][characterX] = 0
    while(queue.length){
        const [y,x,time] = queue.shift();
        if(y === itemY && x === itemX) return time/2;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || map[ny][nx] !==1) continue;
            queue.push([ny,nx,time+1]);
            map[ny][nx] = -1;
        }
    }
}
const makePath = (x1,y1,x2,y2,map) => {
    for(let y=y1; y<=y2; y++){
        for(let x=x1; x<=x2; x++){
            if((y===y1 || y === y2 || x===x1 || x=== x2) && map[y][x] !== -1) map[y][x] = 1;
            else map[y][x] = -1;
        }
    }
}
// const makePath = (x1,y1,x2,y2,map) => {
//     for(let y=y1; y<=y2; y++){
//         if(map[y][x1] !=='0') map[y][x1] = 1;
//         if(map[y][x2] !=='0') map[y][x2] = 1;
//     }
//     for(let x=x1; x<=x2; x++){
//         if(map[y1][x] !=='0') map[y1][x] = 1;
//         if(map[y2][x] !=='0') map[y2][x] = 1;
//     }
//     for(let y=y1+1; y<=y2-1; y++){
//         for(let x=x1+1; x<=x2-1; x++){
//             map[y][x] = '0'
//         }
//     }
// }
const solution = (rectangle,characterX,characterY,itemX,itemY) =>{
    let map = Array.from({length:101},()=>Array(101).fill(0));
    characterX*=2 , characterY*=2 , itemX*=2 , itemY*=2;
    for(let i=0; i<rectangle.length; i++){
        const [x1,y1,x2,y2] = rectangle[i];
        makePath(x1*2,y1*2,x2*2,y2*2,map);
    }
    // console.log(map.map(row => row.join(' ')).join('\n'))
    return getMinDistance(map,characterY,characterX,itemY,itemX)
}
const [r,cx,cy,ix,iy] = [[[1,1,7,4],[3,2,5,5],[4,3,6,9],[2,6,8,8]],1,3,7,8]; 
// const [r,cx,cy,ix,iy] = [[[1,1,8,4],[2,2,4,9],[3,6,9,8],[6,3,7,7]],9,7,6,1,1]
console.log(solution(r,cx,cy,ix,iy));