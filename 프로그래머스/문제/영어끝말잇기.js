const solution = (n,words) =>{
    let answer = [0,0];
    for(let i=1; i<words.length; i++){
        const [endLetter,startLetter] = [words[i-1],words[i]];
        console.log(endLetter,startLetter);
        if(words.slice(0,i).includes(startLetter) || endLetter[endLetter.length-1] !== startLetter[0]){
            console.log(words.slice(0,i));
            answer[0] = (i % n) +1;
            answer[1] = Math.floor(i/n) + 1;
        }
}
    return answer;
}
let array = ["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"]
//let array = ["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"]
console.log(solution(3,array))

// function solution(n,words){
//     let answer =[0,0];
//     let array = [];
//     for(let i=1; i<words.length; i++){
//         const [pre,cur] = [words[i-1],words[i]];
//         array.push(pre);
        
//         const isExist = array.indexOf(words[i]);
        
//         if(pre[pre.length-1] !== cur[0] || isExist !== -1){
//             let person = (i % n) + 1;
//             let round = Math.floor(( i / n)) +1
//             answer =[person,round];
//             break;
//         }
        
//     }

//     return answer;
// }