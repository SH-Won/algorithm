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
let inputArr = Array.from({length:input.length},(_,i)=> input[i].split(' ').map(num => +num));
let emptyArr = checkEmptyArray(inputArr,[]);

dfs(0,inputArr,emptyArr);
function dfs(count,arr,emptyArray){

    if(count === emptyArray.length){
      
        let string = arr.reduce((acc,pre)=>{
            let line = pre.join(' ');
            acc+=`${line}\n`;

            return acc;
        },'')
        console.log(string.trim());
        
        
        process.exit(0);
    }

    let x = emptyArray[count][1];
    let y = emptyArray[count][0];

    for(let i=1; i<=9; i++){
        
        if(check(i,x,y,arr)){
            arr[y][x]=i;
            dfs(count+1,arr,emptyArray);
        }
    }

}
function check(number,x,y,arr){
    for(let i=0; i<9; i++){
        if(arr[i][x] === number) return false;

        if(arr[y][i] === number) return false;
    }
    
    let x3 = Math.floor(x / 3) * 3;
    let y3 = Math.floor(y / 3) * 3;

    for(let i=y3; i<y3+3; i++ ){
        for(let j=x3; j<x3+3; j++){
            if(arr[i][j] === number) return false;
        }
    }
    return true;

}

function checkEmptyArray(arr,emptyArr){
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(arr[i][j] === 0) emptyArr.push([i,j]);
        }
    }
    return emptyArr
}