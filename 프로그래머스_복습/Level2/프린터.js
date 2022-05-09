const solution = (priorities,location) =>{
    let nth = 0;
    while(true){
        const document = priorities.shift();
        if(priorities.some(element => element > document)){
            priorities.push(document);
        }
        else{
            nth++;
            if(location === 0) return nth;
        }
        location = location - 1 < 0 ? priorities.length-1 : location-1;
    }
}
// console.log(solution([2,1,3,2],2))
console.log(solution([1,1,9,1,1,1],0))