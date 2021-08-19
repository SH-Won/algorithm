

function solution(str1,str2){


    const splitString = (str) =>{
        let strArray = [];
        for(let i=0; i<str.length-1; i++){
            let letters = str.toUpperCase().substring(i,i+2);
            if(letters.search(/[^A-Z]/) >= 0) continue
            strArray.push(letters);
        }
        return strArray;
    }
    let str1_arr = splitString(str1);
    let str2_arr = splitString(str2);
    let intersection = 0;
    let union = str1_arr.length + str2_arr.length;

    str2_arr.forEach(str =>{
        let index = str1_arr.indexOf(str);
          if(index !== -1){
              intersection++;
              str1_arr.splice(index,1);
            }
    });
    union -=intersection;

    if(union ===0) return 65536

    return Math.floor( intersection / union *65536 )
}