// const fs = require('fs');

// const input  = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
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
let arr =[];
for(let i=0; i<input.length; i++){
    let pushArr = input[i].split(' ').map(num => parseInt(num));
    arr.push(pushArr);
}
let emptyArray = isEmpty(arr,[]);
// console.log(emptyArray);


dfs(0,emptyArray,arr);

function dfs(cnt,emptyArray,arr){
    
    
    
    if(cnt === emptyArray.length){
        let solution =''
        // for(let i=0; i<arr.length; i++){
        //     for(let j=0; j<arr.length; j++){
        //         temp.push(arr[i][j])
        //     }
        //     solution += `${temp.join(' ')}\n`;
        //     temp=[];
        // }
        for(let i=0; i<arr.length; i++){
            solution += `${arr[i].join(' ')}\n`
        }
        console.log(solution.trim());
        return;

       
    }
    //[0,1],[0,3],[2,3]
    let y = emptyArray[cnt][0];
    let x = emptyArray[cnt][1];

    for(let i=1; i<=9; i++){
        //첫번째 i =4 일때 cnt +1 
         
        if(check(x,y,i,arr)){ 
             arr[y][x] = i;
             dfs(1+cnt,emptyArray,arr)
              arr[y][x] = 0
              
        }
        
    }
}

function check(x,y,num,arr){
    for(let i=0; i<9; i++){
        if(num === arr[y][i]) return false;
    }
    for(let i=0; i<9; i++){
        if(num === arr[i][x]) return false;
    }
    let _x = Math.floor(x/3) *3;
    let _y = Math.floor(y/3) *3;

    for(let i=_y; i<_y+3; i++){
        for(let j=_x; j<_x+3; j++){
            if(num ===arr[i][j]) return false;
        }
    }
    return true;


}
function isEmpty(arr,emptyArray){
    
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr.length; j++){
            if(arr[i][j] === 0){
                emptyArray.push([i,j])
            }
        }
    }
    return emptyArray;

}