const downBlock = board =>{
    for(let x=0; x<board[0].length; x++){
        const line = board.map(row => row[x]).filter(friend => friend !=='0');
        let y = board.length -1;
        while(line.length) board[y--][x] = line.pop();
        while(y >= 0) board[y--][x] = '0';
    }
}
const solution = (m,n,board) =>{
    board = board.map(row => row.split(''));
    while(true){
        let blocks = [];
        for(let y=0; y<m-1; y++){
            for(let x=0; x<n-1; x++){
                const friend = board[y][x];
                if(friend !== '0' && board[y][x+1] === friend && board[y+1][x] === friend && board[y+1][x+1] === friend){
                    blocks.push([y,x]);
                }
            }
        }
        console.log(blocks);
        if(blocks.length === 0) break;
        blocks.forEach(([y,x]) => (board[y][x] = '0', board[y][x+1] ='0', board[y+1][x] ='0' , board[y+1][x+1] = '0'));
        downBlock(board);
    }
    return board.reduce((acc,row) => acc+= row.reduce((acc,cur) => acc+= ( cur !=='0' ? 0 : 1),0),0);
}
console.log(solution(4,5,["CCBDE", "AAADE", "AAABF", "CCBBF"]))