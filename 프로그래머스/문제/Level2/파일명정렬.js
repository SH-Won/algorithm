const compare = (fileA,fileB) =>{
    const regex = /[0-9]/g;
    const numIndexA = fileA.indexOf(fileA.match(regex)[0]);
    const numIndexB = fileB.indexOf(fileB.match(regex)[0]);
    const head = fileA.slice(0,numIndexA).toLowerCase().localeCompare(fileB.slice(0,numIndexB).toLowerCase());
    if(head === 0){
       const numberA = parseInt(fileA.slice(numIndexA));
       const numberB = parseInt(fileB.slice(numIndexB));
       return numberA-numberB;
    }
    return head;
}
const solution = (files) =>{
    let fileArr = files.map((file,index) => ({file,index}));
    fileArr.sort((a,b)=>{
        const result = compare(a.file,b.file);
        return result === 0 ? a.index -b.index : result;
    })
    return fileArr.map(el => el.file);
}
const files =["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"]
solution(files);
