const solution = (n,left,right) =>{
    let answer = [];
    for(let pos = left; pos <=right; pos++){
        const [share,rest] = [pos/n >>0 ,pos % n];
        if(rest <=share){
            answer.push(share+1);
        }
        else{
            answer.push(rest+1);
        }
    }
    return answer;
}
// console.log(solution(3,2,5));
console.log(solution(4,7,14))
