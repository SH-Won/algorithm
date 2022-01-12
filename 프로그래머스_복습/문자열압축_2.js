const splitString = (string,unit) =>{
    let result = [];
    for(let i=0; i<string.length; i+=unit){
        const unitString = string.substr(i,unit);
        result.push(unitString);
    }
    return result;
}
const compression = (stringArr) =>{
    let result = '';
    let temp = stringArr[0] , count = 1;
    for(let i=1; i<=stringArr.length; i++){
        if(temp === stringArr[i]) count++;
        else{
            count === 1 ? result+=temp : result+=`${count+temp}`;
            count = 1 , temp = stringArr[i];
        }
    }
    return result.length;
}
const solution = (s) =>{
    let min = s.length;
    for(let unit=1; unit <= s.length / 2 >>0; unit++){
        const stringArr = splitString(s,unit);
        const length = compression(stringArr);
        min = Math.min(min,length);
    }
    return min;
}
const s = "aabbaccc"
console.log(solution(s))