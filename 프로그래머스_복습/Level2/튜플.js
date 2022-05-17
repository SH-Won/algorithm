
const solution = s =>{
   
    return s.slice(2,-2).split('},{')
            .map(el => el.split(',').map(Number))
            .sort((a,b) => a.length - b.length)
            .reduce((acc,cur) =>{
                cur.forEach(el => !acc.includes(el) ? acc.push(el) : acc)
                return acc;
            },[])
}
console.log(solution("{{2},{2,1},{2,1,3},{2,1,3,4}}"))
