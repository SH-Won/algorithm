let string = 'aa1+aa2';


const splitStr = (string) =>{
    let strArr = [];
    for(let i=0; i<string.length-1; i++){
        let str = string.toUpperCase().substring(i,i+2);
        if(str.search(/[^A-Z]/) !== -1){
            continue;
        }
       strArr.push(str);
    }
    return strArr.sort();
    
}

function solution(str1,str2){
   
    let str1_arr = splitStr(str1); // [1,1,2,3,4,5]
    let str2_arr = splitStr(str2); // [1,2,3,4,5]
    let intersection = 0;
    let union = str1_arr.length + str2_arr.length;
    
    for(let i=0; i<str2_arr.length; i++){
        const index = str1_arr.indexOf(str2_arr[i]);
        if( index !== -1){
            intersection++;
            str1_arr.splice(index,1);
        }
    }
    union = union - intersection;

    if(union === 0) return 65536
    if(intersection ===0) return 0
    


    return Math.floor( (intersection / union) *65536 )
}