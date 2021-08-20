console.log(solution([["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]))
function solution(clothes){
    let answer = 1;
    let clothesMap = {};
    clothes.forEach(([item,category])=>{
        clothesMap[category] = (clothesMap[category] || 1 ) +1
    })
    for(category in clothesMap){
        answer*=clothesMap[category];
    }
    
    return answer-1;
}