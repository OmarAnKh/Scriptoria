
const useSlide = (slideObject, characters) => {

    const formatText = () => {
        let formattedArray = [];

        for (let key in slideObject) {
            if (typeof slideObject[key] === 'string') {
                let tempString = '';
                if (slideObject.attributes) {
                    const { bold, italic, underline } = slideObject.attributes;
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
                tempString += slideObject[key];
                if (slideObject.attributes) {
                    const { bold, italic, underline } = slideObject.attributes;
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
            } else if (typeof slideObject[key] === 'slideObject') {
                formattedArray = formattedArray.concat(formatText(slideObject[key]));
            }
        }
        return formattedArray;
    };



    const splitText = () => {
        const formattedArray = formatText();
        let tempArray = [];
        let tempstring = '';

        let size = characters;


        for (let i = 0; i < formattedArray.length; i++) {
            if (formattedArray[i].includes('\n')) {
                formattedArray[i] = formattedArray[i].replaceAll('\n', '')
            }
        }
        for (let key in formattedArray) {
            if (formattedArray.hasOwnProperty(key)) {
                if (formattedArray[key].length <= size) {

                    tempstring += formattedArray[key];
                    size -= formattedArray[key].length;

                } else {
                    tempArray.push(tempstring);
                    tempstring = '';

                    if (formattedArray[key].length > characters) {
                        tempArray.push(formattedArray[key]);
                    } else {
                        tempstring = formattedArray[key];
                        size = characters - formattedArray[key].length;
                    }
                }
            }
        }
        if (tempstring !== '') {
            tempArray.push(tempstring);
        }

        return tempArray;
    }

    const divIntoSubArrays = () => {
        const sploitTextArray = splitText();
        let slides = []
        let tempstring = ''
        for (let textIndex = 0; textIndex < sploitTextArray.length; textIndex++) {
            if (tempstring.length < characters) {
                tempstring += sploitTextArray[textIndex]
                console.log(tempstring, 5000, tempstring.length)
            }
            if (tempstring.length > characters) {
                console.log(tempstring, 1000)
                slides.push(tempstring)
                tempstring = ''
            }
        }
        console.log(slides)
        return slides
    }
    return divIntoSubArrays
}
export default useSlide;
