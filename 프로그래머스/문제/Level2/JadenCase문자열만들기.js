console.log(solution("for  the last week"))
//console.log("for  the last week".toLowerCase().split(' '))

function solution(s){

    
    let answer =s.toLowerCase().split(' ').map(el =>{
        const word = el ==="" ? "" : el[0].toUpperCase() + el.slice(1,el.length);
        
        return word
    }).join(' ');
    return answer;
}