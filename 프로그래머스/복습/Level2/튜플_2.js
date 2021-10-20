const s = "{{2},{2,1},{2,1,3},{2,1,3,4}}"
const solution = (s) =>{
    const answer = s.slice(2,-2).split('},{').map(str => str.split(',').map(Number))
                    .sort((a,b)=>a.length - b.length)
                    .reduce((acc,cur)=>{
                       return [...acc,...cur.filter(el => !acc.includes(el))]
                    },[])
    return answer;
}
solution(s);