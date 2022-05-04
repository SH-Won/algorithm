const solution = word =>{
    // AAAAA -> AAAAE   +1 필요
    // AAAA -> AAAE  +5+1 필요 
    // AAA -> AAE    (+5+1)*5 + 1 필요
    const PLUS = [((6*5+1)*5+1)*5+1,(6*5+1)*5+1,6*5+1,6,1];
    const VALUE = {
        'A':0,'E':1,'I':2,'O':3,'U':4
    }
    return word.split('').reduce((acc,w,idx)=> acc+=(VALUE[w]*PLUS[idx]+1),0);
}
console.log(solution('EIO'))