// const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();

// 값을 최대로 만들기 위해서는 + 연산을 하는 양쪽 숫자를 괄호를 이용해서 더하고
// 양쪽 숫자를 더한 값들을 배열에 넣어준다.
// 즉 입력받은 input 을 - 을 기준으로 자르고,
// 자른 배열의 원소를 또 +을 기준으로 잘라 더한 원소를 다시 배열에 담는다
const input ='60+40-55-50+40-40+60+70-80';
let arr = input.split('-');
// [55,50+40];
let result = arr.reduce((acc,cur,index)=>{
    if(!cur.includes('+')) acc.push(+cur);
    else{
        let result =
        cur.split('+').reduce((sum,cur)=>{
            
            sum+= Number(cur);
            return sum;
        },0)
        acc.push(result);
    }
    return acc;

},[])

console.log(result);
let value = result[0];

for(let i=1; i<result.length; i++){
    value -=result[i];
}
console.log(value);


