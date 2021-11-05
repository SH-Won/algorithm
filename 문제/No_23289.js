// const input =[
//     '7 8 1',
//     '0 0 0 0 0 0 0 0',
//     '0 0 0 0 4 0 0 0',
//     '0 0 0 0 0 0 0 0',
//     '0 0 5 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0',
//     '0 0 0 0 3 0 0 0',
//     '3',
//     '5 4 0',
//     '4 4 1',
//     '5 6 0'
// ]

// const input = [
// '7 8 1',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 4 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 5 5 0 0 0 0',
// '0 0 0 0 0 5 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 3 0 0 0',
// '3',
// '4 4 1',
// '5 4 0',
// '5 6 0',
// ]
// const input = [
// '7 8 5',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 4 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 5 5 0 0 0 0',
// '0 0 0 0 0 5 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 3 0 0 0',
// '3',
// '4 4 1',
// '5 4 0',
// '5 6 0',
// ]
// const input = [
// '7 8 7',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 4 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 5 5 0 0 0 0',
// '0 0 0 0 0 5 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 3 0 0 0',
// '3',
// '4 4 1',
// '5 4 0',
// '5 6 0',
// ]
const input = [
'7 8 70',
'0 0 0 0 0 0 0 0',
'0 0 0 0 4 0 0 0',
'0 0 0 0 0 0 0 0',
'0 0 5 5 0 0 0 0',
'0 0 0 0 0 5 0 0',
'0 0 0 0 0 0 0 0',
'0 0 0 0 3 0 0 0',
'3',
'4 4 1',
'5 4 0',
'5 6 0',
]
// const input = [
// '7 8 1000',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 4 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 5 5 0 0 0 0',
// '0 0 0 0 0 5 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 0 0 3 0 0 0',
// '3',
// '4 4 1',
// '5 4 0',
// '5 6 0'
// ]
// const input = [
// '7 8 100',
// '0 0 0 0 0 0 0 0',
// '5 0 0 0 4 0 0 0',
// '0 0 0 0 0 0 0 0',
// '0 0 5 5 0 0 0 0',
// '0 0 0 0 0 5 0 0',
// '5 0 0 0 0 0 5 0',
// '0 0 0 0 3 0 0 0',
// '0'
// ]
// const input = [
// '7 8 100',
// '0 0 0 0 0 0 5 0',
// '5 4 4 4 4 4 4 0',
// '0 0 0 0 0 0 0 0',
// '0 0 5 5 0 0 0 0',
// '0 0 0 0 0 5 0 0',
// '5 0 0 0 0 0 5 0',
// '0 0 0 0 3 0 0 0',
// '3',
// '4 4 1',
// '5 4 0',
// '5 6 0',
// ]
// const input = [
// '7 8 1000',
// '0 0 0 0 0 0 5 0',
// '5 4 4 4 4 4 4 0',
// '0 0 0 0 0 0 0 0',
// '0 0 5 5 0 0 0 0',
// '0 0 0 0 0 5 0 0',
// '5 0 0 0 0 0 5 0',
// '0 0 0 0 3 0 0 0',
// '3',
// '4 4 1',
// '5 4 0',
// '5 6 0',
// ]
// const input = [
// '7 8 1000',
// '0 0 0 0 0 0 0 0',
// '4 4 4 4 4 4 4 4',
// '0 0 0 0 0 5 0 0',
// '0 0 5 5 0 0 5 0',
// '0 0 0 0 0 5 0 0',
// '5 0 0 0 0 0 5 0',
// '3 3 3 3 3 3 3 3',
// '3',
// '4 4 1',
// '5 4 0',
// '5 6 0',
// ]
// const input =[
//     '7 8 1',
//     '0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0',
//     '1 0 0 0 0 0 0 0',
//     '0 0 5 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0',
//     '1',
//     '3 4 1',
    
// ]
//const fs =require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [R,C,K] = input[0].split(' ').map(Number);
const map = Array.from({length:R},(_,i)=>input[i+1].split(' ').map(Number));
const W = +input[R+1];
const wallInfo = Array.from({length:W},(_,i)=>input[i+R+2].split(' ').map(Number));
const hy = [[-1,1],[-1,1],[0,0],[0,0]];
const hx = [[0,0],[0,0],[-1,1],[-1,1]];
const dy = [0,0,-1,1];
const dx = [1,-1,0,0];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C);
const blowWind =(y,x,dir,map,wall) =>{
     [y,x] = [y+dy[dir],x+dx[dir]];
     let visited = new Set();
     let k=5;
     visited.add(`${y},${x}`);
     let queue = [[y,x,k]];
     let startIndex =0 , endIndex;
     let flag = false;
     while(startIndex !==queue.length){
         endIndex = queue.length;
         for(let i=startIndex; i<endIndex; i++){
             const [cy,cx,k] = queue[i];
             if(k ===1){
                flag = true;
                break;
             }
             const [ny,nx] = [cy+dy[dir],cx+dx[dir]];
             const [cuy,cux] = [cy+dy[dir]+hy[dir][0],cx+dx[dir]+hx[dir][0]];
             const [cdy,cdx] = [cy+dy[dir]+hy[dir][1],cx+dx[dir]+hx[dir][1]];
             if(isValidPos(ny,nx) && !visited.has(`${ny},${nx}`) && !wall.has(`${cy},${cx},${ny},${nx}`)){
                 visited.add(`${ny},${nx}`);
                 queue.push([ny,nx,k-1]);
             }
             if(isValidPos(cuy,cux) && !visited.has(`${cuy},${cux}`)){
                 const [py,px] = [cy+hy[dir][0],cx+hx[dir][0]];
                 if(!wall.has(`${cy},${cx},${py},${px}`) && !wall.has(`${py},${px},${cuy},${cux}`)){
                     visited.add(`${cuy},${cux}`);
                     queue.push([cuy,cux,k-1]);
                 }
             }
             if(isValidPos(cdy,cdx) && !visited.has(`${cdy},${cdx}`)){
                 const [py,px] =[cy+hy[dir][1],cx+hx[dir][1]];
                 if(!wall.has(`${cy},${cx},${py},${px}`) && !wall.has(`${py},${px},${cdy},${cdx}`)){
                     visited.add(`${cdy},${cdx}`);
                     queue.push([cdy,cdx,k-1]);
                 }
             }
         }
         startIndex = endIndex;
         if(flag) break;
     }
   
    queue.forEach(([y,x,k]) => map[y][x]+=k);
    // console.log(map.map(row => row.join(' ')).join('\n'));
    // console.log('-------')
}
const controlTemper = (map,wall) =>{
    let newMap = Array.from({length:R},()=>Array(C).fill(0));
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(!map[y][x]) continue;
            let disCount = 0;
            const temper = map[y][x];
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx) || temper <= map[ny][nx] || wall.has(`${y},${x},${ny},${nx}`)) continue;
                const nextTemper = map[ny][nx];
                disCount+=Math.floor((temper - nextTemper) / 4)
                newMap[ny][nx]+=Math.floor((temper - nextTemper) / 4);
            }
            newMap[y][x]+=(temper - disCount);
        }
    }
    
    return newMap;
}
const decreaseEdgeTemper = (map) =>{
    for(let x=0; x<C-1; x++){
        if(map[0][x]) map[0][x]--;
    }
    for(let y=0; y<R-1; y++){
        if(map[y][C-1]) map[y][C-1]--;
    }
    for(let x=C-1; x>0; x--){
        if(map[R-1][x]) map[R-1][x]--;
    }
    for(let y=R-1; y>0; y--){
        if(map[y][0]) map[y][0]--;
    }
}
// 1 오른 2 왼쪽 3 위 4 아래
// t = 0  y 를 기준으로  t=1 x를 기준으로
const solution = (map) =>{
    let wall = new Set();
    let heater =[];
    let check = [];
    for(let i=0; i<W; i++){
        const [y,x,t] = wallInfo[i];
        if(t ===0){
            wall.add(`${y-1},${x-1},${y-2},${x-1}`)
            wall.add(`${y-2},${x-1},${y-1},${x-1}`);
        }
        else{
            wall.add(`${y-1},${x-1},${y-1},${x}`);
            wall.add(`${y-1},${x},${y-1},${x-1}`)
        }
    }
    
    for(let y=0; y<R; y++){
        for(let x=0; x<C; x++){
            if(map[y][x] && map[y][x] <=4){
                heater.push([y,x,map[y][x]-1]);
                map[y][x] = 0;
            }
            else if(map[y][x] ===5){
                check.push([y,x]);
                map[y][x] = 0;
            }
        }
    }

    let chocolate = 0;
    while(true){
        for(let i=0; i<heater.length; i++){
            const [y,x,dir] = heater[i];
            blowWind(y,x,dir,map,wall);
        }
        // console.log(map.map(row => row.join(' ')).join('\n'));
        // console.log('------')
        map = controlTemper(map,wall);
        // console.log(map.map(row => row.join(' ')).join('\n'));
        decreaseEdgeTemper(map);
        // console.log('---------------');
        // console.log(map.map(row => row.join(' ')).join('\n'))
        chocolate++;
        if(chocolate > 100) return console.log(101);
        if(check.every(([y,x]) => map[y][x] >= K)){
            console.log(map.map(row => row.join(' ')).join('\n'))
            return console.log(chocolate);
        } 
    }
    
}
solution(map);


