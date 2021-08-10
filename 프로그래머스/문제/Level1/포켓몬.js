const nums =[3,3,3,2,2,4]
console.log(solution(nums));
function solution(nums){
    let answer = 0;
    const n = nums.length / 2;
    let numArr = nums.filter((num,index)=> nums.indexOf(num) === index);
    
    numArr.length >= n ? answer= n : answer=numArr.length
    return answer;
}