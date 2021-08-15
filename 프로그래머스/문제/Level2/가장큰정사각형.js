

const board = [[0,1,1,1],[1,1,1,1],[1,1,1,1],[0,0,1,0]];
//const board = [[0,0,1,1],[1,1,1,1]];
//const board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]


const checkBoard = (arr,size) =>{
    let sum = arr.reduce((acc,cur) => acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
    if(sum === 0) return false;
    if(sum % size !==0){
        return false;
    }
    return true;
}
const isAllZero = (arr) =>{
    let sum = arr.reduce((acc,cur)=>acc+=cur.reduce((acc,cur) => acc+=cur,0),0);
    if(sum ===0) return true;

    return false;

}
//console.log(solution(board))


function solution(board)
{
    let answer =1;
    let length = board.length > board[0].length ? board[0].length : board.length;
    if(isAllZero(board)){
        return 0;
    }
    let flag = false;

    
    loop:for(let b=length; b>=2; b--){
     for(let i=0; i+b <=board.length;  i++){
        
        for(let j=0; j+b <=board[0].length; j++){

            let arr = board.slice(i,i+b).map( array => array.slice(j,j+b));
             if(checkBoard(arr,b*b)){
                 answer = b*b;
                 flag = true;
             }
             if(flag){
                 
                 break loop;
             }
            // for(let k=i; k<i+b; k++){
            //     for(let l=j; l<j+b; j++){
                   

            //     }
            // }

        }
    }
 }

    
    return answer;
}