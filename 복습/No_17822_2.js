// const input = ['4 4 1','1 1 2 3','5 2 4 2','3 1 3 5','2 1 3 2','2 0 1'];
// const input = ['4 4 2','1 1 2 3','5 2 4 2','3 1 3 5','2 1 3 2','2 0 1','3 1 3'];
// const input = ['4 4 3','1 1 2 3','5 2 4 2','3 1 3 5','2 1 3 2','2 0 1','3 1 3','2 0 2'];
// const input = ['4 4 4','1 1 2 3','5 2 4 2','3 1 3 5','2 1 3 2','2 0 1','3 1 3','2 0 2','3 1 1'];
// const input = ['4 6 3','1 2 3 4 5 6','2 3 4 5 6 7','3 4 5 6 7 8','4 5 6 7 8 9','2 1 4','3 0 1','2 1 2']
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

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const rotate = (roulette,d,k) =>{
    const CLOCKWISE = 0;
    const length = roulette.length;
    if(d === CLOCKWISE){
        roulette.unshift(...roulette.splice(length-k))
    }
    else {
        roulette.push(...roulette.splice(0,k));
    }
}
const addNumber = (roulettes) =>{
     const [sum,count] = roulettes.reduce((acc,roulette) =>{
       roulette.forEach(num => num && ( acc[0]+=num , acc[1]++));
       return acc;
     },Array(2).fill(0))
     
     const average = sum / count ;
     for(let y=0; y<roulettes.length; y++){
         for(let x=0; x<roulettes[0].length; x++){
             if(roulettes[y][x]){
                 const number = roulettes[y][x];
                 if(number === average) continue;
                 roulettes[y][x] = number > average ? number-1 : number+1;
             }
         }
     }
}

const removeNumber = (roulettes,N,M) =>{
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<N && x<M);
    const findNumber = (y,x,number) =>{
        let count = 0;
        let queue = [[y,x]];
        roulettes[y][x] = 0;
        while(queue.length){
            const [y,x] = queue.shift();
            count++;
            for(let i=0; i<4; i++){
                const [ny,nx] = [y+dy[i], (x+dx[i]+M) % M];
                if(!isValidPos(ny,nx) || roulettes[ny][nx] !==number) continue;
                roulettes[ny][nx] = 0;
                queue.push([ny,nx]);
            }
        }
        if(count === 1){
            roulettes[y][x] =number;
            return false;
        }
        return true;
    }
    let isRemove = false;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(roulettes[y][x]){
                if(findNumber(y,x,roulettes[y][x]) && !isRemove) isRemove = true;
            }
        }
    }
    if(isRemove) return;
    return addNumber(roulettes)
}
const solution = (input) =>{
    const [N,M,T] = input[0].split(' ').map(Number);
    let roulettes = Array.from({length:N},(_,i)=> input[i+1].split(' ').map(Number));
    const command = Array.from({length:T},(_,i)=>input[i+N+1].split(' ').map(Number));
    //0 시계방향 1 반시계방향
    let count = T , i =0;
    while(count--){
        const [x,d,k] = command[i++];
        roulettes.forEach((roulette,index) => (index+1) % x === 0 && rotate(roulette,d,k));
        removeNumber(roulettes,N,M);
    }
    const answer = roulettes.reduce((acc,cur)=> acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
    console.log(answer);
}
solution(input);