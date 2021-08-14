const s ="{{4,2,3},{3},{2,3,4,1},{2,3}}"
console.log(s.slice(2,-2).split('},{'));



const tupleForm = (str) => 
    str.slice(2,-2).split('},{')
    .map(array => stringToNumArr(array))
    .sort((a,b)=>a.length - b.length)
    .reduce((acc,cur) =>{
        return [...acc,...cur.filter(el => !acc.includes(el))];
    },[])

const stringToNumArr = (array) =>
      array.split(',').map(num => +num);

const solution = (s)=>{
    return tupleForm(s);

}
console.log(solution(s));
// function solution(s){
//     let answer =[]
//     let map = new Set([]);
//     let string = s.substring(1,s.length-1);
//     let strArr = string.split('},{');
    
//     strArr[0] = strArr[0].substring(1);
//     strArr[strArr.length-1] = strArr[strArr.length-1].substring(0,strArr[strArr.length-1].length-1)

//     let array = [];
//     for(let i=0; i<strArr.length; i++){
//         const arr = strArr[i].split(',').map(num =>+num);
//         array.push(arr);
//     }
    
//     array.sort((a,b)=>a.length -b.length);
//     //console.log(strArr);
//     //console.log(array);
//     for(let i=0; i<array.length; i++){
//         array[i].forEach(num => map.add(num));
//     }
   
//     for(let key of map){
//         answer.push(key);
//     }
//     return answer;

// }