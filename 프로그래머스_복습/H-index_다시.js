const solution = (citations) =>{
    citations.sort((a,b) => b-a);
    // [6,5,2,1,0];
    let index = 0;
    while(index+1 <= citations[index]){
        index++;
    }
    return index;
}