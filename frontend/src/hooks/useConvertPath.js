
const useConvertPath = () => {

    const convertPath = async (path) => {
        //fetch the img path
        const response = await fetch(path);
        //convert the response to blob object (Binary Large Object)
        const blob = await response.blob();
        //make img url by useing the promise
        const imgDataUrl = await new Promise((resolve, reject) => {
            //make new object from FileReader
            const fileReader = new FileReader();
            //if file is load
            fileReader.onload = function (event) {
                resolve(event.target.result);
            };
            //if file has error in load
            fileReader.onerror = function (event) {
                reject(event.target.result);
            };
            //take the blob and read as url
            fileReader.readAsDataURL(blob);
        });

        return imgDataUrl;
    };

    return { convertPath };
};

export default useConvertPath;
