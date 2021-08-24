const fs = require('fs');
const [N,...arr]=fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// const [N,...arr]=['3','1 45000','6 10','13 17']
function gcf(num1,num2){
    if(num1 ===1 || num2 === 1) return 1

    while(num2 > 0){
        const temp = num2;
        num2 = num1 % num2;
        num1 = temp;
    }
    return num1;
}
function lcm(num1,num2){
    return (num1 * num2) / gcf(num1,num2);
}

let answer = '';
for(let i=0; i<+N; i++){
    const [num1,num2] = arr[i].split(' ').map(num => +num);
    answer+=""+(num1*num2)/gcf(num1,num2)+"\n"
}
console.log(answer.trim());