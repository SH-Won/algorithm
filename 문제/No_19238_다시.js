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

const fs =require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index = 0;
let [N,M,oil] =  input[index++].split(' ').map(Number);
let map = Array.from({length:N},()=>input[index++].split(' '));
// 0은 이동가능 1 은 벽 String
let taxiPos = input[index++].split(' ').map(num => +num -1);
let endPos = [];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<N);
let visited = Array.from({length:N},()=>Array(N).fill(false));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
for(let i=0; i<M; i++){
    const [sy,sx,ey,ex] = input[index++].split(' ').map(num => +num -1);
    map[sy][sx] = i;
    endPos.push({ey,ex});    
}
// console.log(map);
// console.log(endPos);

const findPerson = (taxi,oil) =>{
    const [ty,tx] = taxi;
    visited[ty][tx] = true;
    let personArr = [];
    let queue = [[ty,tx,oil]];
    let flag = false;
    while(queue.length){
        const [cy,cx,oil] = queue.shift();
        if(!flag && oil < 0) return [0,0,0,0,0];
        if( typeof map[cy][cx] === 'number'){
            flag = true;
            personArr.push({y:cy,x:cx,curOil:oil});
            continue;
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] === '1') continue;
            queue.push([ny,nx,oil-1]);
            visited[ny][nx] = true;
        }
    }
    if(personArr.length ===0 ) return [0,0,0,0,0];
    personArr.sort((a,b)=>{
        if(a.curOil === b.curOil){
            if(a.y === b.y) return a.x - b.x;
            return a.y-b.y
        }
        return b.curOil - a.curOil
    })
    
    const {y,x,curOil} = personArr[0];
    const person = map[y][x];
    const {ey,ex} = endPos[person];
    map[y][x] = '0';
    
    return [y,x,ey,ex,curOil];
}
const goDestination = (sy,sx,ey,ex,oil) => {
    visited[sy][sx] = true;
    let queue =[[sy,sx,oil]];
    while(queue.length){
        const [cy,cx,curOil] = queue.shift();
        if(curOil < 0) return [false,0];
        if(cy === ey && cx === ex){
            // console.log('return ',curOil + (oil - curOil) *2);
            return [true,curOil + (oil - curOil) *2];
        }
        for(let i=0; i<4; i++){
            const [ny,nx] = [cy+dy[i],cx+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] === '1') continue;
            queue.push([ny,nx,curOil-1]);
            visited[ny][nx] = true;
        }
    }
    return [false,0];
}
let i=0;
while(i < endPos.length){
    const [cy,cx,ey,ex,curOil] = findPerson(taxiPos,oil);
    if(!curOil) return console.log(-1);
    visited = visited.map(array=> array.fill(false));
    const [isArrive,restOil] = goDestination(cy,cx,ey,ex,curOil);
    if(!isArrive) return console.log(-1);
    visited = visited.map(array=> array.fill(false));
    taxiPos = [ey,ex], oil = restOil;
    i++;
}
console.log(oil);
