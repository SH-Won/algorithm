console.log(solution(15))

function solution(n) {
    let nextBigNumber = n.toString(2)
    
    let count = nextBigNumber.split('').filter(num => +num === 1).length;
   
    while(true){
        n++;
        let nextBigNumber = n.toString(2);
        let cnt = nextBigNumber.split('').filter(num => +num === 1).length;
        if(cnt ===count){
            break;
        }
    }
    let answer = n;
    
    return answer;
}