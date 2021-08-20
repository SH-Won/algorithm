function solution(arr){
    let answer = 1;
    const gcf = (num1,num2) =>{
        // 3 % 5 = 3
        // 5 % 3 = 2
        // 3 % 2 = 1
        // 2 % 1 = 0
        while(num2 > 0){
            let temp = num2;
            num2 = num1 % num2;
            num1 = temp;
        }
        return num1;

    }
    const lcm = (num1,num2) =>{

        return (num1*num2) / gcf(num1,num2);
    }

    for(let i=0; i<arr.length; i++){
        answer = lcm(answer,arr[i]);
    }
    return answer;
}