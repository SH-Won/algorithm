
console.log(solution(6,6,[[2,2,5,4],[3,3,6,6],[5,1,6,3]]))
function solution(rows,columns,queries){
    let answer = [];
    let matrix = Array.from({length:rows},(_,i)=> Array(columns).fill(0).map((_,column) => (i*columns) +column+1) )
    let array = [];

    for(let i=0; i<queries.length; i++){
        const [cy,cx,ny,nx] = queries[i];

        for(let i=cx-1; i<nx-1; i++){
            array.push(matrix[cy-1][i]);
        }
        for(let i=cy-1; i<ny-1 ; i++){
            array.push(matrix[i][nx-1]);
        }
        for(let i=nx-1; i > cx-1 ; i--){
            array.push(matrix[ny-1][i])
        }
        for(let i=ny-1; i >cy-1 ; i--){
            array.push(matrix[i][cx-1])
        }
        answer.push(Math.min(...array));
        array.unshift(array.splice(array.length-1,1));
        let index = 0;
        for(let i=cx-1; i<nx-1; i++){
            matrix[cy-1][i] = array[index++];
        }
        for(let i=cy-1; i<ny-1 ; i++){
            matrix[i][nx-1] =array[index++];
        }
        for(let i=nx-1; i > cx-1 ; i--){
            matrix[ny-1][i]=array[index++];
        }
        for(let i=ny-1; i >cy-1 ; i--){
            matrix[i][cx-1]=array[index++];
        }
        array=[];
    }
    return answer;


}