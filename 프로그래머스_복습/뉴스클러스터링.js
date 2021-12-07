const getGroupArr = (string) =>{
    let groupArr = [];
    for(let i=0; i<string.length-1; i++){
        const el = string.substring(i,i+2);
        if(el.search(/[^A-Z]/g) !== -1) continue;
        groupArr.push(el);
    }
    return groupArr;
}
const solution = (str1,str2) =>{
    let group1 = getGroupArr(str1.toUpperCase());
    let group2 = getGroupArr(str2.toUpperCase());
    let union = group1.length + group2.length;
    let interSection = 0;
    for(let i=0; i<group1.length; i++){
        const index = group2.indexOf(group1[i]);
        if(index !== -1){
            interSection++;
            group2.splice(index,1);
        } 
    }
    union -=interSection;
    if(union === 0) return 65536;
    return Math.floor((interSection / union) * 65536);

}
