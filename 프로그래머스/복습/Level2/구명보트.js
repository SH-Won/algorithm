function solution(people,limit){
    // [90,80,80,70,60,50,50,50,40,30,20,10];
    people.sort((a,b)=>b-a);
    let answer = 0;
    let [left,right] = [0,people.length-1];

    while(left < right){

        if(people[left] + people[right] <=limit){
            left++;
            right--;
        }
        else{
            left++;
        }
        answer++;
    }
    if(left===right) answer++;

    return answer;
}