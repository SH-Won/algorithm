const solution = (n,lost,reserve) => {
    let outfit = Array(n+1).fill(1);
    lost.forEach(index => outfit[index]--);
    reserve.forEach(index => outfit[index]++);
    outfit.forEach((num,index) =>{
        if(num >= 1 || index ===0) return;
        if(outfit[index-1] === 2){
            outfit[index]++;
            outfit[index-1]--;
            return;
        }
        if(outfit[index+1] === 2){
            outfit[index]++;
            outfit[index+1]--;
            return;
        }
    })
    return outfit.filter(num => num >=1).length -1;
}