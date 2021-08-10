const orders = ["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"]
const course =[2,3,5];

console.log(solution(orders,course))
function solution(orders,course){

let array = [];

for(let i=0; i<orders.length; i++){
    for(let j=0; j<orders[i].length; j++){
        if(!array.includes(orders[i][j])){
            array.push(orders[i][j])
        }
    }
}

let courseArr = new Map();

let result =[];
let max =0;
for(let i=0; i<course.length; i++){
  
dfs(0,'',array,course[i]);

for(let [key,value] of courseArr){
    if(value ===1) courseArr.delete(key);
   
}

for(let [key,value] of courseArr){
    
     max < value ? max=value : max; 
}
for(let [key,value] of courseArr){
    if(value === max) result.push(key);
}
courseArr.clear();
max=0;

}


//console.log(courseArr);


function dfs(count,curStr,array,answer){

    if(count ===answer){
        for(let i=0; i<orders.length; i++){
            
            for(let j=0; j<curStr.length; j++){
            if(!orders[i].includes(curStr[j])){
                break;
            }
            else{
                if(j === curStr.length-1){
                    if(!courseArr.has(curStr)){
                        courseArr.set(curStr,1);
                        
                    }
                    else{courseArr.set(curStr,courseArr.get(curStr)+1)}
                }
            }
         }
        }
        return;
        
    }

    for(let i=0; i<array.length; i++){
        let nextStr = curStr + array[i];
        let temp =[...array];
        temp.splice(0,i+1);

        dfs(count+1,nextStr,temp,answer);

    }

}
return result.map(string => string.split('').sort().join('')).sort();
}