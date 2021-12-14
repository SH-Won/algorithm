const solution = (files) => {
    const regex = /[0-9]/g;
    files = files.map((file,index)=>{
        const headIndex = file.indexOf(file.match(regex)[0]);
        const [head,number] = [file.substring(0,headIndex).toLowerCase(), parseInt(file.substring(headIndex))];
        return {file,head,number,index};
   
    })
    files.sort((a,b)=>{
        if(a.head === b.head){
            if(a.number === b.number) return a.index - b.index;
            return a.number - b.number;
        }
        return a.head.localeCompare(b.head);
    })
    return files.map(el => el.file);
}
console.log(solution(["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"]
));




