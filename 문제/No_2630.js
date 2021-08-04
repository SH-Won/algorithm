//-140
// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const input = [
    '8',
    '1 1 0 0 0 0 1 1',
    '1 1 0 0 0 0 1 1',
    '0 0 0 0 1 1 0 0',
    '0 0 0 0 1 1 0 0',
    '1 0 0 0 1 1 1 1',
    '0 1 0 0 1 1 1 1',
    '0 0 1 1 1 1 1 1',
    '0 0 1 1 1 1 1 1'
];
const N = +input[0];
const paper = Array.from({length:N},(_,i)=>input[i+1].split(' '));
// let white =0;
// let blue = 0;
// split(paper);

// console.log(white,blue);
let result = split(paper).reduce((acc,cur)=>{
     acc[0] +=cur[0];
     acc[1] +=cur[1];
     return acc;
},[0,0])
console.log(result.join('\n').trim());

function split(paperArr){
    let [white,blue]=[0,0]
    const splitIndex = paperArr.length / 2 ;
   

    if(checkColor(paperArr)){
        if(paperArr[0][0] === '0'){
            white++;
        }
        else{
          blue++;
        }

        return [[white,blue]];

    }
    // const div1 = dividePaper(paperArr,0,splitIndex,0);
    // const div2 = dividePaper(paperArr,splitIndex,paperArr.length,0);
    // const div3 = dividePaper(paperArr,0,splitIndex,splitIndex);
    // const div4 = dividePaper(paperArr,splitIndex,paperArr.length,splitIndex);

    const [div1,div3] = dividePaper(paperArr,0,splitIndex);
    const [div2,div4] =dividePaper(paperArr,splitIndex,paperArr.length);
    return [].concat(split(div1)).concat(split(div2)).concat(split(div3)).concat(split(div4));
   
}

function checkColor(paperArr){
    let check = true;
    for(let i=0; i<paperArr.length; i++){
       let color = paperArr[i].every(num => num ===paperArr[0][0]);
        if(!color){
             check =false;
             break;
        }   
    }
    return check;
    
}

 function dividePaper(paperArr,start,end){
     
     let divArr = Array.from(paperArr.length);
     for(let i=0; i<paperArr.length; i++){
         divArr[i] = paperArr[i].slice(start,end);
     }
     return [divArr.slice(0,divArr.length/2),divArr.slice(divArr.length/2)]
 }
// function dividePaper(paperArr,xStart,xEnd,yStart){
//     const length = paperArr.length / 2;
//     let divArr = Array(length);
//     for(let i=0; i<length; i++){
//         divArr[i] = paperArr[i+yStart].slice(xStart,xEnd);
//     }

//     return divArr;

// }