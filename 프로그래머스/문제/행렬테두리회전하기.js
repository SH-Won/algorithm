const array = 		[[1,1,2,2],[1,2,2,3],[2,1,3,2],[2,2,3,3]]

console.log(solution(3,3,array));

function solution(rows,columns,queries){
    let answer = [];
    let matrix = Array.from({length:rows},(_,row)=>Array(columns).fill(0).map((_,column)=> (row*columns)+column+1));
    let stack =[];
    

    for(let i=0; i<queries.length; i++){
        const [x1,y1,x2,y2] = queries[i];

        for(let i=y1-1; i<y2-1; i++){
            stack.push(matrix[x1-1][i]);
        }
        for(let i=x1-1; i<x2-1; i++){
            stack.push(matrix[i][y2-1]);
        }
        for(let i=y2-1 ; i>y1-1; i--){
            stack.push(matrix[x2-1][i]);
        }
        for(let i=x2-1; i>x1-1; i--){
            stack.push(matrix[i][y1-1]);
        }
        
       
    
    const temp = stack.pop();
    stack.splice(0,0,temp);
    answer.push(Math.min(...stack));
    let stackIndex = 0;
   
        for(let i=y1-1; i<y2-1; i++){
            matrix[x1-1][i] =stack[stackIndex++];
        }
        for(let i=x1-1; i<x2-1; i++){
            matrix[i][y2-1] = stack[stackIndex++];
        }
        for(let i=y2-1 ; i>y1-1; i--){
            matrix[x2-1][i] = stack[stackIndex++];
        }
        for(let i=x2-1; i>x1-1; i--){
            matrix[i][y1-1] = stack[stackIndex++];
        }
    stack = [];
    }
    return answer;
}