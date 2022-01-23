const solution = (cacheSize,cities) =>{
    let answer = 0;
    if(cacheSize === 0) return 5*cities.length;
    const cache = [];
    for(let i=0; i<cities.length; i++){
        const city = cities[i].toUpperCase();
        const index = cache.indexOf(city);
        if(index === -1){
            answer+=5;
            if(cache.length === cacheSize) cache.shift();
            cache.push(city);
        }
        else{
            answer +=1;
            cache.splice(index,1)
            cache.push(city);
        }
    }
    return answer;
}
// console.log(solution(3,["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]))
// console.log(solution(3,["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"]))
// console.log(solution(2,["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]))
// console.log(solution(5,["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]))
// console.log(solution(2,	["Jeju", "Pangyo", "NewYork", "newyork"]))
// console.log(solution(0,["Jeju", "Pangyo", "Seoul", "NewYork", "LA"]))