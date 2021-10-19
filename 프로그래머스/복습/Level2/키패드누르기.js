const phone = {
    1:[0,0],2:[0,1],3:[0,2],
    4:[1,0],5:[1,1],6:[1,2],
    7:[2,0],8:[2,1],9:[2,2],
    0:[3,1]
}
const checkHand = (left,right,number,hand) =>{
    const leftDist = Math.abs(left[0] - phone[number][0]) + Math.abs(left[1] - phone[number][1]);
    const rightDist = Math.abs(right[0] - phone[number][0]) + Math.abs(right[1] - phone[number][1]);

    if(leftDist === rightDist){
        return hand === 'left' ? "L" : "R" 
    }
    else{
        return leftDist < rightDist ? "L" : "R"
    }
}

const solution = (numbers,hand) =>{
    let answer = "";
    let [left,right] = [[3,0],[3,2]];

    for(let i=0; i<numbers.length; i++){
        const number = numbers[i];
        if(number % 3 === 1){
            left = phone[number];
            answer+="L"
        }
        else if(number !==0 && number % 3 === 0){
            right = phone[number];
            answer+="R"
        }
        else{
            answer+=checkHand(left,right,number,hand);
            answer[answer.length-1] === 'L' ? left=phone[number] : right =phone[number]
        }
    }
    return answer.trim();

}