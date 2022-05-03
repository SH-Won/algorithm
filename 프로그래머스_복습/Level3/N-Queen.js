const solution = n =>{
    const yPos = Array(n).fill(null);
    let answer = 0;
    const isPuttable = (nth,x) =>{
        for(let i=nth-1; i>=0; i--){
            if(yPos[i] === x) return false;
            const [dy,dx] = [nth-i , Math.abs(x - yPos[i])];
            if(dy === dx) return false;
        }
        return true;
    }
    const putQueen = nth =>{
        if(nth === n) return answer++;
        for(let x=0; x<n; x++){
            if(isPuttable(nth,x)){
                yPos[nth] = x;
                putQueen(nth+1);
            }
        }
    }
    putQueen(0);
    return answer;
}
console.log(solution(4));