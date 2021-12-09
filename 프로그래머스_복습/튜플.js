const tuple = (s)=>{

    return s.slice(2,-2).split('},{').map(el => el.split(',').map(Number))
            .sort((a,b)=> a.length - b.length)
            .reduce((acc,cur)=>{
                for(let i=0; i<cur.length; i++){
                    if(!acc.includes(cur[i])){
                        acc.push(cur[i]);
                    }
                }
                return acc;
            },[])
}
const solution = (s)=>{
    return tuple(s);
}
console.log(solution("{{2},{2,1},{2,1,3},{2,1,3,4}}"))