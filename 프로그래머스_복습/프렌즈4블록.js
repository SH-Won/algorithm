const downBlock = (board) =>{
    const length = board[0].length;
    for(let i=0; i<board.length; i++){
        const friendBlock = board[i].filter(el => el !=='0');
        const newFriendBlock = [...Array(length - friendBlock.length).fill('0'),...friendBlock];
        board[i] = newFriendBlock;
    }
}
const removeBlock = (board,pos)=>{
    for(let i=0; i<pos.length; i++){
        const [y,x] = pos[i];
        board[y][x] = '0' , board[y][x+1] ='0' , board[y+1][x] ='0', board[y+1][x+1] = '0'; 
    }
}
const solution = (m,n,board) =>{
    let newBoard = Array.from({length:n}, (_,i)=> board.map(row => row[i]));

    while(true){
       let pos = [];
       for(let y=0; y<n-1; y++){
           for(let x=0; x<m-1; x++){
               const friend = newBoard[y][x];
               if(friend !=='0' && newBoard[y][x+1] === friend && newBoard[y+1][x] === friend && newBoard[y+1][x+1] === friend){
                   pos.push([y,x]);
               }
           }
       }
       if(!pos.length) break;
       removeBlock(newBoard,pos);
       downBlock(newBoard);
   }
   const answer = newBoard.reduce((acc,cur)=> acc+=cur.filter(el => el === '0').length ,0);
   return answer;
}
// console.log(solution(4,5,["CCBDE", "AAADE", "AAABF", "CCBBF"]))
console.log(solution(6,6,["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"]))