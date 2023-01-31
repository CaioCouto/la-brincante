export default function capitalize(text) {
    if(!(typeof text === 'string')) return text;
    return text
        .trim()
        .split(' ')
        .map(txt => txt[0].toUpperCase()+txt.slice(1).toLowerCase()).join(' ');
}