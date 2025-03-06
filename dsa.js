function maxChar(str) {

    const charmap = {}
    let max = 0
    let maxChar = ''
    for (let char of str) {
        charmap[char] = (charmap[char] || 0) + 1

        if (charmap[char] > max) {
            max = charmap[char]
            maxChar = char
        }
    }
    return maxChar
}


function chunk(array, size) {
    const result = []
    for (let start = 0; start < array.length; start += size) {
        result.push(array.slice(start, start + size))
    }

    return result
}

function capitalize(str) {
    return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}



// console.log(maxChar('aaabbbbcde'))
// console.log(chunk([1, 2, 3, 4, 5], 2))
console.log(capitalize('jose carlos ulchak'))