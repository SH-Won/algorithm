 console.log(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],[2,3,4]))
//console.log(solution(["XYZ", "XWY", "WXA"],[2,3,4]))
function solution(orders,course){
    let orderMap = new Map(); // {'AB': 2}
    let maxCountMap = new Map(); //{2 : 3}
    let answer ;
    const combination = (curStr,index,str) =>{

        if(course.indexOf(curStr.length) !==-1){
            const count = orderMap.get(curStr) || 0;
            orderMap.set(curStr,count+1);

            const max = maxCountMap.get(curStr.length) || 0;

            if(max < count+1) maxCountMap.set(curStr.length,count+1);

        }


        for(let i=index; i<str.length; i++){
            const nextStr = curStr+str[i];
            combination(nextStr,i+1,str);
        }

    }

    for(let i=0; i<orders.length; i++){
        let str = orders[i].split('').sort().join('');
        combination("",0,str);
    }
    console.log(orderMap)
    console.log(maxCountMap)
    answer= course.map(length =>{
          const maxCount = maxCountMap.get(length);
          const result = Array.from(orderMap)
                   .filter(order => order[0].length === length && order[1] >= 2 && order[1] ===maxCount)
                   .map(order => order[0]);
          return result
    })
    return answer.reduce((acc,cur)=> [...acc,...cur],[]).sort();

    

}