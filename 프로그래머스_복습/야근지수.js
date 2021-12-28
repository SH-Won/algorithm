const solution = (n,works) =>{
    works.sort((a,b) => a-b);
    while(n){
        const max = works[works.length-1];
        for(let i=works.length-1; i>=0; i--){
            if(n && works[i] >= max){
                works[i]--;
                n--;
                if(works[i] === -1) return 0;
            }
            else break;
        }
    }
    return works.reduce((acc,cur) => acc+=cur**2,0);
}
// console.log(solution([4,3,3],4));
// console.log(solution([2,1,2],1))
console.log(solution([1,1],3))