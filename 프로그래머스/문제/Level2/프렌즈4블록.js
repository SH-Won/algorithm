
// const board = 	["TTTANT", 
//                  "RRFACC", 
//                  "RRRFCC", 
//                  "TRRRAA", 
//                  "TTMMMF", 
//                  "TMMTTJ"]
const board = 	["CCBDE", 
                 "AAADE", 
                 "AAABF", 
                 "CCBBF"]
console.log(solution(4,5,board))

function solution(m, n, board) {
    let answer = 0;

    let newBoard = Array.from({length:n},(_,i)=>board.map(block => block.slice(n-1-i,n-i)));
    
    const block = (newBoard) =>{
        let array = [];
        for(let i=0; i<n-1; i++){
            for(let j=0; j<m-1; j++){
                if(!newBoard[i][j]) continue

                if(newBoard[i][j] === newBoard[i][j+1] &&
                   newBoard[i][j] === newBoard[i+1][j] &&
                   newBoard[i][j] === newBoard[i+1][j+1] )
                   array.push([i,j]);
            }
        }
        if(array.length ===0) return newBoard;

        array.forEach(([y,x])=>{
            newBoard[y][x] = 0;
            newBoard[y][x+1] =0;
            newBoard[y+1][x] =0;
            newBoard[y+1][x+1] =0;
        })
        // newBoard.forEach(row =>{
        //     let count = row.filter(number => number ===checkNumber).length;
        //     let index =-1;
        //     while(count--){
        //         index = row.indexOf(checkNumber,index+1);
        //         row.unshift(row.splice(index,1)[0])
        //     }
        // })

        newBoard = newBoard.reduce((acc,cur)=>{
            let newRow = cur.filter(el => el!==0);
           // console.log(acc);
             return [...acc,[...Array(m-newRow.length).fill(0),...newRow]]
        },[])
        
        
        return block(newBoard);
    }
    
    newBoard = block(newBoard)
    
    answer = newBoard.reduce((acc,cur)=>{
        let count = cur.filter(el => el===0).length;
        
        return acc+=count;

    },0)

    

    return answer;
}