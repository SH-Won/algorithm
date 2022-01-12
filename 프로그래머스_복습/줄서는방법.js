const solution = (n,k) =>{
    // k번째
    let people = Array(n).fill().map((v,i)=>i+1);
    let result = [];
    k--;
    while(n--){
        let nth = 1;
        for(let i=1; i<=n; i++){
           nth*=i;
        }
        const current = Math.floor(k / nth) % people.length;
        result.push(...people.splice(current,1));  
    }
    return result;
}
console.log(solution(3,5));