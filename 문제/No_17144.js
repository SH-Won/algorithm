const input =['7 8 1','0 0 0 0 0 0 0 9','0 0 0 0 3 0 0 8','-1 0 5 0 0 0 22 0','-1 8 0 0 0 0 0 0','0 0 0 0 0 10 43 0','0 0 5 0 15 0 0 0','0 0 40 0 0 0 20 0',]
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
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [R,C,T] = input[0].split(' ').map(num =>+num);
const room = Array.from({length:R},(_,i)=>input[i+1].split(' ').map(num =>+num));

const clean = (room,T) =>{
    let copyRoom = Array.from({length:R},()=>Array(C).fill(0));
    const distance = [[1,0],[-1,0],[0,1],[0,-1]];
    
    let cleanerY =[];
    for(let i=0; i<R; i++){
      for(let j=0; j<C; j++){
        if(room[i][j] === -1){
            cleanerY.push(i);
            room[i][j] =0;
        }
           
      }
    }
    const isValidPos = (y,x) => (y>=0 && x>=0 && y<R && x<C && !(y===cleanerY[0] && x===0) && !(y===cleanerY[1] && x===0));
    const work = () =>{
        let upDust = [];
        let downDust =[];
        for(let x=1; x<C-1; x++){
            upDust.push(copyRoom[cleanerY[0]][x]);
            downDust.push(copyRoom[cleanerY[1]][x])
        }
        for(let y=cleanerY[0]; y>0; y--){
            upDust.push(copyRoom[y][C-1]);
        }
        for(let y=cleanerY[1]; y<R-1; y++){
            downDust.push(copyRoom[y][C-1])
        }
        for(let x=C-1; x>0; x--){
            upDust.push(copyRoom[0][x]);
            downDust.push(copyRoom[R-1][x])
        }
        for(let y=0; y<cleanerY[0]; y++){
            upDust.push(copyRoom[y][0]);
        }
        for(let y=R-1; y>cleanerY[1]; y--){
            downDust.push(copyRoom[y][0])
        }
        upDust.pop();
        upDust.unshift(0);
        downDust.pop();
        downDust.unshift(0);
        for(let x=1; x<C-1; x++){
            copyRoom[cleanerY[0]][x] = upDust.shift();
            copyRoom[cleanerY[1]][x] = downDust.shift();
        }
        for(let y=cleanerY[0]; y>0; y--){
            copyRoom[y][C-1] = upDust.shift();
        }
        for(let y=cleanerY[1]; y<R-1; y++){
            copyRoom[y][C-1] =downDust.shift();
        }
        for(let x=C-1; x>0; x--){
            copyRoom[0][x]=upDust.shift();
            copyRoom[R-1][x]=downDust.shift();
        }
        for(let y=0; y<cleanerY[0]; y++){
            copyRoom[y][0] = upDust.shift();
        }
        for(let y=R-1; y>cleanerY[1]; y--){
            copyRoom[y][0] =downDust.shift();
        }
    }
    while(T--){
        for(let cy=0; cy<R; cy++){
            for(let cx=0; cx<C; cx++){
                if(room[cy][cx]){
                    let spreadCount = 0;
                    for(let i=0; i<distance.length; i++){
                        const [ny,nx] = [cy+distance[i][0],cx+distance[i][1]];
                        if(!isValidPos(ny,nx)) continue;
                        spreadCount++;
                        copyRoom[ny][nx] += Math.floor(room[cy][cx] / 5);
                    }
                    copyRoom[cy][cx] += room[cy][cx] - (Math.floor(room[cy][cx] / 5)) * spreadCount;
                }
            }
        }
         work();
         // copyRoom 을 원래 room 으로 복사하고 다시 반복
         console.log(copyRoom);
         room = copyRoom.map(array => [...array]);
         copyRoom = copyRoom.map(array => array.fill(0));

    }
   
    let dustSum = room.reduce((acc,cur)=>{
        return acc+=cur.reduce((acc,cur)=>acc+=cur,0);
    },0)

    return console.log(dustSum);

}
clean(room,T);




// function solution(data) {
//     let output = "";

//     const [R, C, T] = data.shift();
//     let src, dest;
//     let ai1, aj1, ai2, aj2;
//     dest = data;
//     src = new Array(R).fill(0).map(x => new Array(C));

//     function isEmpty(i, j) {
//         return 0 <= i && i < R && 0 <= j && j < C && src[i][j] >= 0;
//     }

//     for (let i = 0; i < R; i++) {
//         for (let j = 0; j < C; j++) {
//             if (data[i][j] === -1) {
//                 if (!ai1) {
//                     ai1 = i; aj1 = j;
//                 } else {
//                     ai2 = i; aj2 = j;
//                     break;
//                 }
//             }
//         }
//     }

//     for (let t = 0; t < T; t++) {
//         [src, dest] = [dest, src];
//         dest.map(x => x.fill(0));
//         for (let i = 0; i < R; i++) {
//             for (let j = 0; j < C; j++) {
//                 if (src[i][j] > 0) {
//                     const c = Math.floor(src[i][j] / 5);
//                     if (isEmpty(i + 1, j)) dest[i + 1][j] += c, src[i][j] -= c;
//                     if (isEmpty(i, j + 1)) dest[i][j + 1] += c, src[i][j] -= c;
//                     if (isEmpty(i - 1, j)) dest[i - 1][j] += c, src[i][j] -= c;
//                     if (isEmpty(i, j - 1)) dest[i][j - 1] += c, src[i][j] -= c;
//                     dest[i][j] += src[i][j];
//                 }
//             }
//         }

//         let temp = dest[ai1][0];
//         for (let i = ai1 - 1; i >= 0; i--) dest[i + 1][0] = dest[i][0];
//         for (let j = 1; j < C; j++) dest[0][j - 1] = dest[0][j];
//         for (let i = 1; i <= ai1; i++) dest[i - 1][C - 1] = dest[i][C - 1];
//         for (let j = C - 2; j >= 1; j--) dest[ai1][j + 1] = dest[ai1][j];
//         dest[ai1][1] = temp;

//         temp = dest[ai2][0];
//         for (let i = ai2 + 1; i < R; i++) dest[i - 1][0] = dest[i][0];
//         for (let j = 1; j < C; j++) dest[R - 1][j - 1] = dest[R - 1][j];
//         for (let i = R - 2; i >= ai2; i--) dest[i + 1][C - 1] = dest[i][C - 1];
//         for (let j = C - 2; j >= 1; j--) dest[ai2][j + 1] = dest[ai2][j];
//         dest[ai2][1] = temp;

//         dest[ai1][aj1] = dest[ai2][aj2] = -1;
//     }

//     let sum = 2;
//     for (let i = 0; i < R; i++) {
//         for (let j = 0; j < C; j++) {
//             sum += dest[i][j];
//         }
//     }

//     output += sum + "\n";
//     return output;
// }

// process.stdout.write(solution(
//     require("fs").readFileSync("dev/stdin").toString().trim().split(/\n+/).map((x) => x.trim().split(/\s+/).map((x) => +x))
// ));
// process.exit(0);
