// 순열과 조합의 개념을 알고 있으면 푸는데 굉장히 도움이 된다.
// AB 나 BA 나 어찌하든 A,B 를 두개 고른것이다 
// A,B,C 중 두개를 고르는 일은 3C2 로 3가지 이다. AB AC BC 
// AB 나 BA 는 같기 때문이다.
console.log(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],[2,3,4]))
function solution(orders,course){
    let answer ;
    let orderMap = {}; // { 'AB' : 2}
    let maxCountMap = {}; // {2 : 3}

    const combination = (order,idx,str) =>{

        if(course.indexOf(order.length) !==-1){
           const count = (orderMap[order] || 0 ) + 1;
           orderMap[order] = count ;
           const max = maxCountMap[order.length] || 0;

           if(max < count) maxCountMap[order.length] = count

        } 


        for(let i=idx; i<str.length; i++){
            const nextOrder = order + str[i];
            combination(nextOrder,i+1,str)

        }

    }
    for(let i=0; i<orders.length; i++){
        let str = orders[i].split('').sort().join('');
        combination("",0,str);
    }
    // console.log(orderMap);
    // console.log(maxCountMap)
    // console.log(Array.from(Object.entries(orderMap)))
    
    answer = course.map(length =>{
        const max = maxCountMap[length];
        const result = Array.from(Object.entries(orderMap))
                      .filter(order => order[0].length === length && order[1] >=2 && order[1] ===max)
                      .map(order => order[0]);
        return result;
    })

    console.log(answer);
    
    return answer.reduce((acc,cur)=>{
        return [...acc,...cur]
    }).sort();
    

}