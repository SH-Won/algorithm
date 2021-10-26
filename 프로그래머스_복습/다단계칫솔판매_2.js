const bfs = (organization,sellerArray) =>{
    let result = Array(organization.length).fill(0);
    let queue = sellerArray;
    while(queue.length){
        const [person,price] = queue.shift();
        const recommendPerson = organization[person];
        let restPrice = 0;
        let splitPrice = [];
        for(let i=0; i<price.length; i++){
            const sp = Math.floor(price[i] * 0.1);
            if(!sp) restPrice+=price[i];
            else{
                splitPrice.push(sp);
                restPrice+=price[i] -sp;
            }
        }
        result[person]+=restPrice;
        if(splitPrice.length === 0 || recommendPerson === null) continue;
        queue.push([recommendPerson,splitPrice]);
    }
    return result;
}
const getData = (enroll,referral,seller,amount) =>{
    let map = new Map();
    let organization = Array(enroll.length);
    let sellerArray = {};
    for(let i=0; i<enroll.length; i++){
        map.set(enroll[i],i);
    }
    for(let i=0; i<referral.length; i++){
        organization[i] = map.has(referral[i]) ? map.get(referral[i]) : null;

    }
    for(let i=0; i<seller.length; i++){
        const person = map.get(seller[i])
        sellerArray[person] ? sellerArray[person].push([amount[i]*100]) : sellerArray[person] = [amount[i]*100];
    }
    sellerArray = Object.entries(sellerArray);
    return [organization,sellerArray];
}

const solution = (enroll,referral,seller,amount) =>{
    const [organization,sellerArray] = getData(enroll,referral,seller,amount);
    return bfs(organization,sellerArray);
}
//const [enroll,referral,seller,amount] = [["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],["young", "john", "tod", "emily", "mary"],[12, 4, 2, 5, 10]];
const [enroll,referral,seller,amount]=[["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],["sam", "emily", "jaimie", "edward"],[2,3,5,4]]
console.log(solution(enroll,referral,seller,amount));