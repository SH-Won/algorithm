const solution = (arr) =>{
    let answer = [0,0];
    const quad = (arr)=>{
        const sum = arr.reduce((acc,cur) => acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
        if(sum === 0 || (sum / (arr.length * arr.length)) === 1){
            sum === 0 ? answer[0] ++ : answer[1]++;
            return 0;
        }
        const splitIndex = arr.length / 2;
        const arr1 = arr.slice(0,splitIndex).map(row => row.slice(0,splitIndex));
        const arr2 = arr.slice(0,splitIndex).map(row => row.slice(splitIndex));
        const arr3 = arr.slice(splitIndex).map(row => row.slice(0,splitIndex));
        const arr4 = arr.slice(splitIndex).map(row => row.slice(splitIndex));
        return quad(arr1) + quad(arr2) + quad(arr3) + quad(arr4);
    }
    quad(arr);
    return answer;
}
// console.log(solution([[1,1,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,1]]))
console.log(solution([[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1],[0,0,0,0,1,1,1,1],[0,1,0,0,1,1,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,1],[0,0,0,0,1,0,0,1],[0,0,0,0,1,1,1,1]]))