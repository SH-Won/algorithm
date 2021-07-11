// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
 console.time('1018');
// const input = [
//     '10 50',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB',
//     'WBWBWBWB','WBWBWBWB','WBWBWBWB','WBWBWBWB'



//]
   const input = [
    '10 13',
    'BBBBBBBBWBWBW',
    'BBBBBBBBBWBWB',
    'BBBBBBBBWBWBW',
    'BBBBBBBBBWBWB',
    'BBBBBBBBWBWBW',
    'BBBBBBBBBWBWB',
    'BBBBBBBBWBWBW',
    'BBBBBBBBBWBWB',
    'WWWWWWWWWWBWB',
    'WWWWWWWWWWBWB'
    ];
const [N,M] = input[0].split(' ').map(num=>parseInt(num));
const WB = input.slice(1);

//세로,가로;
// 10 13 이라면
let minArr = [];

const white = [
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW'
]
//  W B B B => W B W B  1개
//  W B B B => B W B W  3개
//  W W W B => W B W B  1개
//  W B B W => W B W B  2개
//  W W B W => W B W B  3개
//  W W B W => W B W B  1개
const black = [
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB',
    'BWBWBWBW',
    'WBWBWBWB'
]

function whiteStart(y,x){ // i j 0 0 0 1 
    let count = 0;
    for(let i=y; i<y+8; i++){
        for(let j=x; j<x+8; j++){
          if( WB[i][j] !== white[i-y][j-x])  count++
             
        }
    }
    return count;
}
function blackStart(y,x){
    let count =0;
    for(let i=y; i<y+8; i++){
        for(let j=x; j<x+8; j++){
           if(WB[i][j] !== black[i-y][j-x]) count++
        }
    }
    return count;
}

for(let i=0; i+7 < N; i++){
    for(let j=0; j+7 <M; j++){
        // let count =0;
        
        minArr.push(whiteStart(i,j));
        minArr.push(blackStart(i,j));
         
        // for(let k=i; k<i+8; k++){
            
            
        //     for(let l=j; l<j+8; l++){
        //        if((k-i)%2 ===0){
        //            (l-j)%2 ===0 && WB[k][l] !==color ? count+=1 : count ;
        //            (l-j)%2 ===1 && WB[k][l] ===color ? count+=1 : count
        //        }
        //        else{
        //         (l-j)%2 ===0 && WB[k][l] ===color ? count+=1 : count ;
        //         (l-j)%2 ===1 && WB[k][l] !==color ? count+=1 : count

        //        }
        //     }
            
           
        // }
        
        
      
    }

}
console.log(minArr);
console.log(Math.min(...minArr));
console.timeEnd('1018');




     
    // const input = [
    // '10 13',
    // 'BBBBBBBBWBWBW',
    // 'BBBBBBBBBWBWB',
    // 'BBBBBBBBWBWBW',
    // 'BBBBBBBBBWBWB',
    // 'BBBBBBBBWBWBW',
    // 'BBBBBBBBBWBWB',
    // 'BBBBBBBBWBWBW',
    // 'BBBBBBBBBWBWB',
    // 'WWWWWWWWWWBWB',
    // 'WWWWWWWWWWBWB'
    // ];
     
    // const NM = input
    // .shift()
    // .split(' ')
    // .map(num => parseInt(num));
    // const N = NM.shift();
    // const M = NM.shift();
    // const minArr = [];
     
    // const whiteFirst = [
    // 'WBWBWBWB',
    // 'BWBWBWBW',
    // 'WBWBWBWB',
    // 'BWBWBWBW',
    // 'WBWBWBWB',
    // 'BWBWBWBW',
    // 'WBWBWBWB',
    // 'BWBWBWBW'
    // ];
     
    // const blackFirst = [
    // 'BWBWBWBW',
    // 'WBWBWBWB',
    // 'BWBWBWBW',
    // 'WBWBWBWB',
    // 'BWBWBWBW',
    // 'WBWBWBWB',
    // 'BWBWBWBW',
    // 'WBWBWBWB'
    // ];
     
    // function whiteFirstPaint(y, x) {
    // let counter = 0;
     
    // for (let i = y; i < y + 8; i++)
    // for (let j = x; j < x + 8; j++)
    // if (input[i][j] !== whiteFirst[i - y][j - x]) counter++;
     
    // return counter;
    // }
     
    // function blackFirstPaint(y, x) {
    // let counter = 0;
     
    // for (let i = y; i < y + 8; i++)
    // for (let j = x; j < x + 8; j++)
    // if (input[i][j] !== blackFirst[i - y][j - x]) counter++;
     
    // return counter;
    // }
     
    // for (let i = 0; i + 7 < N; i++) {
    // for (let j = 0; j + 7 < M; j++) {
    // minArr.push(whiteFirstPaint(i, j));
    // minArr.push(blackFirstPaint(i, j));
    // }
    // }
     
    // console.log(Math.min.apply(null, minArr));