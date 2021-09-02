//CCBDE
//AAADE
//AAABF
//CCBBF
//const [m,n,board]=[4,5,["CCBDE", "AAADE", "AAABF", "CCBBF"]]
const [m,n,board] =[6,6,	["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"]]
console.log(solution(m,n,board))
function solution(m,n,board){

    let rotateBoard =Array.from({length:n},(_,i)=>{
        const row = board.map(array => array[n-i-1]);
        return row; 
    })

    const getBlockScore = (board) =>{
        
        const checkBlock =() =>{
            let bPos = [];
           for(let i=0; i<n-1; i++){
             for(let j=0; j<m-1; j++){
               const rootBlock = board[i][j];
               if(rootBlock ==='o') continue;

                if(rootBlock === board[i][j+1] &&
                  rootBlock === board[i+1][j] &&
                  rootBlock === board[i+1][j+1]){
                      bPos.push([i,j]);
                    }
               }
            }
             return bPos;
           }

        const downBlock = (bPos) =>{
            for(let i=0; i<bPos.length; i++){
                const [y,x] = bPos[i];
                board[y][x] = 'o';
                board[y+1][x] = 'o';
                board[y][x+1] = 'o';
                board[y+1][x+1] = 'o';
            }
            board = board.reduce((acc,row)=>{
                const newRow = row.filter(block => block !=='o');
               
                 return [...acc,Array(m-newRow.length).fill('o').concat(newRow)]
            },[])
          
            return board;
        
        }
        const bPos = checkBlock();
        if(bPos.length ===0) return board;
        const newBoard = downBlock(bPos);
        
        return getBlockScore(newBoard);

    }
    let currentBlock = getBlockScore(rotateBoard);
    
 
    return currentBlock.reduce((acc,row) =>{
        let count = 0;
        row.forEach(block => block ==='o' ? count++ : count );
        return acc+=count;
    },0);
}