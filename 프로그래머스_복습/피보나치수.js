
const solution = (n) =>{
    let fibo = Array(n+1);
    fibo[0] = 0 , fibo[1] = 1;
    for(let i=2; i<=n; i++){
        fibo[i] = (fibo[i-2] + fibo[i-1]) % 1234567;
    }
    return fibo[n];
}