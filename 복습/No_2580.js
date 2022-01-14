const input = [
'0 3 5 4 6 9 2 7 8',
'7 8 2 1 0 5 6 0 9',
'0 6 0 2 7 8 1 3 5',
'3 2 1 0 4 6 8 9 7',
'8 0 4 9 1 3 5 0 6',
'5 9 6 8 2 0 4 1 3',
'9 1 7 6 5 2 0 8 0',
'6 0 3 7 0 1 9 5 2',
'2 5 8 3 9 4 7 6 0',
]
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const makeSudoku = (empty,sudoku)=>{
    const check = (y,x,number) =>{
        for(let i=0; i<9; i++){
            if(sudoku[y][i] === number || sudoku[i][x] === number) return false;
        }
        const [sy,sx] = [(y / 3 >>0)*3 , (x / 3 >>0)*3];
        for(let i=sy; i<sy+3; i++){
            for(let j=sx; j<sx+3; j++){
                if(sudoku[i][j] === number) return false;
            }
        }
        return true;
    }
    const insertNumber = (count) =>{
        if(count === empty.length){
           const answer = sudoku.map(row => row.join(' ')).join('\n');
           process.exit(console.log(answer));
        }
        const [y,x] = empty[count];
        for(let number=1; number<=9; number++){
            if(check(y,x,number)){
                sudoku[y][x] = number;
                insertNumber(count+1);
                sudoku[y][x] = 0;
            }
        }
    }
    insertNumber(0);
}
const solution = (input) =>{
    const sudoku = input.map(row => row.split(' ').map(Number));
    let empty = [];
    for(let y=0; y<9; y++){
        for(let x=0; x<9; x++){
            if(!sudoku[y][x]) empty.push([y,x]);
        }
    }
    makeSudoku(empty,sudoku)
}
solution(input);
