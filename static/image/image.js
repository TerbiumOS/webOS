const parent = window.parent;
let winId;
const image = document.querySelector('.img');
let imageWindow;

window.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    winId = data.id;
    imageWindow = window.parent.document.querySelector(`#${winId}`);
    if(localStorage.getItem('photoCoverApp') === "no") {
        const openImage = imageWindow.querySelector('.openImage');
        const imageMagnify = parent.document.querySelector('.zoomIn');
        const imageMini = parent.document.querySelector('.zoomOut');
        imageMagnify.onclick = function () {
            let currentWidth = image.style.width.replace('%', '');
            if (currentWidth < 100) {
                image.style.width = (parseInt(currentWidth) + 5) + '%';
            }
        };
        imageMini.onclick = function () {
            let currentWidth = image.style.width.replace('%', '');
            if(currentWidth > 5) {
                image.style.width = (parseInt(currentWidth) - 5) + '%';
            }
        };
        openImage.onclick = function () {
            const file = document.createElement('input');
            file.type = 'file';
            file.accept = 'image/*';
            file.click();
            file.onchange = function () {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file.files[0]);
                fileReader.onload = function () {
                    image.src = fileReader.result;
                    image.style.visibility = 'visible';
                    if(document.querySelector('.shown')) {
                        document.querySelector('.shown').remove();
                    }
                    file.remove();
                };
            };
        }
    } else if(localStorage.getItem('photoCoverApp') === "yes"){
        const openImage = imageWindow.querySelector(`.openImage`);
        openImage.onclick = function () {
            const file = document.createElement('input');
            file.type = 'file';
            file.accept = 'image/*';
            file.click();
            file.onchange = function () {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file.files[0]);
                fileReader.onload = function () {
                    imageWindow.style.background = 'url(' + fileReader.result + ')';
                    imageWindow.querySelector("#drag").style.backgroundColor = 'transparent';
                    imageWindow.querySelector("iframe").style.visibility = 'hidden';
                    imageWindow.querySelector(".icon").style.backdropFilter = "blur(4px)";
                    imageWindow.querySelector(".favicon").style.filter = 'drop-shadow(rgb(0, 0, 0) 0px 0px 7px)';
                    const appBtns = imageWindow.querySelectorAll(".m");
                    for (let i = 0; i < appBtns.length; i++) {
                        appBtns[i].style.boxShadow = "#000 0px 1px 11px -2px";
                    }
                    const wincs = imageWindow.querySelectorAll(".winc");
                    for (let i = 0; i < wincs.length; i++) {
                        wincs[i].style.boxShadow = "#000 0px 0px 11px -2px";
                    }
                    if(document.querySelector('.shown')) {
                        document.querySelector('.shown').remove();
                    }
                    file.remove();
                };
            };
        }
    }
    const settingsI = imageWindow.querySelector(`.settingsI`);
    const settings = document.querySelector('.settingsWindow');
    const spreadImage = document.getElementById("iow");
    const spreadImageHelp = document.getElementById("iowHelp");
    settingsI.onclick = function () {
        if (!settings.classList.contains('show')) {
            if(imageWindow.querySelector("iframe").style.visibility === 'hidden' && localStorage.getItem('photoCoverApp') === "yes") {
                imageWindow.querySelector("iframe").style.visibility = "visible";
                const computedStyle = window.getComputedStyle(document.querySelector('.settingsWindow'));
                const backgroundColor = computedStyle.getPropertyValue('background-color');
                imageWindow.querySelector("#drag").style.backgroundColor = backgroundColor;
            }
            settings.style.zIndex = 101;
            setTimeout(() => {
                settings.style.opacity = 1;
                settings.classList.toggle('show');
            }, 50)
        } else if(settings.classList.contains('show')) {
            if(imageWindow.querySelector("iframe").style.visibility === 'visible' && localStorage.getItem('photoCoverApp') === "yes") {
                imageWindow.querySelector("iframe").style.visibility = "hidden";
                imageWindow.querySelector("#drag").style.backgroundColor = 'transparent';
            }
            settings.style.zIndex = -1;
            setTimeout(() => {
                settings.style.opacity = 0;
                settings.classList.toggle('show');
            }, 50)
        }
    }
    spreadImage.addEventListener("click", () => {
        if(spreadImage.checked == true) {
            imageWindow.querySelector(".title").innerHTML = `
                <button class="openImage m"><span></span>Open</button><button class="settingsI m"><span></span>Settings</button>
            `;
            const src = image.src;
            imageWindow.style.background = 'url(' + src + ')';
            imageWindow.querySelector("#drag").style.backgroundColor = 'transparent';
            imageWindow.querySelector("iframe").style.visibility = 'hidden';
            imageWindow.querySelector(".icon").style.backdropFilter = "blur(4px)";
            imageWindow.querySelector(".favicon").style.filter = 'drop-shadow(rgb(0, 0, 0) 0px 0px 7px)';
            const appBtns = imageWindow.querySelectorAll(".m");
            for (let i = 0; i < appBtns.length; i++) {
                appBtns[i].style.boxShadow = "#000 0px 1px 11px -2px";
            }
            const wincs = imageWindow.querySelectorAll(".winc");
            for (let i = 0; i < wincs.length; i++) {
                wincs[i].style.boxShadow = "#000 0px 0px 11px -2px";
            }
            image.src = "";
            image.style.visibility = 'collapse';
            settings.classList.toggle('show');
            settings.style.zIndex = -1;
            settings.style.opacity = 0;
            const openImage = imageWindow.querySelector(`.openImage`);
            openImage.onclick = function () {
                const file = document.createElement('input');
                file.type = 'file';
                file.accept = 'image/*';
                file.click();
                file.onchange = function () {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file.files[0]);
                    fileReader.onload = function () {
                        imageWindow.style.background = 'url(' + fileReader.result + ')';
                        imageWindow.querySelector("#drag").style.backgroundColor = 'transparent';
                        imageWindow.querySelector("iframe").style.visibility = 'hidden';
                        imageWindow.querySelector(".icon").style.backdropFilter = "blur(4px)";
                        imageWindow.querySelector(".favicon").style.filter = 'drop-shadow(rgb(0, 0, 0) 0px 0px 7px)';
                        const appBtns = imageWindow.querySelectorAll(".m");
                        for (let i = 0; i < appBtns.length; i++) {
                            appBtns[i].style.boxShadow = "#000 0px 1px 11px -2px";
                        }
                        const wincs = imageWindow.querySelectorAll(".winc");
                        for (let i = 0; i < wincs.length; i++) {
                            wincs[i].style.boxShadow = "#000 0px 0px 11px -2px";
                        }
                        if(document.querySelector('.shown')) {
                            document.querySelector('.shown').remove();
                        }
                        file.remove();
                    };
                };
            }
            imageWindow.querySelector(".settingsI").onclick = function () {
                if (!settings.classList.contains('show')) {
                    if(imageWindow.querySelector("iframe").style.visibility === 'hidden' && localStorage.getItem('photoCoverApp') === "yes") {
                        imageWindow.querySelector("iframe").style.visibility = "visible";
                        const computedStyle = window.getComputedStyle(document.querySelector('.settingsWindow'));
                        const backgroundColor = computedStyle.getPropertyValue('background-color');
                        imageWindow.querySelector("#drag").style.backgroundColor = backgroundColor;
                    }
                    settings.style.zIndex = 101;
                    setTimeout(() => {
                        settings.style.opacity = 1;
                        settings.classList.toggle('show');
                    }, 50)
                } else if(settings.classList.contains('show')) {
                    if(imageWindow.querySelector("iframe").style.visibility === 'visible' && localStorage.getItem('photoCoverApp') === "yes") {
                        imageWindow.querySelector("iframe").style.visibility = "hidden";
                        imageWindow.querySelector("#drag").style.backgroundColor = 'transparent';
                    }
                    settings.style.zIndex = -1;
                    setTimeout(() => {
                        settings.style.opacity = 0;
                        settings.classList.toggle('show');
                    }, 50)
                }
            }
            localStorage.setItem("photoCoverApp", "yes");
        } else if(spreadImage.checked == false) {
            let src = imageWindow.style.background;
            image.style.visibility = 'visible';
            src = src.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
            image.src = src;
            if(image.src === "http://localhost:6969/image/image.html") {
                image.src = "";
            }
            imageWindow.style.background = '';
            imageWindow.querySelector("#drag").style.backgroundColor = '';
            imageWindow.querySelector("iframe").style.visibility = 'visible';
            imageWindow.querySelector(".title").innerHTML = `
                <button class="openImage m"><span></span>Open</button><button class="settingsI m"><span></span>Settings</button><button class="zoomIn m zz"><span></span>+</button><button class="zoomOut m zz"><span></span>-</button>
            `;
            imageWindow.querySelector(".icon").style.backdropFilter = "";
            imageWindow.querySelector(".favicon").style.filter = '';
            const appBtns = imageWindow.querySelectorAll(".m");
            for (let i = 0; i < appBtns.length; i++) {
                appBtns[i].style.boxShadow = "";
            }
            const wincs = imageWindow.querySelectorAll(".winc");
            for (let i = 0; i < wincs.length; i++) {
                wincs[i].style.boxShadow = "";
            }
            localStorage.setItem("photoCoverApp", "no");
            const openImage = imageWindow.querySelector('.openImage');
            const imageMagnify = parent.document.querySelector('.zoomIn');
            const imageMini = parent.document.querySelector('.zoomOut');
            imageMagnify.onclick = function () {
                let currentWidth = image.style.width.replace('%', '');
                if (currentWidth < 100) {
                    image.style.width = (parseInt(currentWidth) + 5) + '%';
                }
            };
            imageMini.onclick = function () {
                let currentWidth = image.style.width.replace('%', '');
                if(currentWidth > 5) {
                    image.style.width = (parseInt(currentWidth) - 5) + '%';
                }
            };
            openImage.onclick = function () {
                const file = document.createElement('input');
                file.type = 'file';
                file.accept = 'image/*';
                file.click();
                file.onchange = function () {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file.files[0]);
                    fileReader.onload = function () {
                        image.src = fileReader.result;
                        image.style.visibility = 'visible';
                        if(document.querySelector('.shown')) {
                            document.querySelector('.shown').remove();
                        }
                        file.remove();
                    };
                };
            }
            imageWindow.querySelector(`.settingsI`).onclick = function () {
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
        }
    });
    switch(localStorage.getItem("photoCoverApp")) {
        case null:
            spreadImage.checked = false;
            break;
        case "true":
            spreadImage.checked = true;
            break;
        case "false":
            spreadImage.checked = false;
            break;
    }
    spreadImageHelp.addEventListener("click", () => {
        alert("If you enable this option, the image will be spread over the entire window. If you disable it, the image will be displayed in the center of the window and can be resized.");
    });
    this.document.addEventListener("keydown", (e) => {
        if(e.altKey && e.key === "s") {
            e.preventDefault();
            if (!settings.classList.contains('show')) {
                if(imageWindow.querySelector("iframe").style.visibility === 'hidden' && localStorage.getItem('photoCoverApp') === "yes") {
                    imageWindow.querySelector("iframe").style.visibility = "visible";
                    const computedStyle = window.getComputedStyle(document.querySelector('.settingsWindow'));
                    const backgroundColor = computedStyle.getPropertyValue('background-color');
                    imageWindow.querySelector("#drag").style.backgroundColor = backgroundColor;
                }
                settings.style.zIndex = 101;
                setTimeout(() => {
                    settings.style.opacity = 1;
                    settings.classList.toggle('show');
                }, 50)
            } else if(settings.classList.contains('show')) {
                if(imageWindow.querySelector("iframe").style.visibility === 'visible' && localStorage.getItem('photoCoverApp') === "yes") {
                    imageWindow.querySelector("iframe").style.visibility = "hidden";
                    imageWindow.querySelector("#drag").style.backgroundColor = 'transparent';
                }
                settings.style.zIndex = -1;
                setTimeout(() => {
                    settings.style.opacity = 0;
                    settings.classList.toggle('show');
                }, 50)
            }
        }
    })
})