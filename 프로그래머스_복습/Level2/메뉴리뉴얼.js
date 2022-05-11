const getCombination = (max,order) =>{
    if(max === 1) return order.map(el => el);
    const result = [];
    order.forEach((el,idx,origin) =>{
        const rest = origin.slice(idx+1);
        const combi = getCombination(max-1,rest);
        const attach = combi.map(com => el+com);
        result.push(...attach);
    })
    return result;
}
const record = (order,orderMap,maxCountMap) =>{
    orderMap[order] = (orderMap[order] || 0 ) + 1;
    const count = orderMap[order];
    const length = order.length;
    maxCountMap[length] = Math.max( (maxCountMap[length] || 0) , count);
}
const solution = (orders,course) =>{
     let orderMap = {};
     let maxCountMap = {};

     orders.forEach(menu =>{
         const orderArr = menu.split('').sort();
         for(let max=2; max<=orderArr.length; max++){
             const combination = getCombination(max,orderArr);
             for(let i=0; i<combination.length; i++){
                 record(combination[i],orderMap,maxCountMap);
             }
         }
     })
     const menu = Object.entries(orderMap).filter(order => order[1] >= 2);
     const answer = course.reduce((acc,length) =>{
         const count = maxCountMap[length];
         const orders = menu.filter(order => order[0].length === length && order[1] === count);
         acc.push(...orders.map(el => el[0]));
         return acc;
     },[])
     return answer.sort();
}
console.log(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],[2,3,4]))