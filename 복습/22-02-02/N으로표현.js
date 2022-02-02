const solution = (N,number) =>{
    let setArr = Array.from({length:9},(_,i)=> new Set([+N.toString().repeat(i)]));
    for(let i=1; i<9; i++){
        for(let j=1; j<i; j++){
            for(const val1 of setArr[j]){
                for(const val2 of setArr[i-j]){
                    setArr[i].add(val1+val2);
                    setArr[i].add(val1-val2);
                    setArr[i].add(val1*val2);
                    setArr[i].add(Math.floor(val1/val2));
                }
            }
        }
        if(setArr[i].has(number)) return i;
    }
    return -1;
}
console.log(solution(5,12));
console.log(solution(2,11))