
const [brown,yellow]=[24,24];

console.log(solution(brown,yellow));

function solution(brown,yellow){
    let answer = [];

    let totalCount = brown + yellow;
    
    for(let x=yellow; x>=Math.sqrt(yellow); x--){
        let y = yellow / x;
        let around = x*2 + y*2 + 4;
        if( x*y === yellow && around+yellow ===totalCount){
            answer.push([x+2,y+2])
        }

        
    }

    return answer[0];
}