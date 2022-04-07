const solution = clothes =>{
    const info = {};
    clothes.forEach(([cloth,category])=>{
        if(!info[category]) info[category] = [cloth];
        else info[category].push(cloth);
    })
    let answer = 1;
    for(let key in info) answer *= info[key].length+1;
    return answer - 1;
}
// console.log(solution([["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]))
console.log(solution([["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]]))
