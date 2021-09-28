const input = [
'5 5',
'1 2 3 4 5',
'5 4 3 2 1',
'2 3 4 5 6',
'6 5 4 3 2',
'1 2 1 2 1',
]
// const input = [
// '4 5',
// '1 2 3 4 5',
// '1 2 3 4 5',
// '1 2 3 4 5',
// '1 2 3 4 5',
// ]
// const input = [
//     '4 10',
//     '1 2 1 2 1 2 1 2 1 2',
//     '2 1 2 1 2 1 2 1 2 1',
//     '1 2 1 2 1 2 1 2 1 2',
//     '2 1 2 1 2 1 2 1 2 1'
// ]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const solution = ()=>{
    const [N,M] = input[0].split(' ').map(Number);
    const paper = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
    let visited = Array.from({length:N},()=>Array(M).fill(false));
    let check = Array.from({length:N},()=>Array(M).fill(false));
    const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<M);
    const dy = [1,-1,0,0];
    const dx = [0,0,1,-1];
    let max = 0;
    const calc = (y,x) =>{
        let max = 0;
        for(let order=0; order<4; order++){
            let sum = paper[y][x];
            let flag = true;
            for(let i=0; i<4; i++){
                if(order === i) continue;
                const [ny,nx] = [y+dy[i],x+dx[i]];
                if(!isValidPos(ny,nx)){
                    flag = false;
                    break;
                }
                sum+=paper[ny][nx];
            }
            if(flag) max = Math.max(sum,max);
        }
        return max;
    }
    const dfs = (y,x,count,sum) =>{
        if(count ===3){
            max = Math.max(sum,max);
            return;
        }
        
        for(let i=0; i<4; i++){
            const [ny,nx] = [y+dy[i],x+dx[i]];
            if(!isValidPos(ny,nx) || visited[ny][nx]) continue;
            const nextSum = sum+paper[ny][nx];
            visited[ny][nx] = true;
            dfs(ny,nx,count+1,nextSum);
            visited[ny][nx] = false;
        }
        
    }
    for(let y=0; y<N; y++){
        for(let x=0; x<M; x++){
            visited[y][x] = true;
            dfs(y,x,0,paper[y][x]);
            visited[y][x] = false;
            max = Math.max(max,calc(y,x));
        }
    }
   return console.log(max);
}
solution();
// const solution = () =>{
//     const [N,M] = input[0].split(' ').map(Number);
//     const paper = Array.from({length:N},(_,i)=>input[i+1].split(' ').map(Number));
//     let visited = Array.from({length:N},()=>Array(M).fill(false));
//     let check = Array.from({length:N},()=>Array(M).fill(false));
//     const isValidPos = (y,x) =>(y>=0 && x>=0 && y<N && x<M);
//     const dy = [1,-1,0,0];
//     const dx = [0,0,1,-1];
//     let max = 0;
    
//     const bfs = (y,x) => {
//         check[y][x] = true;
//         let queue=[[y,x]];
//         let count = 0;
//         while(queue.length){
//             const [cy,cx] = queue.shift();
//             count++;
//             for(let i=0; i<4; i++){
//                 const [ny,nx] = [cy+dy[i],cx+dx[i]];
//                 if(!isValidPos(ny,nx) || check[ny][nx] || !visited[ny][nx]) continue;
//                 queue.push([ny,nx]);
//                 check[ny][nx] = true;
//             }
//         }
//         return count === 4 ? true : false;
//     }
//     const dfs = (index,count,sum) =>{
//         if(count === 4){
//             const [y,x] = [Math.floor((index-1)/M),(index-1) % M];
//             if(bfs(y,x))  max = Math.max(max,sum);
//             check = check.map(array=>array.fill(false));
//             return
//         }

//         for(let i=index; i<N*M; i++){
//             const [y,x] = [Math.floor(i / M),i % M];
//             const nextSum = sum+paper[y][x];
//             visited[y][x] = true;
//             dfs(i+1,count+1,nextSum);
//             visited[y][x] = false;
//         }
//     }
//     dfs(0,0,0);
//     return console.log(max);
// }
// solution();