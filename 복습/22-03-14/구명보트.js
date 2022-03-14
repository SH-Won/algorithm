const solution = (people,limit) =>{
    people.sort((a,b) => a-b);
    let left = 0;
    let right = people.length - 1;
    let answer = 0;
    while(left < right){
        if(people[left] + people[right] <= limit){
            left++ , right--;
        }
        else right--;
        answer++;
    }
    return left === right ? ++answer : answer;
}