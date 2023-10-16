// xor function in one place for easy modification
class xor {
  static encode(str) {
    if (!str) return str;
    return encodeURIComponent(
        str
            .toString()
            .split('')
            .map((char, ind) =>
                ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
            )
            .join('')
    );
}
static decode(str) {
    if (!str) return str;
    let [input, ...search] = str.split('?');

    return (
        decodeURIComponent(input)
            .split('')
            .map((char, ind) =>
                ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char
            )
            .join('') + (search.length ? '?' + search.join('?') : '')
    );
}
}
// and setting path easily. (wait this is in the js.js file as prefix though?)
path = "/sw/";
