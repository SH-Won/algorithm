const getData = (enroll,referral,seller,amount) =>{
    const recommend = Array(enroll.length);
    const sellerMap = new Map();
    const nameMap = new Map();
    enroll.forEach((name,idx) => nameMap.set(name,idx))
    referral.forEach((name,idx) => name ==='-' ? recommend[idx] = null : recommend[idx] = nameMap.get(name));
    seller.forEach((name,idx)=>{
       const nameIndex = nameMap.get(name);
       if(sellerMap.has(nameIndex)){
          const info = sellerMap.get(nameIndex);
          info.push(100 * amount[idx]);
          sellerMap.set(nameIndex,info);
       }
       else sellerMap.set(nameIndex,[100*amount[idx]]);
    })
    return [recommend,Array.from(sellerMap)];
}
const getPersonProfit = (recommend,sellArr) =>{
    const profitArr = Array(recommend.length).fill(0);
    const queue = sellArr;
    while(queue.length){
       const [nameIdx,profit] = queue.shift();
       let totalPrice = 0;
       const nextProfit = [];
       profit.forEach(price =>{
          const restPrice = Math.floor(price * 0.1);
          if(restPrice){
             nextProfit.push(restPrice);
             totalPrice += (price - restPrice);
          }
          else totalPrice += price;
       })
       profitArr[nameIdx] += totalPrice;
       if(recommend[nameIdx] === null || !nextProfit.length) continue;
       queue.push([recommend[nameIdx],nextProfit]);
    }
    return profitArr;
}
const solution = (enroll,referral,seller,amount) =>{
      const [recommend,sellArr] = getData(enroll,referral,seller,amount);
      return getPersonProfit(recommend,sellArr);
}
const [enroll,referral,seller,amount] = [["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],["young", "john", "tod", "emily", "mary"],[12, 4, 2, 5, 10]];
// const [enroll,referral,seller,amount]=[["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],["sam", "emily", "jaimie", "edward"],[2,3,5,4]]
console.log(solution(enroll,referral,seller,amount));

