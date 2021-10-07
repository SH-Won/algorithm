
const bfs = (sellerArray,organization,result) =>{
    let queue = sellerArray;
    while(queue.length){
        const [person,price] = queue.shift();
        const recommendPerson = organization[person][0];
        let splitPrice = [];
        let restPrice = 0;
        for(let i=0; i<price.length; i++){
            const sp = Math.floor(price[i] * 0.1);
            if(sp === 0){
                restPrice+=price[i];
            }
            else{
            splitPrice.push(sp);
            restPrice+= price[i] - sp;
            }
        }
        result[person]+=restPrice;
        if(recommendPerson === '-' || splitPrice.length === 0){
           continue;
        }
        else{
          queue.push([recommendPerson,splitPrice]);
        }
    }
}
const getData = (enroll,referral,seller,amount) => {
    let organization = {};
    let result = {};
    let sellerArray = {};
    for(let i=0; i<referral.length; i++){
        const person = enroll[i];
        organization[person] ? organization[person].push(referral[i]) : organization[person] = [referral[i]];
        result[person] = 0;
    }
    for(let i=0; i<seller.length; i++){
        sellerArray[seller[i]] ? sellerArray[seller[i]].push(amount[i]*100) : sellerArray[seller[i]] = [amount[i]*100];
    }
    
    return [organization,sellerArray,result];
}
const solution = (enroll,referral,seller,amount) =>{
    let [organization,sellerArray,result] = getData(enroll,referral,seller,amount);
    bfs(Object.entries(sellerArray),organization,result);
    
    return Object.values(result);
}
const [enroll,referral,seller,amount] = [["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],["young", "john", "tod", "emily", "mary"],[12, 4, 2, 5, 10]];
console.log(solution(enroll,referral,seller,amount));