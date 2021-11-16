// const input = [
// '6 3 15',
// '0 0 1 0 0 0',
// '0 0 1 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 1 0',
// '0 0 0 1 0 0',
// '6 5',
// '2 2 5 6',
// '5 4 1 6',
// '4 2 3 5',
// ]
// const input = [
// '6 3 13',
// '0 0 1 0 0 0',
// '0 0 1 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 1 0',
// '0 0 0 1 0 0',
// '6 5',
// '2 2 5 6',
// '5 4 1 6',
// '4 2 3 5',
// ]
// const input = [
// '6 3 100',
// '0 0 1 0 0 0',
// '0 0 1 0 0 0',
// '0 0 0 1 0 0',
// '0 0 0 1 0 0',
// '0 0 0 0 1 0',
// '0 0 0 1 0 0',
// '6 5',
// '2 2 5 6',
// '5 4 1 6',
// '4 2 3 5',
// ]
// const input = [
// '3 2 2',
// '0 0 0',
// '0 0 0',
// '0 0 0',
// '1 1',
// '1 1 3 1',
// '1 2 3 1',
// ] //ans -1
// const input = [
// '3 2 1',
// '0 0 0',
// '0 0 0',
// '0 0 0',
// '1 1',
// '1 1 2 1',
// '1 2 1 1',
// ] //ans -1
// const input = [
//     '3 1 100',
//     '0 1 0',
//     '0 1 0',
//     '0 1 0',
//     '1 1',
//     '1 3 3 3'
// ] //ans -1
// const input = [
//     '6 4 15',
//     '0 0 1 0 0 0',
//     '0 0 1 0 0 0',
//     '0 0 0 0 0 0',
//     '0 0 0 0 0 0',
//     '0 0 0 0 1 0',
//     '0 0 0 1 0 0',
//     '6 5',
//     '2 2 5 6',
//     '5 4 1 6',
//     '4 2 3 5',
//     '1 6 5 4'
// ] //ans 20
// const input = [
//     '5 5 4',
//     '0 0 0 0 0',
//     '0 0 0 0 0',
//     '0 0 0 0 0',
//     '0 0 0 0 0',
//     '0 0 0 0 0',
//     '3 3',
//     '2 2 4 2',
//     '4 2 4 4',
//     '4 4 2 4',
//     '2 4 2 2',
//     '2 5 3 3'
// ]
// const input = [
// '6 1 1',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '3 4',
// '3 4 2 5'
// ] //ans-1
// const input = [
// '6 1 2',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '3 4',
// '3 4 2 5'
// ] //ans 4
// const input = [
// '6 3 1',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '1 1',
// '1 1 1 2',
// '1 2 1 3',
// '1 3 1 6',
// ] //ans 6
// const input = [
// '6 3 1',
// '0 0 0 0 1 0',
// '0 0 0 0 1 1',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '0 0 0 0 0 0',
// '1 1',
// '1 1 1 2',
// '1 2 1 3',
// '1 3 1 6',
// ] //ans -1
// const input =[
// '6 5 19',
// '1 0 0 0 1 0',
// '1 0 1 0 1 0',
// '1 0 1 0 1 0',
// '1 0 1 0 1 0',
// '1 0 1 0 1 0',
// '0 0 1 0 0 0',
// '1 3',
// '6 1 1 6',
// '1 6 6 2',
// '5 2 2 4',
// '6 5 6 6',
// '4 6 1 2',
// ] //ans 59
// const input = [
//     '4 2 3',
//     '0 0 0 0',
//     '0 0 0 0',
//     '0 0 0 0',
//     '0 0 0 0',
//     '3 1',
//     '1 1 1 2',
//     '1 2 3 2'
// ] // ans 4

//const fs =require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,OIL] = input[0].split(' ').map(Number);
const map = Array.from({length:N},(_,i) => input[i+1].split(' '));
const taxi = input[N+1].split(' ').map(num => +num -1);
const passengerInfo = Array.from({length:M},(_,i)=>input[i+N+2].split(' ').map(num => +num -1));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x)=> (y>=0 && x>=0 && y<N && x<N);
const findAndDrive = (map,taxi,oil) =>{
    let visited = Array.from({length:N},()=>Array(N).fill(false));
    const [ty,tx] = taxi;
    visited[ty][tx] = true;
    // console.log(ty,tx,oil);
    let queue = [[...taxi,oil]];
    let idx = 0 , ridable = [] , isFind = false;
    // console.log(map);
    while(idx < queue.length){
         const [y,x,curOil] = queue[idx++];
         if(!isFind && curOil < 0) process.exit(console.log(-1))
         if(typeof map[y][x] ==='number'){
             isFind = true;
             ridable.push({y,x,curOil,number:map[y][x]});
             continue;
         }
         if(isFind) continue;
         for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='1') continue;
            visited[ny][nx] = true;
            queue.push([ny,nx,curOil-1]);
         }
    }
    // console.log(ridable);
    if(!ridable.length) process.exit(console.log(-1));
    ridable.sort((a,b)=>{
        if(b.curOil === a.curOil){
            if(a.y === b.y) return a.x - b.x
            return a.y - b.y
        } 
        return b.curOil - a.curOil
    })
    const {y,x,curOil,number} = ridable[0];
    map[y][x] = '0' , idx = 0 , queue=[], visited.forEach(row => row.fill(false));
    const [sy,sx,ey,ex] = passengerInfo[number-1];
    visited[y][x] = true;
    queue.push([y,x,curOil]);
    // console.log(map);
    while(idx < queue.length){
        const [y,x,remainOil] = queue[idx++];
        if(y === ey && x===ex){
            // console.log('return',remainOil + (curOil - remainOil)*2)
            return [[y,x], remainOil + (curOil - remainOil)*2]
        }
        if(remainOil < 0) process.exit(console.log(-1));
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='1') continue;
            visited[ny][nx] = true;
            queue.push([ny,nx,remainOil-1]);
        } 
    }
    process.exit(console.log(-1));
}
const solution = (map,taxi,oil,M) =>{
    for(let i=0; i<M; i++){
        const [sy,sx,ey,ex] = passengerInfo[i];
        map[sy][sx] = i+1;
    }

    let [taxiPos,remainOil] = [[...taxi],oil];
    
    while(M--){
        [taxiPos,remainOil] = findAndDrive(map,taxiPos,remainOil);
    }
    console.log(remainOil);
}
solution(map,taxi,OIL,M);