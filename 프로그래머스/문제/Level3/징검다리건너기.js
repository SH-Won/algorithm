// const solution = (stones,k) =>{
//     let people = 0;
//     while(true){
//        let pos = -1 ;
//        while(pos < stones.length){
//            let isPossible = false , jump = k;
//            while(jump-- ){
//                pos++;
//                if(stones[pos] || pos >=stones.length){
//                    isPossible = true;
//                    break;
//                }
//            }
//            if(isPossible && pos >=stones.length) people++;
//            if(isPossible && pos < stones.length){
//                stones[pos]--;
//            }
//            if(!isPossible) return people;
//        }
//     //    console.log(stones);
//     }
// }
// const solution = (stones,k) =>{
//     let people = 0;
//     while(true){
//         let jump = 0;
//         for(let i=0; i<stones.length; i++){
//             if(jump === k-1 && !stones[i]) return people;
//             if(!stones[i]) jump++;
//             else if(stones[i]){
//                 stones[i]--;
//                 jump = 0;
//             }
            
//         }
//         if(jump < k) people++;
//     }
// }

function checkStone(stones, mid, k) {
    let now = 0; // 몇개가 연속으로 0 미만이 되었는지
    for(let i = 0; i < stones.length; i++) {
        if(stones[i] < mid) { // mid가 더 크면 stones[i] - mid 가 0보다 작다는 소리다. 그러면 마지막 사람이 지나가기 전에 돌이 0이 됐다는 소리다.
          // 만약 딱 0이라면 자신이 지나가고 나서 0이 되므로 지나갈 수 있다는 소리.
            now += 1;
        }
        else { // 지나갈 수 있을 땐 연속으로 못 지나가는게 초기화 됨.
            now = 0;
        }
        if(now >= k) { // 연속으로 못 지나가는 개수가 k보다 크거나 같으면 통과 못 하는 것.
            return false;
        } 
    } 
    
    return true;
}
function solution(stones, k) {
    let left = 1; // 최소, 최대값
    let right = 200000000;

    while(left < right-1) {
        let mid = parseInt((left + right) / 2);
        if (checkStone(stones, mid, k)) {
            left = mid;
        }
        else {
            right = mid;
        }
    }

    return left;
}

console.log(solution([2,4,5,3,2,1,4,2,5,1],3));