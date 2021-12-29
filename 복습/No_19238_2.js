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

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];

const drive = (taxi,customers,map,isValidPos,M) =>{
    const [sy,sx,startOil] = taxi;
    if(M === customers.length) return startOil;
    const n = map.length;
    let visited = Array.from({length:n},()=>Array(n).fill(false));
    visited[sy][sx] = true;
    let ridible = [] , isRide = false;
    let queue = [[sy,sx,startOil]];
    while(queue.length){
        const [y,x,oil] = queue.shift();
        if(oil < 0) return -1;
        if(oil >=0 && typeof map[y][x] === 'number'){
            ridible.push({y,x,number:map[y][x],remainOil:oil});
            isRide = true;
            continue;
        }
        if(isRide) continue;
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] ||map[ny][nx] ==='1') continue;
            queue.push([ny,nx,oil-1]);
            visited[ny][nx]= true;
        } 
    }
    
    if(!ridible.length) return -1;
    ridible.sort((a,b)=>{
        if(a.remainOil === b.remainOil){
           if(a.y === b.y) return a.x - b.x;
           return a.y - b.y;
        }
        return b.remainOil - a.remainOil;
    })
    const {y,x,number,remainOil} = ridible[0];
    const [ey,ex] = customers[number].end;
    map[y][x] = '0';
    visited.forEach(row => row.fill(false));
    visited[y][x] = true;
    queue = [[y,x,remainOil]];
    while(queue.length){
        const [y,x,oil] = queue.shift();
        if(oil < 0) return -1;
        if(oil >=0 && (y === ey && x === ex)){
            const nextOil = (oil) + (remainOil - oil)*2;
            taxi = [y,x,nextOil];
            return drive(taxi,customers,map,isValidPos,M+1);
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='1') continue;
            queue.push([ny,nx,oil-1]);
            visited[ny][nx] = true;
        }
    }
    return -1;
}
const solution = (input) =>{
    let [N,M,oil] = input[0].split(' ').map(Number);
    let map = Array.from({length:N},(_,i)=>input[i+1].split(' '));
    const taxi = input[N+1].split(' ').map(num => +num -1)
    taxi.push(oil);
    const customers = Array.from({length:M},(_,i) =>{
        const [y1,x1,y2,x2] = input[N+2+i].split(' ').map(num => +num -1);
        return {start:[y1,x1],end:[y2,x2]};
    })
    customers.forEach((c,number) =>{
        const [y,x] = c.start;
        map[y][x] = number;
    })
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
    const answer = drive(taxi,customers,map,isValidPos,0);
    console.log(answer);
}
solution(input);
