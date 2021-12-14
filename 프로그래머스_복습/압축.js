const solution = (msg) =>{
    let answer = [];
    let dictionary = Array(26).fill().map((_,i) => String.fromCharCode(i+65));
    let i = 0;
    while(i < msg.length){
        let j = i+1;
        while(dictionary.indexOf(msg.substring(i,j)) !== -1 && j<=msg.length){
            j++;
        }
        const letterIndex = dictionary.indexOf(msg.substring(i,j-1));
        dictionary.push(msg.substring(i,j));
        answer.push(letterIndex+1);
        i = j-1
    }
    return answer;
}

console.log(solution('ABABABABABABABAB'))
