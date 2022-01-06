//const fs = require('fs');
//const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
// const input = ['mirkovC4nizCC44','C4'];
const input = ['12ab112ab2ab','12ab']

const solution = (input) =>{
    let string = input[0];
    const splitWord = input[1];
    while(true){
       const index = string.search(splitWord);
       if(index === -1) return console.log(string ==='' ? 'FRULA' : string);
       string = string.substring(0,index) + string.substring(index+splitWord.length);
    }
}
solution(input);



// let str = input[0].trim();
// let explode_str = input[1].trim();
// let len = explode_str.length;
// let stack = [];
// for (let i = 0; i < str.length; i++) {
//   let flag = false;
//   if (str[i] === explode_str[len - 1]) {
//     for (let j = 0; j < len - 1; j++) {
//       if (stack[stack.length - (j + 1)] === explode_str[len - (j + 2)]) {
//         continue;
//       }
//       flag = true;
//       break;
//     }
//     if (flag) {
//       stack.push(str[i]);
//     } else {
//       for (let k = 0; k < len - 1; k++) {
//         stack.pop();
//       }
//     }
//   } else {
//     stack.push(str[i]);
//   }
// }
// let result = stack.join("");
// if (result === "") {
//   console.log("FRULA");
// } else {
//   console.log(stack.join(""));
// }