const solution = numbers =>{
    for(let i=0; i<numbers.length; i++){
        const num = numbers[i];
        const limit = Math.log2(numbers[i]) >> 0 ;
        let j = 0;
        for(j=0; j<=limit; j++){
           if(!(num & (1<<j))) break;
        }
        if(j === limit+1) numbers[i] = (1<<j)|(1<<limit ^ num) 
        else{
            let count = 1;
            let temp = num + (1<<j);
            for(let k=j-1; k>=0; k--){
                if(count === 2) break;
                if((num & (1<<k))){
                    count++;
                    temp -= (1<<k);
                }
            }
            numbers[i] = temp;
        }
    }
    return numbers;
}
console.log(solution([2,10]))

