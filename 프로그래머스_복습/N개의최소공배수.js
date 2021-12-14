const gcf = (num1,num2) =>{
    let temp ;
    let multiple = num1*num2;
    while(num2 > 0){
        temp = num2 ;
        num2 = num1 % num2;
        num1 = temp;
    }
    return num1 = multiple / temp;
}
const solution = (arr) =>{
    return arr.reduce(gcf ,1)
}
console.log(solution([2,6,8,14]))