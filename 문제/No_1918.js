// const input = 'A*(B+C)';
const input = 'A+B';
// const fs =require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim();

const solution = inOrder => {
    inOrder.replace(/[(\/)]/g,"");
    console.log(inOrder);
    let preOrder = '';
    
    const getPreOrder = (start,end,root) =>{
        for(let i=start; i<end; i++){
            if(inOrder[i] === '*' || inOrder[i] === '+' || inOrder[i] === '/' || inOrder[i] === '-' ||inOrder[i] === '('){
                getPreOrder(start,i);
                getPreOrder(i+1,end);
                preOrder+=`${inOrder[i]}`;
            }
        }
        // preOrder += `${inOrder[start]}`;
    }
    getPreOrder(0,inOrder.length);
    console.log(preOrder);
}
solution(input)