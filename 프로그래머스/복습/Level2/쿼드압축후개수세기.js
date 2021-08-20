// console.log(solution([[1,1,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,1]]))
console.log(solution([[1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1],[0,0,0,0,1,1,1,1],[0,1,0,0,1,1,1,1],[0,0,0,0,0,0,1,1],[0,0,0,0,0,0,0,1],[0,0,0,0,1,0,0,1],[0,0,0,0,1,1,1,1]]))
function solution(arr){
    let [zero,one] = [0,0];
    
    const compression =(arr) =>{
        const n = arr.length **2;
        const arraySum = arr.reduce((acc,cur)=> acc+=cur.reduce((acc,cur)=>acc+=cur,0),0);
        
        if(arraySum === n || arraySum ===0){
            arraySum === n  ? one++ : zero++ ;
            return;
        }

        const splitIndex = arr.length / 2

        const arr1 = arr.slice(0,splitIndex).map(array =>array.slice(0,splitIndex));
        const arr2 = arr.slice(0,splitIndex).map(array => array.slice(splitIndex));
        const arr3 = arr.slice(splitIndex).map(array=>array.slice(0,splitIndex));
        const arr4 = arr.slice(splitIndex).map(array =>array.slice(splitIndex));

        compression(arr1);
        compression(arr2);
        compression(arr3);
        compression(arr4);
    }
    compression(arr);
    return [zero,one]
}