
console.log(solution("try hello world"))
function solution(s) {
    let answer = s.split(' ').map(string =>{

        return string.split('').map((char,index)=>{
            return index % 2 ===0 ? char.toUpperCase() : char.toLowerCase();
        }).join('')
    })
    return answer.join(' ');
}