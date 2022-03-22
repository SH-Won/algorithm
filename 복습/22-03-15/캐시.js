const solution = (cacheSize,cites) =>{
    let time = 0;
    if(cacheSize === 0) return cites.length * 5;
    const cache = new Set();
    for(let i=0; i<cites.length; i++){
        const city = cites[i].toUpperCase();
        if(!cache.has(city)){
            time += 5;
            if(cache.size === cacheSize) cache.delete(cache.values().next().value);
            cache.add(city);
        }
        else{
            time += 1;
            cache.delete(city);
            cache.add(city);
        }
    }
    return time;
}
// console.log(solution(3,["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]))
// console.log(solution(3,["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"]))
// console.log(solution(2,	["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]))
// console.log(solution(5,["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]))
// console.log(solution(2,["Jeju", "Pangyo", "NewYork", "newyork"]))