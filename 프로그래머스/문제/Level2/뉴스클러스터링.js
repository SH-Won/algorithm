const [str1,str2] =['E=M*C^2','e=m*c^2'];

const splitString = (str,array)=>{

    for(let i=0; i<str.length-1; i++){
        let checkStr = str.substring(i,i+2);
        if(checkStr.search(/[^A-Z]/) !== -1){
            continue;
        }
        array.push(checkStr);

    }
    return array;

}
console.log(solution(str1,str2));

function solution(str1,str2){
    
    let string1 = str1.toUpperCase();
    let string2 = str2.toUpperCase();
    
   
    
    let str1_arr = splitString(string1,[]);
    let str2_arr = splitString(string2,[]);
    let intersection =[];
    let union = str1_arr.length;
    
   
   // let set = new Set();

    // str1_arr.forEach(el => set.add(el));
    // str2_arr.forEach(el => set.add(el));

    // let intersection = 0;
    // let union = 0;
    str1_arr.sort();
    str2_arr.sort();
    console.log(str1_arr);
    console.log(str2_arr);
    for(let i=0; i<str2_arr.length; i++){
        
        if(str1_arr.indexOf(str2_arr[i]) !== -1){
            intersection.push(...str1_arr.splice(str1_arr.indexOf(str2_arr[i]),1));  
        }
    }
    
    union += (str2_arr.length - intersection.length);
    
    
    
    // console.log(intersection);
    
    if(union === 0) return 65536
    if(intersection.length ===0) return 0
   
    
    return Math.floor((intersection.length / union) *65536 )
   
    


}