
console.log(solution("{{4,2,3},{3},{2,3,4,1},{2,3}}"))
function solution(s){
    let answer ;
    
    let tueple = s.substring(2,s.length-2).split('},{').map(string => string.split(',').map(num =>+num))
                 .sort((a,b)=>a.length - b.length);
                
    answer  = tueple.reduce((acc,cur)=>{
        
        return [...acc,...cur.filter(num => !acc.includes(num))]
    },[])

    return answer;
}