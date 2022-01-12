const solution = (n,s) =>{
    if( s / n >> 0 < 1) return [-1];
    let rest = s % n;
    const share = s/n >>0
    let result = Array(n).fill(share);
    if(rest === 0) return result;
    for(let i=0; i<rest; i++){
        result[result.length-1-i]++;
    }
    return result;
}