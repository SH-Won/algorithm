console.log(solution(626331))

function solution(num) {
    let answer = colatz(num,0)
    function colatz(num,count){
        if(num ===1) return count;
        if(count ===501) return -1

        return num % 2 ===0 ? colatz(num/2,count+1) : colatz(num*3 +1,count+1);

    }
    return answer;
}