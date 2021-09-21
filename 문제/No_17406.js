const input = [
'5 6 2',
'1 2 3 2 5 6',
'3 8 7 2 1 3',
'8 2 3 1 4 5',
'3 4 5 1 1 1',
'9 3 2 1 4 3',
'3 4 2',
'4 2 1'
]
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let index = 0;
const [N,M,K] = input[index++].split(' ').map(Number);
const matrix = Array.from({length:N},()=>input[index++].split(' ').map(Number));
const rotateInfo = Array.from({length:K},()=>input[index++].split(' ').map(Number));
solution(matrix);
function solution(matrix){
    let order = Array(K);
    let visited= Array(K).fill(false);
    let matrixValue = Infinity;
    const getMatrixValue = (matrix) =>{
        let value = Infinity;
        for(let i=0; i<N; i++){
            value = Math.min(value,matrix[i].reduce((acc,cur)=>acc+=cur,0));
        }
        return value;
    }

    const rotate = (matrix,start,end) =>{
        const [sy,sx] = start; // 0 , 1
        const [ey,ex] = end; // 4 5
        let array = [];
        for(let i=0; i<(sy+ey)/2; i++){
           for(let x=sx+i; x<ex-i; x++){
               array.push(matrix[sy+i][x]);
           }
           for(let y=sy+i; y<ey-i; y++){
               array.push(matrix[y][ex-i])
           }
           for(let x=ex-i; x>sx+i; x--){
               array.push(matrix[ey-i][x]);
           }
           for(let y=ey-i; y>sy+i; y--){
               array.push(matrix[y][sx+i])
           }
           array.unshift(array.pop());
           for(let x=sx+i; x<ex-i; x++){
              matrix[sy+i][x] =array.shift();
           }
           for(let y=sy+i; y<ey-i; y++){
              matrix[y][ex-i] = array.shift();
           }
           for(let x=ex-i; x>sx+i; x--){
              matrix[ey-i][x] =array.shift();
           }
           for(let y=ey-i; y>sy+i; y--){
              matrix[y][sx+i] = array.shift();
           }
        }
        return matrix;
    }

    const dfs = (index) =>{
        if(index ===K){
            let copyMatrix = Array.from({length:N},(_,i)=>[...matrix[i]]);
            for(let i=0; i<K; i++){
                const [r,c,s] = rotateInfo[order[i]];
                const [start,end] = [[r-s-1,c-s-1],[r+s-1,c+s-1]];
                copyMatrix = rotate(copyMatrix,start,end);
            }
            matrixValue = Math.min(matrixValue,getMatrixValue(copyMatrix));
            return;
        }
        for(let i=0; i<K; i++){
            if(!visited[i]){
                visited[i] = true;
                order[index] = i;
                dfs(index+1);
                visited[i] = false;
            }
        }
    }
    dfs(0);
    return console.log(matrixValue);
}

