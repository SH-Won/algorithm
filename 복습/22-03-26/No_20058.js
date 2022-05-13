// const input = [
// '3 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1'
// ]
// const input = [
// '3 2',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2'
// ]
// const input = [
// '3 5',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 0 3 2'
// ]
// const input = [
// '3 10',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 0 3 2 1 2 3 2 3'
// ]
// const input = [
// '3 10',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 4 5 6 7 8',
// '8 7 6 5 4 3 2 1',
// '1 2 3 1 2 3 1 2 3 1',
// ]
// const input = [
//     '3 10',
//     '1 0 3 4 5 6 7 0',
//     '8 0 6 5 4 3 2 1',
//     '1 2 0 4 5 6 7 0',
//     '8 7 6 5 4 3 2 1',
//     '1 2 3 4 0 6 7 0',
//     '8 7 0 5 4 3 2 1',
//     '1 2 3 4 5 6 7 0',
//     '0 7 0 5 4 3 2 1',
//     '1 2 3 1 2 3 1 2 3 1'
//     ]
const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
const fireStorm = (L,map) =>{
    const length = Math.pow(2,L);
    let smallMap = Array.from({length},()=> Array(length));
    const rotate = (startY,startX) =>{
        for(let y=startY; y<startY+length; y++){
            for(let x=startX; x<startX+length; x++){
                smallMap[x-startX][length+startY-y-1] = map[y][x];
            }
        }
    }
    const insert = (startY,startX) =>{
        for(let y=0; y<length; y++){
            for(let x=0; x<length; x++){
                map[y+startY][x+startX] = smallMap[y][x];
            }
        }
    }

    for(let y=0; y<map.length; y+=length){
        for(let x=0; x<map.length; x+=length){
            rotate(y,x);
            insert(y,x);
        }
    }
}
const melt = (map) =>{
    let meltPos = [];
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map.length; x++){
            const ice = map[y][x];
            if(!ice) continue;
            let count = 0;
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || nx < 0 || ny >= map.length || nx >= map.length || !map[ny][nx] ) continue;
                count++;
            }
            if(count < 3) meltPos.push([y,x]);
        }
    }
    meltPos.forEach(([y,x]) => map[y][x]-- );
}
const getGroupIce = (map) =>{
    const length = map.length;
    const visited = Array.from({length},()=>Array(length).fill(false));
    let max = 0;
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map.length; x++){
            const ice = map[y][x];
            if(!ice || visited[y][x]) continue;
            visited[y][x] = true;
            let queue = [[y,x]] , count = 0;
            while(queue.length){
                const [y,x] = queue.shift();
                count++;
                for(let i=0; i<4; i++){
                    const [ny,nx] = [y+dy[i],x+dx[i]];
                    if(ny < 0 || nx < 0 || ny >=map.length || nx >=map.length || !map[ny][nx] || visited[ny][nx]) continue;
                    visited[ny][nx] = true;
                    queue.push([ny,nx]);
                }
            }
            max = Math.max(max,count);
        }
    }
    return max;
}
const solution = input =>{
    const [N,Q] = input[0].split(' ').map(Number);
    const length = Math.pow(2,N);
    const map = Array.from({length},(_,i) => input[i+1].split(' ').map(Number));
    const stage = input[length+1].split(' ').map(Number);
    while(stage.length){
        const L = stage.shift();
        fireStorm(L,map);
        melt(map);
    }
    const sumIce = map.reduce((acc,row) => acc+=row.reduce((acc,ice) => acc+=ice,0),0);
    const groupIce = getGroupIce(map);
    console.log(sumIce +'\n' + groupIce);
}
solution(input);