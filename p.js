let string = "{{2},{2,1},{2,1,3},{2,1,3,4}}"


const tuple = (s)=>{
    const elements = s.split('},{').map(element => element.split(',').map(Number)).sort((a,b)=> a.length - b.length);
   const result = elements.reduce((acc,element)=>{
       element.forEach(el =>{
           if(!acc.includes(el)) acc.push(el);
       })
       return acc;
   },[])
   return result;
}
const solution = (s) =>{
    return tuple(s.slice(2,-2));
}
console.log(solution(string));