//1 = 1
//2 = 2
//3 = 1 2 / 3 
//4 = 4
//5 = 2 3 / 5
//6 = 1 2 3 / 6
//7 = 3 4 / 7  
//8 = 
//9 = 2 3 4 / 4  5 / 9
//10 = 1 2 3 4 / 10
// 1 2 5 10
// 1 3 5 15
// 
console.log(solution2(10))
function solution(n) {
    
    let answer = 0;
    for(let i=1; i<=Math.floor(n/2); i++){
        let number = i;
        let j = i+1;
        while(number < n){
            number+=j;
            j++
        }
        if(number === n) answer++;
    }
    return answer+1;
}

function solution2(n){
    let answer = 0;

    const isContinuous = (current,sum) =>{
        if(sum ===n) return true;
        if(sum > n) return false;

        return isContinuous(current+1,sum+current);
    }
    for(let i=1; i<=Math.floor(n/2); i++){
        
        isContinuous(i,0) ? answer++ : answer;
    }
    return answer+1;
}
