
const useSlide = () => {
    const formatText = (object) => {
        let formattedArray = [];
        for (let key in object) {
            if (typeof object[key] === 'string') {
                let tempString = '';
                if (object.attributes) {
                    const { bold, italic, underline } = object.attributes;
                    if (bold) {
                        tempString += '<b>';
                    }
                    if (italic) {
                        tempString += '<i>';
                    }
                    if (underline) {
                        tempString += '<u>';
                    }
                }
                tempString += object[key];
                if (object.attributes) {
                    const { bold, italic, underline } = object.attributes;
                    if (bold) {
                        tempString += '</b>';
                    }
                    if (italic) {
                        tempString += '</i>';
                    }
                    if (underline) {
                        tempString += '</u>';
                    }
                }

                formattedArray.push(tempString);
            } else if (typeof object[key] === 'object') {
                formattedArray = formattedArray.concat(formatText(object[key]));
            }
        }
        return formattedArray;
    };

    const removeNewLines = (texts) => {
        for (let i = 0; i < texts.length; i++) {
            if (typeof texts[i] === 'string' && texts[i].includes('\n')) {
                texts[i] = texts[i].replaceAll('\n', '');
            }
        }
        return texts
    }

    const splitString = (str, size) => {
        const substrings = [];
        let start = 0;
        while (start < str.length) {
            let end = start + size;
            if (end >= str.length) {
                substrings.push(str.slice(start));
                break;
            }
            while (str[end] !== ' ' && end > start) {
                end--;
            }

            if (end === start) {
                substrings.push(str.slice(start, start + size));
                start += size;
            } else {
                substrings.push(str.slice(start, end));
                start = end + 1;
            }
        }

        return substrings;
    }

    const splitBigArrays = (object, characters) => {
        let tempArray = []
        let tempstring = ''
        let tempsubstring = ''
        for (let i = 0; i < object.length; i++) {
            if (object[i].includes('<b>') || object[i].includes('<u>') || object[i].includes('<i>')) {
                tempArray.push(object[i])
            } else {
                tempsubstring = splitString(object[i], characters)
                for (let i = 0; i < tempsubstring.length; i++) {
                    tempArray.push(tempsubstring[i])
                }
            }
        }
        return tempArray
    }

    const sumUparrays = (object, characters) => {
        let tempArray = []
        let tempstring = ''
        let size = characters;
        for (let i = 0; i < object.length; i++) {
            if (object[i].length < size) {
                tempstring += object[i];
                size -= object[i].length;
            } else if (object[i].length > size) {
                tempArray.push(tempstring)
                tempstring = ''
                size = characters
                tempstring += object[i];
                size -= object[i].length

            }
        }
        tempArray.push(tempstring)
        return tempArray
    }
    const getSlides = (texts, characters) => {
        const res = formatText(texts)
        const withoutNewlines = removeNewLines(res)
        const splitArrays = splitBigArrays(withoutNewlines, 100)
        const slides = sumUparrays(splitArrays, characters)
        return slides
    }
    return getSlides
}
export default useSlide;
