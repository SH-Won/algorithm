const solution = (a,b,g,s,w,t) =>{

    const getRest = (index,amount,jewel) =>{
        if(jewel[index] >= amount) return amount;
        return jewel[index];
    }
    const getMaxGold = time =>{
        let totalGold = 0;
        let totalSilver = 0;
        for(let i=0; i<w.length; i++){
            const amount = w[i] * Math.round(time / (t[i]*2));
            const gold = g[i] >= amount ? amount : g[i];
            const silver = getRest(i,amount-gold,s);
            totalGold += gold , totalSilver+=silver;
        }
        return [totalGold,totalSilver];
    }
    const getMaxSilver = time =>{
        let totalSilver = 0;
        let totalGold = 0;
        for(let i=0; i<w.length; i++){
            const amount = w[i] * Math.round(time / (t[i]*2));
            const silver = s[i] >= amount ? amount : s[i];
            const gold = getRest(i,amount-silver,g);
            totalSilver+=silver, totalGold += gold ;
        }
        return [totalSilver,totalGold];
    }
    let left = 0;
    let right = 10e14 * 4;
    let minTime = Infinity;
    while(left <= right){
        const time = Math.floor((left+right) / 2);
        const [maxGold,minSilver] = getMaxGold(time);
        const [maxSilver,minGold] = getMaxSilver(time);
        if(maxGold >= a && maxSilver >= b && maxGold+minSilver >= a+b){
            right = time-1;
            minTime = time;
        }
        else left = time+1;
    }
    return minTime;
}
