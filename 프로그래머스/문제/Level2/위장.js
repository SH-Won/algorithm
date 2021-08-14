const clothes = [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]];

console.log(solution(clothes));

function solution(clothes){
    let answer = 1;
    let map = {};

    for(let i=0; i<clothes.length; i++){
        // 각 종류의 의상의 갯수 + 그종류의 의상을 벗을 경우의수 1을 더한다.
        // 즉 검정안경,노랑안경이 있으면 안경을 선택할 가짓수는 검정,노랑,벗는경우 3가지이다.
        
        map[clothes[i][1]]=(map[clothes[i][1]] || 1) +1
    }
   for(key in map){
       answer *= map[key];
   }
   // 다 벗는 경우는 1가지
   // 스파이는 무조건 한종류의 의상을 입어야 하기때문에 다벗는 경우는 없다
   return answer -1;
    
}