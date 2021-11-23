// function solution (n, weak, dist) {
//     const len = weak.length;
//     const linear_weak = new Array(len*2 - 1).fill(0);
    
//     for(let i = 0; i < len*2-1; i++)
//       linear_weak[i] = i < len ? weak[i] : weak[i-len] + n;
    
//     dist.sort((a, b) => b-a);
    
//     for(let i = 1; i <= dist.length; i++) {
//       const permutation = getPermutation(dist, i);
      
//       for(const permu of permutation) {
//         for(let j = 0; j < len; j++) {
//           let line = linear_weak.slice(j, len+j);
//           for(const p of permu) {
//             const coverage = line[0] + p;
//             line = line.filter(e => e > coverage);
//             if(!line.length) return i;
//           }
//         }
//       }
//     }
    
//     return -1;
//   }
  
//   const getPermutation = (arr, n) => {
//     if(n === 1) return arr.map(el => [el]);
//     const result = [];
    
//     arr.forEach((fixed, idx, origin) => {
//       const rest = [...origin.slice(0, idx), ...origin.slice(idx+1)];
//       const perms = getPermutation(rest, n-1);
//       const attached = perms.map(perm => [fixed, ...perm]);
//       result.push(...attached);
//     });
    
//     return result;
//   }

const getPermutaion = (arr,n) =>{
    if(n === 1) return arr.map(el => [el]);
    let visited = Array(arr.length).fill(false);
    let result = [];
    let temp = [];
    const permutaion = (count) =>{
        if(count === n){
            result.push([...temp]);
            return;
        }
        for(let i=0; i<arr.length; i++){
            if(!visited[i]){
                visited[i] = true;
                temp.push(arr[i]);
                permutaion(count+1);
                temp.pop();
                visited[i] = false;
            }
        }
    }
    permutaion(0);
    return result;
}
const solution = (n,weak,dist) =>{
    let length = weak.length;
    let weakArr = Array(length*2 - 1);
    for(let i=0; i<weakArr.length; i++){
        weakArr[i] = i < length ? weak[i] : weak[i-length] + n;
    }
    dist.sort((a,b) => b-a);
    for(let i=1; i<=dist.length; i++){
        const friends = getPermutaion(dist,i);
        for(let j=0; j<friends.length; j++){
            for(let k=0; k<length; k++){
                let line = weakArr.slice(k,k+length);
                for(let l=0; l<friends[j].length; l++){
                     const coverRange = line[0] + friends[j][l];
                     line = line.filter(weak => weak > coverRange);
                     if(!line.length) return i; 
                }
            }
        }
    }
    return -1;
}
// console.log(solution(12,[1,5,6,10],[1,2,3,4]));
console.log(solution(12,[1,3,4,9,10],[3,5,7]))