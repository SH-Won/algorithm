//const [orders,course] =[["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],[2,3,4]];
const [orders,course] =[["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"],[2,3,5]]
//console.log(solution(orders,course));
// const map = new Map();
// map.set('AB',1);
// map.set('AC',2);
// map.set('A3',5);
// map.set('BB',1);
// console.log(map);
// for(let [key,value] of map){
//     if(value < 2) map.delete(key);
// }
// console.log(map);
function solution(orders,course){
    let orderMap = {};
    let maxOrderMap = {};

    const combination = (index,curOrder,order) =>{
        if(curOrder.length >= 2){
            orderMap[curOrder] = ( orderMap[curOrder] || 0 ) + 1;
            const length = curOrder.length;
            const count = orderMap[curOrder];
            maxOrderMap[length] = count > (maxOrderMap[length] || 0) ?
                                  count : maxOrderMap[length];
        }
        for(let i=index; i<order.length; i++){
            const nextOrder = curOrder + order[i];
            combination(i+1,nextOrder,order);
        }
    }
    for(let i=0; i<orders.length; i++){
        const order = orders[i].split('').sort().join('');
        combination(0,"",order);
    }
    const result = course.reduce((acc,cur,index)=>{
        const max = maxOrderMap[cur];
        const orders = Object.entries(orderMap)
                    .filter(order => (order[1] === max && order[0].length === cur && order[1] >=2)).map(order =>order[0]);
        return [...acc,...orders];        
        
    },[])
    return result.sort();
}