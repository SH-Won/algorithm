const splitString = (s,unit) =>{
    let stringArr = [];
    for(let i=0; i<s.length; i+=unit){
        stringArr.push(s.substr(i,unit));
    }
    return stringArr;
}
const compression = (stringArr) =>{
    let str = "";
    let temp =stringArr[0];
    let count = 1;
    for(let i=1; i<=stringArr.length; i++){
        const next = stringArr[i];
        if(temp === next){
           count++;
        }
        else{
            count === 1 ? str+=temp : str+=`${count}${temp}`
            count =1;
            temp = next;
        }
    }
    console.log(str);
    return str.length;
}

const solution = (s) =>{
    let min = s.length;
    for(let unit=1; unit <= (s.length / 2); unit++){
        let stringArr = splitString(s,unit);
        const cMin = compression(stringArr);
        cMin < min ? min=cMin : min 
    }
    return min
}
const s = "abcabcabcabcdededededede"
console.log(solution(s))