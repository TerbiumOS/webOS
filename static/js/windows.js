let dock = document.querySelector("#dock");
class xor {
    static encode(str) {
        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    };
    static decode(str) {
        return decodeURIComponent(str.slice(0, -1)).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('');
    };
};

function checkOverflow() {
    if (dock.scrollWidth > dock.clientWidth) {
        dock.classList.add("overflow");
    } else {
        dock.classList.remove("overflow");
    }
}

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable) {
             return pair[1];
            }
       }
       return(false);
}

let id = getQueryVariable("app");
let date = getQueryVariable("date");
let text = getQueryVariable("text");
let view = getQueryVariable("view");

var keys = {}

let appsMini = 0;

const appShell = document.createElement("div");
appShell.classList.add("appShell");
const appsShellName = document.createElement("p");
appsShellName.classList.add("name");
const appOptions = document.querySelector(".appOptions");
shell.appendChild(appShell);

let params;

function hideStart() {
    if (document.querySelector(".apps").classList.contains("op")) {
        document.querySelector(".apps").classList.add("hidden");
        document.querySelector("#appsL").classList.remove("appsIF");
        document.querySelector(".apps").classList.remove("op");
    }
}

var availableApps = ["browser", "hypertabs", "code", "youtube", "apple music", "spotify", "tidal", "youtube music", "settings", "help", "color picker", "terminal", "video", "game center"];

class WIN {
    constructor(link, icon, title, os, fullscreen, appName, controlsTypes, textAppText, urlToOpen, oneInstance, width, height, resizable) {
        this.link = link;
        this.icon = icon;
        this.title = title;
        this.os = os;
        this.fullscreen = fullscreen;
        this.appName = appName;
        this.textAppText = textAppText;
        this.controlsTypes = controlsTypes;
        this.urlToOpen = urlToOpen;
        this.oneInstance = oneInstance;
        this.width = width;
        this.height = height;
        this.resizable = resizable;
        this.create()
    }
    create() {
        let allParams = [];
        for (const prop in this) {
            if (this.hasOwnProperty(prop)) {
                if(this[prop] == undefined) {
                    // console.warn(`%cThere is no %c${prop}%c property, this may affect the app.`, "color: #ff4747;", "color: #ffc08f; background-color: #965523; font-weight: bold; padding: 0px 3px;", "color: #ff4747;");
                    continue;
                }
                let paren;
                let propItem;
                if(!this[prop].includes("(")) {
                    console.error(`%cThere is a missing indication properties -> %ctype%c\nfor example: %c(link) %cfor indication for what %ctype %cto set`, "color: #ff4747;", "color: #ffc08f; background-color: #965523; font-weight: bold; padding: 0px 3px;", "color: #ff4747;", "color: #fff157;", "color: #ff4747;", "color: #fff157;", "color: #ff4747;");
                    console.log(`%cA good working window initialization would look like this:\n%cnew %cWIN%c(%c"(link)[../test/test.html]"%c, %c"(icon)[../resources/test.svg]"%c, %c"(title)[Terbium Test]"%c, %cfalse%c, %ctrue%c, %cfalse%c, %c"test"%c, %c"minClose"%c)`, "color: #ff4747;", "color: #ba5eff;", "color: #fcef79;", "color: #ba5eff;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #c7c7c7;", "color: #4da343;", "color: #ba5eff;");
                }
                if(!this[prop].includes("[")) {
                    console.error(`%cThere is no indicating properties -> %cvalue%c\nfor example: %c[https://example.com] %cfor property: %c(link)`, "color: #ff4747;", "color: #ffc08f; background-color: #965523; font-weight: bold; padding: 0px 3px;", "color: #ff4747;", "color: #fff157;", "color: #ff4747;", "color: #fff157;");
                }
                paren = this[prop].substring(this[prop].indexOf("(") + 1, this[prop].indexOf(")")).toLowerCase();
                propItem = this[prop].substring(this[prop].indexOf("[") + 1, this[prop].indexOf("]"));
                allParams.push(`(${paren})[${propItem}]`);
            }
        }

        let controlsTypes;
        let title;
        let link;
        let icn;
        let os;
        let fullscreen;
        let appName;
        let textAppText;
        let urlToOpen;
        let oneInstance;
        let width;
        let height;
        let resizable;

        let windowsCell = document.querySelector(".windows");
        let allWindowsHolder = windowsCell.querySelector(".windowsList");
        let lastWindow = windowsCell.querySelector(".lastWindow");
        let currentWindow = windowsCell.querySelector(".currentWindow");
        let nextWindow = windowsCell.querySelector(".nextWindow");

        allParams.filter((item) => {
            let brackVal = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
            if(item.includes("undefined")) {
                return brackVal;
            }
            if(item.includes("null")) {
                return brackVal;
            }
            if(item.includes("(link)") || item.includes("(url)") || item.includes("(href)") || item.includes("(lnk)")) {
                link = brackVal;
            }
            if(item.includes("(icon)") || item.includes("(icn)")) {
                icn = brackVal;
            }
            if(item.includes("(title)")) {
                title = brackVal;
            }
            if(item.includes("(os)")) {
                os = brackVal.toLowerCase();
            }
            if(item.includes("(fullscreen)") || item.includes("(full)")) {
                fullscreen = brackVal.toLowerCase();
            }
            if(item.includes("(appname)")) {
                appName = brackVal;
            }
            if(item.includes("(textapptext)") || item.includes("(textapp)") || item.includes("(text)") || item.includes("(txt)")) {
                textAppText = brackVal;
            }
            if(item.includes("(controls)") || item.includes("(ctrls)") || item.includes("(controlsTypes)") || item.includes("(ctrlsTypes)")) {
                if(brackVal === undefined || brackVal === null || brackVal === "all") {
                    controlsTypes = "minmaxclose";
                } else {
                    controlsTypes = brackVal.toLowerCase();
                }
            }
            if(item.includes("(urltoopen)") || item.includes("(urltoopen)") || item.includes("(urltoopen)") || item.includes("(urltoopen)")) {
                urlToOpen = brackVal;
            }
            if(item.includes("(oneinstance)") || item.includes("(oneinst)")) {
                oneInstance = brackVal.toLowerCase();
            }
            if(item.includes("(width)")) {
                width = brackVal;
            }
            if(item.includes("(height)")) {
                height = brackVal;
            }
            if(item.includes("(resizable)") || item.includes("(resize)")) {
                resizable = brackVal.toLowerCase();
            }
        });

        appShell.appendChild(appsShellName);
        if(appsShellName.classList.contains("inactive")) {
            appsShellName.classList.remove("inactive");
        }
        appsShellName.innerText = title;
        const appID = document.querySelector(".name").getAttribute("data-id");
        let chromeJS = document.createElement("script");
        chromeJS.src = "./js/chrome-tabs.js";
        let maxState;
        const newwin = document.createElement("div");
        let windowID;
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return windowID = result;
        }
        makeid(18);
        if(width) {
            newwin.setAttribute("data-width", height);
            if(width.includes("px")) {
                newwin.style.width = width;
            } else {
                newwin.style.width = `${width}px`;
            }
        }
        if(height) {
            newwin.setAttribute("data-height", height);
            if(height.includes("px")) {
                newwin.style.height = height;
            } else {
                newwin.style.height = `${height}px`;
            }
        }
        newwin.setAttribute("data-id", windowID);
        newwin.setAttribute("data-link", link);
        newwin.setAttribute("data-title", title);
        newwin.setAttribute("data-os", os);
        newwin.setAttribute("data-fullscreen", fullscreen);
        newwin.setAttribute("data-appName", appName);
        newwin.setAttribute("data-textAppText", textAppText);
        newwin.setAttribute("min-height", "499");
        newwin.setAttribute("min-width", "499");
        newwin.setAttribute("urlToOpen", urlToOpen);
        newwin.setAttribute("oneInst", oneInstance);
        newwin.setAttribute("data-resizable", resizable);
        newwin.setAttribute("data-controls", controlsTypes);

        if(allWindowsHolder.innerHTML === "") {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("cell-id", windowID);
            allWindowsHolder.appendChild(cell);
        } else {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("cell-id", windowID);
            allWindowsHolder.appendChild(cell);
        }

        let allWindowsForCellNumberCheck = document.querySelectorAll(".cell");
        currentWindow.innerHTML = `${newwin.getAttribute("data-id")}`;
        if(allWindowsForCellNumberCheck.length > 1) {
            // console.log("tits");
            lastWindow.innerHTML = document.querySelector(".winFocus").getAttribute("id");
        } else if(allWindowsForCellNumberCheck.length == 1) {
            // lastWindow.innerHTML = document.querySelector(".winFocus").getAttribute("id")
            if(document.querySelector(".winFocus")) {
                console.log(document.querySelector(".winFocus").getAttribute("id"));
            }
        }

        if(resizable === "no" || resizable === "false") {
            newwin.setAttribute("data-resizable", "no");
            newwin.classList.add("no-resize");
        } else if(resizable === "yes" || resizable === "true") {
            newwin.setAttribute("data-resizable", "yes");
        }
        if(oneInstance === "yes" || oneInstance === "true") {
            appShell.setAttribute("oneInst", "yes");
            if(document.querySelectorAll(`[data-appname='${appName}']`).length > 0) {
                document.querySelectorAll(`.win`).forEach((item) => {
                    item.classList.remove("winFocus");
                    item.classList.add("winNotFocus");
                    item.querySelector(".focusWinEl").classList.remove("no");
                    item.querySelector(".focusWinEl").classList.add("yes");
                })
                document.querySelector(`[data-appname='${appName}']`).classList.remove("winNotFocus");
                document.querySelector(`[data-appname='${appName}']`).classList.remove("winmini");
                document.querySelector(`[data-appname='${appName}']`).classList.remove("negZI");
                document.querySelector(`[data-appname='${appName}']`).classList.add("winFocus");
                document.querySelector(`[data-appname='${appName}']`).querySelector(".focusWinEl").classList.add("no");
                document.querySelector(`[data-appname='${appName}']`).querySelector(".focusWinEl").classList.remove("yes");
                document.querySelectorAll(`[app]`).forEach((item) => {
                    item.classList.remove("active");
                })
                let id = document.querySelector(`[data-appname='${appName}']`).getAttribute("data-id");
                document.querySelector(`[data-appid="${id}"]`).classList.add("active");
                document.querySelector(".appShell").querySelector(".name").setAttribute("data-id", id);
                document.querySelector(".appShell").querySelector(".name").innerHTML = title;
                document.querySelector(".appShell").setAttribute("oneInst", "yes");
                return
            }
        } else {
            appShell.setAttribute("oneInst", "no");
        }

        let focusWinEl = document.createElement("div");
        focusWinEl.classList.add("focusWinEl");
        newwin.appendChild(focusWinEl);
    
        appsShellName.onclick = (e) => {
            if(appsShellName.innerHTML == "" || appsShellName.classList.contains("inactive")) {
                return
            } else {
                if(appOptions.classList.contains("h")) {
                    appOptions.classList.remove("h");
                }
            }
            window.addEventListener("mousedown", (e) => {
                if (e.button == 0 && !e.target.closest(".appOptions") && appOptions.classList.contains("h") == false && !e.target.closest(".name")) {
                    appOptions.classList.add("h");
                }
            });
            appOptions.querySelector(".closeApp").onclick = (e) => {
                appsShellName.innerHTML = "";
                appsShellName.classList.add("inactive");
                appOptions.classList.toggle("h");
                document.querySelector(".winFocus").querySelector(".close").click();
            }
            appOptions.querySelector(".newwin").onclick = (e) => {
                let link = document.querySelector(".winFocus").getAttribute("data-link");
                let icn = document.querySelector(".winFocus").getAttribute("data-icon");
                let os = document.querySelector(".winFocus").getAttribute("data-os");
                let fullscreen = document.querySelector(".winFocus").getAttribute("data-fullscreen");
                let appName = document.querySelector(".winFocus").getAttribute("data-appName");
                let controlsTypes = document.querySelector(".winFocus").getAttribute("data-controls");
                let textAppText = document.querySelector(".winFocus").getAttribute("data-textAppText");
                let width = document.querySelector(".winFocus").getAttribute("data-width");
                let height = document.querySelector(".winFocus").getAttribute("data-height");
                let resizable = document.querySelector(".winFocus").getAttribute("data-resizable");
                let title = document.querySelector(".winFocus").getAttribute("data-title");
                appOptions.classList.toggle("h");
                if(appShell.getAttribute("oneInst") === "yes" || appShell.getAttribute("oneInst") === "true") {
                    if(document.querySelectorAll(`[data-appname='${appName}']`).length > 0) {
                        return
                    }
                }
                new WIN(`(link)[${link}]`, `(icn)[${icn}]`, `(title)[${title}]`, `(os)[${os}]`, `(fullscreen)[${fullscreen}]`, `(appName)[${appName}]`, `(controls)[${controlsTypes}]`, `(textAppText)[${textAppText}]`, `(width)[${width}]`, `(height)[${height}]`, `(resizable)[${resizable}]`);
            }
            appOptions.querySelector(".minimizeApp").onclick = (e) => {
                appOptions.classList.toggle("h");
                document.querySelector(".winFocus").querySelector(".mini").click();
            }
            appOptions.querySelector(".maximizeApp").onclick = (e) => {
                appOptions.classList.toggle("h");
                document.querySelector(".winFocus").querySelector(".maxi").click();
            }
            appOptions.querySelector(".reloadApp").onclick = (e) => {
                appOptions.classList.toggle("h");
                let win = document.querySelector(".appShell").querySelector(".name").getAttribute("data-id");
                console.log(win);
                if(document.querySelector(`#${win}`)) {
                    let src = document.querySelector(`#${win}`).querySelector(".frame").src;
                    document.querySelector(`#${win}`).querySelector(".frame").src = "about:blank";
                    document.querySelector(`#${win}`).querySelector(".frame").src = src;
                } else {
                    console.error("Window not found, this shouldn't be!");
                }
            }
        }
    
        appsShellName.setAttribute("data-id", windowID);
        newwin.id = windowID;
        newwin.classList.add("win");
        newwin.classList.add("maxiN");
        newwin.setAttribute("data-title", title);
        const windows = document.querySelectorAll(".win");
        for (let i = 0; i < windows.length; i++) {
            windows[i].classList.add("winNotFocus");
            windows[i].classList.remove("winFocus");
            windows[i].querySelector(".focusWinEl").classList.remove("no");
            windows[i].querySelector(".focusWinEl").classList.add("yes");
        }
    
        newwin.classList.add("winFocus");
        newwin.style.opacity = "";
        newwin.classList.remove("winNotFocus");
        if(appName != null && appName != undefined) {
            newwin.setAttribute("data-app", appName);
        }
    
        if(localStorage.getItem("shadow") === "yes") {
            if(localStorage.getItem("winshadow") === "default") {
                if(localStorage.getItem("accentShadow") === "yes") {
                    newwin.style.boxShadow = `0 0 1px 1px var(--accentShadow), 0px 0px 13px 4px var(--accentShadow)`;
                    newwin.classList.add("shadow");
                } else {
                    newwin.style.boxShadow = `0 0 1px 1px var(--window-shadow-border), 0px 0px 13px 4px rgb(0 0 0 / 32%)`;
                    newwin.classList.add("shadow");
                }
            } else {
                newwin.style.boxShadow = `0 0 1px 1px ${localStorage.getItem("winshadow")}, 0 0 13px 4px ${localStorage.getItem("winshadow")}`;
                newwin.classList.add("shadow");
            }
        }
        switch(localStorage.getItem("fullscreen")) {
            case null:
                break;
            case "yes":
                shell.style.borderRadius = "0px";
                if(localStorage.getItem("dockFull") === "yes") {
                    switch(localStorage.getItem("dockPos").toLowerCase()) {
                        case "left":
                            newwin.classList.add("LDF");
                            newwin.classList.remove("RDF");
                            newwin.classList.remove("BDF");
                            break;
                        case "right":
                            newwin.classList.add("RDF");
                            newwin.classList.remove("LDF");
                            newwin.classList.remove("BDF");
                            break;
                        case "bottom":
                            newwin.classList.add("BDF");
                            newwin.classList.remove("LDF");
                            newwin.classList.remove("RDF");
                            break;
                        default:
                            break;
                    }
                } else {
                    switch(localStorage.getItem("dockPos").toLowerCase()) {
                        case "left":
                            newwin.classList.add("LD");
                            newwin.classList.remove("RD");
                            newwin.classList.remove("BD");
                            break;
                        case "right":
                            newwin.classList.add("RD");
                            newwin.classList.remove("LD");
                            newwin.classList.remove("BD");
                            break;
                        case "bottom":
                            newwin.classList.add("BD");
                            newwin.classList.remove("LD");
                            newwin.classList.remove("RD");
                            break;
                    }
                }
                newwin.classList.remove("maxiN");
                newwin.classList.add("maxiY");
                newwin.classList.add("maxiR");
                newwin.classList.add("noShadow");
                newwin.classList.remove("shadow");
                maxState = true;
                break;
            case "no":
                break;
            default:
                break;
        }
        if(localStorage.getItem('radius') === "yes") {
            newwin.classList.add("radius");
        } else if(localStorage.getItem('radius') === "custom") {
            newwin.classList.add("custom");
            newwin.style.borderRadius = localStorage.getItem('roundness') + "px";
        } else if(localStorage.getItem('radius') === "no") {
            newwin.classList.remove("radius");
            newwin.classList.add("custom");
            newwin.classList.add("noRad");
        } else if(localStorage.getItem('radius') === null) {
            newwin.classList.add("radius");
        }
    
        if(localStorage.getItem('shadow') === "yes") {
            newwin.classList.add("shadow");
        } else if(localStorage.getItem('shadow') === "no") {
            newwin.classList.remove("shadow");
        } else if(localStorage.getItem('shadow') === null) {}
        const winconts = document.createElement("div");
        winconts.classList.add("winconts");
        winconts.setAttribute("id", "drag");
        const controls = document.createElement("div");
        let controlsHTML;
        if(controlsTypes === "minmaxclose") {
            controlsHTML = `
                <a class='winc mini' id="mini">
                    <svg class="winic" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="15" height="0.5" fill="#D9D9D9"/>
                    </svg>
                </a>
                <a id='maxi' class='winc maxi'>
                    <svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none">
                        <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5" />
                    </svg>
                </a>
                <a class='close winc' id='close'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic">
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                </a>
            `;
        } else if(controlsTypes === "minmax") {
            controlsHTML = `
                <a class='winc mini' id="mini">
                    <svg class="winic" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="15" height="0.5" fill="#D9D9D9"/>
                    </svg>
                </a>
                <a id='maxi' class='winc maxi'>
                    <svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none">
                        <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5" />
                    </svg>
                </a>
            `;
        } else if(controlsTypes === "minclose") {
            controlsHTML = `
                <a class='winc mini' id="mini">
                    <svg class="winic" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="15" height="0.5" fill="#D9D9D9"/>
                    </svg>
                </a>
                <a class='close winc' id='close'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic">
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                </a>
            `;
        } else if(controlsTypes === "maxclose") {
            controlsHTML = `
                <a id='maxi' class='winc maxi'>
                    <svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none">
                        <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5" />
                    </svg>
                </a>
                <a class='close winc' id='close'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic">
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                </a>
            `;
        } else if(controlsTypes === "close") {
            controlsHTML = `
                <a class='close winc' id='close'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic">
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                </a>
            `;
        } else if(controlsTypes === undefined) {
            controlsHTML = `
                <a class='winc mini' id="mini">
                    <svg class="winic" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="15" height="0.5" fill="#D9D9D9"/>
                    </svg>
                </a>
                <a id='maxi' class='winc maxi'>
                    <svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none">
                        <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5" />
                    </svg>
                </a>
                <a class='close winc' id='close'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic">
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                </a>
            `;
        }
        controls.classList.add("controls");
        controls.innerHTML = controlsHTML;
        const titleElement = document.createElement("div");
        let titleHTML = title;
        titleElement.classList.add("title");
        titleElement.innerHTML = titleHTML;
        const favicon = document.createElement("div");
        favicon.classList.add("icon");
        favicon.classList.add("iconL");
        if(localStorage.getItem("winBtnPos") === null) {
            favicon.classList.add("iconL");
            favicon.classList.remove("iconR");
            controls.classList.add("controlsR");
            controls.classList.remove("controlsL");
        }
        switch(localStorage.getItem("winBtnPos")) {
            case null:
                favicon.classList.add("iconL");
                favicon.classList.remove("iconR");
                controls.classList.add("controlsR");
                controls.classList.remove("controlsL");
                break;
            case "left":
                favicon.classList.add("iconR");
                favicon.classList.remove("iconL");
                controls.classList.remove("controlsR");
                controls.classList.add("controlsL");
                break;
            case "right":
                favicon.classList.add("iconL");
                favicon.classList.remove("iconR");
                controls.classList.remove("controlsL");
                controls.classList.add("controlsR");
                break;
            default:
                break;
        }
    
        const appItem = document.querySelectorAll(".appItem");
        let appCount = 1;
        let win = document.querySelectorAll(".win");
        for (let i = 0; i < win.length; i++) {
            if (win[i].getAttribute("data-appName") === appName) {
                appCount++;
            }
        }
        if(appCount > 1) {
            let dockItem = document.querySelectorAll(".dockbtn");
            for (let i = 0; i < dockItem.length; i++) {
                if(dockItem[i].getAttribute("app") === appName) {
                    dockItem[i].classList.add("group");
                    dockItem[i].setAttribute("data-group", appCount);
                    dockItem[i].setAttribute("data-groupId", newwin.id);
                    break;
                }
            }
        }
        let newdock = document.createElement("div");
        newdock.setAttribute("data-appId", newwin.id);
        newdock.classList.add("appItem");
        newdock.classList.add("active");
        newdock.setAttribute("title", title);
        newdock.setAttribute("app", appName);
        newdock.classList.add("dockbtn");
        newdock.classList.add("alert");
        setTimeout(() => {
            newdock.classList.remove("alert");
        }, 4000);
        for (let i = 0; i < appItem.length; i++) {
            appItem[i].classList.remove("active");
        }
        newdock.classList.add("active");
        if(os === "false") {
            newdock.innerHTML = `<img class="dockicon" src="${icn}" alt="${title}">`;
        }
        newdock.onclick = (e) => {
            if(newwin.classList.contains("winmini")) {
                newwin.classList.remove("winmini");
                newwin.classList.remove("negZI");
            }
            appsShellName.classList.remove("inactive");
            const appItem = document.querySelectorAll(".appItem");
            for (let i = 0; i < appItem.length; i++) {
                appItem[i].classList.remove("active");
            }
            newdock.classList.add("active");
            appsShellName.innerText = title;
            appsShellName.setAttribute("data-id", windowID);
            const windows = document.querySelectorAll(".win");
            for (let i = 0; i < windows.length; i++) {
                windows[i].classList.add("winNotFocus");
                windows[i].classList.remove("winFocus");
                windows[i].querySelector(".focusWinEl").classList.add("yes");
                windows[i].querySelector(".focusWinEl").classList.remove("no");
            }
            newwin.querySelector(".focusWinEl").classList.remove("yes");
            newwin.querySelector(".focusWinEl").classList.add("no");
        
            newwin.classList.add("winFocus");
            newwin.style.opacity = "";
            newwin.classList.remove("winNotFocus");
            if(appsMini == 1) {
                appsMini--;
            } else if(appsMini >= 1) {
                appsMini--;
            }
            if(maxState === true) {
                newwin.classList.add("maxiY");
            }
        }
        let faviconHTML;
        switch(os) {
            case "false":
                faviconHTML = `
                    <img draggable='false' src='${icn}' class='favicon' id='favicon'>
                `;
                break;
        }
        switch(appName) {
            case "player":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M74.1229 43.182C76.7895 41.6424 76.7895 37.7934 74.1229 36.2538L14 1.54187C11.3333 0.00226495 8 1.92677 8 5.00597V74.4299C8 77.5091 11.3333 79.4336 14 77.894L74.1229 43.182ZM32.2193 26.851V33.3136H25.0733V53.8039H18.1934V33.3136H11.0474V26.851H32.2193ZM45.6736 26.889C50.805 26.889 54.568 29.9682 54.416 35.1003C54.378 36.3168 53.5798 38.4837 51.6412 39.4721C55.3283 41.3349 55.7844 44.7943 55.4423 46.8471C54.7581 51.1809 51.8313 53.8039 45.8637 53.8039H34.8786V26.889H45.6736ZM41.7205 32.6293V37.4193H45.6736C48.9805 37.4193 49.0945 32.6293 45.6736 32.6293H41.7205ZM41.7205 42.3233V47.8355H45.6736C49.7787 47.8355 49.7027 42.3233 45.6736 42.3233H41.7205Z"/>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M74.1229 43.182C76.7895 41.6424 76.7895 37.7934 74.1229 36.2538L14 1.54187C11.3333 0.00226495 8 1.92677 8 5.00597V74.4299C8 77.5091 11.3333 79.4336 14 77.894L74.1229 43.182ZM32.2193 26.851V33.3136H25.0733V53.8039H18.1934V33.3136H11.0474V26.851H32.2193ZM45.6736 26.889C50.805 26.889 54.568 29.9682 54.416 35.1003C54.378 36.3168 53.5798 38.4837 51.6412 39.4721C55.3283 41.3349 55.7844 44.7943 55.4423 46.8471C54.7581 51.1809 51.8313 53.8039 45.8637 53.8039H34.8786V26.889H45.6736ZM41.7205 32.6293V37.4193H45.6736C48.9805 37.4193 49.0945 32.6293 45.6736 32.6293H41.7205ZM41.7205 42.3233V47.8355H45.6736C49.7787 47.8355 49.7027 42.3233 45.6736 42.3233H41.7205Z"/>
                    </svg>
                    
                `;
                break;
            case "help":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill" d="M2.23295 6.54545V6.49432C2.23864 5.9517 2.29545 5.51989 2.40341 5.19886C2.51136 4.87784 2.66477 4.6179 2.86364 4.41903C3.0625 4.22017 3.30114 4.03693 3.57955 3.86932C3.74716 3.76705 3.89773 3.64631 4.03125 3.5071C4.16477 3.36506 4.26989 3.2017 4.34659 3.01705C4.42614 2.83239 4.46591 2.62784 4.46591 2.40341C4.46591 2.125 4.40057 1.88352 4.26989 1.67898C4.1392 1.47443 3.96449 1.31676 3.74574 1.20597C3.52699 1.09517 3.28409 1.03977 3.01705 1.03977C2.78409 1.03977 2.55966 1.08807 2.34375 1.18466C2.12784 1.28125 1.94744 1.43324 1.80256 1.64062C1.65767 1.84801 1.57386 2.11932 1.55114 2.45455H0.477273C0.5 1.97159 0.625 1.55824 0.852273 1.21449C1.08239 0.870739 1.38494 0.607954 1.75994 0.426136C2.13778 0.244318 2.55682 0.153409 3.01705 0.153409C3.51705 0.153409 3.9517 0.252841 4.32102 0.451704C4.69318 0.650568 4.98011 0.923295 5.18182 1.26989C5.38636 1.61648 5.48864 2.01136 5.48864 2.45455C5.48864 2.76705 5.44034 3.04972 5.34375 3.30256C5.25 3.5554 5.11364 3.78125 4.93466 3.98011C4.75852 4.17898 4.54545 4.35511 4.29545 4.50852C4.04545 4.66477 3.84517 4.82955 3.6946 5.00284C3.54403 5.1733 3.43466 5.37642 3.36648 5.61222C3.2983 5.84801 3.26136 6.14205 3.25568 6.49432V6.54545H2.23295ZM2.77841 9.06818C2.56818 9.06818 2.38778 8.9929 2.23722 8.84233C2.08665 8.69176 2.01136 8.51136 2.01136 8.30114C2.01136 8.09091 2.08665 7.91051 2.23722 7.75994C2.38778 7.60937 2.56818 7.53409 2.77841 7.53409C2.98864 7.53409 3.16903 7.60937 3.3196 7.75994C3.47017 7.91051 3.54545 8.09091 3.54545 8.30114C3.54545 8.44034 3.50994 8.56818 3.43892 8.68466C3.37074 8.80114 3.27841 8.89489 3.16193 8.96591C3.0483 9.03409 2.92045 9.06818 2.77841 9.06818Z"/>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg title="Terbium Help" class="dockicon" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill" d="M2.23295 6.54545V6.49432C2.23864 5.9517 2.29545 5.51989 2.40341 5.19886C2.51136 4.87784 2.66477 4.6179 2.86364 4.41903C3.0625 4.22017 3.30114 4.03693 3.57955 3.86932C3.74716 3.76705 3.89773 3.64631 4.03125 3.5071C4.16477 3.36506 4.26989 3.2017 4.34659 3.01705C4.42614 2.83239 4.46591 2.62784 4.46591 2.40341C4.46591 2.125 4.40057 1.88352 4.26989 1.67898C4.1392 1.47443 3.96449 1.31676 3.74574 1.20597C3.52699 1.09517 3.28409 1.03977 3.01705 1.03977C2.78409 1.03977 2.55966 1.08807 2.34375 1.18466C2.12784 1.28125 1.94744 1.43324 1.80256 1.64062C1.65767 1.84801 1.57386 2.11932 1.55114 2.45455H0.477273C0.5 1.97159 0.625 1.55824 0.852273 1.21449C1.08239 0.870739 1.38494 0.607954 1.75994 0.426136C2.13778 0.244318 2.55682 0.153409 3.01705 0.153409C3.51705 0.153409 3.9517 0.252841 4.32102 0.451704C4.69318 0.650568 4.98011 0.923295 5.18182 1.26989C5.38636 1.61648 5.48864 2.01136 5.48864 2.45455C5.48864 2.76705 5.44034 3.04972 5.34375 3.30256C5.25 3.5554 5.11364 3.78125 4.93466 3.98011C4.75852 4.17898 4.54545 4.35511 4.29545 4.50852C4.04545 4.66477 3.84517 4.82955 3.6946 5.00284C3.54403 5.1733 3.43466 5.37642 3.36648 5.61222C3.2983 5.84801 3.26136 6.14205 3.25568 6.49432V6.54545H2.23295ZM2.77841 9.06818C2.56818 9.06818 2.38778 8.9929 2.23722 8.84233C2.08665 8.69176 2.01136 8.51136 2.01136 8.30114C2.01136 8.09091 2.08665 7.91051 2.23722 7.75994C2.38778 7.60937 2.56818 7.53409 2.77841 7.53409C2.98864 7.53409 3.16903 7.60937 3.3196 7.75994C3.47017 7.91051 3.54545 8.09091 3.54545 8.30114C3.54545 8.44034 3.50994 8.56818 3.43892 8.68466C3.37074 8.80114 3.27841 8.89489 3.16193 8.96591C3.0483 9.03409 2.92045 9.06818 2.77841 9.06818Z"/>
                    </svg>
                `;
                break;
            case "settings":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M37.5 70.5C36.6716 70.5 36 69.8284 36 69V65.1042C32.7614 64.5276 29.7344 63.3396 27.0425 61.6639L22.6212 66.1768C22.0425 66.7696 21.0928 66.7811 20.5 66.2024L16.2064 62.0113C15.6136 61.4327 15.6021 60.483 16.1808 59.8902L20.3521 55.6325C17.889 52.4624 16.1575 48.6955 15.4112 44.5854H11C10.1716 44.5854 9.5 43.9138 9.5 43.0854V37.0854C9.5 36.2569 10.1716 35.5854 11 35.5854H15.3808C15.962 32.255 17.1894 29.1467 18.929 26.3944L15.195 22.6069C14.6038 22.0266 14.5951 21.0769 15.1754 20.4857L19.3788 16.2041C19.9591 15.613 20.9088 15.6042 21.5 16.1846L25.0086 19.7433C28.1712 17.3211 31.9175 15.6227 36 14.8958V11C36 10.1716 36.6716 9.5 37.5 9.5H43.5C44.3284 9.5 45 10.1716 45 11V14.8958C48.9649 15.6018 52.6128 17.224 55.7167 19.5358L59 16.1846C59.5787 15.5917 60.5283 15.5803 61.1212 16.1589L65.4148 20.35C66.0076 20.9287 66.0191 21.8784 65.4404 22.4712L61.8833 26.1019C63.7224 28.9257 65.0173 32.1365 65.6193 35.5854H70C70.8284 35.5854 71.5 36.2569 71.5 37.0854V43.0854C71.5 43.9138 70.8284 44.5854 70 44.5854H65.5889C64.8312 48.7583 63.0579 52.5774 60.5345 55.7773L64.5 59.7996C65.0912 60.38 65.0999 61.3297 64.5196 61.9208L60.3162 66.2024C59.7359 66.7936 58.7862 66.8023 58.195 66.222L53.7982 61.7622C51.1464 63.3861 48.1748 64.5389 45 65.1042V69C45 69.8284 44.3284 70.5 43.5 70.5H37.5ZM41 56C49.8366 56 57 48.8366 57 40C57 31.1634 49.8366 24 41 24C32.1634 24 25 31.1634 25 40C25 48.8366 32.1634 56 41 56Z"/>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" title="Terbium Settings" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M37.5 70.5C36.6716 70.5 36 69.8284 36 69V65.1042C32.7614 64.5276 29.7344 63.3396 27.0425 61.6639L22.6212 66.1768C22.0425 66.7696 21.0928 66.7811 20.5 66.2024L16.2064 62.0113C15.6136 61.4327 15.6021 60.483 16.1808 59.8902L20.3521 55.6325C17.889 52.4624 16.1575 48.6955 15.4112 44.5854H11C10.1716 44.5854 9.5 43.9138 9.5 43.0854V37.0854C9.5 36.2569 10.1716 35.5854 11 35.5854H15.3808C15.962 32.255 17.1894 29.1467 18.929 26.3944L15.195 22.6069C14.6038 22.0266 14.5951 21.0769 15.1754 20.4857L19.3788 16.2041C19.9591 15.613 20.9088 15.6042 21.5 16.1846L25.0086 19.7433C28.1712 17.3211 31.9175 15.6227 36 14.8958V11C36 10.1716 36.6716 9.5 37.5 9.5H43.5C44.3284 9.5 45 10.1716 45 11V14.8958C48.9649 15.6018 52.6128 17.224 55.7167 19.5358L59 16.1846C59.5787 15.5917 60.5283 15.5803 61.1212 16.1589L65.4148 20.35C66.0076 20.9287 66.0191 21.8784 65.4404 22.4712L61.8833 26.1019C63.7224 28.9257 65.0173 32.1365 65.6193 35.5854H70C70.8284 35.5854 71.5 36.2569 71.5 37.0854V43.0854C71.5 43.9138 70.8284 44.5854 70 44.5854H65.5889C64.8312 48.7583 63.0579 52.5774 60.5345 55.7773L64.5 59.7996C65.0912 60.38 65.0999 61.3297 64.5196 61.9208L60.3162 66.2024C59.7359 66.7936 58.7862 66.8023 58.195 66.222L53.7982 61.7622C51.1464 63.3861 48.1748 64.5389 45 65.1042V69C45 69.8284 44.3284 70.5 43.5 70.5H37.5ZM41 56C49.8366 56 57 48.8366 57 40C57 31.1634 49.8366 24 41 24C32.1634 24 25 31.1634 25 40C25 48.8366 32.1634 56 41 56Z"/>
                    </svg>
                `;
                break;
            case "hypertabs":
                faviconHTML = `
                    <svg class="favicon stroke" id="favicon" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
                        <circle cx="12" cy="12" r="7" />
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockIcon stroke" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
                        <circle cx="12" cy="12" r="7" />
                    </svg>
                `;
                break;
            case "color":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none">
                        <path class="stroke" d="M13.3333 53.3333L52.3333 14.3333C52.9564 13.7226 53.7942 13.3805 54.6667 13.3805C55.5392 13.3805 56.3769 13.7226 57 14.3333L65.6667 23C66.2774 23.6231 66.6195 24.4608 66.6195 25.3333C66.6195 26.2058 66.2774 27.0436 65.6667 27.6667L26.6667 66.6667H13.3333V53.3333Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        <path class="stroke" d="M36.6667 23.3333L56.6667 43.3333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                        <path class="stroke" d="M13.3333 53.3333L52.3333 14.3333C52.9564 13.7226 53.7942 13.3805 54.6667 13.3805C55.5392 13.3805 56.3769 13.7226 57 14.3333L65.6667 23C66.2774 23.6231 66.6195 24.4608 66.6195 25.3333C66.6195 26.2058 66.2774 27.0436 65.6667 27.6667L26.6667 66.6667H13.3333V53.3333Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        <path class="stroke" d="M36.6667 23.3333L56.6667 43.3333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                `;
                break;
            case "canvas":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none">
                        <path class="stroke" d="M13.3333 53.3333L52.3333 14.3333C52.9564 13.7226 53.7942 13.3805 54.6667 13.3805C55.5392 13.3805 56.3769 13.7226 57 14.3333L65.6667 23C66.2774 23.6231 66.6195 24.4608 66.6195 25.3333C66.6195 26.2058 66.2774 27.0436 65.6667 27.6667L26.6667 66.6667H13.3333V53.3333Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        <path class="stroke" d="M36.6667 23.3333L56.6667 43.3333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                        <path class="stroke" d="M13.3333 53.3333L52.3333 14.3333C52.9564 13.7226 53.7942 13.3805 54.6667 13.3805C55.5392 13.3805 56.3769 13.7226 57 14.3333L65.6667 23C66.2774 23.6231 66.6195 24.4608 66.6195 25.3333C66.6195 26.2058 66.2774 27.0436 65.6667 27.6667L26.6667 66.6667H13.3333V53.3333Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                        <path class="stroke" d="M36.6667 23.3333L56.6667 43.3333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                `;
                break;
            case "browser":
                faviconHTML = `
                    <svg class="favicon stroke" id="favicon" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
                        <circle cx="12" cy="12" r="7" />
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockIcon stroke" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
                        <circle cx="12" cy="12" r="7" />
                    </svg>
                `;
                break;
            case "text":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none">
                        <path class="fill" d="M25.84 33.44H18.32V55H11.08V33.44H3.56V26.64H25.84V33.44ZM39.4784 36.36L44.4384 26.68H52.7584L44.8384 40.88L52.7584 55H44.4384L39.4784 45.36L34.6384 55H26.2784L34.2384 40.88L26.2784 26.68H34.6384L39.4784 36.36ZM75.4884 33.44H67.9684V55H60.7284V33.44H53.2084V26.64H75.4884V33.44Z"/>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                        <path class="fill" d="M25.84 33.44H18.32V55H11.08V33.44H3.56V26.64H25.84V33.44ZM39.4784 36.36L44.4384 26.68H52.7584L44.8384 40.88L52.7584 55H44.4384L39.4784 45.36L34.6384 55H26.2784L34.2384 40.88L26.2784 26.68H34.6384L39.4784 36.36ZM75.4884 33.44H67.9684V55H60.7284V33.44H53.2084V26.64H75.4884V33.44Z"/>
                    </svg>
                `;
                break;
            case "terminal":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none">
                        <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M9 23C9 19.6863 11.6863 17 15 17H65.6111C68.9248 17 71.6111 19.6863 71.6111 23V57C71.6111 60.3137 68.9248 63 65.6111 63H15C11.6863 63 9 60.3137 9 57V23ZM38.3889 46.4945C38.3889 45.9422 38.8366 45.4945 39.3889 45.4945H56.5555C57.1078 45.4945 57.5555 45.9422 57.5555 46.4945V49.6056C57.5555 50.1579 57.1078 50.6056 56.5555 50.6056H39.3889C38.8366 50.6056 38.3889 50.1579 38.3889 49.6056V46.4945ZM21.2652 45.9362C20.8421 46.2912 20.787 46.9219 21.142 47.345L23.6893 50.3808C24.0443 50.8039 24.6751 50.8591 25.0981 50.5041L34.2339 42.8382L37.2697 40.2909C37.6928 39.9359 37.748 39.3051 37.393 38.8821L34.8456 35.8463L34.8452 35.8457L27.1798 26.7105C26.8248 26.2874 26.194 26.2322 25.771 26.5872L22.7352 29.1346C22.3121 29.4896 22.2569 30.1203 22.6119 30.5434L28.1976 37.2002L28.8344 38.2495C29.0609 38.6227 29.0192 39.0996 28.7314 39.4277L27.9221 40.3504L27.922 40.3505L21.2652 45.9362ZM29.635 38.9132L28.1976 37.2002L29.635 38.9131L29.635 38.9132Z"/>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                        <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M9 23C9 19.6863 11.6863 17 15 17H65.6111C68.9248 17 71.6111 19.6863 71.6111 23V57C71.6111 60.3137 68.9248 63 65.6111 63H15C11.6863 63 9 60.3137 9 57V23ZM38.3889 46.4945C38.3889 45.9422 38.8366 45.4945 39.3889 45.4945H56.5555C57.1078 45.4945 57.5555 45.9422 57.5555 46.4945V49.6056C57.5555 50.1579 57.1078 50.6056 56.5555 50.6056H39.3889C38.8366 50.6056 38.3889 50.1579 38.3889 49.6056V46.4945ZM21.2652 45.9362C20.8421 46.2912 20.787 46.9219 21.142 47.345L23.6893 50.3808C24.0443 50.8039 24.6751 50.8591 25.0981 50.5041L34.2339 42.8382L37.2697 40.2909C37.6928 39.9359 37.748 39.3051 37.393 38.8821L34.8456 35.8463L34.8452 35.8457L27.1798 26.7105C26.8248 26.2874 26.194 26.2322 25.771 26.5872L22.7352 29.1346C22.3121 29.4896 22.2569 30.1203 22.6119 30.5434L28.1976 37.2002L28.8344 38.2495C29.0609 38.6227 29.0192 39.0996 28.7314 39.4277L27.9221 40.3504L27.922 40.3505L21.2652 45.9362ZM29.635 38.9132L28.1976 37.2002L29.635 38.9131L29.635 38.9132Z"/>
                    </svg>
                `;
                break;
            case "canvas":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_357_6)">
                            <path class="fill" d="M38.185 28.3046C39.2895 28.3046 40.185 27.4092 40.185 26.3046V17.8946C40.185 16.79 39.2895 15.8946 38.185 15.8946H2C0.895431 15.8946 0 16.79 0 17.8946V26.3046C0 27.4092 0.895431 28.3046 2 28.3046H11.5633C12.6679 28.3046 13.5633 29.2 13.5633 30.3046V65.6516C13.5633 66.7562 14.4588 67.6516 15.5633 67.6516H24.6216C25.7262 67.6516 26.6216 66.7562 26.6216 65.6516V30.3046C26.6216 29.2 27.5171 28.3046 28.6216 28.3046H38.185ZM82.3151 31.7356C82.6035 21.8806 75.4613 15.9676 65.7215 15.9676H47.2323C46.1277 15.9676 45.2323 16.863 45.2323 17.9676V65.6516C45.2323 66.7562 46.1277 67.6516 47.2323 67.6516H66.0824C77.4092 67.6516 82.9644 62.6146 84.2629 54.2926C84.8847 50.5173 84.1171 44.2648 77.9039 40.6006C77.5532 40.3938 77.5487 39.8621 77.8871 39.6358C80.9601 37.581 82.2486 33.8854 82.3151 31.7356ZM60.2184 36.1886C59.1139 36.1886 58.2184 35.2932 58.2184 34.1886V28.9906C58.2184 27.886 59.1139 26.9906 60.2184 26.9906H65.7215C72.2146 26.9906 71.9982 36.1886 65.7215 36.1886H60.2184ZM60.2184 56.1906C59.1139 56.1906 58.2184 55.2952 58.2184 54.1906V47.6056C58.2184 46.501 59.1139 45.6056 60.2184 45.6056H65.7215C73.3689 45.6056 73.5132 56.1906 65.7215 56.1906H60.2184Z"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_357_6">
                            <rect width="84.44" height="84.44" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_357_6)">
                            <path class="fill" d="M38.185 28.3046C39.2895 28.3046 40.185 27.4092 40.185 26.3046V17.8946C40.185 16.79 39.2895 15.8946 38.185 15.8946H2C0.895431 15.8946 0 16.79 0 17.8946V26.3046C0 27.4092 0.895431 28.3046 2 28.3046H11.5633C12.6679 28.3046 13.5633 29.2 13.5633 30.3046V65.6516C13.5633 66.7562 14.4588 67.6516 15.5633 67.6516H24.6216C25.7262 67.6516 26.6216 66.7562 26.6216 65.6516V30.3046C26.6216 29.2 27.5171 28.3046 28.6216 28.3046H38.185ZM82.3151 31.7356C82.6035 21.8806 75.4613 15.9676 65.7215 15.9676H47.2323C46.1277 15.9676 45.2323 16.863 45.2323 17.9676V65.6516C45.2323 66.7562 46.1277 67.6516 47.2323 67.6516H66.0824C77.4092 67.6516 82.9644 62.6146 84.2629 54.2926C84.8847 50.5173 84.1171 44.2648 77.9039 40.6006C77.5532 40.3938 77.5487 39.8621 77.8871 39.6358C80.9601 37.581 82.2486 33.8854 82.3151 31.7356ZM60.2184 36.1886C59.1139 36.1886 58.2184 35.2932 58.2184 34.1886V28.9906C58.2184 27.886 59.1139 26.9906 60.2184 26.9906H65.7215C72.2146 26.9906 71.9982 36.1886 65.7215 36.1886H60.2184ZM60.2184 56.1906C59.1139 56.1906 58.2184 55.2952 58.2184 54.1906V47.6056C58.2184 46.501 59.1139 45.6056 60.2184 45.6056H65.7215C73.3689 45.6056 73.5132 56.1906 65.7215 56.1906H60.2184Z"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_357_6">
                            <rect width="84.44" height="84.44" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                `;
                break;
            case "changelog":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_357_6)">
                            <path class="fill" d="M38.185 28.3046C39.2895 28.3046 40.185 27.4092 40.185 26.3046V17.8946C40.185 16.79 39.2895 15.8946 38.185 15.8946H2C0.895431 15.8946 0 16.79 0 17.8946V26.3046C0 27.4092 0.895431 28.3046 2 28.3046H11.5633C12.6679 28.3046 13.5633 29.2 13.5633 30.3046V65.6516C13.5633 66.7562 14.4588 67.6516 15.5633 67.6516H24.6216C25.7262 67.6516 26.6216 66.7562 26.6216 65.6516V30.3046C26.6216 29.2 27.5171 28.3046 28.6216 28.3046H38.185ZM82.3151 31.7356C82.6035 21.8806 75.4613 15.9676 65.7215 15.9676H47.2323C46.1277 15.9676 45.2323 16.863 45.2323 17.9676V65.6516C45.2323 66.7562 46.1277 67.6516 47.2323 67.6516H66.0824C77.4092 67.6516 82.9644 62.6146 84.2629 54.2926C84.8847 50.5173 84.1171 44.2648 77.9039 40.6006C77.5532 40.3938 77.5487 39.8621 77.8871 39.6358C80.9601 37.581 82.2486 33.8854 82.3151 31.7356ZM60.2184 36.1886C59.1139 36.1886 58.2184 35.2932 58.2184 34.1886V28.9906C58.2184 27.886 59.1139 26.9906 60.2184 26.9906H65.7215C72.2146 26.9906 71.9982 36.1886 65.7215 36.1886H60.2184ZM60.2184 56.1906C59.1139 56.1906 58.2184 55.2952 58.2184 54.1906V47.6056C58.2184 46.501 59.1139 45.6056 60.2184 45.6056H65.7215C73.3689 45.6056 73.5132 56.1906 65.7215 56.1906H60.2184Z"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_357_6">
                            <rect width="84.44" height="84.44" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_357_6)">
                            <path class="fill" d="M38.185 28.3046C39.2895 28.3046 40.185 27.4092 40.185 26.3046V17.8946C40.185 16.79 39.2895 15.8946 38.185 15.8946H2C0.895431 15.8946 0 16.79 0 17.8946V26.3046C0 27.4092 0.895431 28.3046 2 28.3046H11.5633C12.6679 28.3046 13.5633 29.2 13.5633 30.3046V65.6516C13.5633 66.7562 14.4588 67.6516 15.5633 67.6516H24.6216C25.7262 67.6516 26.6216 66.7562 26.6216 65.6516V30.3046C26.6216 29.2 27.5171 28.3046 28.6216 28.3046H38.185ZM82.3151 31.7356C82.6035 21.8806 75.4613 15.9676 65.7215 15.9676H47.2323C46.1277 15.9676 45.2323 16.863 45.2323 17.9676V65.6516C45.2323 66.7562 46.1277 67.6516 47.2323 67.6516H66.0824C77.4092 67.6516 82.9644 62.6146 84.2629 54.2926C84.8847 50.5173 84.1171 44.2648 77.9039 40.6006C77.5532 40.3938 77.5487 39.8621 77.8871 39.6358C80.9601 37.581 82.2486 33.8854 82.3151 31.7356ZM60.2184 36.1886C59.1139 36.1886 58.2184 35.2932 58.2184 34.1886V28.9906C58.2184 27.886 59.1139 26.9906 60.2184 26.9906H65.7215C72.2146 26.9906 71.9982 36.1886 65.7215 36.1886H60.2184ZM60.2184 56.1906C59.1139 56.1906 58.2184 55.2952 58.2184 54.1906V47.6056C58.2184 46.501 59.1139 45.6056 60.2184 45.6056H65.7215C73.3689 45.6056 73.5132 56.1906 65.7215 56.1906H60.2184Z"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_357_6">
                            <rect width="84.44" height="84.44" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                `;
                break;
            case "image":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M14 8C10.6863 8 8 10.6863 8 14V66C8 69.3137 10.6863 72 14 72H66C69.3137 72 72 69.3137 72 66V14C72 10.6863 69.3137 8 66 8H14ZM46.6545 32.6273C50.8318 32.6273 54.2182 29.2409 54.2182 25.0636C54.2182 20.8864 50.8318 17.5 46.6545 17.5C42.4773 17.5 39.0909 20.8864 39.0909 25.0636C39.0909 29.2409 42.4773 32.6273 46.6545 32.6273ZM22.6569 37.7475L10.6865 60.5663C8.55578 64.628 11.5017 69.5 16.0883 69.5H50.4364H64.7475C68.83 69.5 71.1918 64.8719 68.7963 61.5661L59.3509 48.5314C57.5301 46.2969 53.3213 46.2165 51.3097 48.2709C51.2511 48.3307 51.1933 48.3915 51.1355 48.4523L51.1351 48.4527C51.0037 48.5908 50.8723 48.7289 50.7311 48.8568L41.0293 57.6389L39.5636 55.7909L27.5209 37.5325C26.3398 35.7419 23.6753 35.8597 22.6569 37.7475Z"/>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M14 8C10.6863 8 8 10.6863 8 14V66C8 69.3137 10.6863 72 14 72H66C69.3137 72 72 69.3137 72 66V14C72 10.6863 69.3137 8 66 8H14ZM46.6545 32.6273C50.8318 32.6273 54.2182 29.2409 54.2182 25.0636C54.2182 20.8864 50.8318 17.5 46.6545 17.5C42.4773 17.5 39.0909 20.8864 39.0909 25.0636C39.0909 29.2409 42.4773 32.6273 46.6545 32.6273ZM22.6569 37.7475L10.6865 60.5663C8.55578 64.628 11.5017 69.5 16.0883 69.5H50.4364H64.7475C68.83 69.5 71.1918 64.8719 68.7963 61.5661L59.3509 48.5314C57.5301 46.2969 53.3213 46.2165 51.3097 48.2709C51.2511 48.3307 51.1933 48.3915 51.1355 48.4523L51.1351 48.4527C51.0037 48.5908 50.8723 48.7289 50.7311 48.8568L41.0293 57.6389L39.5636 55.7909L27.5209 37.5325C26.3398 35.7419 23.6753 35.8597 22.6569 37.7475Z"/>
                    </svg>
                `;
                break;
            case "task":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect class="fill" x="41.6892" y="18.5555" width="15.5556" height="12.4445" rx="1.5"/>
                        <rect class="fill" x="49.4663" y="37.2223" width="15.5556" height="12.4445" rx="1.5"/>
                        <rect class="fill" x="47.9109" y="60.5555" width="15.5556" height="12.4445" rx="1.5"/>
                        <rect class="fill" x="14" y="3" width="18.6667" height="6.22223" rx="3"/>
                        <path class="fill" d="M15.2448 9.22226H30.8003H27.1337C26.5814 9.22226 26.1337 9.66997 26.1337 10.2223V46.5556H23.43C21.7731 46.5556 20.43 45.2125 20.43 43.5556V10.2223C20.43 9.66997 19.9823 9.22226 19.43 9.22226H15.2448Z"/>
                        <path class="fill" d="M26.1335 17V21.1852C26.1335 21.7375 26.5812 22.1852 27.1335 22.1852H40.6891C41.2413 22.1852 41.689 21.7375 41.689 21.1852V19.5926V29.963V28.3704C41.689 27.8181 41.2413 27.3704 40.689 27.3704H27.1335C26.5812 27.3704 26.1335 27.8181 26.1335 28.3704V32.5556V17Z"/>
                        <path class="fill" d="M26.1335 34.1111V39.3333C26.1335 39.8856 26.5812 40.3333 27.1335 40.3333H48.4668C49.0191 40.3333 49.4668 39.8856 49.4668 39.3333V37.2222V49.6666V47.5555C49.4668 47.0033 49.0191 46.5555 48.4668 46.5555H26.1335V34.1111Z"/>
                        <path class="fill" d="M29.2443 46.5556H40.1332H38.411C37.8587 46.5556 37.411 47.0033 37.411 47.5556V69.889H33.9666C32.862 69.889 31.9665 68.9935 31.9665 67.889V47.5556C31.9665 47.0033 31.5188 46.5556 30.9665 46.5556H29.2443Z"/>
                        <path class="fill" d="M37.42 61.5V62.6667C37.42 63.219 37.8677 63.6667 38.42 63.6667H46.9111C47.4634 63.6667 47.9111 63.219 47.9111 62.6667V62.1111V71.4445V70.8889C47.9111 70.3366 47.4634 69.8889 46.9111 69.8889H37.0222L37.42 61.5Z"/>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                        <rect class="fill" x="41.6892" y="18.5555" width="15.5556" height="12.4445" rx="1.5"/>
                        <rect class="fill" x="49.4663" y="37.2223" width="15.5556" height="12.4445" rx="1.5"/>
                        <rect class="fill" x="47.9109" y="60.5555" width="15.5556" height="12.4445" rx="1.5"/>
                        <rect class="fill" x="14" y="3" width="18.6667" height="6.22223" rx="3"/>
                        <path class="fill" d="M15.2448 9.22226H30.8003H27.1337C26.5814 9.22226 26.1337 9.66997 26.1337 10.2223V46.5556H23.43C21.7731 46.5556 20.43 45.2125 20.43 43.5556V10.2223C20.43 9.66997 19.9823 9.22226 19.43 9.22226H15.2448Z"/>
                        <path class="fill" d="M26.1335 17V21.1852C26.1335 21.7375 26.5812 22.1852 27.1335 22.1852H40.6891C41.2413 22.1852 41.689 21.7375 41.689 21.1852V19.5926V29.963V28.3704C41.689 27.8181 41.2413 27.3704 40.689 27.3704H27.1335C26.5812 27.3704 26.1335 27.8181 26.1335 28.3704V32.5556V17Z"/>
                        <path class="fill" d="M26.1335 34.1111V39.3333C26.1335 39.8856 26.5812 40.3333 27.1335 40.3333H48.4668C49.0191 40.3333 49.4668 39.8856 49.4668 39.3333V37.2222V49.6666V47.5555C49.4668 47.0033 49.0191 46.5555 48.4668 46.5555H26.1335V34.1111Z"/>
                        <path class="fill" d="M29.2443 46.5556H40.1332H38.411C37.8587 46.5556 37.411 47.0033 37.411 47.5556V69.889H33.9666C32.862 69.889 31.9665 68.9935 31.9665 67.889V47.5556C31.9665 47.0033 31.5188 46.5556 30.9665 46.5556H29.2443Z"/>
                        <path class="fill" d="M37.42 61.5V62.6667C37.42 63.219 37.8677 63.6667 38.42 63.6667H46.9111C47.4634 63.6667 47.9111 63.219 47.9111 62.6667V62.1111V71.4445V70.8889C47.9111 70.3366 47.4634 69.8889 46.9111 69.8889H37.0222L37.42 61.5Z"/>
                    </svg>
                `;
                break;
            case "ruffle":
                faviconHTML = `
                    <svg class="favicon" id="favicon" inkscape:version="1.0.2 (e86c870879, 2021-01-15)" sodipodi:docname="ruffle.svg" version="1.1" viewBox="0 0 40.1 42.9" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd">
                        <metadata>
                            <rdf:rdf>
                                <cc:work rdf:about="">
                                    <dc:format>image/svg+xml</dc:format>
                                    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type>
                                    <dc:title></dc:title>
                                </cc:work>
                            </rdf:rdf>
                        </metadata>
                        <sodipodi:namedview bordercolor="#666666" borderopacity="1" fit-margin-bottom="0" fit-margin-left="0" fit-margin-right="0" fit-margin-top="0" gridtolerance="10" guidetolerance="10" inkscape:current-layer="g1080" inkscape:cx="121.29662" inkscape:cy="44.453228" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-height="1014" inkscape:window-maximized="1" inkscape:window-width="1920" inkscape:window-x="0" inkscape:window-y="36" inkscape:zoom="3.8780488" objecttolerance="10" pagecolor="#ffffff" showgrid="false"></sodipodi:namedview>
                        <g transform="translate(-3.74 -21.2)" inkscape:groupmode="layer" inkscape:label="Image">
                            <g transform="matrix(.665 0 0 .64 -3.36 -.174)">
                                <g transform="matrix(.944 0 0 .962 2.59 3.76)">
                                    <path class="fill" d="m13.7 80.3c1.53-10.9 2.79-20.3 2.81-21 .0942-3.01 4.01-5.25 9.29-5.32 4.57-.0589 4.95-.21 2.96-1.17-1.75-.843-2.18-1.71-1.81-3.68.263-1.42.763-4.74 1.11-7.39.528-4 1.17-5.13 3.81-6.75 2.8-1.71 5.11-1.94 19.3-1.94 21.4-.005 21.1-.211 19.4 13.6-1.93 15.7-1.01 14.4-10.2 14.4-7.1 0-7.91-.188-7.46-1.75.272-.962.798-4.14 1.17-7.05l.673-5.3-11.7.606-1.13 6.93c-1.22 7.49-3.55 10.6-7.97 10.6-1.86 0-2.46.668-2.91 3.25-.622 3.59-4.53 30.6-4.53 31.3 0 .245-3.52.445-7.81.445h-7.81z"></path>
                                    <path class="fill" d="m32.4 65.6-2.51-12.2 7 5.89 3.86.466-1.38 2.72-2.3 2.25-1.69.594z"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" inkscape:version="1.0.2 (e86c870879, 2021-01-15)" sodipodi:docname="ruffle.svg" version="1.1" viewBox="0 0 40.1 42.9" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd">
                        <metadata>
                            <rdf:rdf>
                                <cc:work rdf:about="">
                                    <dc:format>image/svg+xml</dc:format>
                                    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type>
                                    <dc:title></dc:title>
                                </cc:work>
                            </rdf:rdf>
                        </metadata>
                        <sodipodi:namedview bordercolor="#666666" borderopacity="1" fit-margin-bottom="0" fit-margin-left="0" fit-margin-right="0" fit-margin-top="0" gridtolerance="10" guidetolerance="10" inkscape:current-layer="g1080" inkscape:cx="121.29662" inkscape:cy="44.453228" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-height="1014" inkscape:window-maximized="1" inkscape:window-width="1920" inkscape:window-x="0" inkscape:window-y="36" inkscape:zoom="3.8780488" objecttolerance="10" pagecolor="#ffffff" showgrid="false"></sodipodi:namedview>
                        <g transform="translate(-3.74 -21.2)" inkscape:groupmode="layer" inkscape:label="Image">
                            <g transform="matrix(.665 0 0 .64 -3.36 -.174)">
                                <g transform="matrix(.944 0 0 .962 2.59 3.76)">
                                    <path class="fill" d="m13.7 80.3c1.53-10.9 2.79-20.3 2.81-21 .0942-3.01 4.01-5.25 9.29-5.32 4.57-.0589 4.95-.21 2.96-1.17-1.75-.843-2.18-1.71-1.81-3.68.263-1.42.763-4.74 1.11-7.39.528-4 1.17-5.13 3.81-6.75 2.8-1.71 5.11-1.94 19.3-1.94 21.4-.005 21.1-.211 19.4 13.6-1.93 15.7-1.01 14.4-10.2 14.4-7.1 0-7.91-.188-7.46-1.75.272-.962.798-4.14 1.17-7.05l.673-5.3-11.7.606-1.13 6.93c-1.22 7.49-3.55 10.6-7.97 10.6-1.86 0-2.46.668-2.91 3.25-.622 3.59-4.53 30.6-4.53 31.3 0 .245-3.52.445-7.81.445h-7.81z"></path>
                                    <path class="fill" d="m32.4 65.6-2.51-12.2 7 5.89 3.86.466-1.38 2.72-2.3 2.25-1.69.594z"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                `;
                break;
            case "store":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_1361_2)">
                            <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M14 21C11.7909 21 10 22.7909 10 25V66C10 68.2091 11.7909 70 14 70H66C68.2091 70 70 68.2091 70 66V25C70 22.7909 68.2091 21 66 21H14ZM39.4477 38.697C39.4477 39.2493 38.9999 39.697 38.4477 39.697H34.2212C33.6689 39.697 33.2212 40.1448 33.2212 40.697V56.76C33.2212 57.3123 32.7734 57.76 32.2212 57.76H28.2265C27.6742 57.76 27.2265 57.3123 27.2265 56.76V40.697C27.2265 40.1448 26.7788 39.697 26.2265 39.697H22C21.4477 39.697 21 39.2493 21 38.697V35C21 34.4477 21.4477 34 22 34H38.4477C38.9999 34 39.4477 34.4477 39.4477 35V38.697ZM51.1707 34.0335C55.6419 34.0335 58.9207 36.748 58.7883 41.2721C58.7609 42.1554 58.2843 43.6071 57.1731 44.5785C56.8666 44.8464 56.8717 45.3927 57.2056 45.6256C59.6519 47.3319 59.9524 49.9882 59.6824 51.6273C59.0863 55.4477 56.5361 57.76 51.3363 57.76H42.7647C42.2124 57.76 41.7647 57.3123 41.7647 56.76V35.0335C41.7647 34.4812 42.2124 34.0335 42.7647 34.0335H51.1707ZM47.7262 42.3163C47.7262 42.8686 48.174 43.3163 48.7262 43.3163H51.1707C54.0521 43.3163 54.1515 39.0938 51.1707 39.0938H48.7262C48.174 39.0938 47.7262 39.5415 47.7262 40.0938V42.3163ZM47.7262 51.4986C47.7262 52.0509 48.174 52.4986 48.7262 52.4986H51.1707C54.7476 52.4986 54.6814 47.6394 51.1707 47.6394H48.7262C48.174 47.6394 47.7262 48.0871 47.7262 48.6394V51.4986Z" />
                        </g>
                        <g filter="url(#filter1_i_1361_2)">
                            <path class="fill2" d="M22 14C22 11.7909 23.7909 10 26 10H54.6154C56.4847 10 58 11.5153 58 13.3846V13.3846V21H52V17.3846C52 16.28 51.1046 15.3846 50 15.3846H30C28.8954 15.3846 28 16.28 28 17.3846V21H22V14Z" />
                        </g>
                        <defs>
                            <filter id="filter0_i_1361_2" x="8" y="19" width="62" height="51" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha" />
                                <feOffset dx="-2" dy="-2" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1361_2" />
                            </filter>
                            <filter id="filter1_i_1361_2" x="20" y="8" width="38" height="13" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha" />
                                <feOffset dx="-2" dy="-2" />
                                <feGaussianBlur stdDeviation="1.5" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1361_2" />
                            </filter>
                        </defs>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_1361_2)">
                            <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M14 21C11.7909 21 10 22.7909 10 25V66C10 68.2091 11.7909 70 14 70H66C68.2091 70 70 68.2091 70 66V25C70 22.7909 68.2091 21 66 21H14ZM39.4477 38.697C39.4477 39.2493 38.9999 39.697 38.4477 39.697H34.2212C33.6689 39.697 33.2212 40.1448 33.2212 40.697V56.76C33.2212 57.3123 32.7734 57.76 32.2212 57.76H28.2265C27.6742 57.76 27.2265 57.3123 27.2265 56.76V40.697C27.2265 40.1448 26.7788 39.697 26.2265 39.697H22C21.4477 39.697 21 39.2493 21 38.697V35C21 34.4477 21.4477 34 22 34H38.4477C38.9999 34 39.4477 34.4477 39.4477 35V38.697ZM51.1707 34.0335C55.6419 34.0335 58.9207 36.748 58.7883 41.2721C58.7609 42.1554 58.2843 43.6071 57.1731 44.5785C56.8666 44.8464 56.8717 45.3927 57.2056 45.6256C59.6519 47.3319 59.9524 49.9882 59.6824 51.6273C59.0863 55.4477 56.5361 57.76 51.3363 57.76H42.7647C42.2124 57.76 41.7647 57.3123 41.7647 56.76V35.0335C41.7647 34.4812 42.2124 34.0335 42.7647 34.0335H51.1707ZM47.7262 42.3163C47.7262 42.8686 48.174 43.3163 48.7262 43.3163H51.1707C54.0521 43.3163 54.1515 39.0938 51.1707 39.0938H48.7262C48.174 39.0938 47.7262 39.5415 47.7262 40.0938V42.3163ZM47.7262 51.4986C47.7262 52.0509 48.174 52.4986 48.7262 52.4986H51.1707C54.7476 52.4986 54.6814 47.6394 51.1707 47.6394H48.7262C48.174 47.6394 47.7262 48.0871 47.7262 48.6394V51.4986Z" />
                        </g>
                        <g filter="url(#filter1_i_1361_2)">
                            <path class="fill2" d="M22 14C22 11.7909 23.7909 10 26 10H54.6154C56.4847 10 58 11.5153 58 13.3846V13.3846V21H52V17.3846C52 16.28 51.1046 15.3846 50 15.3846H30C28.8954 15.3846 28 16.28 28 17.3846V21H22V14Z" />
                        </g>
                        <defs>
                            <filter id="filter0_i_1361_2" x="8" y="19" width="62" height="51" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha" />
                                <feOffset dx="-2" dy="-2" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1361_2" />
                            </filter>
                            <filter id="filter1_i_1361_2" x="20" y="8" width="38" height="13" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha" />
                                <feOffset dx="-2" dy="-2" />
                                <feGaussianBlur stdDeviation="1.5" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1361_2" />
                            </filter>
                        </defs>
                    </svg>
                `;
                break;
            case "block":
                faviconHTML = `
                    <svg class="favicon" id="favicon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_1390_3)">
                            <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M16.2426 12.1818C13.6688 13.2848 12 15.8156 12 18.6158V47.2032C12 50.262 13.2736 53.1826 15.515 55.264L33.8759 72.3134C37.3291 75.5199 42.6709 75.5199 46.1241 72.3134L64.485 55.264C66.7264 53.1826 68 50.262 68 47.2032V18.6158C68 15.8156 66.3312 13.2848 63.7574 12.1818L60.8777 10.9476C47.5456 5.23385 32.4544 5.23385 19.1223 10.9476L16.2426 12.1818ZM31.591 24.409C30.7123 23.5303 29.2877 23.5303 28.409 24.409C27.5303 25.2877 27.5303 26.7123 28.409 27.591L37.318 36.5L28.409 45.409C27.5303 46.2877 27.5303 47.7123 28.409 48.591C29.2877 49.4697 30.7123 49.4697 31.591 48.591L40.5 39.682L49.409 48.591C50.2877 49.4697 51.7123 49.4697 52.591 48.591C53.4697 47.7123 53.4697 46.2877 52.591 45.409L43.682 36.5L52.591 27.591C53.4697 26.7123 53.4697 25.2877 52.591 24.409C51.7123 23.5303 50.2877 23.5303 49.409 24.409L40.5 33.318L31.591 24.409Z" />
                        </g>
                        <defs>
                            <filter id="filter0_i_1390_3" x="11" y="5.66228" width="57" height="69.0559" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="-1" dy="-1" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1390_3" />
                            </filter>
                        </defs>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_1390_3)">
                            <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M16.2426 12.1818C13.6688 13.2848 12 15.8156 12 18.6158V47.2032C12 50.262 13.2736 53.1826 15.515 55.264L33.8759 72.3134C37.3291 75.5199 42.6709 75.5199 46.1241 72.3134L64.485 55.264C66.7264 53.1826 68 50.262 68 47.2032V18.6158C68 15.8156 66.3312 13.2848 63.7574 12.1818L60.8777 10.9476C47.5456 5.23385 32.4544 5.23385 19.1223 10.9476L16.2426 12.1818ZM31.591 24.409C30.7123 23.5303 29.2877 23.5303 28.409 24.409C27.5303 25.2877 27.5303 26.7123 28.409 27.591L37.318 36.5L28.409 45.409C27.5303 46.2877 27.5303 47.7123 28.409 48.591C29.2877 49.4697 30.7123 49.4697 31.591 48.591L40.5 39.682L49.409 48.591C50.2877 49.4697 51.7123 49.4697 52.591 48.591C53.4697 47.7123 53.4697 46.2877 52.591 45.409L43.682 36.5L52.591 27.591C53.4697 26.7123 53.4697 25.2877 52.591 24.409C51.7123 23.5303 50.2877 23.5303 49.409 24.409L40.5 33.318L31.591 24.409Z" />
                        </g>
                        <defs>
                            <filter id="filter0_i_1390_3" x="11" y="5.66228" width="57" height="69.0559" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="-1" dy="-1" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1390_3" />
                            </filter>
                        </defs>
                    </svg>
                `;
                newwin.style.maxWidth = "688px";
                newwin.style.maxHeight = "568px";
                break;
            case "calc":
                faviconHTML = `
                    <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect class="fill" width="80" height="80" rx="8"/>
                        <g filter="url(#filter0_b_1558_131)">
                            <path d="M13.364 55.1924C12.5829 54.4113 12.5829 53.145 13.364 52.364V52.364C14.145 51.5829 15.4113 51.5829 16.1924 52.364L19.0208 55.1924C19.4113 55.5829 20.0445 55.5829 20.435 55.1924L23.2635 52.364C24.0445 51.5829 25.3108 51.5829 26.0919 52.364V52.364C26.8729 53.145 26.8729 54.4113 26.0919 55.1924L23.2635 58.0208C22.8729 58.4113 22.8729 59.0445 23.2635 59.435L26.0919 62.2635C26.8729 63.0445 26.8729 64.3108 26.0919 65.0919V65.0919C25.3108 65.8729 24.0445 65.8729 23.2635 65.0919L20.435 62.2635C20.0445 61.8729 19.4113 61.8729 19.0208 62.2635L16.1924 65.0919C15.4113 65.8729 14.145 65.8729 13.364 65.0919V65.0919C12.5829 64.3108 12.5829 63.0445 13.364 62.2635L16.1924 59.435C16.5829 59.0445 16.5829 58.4113 16.1924 58.0208L13.364 55.1924Z" fill="#202020" fill-opacity="0.76"/>
                        </g>
                        <g filter="url(#filter1_b_1558_131)">
                            <rect x="50" y="19" width="18" height="6" rx="3" fill="#202020" fill-opacity="0.76"/>
                        </g>
                        <g filter="url(#filter2_b_1558_131)">
                            <path d="M18 15C18 13.8954 18.8954 13 20 13V13C21.1046 13 22 13.8954 22 15V19C22 19.5523 22.4477 20 23 20H27C28.1046 20 29 20.8954 29 22V22C29 23.1046 28.1046 24 27 24H23C22.4477 24 22 24.4477 22 25V29C22 30.1046 21.1046 31 20 31V31C18.8954 31 18 30.1046 18 29V25C18 24.4477 17.5523 24 17 24H13C11.8954 24 11 23.1046 11 22V22C11 20.8954 11.8954 20 13 20H17C17.5523 20 18 19.5523 18 19V15Z" fill="#202020" fill-opacity="0.76"/>
                        </g>
                        <rect x="38" y="38" width="40" height="40" rx="6" fill="#202020"/>
                        <path class="fill" d="M49 54C49 52.8954 49.8954 52 51 52H65C66.1046 52 67 52.8954 67 54C67 55.1046 66.1046 56 65 56H51C49.8954 56 49 55.1046 49 54Z"/>
                        <path class="fill" d="M49 62C49 60.8954 49.8954 60 51 60H65C66.1046 60 67 60.8954 67 62C67 63.1046 66.1046 64 65 64H51C49.8954 64 49 63.1046 49 62Z"/>
                        <defs>
                            <filter id="filter0_b_1558_131" x="9.77817" y="48.7782" width="19.8995" height="19.8995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1558_131"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1558_131" result="shape"/>
                            </filter>
                            <filter id="filter1_b_1558_131" x="46" y="15" width="26" height="14" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1558_131"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1558_131" result="shape"/>
                            </filter>
                            <filter id="filter2_b_1558_131" x="8" y="10" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1558_131"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1558_131" result="shape"/>
                            </filter>
                        </defs>
                    </svg>
                `;
                newdock.innerHTML = `
                    <svg class="dockicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect class="fill" width="80" height="80" rx="8"/>
                        <g filter="url(#filter0_b_1558_131)">
                            <path d="M13.364 55.1924C12.5829 54.4113 12.5829 53.145 13.364 52.364V52.364C14.145 51.5829 15.4113 51.5829 16.1924 52.364L19.0208 55.1924C19.4113 55.5829 20.0445 55.5829 20.435 55.1924L23.2635 52.364C24.0445 51.5829 25.3108 51.5829 26.0919 52.364V52.364C26.8729 53.145 26.8729 54.4113 26.0919 55.1924L23.2635 58.0208C22.8729 58.4113 22.8729 59.0445 23.2635 59.435L26.0919 62.2635C26.8729 63.0445 26.8729 64.3108 26.0919 65.0919V65.0919C25.3108 65.8729 24.0445 65.8729 23.2635 65.0919L20.435 62.2635C20.0445 61.8729 19.4113 61.8729 19.0208 62.2635L16.1924 65.0919C15.4113 65.8729 14.145 65.8729 13.364 65.0919V65.0919C12.5829 64.3108 12.5829 63.0445 13.364 62.2635L16.1924 59.435C16.5829 59.0445 16.5829 58.4113 16.1924 58.0208L13.364 55.1924Z" fill="#202020" fill-opacity="0.76"/>
                        </g>
                        <g filter="url(#filter1_b_1558_131)">
                            <rect x="50" y="19" width="18" height="6" rx="3" fill="#202020" fill-opacity="0.76"/>
                        </g>
                        <g filter="url(#filter2_b_1558_131)">
                            <path d="M18 15C18 13.8954 18.8954 13 20 13V13C21.1046 13 22 13.8954 22 15V19C22 19.5523 22.4477 20 23 20H27C28.1046 20 29 20.8954 29 22V22C29 23.1046 28.1046 24 27 24H23C22.4477 24 22 24.4477 22 25V29C22 30.1046 21.1046 31 20 31V31C18.8954 31 18 30.1046 18 29V25C18 24.4477 17.5523 24 17 24H13C11.8954 24 11 23.1046 11 22V22C11 20.8954 11.8954 20 13 20H17C17.5523 20 18 19.5523 18 19V15Z" fill="#202020" fill-opacity="0.76"/>
                        </g>
                        <rect x="38" y="38" width="40" height="40" rx="6" fill="#202020"/>
                        <path class="fill" d="M49 54C49 52.8954 49.8954 52 51 52H65C66.1046 52 67 52.8954 67 54C67 55.1046 66.1046 56 65 56H51C49.8954 56 49 55.1046 49 54Z"/>
                        <path class="fill" d="M49 62C49 60.8954 49.8954 60 51 60H65C66.1046 60 67 60.8954 67 62C67 63.1046 66.1046 64 65 64H51C49.8954 64 49 63.1046 49 62Z"/>
                        <defs>
                            <filter id="filter0_b_1558_131" x="9.77817" y="48.7782" width="19.8995" height="19.8995" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1558_131"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1558_131" result="shape"/>
                            </filter>
                            <filter id="filter1_b_1558_131" x="46" y="15" width="26" height="14" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1558_131"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1558_131" result="shape"/>
                            </filter>
                            <filter id="filter2_b_1558_131" x="8" y="10" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5"/>
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1558_131"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1558_131" result="shape"/>
                            </filter>
                        </defs>
                    </svg>
                `;
                newwin.style.maxWidth = "348px";
                newwin.style.maxHeight = "586px";
                newwin.style.minWidth = "347px";
                newwin.style.minHeight = "586px";
                newwin.style.width = "348px";
                newwin.style.height = "586px";
                break;
            default:
                break;
        }
        favicon.innerHTML = faviconHTML;
        let framew = document.createElement("iframe");
        window.addEventListener("beforeunload", () => {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).includes("instances")) {
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        });
        if(appName === "player") {
            winconts.appendChild(favicon);
            winconts.appendChild(controls);
            newwin.appendChild(winconts);
            titleElement.innerHTML = `<button class="openF m"><span></span>Open</button><button class="settingsV m"><span></span>Settings</button>`;
            framew.classList.add("player");
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
        }
        if(appName === "image") {
            winconts.appendChild(favicon);
            winconts.appendChild(controls);
            newwin.appendChild(winconts);
            if(localStorage.getItem("photoCoverApp") === "false") {
                titleElement.innerHTML = `<button class="openImage m"><span></span>Open</button><button class="settingsI m"><span></span>Settings</button><button class="zoomIn m zz"><span></span>+</button><button class="zoomOut m zz"><span></span>-</button>`;
            } else {
                titleElement.innerHTML = `<button class="openImage m"><span></span>Open</button><button class="settingsI m"><span></span>Settings</button>`;
            }
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
        }
        if(appName === "terminal") {
            winconts.appendChild(favicon);
            winconts.appendChild(controls);
            newwin.appendChild(winconts);
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
        }
        if(appName === "text") {
            winconts.appendChild(favicon);
            winconts.appendChild(controls);
            newwin.appendChild(winconts);
            titleElement.innerHTML = `<button class="saveF m"><span></span>Save</button><button class="settingsT m"><span></span>Settings</button>`;
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
        }
        if(os === "false") {
            titleHTML = `${title}`
            newwin.appendChild(winconts);
            winconts.appendChild(favicon);
            winconts.appendChild(titleElement);
            winconts.appendChild(controls);
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
        } else if(os === "true") {
            newwin.appendChild(winconts);
            winconts.appendChild(favicon);
            winconts.appendChild(titleElement);
            winconts.appendChild(controls);
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
        }
        framew.onload = () => {
            if(localStorage.getItem("allowDockColorChange") === "true") {
                const body = framew.contentDocument.querySelector("body");
                const computed = framew.contentWindow.getComputedStyle(body).backgroundColor;
                dock.style.backgroundColor = computed;
                document.querySelectorAll(".dockbtn").forEach((item) => {
                    item.style.boxShadow = "0 0 5px 3px rgba(0, 0, 0, 0.36)";
                    item.style.backgroundColor = "var(--dock-background)";
                });
            }
            appendFocusScript();
            function appendFocusScript() {
                if(textAppText) {
                    const message = JSON.stringify({
                        text: textAppText,
                        id: windowID,
                    });
                    framew.contentWindow.postMessage(message, "*");
                } else {
                    const message = JSON.stringify({
                        id: windowID,
                    });
                    framew.contentWindow.postMessage(message, "*");
                }
                const frameScript = document.createElement("script");
                frameScript.innerHTML = `
                    let id;
                    
                    window.onmessage = (e) => {
                        const data = JSON.parse(e.data);
                        id = data.id;
                        if(data.type === "openUrl") {
                            const url = data.url;
                            const frame = document.querySelector(".iframething");
                            const urlbar = document.querySelector("#urlbar");

                            frame.src = url;
                            urlbar.value = url;
                            console.log(url)
                        }
                    }
                `;
                framew.contentDocument.body.appendChild(frameScript);
            }
        }
        window.addEventListener("message", (e) => {
            const data = e;
            if(data.type === "focus") {
                appsShellName.innerText = data.infoTitle;
                appsShellName.classList.remove("fa-folder");
            }
            if(data.type === "video") {
                const videoLink = data.videoLink;
                const videoIframe = document.querySelector(".player");
                const video = videoIframe.contentWindow.document.querySelector("#mc");
                if(video) {
                    video.src = videoLink;
                }
            }
        });
    
        let winc = newwin.querySelectorAll(".winc");
        if(localStorage.getItem('btnr') === "yes") {
            for (let i = 0; i < winc.length; i++) {
                winc[i].classList.add("btnround");
            }
            newwin.querySelector('.winc').classList.add("btnround");
        } else if(localStorage.getItem('btnr') === "no") {
            for (let i = 0; i < winc.length; i++) {
                winc[i].classList.remove("btnround");
            }
        } else if(localStorage.getItem('btnr') === null) {
            for (let i = 0; i < winc.length; i++) {
                winc[i].classList.add("btnround");
            }
        }
        let isRez = false;
        dock.appendChild(newdock);
        if(!newdock.querySelector(".activeSpan")) {
            const activeSpan = document.createElement("span");
            activeSpan.classList.add("activeSpan");
            newdock.appendChild(activeSpan);
        }

        newdock.addEventListener("mousedown", e => {
            if(e.button === 2) {
                if(document.querySelector(".dockMenu")) {
                    document.querySelector(".dockMenu").remove();
                }
                if(document.querySelector(".ctx")) {
                    document.querySelector(".ctx").remove();
                }
                let dockBtnPos = newdock.getBoundingClientRect();
                let dockBtnX = dockBtnPos.x;
                let clientX = e.clientX;
                let clientY = e.clientY;
                
                const dockMenu = document.createElement("div");
                dockMenu.classList.add("dockMenu");
                dockMenu.style.position = "absolute"
                if(localStorage.getItem("dockPos").toLowerCase() === "bottom" && localStorage.getItem("dockFull") === "yes") {
                    dockMenu.style.left = `${clientX}px`;
                    dockMenu.style.bottom = `58px`;
                } else if(localStorage.getItem("dockPos").toLowerCase() === "bottom" && localStorage.getItem("dockFull") === "no") {
                    dockMenu.style.left = `${clientX}px`;
                    dockMenu.style.bottom = `60px`;
                }
                if(localStorage.getItem("dockPos").toLowerCase() === "left" && localStorage.getItem("dockFull") === "yes") {
                    dockMenu.style.left = `58px`;
                    dockMenu.style.right = ``;
                    dockMenu.style.bottom = `${clientY}px`;
                } else if(localStorage.getItem("dockPos").toLowerCase() === "left" && localStorage.getItem("dockFull") === "no") {
                    dockMenu.style.left = `60px`;
                    dockMenu.style.right = ``;
                    dockMenu.style.top = `${clientY}px`;
                }
                if(localStorage.getItem("dockPos").toLowerCase() === "right" && localStorage.getItem("dockFull") === "yes") {
                    console.log("right");
                    dockMenu.style.left = ``;
                    dockMenu.style.right = `58px`;
                    dockMenu.style.top = `${clientY}px`;
                } else if(localStorage.getItem("dockPos").toLowerCase() === "right" && localStorage.getItem("dockFull") === "no") {
                    console.log("right");
                    dockMenu.style.left = ``;
                    dockMenu.style.right = `60px`;
                    dockMenu.style.top = `${clientY}px`;
                }
                let dockItemWindow;
                setTimeout(() => {
                    dockItemWindow = document.querySelector(`.win#${newdock.getAttribute("data-appid")}`);
                    let oneinst = dockItemWindow.getAttribute("oneinst");
                    let controls = dockItemWindow.getAttribute("data-controls");

                    const reloadApp = document.createElement("div");
                    reloadApp.classList.add("dockMenuItem");
                    reloadApp.innerText = "Reload";
                    reloadApp.addEventListener("click", () => {
                        let src = dockItemWindow.querySelector(".frame").getAttribute("src");
                        dockItemWindow.querySelector(".frame").src = "about:blank";
                        dockItemWindow.querySelector(".frame").src = src;
                        dockMenu.remove();
                    });
                    dockMenu.appendChild(reloadApp);

                    if(oneinst != "true" && oneinst != "yes") {
                        const newWindowBtn = document.createElement("div");
                        newWindowBtn.classList.add("dockMenuItem");
                        newWindowBtn.innerText = "New Window";
                        newWindowBtn.addEventListener("click", () => {
                            let link = dockItemWindow.getAttribute("data-link");
                            let icn = dockItemWindow.getAttribute("data-icon");
                            let os = dockItemWindow.getAttribute("data-os");
                            let fullscreen = dockItemWindow.getAttribute("data-fullscreen");
                            let appName = dockItemWindow.getAttribute("data-appName");
                            let controlsTypes = dockItemWindow.getAttribute("data-controls");
                            let textAppText = dockItemWindow.getAttribute("data-textAppText");
                            let width = dockItemWindow.getAttribute("data-width");
                            let height = dockItemWindow.getAttribute("data-height");
                            let resizable = dockItemWindow.getAttribute("data-resizable");
                            let title = dockItemWindow.getAttribute("data-title");
                            new WIN(`(link)[${link}]`, `(icn)[${icn}]`, `(title)[${title}]`, `(os)[${os}]`, `(fullscreen)[${fullscreen}]`, `(appName)[${appName}]`, `(controls)[${controlsTypes}]`, `(textAppText)[${textAppText}]`, `(width)[${width}]`, `(height)[${height}]`, `(resizable)[${resizable}]`);
                            dockMenu.remove();
                        })
                        dockMenu.appendChild(newWindowBtn);
                    }

                    const minimizeBtn = document.createElement("div");
                    minimizeBtn.classList.add("dockMenuItem");
                    minimizeBtn.innerText = "Minimize";
                    minimizeBtn.addEventListener("click", () => {
                        dockItemWindow.querySelector(".mini").click();
                        dockMenu.remove();
                    });
                    const maximizeBtn = document.createElement("div");
                    maximizeBtn.classList.add("dockMenuItem");
                    maximizeBtn.innerText = "Maximize";
                    maximizeBtn.addEventListener("click", () => {
                        dockItemWindow.querySelector(".maxi").click();
                        dockMenu.remove();
                    });
                    const closeBtn = document.createElement("div");
                    closeBtn.classList.add("dockMenuItem");
                    closeBtn.innerText = "Close";
                    closeBtn.addEventListener("click", () => {
                        dockItemWindow.querySelector(".close").click();
                        dockMenu.remove();
                    });
                    if(controls === "undefined") {
                        dockMenu.appendChild(minimizeBtn);
                        dockMenu.appendChild(maximizeBtn);
                        dockMenu.appendChild(closeBtn);
                    } else if(controls === "minmax") {
                        dockMenu.appendChild(minimizeBtn);
                        dockMenu.appendChild(maximizeBtn);
                    } else if(controls === "minclose") {
                        dockMenu.appendChild(minimizeBtn);
                        dockMenu.appendChild(closeBtn);
                    } else if(controls === "maxclose") {
                        dockMenu.appendChild(maximizeBtn);
                        dockMenu.appendChild(closeBtn);
                    } else if(controls === "min") {
                        dockMenu.appendChild(minimizeBtn);
                    } else if(controls === "max") {
                        dockMenu.appendChild(maximizeBtn);
                    } else if(controls === "close") {
                        dockMenu.appendChild(closeBtn);
                    }
                    window.addEventListener("mousedown", (e) => {
                        if (e.button == 0 && !e.target.closest(".dockMenu")) {
                            dockMenu.remove();
                        }
                    });
                    document.body.appendChild(dockMenu);
                }, 100)
            }
        })

        let max;
        let a = 0;
        
        document.onkeydown = (e) => {
            let focused = document.querySelector(".winFocus");
            if(e.shiftKey && e.key === "ArrowLeft") {
                lastWidth = focused.getClientRects()[0].width;
                if(focused.classList.contains("maxiY")) {
                    focused.style.height = "calc(100% - 37px)";
                    focused.style.width = "calc(50%)";
                    focused.style.left = "0";
                    focused.style.top = "37px";
                    focused.classList.remove("maxiY");
                } else {
                    focused.style.left = "0";
                    focused.style.top = "37px";
                    focused.style.width = "calc(50%)";
                    focused.style.height = "calc(100% - 37px)";
                    if(!focused.classList.contains("maxiN")) {
                        focused.classList.add("maxiN");
                    }
                }
            } if(e.shiftKey && e.key === "ArrowRight") {
                lastWidth = focused.getClientRects()[0].width;
                if(focused.classList.contains("maxiY")) {
                    focused.style.height = "calc(100% - 37px)";
                    focused.style.width = "calc(50%)";
                    focused.style.right = "0";
                    focused.style.left = "0";
                    focused.style.top = "37px";
                    focused.classList.remove("maxiY");
                } else {
                    focused.style.left = "";
                    focused.style.right = "0";
                    focused.style.top = "37px";
                    focused.style.width = "calc(50%)";
                    focused.style.height = "calc(100% - 37px)";
                    if(!focused.classList.contains("maxiN")) {
                        focused.classList.add("maxiN");
                    }
                }
            } if(e.shiftKey && e.key === "ArrowUp") {
                newwin.querySelector(".maxi").click();
            } if(e.shiftKey && e.key === "ArrowDown") {
                focused.querySelector(".mini").click();
            }
        }
        if(newwin.querySelector(".close")) {
            newwin.querySelector(".close").addEventListener("click", () => {
                if(!appOptions.classList.contains("h")) {
                    if(lastWindow.innerHTML === "") {
                        appOptions.classList.toggle("h");
                    }
                }
                // check if the window with the same id as lastWindow is the one being closed
                if(newwin.getAttribute("data-id") === lastWindow.innerHTML) {
                    lastWindow.innerHTML = "";
                    // get the last .win in the body that isn't the one being closed
                    if(document.querySelectorAll(".win:not(#" + newwin.getAttribute("data-id") + ")")[document.querySelectorAll(".win:not(#" + newwin.getAttribute("data-id") + ")").length - 1]) {
                        let lastWin = document.querySelectorAll(".win:not(#" + newwin.getAttribute("data-id") + ")")[document.querySelectorAll(".win:not(#" + newwin.getAttribute("data-id") + ")").length - 1];
                        lastWin.click();
                    }
                }
                if (lastWindow.innerHTML === "") {
                    let winSelector = ".win:not([data-id='" + newwin.getAttribute("data-id") + "'])";
                    let lastWins = document.querySelectorAll(winSelector);
                    if (lastWins.length > 0) {
                        let lastWin = lastWins[lastWins.length - 1];
                        lastWin.click();
                    }
                }                
                if(allWindowsForCellNumberCheck.length === 1) {
                    console.log("last window");
                    appsShellName.innerText = "";
                    appsShellName.setAttribute("data-id", "");
                    appsShellName.classList.add("inactive");
                }


                if(newwin.classList.contains("maxiY")) {
                    let allMaxiYWindows = document.querySelectorAll(".maxiY").length;
                    if(allMaxiYWindows === 1) {
                        if(window.getComputedStyle(document.querySelector(".shell")).borderRadius === "0px") {
                            document.querySelector(".shell").style.borderRadius = "";
                        }
                    }
                }
                if(lastWindow.innerHTML != "" && allWindowsForCellNumberCheck.length > 1) {
                    if(document.querySelector(`[data-id="${lastWindow.innerHTML}"]`)) {
                        document.querySelector(`.win#${lastWindow.innerHTML}`).click();
                    }
                }
                document.querySelector(`[cell-id="${newwin.getAttribute("data-id")}"]`).remove();
                if(allWindowsHolder.children.length === 1) {
                    currentWindow.innerHTML = allWindowsHolder.children[0].getAttribute("cell-id");
                }

                newdock.remove();
                if(document.querySelectorAll(".win").length === 0) {
                    appsShellName.classList.add("inactive");
                }
                appCount--;
                newwin.remove();
                if(!document.querySelector(".winFocus")) {
                    if(document.querySelector(".winNotFocus") && document.querySelectorAll(".win").length == 1) {
                        document.querySelector(".winNotFocus").querySelector(".focusWinEl").click();
                    }
                }
            });
        }
        if(newwin.querySelector(".maxi")) {
            newwin.querySelector('.maxi').onclick = () => {
                var winFocus = document.querySelectorAll(".winFocus");
                newwin.classList.remove("negZI");
                if(newwin.classList.contains("winNotFocus")) {
                    document.querySelectorAll(".win").forEach((e) => {
                        e.classList.remove("winFocus");
                        e.classList.add("winNotFocus");
                        e.querySelector(".focusWinEl").classList.add("yes");
                        e.querySelector(".focusWinEl").classList.remove("no");
                    })
                    newwin.classList.remove("winNotFocus");
                    newwin.classList.add("winFocus");
                    newwin.querySelector(".focusWinEl").classList.add("no");
                    newwin.querySelector(".focusWinEl").classList.remove("yes");
                    document.querySelectorAll(".dockbtn").forEach((e) => {
                        e.classList.remove("active");
                    })
                    document.querySelector('.dockbtn[data-appid="' + newwin.getAttribute("id") + '"]').classList.add("active");
                }
                for (let i = 0; i < winFocus.length; i++) {
                    const element = winFocus[i];
                    if(element.length > 0) {
                        document.querySelector(".shell").style.borderBottomLeftRadius = "0px";
                        document.querySelector(".shell").style.borderBottomRightRadius = "0px";
                    } else if(element.length === 0) {
                        document.querySelector(".shell").style.borderBottomRightRadius = "";
                        document.querySelector(".shell").style.borderBottomLeftRadius = "";
                    }
                }
                var newwinHEIGHT = newwin.clientHeight;
                var newwinWIDTH = newwin.clientWidth;
                const shell = document.querySelector(".shell");
                const showDesk = document.querySelector(".showDesk");
                if(newwin.classList.contains('maxiN')) {
                    shell.style.borderRadius = "0";
                    showDesk.style.borderRadius = "0";
                    if(localStorage.getItem("smallWin") === "true") {
                        newwin.querySelector('.maxi').innerHTML = `
                            <svg id="maxi" class="winic noStroke small" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path class="wincFill" d="M0 4H1V15H0V4Z"/>
                                <path class="wincFill" d="M10 4H11V15H10V4Z"/>
                                <path class="wincFill" d="M1 14H10V15H1V14Z"/>
                                <path class="wincFill" d="M1 4H10V5H1V4Z"/>
                                <path class="wincFill" d="M4 1H5V4H4V1Z"/>
                                <path class="wincFill" d="M4 0H15V1H4V0Z"/>
                                <path class="wincFill" d="M14 1H15V11H14V1Z"/>
                                <path class="wincFill" d="M11 10H14V11H11V10Z"/>
                            </svg>
                        `;
                    } else {
                        newwin.querySelector('.maxi').innerHTML = `
                            <svg id="maxi" class="winic noStroke" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path class="wincFill" d="M0 4H1V15H0V4Z"/>
                                <path class="wincFill" d="M10 4H11V15H10V4Z"/>
                                <path class="wincFill" d="M1 14H10V15H1V14Z"/>
                                <path class="wincFill" d="M1 4H10V5H1V4Z"/>
                                <path class="wincFill" d="M4 1H5V4H4V1Z"/>
                                <path class="wincFill" d="M4 0H15V1H4V0Z"/>
                                <path class="wincFill" d="M14 1H15V11H14V1Z"/>
                                <path class="wincFill" d="M11 10H14V11H11V10Z"/>
                            </svg>
                        `;
                    }
                    maxState = true;
                    newwin.classList.add('maxiY');
                    if(localStorage.getItem("dockFull") === "yes") {
                        switch(localStorage.getItem("dockPos").toLowerCase()) {
                            case "left":
                                newwin.classList.add("LDF");
                                newwin.classList.remove("RDF");
                                newwin.classList.remove("BDF");
                                break;
                            case "right":
                                newwin.classList.add("RDF");
                                newwin.classList.remove("LDF");
                                newwin.classList.remove("BDF");
                                break;
                            case "bottom":
                                newwin.classList.add("BDF");
                                newwin.classList.remove("LDF");
                                newwin.classList.remove("RDF");
                                break;
                        }
                    } else {
                        switch(localStorage.getItem("dockPos").toLowerCase()) {
                            case "left":
                                newwin.classList.add("LD");
                                newwin.classList.remove("RD");
                                newwin.classList.remove("BD");
                                break;
                            case "right":
                                newwin.classList.add("RD");
                                newwin.classList.remove("LD");
                                newwin.classList.remove("BD");
                                break;
                            case "bottom":
                                newwin.classList.add("BD");
                                newwin.classList.remove("LD");
                                newwin.classList.remove("RD");
                                break;
                        }
                    }
                    newwin.classList.remove('maxiN');
                    if(localStorage.getItem("shadow") === "yes") {
                        newwin.classList.add("noShadow");
                        newwin.classList.remove("shadow");
                    }
                    newwin.classList.add("maxiR");
                    max = false;
                } else if(newwin.classList.contains('maxiY')) {
                    shell.style.borderRadius = "";
                    showDesk.style.borderRadius = "";
                    if(localStorage.getItem("smallWin") === "true") {
                        newwin.querySelector('.maxi').innerHTML = `
                            <svg id="maxi" class="winic small" viewBox="0 0 15 15" fill="none">
                                <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"></rect>
                            </svg>
                        `;
                    } else {
                        newwin.querySelector('.maxi').innerHTML = `
                            <svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none">
                                <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"></rect>
                            </svg>
                        `;
                    }
                    maxState = false;
                    newwin.classList.add('maxiN');
                    newwin.classList.remove('maxiY');
                    if(localStorage.getItem("shadow") === "yes") {
                        newwin.classList.remove("noShadow");
                        newwin.classList.add("shadow");
                    }
                    newwin.classList.remove("maxiR");
                    max = true;
                    newwin.style.width = newwinWIDTH;
                    newwin.style.height = newwinHEIGHT;
                }
            }
        }
        if(fullscreen === true || fullscreen === "true" || fullscreen === "yes") {
            newwin.querySelector(".maxi").click()
        }
        focusWinEl.addEventListener("click", (e) => {
            if(focusWinEl.classList.contains("yes")) {
                focusWinEl.classList.remove("yes");
                focusWinEl.classList.add("no");
            }
        })
        newwin.addEventListener("click", (e) => {
            if(e.target.classList.contains("winic") || e.target.classList.contains("winc")) return;
            let allWindows = document.querySelectorAll(".win");
            if(!currentWindow.innerHTML === newwin.getAttribute("id")) {
                currentWindow.innerHTML = newwin.getAttribute("id");
                if(document.querySelector(".winFocus")) {
                    lastWindow.innerHTML = document.querySelector(".winFocus").getAttribute("id");
                }
            } else {
                console.log("same");
            }

            appsShellName.classList.remove("inactive");
            if(newwin.getAttribute("oneInst") === "yes" || newwin.getAttribute("oneInst") === "true") {
                appShell.setAttribute("oneInst", "yes");
            } else {
                appShell.setAttribute("oneInst", "no");
            }
            allWindows.forEach(win => {
                win.classList.remove("winFocus");
                win.classList.add("winNotFocus");
                win.querySelector(".focusWinEl").classList.add("yes");
                win.querySelector(".focusWinEl").classList.remove("no");
            })
            newwin.querySelector(".focusWinEl").classList.remove("yes");
            newwin.querySelector(".focusWinEl").classList.add("no");
            const appItem = document.querySelectorAll(".appItem");
            for (let i = 0; i < appItem.length; i++) {
                appItem[i].classList.remove("active");
            }
            newdock.classList.add("active");
            
            let windowsControls = newwin.getAttribute("data-controls");
            newwin.classList.add("winFocus");
            newwin.classList.remove("winNotFocus");
            appsShellName.innerText = title;
            appsShellName.setAttribute("data-id", windowID);

            if(windowsControls === "minmaxclose") {
                document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
                document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
                document.querySelector(`[data-event="close"]`).classList.remove("hidden");
            } else if(windowsControls === "minmax") {
                document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
                document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
                document.querySelector(`[data-event="close"]`).classList.add("hidden");
            } else if(windowsControls === "minclose") {
                document.querySelector(`[data-event="maximize"]`).classList.add("hidden");
                document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
                document.querySelector(`[data-event="close"]`).classList.remove("hidden");
            } else if(windowsControls === "maxclose") {
                document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
                document.querySelector(`[data-event="minimize"]`).classList.add("hidden");
                document.querySelector(`[data-event="close"]`).classList.remove("hidden");
            } else if(windowsControls === "close") {
                document.querySelector(`[data-event="maximize"]`).classList.add("hidden");
                document.querySelector(`[data-event="minimize"]`).classList.add("hidden");
                document.querySelector(`[data-event="close"]`).classList.remove("hidden");
            } else if(windowsControls === "undefined") {
                document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
                document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
                document.querySelector(`[data-event="close"]`).classList.remove("hidden");
            }
            let newWindowAvailable = document.querySelector(".winFocus").getAttribute("oneinst");
            if(newWindowAvailable === "true" || newWindowAvailable === "yes") {
                document.querySelector(`[data-event="newwin"]`).classList.add("hidden");
            } else {
                document.querySelector(`[data-event="newwin"]`).classList.remove("hidden");
            }
        });
        switch(os) {
            case "false":
                if (localStorage.getItem('useDynamic', 'true')) {
                    console.log('Using Dynamic')
                    framew.src = "dyn" + "/" + xor.encode(link);
                } else {
                    framew.src = "sw" + "/" + xor.encode(link);
                }               
                break;
            case "true":
                framew.src = link;
                break;
            default:
                break;
        }
    
        winconts.addEventListener("dblclick", (e) => {
            if (e.target.classList.contains('winc') || e.target.classList.contains('winic') || e.target.classList.contains("searchbar") || e.target.classList.contains("m") || e.target.classList.contains("bIcon")) {
                if (typeof e.target.click === 'function') {
                    e.target.click();
                }
            } else {
                if (newwin.querySelector(".maxi")) {
                    newwin.querySelector('.maxi').click();
                }
            }            
        });
    
        winconts.addEventListener("mousedown", mousedown);
        function mousedown(e) {
            if(newwin.getAttribute("oneInst") === "yes" || newwin.getAttribute("oneInst") === "true") {
                appShell.setAttribute("oneInst", "yes");
            } else {
                appShell.setAttribute("oneInst", "no");
            }
            if (e.button !== 0) return;
            newwin.querySelector("iframe").style.pointerEvents = "none";
            const appItem = document.querySelectorAll(".appItem");
            for (let i = 0; i < appItem.length; i++) {
                appItem[i].classList.remove("active");
            }
            newdock.classList.add("active");
            if(appsShellName) {
                appsShellName.innerText = title;
                appsShellName.setAttribute("data-id", windowID);
            }
            if(!document.querySelector(".appShell")) {
                document.querySelector(".shell").appendChild(appShell);
                appShell.appendChild(appsShellName);
                appsShellName.innerText = title;
                appsShellName.setAttribute("data-id", windowID);
            }
    
            if(e.target.classList.contains('winc') || e.target.classList.contains('winic') || e.target.classList.contains('searchbar') || e.target.classList.contains('m') || e.target.classList.contains('bIcon')) {
                return
            } else {
                var startX = e.clientX;
                var startY = e.clientY;
        
                function mousemove(e) {
                    var newX = e.clientX;
                    var newY = e.clientY;
                    var deltaX = newX - startX;
                    var deltaY = newY - startY;
                    var newLeft = newwin.offsetLeft + deltaX;
                    var newTop = newwin.offsetTop + deltaY;
                    if (newTop < 36) {
                        newTop = 36;
                    }
                    if (newLeft < 0) {
                        newLeft = 0;
                    }
                    if (newLeft + newwin.offsetWidth > window.innerWidth) {
                        newLeft = window.innerWidth - newwin.offsetWidth;
                    }
                    if (newTop + newwin.offsetHeight > window.innerHeight) {
                        newTop = window.innerHeight - newwin.offsetHeight;
                    }
                    newwin.style.left = newLeft + "px";
                    newwin.style.top = newTop + "px";
                    startX = newX;
                    startY = newY;
                    if(newwin.classList.contains("maxiY")) {
                        newwin.querySelector('.maxi').innerHTML = `
                            <svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none">
                                <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"></rect>
                            </svg>
                        `;
                        maxState = false;
                        newwin.classList.remove("maxiY");
                        newwin.classList.add("maxiN");
                        var X = startX - e.clientX;
                        var Y = startY - e.clientY;
                        const bounds = newwin.getBoundingClientRect();
                        
                        newwin.style.left = bounds.left - X + "px";
                        newwin.style.top = bounds.top - Y + "px";
                        newwin.classList.remove("maxiR");
                        newwin.classList.remove("noShadow");
                        newwin.classList.add("shadow");
                        
                        startX = e.clientX;
                        startY = e.clientY;
                    } else if(newwin.classList.contains("maxiN")) {
                        var X = startX - e.clientX;
                        var Y = startY - e.clientY;
                        const bounds = newwin.getBoundingClientRect();
                        
                        newwin.style.left = bounds.left - X + "px";
                        newwin.style.top = bounds.top - Y + "px";
                        
                        startX = e.clientX;
                        startY = e.clientY;
                    }
                }
    
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    window.removeEventListener("mousemove", mousemove);
                    newwin.querySelector("iframe").style.pointerEvents = "";
                });
            }
        }
        let dockPosN = localStorage.getItem('dockPos').toLowerCase();
        if(dockPosN === "bottom") {
            const acs = document.querySelectorAll(".activeSpan");
            for (let i = 0; i < acs.length; i++) {
                const element = acs[i];
                element.classList.add("bottom");
                element.classList.remove("left");
                element.classList.remove("right");
            }
        } else if(dockPosN === "left") {
            const acs = document.querySelectorAll(".activeSpan");
            for (let i = 0; i < acs.length; i++) {
                const element = acs[i];
                element.classList.add("left");
                element.classList.remove("right");
                element.classList.remove("bottom");
            }
        } else if(dockPosN === "right") {
            const acs = document.querySelectorAll(".activeSpan");
            for (let i = 0; i < acs.length; i++) {
                const element = acs[i];
                element.classList.add("right");
                element.classList.remove("left");
                element.classList.remove("bottom");
            }
        }
        const rightResize = document.createElement("div");
        rightResize.classList.add("rightResize");
        const bottomResize = document.createElement("div");
        bottomResize.classList.add("bottomResize");
        const bottomRightResize = document.createElement("div");
        bottomRightResize.classList.add("bottomRightResize");
        const leftResize = document.createElement("div");
        leftResize.classList.add("leftResize");
        const topResize = document.createElement("div");
        topResize.classList.add("topResize");
        const bottomLeftResize = document.createElement("div");
        bottomLeftResize.classList.add("bottomLeftResize");
    
        if(!newwin.classList.contains("no-resize")) {
            newwin.appendChild(rightResize);
            newwin.appendChild(bottomResize);
            newwin.appendChild(bottomRightResize);
            newwin.appendChild(leftResize);
            newwin.appendChild(topResize);
            newwin.appendChild(bottomLeftResize);
        }
    
        if(rightResize, bottomResize, bottomRightResize, leftResize, topResize, bottomLeftResize) {
            rightResize.addEventListener("mousedown", (e) => {
                const iframes = document.querySelectorAll(".frame");
                if(newwin.classList.contains("maxiY")) {
                    return
                }
                var startX = e.clientX;
                var rightest = window.innerWidth - 3;
                var startWidth = parseInt(document.defaultView.getComputedStyle(newwin).width, 10);
                function mousemove(e) {
                    if(e.clientX >= rightest) {
                        return
                    }
                    var newX = e.clientX;
                    var deltaX = newX - startX;
                    var newWidth = startWidth + deltaX;
                    newwin.style.width = newWidth + "px";
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "none";
                    })
                }
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    console.log("mouse up");
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mu);
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "";
                    })
                });
            });
        
            bottomResize.addEventListener("mousedown", (e) => {
                const iframes = document.querySelectorAll(".frame");
                if(newwin.classList.contains("maxiY")) {
                    return
                }
                var startY = e.clientY;
                var startHeight = parseInt(document.defaultView.getComputedStyle(newwin).height, 10);
                function mousemove(e) {
                    if(e.clientY >= window.innerHeight - 3) {
                        return
                    }
                    var newY = e.clientY;
                    var deltaY = newY - startY;
                    var newHeight = startHeight + deltaY;
                    newwin.style.height = newHeight + "px";
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "none";
                    })
                }
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mu);
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "";
                    })
                });
            })
        
            bottomRightResize.addEventListener("mousedown", (e) => {
                const iframes = document.querySelectorAll(".frame");
                if(newwin.classList.contains("maxiY")) {
                    return
                }
                var startX = e.clientX;
                var startY = e.clientY;
                var startWidth = parseInt(document.defaultView.getComputedStyle(newwin).width, 10);
                var startHeight = parseInt(document.defaultView.getComputedStyle(newwin).height, 10);
                function mousemove(e) {
                    if(e.clientX >= window.innerWidth - 2) {
                        return
                    }
                    if(e.clientY >= window.innerHeight) {
                        return
                    }
                    var newX = e.clientX;
                    var newY = e.clientY;
                    var deltaX = newX - startX;
                    var deltaY = newY - startY;
                    var newWidth = startWidth + deltaX;
                    var newHeight = startHeight + deltaY;
                    newwin.style.width = newWidth + "px";
                    newwin.style.height = newHeight + "px";
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "none";
                    })
                }
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mu);
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "";
                    })
                });
            })
        
            leftResize.addEventListener("mousedown", (e) => {
                const iframes = document.querySelectorAll(".frame");
                if(newwin.classList.contains("maxiY")) {
                    return
                }
                var startX = e.clientX;
                var leftest = 0;
                var startWidth = parseInt(document.defaultView.getComputedStyle(newwin).width, 10);
                function mousemove(e) {
                    if(e.clientX <= leftest) {
                        return
                    }
                    if(startWidth - (e.clientX - startX) <= newwin.getAttribute("min-width")) {
                        return
                    }
                    var newX = e.clientX;
                    var deltaX = newX - startX;
                    var newWidth = startWidth - deltaX;
                    newwin.style.width = newWidth + "px";
                    newwin.style.left = e.clientX + "px";
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "none";
                    })
                }
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mu);
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "";
                    })
                });
            })
        
            topResize.addEventListener("mousedown", (e) => {
                const iframes = document.querySelectorAll(".frame");
                if(newwin.classList.contains("maxiY")) {
                    return
                }
                var startY = e.clientY;
                var startHeight = parseInt(document.defaultView.getComputedStyle(newwin).height, 10);
                function mousemove(e) {
                    if (e.clientY <= "36") {
                        return
                    }
                    if(startHeight - (e.clientY - startY) <= 499) {
                        return
                    }
                    newwin.style.top = e.clientY + "px";
                    var newY = e.clientY;
                    var deltaY = newY - startY;
                    var newHeight = startHeight - deltaY;
                    newwin.style.height = newHeight + "px";
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "none";
                    })
                }
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mu);
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "";
                    })
                });
            })
        
            bottomLeftResize.addEventListener("mousedown", (e) => {
                const iframes = document.querySelectorAll(".frame");
                if(newwin.classList.contains("maxiY")) {
                    return
                }
                var startX = e.clientX;
                var startY = e.clientY;
                var leftest = 0;
                var startWidth = parseInt(document.defaultView.getComputedStyle(newwin).width, 10);
                var startHeight = parseInt(document.defaultView.getComputedStyle(newwin).height, 10);
                function mousemove(e) {
                    if(e.clientX <= leftest) {
                        return
                    }
                    if(startWidth - (e.clientX - startX) <= newwin.getAttribute("min-width")) {
                        return
                    }
                    if(startHeight + (e.clientY - startY) <= newwin.getAttribute("min-height")) {
                        return
                    }
                    var newX = e.clientX;
                    var newY = e.clientY;
                    var deltaX = newX - startX;
                    var deltaY = newY - startY;
                    var newWidth = startWidth - deltaX;
                    var newHeight = startHeight + deltaY;
                    newwin.style.width = newWidth + "px";
                    newwin.style.height = newHeight + "px";
                    newwin.style.left = e.clientX + "px";
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "none";
                    })
                }
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mu);
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "";
                    })
                });
            })
        
            bottomRightResize.addEventListener("mousedown", (e) => {
                const iframes = document.querySelectorAll(".frame");
                if(newwin.classList.contains("maxiY")) {
                    return
                }
                var startX = e.clientX;
                var startY = e.clientY;
                var startWidth = parseInt(document.defaultView.getComputedStyle(newwin).width, 10);
                var startHeight = parseInt(document.defaultView.getComputedStyle(newwin).height, 10);
                function mousemove(e) {
                    var newX = e.clientX;
                    var newY = e.clientY;
                    var deltaX = newX - startX;
                    var deltaY = newY - startY;
                    var newWidth = startWidth + deltaX;
                    var newHeight = startHeight + deltaY;
                    newwin.style.width = newWidth + "px";
                    newwin.style.height = newHeight + "px";
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "none";
                    })
                }
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mu);
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "";
                    })
                });
            })
        
            leftResize.addEventListener("mousedown", (e) => {
                const iframes = document.querySelectorAll(".frame");
                if(newwin.classList.contains("maxiY")) {
                    return
                }
                var startX = e.clientX;
                var startWidth = parseInt(document.defaultView.getComputedStyle(newwin).width, 10);
                function mousemove(e) {
                    var newX = e.clientX;
                    var deltaX = newX - startX;
                    var newWidth = startWidth - deltaX;
                    newwin.style.width = newWidth + "px";
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "none";
                    })
                }
                window.addEventListener("mousemove", mousemove);
                window.addEventListener("mouseup", (mu) => {
                    window.removeEventListener("mousemove", mousemove);
                    window.removeEventListener("mouseup", mu);
                    iframes.forEach((iframe) => {
                        iframe.style.pointerEvents = "";
                    })
                });
            })
        }
        if(newwin.querySelector(".mini")) {
            newwin.querySelector(".mini").addEventListener("click", () => {
                newwin.querySelector(".focusWinEl").classList.remove("no");
                newwin.querySelector(".focusWinEl").classList.add("yes");
                if(!newwin.classList.contains("winFocus")) {
                    newwin.classList.add("winmini");
                    newwin.classList.add("negZI");
                } else {
                    newwin.classList.add("winmini");
                    newwin.classList.add("negZI");
                    newwin.classList.add("winNotFocus");
                    newwin.classList.remove("winFocus");
                    document.querySelector(".dockbtn.active").classList.remove("active");
                    appsShellName.classList.add("inactive");
                }
            })
        }
        document.body.appendChild(newwin);

        let windowsControls = document.querySelector(".winFocus").getAttribute("data-controls");
        if(windowsControls === "minmaxclose") {
            document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        } else if(windowsControls === "minmax") {
            document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="close"]`).classList.add("hidden");
        } else if(windowsControls === "minclose") {
            document.querySelector(`[data-event="maximize"]`).classList.add("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        } else if(windowsControls === "maxclose") {
            document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.add("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        } else if(windowsControls === "close") {
            document.querySelector(`[data-event="maximize"]`).classList.add("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.add("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        } else if(windowsControls === "undefined") {
            document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        }
        let newWindowAvailable = document.querySelector(".winFocus").getAttribute("oneinst");
        if(newWindowAvailable === "true" || newWindowAvailable === "yes") {
            document.querySelector(`[data-event="newwin"]`).classList.add("hidden");
        } else {
            document.querySelector(`[data-event="newwin"]`).classList.remove("hidden");
        }

        window.addEventListener("mousedown", (e) => {
            const ctxm = document.createElement("div");
            ctxm.classList.add("ctx");
            ctxm.id = "ctx";
            const menu = document.createElement("div");
            menu.classList.add("menu");
            ctxm.appendChild(menu);
            if(e.button == 2) {
                let winID;
                if(!e.target.classList.contains(".winconts") && e.target != document.body) {
                    winID = e.target.parentElement.parentElement.id;
                } if(e.target.classList.contains("winconts")) {
                    winID = e.target.parentElement.id;
                }
                if(e.target.closest(".winconts") && !e.target.closest(".controls") && !e.target.closest(".searchbar") && !e.target.closest(".m") && !e.target.closest(".icon")) {
                    if(document.getElementById("ctx")) {
                        document.getElementById("ctx").remove();
                    }
                    ctxm.style.top = e.pageY + "px";
                    ctxm.style.left = e.pageX + "px";
                    let newWindowCtxItem = document.createElement("a");
                    let closeCtxItem = document.createElement("a");
                    let maxCtxItem = document.createElement("a");
                    let minCtxItem = document.createElement("a");
                    let reloadCtxItem = document.createElement("a");
    
                    minCtxItem.classList.add("ctxbt");
                    minCtxItem.id = "ctxMinWin";
                    minCtxItem.innerHTML = "Minimize";
    
                    maxCtxItem.classList.add("ctxbt");
                    maxCtxItem.id = "ctxMaxWin";
                    if(newwin.classList.contains("maxiY")) {
                        maxCtxItem.innerHTML = "Unmaximize";
                    } else if(newwin.classList.contains("maxiN")) {
                        maxCtxItem.innerHTML = "Maximize";
                    }
    
                    closeCtxItem.classList.add("ctxbt");
                    closeCtxItem.id = "ctxCloseWin";
                    closeCtxItem.innerHTML = "Close";
    
                    reloadCtxItem.classList.add("ctxbt");
                    reloadCtxItem.id = "ctxReload";
                    reloadCtxItem.innerHTML = "Reload";
    
                    newWindowCtxItem.classList.add("ctxbt");
                    newWindowCtxItem.id = "ctxNewWindow";
                    newWindowCtxItem.innerHTML = "New Window";
                    let windowControlsTypes = document.querySelector(".winFocus").getAttribute("data-controls");
                    if(windowControlsTypes === "minmaxclose") {
                        menu.appendChild(reloadCtxItem);
                        menu.appendChild(newWindowCtxItem);
                        menu.appendChild(minCtxItem);
                        menu.appendChild(maxCtxItem);
                        menu.appendChild(closeCtxItem);
                    } else if(windowControlsTypes === "minclose") {
                        menu.appendChild(reloadCtxItem);
                        menu.appendChild(newWindowCtxItem);
                        menu.appendChild(minCtxItem);
                        menu.appendChild(closeCtxItem);
                    } else if(windowControlsTypes === "close") {
                        menu.appendChild(reloadCtxItem);
                        menu.appendChild(newWindowCtxItem);
                        menu.appendChild(closeCtxItem);
                    } else if(windowControlsTypes === "minmax") {
                        menu.appendChild(reloadCtxItem);
                        menu.appendChild(newWindowCtxItem);
                        menu.appendChild(minCtxItem);
                        menu.appendChild(maxCtxItem);
                    } else if(windowControlsTypes === "undefined") {
                        menu.appendChild(reloadCtxItem);
                        menu.appendChild(newWindowCtxItem);
                        menu.appendChild(minCtxItem);
                        menu.appendChild(maxCtxItem);
                        menu.appendChild(closeCtxItem);
                    }
                    window.addEventListener("mousedown", (e) => {
                        if (e.button == 0 && !e.target.closest(".ctx")) {
                            ctxm.remove();
                        }
                    });
                    document.body.appendChild(ctxm);
                    if(document.querySelector(".dockMenu")) {
                        document.querySelector(".dockMenu").remove();
                    }
                    const ctxCloseWin = ctxm.querySelector("#ctxCloseWin");
                    if(ctxCloseWin) {
                        ctxCloseWin.addEventListener("click", () => {
                            if(newwin.querySelector(".close")) {
                                newwin.querySelector(".close").click();
                            }
                            ctxm.remove();
                        });
                    }
                    const ctxMaxWin = document.querySelector("#ctxMaxWin");
                    if(ctxMaxWin) {
                        ctxMaxWin.addEventListener("click", () => {
                            if(newwin.querySelector(".maxi")) {
                                newwin.querySelector(".maxi").click();
                            }
                            ctxm.remove();
                        });
                    }
                    const ctxMinWin = document.querySelector("#ctxMinWin");
                    if(ctxMinWin) {
                        ctxMinWin.addEventListener("click", () => {
                            if(newwin.querySelector(".mini")) {
                                newwin.querySelector(".mini").click();
                            }
                            ctxm.remove();
                        });
                    }
                    const ctxReload = document.querySelector("#ctxReload");
                    ctxReload.addEventListener("click", () => {
                        const frame = document.querySelector(".winFocus").querySelector("iframe");
                        let beforeSrc = frame.src;
                        frame.src = "about:blank";
                        setTimeout(() => {
                            frame.src = beforeSrc;
                        }, 200)
                        ctxm.remove();
                    });
                    const oneInstanceState = document.querySelector(".winFocus").getAttribute("oneinst");
                    if(oneInstanceState === "true" || oneInstanceState === "yes") {
                        newWindowCtxItem.remove();
                    } else {
                        const ctxNewWindow = document.querySelector("#ctxNewWindow");
                        ctxNewWindow.addEventListener("click", () => {
                            let link = document.querySelector(".winFocus").getAttribute("data-link");
                            let icn = document.querySelector(".winFocus").getAttribute("data-icon");
                            let os = document.querySelector(".winFocus").getAttribute("data-os");
                            let fullscreen = document.querySelector(".winFocus").getAttribute("data-fullscreen");
                            let appName = document.querySelector(".winFocus").getAttribute("data-appName");
                            let controlsTypes = document.querySelector(".winFocus").getAttribute("data-controls");
                            let textAppText = document.querySelector(".winFocus").getAttribute("data-textAppText");
                            let width = document.querySelector(".winFocus").getAttribute("data-width");
                            let height = document.querySelector(".winFocus").getAttribute("data-height");
                            let resizable = document.querySelector(".winFocus").getAttribute("data-resizable");
                            let title = document.querySelector(".winFocus").getAttribute("data-title");
                            ctxm.remove();
                            if(appShell.getAttribute("oneInst") === "yes" || appShell.getAttribute("oneInst") === "true") {
                                if(document.querySelectorAll(`[data-appname='${appName}']`).length > 0) {
                                    return
                                }
                            }
                            new WIN(`(link)[${link}]`, `(icn)[${icn}]`, `(title)[${title}]`, `(os)[${os}]`, `(fullscreen)[${fullscreen}]`, `(appName)[${appName}]`, `(controls)[${controlsTypes}]`, `(textAppText)[${textAppText}]`, `(width)[${width}]`, `(height)[${height}]`, `(resizable)[${resizable}]`);
                        })
                    }
                }
            }
        })
        if(localStorage.getItem("smallWin") == "true") {
            const allWindowsControls = newwin.querySelectorAll(".winic");
            allWindowsControls.forEach((winic) => {
                winic.classList.add("small");
            })
            const mini = newwin.querySelector("#mini").querySelector("rect");
            mini.setAttribute("height", "0.5")
            newwin.querySelector("#drag").classList.add("small");
            const favicon = newwin.querySelector(".favicon");
            favicon.classList.add("small")
            const iframe = newwin.querySelector(".frame");
            const wincs = newwin.querySelectorAll(".winc");
            wincs.forEach((winc) => {
                winc.classList.add("small");
            })
            iframe.classList.add("small");
        }
    }
}

window.addEventListener("message", (e) => {
    var data;
    try {
        data = JSON.parse(e.data);
    } catch (e) {
        return;
    }
    if(data.type === "newWindow") {
        const fields = data.fields;
        if(fields.oneInstance === "(oneInstance)[true]" || fields.oneInstance === "(oneInstance)[yes]") {
            let appName = fields.appName.match(/\[.*?\]/g).toString();
            appName = appName.replace("[", "").replace("]", "");
            let title = fields.title.match(/\[.*?\]/g).toString();
            title = title.replace("[", "").replace("]", "");
            appsShellName.classList.remove("inactive");
            if(document.querySelectorAll(`[data-appname='${appName}']`).length > 0) {
                document.querySelectorAll(".win").forEach((win) => {
                    if(win !== document.querySelector(`[data-appname='${appName}']`)) {
                        win.classList.add("winNotFocus");
                        win.classList.remove("winFocus");
                        win.querySelector(".focusWinEl").classList.add("yes");
                        win.querySelector(".focusWinEl").classList.remove("no");
                    }
                })
                document.querySelector(`[data-appname='${appName}']`).classList.add("winFocus");
                document.querySelector(`[data-appname='${appName}']`).classList.remove("winNotFocus");
                document.querySelectorAll("[app]").forEach((app) => {
                    app.classList.remove("active");
                })
                let appWindowId = document.querySelector(`[data-appname='${appName}']`).getAttribute("id");
                document.querySelector(`[data-appid="${appWindowId}"]`).classList.add("active");
                document.querySelector(".appShell").setAttribute("oneInst", "yes");
                document.querySelector(".appShell").querySelector(".name").setAttribute("data-id", appWindowId);
                document.querySelector(".appShell").querySelector(".name").innerHTML = title;
                document.querySelector(`[data-appname='${appName}']`).querySelector(".focusWinEl").classList.add("no");
                document.querySelector(`[data-appname='${appName}']`).querySelector(".focusWinEl").classList.remove("yes");
                return
            }
        }
        new WIN(fields.link, fields.icon, fields.title, fields.os, fields.fullscreen, fields.appName, fields.controlsTypes, fields.textAppText, fields.urlToOpen, fields.oneInstance, fields.width, fields.height, fields.resizable);
    }
})

window.addEventListener("keydown", (e) => {
    let keyNameLower = e.key.toLowerCase();
    if(e.altKey && keyNameLower === "w") {
        if(document.querySelector("#main").classList.contains("closedA")) {
            document.querySelector(".appsDesk").classList.toggle("openA");
            main.classList.toggle("open");
            main.classList.toggle("closedA");
            document.querySelector(".showDesk").classList.add("noBorderRadius");
            shell.classList.add("noShadow");
            document.querySelector("#appSearch").value = "";
            for(let i = 0; i < apps.length; i++) {
                apps[i].classList.remove("appShow");
                apps[i].classList.remove("appHide");
            }
            let pos = appsOpen.getBoundingClientRect();
            let posTop = pos.top + 6;
            let posLeft = pos.left + 6;
            appsClose.style.top = posTop + "px";
            appsClose.style.left = posLeft + "px";
            shell.style.borderRadius = "0px";
            if(localStorage.getItem("dockOpaque") == "yes") {
                document.querySelector(".dock").classList.remove("glassy");
            }
        } else if(!document.querySelector("#main").classList.contains("closedA")) {
            document.querySelector(".appsDesk").classList.toggle("openA");
            main.classList.toggle("open");
            main.classList.toggle("closedA");
            shell.classList.remove("noShadow");
            document.querySelector("#appSearch").value = "";
            for(let i = 0; i < apps.length; i++) {
                apps[i].classList.remove("appShow")
                apps[i].classList.remove("appHide")
            }
            let allMaximizedWindows = document.querySelectorAll(".maxiY");
            if(allMaximizedWindows.length > 0) {
                shell.style.borderRadius = "0px";
            } else {
                shell.style.borderBottomLeftRadius = "13px";
                shell.style.borderBottomRightRadius = "13px";
            }
            if(localStorage.getItem("dockOpaque") == "yes") {
                document.querySelector(".dock").classList.add("glassy");
            }
        }
    }
    if(e.ctrlKey && e.altKey && keyNameLower == "q") {
        e.preventDefault();
        let frame = document.querySelector(".winFocus").querySelector("#frame");
        let beforeSrc = frame.src;
        frame.src = "about:blank";
        setTimeout(() => {
            frame.src = beforeSrc;
        }, 200)
    }
    if(e.ctrlKey && keyNameLower == "d") {
        e.preventDefault();
        document.querySelector(".apps").classList.toggle("hidden");
        document.querySelector("#appsL").classList.toggle("appsIF");
        document.querySelector(".apps").classList.toggle("op");
    }
    if(e.altKey && e.ctrlKey && keyNameLower == "b") {
        e.preventDefault();
        new WIN("(link)[../hypertabs/index.html]", "(icon)[../resources/terbium.svg]", "(title)[Terbium Browser]", "(os)[true]", "(fullscreen)[false]", '(appname)[hypertabs]');
    }
    if(keyNameLower == "s" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        new WIN("(link)[../settings.html]", "(title)[Terbium Settings]", "(icon)[../resources/terbium.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[settings]', '(oneinst)[yes]');
    }
    if(keyNameLower == "h" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        new WIN("(link)[../help.html]", "(icon)[../resources/help.svg]", "(title)[Terbium Help]", "(os)[true]", "(fullscreen)[false]", '(appname)[help]');
    }
    if(keyNameLower == "p" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        new WIN("(link)[../player/player.html]", "(icon)[../resources/player.svg]", "(title)[Terbium Player]", "(os)[true]", "(fullscreen)[false]", '(appname)[player]');
    }
    if(keyNameLower == "t" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        new WIN("(link)[../terminal/terminal.html]", "(icon)[../resources/terminal.svg]", "(title)[Terbium Terminal]", "(os)[true]", "(fullscreen)[false]", '(appname)[terminal]');
    }
    if(keyNameLower == "x" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        if(document.querySelector(".winFocus")) {
            document.querySelector(".winFocus").querySelector(".close").click();
        }
    }
    if(keyNameLower == "n" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        const win = document.querySelectorAll(".win");
        for (let i = 0; i < win.length; i++) {
            const element = win[i];
            element.querySelector(".mini").click();
        }
    }
    if(keyNameLower == "c" && e.ctrlKey && e.altKey) {
        const win = document.querySelectorAll(".win");
        e.preventDefault();
        for (let i = 0; i < win.length; i++) {
            const element = win[i];
            element.querySelector(".close").click();
        }
    }
    if(e.altKey && e.shiftKey) {
        if(!document.querySelector(".winFocus")) {
            document.querySelector(".appItem").click();
        }
        lastWindow = document.querySelector(".winFocus").id;
        if(!document.querySelector(".winFocus")) {
            if(document.querySelector(".winNotFocus") && document.querySelectorAll(".win").length == 1) {
                document.querySelector(".winNotFocus").classList.add("winFocus");
                document.querySelector(".winNotFocus").classList.remove("winNotFocus");
                document.querySelector(".winFocus").style.opacity = "";
            }
        }
        if(appsShellName.classList.contains("inactive")) {
            appsShellName.classList.remove("inactive");
        }
        var windowsAvailable = document.querySelectorAll(".win");
        var windowsAvailableArray = Array.from(windowsAvailable);
        var windowsAvailableArrayLength = windowsAvailableArray.length;
        var currentWindow = document.querySelector(".winFocus");
        var currentWindowIndex = windowsAvailableArray.indexOf(currentWindow);
        var nextWindowIndex = currentWindowIndex + 1;
        if(nextWindowIndex == windowsAvailableArrayLength) {
            nextWindowIndex = 0;
        }
        var nextWindow = windowsAvailableArray[nextWindowIndex];
        console.log(currentWindow.classList);
        if(currentWindow.classList.contains("winmini")) {
        }
        if(!currentWindow.classList.contains("winmini")) {
            currentWindow.classList.remove("winFocus");
            currentWindow.classList.add("winNotFocus");
            currentWindow.querySelector(".focusWinEl").classList.add("yes");
            currentWindow.querySelector(".focusWinEl").classList.remove("no");
        }
        nextWindow.classList.remove("winNotFocus");
        nextWindow.classList.add("winFocus");
        nextWindow.style.opacity = "";
        nextWindow.querySelector(".focusWinEl").classList.add("no");
        nextWindow.querySelector(".focusWinEl").classList.remove("yes");
        if(nextWindow.classList.contains("winmini")) {
            nextWindow.classList.remove("winmini");
            nextWindow.classList.remove("negZI");
        }
        const appItem = document.querySelectorAll(".appItem");
        for (let i = 0; i < appItem.length; i++) {
            const element = appItem[i];
            element.classList.remove("active");
        }
        document.querySelector("[data-appId='" + nextWindow.id + "']").classList.add("active");
        appsShellName.innerHTML = document.querySelector(".winFocus").getAttribute("data-title");

        let windowsControls = document.querySelector(".winFocus").getAttribute("data-controls");
        if(windowsControls === "minmaxclose") {
            document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        } else if(windowsControls === "minmax") {
            document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="close"]`).classList.add("hidden");
        } else if(windowsControls === "minclose") {
            document.querySelector(`[data-event="maximize"]`).classList.add("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        } else if(windowsControls === "maxclose") {
            document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.add("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        } else if(windowsControls === "close") {
            document.querySelector(`[data-event="maximize"]`).classList.add("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.add("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        } else if(windowsControls === "undefined") {
            document.querySelector(`[data-event="maximize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="minimize"]`).classList.remove("hidden");
            document.querySelector(`[data-event="close"]`).classList.remove("hidden");
        }
        let newWindowAvailable = document.querySelector(".winFocus").getAttribute("oneinst");
        if(newWindowAvailable === "true" || newWindowAvailable === "yes") {
            document.querySelector(`[data-event="newwin"]`).classList.add("hidden");
        } else {
            document.querySelector(`[data-event="newwin"]`).classList.remove("hidden");
        }
    }
})

switch(id) {
    case "browser":
        new WIN("(link)[../hypertabs/index.html]", "(title)[Terbium Browser]", "(icon)[../resources/terbium.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[browser]');
        break;
    case "hypertabs":
        new WIN("(link)[../hypertabs/index.html]", "(title)[Terbium Browser]", "(icon)[../resources/terbium.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[browser]');
    case "color":
        new WIN("(link)[../color/color.html]", "(title)[Terbium Color]", "(icon)[../resources/color-picker.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[color]');
        break;
    case "video":
        new WIN("(link)[../player/player.html]", "(title)[Terbium Player]", "(icon)[../resources/player.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[player]');
        break;
    case "settings":
        new WIN("(link)[../settings.html]", "(title)[Terbium Settings]", "(icon)[../resources/terbium.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[settings]', '(oneinst)[yes]');
        break;
    case "help":
        new WIN("(link)[../help.html]", "(title)[Terbium Help]", "(icon)[../resources/help.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[help]');
        break;
    case "canvas":
        new WIN("(link)[../canvas.html]", "(title)[Terbium Canvas]", "(icon)[../resources/canvas.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[canvas]');
        break;
    case "changelog":
        if (date) {
            new WIN(`(link)[../changes/${date}.html]`, "(title)[Terbium Changelog]", "(icon)[../resources/terbium.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[changelog]');
        } else {
            new WIN("(link)[../changes/index.html]", "(title)[Terbium Changelog]", "(icon)[../resources/terbium.svg]", "(os)[true]", "(fullscreen)[false]", '(appname)[changelog]');
        }
        break;
    case "yt":
        new WIN("(link)[https://youtube.com]", "(title)[YouTube]", "(icon)[../resources/youtube.png]", "(os)[false]", "(fullscreen)[false]", '(appname)[youtube]');
        break;
    case "code":
        new WIN('(link)[https://vscode.dev]', '(icon)[../resources/vsc.ico]', '(title)[Visual Studio Code]', "(os)[false]", "(fullscreen)[false]", "(appname)[code]");
        break;
    case "text":
        if(text) {
            new WIN('(link)[../textEditor/editor.html]', '(icon)[../resources/txt.svg]', '(title)[Terbium Text Editor]', "(os)[true]", "(fullscreen)[false]", "(appname)[text]", `(textAppText)[${text}]`);
        } else {
            new WIN('(link)[../textEditor/editor.html]', '(icon)[../resources/txt.svg]', '(title)[Terbium Text Editor]', "(os)[true]", "(fullscreen)[false]", "(appname)[text]");
        }
        break;
    case "terminal":
        new WIN("(link)[../terminal/terminal.html]", "(icon)[../resources/terminal.svg]", "(title)[Terbium Terminal]", "(os)[true]", "(fullscreen)[false]", "(appname)[terminal]");
        break;
    case "cmd":
        new WIN("(link)[../terminal/terminal.html]", "(icon)[../resources/terminal.svg]", "(title)[Terbium Terminal]", "(os)[true]", "(fullscreen)[false]", "(appname)[terminal]");
        break;
    case "task":
        new WIN("(link)[../taskManager/task.html]", "(icn)[../resources/task.svg]", "(title)[Terbium Task Manager]", "(os)[true]", "(full)[false]", "(nameapp)[task]");
        break;
    case "image":
        new WIN("(link)[../image/image.html]", "(icn)[../resources/image.svg]", "(title)[Image Viewer]", "(os)[true]", "(full)[false]", "(appname)[image]");
        break;
    case "ruffle":
        new WIN("../ruffle/ruffle.html", "../resources/ruffle.svg", "Ruffle", "()[true]", "(full)[false]", "()[ruffle]");
        break;
    case "block":
        new WIN("../block/block.html", "../resources/block.svg", "Terbium Blocker", "()[true]", "()[false]", "()[block]", "()[minClose]");
        break;
    case "calc":
        new WIN("(link)[../calc/calc.html]", "(icon)[../resources/calc.svg]", "(title)[Terbium Calculator]", "(browser)[false]", "(os)[true]", "(fullscreen)[false]", "(appName)[calc]", "(controls)[minClose]");
        break;
    case "test":
        new WIN("(link)[../test/test.html]", "(icon)[../resources/test.svg]", "(title)[Terbium Test]", "(browser)[false]", "(os)[true]", "(fullscreen)[false]", "(appName)[test]", "(controls)[minClose]", "(text)[test]");
        break;
    default: 
        break;
}

class promptingWIN {
    constructor(title, icon, type) {
        this.title = title;
        this.icon = icon;
        this.type = type;
        this.create();
    }
    create() {
        let allParams = [];
        for (const prop in this) {
            if (this.hasOwnProperty(prop)) {
                if(this[prop] == undefined) {
                    continue;
                }
                let paren;
                let propItem;
                paren = this[prop].substring(this[prop].indexOf("(") + 1, this[prop].indexOf(")")).toLowerCase();
                propItem = this[prop].substring(this[prop].indexOf("[") + 1, this[prop].indexOf("]"));
                allParams.push(`(${paren})[${propItem}]`);
            }
        }

        let title;
        let icon;
        let type;

        allParams.filter((item) => {
            let brackVal = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
            if(item.includes("undefined")) {
                return brackVal;
            }
            if(item.includes("null")) {
                return brackVal;
            }
            if(item.includes("(icon)") || item.includes("(icn)")) {
                icon = brackVal;
            }
            if(item.includes("(title)")) {
                title = brackVal;
            }
            if(item.includes("(type)")) {
                type = brackVal;
            }
        });

        const promptWindow = document.createElement("div");
        promptWindow.classList.add("promptWin");
        let promptDrag = document.createElement("div");
        promptDrag.classList.add("promptDrag");

        if(icon) {
            let promptIcon = document.createElement("img");
            promptIcon.src = icon;
            promptIcon.classList.add("promptIcon");
            promptDrag.appendChild(promptIcon);
        }
        if(title) {
            let promptTitle = document.createElement("p");
            promptTitle.innerHTML = title;
            promptTitle.classList.add("promptTitle");
            promptDrag.appendChild(promptTitle);
        }
        if(type) {
            if(type == "error") {
                promptWindow.classList.add("error");
            } else if(type == "warning") {
                promptWindow.classList.add("warning");
            } else if(type == "info") {
                promptWindow.classList.add("info");
            } else if(type == "question") {
                promptWindow.classList.add("question");
            } else if(type == "info vv") {
                promptWindow.classList.add("vv");
                promptWindow.classList.add("info");
            } else {
                promptWindow.classList.add("prompt");
            }
        }
        let close = document.createElement("div");
        close.classList.add("close");
        close.classList.add("winc");
        if(localStorage.getItem("btnr") == "yes") {
            close.classList.add("btnround");
        }
        close.innerHTML = `
            <svg class="winic" id="promptClose" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
        let promptContent = document.createElement("div");
        promptContent.classList.add("promptContent");
        
        promptDrag.addEventListener("mousedown", (e) => {
            let x = e.clientX - promptWindow.offsetLeft;
            let y = e.clientY - promptWindow.offsetTop;
            window.addEventListener("mousemove", move);
            function move(e) {
                let x2 = e.clientX - x;
                let y2 = e.clientY - y;
                promptWindow.style.left = x2 + "px";
                promptWindow.style.top = y2 + "px";
            }
            window.addEventListener("mouseup", () => {
                window.removeEventListener("mousemove", move);
            })
        })
        
        close.addEventListener("click", () => {
            promptWindow.remove();
        });

        document.body.appendChild(promptWindow);
        promptWindow.appendChild(promptDrag);
        promptDrag.appendChild(close);
        promptWindow.appendChild(promptContent);
    }
}