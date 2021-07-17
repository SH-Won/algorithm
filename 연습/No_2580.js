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

function b2580(){
    // const fs = require('fs');
    // const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

    const input =[
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
    let link = [];

    for(let i=0; i<input.length; i++){
    let temp=input[i].split(' ').map(num => +num);
    link.push(temp);
   }
   let emptyArray = checkEmpty(link,[]);

   dfs(0,emptyArray,link);

}






function dfs(cnt,emptyArray,link){
    
    if(cnt === emptyArray.length){
        for(let i=0; i<link.length; i++){
            console.log(link[i].join(' ').trim());
        }
    
        return
        
    }
    let x = emptyArray[cnt][1];
    let y = emptyArray[cnt][0];

    for(let i=1; i<=9; i++){

        if(checkNumber(i,x,y,link)){
            link[y][x] = i;
            dfs(cnt+1,emptyArray,link);

        }

    }

}
function checkNumber(num,x,y,link){
   
    for(let i=0; i<9; i++){
        if(num === link[y][i]) return false;
    }
    for(let j=0; j<9; j++){
        if(link[j][x] === num) return false;
    }
    let _x = Math.floor(x / 3) *3;
    let _y = Math.floor(y / 3) *3;

    for(let i=_y; i<_y+3; i++){
        for(let j=_x; j<_x+3; j++){
            if(link[i][j] ===num) return false;
        }
    }
    return true;


}
function checkEmpty(arr,emptyArray){
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