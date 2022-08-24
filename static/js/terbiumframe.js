function terbium() {
    this.data = 'undefined';
    this.throw = function(data) {
        terbium.data = data;
    }
    this.catch = function() {
        console.log(terbium.data);
    }
    this.import = function(moduleLocation) {
        // write a function that creates a script html element and appends it to the body
        var script = document.createElement('script');
        script.src = moduleLocation;
        document.body.appendChild(script);
        console.log('Terbium.import() called');
        // return a promise that resolves when the script is loaded
        return new Promise(function(resolve, reject) {
            script.onload = resolve;
            script.onerror = reject;
        });

    }

    this.initApp = function() {
        // check if _TAPPExportData exists
        if (typeof _TAPPExportData == 'undefined') {
            console.log('[System Warning] No export data found, typeof _TAPPExportData is undefined');
        } else {
            const tappFile = JSON.parse(_TAPPExportData);
            const mainScript = tappFile.scripterInfo.main_script;
            console.log(`Loading app: ${tappFile.appName}`);
            console.log(`Main script: ${mainScript}`);
            var ma1n = terbium.import(mainScript)
            console.log('Attempting to import main script at: ' + mainScript);
            console.log(`Version: ${tappFile.version}`);
            console.log(`Author: ${tappFile.author}`);
            console.log(`Description: ${tappFile.description}`);
            // make this function only callable once
        };



        this.initApp = function() {
            console.error('You cannot call initApp() more than once.')
            return "";
        }

        return true;

    }
    this.window = function (link, icn, title, browser, os, fullscreen) {
        const newwin = document.createElement("div");
        let windowID;
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return windowID = result;
        }
        makeid(18);
        newwin.id = windowID;
        newwin.classList.add("win");
        newwin.classList.add("maxiN");

        newwin.style.boxShadow = `0 0 13px 4px ${localStorage.getItem("winshadow")}`;
        switch (localStorage.getItem("fullscreen")) {
            case null:
                break;
            case "yes":
                newwin.classList.remove("maxiN");
                newwin.classList.add("maxiY");
                break;
            case "no":
                break;
            default:
                break;
        }

        if (localStorage.getItem("roundness") != null) {
            newwin.style.borderRadius = localStorage.getItem("roundness") + "px";
        }

        if (fullscreen === true) {
            newwin.classList.remove("maxiN");
            newwin.classList.add("maxiY");
        }

        // change the radius of the window by users setting
        if (localStorage.getItem('radius') === "yes") {
            newwin.classList.add("radius");
        } else if (localStorage.getItem('radius') === "no") {
            newwin.classList.remove("radius");
        } else if (localStorage.getItem('radius') === null) {
            newwin.classList.add("radius");
        }

        // add shadow to window if the user has enabled it
        if (localStorage.getItem('shadow') === "yes") {
            newwin.classList.add("shadow");
        } else if (localStorage.getItem('shadow') === "no") {
            newwin.classList.remove("shadow");
        } else if (localStorage.getItem('shadow') === null) { }


        let framew = document.createElement("iframe");
        if (browser === true && os === true) {
            newwin.innerHTML = `<div class='winconts' id='drag'><div class='icon'><svg width="86" height="52" viewBox="0 0 86 52" fill="none" id="favicon" class="favicon" xmlns="http://www.w3.org/2000/svg"><path d="M40.683 12.653V0.242996H0.022V12.653H13.746V52H26.959V12.653H40.683ZM83.3122 16.084C83.6041 6.229 76.3772 0.316 66.5221 0.316H45.7901V52H66.8872C78.3482 52 83.9692 46.963 85.2831 38.641C85.9401 34.699 85.0642 28.056 77.9831 24.479C81.7062 22.581 83.2391 18.42 83.3122 16.084ZM58.9301 20.537V11.339H66.5221C73.0921 11.339 72.8731 20.537 66.5221 20.537H58.9301ZM58.9301 40.539V29.954H66.5221C74.2601 29.954 74.4061 40.539 66.5221 40.539H58.9301Z" fill="url(#paint0_linear_5_2)"/><defs><linearGradient id="paint0_linear_5_2" x1="83.5" y1="34.1023" x2="17.0779" y2="-24.6401" gradientUnits="userSpaceOnUse"><stop class="stopLIGHT"/><stop class="stopDARK" offset="0.863175" /></linearGradient></defs></svg></div><div class='title'>${title}</div><div class='controls'><a id='maxi' class='winc maxi'><svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none"><rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"/></svg></a><a class='close winc' id='close'><svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic"><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg></a></div></div><div class="browserC"><div class="searchwrap"><input type="url" spellcheck="false" class="searchbar" placeholder="Type a url or search with with SearXNG" id="searchbar"></input></div></div>`
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
            // old with http coloring
            // newwin.innerHTML = `<div class='winconts' id='drag'><div class='icon'><svg width="86" height="52" viewBox="0 0 86 52" fill="none" id="favicon" class="favicon" xmlns="http://www.w3.org/2000/svg"><path d="M40.683 12.653V0.242996H0.022V12.653H13.746V52H26.959V12.653H40.683ZM83.3122 16.084C83.6041 6.229 76.3772 0.316 66.5221 0.316H45.7901V52H66.8872C78.3482 52 83.9692 46.963 85.2831 38.641C85.9401 34.699 85.0642 28.056 77.9831 24.479C81.7062 22.581 83.2391 18.42 83.3122 16.084ZM58.9301 20.537V11.339H66.5221C73.0921 11.339 72.8731 20.537 66.5221 20.537H58.9301ZM58.9301 40.539V29.954H66.5221C74.2601 29.954 74.4061 40.539 66.5221 40.539H58.9301Z" fill="url(#paint0_linear_5_2)"/><defs><linearGradient id="paint0_linear_5_2" x1="83.5" y1="34.1023" x2="17.0779" y2="-24.6401" gradientUnits="userSpaceOnUse"><stop class="stopLIGHT"/><stop class="stopDARK" offset="0.863175" /></linearGradient></defs></svg></div><div class='title'>${title}</div><div class='controls'><a id='maxi' class='winc maxi'><svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none"><rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"/></svg></a><a class='close winc' id='close'><svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic"><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg></a></div></div><div class="browserC"><div class="searchwrap"><div spellcheck="false" contentEditable="true" class="searchbar" id="searchbar">Type in a url</div></div></div><iframe frameborder='0' id='frame' src="newwin.html" class='frame'></iframe>`
            newwin.querySelector('.close').setAttribute('onclick', 'this.parentNode.parentNode.parentNode.remove()');

            let search = newwin.querySelector(".searchbar");
            let text = search.innerHTML;
            function selectText(id) {
                var sel, range;
                var el = search; //get element id
                if (window.getSelection && document.createRange) { //Browser compatibility
                    sel = window.getSelection();
                    if (sel.toString() == '') { //no text selection
                        window.setTimeout(function () {
                            range = document.createRange(); //range object
                            range.selectNodeContents(el); //sets Range
                            sel.removeAllRanges(); //remove all ranges from selection
                            sel.addRange(range);//add Range to a Selection.
                        }, 1);
                    }
                } else if (document.selection) { //older ie
                    sel = document.selection.createRange();
                    if (sel.text == '') { //no text selection
                        range = document.body.createTextRange();//Creates TextRange object
                        range.moveToElementText(el);//sets Range
                        range.select(); //make selection.
                    }
                }
            }
            search.addEventListener("keydown", (e) => {
                let framew = newwin.querySelector("#frame");
                function ser() {
                    event.preventDefault();
                    let url = search.value.trim();
                    // let url = search.innerHTML.trim();
                    let URLSLICE = url.slice(".");
                    // var removeHandeler = url.slice((Math.max(url.lastIndexOf("://"))) + 3);
                    // search.innerHTML = `<mark>https://</mark><p>${removeHandeler}</p>`;
                    // console.log(url);
                    if (!isUrl(url)) url = 'https://search.networkchuck.coffee/search?q=' + url + "&safesearch=0";
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
        if (browser === false && os === false) {
            newwin.innerHTML = `<div class='winconts' id='drag'><div a class='icon'><img draggable='false' src='${icn}' class='favicon' id='favicon'></div><div class='title'>${title}</div><div class='controls'><a id='maxi' class='winc maxi'><svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none"><rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"/></svg></a><a class='close winc' id='close'><svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic"><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg></a></div></div>`
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
            newwin.querySelector('.close').setAttribute('onclick', 'this.parentNode.parentNode.parentNode.remove()');
        } else if (browser === false && os === true) {
            newwin.innerHTML = `<div class='winconts' id='drag'><div a class='icon'><svg width="86" height="52" viewBox="0 0 86 52" fill="none" id="favicon" class="favicon" xmlns="http://www.w3.org/2000/svg"><path d="M40.683 12.653V0.242996H0.022V12.653H13.746V52H26.959V12.653H40.683ZM83.3122 16.084C83.6041 6.229 76.3772 0.316 66.5221 0.316H45.7901V52H66.8872C78.3482 52 83.9692 46.963 85.2831 38.641C85.9401 34.699 85.0642 28.056 77.9831 24.479C81.7062 22.581 83.2391 18.42 83.3122 16.084ZM58.9301 20.537V11.339H66.5221C73.0921 11.339 72.8731 20.537 66.5221 20.537H58.9301ZM58.9301 40.539V29.954H66.5221C74.2601 29.954 74.4061 40.539 66.5221 40.539H58.9301Z" fill="url(#paint0_linear_5_2)"/><defs><linearGradient id="paint0_linear_5_2" x1="83.5" y1="34.1023" x2="17.0779" y2="-24.6401" gradientUnits="userSpaceOnUse"><stop class="stopLIGHT"/><stop class="stopDARK" offset="0.863175" /></linearGradient></defs></svg></div><div class='title'>${title}</div><div class='controls'><a id='maxi' class='winc maxi'><svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none"><rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"/></svg></a><a class='close winc' id='close'><svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic"><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg></a></div></div>`
            framew.setAttribute("src", link);
            framew.setAttribute("id", "frame");
            framew.setAttribute("class", "frame");
            framew.setAttribute("frameborder", "0");
            newwin.appendChild(framew);
            newwin.querySelector('.close').setAttribute('onclick', 'this.parentNode.parentNode.parentNode.remove()');
        }
        framew.onload = () => {
            framew.contentWindow.postMessage(windowID, "*");
        }

        // make window buttons round or blocky depending on the users settings
        let winc = newwin.querySelectorAll(".winc");
        if (localStorage.getItem('btnr') === "yes") {
            for (let i = 0; i < winc.length; i++) {
                winc[i].classList.add("btnround");
            }
            newwin.querySelector('.winc').classList.add("btnround");
        } else if (localStorage.getItem('btnr') === "no") {
            for (let i = 0; i < winc.length; i++) {
                winc[i].classList.remove("btnround");
            }
        } else if (localStorage.getItem('btnr') === null) {
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
        newwin.querySelector('.maxi').onclick = () => {
            var newwinHEIGHT = document.querySelector('.win').clientHeight;
            var newwinWIDTH = document.querySelector('.win').clientWidth;
            if (newwin.classList.contains('maxiN')) {
                newwin.classList.add('maxiY');
                newwin.classList.remove('maxiN');
                if (localStorage.getItem("shadow") === "yes") {
                    newwin.classList.add("noShadow");
                    newwin.classList.remove("shadow");
                }
                max = false;
            } else if (newwin.classList.contains('maxiY')) {
                newwin.classList.add('maxiN');
                newwin.classList.remove('maxiY');
                if (localStorage.getItem("shadow") === "yes") {
                    newwin.classList.remove("noShadow");
                    newwin.classList.add("shadow");
                }
                max = true;
                newwin.style.width = newwinWIDTH;
                newwin.style.height = newwinHEIGHT;
            }
        }

        framew.addEventListener("mousedown", winfocus);
        newwin.addEventListener("mousedown", winfocus);
        framew.setAttribute("onclick", "winfocus()");

        function close(evt) {
            let { keyCode, type } = evt || Event;
            let isKeyDown = (type == 'keydown');
            keys[keyCode] = isKeyDown;

            if (isKeyDown && keys[16] && keys[67]) {
                newwin.parentNode.removeChild(newwin);
            }
        }
        window.addEventListener("keydown", close);

        // const scriptElement = document.createElement("script");
        // scriptElement.type = "text/javascript";
        // scriptElement.src = "./js/terbium.messages.js";
        // framew.onclick = () => {
        //     framew.contentWindow.postMessage(windowID, "*");
        //     framew.contentWindow.on
        //     // framew.contentWindow.document.body.appendChild(scriptElement);
        // }
        switch (os) {
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
            console.log("ball");
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
}
var terbium = new terbium()
terbium.initApp()


// terbium.throw('bruh');
// terbium.catch();