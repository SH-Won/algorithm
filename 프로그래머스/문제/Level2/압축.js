
console.log(solution('KAKAO'))


function solution(msg) {
    let answer = [];
    let dictionary = [];
    for(let i='A'.charCodeAt(); i<='Z'.charCodeAt(); i++){
        dictionary.push(String.fromCharCode(i));
    }
    let i=0;
    let j = 1;
    
    while(i < msg.length){
        
        
        while(dictionary.indexOf(msg.substring(i,i+j)) !== -1 && i+j <=msg.length){
            j++;
        }
       
        
        dictionary.push(msg.substring(i,i+j));
        answer.push(dictionary.indexOf(msg.substring(i,i+j-1)) + 1);
        i= i+j-1;
        j= 1;


    }

    return answer;
}