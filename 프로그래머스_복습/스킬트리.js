const solution = (skill,skill_trees) =>{
    let answer = 0;
    
    for(let i=0; i<skill_trees.length; i++){
        let index = 0;
        let j ;
        for(j=0; j<skill_trees[i].length; j++){
            const isExist = skill.includes(skill_trees[i][j]);
            if(!isExist) continue;
            if(skill[index] !== skill_trees[i][j]) break;
            else index++;
        }
        if(j === skill_trees[i].length)
        answer++;
    }
    return answer;
}
console.log(solution("CBD",["BACDE", "CBADF", "AECB", "BDA"]))