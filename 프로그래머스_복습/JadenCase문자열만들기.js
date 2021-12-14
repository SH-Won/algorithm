const solution = (s) =>{
    return s.toLowerCase().split(' ').map(string =>{
        return string === "" ? "" : string[0].toUpperCase() + string.substring(1)
    }).join(' ')
}
console.log(solution('3people unFollowed me'))


