// 이분탐색을 이용해야겠다는 생각을 하기까지 시간이 꽤 걸렸다.
const solution = (a,b,g,s,w,t) =>{
    const getRest = (idx,restAmount,jewel) =>{
        if(jewel[idx] < restAmount) return jewel[idx];
        return restAmount;
    }
    const getMaxGold = (time) =>{
        let [totalGold,totalSilver] = [0,0];
        for(let i=0; i<g.length; i++){
            const totalAmount = Math.round(time / (t[i] * 2)) * w[i];
            const gold = g[i] >= totalAmount ? totalAmount : g[i];
            const silver = getRest(i,totalAmount-gold,s);
            totalGold += gold, totalSilver +=silver;
        }
        return [totalGold,totalSilver];
    }
    const getMaxSilver = (time) =>{
        let [totalGold,totalSilver] = [0,0];
        for(let i=0; i<g.length; i++){
            const totalAmount = Math.round(time / (t[i] * 2)) * w[i];
            const silver = s[i] >= totalAmount ? totalAmount : s[i];
            const gold = getRest(i,totalAmount-silver,g);
            totalGold += gold, totalSilver +=silver;
        }
        return [totalGold,totalSilver];
    }
    let [start,end] = [0,10e14*4];
    while(start <= end){
        const mid = Math.floor((start+end) / 2);
        const [maxGold,minSilver] = getMaxGold(mid);
        const [minGold,maxSilver] = getMaxSilver(mid);
        if(maxGold >= a && maxSilver >=b && maxGold + minSilver >= a+b) end = mid - 1;
        else start = mid + 1;
    }
    return start;
}
// console.log(solution(10,10,[100],[100],[7],[10]))
console.log(solution(90,500,[70,70,0],[0,0,500],[100,100,2],[4,8,1]))