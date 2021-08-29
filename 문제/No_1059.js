//const input = ['4','1 7 14 10','2']
//const input =['5','10 20 30 40 50','30'];
const input =['8','3 7 12 18 25 100 33 1000','59']
//const input = ['3','13 10 1','11'];
//const input =['2','2 6','1'];
//const input = ['2','3 8','4'];
//const input = ['2','4 7','2']
//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const L = +input[0];
const S = input[1].split(' ').map(num => +num).sort((a,b)=>a-b);
const n = +input[2];

const index = checkPosition(n);
index === false ? console.log(0) : console.log(goodSection(index));
function goodSection(index){
    const ways = (S[index+1]-1) - n + 1;
    // n 이 구간의 시작일 경우 [n , ];
    const startNsection =ways-1;
    
    if(index ===-1){
        // n 이 집합S 의 배열 첫번째 수보다 작을경우
        // 0 ~ n ~ S[0]  을 생각해야한다.
        // [ , n] 인경우 와 [A,B] A~B 사이에 n 이 있는 경우
        const betweenNSection = ((n-1) - (0+1) +1 ) * ways;
        
        return betweenNSection + startNsection
    } 
     
    // [ , n] 인경우 와 [A,B] A~B 사이에 n 이 있는 경우
    const betteenNSection = ( (n-1) - (S[index]+1) +1 ) * ways;

    return betteenNSection+startNsection;
}


function checkPosition(n){
    

    for(let i=0; i<S.length; i++){
        if(n === S[i]) return false;
        if(n < S[i]) return i-1;
    }
    
}

