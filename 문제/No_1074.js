const [N,y,x] = [3,7,7];
//const fs = require('fs');
//const [N,y,x] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);
const size = Math.pow(2,N) / 2;
const solution = (r,c,N,curNum) =>{

    if(N === 0) return curNum;

    const size = Math.pow(2,N-1) / 2 ;
    const number = Math.pow(4,N-1);
    if(y < r && x < c){
        const nextNumber = number*0 +curNum
        return solution(r-size,c-size,N-1,nextNumber);
    }
    else if(y < r && x >= c){
        const nextNumber = number*1 +curNum
        return solution(r-size,c+size,N-1,nextNumber);
    }
    else if(y >=r && x < c){
        const nextNumber = number*2 +curNum
        return solution(r+size,c-size,N-1,nextNumber);
    }
    else{
        const nextNumber = number*3 +curNum
        return solution(r+size,c+size,N-1,nextNumber);
    }
    

}
const answer = solution(size,size,N,0);
console.log(answer);
