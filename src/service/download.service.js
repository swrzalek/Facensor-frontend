export const downloadFile = (file) => {
    let fileURL = window.URL.createObjectURL(new Blob([file]));
    let fileLink = document.createElement('a');   
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'image.jpeg');
        document.body.appendChild(fileLink);
        fileLink.click();
}