
const solution = (clothes) =>{
    let map = new Map();
    for(let i=0; i<clothes.length; i++){
        const [name,category] = clothes[i];
        map.has(category) ? map.set(category, map.get(category)+1 ) : map.set(category,1);
    }
    let answer = 1;
    for(let [key,value] of map){
        answer *= (value+1);
    }
    return answer - 1;
}
console.log(solution([["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]))