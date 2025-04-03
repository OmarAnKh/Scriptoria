const useSlide = () => {
    const formatText = (object) => {
        console.log(object)
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
            let end = Math.min(start + size, str.length); // Ensure we don't go beyond string length
            if (end < str.length) { // Only try to split at word boundary if not at the end
                while (end > start && str[end] !== ' ') {
                    end--;
                }

                // If no space found, force split at the character limit
                if (end === start) {
                    end = start + size;
                }
            }
            substrings.push(str.slice(start, end));
            start = end + (end < str.length ? 1 : 0); // Move start to the next word or the end
        }
        return substrings;
    }

    const splitBigArrays = (object, characters) => {
        let tempArray = []
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
    const getSlides = (texts) => {
        const MAX_SLIDE_LENGTH = 1560;
        const res = formatText(texts);
        const withoutNewlines = removeNewLines(res);
        const splitArrays = splitBigArrays(withoutNewlines, 100);
        let slides = sumUparrays(splitArrays, MAX_SLIDE_LENGTH);
    
        slides = slides.map(slide => {
            if (slide.length > MAX_SLIDE_LENGTH) {
                return splitString(slide, MAX_SLIDE_LENGTH);
            }
            return slide;
        }).flat();
    
        // Handle single long words that exceed MAX_SLIDE_LENGTH
        slides = slides.flatMap(slide => {
            const words = slide.trim().split(/\s+/);
            if (words.length === 1 && slide.length > MAX_SLIDE_LENGTH) {
                let chunks = [];
                let word = slide;
                while (word.length > MAX_SLIDE_LENGTH) {
                    chunks.push(word.slice(0, MAX_SLIDE_LENGTH) + "...");
                    word = "..." + word.slice(MAX_SLIDE_LENGTH);
                }
                chunks.push(word); // Add the remaining part
                return chunks;
            }
            return slide;
        });
    
        return slides;
    };
    
    return getSlides
}
export default useSlide;