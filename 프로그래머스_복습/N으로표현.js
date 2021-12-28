const solution = (N,number) =>{
    let setArr = Array.from({length:9},()=> new Set([]));
    for(let i=1; i<=8; i++){
        setArr[i].add(parseInt(N.toString().repeat(i)));
        for(let j=1; j<i; j++){
            for(let val1 of setArr[j]){
                for(let val2 of setArr[i-j]){
                    setArr[i].add( val1 + val2);
                    setArr[i].add(val1 - val2);
                    setArr[i].add(val1 * val2);
                    setArr[i].add(Math.floor(val1/val2));
                }
            }
        }
        if(setArr[i].has(number)) return i;
    }
    return -1
}