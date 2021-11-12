// // const input = [
// // '7 8',
// // '.......',
// // '......C',
// // '......*',
// // '*****.*',
// // '....*..',
// // '....*..',
// // '.C..*..',
// // '.......',
// // ] // ans 3
// // const input = ['4 4','C.**','..**','....','...C'] //ans1 
// // const input = ['4 4','C...','....','**..','**.C'] //ans 1
// // const input = ['4 4','**.C','**..','....','C...'] //ans 1;
// // const input = ['4 4','...C','....','..**','C.**'] //ans1
// // const input = ['4 7','....','..*.','C.*.','..*C','..*.','..*.','....'] //ans2;
// // const input = ['4 7','....','.*..','.*.C','C*..','.*..','.*..','....']; //ans2
// //const input = ['7 4','...C...','.......','.*****.','...C...'] //ans 2
// //const input = ['4 6','.C..','....','....','**.*','....','...C'] //ans2
// //const fs = require('fs');
// //const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const [W,H] = input[0].split(' ').map(Number);
// const map = Array.from({length:H},(_,i) => input[i+1].split(''));
// const dy = [1,-1,0,0];
// const dx = [0,0,1,-1];
// const isValidPos = (y,x) => (y>=0 && x>=0 && y<H && x<W);
// const getMinInstall = (start,map) =>{
//     let install = Array.from({length:H},()=>Array(W).fill(Infinity));
//     const [sy,sx] = start;
//     let queue = [];
//     install[sy][sx] = 0;
//     for(let dir = 0; dir<4; dir++){
//         const [ny,nx] = [sy+dy[dir],sx+dx[dir]];
//         if(!isValidPos(ny,nx) || map[ny][nx] ==='*') continue;
//         queue.push([ny,nx,dir,0]);
//         install[ny][nx] = 0;
//     }
//     let startIndex = 0 , endIndex ;
//     let min = Infinity;
//     while(startIndex !== queue.length){
//         endIndex = queue.length;
//         for(let i=startIndex; i<endIndex; i++){
//             const [y,x,dir,installCount] = queue[i];
//         if(map[y][x] === 'C'){
//             min = Math.min(min,installCount);
//             continue;
//         }
//         for (let i = 0; i < 4; i++) {
//           const [ny, nx] = [y + dy[i], x + dx[i]];
//           if (!isValidPos(ny, nx) || map[ny][nx] === "*") continue;
//           if (i === dir && install[ny][nx] >= installCount) {
//             install[ny][nx] = installCount;
//             queue.push([ny, nx, i, installCount]);
//           } else if (i !== dir && install[ny][nx] >= installCount + 1) {
//             install[ny][nx] = installCount + 1;
//             queue.push([ny, nx, i, installCount + 1]);
//           }
//         }
//       }
//         startIndex = endIndex;
//     }
//     // console.log(install);
//     return min;
// }
// const solution = (map) =>{
//     let start ;
//     loop:for(let y=0; y<H; y++){
//         for(let x=0; x<W; x++){
//             if(map[y][x] ==='C'){
//                 start =[y,x];
//                 map[y][x] = '.';
//                 break loop;
//             }
//         }
//     }
//     const answer = getMinInstall(start,map);
//     console.log(answer);
// }
// solution(map);
// const input = [
// '7 8',
// '.......',
// '......C',
// '......*',
// '*****.*',
// '....*..',
// '....*..',
// '.C..*..',
// '.......',
// ] // ans 3
// const input = ['4 4','C.**','..**','....','...C'] //ans1 
// const input = ['4 4','C...','....','**..','**.C'] //ans 1
// const input = ['4 4','**.C','**..','....','C...'] //ans 1;
// const input = ['4 4','...C','....','..**','C.**'] //ans1
// const input = ['4 7','....','..*.','C.*.','..*C','..*.','..*.','....'] //ans2;
// const input = ['4 7','....','.*..','.*.C','C*..','.*..','.*..','....']; //ans2
//const input = ['7 4','...C...','.......','.*****.','...C...'] //ans 2
const input = ['4 6','.C..','....','....','**.*','....','...C'] //ans2
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [W,H] = input[0].split(' ').map(Number);
const map = Array.from({length:H},(_,i) => input[i+1].split(''));
const dy = [1,-1,0,0];
const dx = [0,0,1,-1];
const isValidPos = (y,x) => (y>=0 && x>=0 && y<H && x<W);
const getMinInstall = (start,map) =>{
    let install = Array.from({length:H},()=>Array(W).fill(Infinity));
    const [sy,sx] = start;
    let queue = [];
    install[sy][sx] = 0;
    for(let dir = 0; dir<4; dir++){
        const [ny,nx] = [sy+dy[dir],sx+dx[dir]];
        if(!isValidPos(ny,nx) || map[ny][nx] ==='*') continue;
        queue.push([ny,nx,dir,0]);
        install[ny][nx] = 0;
    }
    let index =0;
    let min = Infinity;
    while(index < queue.length){
        const [y,x,dir,installCount] = queue[index++];
        if(map[y][x] === 'C'){
            min = Math.min(min,installCount);
            continue;
        }
        for (let i = 0; i < 4; i++) {
          const [ny, nx] = [y + dy[i], x + dx[i]];
          if (!isValidPos(ny, nx) || map[ny][nx] === "*") continue;
          let nCount = installCount;
          if(dir !==i) nCount++;
          if(install[ny][nx] >= nCount){
              queue.push([ny,nx,i,nCount]);
              install[ny][nx] = nCount;
          }
        }
    }
    // console.log(install);
    return min;
}
const solution = (map) =>{
    let start ;
    loop:for(let y=0; y<H; y++){
        for(let x=0; x<W; x++){
            if(map[y][x] ==='C'){
                start =[y,x];
                map[y][x] = '.';
                break loop;
            }
        }
    }
    const answer = getMinInstall(start,map);
    console.log(answer);
}
solution(map);