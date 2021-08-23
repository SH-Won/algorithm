// let array = [[0,0,0,0,0,0,0,0],
//              [0,0,0,0,0,0,0,0],
//              [0,0,0,0,0,0,0,0],]
// console.log(array.every(row => row.some(number => number === !array[0][0]) ===false))

const input = [
'0 0 0 1 1 1 -1 -1 -1',
'0 0 0 1 1 1 -1 -1 -1',
'0 0 0 1 1 1 -1 -1 -1',
'1 1 1 0 0 0 0 0 0',
'1 1 1 0 0 0 0 0 0',
'1 1 1 0 0 0 0 0 0',
'0 1 -1 0 1 -1 0 1 -1',
'0 -1 1 0 1 -1 0 1 -1',
'0 1 -1 1 0 -1 0 1 -1',

]

// const fs = require('fs');
// const [N,...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const matrix = input.map(row => row.split(' ').map(num => +num));

const paper =(matrix) =>{
  
    let [minusOne,zero,one]=[0,0,0];
  
  const split = (matrix) => {
    const n = matrix.length;
    //console.log(matrix);
    

    if(n === 1){
        
       return matrix[0][0] === -1 ? minusOne++ : matrix[0][0] === 0 ? zero++ : one++;
       
    }
    const isAllSame = matrix.every(row => row.some(number => number !== matrix[0][0]) ===false)
    
    if(isAllSame){
        const divideSum = matrix.reduce((acc,cur)=>acc+=cur.reduce((acc,cur)=>acc+=cur,0),0)  / (n*n);
        return divideSum === -1 ? minusOne++ : divideSum === 0 ? zero++ : one++;

    }
    const splitCount = matrix.length / 3;
   
    for(let i=0; i<n ; i+=splitCount){
        for(let j=0; j<n; j+=splitCount){
            const splitMatrix = matrix.slice(i,i+splitCount).map(row => row.slice(j,j+splitCount));
            split(splitMatrix)
        }
    }
    
  };
  split(matrix)
  return [minusOne,zero,one]

}
console.log(paper(matrix).join('\n'))