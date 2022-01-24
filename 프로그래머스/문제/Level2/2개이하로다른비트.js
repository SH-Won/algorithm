// const solution = numbers =>{
//     for(let i=0; i<numbers.length; i++){
//         const num = numbers[i];
//         const limit = Math.log2(numbers[i]) >> 0 ;
//         let j = 0;
//         for(j=0; j<=limit; j++){
//            if(!(num & (1<<j))) break;
//         }
//         if(j === limit+1) numbers[i] = (1<<j)|(1<<limit ^ num) 
//         else{
//             let count = 1;
//             let temp = num + (1<<j);
//             for(let k=j-1; k>=0; k--){
//                 if(count === 2) break;
//                 if((num & (1<<k))){
//                     count++;
//                     temp -= (1<<k);
//                 }
//             }
//             numbers[i] = temp;
//         }
//     }
//     return numbers;
// }
// 11000011 11000101 , 10011011 
const solution = numbers =>{
    let answer = Array(numbers.length);
    for(let i=0; i<numbers.length; i++){
        const number = numbers[i];
        if(number % 2 === 0){
            answer[i] = number+1;
        }
        else{
            const bit = '0' + number.toString(2);
            const index = bit.lastIndexOf('0');
            answer[i] = parseInt(bit.slice(0,index)+'10'+bit.slice(index+2),2)
            console.log(answer[i])
        }
    }
    return answer;
}
console.log(solution([0,7]))

console.log(Math.log2(1))
console.log(10**15 > 2**53-1)