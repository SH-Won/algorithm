const getPersonProfit = (org,sellInfo) =>{
    let result = Array(org.length).fill(0);
    let queue = sellInfo;
    while(queue.length){
        const [person,sellArr] = queue.shift();
        let nextSellArr = [];
        let restPrice = 0;
        for(let i=0; i<sellArr.length; i++){
            const splitPrice = Math.floor(sellArr[i] / 10);
            if(!splitPrice){
                restPrice +=sellArr[i];
            }
            else{
                nextSellArr.push(splitPrice);
                restPrice+=sellArr[i] - splitPrice;
            }
        }
        result[person]+=restPrice;
        const recommendPerson = org[person];
        if(recommendPerson === null || nextSellArr.length === 0) continue;
         queue.push([recommendPerson,nextSellArr]);
    }
    return result;
}
const getData = (enroll,referral,seller,amount) =>{
    let orgMap = new Map();
    orgMap.set('-',null);
    enroll.forEach((name,index)=> orgMap.set(name,index));
    let organization = Array.from({length:enroll.length},(_,i)=> orgMap.get(referral[i]));
    let sellerMap = new Map();
    for(let i=0; i<seller.length; i++){
        const person = orgMap.get(seller[i]);
        if(!sellerMap.has(person)){
           sellerMap.set(person,[100*amount[i]]);
        }
        else{
            const array = sellerMap.get(person);
            array.push(100*amount[i]);
            sellerMap.set(person,array);
        }
    }
    return [organization,Array.from(sellerMap)];
}
const solution = (enroll,referral,seller,amount) =>{
    const [org,sellerInfo] = getData(enroll,referral,seller,amount);
    return getPersonProfit(org,sellerInfo);
}
const [enroll,referral,seller,amount] = [["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],["young", "john", "tod", "emily", "mary"],[12, 4, 2, 5, 10]];
console.log(solution(enroll,referral,seller,amount));