const getMinNumber = (query,matrix) =>{
    const [y1,x1,y2,x2] = query.map(num => num-1);
    const numArr = [];
    let min ;
    for(let x=x1; x<x2; x++) numArr.push(matrix[y1][x]);
    for(let y=y1; y<y2; y++) numArr.push(matrix[y][x2]);
    for(let x=x2; x>x1; x--) numArr.push(matrix[y2][x]);
    for(let y=y2; y>y1; y--) numArr.push(matrix[y][x1]);
    numArr.unshift(numArr.pop());
    numArr.reverse();
    min = Math.min(...numArr);

    for(let x=x1; x<x2; x++) matrix[y1][x] = numArr.pop();
    for(let y=y1; y<y2; y++) matrix[y][x2] = numArr.pop();
    for(let x=x2; x>x1; x--) matrix[y2][x] = numArr.pop();
    for(let y=y2; y>y1; y--) matrix[y][x1] = numArr.pop();
    
    return min
}
const solution = (rows,columns,queries) =>{
    const matrix = Array.from({length:rows},(_,i) => Array(columns).fill().map((_,j) => i*rows + j + 1 ));
    return queries.reduce((answer,query) =>{
       answer.push(getMinNumber(query,matrix))
       return answer;
    },[])
}
console.log(solution(6,6,[[2,2,5,4],[3,3,6,6],[5,1,6,3]]))