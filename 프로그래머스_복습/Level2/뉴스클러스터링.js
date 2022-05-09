const getGroup = (str) =>{
    const group = [];
    for(let i=0; i<str.length-1; i++){
        const unit = str.substring(i,i+2);
        if(unit.search(/[^A-Z]/g) >= 0) continue;
        group.push(unit);
    }
    return group;
} 
const solution = (str1,str2) =>{
    const group1 = getGroup(str1.toUpperCase());
    const group2 = getGroup(str2.toUpperCase());
    if(group1.length === 0 && group2.length === 0) return 65536;
    if(group1.length === 0 || group2.length === 0) return 0;
    let union = group1.length + group2.length;
    let interSection = 0;
    group1.forEach(unit =>{
        const idx = group2.indexOf(unit);
        if(idx !== -1 ){
            group2.splice(idx,1);
            interSection++;
        }
    })
    union -= interSection;
    return Math.floor((interSection / union) * 65536);
}
console.log(solution('FRANCE','french'))