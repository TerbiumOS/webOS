const editor = document.querySelector('.editArea');
editor.onkeydown = function(e) {
    if(document.querySelector("br")) {
        document.querySelector("br").remove();
    }
}
window.addEventListener('message', function (e) {
    let appId;
    const data = e.data;
    appId = data;
    homeWindow = window.parent.document.getElementById(appId);
    save = homeWindow.querySelector('.saveF');
    save.addEventListener('click', function () {
        const text = editor.innerHTML;
        // remove the last four characters
        text.slice(0, -4);
        const askFileName = prompt('Enter file name');
        const fileName = askFileName;
        if(fileName === null){
            return;
        } else if (fileName === '') {
            alert('File name cannot be empty');
            return;
        } else {
            const file = new Blob([text], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.download = `${fileName}.txt`;
            link.click();
        }
    });
});