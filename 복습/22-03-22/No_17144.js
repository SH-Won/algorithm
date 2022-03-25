// const input =['7 8 1','0 0 0 0 0 0 0 9','0 0 0 0 3 0 0 8','-1 0 5 0 0 0 22 0','-1 8 0 0 0 0 0 0','0 0 0 0 0 10 43 0','0 0 5 0 15 0 0 0','0 0 40 0 0 0 20 0',]
// const input =[
//     '7 8 2',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0',
// ]
// const input =[
//     '7 8 3',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0'
// ]
// const input =[
//    '7 8 4',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0',
// ]
// const input =[
//     '7 8 5',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0',
// ]
// const input =[
//     '7 8 20',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0'
// ]
// const input =[
//     '7 8 30',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0'
// ]
// const input =[
//     '7 8 50',
// '0 0 0 0 0 0 0 9',
// '0 0 0 0 3 0 0 8',
// '-1 0 5 0 0 0 22 0',
// '-1 8 0 0 0 0 0 0',
// '0 0 0 0 0 10 43 0',
// '0 0 5 0 15 0 0 0',
// '0 0 40 0 0 0 20 0'
// ]
// const fs =require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const spread = (map,robot) =>{
    const newMap = Array.from({length:map.length},()=>Array(map[0].length).fill(0));
    const {y1,y2} = robot;
    newMap[y1][0] = newMap[y2][0] = -1;
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map[0].length; x++){
            if(map[y][x] > 0){
               const amount = Math.floor(map[y][x] / 5);
               if(amount === 0){
                   newMap[y][x] += map[y][x];
                   continue;
               }
               let totalSpread = 0;
               for(let i=0; i<4; i++){
                   const [ny,nx] = [y+dy[i],x+dx[i]];
                   if(ny < 0 || nx < 0 || ny >= map.length || nx >= map[0].length || map[ny][nx] === -1) continue;
                   totalSpread += amount;
                   newMap[ny][nx] += amount;
               }
               newMap[y][x] += (map[y][x] - totalSpread); 
            }
        }
    }
    return newMap;
}
const clean = (map,robot) =>{
    const {y1,y2} = robot;
    const [R,C] = [map.length, map[0].length];
    for(let y=y1-1; y>0; y--) map[y][0] = map[y-1][0];
    for(let x=0; x<C-1; x++) map[0][x] = map[0][x+1];
    for(let y=0; y<y1; y++) map[y][C-1] = map[y+1][C-1];
    for(let x=C-1; x>0; x--) map[y1][x] = map[y1][x-1];
    map[y1][1] = 0;
    for(let y=y2+1; y<R-1; y++) map[y][0] = map[y+1][0];
    for(let x=0; x<C-1; x++) map[R-1][x] = map[R-1][x+1];
    for(let y=R-1; y>y2; y--) map[y][C-1] = map[y-1][C-1];
    for(let x=C-1; x>0; x--) map[y2][x] = map[y2][x-1];
    map[y2][1] = 0;
}
const solution = input =>{
    let [R,C,T] = input[0].split(' ').map(Number);
    let map = Array.from({length:R},(_,i) => input[i+1].split(' ').map(Number));
    let robot;
    for(let y=0; y<R; y++){
        if(map[y][0] === -1){
            robot = {y1:y, y2:y+1};
            break;
        }
    }
    while(T--){
        map = spread(map,robot);
        clean(map,robot);
    }
    const dust = map.flat().reduce((acc,cur) => acc+=cur,0) + 2;
    console.log(dust);
}
solution(input);