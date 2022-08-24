class xor {
    static encode(str) {
        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    };
    static decode(str) {
        return decodeURIComponent(str.slice(0, -1)).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('');
    };
};
// document.addEventListener("keyup", function() {
//     const input = !!document.querySelectorAll("#input");
//     if(input == true) {
//         for (let i = 0; i < input.length; i++) {
//             const element = input[i];
//             if(input.focus === false) {
//                 console.log("balls");
//             } else {
//                 console.log("nuts");
//             }
//         }
//     } else {
//         console.log("No input detected");
//     }
// })

let ctxm = document.getElementById("ctx");
function hidectx() {
    if(!ctxm.classList.contains("hide") || ctxm.classList.contains("show")) {
        ctxm.classList.add("hide");
        ctxm.classList.remove("show");
    }
}
window.onmousedown = function (e) {
    if(e.which == 3) {
        e.preventDefault();
        ctxm.style.left = e.pageX + "px";
        ctxm.style.top = e.pageY + "px";
        ctxm.classList.add("show");
        ctxm.classList.remove("hide");
        ctxm.querySelector(".menu").innerHTML = "<a class='ctxbt' id='share' onclick='share(); hidectx();'>Share</a><a class='ctxbt' onclick='bd(); hidectx();'>Background</a><a class='ctxbt' onclick='windows('./settings.html', './resources/terbium.svg', 'Terbium Settings', false, true); hidectx()'>Settings</a>"
    } else if(e.which == 1) {
        hidectx();
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
switch(id) {
    case "color":
        windows("../color.html", "../resources/terbium.svg", "Terbium Color Picker", false, true, false, "color");
        break;
    case "browser":
        windows("../newwin.html", "../resources/terbium.svg", "Terbium Browser", true, true, false, "browser")
        break;
    case "settings":
        windows('../settings.html', '../resources/terbium.svg', 'Terbium Settings', false, true, false, "settings");
        break;
    case "help":
        windows('../help.html', '../resources/terbium.svg', 'Terbium Help', false, true, false, "help");
        break;
    case "canvas":
        windows('../canvas.html', '../resources/terbium.svg', 'Terbium Canvas', false, true, false, "canvas");
        break;
    case "changelog":
        if (date) {
            windows(`../changes/${date}.html`, './resources/terbium.svg', 'Terbium Changelog', false, true, false, "changelog");
        } else {
            windows('../changes/index.html', './resources/terbium.svg', 'Terbium Changelog', false, true, false, "changelog");
        }
        break;
    case "yt":
        windows('https://youtube.com', '../resources/yt.png', 'YouTube', false, false, false, "youtube");
        break;
    case "code":
        windows('https://vscode.dev', '../resources/vsc.ico', 'Visual Studio Code', false, false, false, "code");
        break;
    default: 
        break;
}

var keys = {}

// function refresh() {
//     if (document.getElementById("frame")) {
//         var url = document.getElementById("frame").contentWindow.location.href;
//         document.getElementById("frame").src = 'about:blank';
//         setTimeout(function () {
//             document.getElementById("frame").src = url;
//         }, 10);
//     }
// }

// function ref(evt) {
//     let { keyCode, type } = evt || Event; // to deal with IE
//     let isKeyDown = (type == 'keydown');
//     keys[keyCode] = isKeyDown;

//     if (isKeyDown && keys[16] && keys[81]) {
//         refresh();
//     }
//     if (isKeyDown && keys[16] && keys[78]) {
//         windows("./newwin.html", './resources/terbium.png', "Terbium Browser", true, true, false, "browser");
//     }
// };

// function hel(evt) {
//     let { keyCode, type } = evt || Event; // to deal with IE
//     let isKeyDown = (type == 'keydown');
//     keys[keyCode] = isKeyDown;

//     if (isKeyDown && keys[16] && keys[72]) {
//         windows("./help.html", "./resources/terbium.svg", "Terbium Help", false, true, false, "help");
//     }
//     if (isKeyDown && keys[16] && keys[83]) {
//         windows("./settings.html", "./resources/terbium.svg", "Terbium Settings", false, true, false, "settings");
//     }
// };
function windows(link, icn, title, browser, os, fullscreen, appName) {
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
    newwin.id = windowID;
    newwin.classList.add("win");
    newwin.classList.add("maxiN");
    // let appInstances = `${appName}-instances`;
    // // write a new appInstance without overwriting existing ones
    // // the appInstance is a list of all the windows that are open
    // // the list should be expanded as new windows are opened by appending the new windows id to the list
    // if (localStorage.getItem(appInstances) === null) {
    //     localStorage.setItem(appInstances, windowID);
    // } else {
    //     localStorage.setItem(appInstances, localStorage.getItem(appInstances) + ", " + windowID);
    // }
    // const spreadingOfAppInstances = localStorage.getItem(appInstances).split(", ");
    // var appID = newwin.id;
    // var appIDDATA = JSON.parse(localStorage.getItem(appInstances));
    // console.log(JSON.stringify(data));
    // localStorage.setItem("balls", JSON.stringify(data));
    if(appName != null && appName != undefined) {
        newwin.setAttribute("data-app", appName);
    }

    if(localStorage.getItem("winshadow") == "#000000") {
        newwin.style.boxShadow = `0 0 13px 4px #00000052`;
    } else {
        newwin.style.boxShadow = `0 0 13px 4px ${localStorage.getItem("winshadow")}`;
    }
    switch(localStorage.getItem("fullscreen")) {
        case null:
            break;
        case "yes":
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

    if(localStorage.getItem("roundness") != null) {
        newwin.style.borderRadius = localStorage.getItem("roundness") + "px";
    }

    if(fullscreen === true) {
        newwin.classList.remove("maxiN");
        newwin.classList.add("maxiY");
    }

    // change the radius of the window by users setting
    if(localStorage.getItem('radius') === "yes") {
        newwin.classList.add("radius");
    } else if(localStorage.getItem('radius') === "no") {
        newwin.classList.remove("radius");
    } else if(localStorage.getItem('radius') === null) {
        newwin.classList.add("radius");
    }

    // add shadow to window if the user has enabled it
    if(localStorage.getItem('shadow') === "yes") {
        newwin.classList.add("shadow");
    } else if(localStorage.getItem('shadow') === "no") {
        newwin.classList.remove("shadow");
    } else if(localStorage.getItem('shadow') === null) {}

    
    let framew = document.createElement("iframe");
    if(browser === true && os === true) {
        newwin.innerHTML = `
        <div class='winconts' id='drag'>
            <div class='icon'><svg width="86" height="52" viewBox="0 0 86 52" fill="none" id="favicon" class="favicon"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M40.683 12.653V0.242996H0.022V12.653H13.746V52H26.959V12.653H40.683ZM83.3122 16.084C83.6041 6.229 76.3772 0.316 66.5221 0.316H45.7901V52H66.8872C78.3482 52 83.9692 46.963 85.2831 38.641C85.9401 34.699 85.0642 28.056 77.9831 24.479C81.7062 22.581 83.2391 18.42 83.3122 16.084ZM58.9301 20.537V11.339H66.5221C73.0921 11.339 72.8731 20.537 66.5221 20.537H58.9301ZM58.9301 40.539V29.954H66.5221C74.2601 29.954 74.4061 40.539 66.5221 40.539H58.9301Z"
                        fill="url(#paint0_linear_5_2)" />
                    <defs>
                        <linearGradient id="paint0_linear_5_2" x1="83.5" y1="34.1023" x2="17.0779" y2="-24.6401"
                            gradientUnits="userSpaceOnUse">
                            <stop class="stopLIGHT" />
                            <stop class="stopDARK" offset="0.863175" />
                        </linearGradient>
                    </defs>
                </svg></div>
            <div class='title'>${title}</div>
            <div class='controls'>
                <a class='winc mini' id="mini">
                    <svg class="winic" id="maxi" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="15" height="1" fill="#D9D9D9"/>
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
            </div>
        </div>
        <div class="browserC">
            <div class="searchwrap">
                <input type="url" spellcheck="false" class="searchbar" placeholder="Type a url or search with with SearXNG" id="searchbar"></input>
            </div>
        </div>
        `
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        newwin.appendChild(framew);
        // old with http coloring
        // newwin.innerHTML = `<div class='winconts' id='drag'><div class='icon'><svg width="86" height="52" viewBox="0 0 86 52" fill="none" id="favicon" class="favicon" xmlns="http://www.w3.org/2000/svg"><path d="M40.683 12.653V0.242996H0.022V12.653H13.746V52H26.959V12.653H40.683ZM83.3122 16.084C83.6041 6.229 76.3772 0.316 66.5221 0.316H45.7901V52H66.8872C78.3482 52 83.9692 46.963 85.2831 38.641C85.9401 34.699 85.0642 28.056 77.9831 24.479C81.7062 22.581 83.2391 18.42 83.3122 16.084ZM58.9301 20.537V11.339H66.5221C73.0921 11.339 72.8731 20.537 66.5221 20.537H58.9301ZM58.9301 40.539V29.954H66.5221C74.2601 29.954 74.4061 40.539 66.5221 40.539H58.9301Z" fill="url(#paint0_linear_5_2)"/><defs><linearGradient id="paint0_linear_5_2" x1="83.5" y1="34.1023" x2="17.0779" y2="-24.6401" gradientUnits="userSpaceOnUse"><stop class="stopLIGHT"/><stop class="stopDARK" offset="0.863175" /></linearGradient></defs></svg></div><div class='title'>${title}</div><div class='controls'><a id='maxi' class='winc maxi'><svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none"><rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"/></svg></a><a class='close winc' id='close'><svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic"><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg></a></div></div><div class="browserC"><div class="searchwrap"><div spellcheck="false" contentEditable="true" class="searchbar" id="searchbar">Type in a url</div></div></div><iframe frameborder='0' id='frame' src="newwin.html" class='frame'></iframe>`
        newwin.querySelector(".close").addEventListener("click", () => {
            newwin.remove();
            // let appInstance = localStorage.getItem(appInstances);
            // let appInstanceArray = appInstance.split(", ");
            // let index = appInstanceArray.indexOf(windowID);
            // appInstanceArray.splice(index, 1);
            // localStorage.setItem(appInstances, appInstanceArray.join(", "));
            // // if the value is empty, remove the key
            // if (appInstanceArray.length == 0) {
            //     localStorage.removeItem(appInstances);
            // }
        });
        // remove the appInstances from the localStorage when the page is reloaded
        window.addEventListener("beforeunload", () => {
            // remove the localStorage key that contains "instances" in the name
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).includes("instances")) {
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        });

        let search = newwin.querySelector(".searchbar");
        let text = search.innerHTML;
        function selectText(id){
            var sel, range;
            var el = search; //get element id
            if (window.getSelection && document.createRange) { //Browser compatibility
                sel = window.getSelection();
                if(sel.toString() == ''){ //no text selection
                    window.setTimeout(function(){
                        range = document.createRange(); //range object
                        range.selectNodeContents(el); //sets Range
                        sel.removeAllRanges(); //remove all ranges from selection
                        sel.addRange(range);//add Range to a Selection.
                    },1);
                }
            }else if (document.selection) { //older ie
                sel = document.selection.createRange();
                if(sel.text == ''){ //no text selection
                    range = document.body.createTextRange();//Creates TextRange object
                    range.moveToElementText(el);//sets Range
                    range.select(); //make selection.
                }
            }
        }
        // this deals with the search bar on the Terbium browser
        search.addEventListener("keydown", (e) => {
            let safeSearch = localStorage.getItem("ss");
            let framew = newwin.querySelector("#frame");
            function ser() {
                event.preventDefault();
                let url = search.value.trim();
                // let url = search.innerHTML.trim();
                let URLSLICE = url.slice(".");
                // var removeHandeler = url.slice((Math.max(url.lastIndexOf("://"))) + 3);
                // search.innerHTML = `<mark>https://</mark><p>${removeHandeler}</p>`;
                // console.log(url);
                if(safeSearch === null) {
                    if (!isUrl(url)) url = 'https://searx.priv.pw/search?q=' + url + "&safesearch=0";
                } else if(safeSearch === "ss_0") {
                    if (!isUrl(url)) url = 'https://searx.priv.pw/search?q=' + url + "&safesearch=0";
                } else if(safeSearch === "ss_1") {
                    if (!isUrl(url)) url = 'https://searx.priv.pw/search?q=' + url + "&safesearch=1";
                } else if(safeSearch === "ss_2") {
                    if (!isUrl(url)) url = 'https://searx.priv.pw/search?q=' + url + "&safesearch=2";
                }
                framew.src = "sw" + "/" + xor.encode(url);
            }
            if (e.keyCode == "9") {
                e.preventDefault();
                return;
            }
            if (e.keyCode == "13") {
                e.preventDefault();
                ser()
            }
            // if (e.keyCode == "8") {
            //     if(search.lastChild.nodeName = "BR") {
            //         search.innerHTML = "Type in a url";
            //         selectText()
            //     }
            // }
        });
    }
    if(browser === false && os === false) {
        newwin.innerHTML = `
        <div class='winconts' id='drag'>
            <div a class='icon'>
                <img draggable='false' src='${icn}' class='favicon' id='favicon'>
            </div>
            <div class='title'>${title}</div>
            <div class='controls'>
                <a class='winc mini' id="mini">
                    <svg class="winic" id="maxi" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="15" height="1" fill="#D9D9D9"/>
                    </svg>
                </a>
                <a id='maxi' class='winc maxi'>
                    <svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none">
                        <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"/>
                    </svg>
                </a>
                <a class='close winc' id='close'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic">
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </svg>
                </a>
            </div>
        </div>
        `
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        newwin.appendChild(framew);
        newwin.querySelector(".close").addEventListener("click", () => {
            newwin.remove();
            // let appInstance = localStorage.getItem(appInstances);
            // let appInstanceArray = appInstance.split(", ");
            // let index = appInstanceArray.indexOf(windowID);
            // appInstanceArray.splice(index, 1);
            // localStorage.setItem(appInstances, appInstanceArray.join(", "));
            // // if the value is empty, remove the key
            // if (appInstanceArray.length == 0) {
            //     localStorage.removeItem(appInstances);
            // }
        });
    } else if(browser === false && os === true) {
        newwin.innerHTML = `
        <div class='winconts' id='drag'>
            <div a class='icon'>
                <svg width="86" height="52" viewBox="0 0 86 52" fill="none" id="favicon" class="favicon" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40.683 12.653V0.242996H0.022V12.653H13.746V52H26.959V12.653H40.683ZM83.3122 16.084C83.6041 6.229 76.3772 0.316 66.5221 0.316H45.7901V52H66.8872C78.3482 52 83.9692 46.963 85.2831 38.641C85.9401 34.699 85.0642 28.056 77.9831 24.479C81.7062 22.581 83.2391 18.42 83.3122 16.084ZM58.9301 20.537V11.339H66.5221C73.0921 11.339 72.8731 20.537 66.5221 20.537H58.9301ZM58.9301 40.539V29.954H66.5221C74.2601 29.954 74.4061 40.539 66.5221 40.539H58.9301Z" fill="url(#paint0_linear_5_2)" />
                    <defs>
                        <linearGradient id="paint0_linear_5_2" x1="83.5" y1="34.1023" x2="17.0779" y2="-24.6401" gradientUnits="userSpaceOnUse">
                            <stop class="stopLIGHT"/>
                            <stop class="stopDARK" offset="0.863175"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div class='title'>${title}</div>
            <div class='controls'>
                <a class='winc mini' id="mini">
                    <svg class="winic" id="maxi" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="15" height="1" fill="#D9D9D9"/>
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
            </div>
        </div>
        `
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        newwin.appendChild(framew);
        newwin.querySelector(".close").addEventListener("click", () => {
            newwin.remove();
            // let appInstance = localStorage.getItem(appInstances);
            // let appInstanceArray = appInstance.split(", ");
            // let index = appInstanceArray.indexOf(windowID);
            // appInstanceArray.splice(index, 1);
            // localStorage.setItem(appInstances, appInstanceArray.join(", "));
            // // if the value is empty, remove the key
            // if (appInstanceArray.length == 0) {
            //     localStorage.removeItem(appInstances);
            // }
        });
    }
    framew.onload = () => {
        framew.contentWindow.postMessage(windowID, "*");
    }

    // make window buttons round or blocky depending on the users settings
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

    function winfocus() {
        const windows = document.querySelectorAll(".win");
        for (let i = 0; i < windows.length; i++) {
            windows[i].style.zIndex = "1";
        }
        newwin.style.zIndex = "2";
    }

    let max;
    let dragger = newwin.querySelector("#drag");
    let dock = document.querySelector("#dock");
    let a = 0;
    newwin.querySelector('.winc').onclick = () => {
        localStorage.setItem(appName, a++);
        newwin.classList.add("winmini");
        if(newwin.classList.contains("maxiY")) {
            newwin.classList.remove("maxiY");
            // dock.classList.remove("dockN");
        }
        //check if a is 1
        // if a is 1 then make an create an element with the same id as the window and append it to the dock
        let newdock = document.createElement("div");
        newdock.setAttribute("id", newwin.id);
        newdock.setAttribute("title", title)
        newdock.classList.add("dockbtn");
        newdock.innerHTML = `<img class="dockicon" src='${icn}'>`
        dock.appendChild(newdock);
        newdock.onclick = () => {
            newdock.parentNode.removeChild(newdock);
            newwin.classList.remove("winmini");
            if(maxState === true) {
                newwin.classList.add("maxiY");
            }
        }
        // if(a > 0) {
        //     let newdock = document.createElement("div");
        //     newdock.setAttribute("id", newwin.id);
        //     newdock.classList.add("dockbtn");
        //     newdock.innerHTML = `<img class="dockicon" src='${icn}'>`
        //     dock.appendChild(newdock);
        //     newdock.onclick = () => {
        //         newdock.parentNode.removeChild(newdock);
        //         newwin.classList.remove("winmini");
        //         if(a = 1) {
        //             localStorage.removeItem(appName);
        //         } else if(a > 1) {
        //             localStorage.setItem(appInstances, newwin.id);
        //         }
        //     }
        // } 
    }
    newwin.querySelector('.maxi').onclick = () => {
        var newwinHEIGHT = document.querySelector('.win').clientHeight;
        var newwinWIDTH = document.querySelector('.win').clientWidth;
        if(newwin.classList.contains('maxiN')) {
            maxState = true;
            newwin.classList.add('maxiY');
            newwin.classList.remove('maxiN');
            document.getElementById("dock").classList.remove("dockY");
            // document.getElementById("dock").classList.add("dockN");
            dragger.removeEventListener("mousedown", mousedown);
            newwin.removeEventListener("mousedown", winfocus);
            if(localStorage.getItem("shadow") === "yes") {
                newwin.classList.add("noShadow");
                newwin.classList.remove("shadow");
            }
            newwin.classList.add("maxiR");
            max = false;
        } else if(newwin.classList.contains('maxiY')) {
            maxState = false;
            newwin.classList.add('maxiN');
            newwin.classList.remove('maxiY');
            document.getElementById("dock").classList.add("dockY");
            // document.getElementById("dock").classList.remove("dockN");
            dragger.addEventListener("mousedown", mousedown);
            newwin.addEventListener("mousedown", winfocus);
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

    framew.addEventListener("mousedown", winfocus);
    newwin.addEventListener("mousedown", winfocus);
    framew.setAttribute("onclick", "winfocus()");

    // function close(evt) {
    //     let { keyCode, type } = evt || Event;
    //     let isKeyDown = (type == 'keydown');
    //     keys[keyCode] = isKeyDown;

    //     if (isKeyDown && keys[16] && keys[67]) {
    //         newwin.parentNode.removeChild(newwin);
    //     }
    // }
    // window.addEventListener("keydown", close);
    
    // const scriptElement = document.createElement("script");
    // scriptElement.type = "text/javascript";
    // scriptElement.src = "./js/terbium.messages.js";
    // framew.onclick = () => {
    //     framew.contentWindow.postMessage(windowID, "*");
    //     framew.contentWindow.on
    //     // framew.contentWindow.document.body.appendChild(scriptElement);
    // }
    switch(os) {
        case false: 
            framew.src = "sw" + "/" + xor.encode(link);
            break;
        case true:
            framew.src = link;
            break;
        default:
            break;
    }

    dragger.addEventListener("dblclick", (e) => {
        console.log('doubleclick');
        newwin.querySelector('.maxi').click();
    });

    dragger.addEventListener("mousedown", mousedown);
    newwin.addEventListener("mousedown", winfocus);
    window.addEventListener("message", () => {
        winfocus();
    });
    
    function mousedown(e) {
        const windows = document.querySelectorAll(".win");
        for (let i = 0; i < windows.length; i++) {
            windows[i].style.zIndex = "1";
        }
        newwin.style.zIndex = "2";

        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        var startX = e.clientX;
        var startY = e.clientY;

        function mousemove(e) {
            var X = startX - e.clientX;
            var Y = startY - e.clientY;
            const bounds = newwin.getBoundingClientRect();
            
            newwin.style.left = bounds.left - X + "px";
            newwin.style.top = bounds.top - Y + "px";

            startX = e.clientX;
            startY = e.clientY;
        }

        function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
        }
    }
    document.body.appendChild(newwin);
}

function hideStart() {
    if (document.querySelector(".apps").classList.contains("op")) {
        document.querySelector(".apps").classList.add("hidden");
        document.querySelector("#appsL").classList.remove("appsIF");
        document.querySelector(".apps").classList.remove("op");
    }
}

document.getElementById("appsear").addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        let string = document.getElementById("appsear").value;
        let stringlow = string.toLowerCase();
        switch (stringlow) {
            case "youtube":
                windows('https://youtube.com', '../resources/yt.png', 'YouTube', false, false, 'youtube');
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "code":
                windows('https://vscode.dev', '../resources/vsc.ico', 'Visual Studio Code', false, false, 'code');
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "apple music":
                windows('https://music.apple.com', '../resources/am.png', 'Apple Music', false, false, 'apple music');
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "spotify":
                windows('https://spotify.com', '../resources/sp.png', 'Spotify', false, false, 'spotify');
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "tidal":
                windows('https://tidal.com', '../resources/td.ico', 'Tidal', false, false, 'tidal');
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "youtube music":
                windows('https://music.youtube.com', '../resources/ytm.png', 'YouTube Music', false, false, 'youtube music');
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "settings":
                windows("../settings.html", "../resources/terbium.svg", "Terbium Settings", false, true, 'settings');
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "browser":
                windows("../newwin.html", "../resources/terbium.svg", "Terbium Browser", true, true, 'browser');
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "help":
                windows("../help.html", "../resources/terbium.svg", "Terbium Help", false, true, 'help')
                hideStart();
                document.getElementById("appsear").value = "";
                break
            case "color picker":
                windows("../color.html", "../resources/terbium.svg", "Terbium Picker", false, true, 'color')
                hideStart();
                document.getElementById("appsear").value = "";
                break
            default:
                break
        }
    }
})