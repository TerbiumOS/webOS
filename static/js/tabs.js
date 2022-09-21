const active_Window = () => {document.querySelector('.frame[active]')}; // fill this after
const content_Window  = (id) => {return document.getElementById(id).content_Window};

class Tab {
    create () {
        let framew = document.createElement("iframe");
        let browserC = document.createElement("div");
        let browserCHTML = `
                        <div class="chrome-tab">
                            <div class="chrome-tab-content">
                                <div class="chrome-tab-title">New Tab</div>
                                <div class="chrome-tab-drag-handle"></div>
                                <div class="chrome-tab-close"></div>
                            </div>
                        </div>
        `;
        document.querySelector('.chrome-tabs-content');
    
    }
    remove () {
        
    }
}

    if(appName === "browser") {
        const loadingStateUrl = document.createElement("div");
        loadingStateUrl.classList.add("loadingStateUrl");
        loadingStateUrl.innerText = "Loading...";
        if(browsersRunning === 0) {
            document.body.appendChild(chromeJS);
        }
        browsersRunning++;
        localStorage.setItem("browser", browsersRunning);
        const searchbar = document.createElement("input");
        searchbar.classList.add("searchbar");
        searchbar.spellcheck = false;
        searchbar.setAttribute("placeholder", "Type a url or search with with SearXNG");
        searchbar.id = "searchbar";
        searchbar.setAttribute("type", "url");
        
        newwin.appendChild(winconts);
        newwin.classList.add("browser");
        winconts.appendChild(favicon);
        winconts.appendChild(titleElement);
        winconts.appendChild(controls);
        titleElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="bIcon backFrame" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="bIcon forwardFrame" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="9 6 15 12 9 18" />
            </svg>
            <svg class="bIcon ref" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_207_19)">
                    <path d="M66.5 43.3333C65.6571 49.7642 62.4993 55.6674 57.6177 59.9379C52.7362 64.2085 46.4656 66.5535 39.9798 66.5341C33.4939 66.5147 27.2375 64.1322 22.3816 59.8326C17.5257 55.5329 14.4032 49.6109 13.5988 43.1752C12.7943 36.7394 14.3629 30.231 18.011 24.8684C21.6592 19.5057 27.1366 15.6565 33.4182 14.0412C39.6997 12.4258 46.3546 13.1552 52.1371 16.0927C57.9196 19.0302 62.4333 23.9745 64.8333 30M66.5 13.3333V30H49.8333" stroke="#FF2825" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_207_19">
                        <rect width="80" height="80" fill="white" transform="translate(80 80) rotate(-180)"/>
                    </clipPath>
                </defs>
            </svg>
        `;
        titleElement.appendChild(searchbar);
        browserC.innerHTML = browserCHTML;
        newwin.appendChild(browserC);
        
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        newwin.appendChild(framew);
        const backFrame = newwin.querySelector(".backFrame");
        const forwardFrame = newwin.querySelector(".forwardFrame");
        const refFrame = newwin.querySelector(".ref");
        
        backFrame.onclick = () => {
            if(framew.contentWindow.history.length > 2) {
                newwin.appendChild(loadingStateUrl);
                framew.contentWindow.history.back();
                framew.onload = () => {
                    newwin.removeChild(loadingStateUrl);
                }
            }
        }
        forwardFrame.onclick = () => {
            if(framew.contentWindow.history.length >= 3) {
                newwin.appendChild(loadingStateUrl);
                framew.contentWindow.history.forward();
                framew.onload = () => {
                    newwin.removeChild(loadingStateUrl);
                }
            }
        }
        refFrame.onclick = () => {
            newwin.appendChild(loadingStateUrl);
            framew.contentWindow.location.reload();
            framew.onload = () => {
                newwin.removeChild(loadingStateUrl);
            }
        }
        // old with http coloring
        // newwin.innerHTML = `<div class='winconts' id='drag'><div class='icon'><svg width="86" height="52" viewBox="0 0 86 52" fill="none" id="favicon" class="favicon" xmlns="http://www.w3.org/2000/svg"><path d="M40.683 12.653V0.242996H0.022V12.653H13.746V52H26.959V12.653H40.683ZM83.3122 16.084C83.6041 6.229 76.3772 0.316 66.5221 0.316H45.7901V52H66.8872C78.3482 52 83.9692 46.963 85.2831 38.641C85.9401 34.699 85.0642 28.056 77.9831 24.479C81.7062 22.581 83.2391 18.42 83.3122 16.084ZM58.9301 20.537V11.339H66.5221C73.0921 11.339 72.8731 20.537 66.5221 20.537H58.9301ZM58.9301 40.539V29.954H66.5221C74.2601 29.954 74.4061 40.539 66.5221 40.539H58.9301Z" fill="url(#paint0_linear_5_2)"/><defs><linearGradient id="paint0_linear_5_2" x1="83.5" y1="34.1023" x2="17.0779" y2="-24.6401" gradientUnits="userSpaceOnUse"><stop class="stopLIGHT"/><stop class="stopDARK" offset="0.863175" /></linearGradient></defs></svg></div><div class='title'>${title}</div><div class='controls'><a id='maxi' class='winc maxi'><svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none"><rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5"/></svg></a><a class='close winc' id='close'><svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic"><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg></a></div></div><div class="browserC"><div class="searchwrap"><div spellcheck="false" contentEditable="true" class="searchbar" id="searchbar">Type in a url</div></div></div><iframe frameborder='0' id='frame' src="newwin.html" class='frame'></iframe>`
        // remove the appInstances from the localStorage when the page is reloaded

        let search = newwin.querySelector(".searchbar");
        // check when the url of framew has changed
        let text = searchbar.innerHTML;
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
        searchbar.addEventListener("keydown", (e) => {
            let safeSearch = localStorage.getItem("ss");
            let framew = newwin.querySelector("#frame");
            function ser() {
                newwin.appendChild(loadingStateUrl);
                framew.onload = () => {
                    loadingStateUrl.remove();
                }
                event.preventDefault();
                let url = search.value.trim();
                // let url = search.innerHTML.trim();
                let URLSLICE = url.slice(".");
                // var removeHandeler = url.slice((Math.max(url.lastIndexOf("://"))) + 3);
                // search.innerHTML = `<mark>https://</mark><p>${removeHandeler}</p>`;
                // console.log(url);
                if(safeSearch === null) {
                    if (!isUrl(url)) url = `https://searx.priv.pw/search?q=${url}&safesearch=0`;
                } else if(safeSearch === "ss_0") {
                    if (!isUrl(url)) url = `https://searx.priv.pw/search?q=${url}&safesearch=0`;
                } else if(safeSearch === "ss_1") {
                    if (!isUrl(url)) url = `https://searx.priv.pw/search?q=${url}&safesearch=1`;
                } else if(safeSearch === "ss_2") {
                    if (!isUrl(url)) url = `https://searx.priv.pw/search?q=${url}&safesearch=2`;
                }
                search.value = url;
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