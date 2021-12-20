// const getCandidation = (orders) =>{
//     let orderMap = new Map();
//     let maxCountMap = new Map();

//     const combination = (cur,order,index)=>{
//         if(cur.length >= 2){
//             orderMap.set(cur, orderMap.get(cur) ? orderMap.get(cur)+1 : 1);
//             maxCountMap.set(cur.length, maxCountMap.get(cur.length) ? orderMap.get(cur) > maxCountMap.get(cur.length) ? orderMap.get(cur) : maxCountMap.get(cur.length) : 1);
//         }
//         for(let i=index; i<order.length; i++){
//             const next = cur+order[i];
//             combination(next,order,i+1);
//         }
//     }
    
//     for(let i=0; i<orders.length; i++){
//         const order = orders[i].split('').sort().join('');
//         combination("",order,0);
//     }
   
//     return [Array.from(orderMap),maxCountMap];
// }

// const solution = (orders,course)=>{
//     const [candidation,maxCountMap] = getCandidation(orders);
//     return course.reduce((acc,length) =>{
//         const max = maxCountMap.get(length);
//         if(max < 2) return acc;
//         const candi  = candidation.filter(el => el[0].length === length && el[1] === max).map(el => el[0]);
//         return [...acc,...candi];
//     },[]).sort();

// }
// console.log(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],[2,3,4]))




const getCandidation = (orders) =>{
    let orderMap = new Map();
    let maxCountMap = new Map();

    const combination = (cur,order,index)=>{
        if(cur.length >= 2){
            orderMap.set(cur, orderMap.get(cur) ? orderMap.get(cur)+1 : 1);
            maxCountMap.set(cur.length, maxCountMap.get(cur.length) ? orderMap.get(cur) > maxCountMap.get(cur.length) ? orderMap.get(cur) : maxCountMap.get(cur.length) : 1);
        }
        for(let i=index; i<order.length; i++){
            const next = cur+order[i];
            combination(next,order,i+1);
        }
    }
    
    for(let i=0; i<orders.length; i++){
        const order = orders[i].split('').sort().join('');
        combination("",order,0);
    }
   
    const result = Array.from(orderMap).filter(el =>{
        const [order,count] = el;
        const max = maxCountMap.get(order.length);
        if(max >=2 && count === max){
            return el;
        }
    }).map(el => el[0])
    return result;
}

const solution = (orders,course)=>{
    const candidation = getCandidation(orders);
    return candidation.filter(order => course.includes(order.length)).sort();

}
console.log(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],[2,3,4]))