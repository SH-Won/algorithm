// 최소공배수  = (a * b) / (a,b의 최대공약수)

// const gcf =(a,b)=>{
//     // a % b = c  c가 1이면 return b
//     // b % c = d  d가 1이면 return c
//     // 2 % 4 = 2
//     // 4 % 2 = 0
    
//     while(b > 0){
//         let temp = b;
//         b= a % b;
//         a = temp;
//     }
//     return a;


// }
const gcf = (a,b)=>{
    let mod = a%b;
    if(mod === 0){
        return b;
    }
    return (b,mod);
}
const lcm = (a,b) =>{

    return (a*b) / gcf(a,b);
}

function solution(arr){
    let answer = 1;
    for(let i=0; i<arr.length; i++){
        answer =  lcm(answer,arr[i]);
    }
    return answer;

}