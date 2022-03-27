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
// const fs =require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const addNumber = (circles) =>{
    const {sum,count} = circles.reduce((acc,circle)=>{
        const [s,c] = circle.reduce((acc,number) =>{
           if(!number) return acc;
           acc[0]+=number , acc[1]++;
           return acc;
        },[0,0]);
        acc.sum+=s , acc.count+=c;
        return acc;
    },{sum:0,count:0})
    const average = sum / count;
    circles.forEach((circle,y) => circle.forEach((number,x) =>{
        if(!number) return;
        else if(number < average) circles[y][x]++;
        else if(number > average) circles[y][x]--;
    }))
}
const removeNumber = (circles) =>{
    const [N,M] = [circles.length , circles[0].length];
    const [dy,dx] = [[1,-1,0,0],[0,0,1,-1]];
    const visited = Array.from({length:N},()=>Array(M).fill(false));
    let isRemove = false;
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            if(visited[y][x] || !circles[y][x]) continue;
            const number = circles[y][x];
            let queue = [[y,x]] , count = 0;
            visited[y][x] = true;
            while(queue.length){
                const [y,x] = queue.shift();
                count++;
                for(let i=0; i<4; i++){
                    const [ny,nx] = [y+dy[i],(x+dx[i]+M) % M];
                    if(ny < 0 || nx < 0 || ny >=N || nx >=M || visited[ny][nx] || circles[ny][nx] !==number) continue;
                    circles[ny][nx] = 0;
                    visited[ny][nx] = true;
                    queue.push([ny,nx]);
                }
            }
            if(count !== 1) isRemove = true , circles[y][x] = 0;
        }
    }
    if(!isRemove) return addNumber(circles);
}
const rotate = (circle,d,k) =>{
    if(d === 0){
        circle.reverse();
        circle.push(...circle.splice(0,k));
        circle.reverse();
    }else circle.push(...circle.splice(0,k));
}
const solution = input =>{
    const [N,M,T] = input[0].split(' ').map(Number);
    // x 배수  d 시계 0 k 칸
    const circles = Array.from({length:N},(_,i) => input[i+1].split(' ').map(Number));
    const command = Array.from({length:T},(_,i) => input[i+1+N].split(' ').map(Number)).reverse();
    while(command.length){
        const [x,d,k] = command.pop();
        circles.forEach((circle,idx)=> (idx+1) % x === 0 && rotate(circle,d,k));
        removeNumber(circles);
    }
    const answer = circles.reduce((acc,circle) => acc+=circle.reduce((acc,number) => acc+=number,0),0);
    console.log(answer);
}
solution(input);