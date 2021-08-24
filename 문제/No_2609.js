const fs = require('fs');
const [num1,num2] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(num => +num);

function gcf(num1,num2){

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
const GCF = gcf(num1,num2);
const LCM = (num1*num2) / GCF;

console.log(""+GCF+"\n"+""+LCM);
