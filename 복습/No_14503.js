//const input = ['3 3','1 1 0','1 1 1','1 0 1','1 1 1'];
const input =['11 10','7 4 0','1 1 1 1 1 1 1 1 1 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 1 1 1 1 0 1','1 0 0 1 1 0 0 0 0 1','1 0 1 1 0 0 0 0 0 1','1 0 0 0 0 0 0 0 0 1','1 0 0 0 0 0 0 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 1 1 0 1','1 0 0 0 0 0 0 0 0 1','1 1 1 1 1 1 1 1 1 1']

//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input[0].split(' ').map(Number);
const robot = input[1].split(' ').map(Number);
const map = Array.from({length:N},(_,i)=>input[i+2].split(' '));
const go = [[-1,0],[0,1],[1,0],[0,-1]];
const back = [[1,0],[0,-1],[-1,0],[0,1]];
let visited = Array.from({length:N},()=>Array(M).fill(false));
const isValidPos= (y,x) => (y>=0 && x>=0 && y<N && x<M);

// const getCleanCount = () =>{
//     let visited = Array.from({length:N},()=>Array(M).fill(false));
//     const [y,x,dir] = robot;
//     visited[y][x] = true;
//     let count = 1;
//     let queue = [[y,x,dir]];
//     while(queue.length){
//         const [cy,cx,cDir] = queue.shift();
        
//         for(let i=cDir+3; i>=cDir; i--){
//            const [ny,nx] = [cy+go[i%4][0],cx+go[i%4][1]];
//            if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='1') continue;
//            visited[ny][nx] = true;
//            count++;
//            queue.push([ny,nx,i%4]);
//            break;
//         }
//         if(!queue.length){
//             const [ny,nx] = [cy+back[cDir][0],cx+back[cDir][1]];
//             if(!isValidPos(ny,nx) || map[ny][nx] ==='1') return count;
//             if(!visited[ny][nx]){
//                 visited[ny][nx] = true;
//                 count++;
//             }
//             queue.push([ny,nx,cDir]);
//         }

//     } 
// }



// let count = 0;
// const dfs = (y,x,dir) =>{
//     if(!visited[y][x]){
//         visited[y][x] = true;
//         count++;
//     }
    
//     for(let i=dir+3 ; i>=dir; i--){
//         const [ny,nx] = [y+go[i%4][0],x+go[i%4][1]];
//        // console.log(ny,nx);
//         if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='1') continue;
//         return dfs(ny,nx,i%4);
//     }
//     const [ny,nx] = [y+back[dir][0],x+back[dir][1]];
//     if(!isValidPos(ny,nx) || map[ny][nx] ==='1') return;
//     return dfs(ny,nx,dir);
// }
// dfs(robot[0],robot[1],robot[2]);
// console.log(count);


const dfs = (y,x,dir,count) =>{
    if(!visited[y][x]){
        visited[y][x] = true;
        count++;
    }
    
    for(let i=dir+3 ; i>=dir; i--){
        const [ny,nx] = [y+go[i%4][0],x+go[i%4][1]];
       // console.log(ny,nx);
        if(!isValidPos(ny,nx) || visited[ny][nx] || map[ny][nx] ==='1') continue;
        return dfs(ny,nx,i%4,count);
    }
    const [ny,nx] = [y+back[dir][0],x+back[dir][1]];
    if(!isValidPos(ny,nx) || map[ny][nx] ==='1') return count;
    return dfs(ny,nx,dir,count);
}
const answer = dfs(robot[0],robot[1],robot[2],0);
console.log(answer);
