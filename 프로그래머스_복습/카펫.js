const solution = (brown,yellow)=>{
    let answer ;
    
    for(let row = 1; row<=yellow; row++){
        const column = yellow / row;
        const brownCount = row*2 + column*2 + 4;
        if(row < column) continue;
        if(brownCount === brown){
           answer = [row+2,column+2];
           break;
        }
    }
    return answer;
}
console.log(solution(24,24))