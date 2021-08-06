
console.log(solution(1,1));
console.log(17/8);
function solution(w,h){
    let answer = 0;
    
    for(let i=0; i<w; i++){
        let height = Math.floor( (h/w) * i) * 1;
        
        answer +=height*2;
    }
    

   return answer;
}