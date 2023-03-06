const win = window.parent.document.querySelectorAll(".win");
const dark = document.getElementById("dark");
const night = document.getElementById("night");
const frac = document.getElementById("frac");
const almond = document.getElementById("almond");
const logoWall = window.parent.document.querySelector(".logoWall");
const deskBack = document.querySelector(".deskBack");

let seti = window.parent.document.querySelector("#setg");
let stylec = window.parent.document.getElementById("rels");
let favi = window.parent.document.getElementById("favi");
let terbic = window.parent.document.getElementById("terb");
let setcc = window.parent.document.getElementById("setc");
let img = window.parent.document.querySelector(".favicon");
let background = window.parent.document.getElementById("background")
let dd = document.getElementById("dd");
let dp = document.getElementById("dp");
let defpow = document.getElementById("defpow");
let defaultb = document.getElementById("default");

function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

class xor {
    static encode(str) {
        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    };
    static decode(str) {
        return decodeURIComponent(str.slice(0, -1)).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('');
    };
};

function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

const themeBtns = document.querySelectorAll(".themeBtn");

themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        let themeValue = btn.getAttribute("theme-set");
        window.parent.document.documentElement.setAttribute('data-theme', themeValue);
        localStorage.setItem("theme", themeValue);
        let allWindows = window.parent.document.querySelectorAll(".win");
        for (let a = 0; a < allWindows.length; a++) {
            const element = allWindows[a];
            element.querySelector("#frame").contentWindow.document.documentElement.setAttribute('data-theme', themeValue);
            let rgbForInput = getComputedStyle(window.parent.document.documentElement).getPropertyValue('--window-shadow-border');
            element.querySelector("#frame").contentWindow.document.querySelector("[input-color-value]").style.backgroundColor = rgbForInput;
        }
        if(localStorage.getItem("background") === "default") {
            deskBack.src = `../resources/themePrevs/theme - ${themeValue}.png`;
        }
    })
})

defaultb.addEventListener("click", () => {
    localStorage.setItem("background", "default");
    background.src = "";
    background.classList.add("bHidden");
    logoWall.classList.remove("hidden");
    deskBack.src = `../resources/themePrevs/theme - ${localStorage.getItem("theme")}.png`;
    if(deskBack.classList.contains("contain")) {
        deskBack.classList.remove("contain");
    }
    dd.value = "default";
});

dd.addEventListener("keydown", (e) => {
    if(e.keyCode == "13"){
        if(dd.value == "default") {
            background.src = "";
            background.classList.add("bHidden");
            logoWall.classList.remove("hidden");
            localStorage.setItem("background", "default");
        } else if(dd.value == "" || !dd.value.includes("https://")) {
            return
        } else {
            logoWall.classList.add("hidden");
            background.src = dd.value;
            background.classList.remove("bHidden");
            localStorage.setItem("background", dd.value)
            deskBack.src = dd.value;
            if(localStorage.getItem("backF") === "contain") {
                if(!deskBack.classList.contains("contain")) {
                    deskBack.classList.add("contain");
                }
            }
        }
    }
});

if(localStorage.getItem("background")) {
    dd.value = localStorage.getItem("background");
} else if(!localStorage.getItem("background")) {
    dd.value = ""
}

if(localStorage.getItem("backF") === null) {
    localStorage.setItem("backF", "contain");
} else if(localStorage.getItem("backF") === "contain") {
    if(localStorage.getItem("background") != "default") {
        deskBack.classList.add("contain");
    }
} else if(localStorage.getItem("backF") === "cover") {
    if(localStorage.getItem("background") != "default") {
        deskBack.classList.remove("contain");
    }
}

function contain() {
    background.style.objectFit = "contain";
    background.classList.add("contain");
    background.classList.remove("stretch");
    localStorage.setItem("backF", "contain");
    if(localStorage.getItem("background") != "default") {
        deskBack.classList.add("contain");
    }
}

function stretch() {
    background.style.objectFit = "cover";
    background.classList.remove("contain");
    background.classList.add("stretch");
    localStorage.setItem("backF", "cover");
    if(localStorage.getItem("background") != "default") {
        deskBack.classList.remove("contain");
    }
}

defpow.addEventListener("click", () => {
    localStorage.setItem("powd", "https://google.com");
    dp.value = "https://google.com"
});

dp.addEventListener("keydown", (e) => {
    if(e.keyCode == "13"){
        if(dp.value == "" || !dp.value.includes("https://")) {
            return
        } else {
            localStorage.setItem("powd", dp.value)
        }
    }
});

if(localStorage.getItem("powd")) {
    dp.value = localStorage.getItem("powd");
} else if(!localStorage.getItem("powd")) {
    dp.value = ""
}


// window customization section
const resetAll = document.getElementById("resetAll");
const radius = document.getElementById("radius");
const shadow = document.getElementById("shadow");
const btnr = document.getElementById("btnr");
const btnrPos = document.querySelectorAll("#btnrPos");
const roundness = document.getElementById("roundness");
const clearRoundness = document.getElementById("clearRoundness");
const fullscreen = document.getElementById("fullscreen");
const customShadow = document.getElementById("customShadow");
const clearCustomShadow = document.getElementById("clearCustomShadow");
const login = document.getElementById("login");
const dockPos = document.querySelectorAll(".dockPos");

const controls = window.parent.document.querySelectorAll(".controls");
const favicon = window.parent.document.querySelectorAll(".icon");

resetAll.addEventListener("click", () => {
    const prompt = "Are you sure you want to reset all settings?";
    if(confirm(prompt)) {
        localStorage.clear();
        location.reload();
    } else {
        return
    }
});

if(localStorage.getItem("winBtnPos") === null) {
    localStorage.setItem("winBtnPos", "right");
}

switch(localStorage.getItem("winBtnPos")) {
    case null:
        btnrPos[0].checked = true;
        btnrPos[1].checked = false;
        break;
    case "left":
        btnrPos[0].checked = false;
        btnrPos[1].checked = true;
        break;
    case "right":
        btnrPos[0].checked = true;
        btnrPos[1].checked = false;
        break;
    default:
        break;
}

for (let i = 0; i < btnrPos.length; i++) {
    const element = btnrPos[i];
    element.addEventListener("click", () => {
        let allWindows = window.parent.document.querySelectorAll(".win");
        switch(element.getAttribute("data-btnpos").toLowerCase()) {
            case "left":
                allWindows.forEach((element) => {
                    element.querySelector(".icon").classList.add("iconR");
                    element.querySelector(".icon").classList.remove("iconL");
                    element.querySelector(".controls").classList.add("controlsL");
                    element.querySelector(".controls").classList.remove("controlsR");
                })
                btnrPos[0].checked = false;
                btnrPos[1].checked = true;
                localStorage.setItem("winBtnPos", "left");
                break;
            case "right":
                allWindows.forEach((element) => {
                    element.querySelector(".icon").classList.add("iconL");
                    element.querySelector(".icon").classList.remove("iconR");
                    element.querySelector(".controls").classList.add("controlsR");
                    element.querySelector(".controls").classList.remove("controlsL");
                })
                btnrPos[0].checked = true;
                btnrPos[1].checked = false;
                localStorage.setItem("winBtnPos", "right");
                break;
            default:
                break;
        }
    })
}

if(localStorage.getItem("dockPos") === null) {
    localStorage.setItem("dockPos", "bottom");
}

switch(localStorage.getItem("dockPos").toLowerCase()) {
    case "left":
        dockPos[0].checked = false;
        dockPos[1].checked = true;
        dockPos[2].checked = false;
        break;
    case "right":
        dockPos[0].checked = false;
        dockPos[1].checked = false;
        dockPos[2].checked = true;
        break;
    case "bottom":
        dockPos[0].checked = true;
        dockPos[1].checked = false;
        dockPos[2].checked = false;
        break;
    default:
        dockPos[0].checked = true;
        dockPos[1].checked = false;
        dockPos[2].checked = false;
        break;
}

for (let i = 0; i < dockPos.length; i++) {
    const element = dockPos[i];
    element.addEventListener("click", () => {
        switch(element.getAttribute("data-pos").toLowerCase()) {
            case "left":
                document.getElementById("dp_left").checked = true;
                document.getElementById("dp_right").checked = false;
                document.getElementById("dp_bottom").checked = false;
                break;
            case "right":
                document.getElementById("dp_left").checked = false;
                document.getElementById("dp_right").checked = true;
                document.getElementById("dp_bottom").checked = false;
                break;
            case "bottom":
                document.getElementById("dp_left").checked = false;
                document.getElementById("dp_right").checked = false;
                document.getElementById("dp_bottom").checked = true;
                break;
        }
        localStorage.setItem("dockPos", element.getAttribute("data-pos"));
        if(element.getAttribute("data-pos").toLowerCase() == "left") {
            window.parent.document.getElementById("dock").classList.add(`dLeft`);
            window.parent.document.getElementById("dock").classList.remove(`dRight`);
            window.parent.document.getElementById("dock").classList.remove(`dBottom`);
            window.parent.document.getElementById("appsClose").classList.add(`left`);
            window.parent.document.getElementById("appsClose").classList.remove(`right`);
            window.parent.document.getElementById("appsClose").classList.remove(`bottom`);
            const acs = window.parent.document.querySelectorAll(".activeSpan");
            for (let i = 0; i < acs.length; i++) {
                const element = acs[i];
                element.classList.add(`left`);
                element.classList.remove(`right`);
                element.classList.remove(`bottom`);
            }
        } else if(element.getAttribute("data-pos").toLowerCase() == "right") {
            window.parent.document.getElementById("dock").classList.add(`dRight`);
            window.parent.document.getElementById("dock").classList.remove(`dLeft`);
            window.parent.document.getElementById("dock").classList.remove(`dBottom`);
            window.parent.document.getElementById("appsClose").classList.add(`right`);
            window.parent.document.getElementById("appsClose").classList.remove(`left`);
            window.parent.document.getElementById("appsClose").classList.remove(`bottom`);
            const acs = window.parent.document.querySelectorAll(".activeSpan");
            for (let i = 0; i < acs.length; i++) {
                const element = acs[i];
                element.classList.add(`right`);
                element.classList.remove(`left`);
                element.classList.remove(`bottom`);
            }
        } else if(element.getAttribute("data-pos").toLowerCase() == "bottom") {
            window.parent.document.getElementById("dock").classList.add(`dBottom`);
            window.parent.document.getElementById("dock").classList.remove(`dRight`);
            window.parent.document.getElementById("dock").classList.remove(`dLeft`);
            window.parent.document.getElementById("appsClose").classList.add(`bottom`);
            window.parent.document.getElementById("appsClose").classList.remove(`right`);
            window.parent.document.getElementById("appsClose").classList.remove(`left`);
            const acs = window.parent.document.querySelectorAll(".activeSpan");
            for (let i = 0; i < acs.length; i++) {
                const element = acs[i];
                element.classList.add(`bottom`);
                element.classList.remove(`right`);
                element.classList.remove(`left`);
            }
        }
    });
}

if(localStorage.getItem("pass") === "none") {
    login.checked = false;
} else if(localStorage.getItem("pass") != "none") {
    login.checked = true;
}

function addLogoutButton() {
    const logoutHolder = document.createElement("div");
    logoutHolder.classList.add("sys");
    logoutHolder.classList.add("logout");
    logoutHolder.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="sysicon" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M7 12h14l-3 -3m0 6l3 -3" />
        </svg>
    `;
    window.parent.document.querySelector(".sysc").appendChild(logoutHolder);
}

const newPass = document.getElementById("newPass");
newPass.addEventListener("click", () => {
    let setNew = prompt("Enter new password");
    if(setNew === null) {
        return
    } else if(setNew === "") {
        localStorage.setItem("pass", "none");
        window.parent.document.querySelector(".logout").remove();
        login.checked = false;
    } else {
        localStorage.setItem("pass", xor.encode(setNew));
        alert("next time your password is: " + setNew);
        addLogoutButton();
        login.checked = true;
    }
})

login.addEventListener("click", () => {
    switch(login.checked) {
        case true:
            let setNew = prompt("Enter password");
            if(setNew === null) {
                return
            } else if(setNew === "") {
                localStorage.setItem("pass", "none");
                window.parent.document.querySelector(".logout").remove();
                login.checked = false;
            } else {
                localStorage.setItem("pass", xor.encode(setNew));
                alert("next time your password is: " + setNew);
                addLogoutButton();
            }
            break;
        case false:
            localStorage.setItem("pass", "none");
            window.parent.document.querySelector(".logout").remove();
            break;
        default:
            break;
    }
})

switch(localStorage.getItem("fullscreen")) {
    case null:
        localStorage.setItem("fullscreen", "no");
        break;
    case "no":
        fullscreen.checked = false;
        break;
    case "yes":
        fullscreen.checked = true;
        break;
    default:
        break;
}

fullscreen.addEventListener('click', () => {
    switch(fullscreen.checked) {
        case true:
            localStorage.setItem("fullscreen", "yes");
            break;
        case false:
            localStorage.setItem("fullscreen", "no");
            break;
        default:
            break;
    }
});

if(localStorage.getItem("radius") === "custom") {
    roundness.value = localStorage.getItem("roundness");
}

//adding the roundness to the windows on the number change

if (localStorage.getItem("roundnessAmount") === null) {
    localStorage.setItem("roundnessCustomState", "yes");
}
let roundnessCustomState = localStorage.getItem("roundnessCustomState");
roundness.addEventListener("change", e => {
    localStorage.setItem("roundnessCustomState", "yes");
    let allWindows = window.parent.document.querySelectorAll(".win");
    allWindows.forEach(element => {
        radius.checked = true;
        localStorage.setItem("radius", "custom");
        element.classList.remove("radius");
        element.classList.add("custom");
        element.style.borderRadius = `${roundness.value}px`;
    })
    localStorage.setItem("roundness", roundness.value);
});

clearRoundness.addEventListener("click", e => {
    roundnessState = false;
    roundnessAmount = 12;
    localStorage.setItem("roundness", "12");
    let allWindows = window.parent.document.querySelectorAll(".win");
    allWindows.forEach(element => {
        localStorage.setItem("radius", "yes");
        element.classList.remove("custom");
        element.classList.add("radius");
        element.querySelector(".frame").contentWindow.document.querySelector("#radius").checked = true;
        switch(localStorage.getItem("radius")) {
            case "yes":
                element.classList.add("radius");
                roundness.value = "12";
                break;
            case "no":
                element.classList.remove("radius");
                roundness.value = "0";
                break;
            default:
                element.classList.add("radius");
                break;
        }
    });
});

// adding the rounding or blockyness of window buttons on switch change
switch(localStorage.getItem("btnr")) {
    case null:
        btnr.checked = true;
        break;
    case "yes":
        btnr.checked = true;
        break;
    case "no":
        btnr.checked = false;
        break;
    default:
        break;
}

btnr.addEventListener("click", () => {
    const btns = window.parent.document.querySelectorAll(".winc");
    switch(btnr.checked) {
        case true:
            localStorage.setItem("btnr", "yes");
            for (let i = 0; i < btns.length; i++) {
                const element = btns[i];
                element.classList.add("btnround");
            }
            break;
        case false:
            localStorage.setItem("btnr", "no");
            for (let i = 0; i < btns.length; i++) {
                const element = btns[i];
                element.classList.remove("btnround");
            }
            break;
        default:
            break;
    }
});

if(localStorage.getItem("winshadow") != null) {
    let = rgb = localStorage.getItem("winshadow");
    // turn the rgb into a hex code
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    let = hex = "#";
    for (let i = 0; i < rgb.length; i++) {
        hex += ("0" + parseInt(rgb[i], 10).toString(16)).slice(-2);
    }
    // remove 20 at the end of the hex code
    hex = hex.substring(0, hex.length - 2);
    customShadow.value = hex;
    const inputColorValue = document.querySelector("[input-color-value]");
    let rgbForInput = localStorage.getItem("winshadow");
    // remove 0.32 at the end of the rgb: like something of rgba(0, 0, 0, 0.32)
    rgbForInput = rgbForInput.substring(0, rgbForInput.length - 7) + ")";
    inputColorValue.style.backgroundColor = rgbForInput;
}

if(localStorage.getItem("winshadow") === "default") {
    const inputColorValue = document.querySelector("[input-color-value]");
    let rgbForInput = getComputedStyle(window.parent.document.documentElement).getPropertyValue('--window-shadow-border');
    inputColorValue.style.backgroundColor = rgbForInput;
}

const inputForEl = document.querySelector("[input-for]");
let inputFor = inputForEl.getAttribute("input-for");

inputForEl.addEventListener("click", () => {
    let el = document.querySelector(`#${inputFor}`);
    el.click();
})

customShadow.addEventListener("input", () => {
    let allWindows = window.parent.document.querySelectorAll(".win");
    let hex = customShadow.value;
    var red = parseInt(hex[1]+hex[2],16);
    var green = parseInt(hex[3]+hex[4],16);
    var blue = parseInt(hex[5]+hex[6],16);
    let rgb = `rgba(${red}, ${green}, ${blue}, 0.32)`;
    
    if(shadow.checked === false) {
        shadow.checked = true;
        localStorage.setItem("shadow", "yes");
    }
    customShadow.setAttribute("value", rgb);
    allWindows.forEach(element => {
        element.style.boxShadow = `0 0 1px 1px ${rgb}, 0 0 13px 4px ${rgb}`;
        let iny = element.querySelector("#frame").contentWindow.document.querySelector("[input-color-value]");
        if(iny) {
            element.querySelector("#frame").contentWindow.document.querySelector("[input-color-value]").style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        }
    });
    localStorage.setItem("winshadow", `${rgb}`);
});

if(localStorage.getItem("roundness") === null) {
    localStorage.setItem("roundness", "12");
}

clearCustomShadow.addEventListener("click", () => {
    let allWindows = window.parent.document.querySelectorAll(".win");
    allWindows.forEach(element => {
        element.style.boxShadow = `0 0 1px 1px var(--window-shadow-border), 0px 0px 13px 4px rgb(0 0 0 / 32%)`;
        let rgbForInput = getComputedStyle(window.parent.document.documentElement).getPropertyValue('--window-shadow-border');
        element.querySelector("#frame").contentWindow.document.querySelector("[input-color-value]").style.backgroundColor = rgbForInput;
        element.querySelector("#frame").contentWindow.document.querySelector("#customShadow").setAttribute("value", rgbForInput);
    });
    localStorage.setItem("winshadow", "default");
});

// adding shadow to windows on switch change
switch(localStorage.getItem("shadow")) {
    case null:
        shadow.checked = true;
        localStorage.setItem("shadow", "yes");
        for (let i = 0; i < win.length; i++) {
            const element = win[i];
            element.classList.add("shadow");
        }
        break;
    case "yes":
        shadow.checked = true;
        break;
    case "no":
        shadow.checked = false;
        break;
    default:
        break;
}

shadow.addEventListener("click", () => {
    let allWindows = window.parent.document.querySelectorAll(".win");
    switch(shadow.checked) {
        case true:
            localStorage.setItem("shadow", "yes");
            allWindows.forEach(element => {
                element.style.boxShadow = `0 0 1px 1px ${localStorage.getItem("winshadow")}, 0 0 13px 4px ${localStorage.getItem("winshadow")}`;
                element.classList.remove("noShadow");
            })
            break;
        case false:
            localStorage.setItem("shadow", "no");
            allWindows.forEach(element => {
                element.classList.add("noShadow");
                element.classList.add("shadow");
            })
            break;
        default:
            break;
    }
})

// adding radius to windows on switch change
switch(localStorage.getItem("radius")) {
    case null:
        radius.checked = true;
        break;
    case "yes":
        radius.checked = true;
        break;
    case "no":
        radius.checked = false;
        break;
    default:
        break;
}

radius.addEventListener("click", () => {
    let allWindows = window.parent.document.querySelectorAll(".win");
    switch(radius.checked) {
        case true:
            localStorage.setItem("radius", "yes");
            allWindows.forEach(element => {
                if(localStorage.getItem("roundness") != "12") {
                    element.classList.add("custom");
                    element.style.borderRadius = localStorage.getItem("roundness") + "px";
                    localStorage.setItem("radius", "custom")
                }
                if(localStorage.getItem("roundness") === "12") {
                    console.log("12px");
                    element.classList.remove("custom");
                    element.classList.remove("noRad");
                    element.classList.add("radius");
                }
            })
            break;
        case false:
            localStorage.setItem("radius", "no");
            allWindows.forEach(element => {
                if(localStorage.getItem("roundness") != "12") {
                    element.classList.add("noRad");
                    element.classList.remove("custom");
                    element.style.borderRadius = 0;
                } 
                if(localStorage.getItem("roundness") === "12") {
                    element.classList.remove("radius");
                    element.classList.remove("custom");
                    element.classList.add("noRad");
                }
                if(localStorage.getItem("radius") === "no") {
                    element.classList.add("noRad");
                    element.classList.remove("custom");
                    element.classList.remove("radius");
                    element.style.borderRadius = 0;
                }
            })
            break;
        default:
            break;
    }
});


// browser customization
const dropTextSS = document.querySelector(".SS");
switch(localStorage.getItem("ss")) {
    case "ss_0":
        dropTextSS.innerHTML = "None";
        break;
    case "ss_1":
        dropTextSS.innerHTML = "Moderate";
        break;
    case "ss_2":
        dropTextSS.innerHTML = "Strict";
        break;
    default:
        localStorage.setItem("ss", "ss_0");
        dropTextSS.innerHTML = "None"
        break;
}

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
        });
        
    }
}

if(localStorage.getItem("background") === null) {
    localStorage.setItem("background", "default");
    deskBack.src = `../resources/themePrevs/theme - ${localStorage.getItem("theme")}.png`;
} else if(localStorage.getItem("background") === "default") {
    deskBack.src = `../resources/themePrevs/theme - ${localStorage.getItem("theme")}.png`;
} else {
    deskBack.src = localStorage.getItem("background");
}

const categories = document.querySelectorAll(".category");
categories.forEach(category => {
    category.addEventListener("click", () => {
        const type = category.getAttribute("type");
        const views = document.querySelectorAll("[view]");
        if(type === "theme") {
            const theme = document.querySelector("[view='theme']");
            views.forEach(view => {
                view.setAttribute("hiddenCat", "true");
            })
            theme.setAttribute("hiddenCat", "false");
        } else if(type === "osl") {
            const osl = document.querySelector("[view='osl']");
            views.forEach(view => {
                view.setAttribute("hiddenCat", "true");
            })
            osl.setAttribute("hiddenCat", "false");
        } else if(type === "other") {
            const other = document.querySelector("[view='other']");
            views.forEach(view => {
                view.setAttribute("hiddenCat", "true");
            })
            other.setAttribute("hiddenCat", "false");
        }
    })
});

const uploadImage = document.querySelector(".customImage");

uploadImage.addEventListener("change", () => {
    const file = uploadImage.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        localStorage.setItem("background", reader.result);
        deskBack.src = reader.result;
        parent.document.querySelector(".background").src = reader.result;
        parent.document.querySelector(".background").classList.remove("bHidden");
        parent.document.querySelector(".logoWall").classList.add("hidden");
        if(localStorage.getItem("backF") === "contain") {
            if(!deskBack.classList.contains("contain")) {
                deskBack.classList.add("contain");
            }
        }
    }
})