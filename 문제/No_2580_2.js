// const input =[
//     '0 3 5 4 6 9 2 7 8',
//     '7 8 2 1 0 5 6 0 9',
//     '0 6 0 2 7 8 1 3 5',
//     '3 2 1 0 4 6 8 9 7',
// '8 0 4 9 1 3 5 0 6',
// '5 9 6 8 2 0 4 1 3',
// '9 1 7 6 5 2 0 8 0',
// '6 0 3 7 0 1 9 5 2',
// '2 5 8 3 9 4 7 6 0',
// ]

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const sudoku = Array.from({length:9},(_,i)=>input[i].split(' ').map(num=>+num));
const emptyArr = (sudoku) =>{
    let array = [];
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(sudoku[i][j] === 0) array.push([i,j]);
        }
    }
    return array;
}
const isPossible =(sudoku,y,x,number) =>{
    if(sudoku[y].some(el => el===number)) return false;
    if(sudoku.map(row => row[x]).some(el =>el===number)) return false;
    
    const [startY,startX] =[Math.floor(y/3)*3,Math.floor(x/3)*3];
    for(let i=startY; i<startY+3; i++){
        for(let j=startX; j<startX+3; j++){
           
            if(sudoku[i][j] === number) return false;
        }
    }
    return true;
}

const dfs = (sudoku,emptyPos,count) =>{
    
    if(count === emptyPos.length){
        let str=""
        for(let i=0; i<9; i++){
            str +=`${sudoku[i].join(' ')}\n`
        }
        process.exit(console.log(str.trim()));
    }

   
        const [cy,cx] = emptyPos[count];
        
        for(let i=1; i<=9; i++){
           
            if(isPossible(sudoku,cy,cx,i)){
                sudoku[cy][cx] = i;
                dfs(sudoku,emptyPos,count+1);
                sudoku[cy][cx] = 0;     
            }

        }

    

}

const solution = (sudoku) =>{
    const empty = emptyArr(sudoku);
    return dfs(sudoku,empty,0);
}
console.log(solution(sudoku));