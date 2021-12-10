const solution = (people, limit) =>{
    let left = 0 , right = people.length-1;
    let answer = 0;
    people.sort((a,b)=>b-a)
    while(left < right){
        const sum = people[left] + people[right];
        if(sum <= limit){
            left++ , right--;
        }
        else{
            left++
        }
        answer++;
    }
    return left === right ? answer+1 : answer;
}
// console.log(solution([70,50,80,50],100))
console.log(solution([70,80,50],100))