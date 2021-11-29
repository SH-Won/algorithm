const getCombination = (orders) =>{
    let orderMap = new Map();
    let maxOrderMap = new Map();

    const combination = (index,combi,order) =>{
        if(combi.length >=2){
           orderMap.has(combi) ? orderMap.set(combi,orderMap.get(combi)+1) : orderMap.set(combi,1);
           !maxOrderMap.has(combi.length) && maxOrderMap.set(combi.length,0); 
           const count = orderMap.get(combi);
           const max = maxOrderMap.get(combi.length);
           count > max && maxOrderMap.set(combi.length,count);
           
        }
        for(let i=index; i<order.length; i++){
            const nextCombi = combi + order[i];
            combination(i+1,nextCombi,order);
        }
    }
    for(let i=0; i<orders.length; i++){
        const order = orders[i].split('').sort().join('');
        combination(0,"",order);
    }
    const orderArr = Array.from(orderMap);
    return [orderArr,maxOrderMap];
}

const solution = (orders,course) =>{
    const [orderArr,maxOrderMap] = getCombination(orders,course);
    let result = course.reduce((acc,length)=>{
        const max = maxOrderMap.get(length);
        if(max < 2) return acc;
        const candidated = orderArr.filter(order =>{
            const [menu,count] = order;
            if(menu.length === length && count === max) return order;
        }).map(order => order[0]);
        return [...acc,...candidated]
    },[])
    return result.sort();
}
const orders=["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"];
const course =[2,3,4];
// const orders =["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"];
// const course = [2,3,5];
//const orders = ['XYZ','XWY','WXA'];
//const course = [2,3,4];
console.log(solution(orders,course));
