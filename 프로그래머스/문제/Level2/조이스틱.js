// const solution = name =>{
//     let answer = 0;
//     let i = 0;
//     while(i < name.length){
//         let j = i;
//         while(name[j] === 'A') j++;
//         const [left,right] = [i+name.length-(j-1),j-1];
//         answer+=Math.min(left,right);
        
//         const letter = name[j-1];
//         if(letter === 'A'){

//         }
//         const [left,right] = [91-letter.charCodeAt(),letter.charCodAt()-65];
//         answer += Math.min(left,right);
//         i = j;
//     }
// }
function solution(name) {
    var answer = 0;
    let temp=[];
    for(let i=0;i<name.length;i++) {
        temp.push('A');
        let diff=name[i].charCodeAt()-temp[i].charCodeAt();
        answer+=diff>13 ? 26-diff:diff;
    }
    let minMove=name.length-1;
    // JAAJDA
    for(let i=1;i<name.length;i++){
        if(name[i]==='A'){
            for(var j=i+1;j<name.length;j++){
                if(name[j]!=='A') break;
            }
            const left=i-1;
            const right=name.length-j;
            minMove=Math.min(minMove,left>right ? left+right*2:left*2+right);
            i=j;
        } 
    }
    return answer+minMove;
}

