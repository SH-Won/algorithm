//const [str1,str2] = ["FRANCE","french"];
// const [str1,str2] =["handshake","shake hands"]
// const [str1,str2] = ["E=M*C^2","e=m*c^2"];
// const [str1,str2] =["aa1+aa2","AAAA12"];
const getGroupStr = (string) =>{
    let groupArr = [];
    for(let i=0; i<string.length-1; i++){
        const letters = string.substr(i,2);
        if(letters.search(/[^A-Z]/g) >= 0) continue;
        groupArr.push(letters);
    }
    return groupArr;
}
const J = (str1,str2) =>{
    let A = getGroupStr(str1.toUpperCase());
    let B = getGroupStr(str2.toUpperCase());
    console.log(A,B);
    let union = A.length + B.length;
    let interSection = 0;

    for(let i=0; i<B.length; i++){
       const index = A.indexOf(B[i]);
       if(index ===-1) continue;
       else{
           A.splice(index,1);
           interSection++;
       }
    }
    union-=interSection;
    if(union === 0) return 65536

    return Math.floor((interSection / union) *65536)

}

const solution = (str1,str2) =>{
    return J(str1,str2);
}
