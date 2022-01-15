const input = ['7 4','11 6 11 6 3 10 6','7 9 6 13 5 15 5','1 10 12 7 13 7 5','13 11 10 8 10 12 13']
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const findSameGroup = (y,x,castle,group,roomNumber) =>{
    const [N,M] = [castle.length, castle[0].length];
    const [dy,dx] = [[0,-1,0,1],[-1,0,1,0]];
    group[y][x] = roomNumber;
    let roomSize = 0;
    let queue = [[y,x]];
    while(queue.length){
        const [y,x] = queue.shift();
        roomSize++;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(ny < 0 || nx < 0 || ny >=N || nx >= M || group[ny][nx] === roomNumber) continue;
            if(castle[y][x] & Math.pow(2,i)) continue;
            queue.push([ny,nx]);
            group[ny][nx] = roomNumber;
        }
    }
    return roomSize;
}
const getMaxRoomCount =(group,roomSizeArr) =>{
    const [N,M] = [group.length, group[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    let max = 0;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            const roomNumber = group[y][x];
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(ny < 0 || nx < 0 || ny >= N || nx >= M ) continue;
                const nextRoomNumber = group[ny][nx];
                if(roomNumber === nextRoomNumber) continue;
                if(roomSizeArr[roomNumber] + roomSizeArr[nextRoomNumber] > max) max = roomSizeArr[roomNumber] + roomSizeArr[nextRoomNumber];
            }
        }
    }
    return max;
}
const solution = (input) =>{
    const [M,N] = input[0].split(' ').map(Number);
    const castle = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let group = Array.from({length:N},()=>Array(M).fill(-1));
    let roomNumber = -1 , roomSizeArr = [];
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(group[y][x] === -1){
                roomNumber++;
                const roomSize = findSameGroup(y,x,castle,group,roomNumber);
                roomSizeArr.push(roomSize);
            }
        }
    }
    const removeWallRoomSize = getMaxRoomCount(group,roomSizeArr);
    console.log(`${roomSizeArr.length}\n${Math.max(...roomSizeArr)}\n${removeWallRoomSize}`);
}
solution(input);