// const input = ['4 4 1','1 1 2 3','5 2 4 2','3 1 3 5','2 1 3 2','2 0 1'];
//const input = ['4 4 2','1 1 2 3','5 2 4 2','3 1 3 5','2 1 3 2','2 0 1','3 1 3'];
// const input = ['4 4 3','1 1 2 3','5 2 4 2','3 1 3 5','2 1 3 2','2 0 1','3 1 3','2 0 2'];
//const input = ['4 4 4','1 1 2 3','5 2 4 2','3 1 3 5','2 1 3 2','2 0 1','3 1 3','2 0 2','3 1 1'];
//const input = ['4 6 3','1 2 3 4 5 6','2 3 4 5 6 7','3 4 5 6 7 8','4 5 6 7 8 9','2 1 4','3 0 1','2 1 2']
// const input = [
// '5 5 3',
// '5 1 2 3 5',
// '5 2 2 4 5',
// '5 6 2 5 5',
// '5 5 2 5 2',
// '2 2 1 2 3',
// '3 0 2',
// '4 1 6',
// '2 0 2',
// ] //ans 19
// const input = [
// '6 5 2',
// '1 2 3 2 1',
// '4 5 4 2 3',
// '6 8 2 1 2',
// '7 6 2 8 8',
// '3 2 4 2 8',
// '5 8 2 1 1',
// '2 0 2',
// '2 1 4',
// ] //ans 55
// const input = [
// '4 4 1',
// '2 1 2 2',
// '3 2 1 3',
// '5 4 6 5',
// '3 2 2 4',
// '2 0 1'
// ] //ans 19
// const input = [
// '3 3 3',
// '2 2 1',
// '1 1 2',
// '2 2 2',
// '2 0 1',
// '2 1 5',
// '3 0 2',
// ] //ans 0
// const input = [
// '5 5 1',
// '1 2 1 2 2',
// '2 1 2 1 1',
// '1 2 2 1 2',
// '2 1 1 2 1',
// '1 3 3 1 1',
// '3 0 1'
// ] //ans 4
// const input = [
// '6 6 2',
// '1 1 3 1 1 1',
// '2 2 4 2 2 2',
// '4 2 4 2 4 2',
// '3 1 3 1 3 1',
// '4 3 4 3 4 5',
// '2 3 2 3 3 2',
// '2 1 2',
// '3 0 4',
// ] //ans 42
// const input = [
// '40 20 8',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 4 1 1 1 1 1 1 1 1 1',
// '1 1 1 9 5 8 1 1 1 1 1 4 5 4 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1',
// '4 5 4 1 4 5 4 1 1 1 1 1 1 5 1 1 1 4 5 4',
// '1 1 1 1 1 1 2 1 1 1 1 1 4 4 4 1 1 1 1 1',
// '1 1 4 5 4 1 1 4 5 4 1 1 4 4 4 1 1 4 5 4',
// '4 5 4 1 1 1 1 1 1 4 5 4 1 1 4 4 4 1 1 1',
// '1 1 1 1 1 1 4 2 4 1 1 1 1 1 1 1 4 4 4 1',
// '4 5 4 1 1 1 2 6 5 1 1 4 2 4 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 4 2 4 2',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 4 4 4 1 1 1 1 1',
// '1 1 1 1 4 5 1 1 1 1 1 1 1 1 4 4 4 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 4 4 4 1',
// '1 1 1 1 1 1 1 6 2 6 2 1 1 1 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1',
// '1 1 4 3 4 1 1 1 1 1 4 3 4 1 1 4 3 4 1 1',
// '1 1 1 1 1 2 1 2 4 2 1 1 1 1 4 2 1 1 1 1',
// '1 4 3 4 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2',
// '1 1 1 1 1 4 1 4 1 1 4 1 1 1 1 2 2 2 2 2',
// '1 1 1 1 1 1 1 1 1 4 1 1 1 1 1 2 2 2 2 2',
// '2 1 4 2 1 1 1 1 5 2 5 2 5 1 1 1 1 1 1 1',
// '1 1 1 1 1 6 2 3 1 1 1 1 1 1 1 1 5 2 5 2',
// '1 1 1 1 1 1 1 1 1 1 6 5 6 5 1 1 1 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 5 4 4 4 3 6 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 3 5 4 4 4 5 1 1',
// '1 1 1 7 8 7 1 1 1 1 1 1 1 1 1 5 4 4 4 1',
// '1 1 1 4 5 4 1 1 1 4 5 4 1 1 5 4 5 1 1 1',
// '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1',
// '1 1 7 5 6 1 7 6 5 1 7 6 5 1 1 1 1 2 1 1',
// '1 7 6 7 1 1 1 7 6 5 1 1 1 1 2 7 6 5 1 1',
// '7 6 5 1 1 6 6 2 4 1 7 6 5 1 1 1 5 1 1 1',
// '1 1 2 3 2 3 1 1 1 1 1 1 2 5 2 6 1 1 1 1',
// '1 1 1 1 1 1 2 3 2 3 1 1 1 1 1 2 4 2 4 2',
// '5 1 3',
// '6 0 5',
// '4 1 7',
// '5 1 3',
// '3 0 8',
// '4 1 2',
// '5 0 1',
// '3 0 4',
// ] // ans 478

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M,T] = input[0].split(' ').map(Number);
const circleBoard = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
const command = Array.from({length:T},(_,i) =>input[i+N+1].split(' ').map(Number));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos =  (y,x) => (y>=0 && x>=0 && y<N && x<M);

const rotateCircle = (direction,rotateCount,number,circleBoard) =>{
    if(direction === 0){
       let temp = circleBoard[number].splice(M-rotateCount,rotateCount);
       circleBoard[number] = temp.concat(circleBoard[number]);
    }
    else{
       let temp = circleBoard[number].splice(0,rotateCount);
       circleBoard[number].push(...temp);
    }
}

const removeNumber = (y,x,visited,circleBoard) =>{
     visited[y][x] = true;
     const number = circleBoard[y][x];
     let count = 0;
     let queue = [[y,x]];
     while(queue.length){
         const [cy,cx] = queue.shift();
         count++;
         for(let i=0; i<4; i++){
             const [ny,nx] = [cy+dy[i], (cx+dx[i]+M) % M];
             if(!isValidPos(ny,nx) || visited[ny][nx] || circleBoard[ny][nx] !==number) continue;
             circleBoard[ny][nx] = 0;
             visited[ny][nx] = 0;
             queue.push([ny,nx]);
         }
     }
    if(count === 1) return false;
    circleBoard[y][x] = 0;
    return true;
}
const addNumber = (circleBoard) =>{
     const [sum,count] = circleBoard.flat().reduce((acc,cur)=>{
         if(cur) acc[0]+=cur , acc[1]++
         return acc;
     },[0,0])
     const average = sum / count;
     for(let y=0; y<N; y++){
         for(let x=0; x<M; x++){
             const number = circleBoard[y][x]
             if(!number) continue
             if(number > average) circleBoard[y][x]--;
             else if(number < average) circleBoard[y][x]++;   
         }
    }
}

const solution = (circleBoard,command) =>{
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    let i = 0;
    let isChange ;
    while( i < command.length){
        isChange = false;
        const [multiple,direction,rotateCount] = command[i];
        for(let number=0; number<N; number++){
            if( (number+1) % multiple === 0){
                rotateCircle(direction,rotateCount,number,circleBoard);
            }
        }
        for(let y=0; y<N; y++){
            for(let x=0; x<M; x++){
                if(!visited[y][x] && circleBoard[y][x]){
                    let isRemove = removeNumber(y,x,visited,circleBoard);
                    if(isRemove) isChange = true;
                }
            }
        }
        i++;
        visited.forEach(row => row.fill(false));
        if(isChange) continue;
        addNumber(circleBoard)
    }
    const sum = circleBoard.reduce((acc,cur) => acc+=cur.reduce((acc,cur) => cur ? acc+=cur : acc,0),0);
    console.log(sum);
} 
solution(circleBoard,command);