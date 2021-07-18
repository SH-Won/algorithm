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
// const input =[
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0',
//     '0 0 0 0 0 0 0 0 0'
// ]
function b2580(){
    const fs = require('fs');
    const input = fs.readFileSync('/dev/stdin').toString().split('\n');
    
    // const input =[
    //     '0 0 0 0 0 0 0 0 0',
    //     '0 0 0 0 0 0 0 0 0',
    //     '0 0 0 0 0 0 0 0 0',
    //     '0 0 0 0 0 0 0 0 0',
    //     '0 0 0 0 0 0 0 0 0',
    //     '0 0 0 0 0 0 0 0 0',
    //     '0 0 0 0 0 0 0 0 0',
    //     '0 0 0 0 0 0 0 0 0',
    //     '0 0 0 0 0 0 0 0 0'
    // ]
    let link = [];
    
    for(let i=0; i<input.length; i++){
        link.push(input[i].split(' ').map(num => +num))
    }
    let emptyArray = emptyArrayCheck(link,[]);
    
    sudoku(0,emptyArray,link);
}
function sudoku(cnt,emptyArray,link){
   
    if(cnt === emptyArray.length){
       for(let i=0; i<9; i++){
          console.log(link[i].join(' ').trim());
       }
       process.exit(0);
    }
    for(let i=1; i<=9; i++){
        const x = emptyArray[cnt][1];
        const y = emptyArray[cnt][0];

        if(check(x,y,i,link)){
            
            link[y][x] =i;
            sudoku(cnt+1,emptyArray,link);
            link[y][x]=0;
        }
    }

}
function check(x,y,num,link){
    for(let i=0; i<9; i++){
        if(link[i][x] === num) return false;
    }
    for(let j=0; j<9; j++){
        if(link[y][j] === num) return false;
    }
    const _x = Math.floor(x /3)*3;
    const _y =Math.floor(y/3) *3;

    for(let k=_y; k<_y+3; k++){
        for(let z=_x; z<_x+3; z++){
            if(link[k][z] ===num){
                return false;

            }
        }
    }
    return true;

}

function emptyArrayCheck(arr,emptyArray){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(arr[i][j] === 0){
                emptyArray.push([i,j])
            }
        }
    }
    return emptyArray;
}
b2580();