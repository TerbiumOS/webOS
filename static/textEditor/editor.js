const editor = document.querySelector('.editArea');
editor.onkeydown = function(e) {
    if(document.querySelector("br")) {
        document.querySelector("br").remove();
    }
}
window.addEventListener('message', function (e) {
    let appId;
    const data = JSON.parse(e.data);
    appId = data.id;
    const homeWindow = window.parent.document.getElementById(appId);
    const editArea = document.querySelector(".editArea");
    let textDecode = decodeURIComponent(data.text);
    if(textDecode === "undefined") {
        textDecode = "";
    }
    editArea.innerHTML = textDecode;

    let save = homeWindow.querySelector('.saveF');
    save.addEventListener('click', function () {
        const text = editor.value;
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
    this.window.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            save.click();
        }
    });
    let settingsT = homeWindow.querySelector('.settingsT');
    const settings = document.querySelector('.settingsWindow');
    settingsT.addEventListener('click', function () {
        if (!settings.classList.contains('show')) {
            settings.style.zIndex = 101;
            setTimeout(() => {
                settings.style.opacity = 1;
                settings.classList.toggle('show');
            }, 50)
        } else if(settings.classList.contains('show')) {
            settings.style.zIndex = -1;
            setTimeout(() => {
                settings.style.opacity = 0;
                settings.classList.toggle('show');
            }, 50)
        }
    });
    
    const dropTextSS = document.querySelector(".TEXTF");
    switch(localStorage.getItem("textF")) {
        case "textF_0":
            dropTextSS.innerHTML = "Roboto";
            editArea.style.fontFamily = "rob";
            break;
        case "textF_1":
            dropTextSS.innerHTML = "Product Sans";
            editArea.style.fontFamily = "pro";
            break;
        case "textF_2":
            dropTextSS.innerHTML = "Arial";
            editArea.style.fontFamily = "Arial";
            break;
        case "textF_3":
            dropTextSS.innerHTML = "Times New Roman";
            editArea.style.fontFamily = "times";
            break;
        case "textF_4":
            dropTextSS.innerHTML = "Dancing Script";
            editArea.style.fontFamily = "dance";
            break;
        case "textF_5":
            dropTextSS.innerHTML = "Caveat";
            editArea.style.fontFamily = "caveat";
            break;
        case "textF_6":
            dropTextSS.innerHTML = "Fuzzy Bubbles";
            editArea.style.fontFamily = "fuzzy";
            break;
        default:
            localStorage.setItem("textF", "textF_0");
            dropTextSS.innerHTML = "Roboto";
            editArea.style.fontFamily = "rob";
            break;
    }

    
    let number = this.document.querySelector(".number");
    editArea.style.fontSize = localStorage.getItem("textS") + "px";
    number.value = localStorage.getItem("textS");
    number.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" || e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Delete") {
            return;
        }
        if(e.key === "ArrowUp") {
            if (parseInt(number.value) < 400) {
                number.value = parseInt(number.value) + 1;
                localStorage.setItem("textS", number.value);
                editArea.style.fontSize = number.value + "px";
            }
        } else if(e.key === "ArrowDown") {
            if(parseInt(number.value) > 8) {
                number.value = parseInt(number.value) - 1;
                localStorage.setItem("textS", number.value);
                editArea.style.fontSize = number.value + "px";
            }
        }
        if (isNaN(e.key)) {
            e.preventDefault();
        }
    });

    number.onfocus = e => {
        settings.style.opacity = 0.5;
        number.onkeydown = e => {
            if(e.key === "Enter") {
                e.preventDefault();
                if (number.value < 8) {
                    number.value = 8;
                } else if (number.value > 400) {
                    number.value = 400;
                }
                editArea.style.fontSize = number.value + "px";
                localStorage.setItem("textS", number.value);
            }
        }
    }
    number.onblur = e => {
        if(settings.classList.contains("show")) {
            settings.style.opacity = 1;
        }
    }

    this.document.querySelector(".increment").addEventListener("click", () => {
        if (parseInt(number.value) < 400) {
            number.value = parseInt(number.value) + 1;
            const value = number.value;
            editArea.style.fontSize = `${value}px`;
            localStorage.setItem("textS", value);
        }
    });

    this.document.querySelector(".decrement").addEventListener("click", () => {
        if (parseInt(number.value) > 8) {
            number.value = parseInt(number.value) - 1;
            const value = number.value;
            editArea.style.fontSize = `${value}px`;
            localStorage.setItem("textS", value);
        }
    });

    const dropBtns = document.querySelectorAll(".dropbtn");
    for (let i = 0; i < dropBtns.length; i++) {
        const element = dropBtns[i];
        let parent = element.parentElement;
        let dropContent = parent.querySelector(".dropdown-content");
        element.addEventListener("click", () => {
            if(!dropContent.classList.contains("show")) {
                let height = dropContent.children.length * 27;
                dropContent.style.height = `${height}px`;
                dropContent.classList.add("show");
                element.classList.add("dropMorph");
                element.classList.remove("dropBtn");
            } else {
                dropContent.style.height = "";
                element.classList.remove("dropMorph");
                element.classList.add("dropBtn");
                dropContent.classList.remove("show");
            }
        })
        const dropOptions = dropContent.querySelectorAll(".dropOptions");
        for (let ie = 0; ie < dropOptions.length; ie++) {
            dropOptions[ie].addEventListener("click", () => {
                if(!dropContent.classList.contains("show")) {
                    dropContent.classList.add("show");
                } else if(dropContent.classList.contains("show")) {
                    dropContent.classList.remove("show");
                    dropContent.style.height = "";
                }
                element.classList.remove("dropMorph");
                element.classList.add("dropBtn");
                element.querySelector(".dropText").innerHTML = dropOptions[ie].getAttribute("data-option_name");
                localStorage.setItem(dropOptions[i].getAttribute("data-former"), `${dropOptions[ie].getAttribute("data-option")}`);
                editArea.style.fontFamily = dropOptions[ie].getAttribute("data-font");
            });

        }
    }
    this.window.addEventListener("keydown", (e) => {
        if(e.altKey && e.key === "s") {
            e.preventDefault();
            if (!settings.classList.contains('show')) {
                settings.style.zIndex = 101;
                setTimeout(() => {
                    settings.style.opacity = 1;
                    settings.classList.toggle('show');
                }, 50)
            } else if(settings.classList.contains('show')) {
                settings.style.zIndex = -1;
                setTimeout(() => {
                    settings.style.opacity = 0;
                    settings.classList.toggle('show');
                }, 50)
            }
        }
    })
});