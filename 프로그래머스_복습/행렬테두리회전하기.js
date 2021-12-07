const rotate = (x1,y1,x2,y2,matrix) =>{
    let array = [];
    for(let y=y1; y<y2; y++){
        array.push(matrix[x1][y]);
    }
    for(let x=x1; x<x2; x++){
        array.push(matrix[x][y2]);
    }
    for(let y=y2; y>y1; y--){
        array.push(matrix[x2][y]);
    }
    for(let x=x2; x>x1; x--){
        array.push(matrix[x][y1]);
    }
    const last = array.pop();
    array.reverse().push(last);
    const min = Math.min(...array);
    for(let y=y1; y<y2; y++){
        matrix[x1][y] = array.pop();
    }
    for(let x=x1; x<x2; x++){
        matrix[x][y2] =array.pop();
    }
    for(let y=y2; y>y1; y--){
        matrix[x2][y] =array.pop();
    }
    for(let x=x2; x>x1; x--){
        matrix[x][y1] =array.pop();
    }
    return min;
}
const solution = (row,columns,queries) =>{
    let matrix = Array.from({length:row} ,(_,i) => Array(columns).fill().map((_,j) => i*columns + j + 1));
    let answer = [];
    for(let i=0; i<queries.length; i++){
        const [x1,y1,x2,y2] = queries[i];
        const min = rotate(x1-1,y1-1,x2-1,y2-1,matrix);
        answer.push(min);
    }
    return answer;
}
// console.log(solution(6,6,[[2,2,5,4],[3,3,6,6],[5,1,6,3]]))
// console.log(solution(3,3,[[1,1,2,2],[1,2,2,3],[2,1,3,2],[2,2,3,3]]))
// console.log(solution(100,97,[[1,1,100,97]]))
