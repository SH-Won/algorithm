const numbers = [3, 30, 34, 5, 9]
console.log(solution(numbers));
let index = 0;
console.log(typeof index.toString());

function solution(numbers){
    let answer =numbers.map(num => num.toString());
     
    // sort() 는 비교 함수를 인자로 받는다
    // 비교함수에서 0보다 작은 수를 리턴하면 a,b의 인덱스는 그대로
    // 0보다 큰수를 리턴하면 b의 인덱스가 a보다 앞선다.

    answer.sort((a,b)=> (b+a) - (a+b) );
    
     
    
     
   return answer.join('')[0] === 0 ? '0': answer.join('');
}

// function solution(numbers){
//     numbers = numbers.map(num => num.toString());
//     let answer ='';
//     let visited = Array(numbers.length).fill(false);
//     let attachArray = [];
    
//     dfs(0,'');
//     answer = Math.max(...attachArray).toString();

//     function dfs(count,number){
        
//         if(count === numbers.length){
//              attachArray.push(Number(number))
//              return;
//         }
//         for(let i=0; i<numbers.length; i++){
//             if(!visited[i]){
//                 visited[i]=true;
//                 dfs(count+1,number+numbers[i]);
//                 visited[i]=false;
//             }
//         }

//     }

//     return answer;
// }

