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
            if(localStorage.getItem("winshadow") === "default") {
                if(localStorage.getItem("accentShadow") === "no") {
                    let rgbForInput = getComputedStyle(window.parent.document.documentElement).getPropertyValue('--window-shadow-border');
                    element.querySelector("#frame").contentWindow.document.querySelector("[input-color-value]").style.backgroundColor = rgbForInput;
                } else if(localStorage.getItem("accentShadow") === "yes") {
                    let rgbForInput = getComputedStyle(window.parent.document.documentElement).getPropertyValue('--accentShadow');
                    if(element.querySelector("#frame").contentWindow.document.querySelector("[input-color-value]")) {
                        element.querySelector("#frame").contentWindow.document.querySelector("[input-color-value]").style.backgroundColor = rgbForInput;
                    }
                }
            }
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

if(!localStorage.getItem("powd")) {
    localStorage.setItem("powd", "https://google.com");
}

if(!localStorage.getItem("dockFull")) {
    localStorage.setItem("dockFull", "no");
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
const usedynamic = document.getElementById("dyn");
const dockPos = document.querySelectorAll(".dockPos");
const dockFull = document.getElementById("dockFull");
const dockOpaque = document.getElementById("dockOpq");
const themeAccentShadow = document.getElementById("themeAccentShadow");

const controls = window.parent.document.querySelectorAll(".controls");
const favicon = window.parent.document.querySelectorAll(".icon");

resetAll.addEventListener("click", () => {
    const prompt = "Are you sure you want to reset all settings?";
    if(confirm(prompt)) {
        localStorage.clear();
        window.parent.location.reload();
    } else {
        return
    }
});

themeAccentShadow.addEventListener("click", () => {
    if(themeAccentShadow.checked) {
        localStorage.setItem("accentShadow", "yes");
        localStorage.setItem("winshadow", "default");
        window.parent.document.querySelectorAll(".win").forEach((win) => {
            win.style.boxShadow = `0 0 1px 1px var(--accentShadow), 0 0 13px 4px var(--accentShadow)`;
        })
        let accentShadow = getComputedStyle(window.parent.document.documentElement).getPropertyValue("--accentShadow");
        document.querySelector("[input-color-value]").style.backgroundColor = accentShadow;
    } else {
        localStorage.setItem("accentShadow", "no");
        if(localStorage.getItem("winshadow") === "default") {
            window.parent.document.querySelectorAll(".win").forEach((win) => {
                win.style.boxShadow = `0 0 1px 1px var(--window-shadow-border), 0px 0px 13px 4px rgb(0 0 0 / 32%)`;
            })
        } else if(localStorage.getItem("winshadow") != "default") {
            if(localStorage.getItem("shadow") === "yes") {
                window.parent.document.querySelectorAll(".win").forEach((win) => {
                    win.style.boxShadow = `0 0 1px 1px ${localStorage.getItem("winshadow")}, 0px 0px 13px 4px ${localStorage.getItem("winshadow")}`;
                })
            }
        }
    }
})

switch(localStorage.getItem("accentShadow")) {
    case "yes":
        themeAccentShadow.checked = true;
        break;
    case "no":
        themeAccentShadow.checked = false;
        break;
}

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

dockFull.addEventListener("click", () => {
    if(dockFull.checked) {
        localStorage.setItem("dockFull", "yes");
        window.parent.document.querySelector(".dock").classList.add("dockFull");
        let allWindows = window.parent.document.querySelectorAll(".maxiY");
        allWindows.forEach((element) => {
            element.classList.remove("LD");
            element.classList.remove("RD");
            element.classList.remove("BD");
            switch(localStorage.getItem("dockPos").toLowerCase()) {
                case "left":
                    element.classList.add("LDF");
                    break;
                case "right":
                        element.classList.add("RDF");
                    break;
                case "bottom":
                    element.classList.add("BDF");
                    break;
            }
        })
    } else {
        localStorage.setItem("dockFull", "no");
        window.parent.document.querySelector(".dock").classList.remove("dockFull");
        let allWindows = window.parent.document.querySelectorAll(".winFocus");
        allWindows.forEach((element) => {
            element.classList.remove("LDF");
            element.classList.remove("RDF");
            element.classList.remove("BDF");
            switch(localStorage.getItem("dockPos").toLowerCase()) {
                case "left":
                    element.classList.add("LD");
                    element.classList.remove("RD");
                    element.classList.remove("BD");
                    break;
                case "right":
                    element.classList.add("RD");
                    element.classList.remove("LD");
                    element.classList.remove("BD");
                    break;
                case "bottom":
                    element.classList.add("BD");
                    element.classList.remove("LD");
                    element.classList.remove("RD");
                    break;
            }
        })
    }
})

switch(localStorage.getItem("dockFull").toLowerCase()) {
    case "yes":
        dockFull.checked = true;
        break;
    case "no":
        dockFull.checked = false;
        break;
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
        let allWindows = window.parent.document.querySelectorAll(".win");
        allWindows.forEach((element) => {
            switch(localStorage.getItem("dockPos").toLowerCase()) {
                case "left":
                    window.parent.document.querySelector(".shell").classList.add("L");
                    window.parent.document.querySelector(".shell").classList.remove("R");
                    if(localStorage.getItem("dockFull").toLowerCase() === "yes") {
                        element.classList.add("LDF");
                        element.classList.remove("RDF");
                        element.classList.remove("BDF");
                    } else {
                        element.classList.add("LD");
                        element.classList.remove("RD");
                        element.classList.remove("BD");
                    }
                    break;
                case "right":
                    window.parent.document.querySelector(".shell").classList.add("R");
                    window.parent.document.querySelector(".shell").classList.remove("L");
                    if(localStorage.getItem("dockFull").toLowerCase() === "yes") {
                        element.classList.add("RDF");
                        element.classList.remove("LDF");
                        element.classList.remove("BDF");
                    } else {
                        element.classList.add("RD");
                        element.classList.remove("LD");
                        element.classList.remove("BD");
                    }
                    break;
                case "bottom":
                    window.parent.document.querySelector(".shell").classList.remove("R");
                    window.parent.document.querySelector(".shell").classList.remove("L");
                    if(localStorage.getItem("dockFull").toLowerCase() === "yes") {
                        element.classList.add("BDF");
                        element.classList.remove("LDF");
                        element.classList.remove("RDF");
                    } else {
                        element.classList.add("BD");
                        element.classList.remove("LD");
                        element.classList.remove("RD");
                    }
                    break;
            }
        })
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

const dynVal = localStorage.getItem("useDynamic");

if (dynVal === "true") {
    usedynamic.checked = true;
} else {
    usedynamic.checked = false;
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

usedynamic.addEventListener("click", () => {
    switch(usedynamic.checked) {
        case true:
            localStorage.setItem("useDynamic", "true");
            break;
        case false:
            localStorage.setItem("useDynamic", "false");
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
roundness.addEventListener("change", e => {
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

if(!localStorage.getItem("winshadow")) {
    localStorage.setItem("winshadow", "default");
}

if(localStorage.getItem("winshadow") != null) {
    let = rgb = localStorage.getItem("winshadow");
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    let = hex = "#";
    for (let i = 0; i < rgb.length; i++) {
        hex += ("0" + parseInt(rgb[i], 10).toString(16)).slice(-2);
    }
    hex = hex.substring(0, hex.length - 2);
    customShadow.value = hex;
    const inputColorValue = document.querySelector("[input-color-value]");
    let rgbForInput = localStorage.getItem("winshadow");
    rgbForInput = rgbForInput.replace(", 32%", '');
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
    themeAccentShadow.checked = false;
    localStorage.setItem("accentShadow", "no");
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
    localStorage.setItem("accentShadow", "no");
    themeAccentShadow.checked = false;
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

dockOpaque.addEventListener("click", () => {
    switch(dockOpaque.checked) {
        case true:
            localStorage.setItem("dockOpaque", "yes");
            window.parent.document.querySelector(".dock").classList.add("glassy");
            break;
        case false:
            localStorage.setItem("dockOpaque", "no");
            window.parent.document.querySelector(".dock").classList.remove("glassy");
            break;
    }
})

if(localStorage.getItem("dockOpaque")) {
    switch(localStorage.getItem("dockOpaque")) {
        case "yes":
            dockOpaque.checked = true;
            break;
        case "no":
            dockOpaque.checked = false;
            break;
    }
}

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

if(!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark");
}

if(!localStorage.getItem("background")) {
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
        } else if(type === "version") {
            const version = document.querySelector("[view='version']");
            views.forEach(view => {
                view.setAttribute("hiddenCat", "true");
            })
            version.setAttribute("hiddenCat", "false");
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

const importButton = document.querySelector("#importSettings");
const importScript = document.querySelector("#importExportInp");

importButton.addEventListener("click", () => {
    importScript.click();
})

importScript.addEventListener("change", () => {
    const file = importScript.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    let ext = file.name.split(".").pop();
    if(ext != "tbs" && ext != "txt") {
        return alert("Please upload a .tbs or .txt file formatted to the Terbium Settings Import Format (TBSIF).");
    }
    reader.onload = () => {
        let promptConfirm = "Are you sure you want to import these settings? This will overwrite your current settings.";
        if(confirm(promptConfirm)) {
            let allWindows = window.parent.document.querySelectorAll(".win");
            let IndicationFields = reader.result.match(/\[(.*?)\]/g);
            let IndicationValues = reader.result.match(/"(.*?)"/g);
            for (let i = 0; i < IndicationFields.length; i++) {
                if(IndicationFields[i] === null || IndicationValues[i] === null) {
                    return alert("There was an error reading the file, make sure it is formatted to the Terbium Settings Import Format (TBSIF).");
                }
                let element = IndicationFields[i];
                let value = IndicationValues[i];
                let field = element.replace('[', "").replace(']', "");
                let val = value.replace('"', "").replace('"', "");
                switch(field.toLowerCase()) {
                    case "wallpaper":
                        localStorage.setItem("background", val);
                        document.querySelector("#dd").src = val;
                        window.parent.document.querySelector(".background").classList.remove("bHidden");
                        if(val === "default") {
                            document.querySelector(".deskBack").src = `../resources/themePrevs/theme - ${localStorage.getItem("theme")}.png`;
                            window.parent.document.querySelector(".background").src = `../resources/themePrevs/theme - ${localStorage.getItem("theme")}.png`;
                            window.parent.document.querySelector(".background").classList.add("bHidden");
                            window.parent.document.querySelector(".logoWall").classList.remove("hidden");
                        } else {
                            document.querySelectorAll(".deskBack").src = val;
                            window.parent.document.querySelector(".background").src = val;
                        }
                        break;
                    case "wallpaperfill":
                            localStorage.setItem("backF", val);
                            if(val === "contain") {
                                console.log(val);
                                document.querySelector(".deskBack").classList.add("contain");
                                window.parent.document.querySelector(".background").classList.add("contain");
                                window.parent.document.querySelector(".background").classList.remove("stretch");
                                window.parent.document.querySelector(".background").style.objectFit = "contain";
                            } else {
                                document.querySelector(".deskBack").classList.remove("contain");
                                window.parent.document.querySelector(".background").classList.remove("contain");
                                window.parent.document.querySelector(".background").classList.add("stretch");
                                window.parent.document.querySelector(".background").style.objectFit = "cover";
                            }
                            window.parent.document.querySelector(".logoWall").classList.add("hidden");
                            window.parent.document.querySelector(".background").classList.remove("bHidden");
                        break;
                    case "theme":
                        localStorage.setItem("theme", val);
                        window.parent.document.documentElement.setAttribute("data-theme", val);
                        allWindows.forEach(win => {
                            win.querySelector("#frame").contentWindow.document.documentElement.setAttribute("data-theme", val);
                        });
                        break;
                    case "customwinradius":
                        if(val > 0 && val <= 22) {
                            localStorage.setItem("radius", "custom");
                            localStorage.setItem("roundness", val);
                            allWindows.forEach(win => {
                                win.style.borderRadius = `${val}px`;
                                win.classList.remove("radius");
                                document.querySelector("#roundness").value = val;
                                document.querySelector("#radius").checked = true;
                            })
                        }
                        break;
                    case "roundwin":
                        allWindows.forEach(win => {
                            win.classList.remove("radius");
                            if(val === "yes") {
                                localStorage.setItem("radius", "yes");
                                if(localStorage.getItem("roundness") !== null){
                                    win.style.borderRadius = `${localStorage.getItem("roundness")}px`;
                                } else {
                                    win.style.borderRadius = "12px";
                                }
                                document.querySelector("#radius").checked = true;
                            } else if(val === "no") {
                                localStorage.setItem("radius", "no");
                                win.style.borderRadius = "0px";
                                document.querySelector("#radius").checked = false;
                            }
                        })
                        break;
                    case "roundbtns":
                        if(val === "yes") {
                            localStorage.setItem("btnr", "yes");
                            allWindows.forEach(win => {
                                let winbtns = win.querySelectorAll(".winc");
                                winbtns.forEach(btn => {
                                    btn.classList.add("btnround");
                                })
                                document.querySelector("#btnr").checked = true;
                            })
                        } else if(val === "no") {
                            localStorage.setItem("btnr", "no");
                            allWindows.forEach(win => {
                                win.querySelector(".winc").classList.remove("btnround");
                                document.querySelector("#btnr").checked = false;
                            })
                        }
                        break;
                    case "customshadow":
                        if(val === "default") {
                            localStorage.setItem("winshadow", "default");
                        } else {
                            let r;
                            let g;
                            let b;
                            if(val.includes("rgb")) {
                                let valRepl;
                                if(val.includes("32%")) {
                                    valRepl = val;
                                } else {
                                    valRepl = val.replace(")", "");
                                    valRepl += ", 32%)";
                                }
                                localStorage.setItem("winshadow", valRepl);
                                allWindows.forEach(win => {
                                    win.style.boxShadow = `0 0 1px 1px ${valRepl}, 0 0 13px 4px ${valRepl}`;
                                    document.querySelector("[input-color-value]").style.backgroundColor = val;
                                })
                            } else {
                                if(val.includes(",")) {
                                    let rgb = val.replace("(", "").replace(")", "").replace(" ", "").split(",");
                                    r = rgb[0];
                                    g = rgb[1];
                                    b = rgb[2];
                                    val = `rgb(${r}, ${g}, ${b}, 32%)`;
                                    localStorage.setItem("winshadow", val);
                                }
                                allWindows.forEach(win => {
                                    win.style.boxShadow = `0 0 1px 1px ${val}, 0 0 13px 4px ${val}`;
                                    document.querySelector("[input-color-value]").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                                })
                            }
                        }
                        break;
                    case "dockpos":
                        localStorage.setItem("dockPos", val);
                        val = val.toLowerCase();
                        if(val === "bottom") {
                            window.parent.document.querySelector(".dock").classList.remove("dLeft");
                            window.parent.document.querySelector(".dock").classList.remove("dRight");
                            window.parent.document.querySelector(".dock").classList.add("dBottom");
                            window.parent.document.querySelector(".dock").querySelectorAll(".activeSpan").forEach(item => {
                                item.classList.add("bottom");
                                item.classList.remove("left");
                                item.classList.remove("right");
                            })
                            document.querySelector("#dp_left").checked = false;
                            document.querySelector("#dp_left").checked = false;
                            document.querySelector("#dp_left").checked = false;
                        } else if(val === "left") {
                            window.parent.document.querySelector(".dock").classList.remove("dBottom");
                            window.parent.document.querySelector(".dock").classList.remove("dRight");
                            window.parent.document.querySelector(".dock").classList.add("dLeft");
                            window.parent.document.querySelector(".dock").querySelectorAll(".activeSpan").forEach(item => {
                                item.classList.add("left");
                                item.classList.remove("right");
                                item.classList.remove("bottom");
                            })
                            document.querySelector("#dp_bottom").checked = false;
                            document.querySelector("#dp_right").checked = false;
                            document.querySelector("#dp_left").checked = true;
                        } else if(val === "right") {
                            window.parent.document.querySelector(".dock").classList.remove("dBottom");
                            window.parent.document.querySelector(".dock").classList.remove("dLeft");
                            window.parent.document.querySelector(".dock").classList.add("dRight");
                            window.parent.document.querySelector(".dock").querySelectorAll(".activeSpan").forEach(item => {
                                item.classList.add("right");
                                item.classList.remove("bottom");
                                item.classList.remove("left");
                            })
                            document.querySelector("#dp_bottom").checked = false;
                            document.querySelector("#dp_left").checked = false;
                            document.querySelector("#dp_right").checked = true;
                        }
                        break;
                    case "buttonpos":
                        localStorage.setItem("winBtnPos", val);
                        allWindows.forEach(win => {
                            if(val === "left") {
                                win.querySelector(".controls").classList.remove("controlsR");
                                win.querySelector(".controls").classList.add("controlsL");
                                document.querySelector("[data-btnpos='Right']").checked = false;
                                document.querySelector("[data-btnpos='Left']").checked = true;
                            } else if(val === "right") {
                                win.querySelector(".controls").classList.remove("controlsL");
                                win.querySelector(".controls").classList.add("controlsR");
                                document.querySelector("[data-btnpos='Left']").checked = false;
                                document.querySelector("[data-btnpos='Right']").checked = true;
                            }
                        })
                        break;
                    case "shutdown":
                        localStorage.setItem("powd", val);
                        document.querySelector("#dp").value = val;
                        break;
                    case "safesearch":
                        if(val === "ss_0") {
                            localStorage.setItem("ss", "ss_0");
                        } else if(val === "ss_1") {
                            localStorage.setItem("ss", "ss_1");
                        } else if(val === "ss_2") {
                            localStorage.setItem("ss", "ss_2");
                        }
                        break;
                    case "dockfull":
                        let allWindowsMaxi = window.parent.document.querySelectorAll(".maxiY");
                        if(val === "yes") {
                            localStorage.setItem("dockFull", "yes");
                            window.parent.document.querySelector(".dock").classList.add("dockFull");
                            dockFull.checked = true;
                            allWindowsMaxi.forEach(win => {
                                switch(localStorage.getItem("dockPos").toLowerCase()) {
                                    case "left":
                                        win.classList.add("LDF");
                                        win.classList.remove("BDF");
                                        win.classList.remove("RDF");
                                        win.classList.remove("LD");
                                        win.classList.remove("RD");
                                        win.classList.remove("BD");
                                        window.parent.document.querySelector(".shell").classList.add("L");
                                        window.parent.document.querySelector(".shell").classList.remove("R");
                                        break;
                                    case "right":
                                        win.classList.add("RDF");
                                        win.classList.remove("LDF");
                                        win.classList.remove("BDF");
                                        win.classList.remove("LD");
                                        win.classList.remove("RD");
                                        win.classList.remove("BD");
                                        window.parent.document.querySelector(".shell").classList.add("R");
                                        window.parent.document.querySelector(".shell").classList.remove("L");
                                        break;
                                    case "bottom":
                                        win.classList.add("BDF");
                                        win.classList.remove("LDF");
                                        win.classList.remove("RDF");
                                        win.classList.remove("LD");
                                        win.classList.remove("RD");
                                        win.classList.remove("BD");
                                        window.parent.document.querySelector(".shell").classList.remove("L");
                                        window.parent.document.querySelector(".shell").classList.remove("R");
                                        window.parent.document.querySelector(".showDesk").style.borderRadius = "";
                                        break;
                                }
                            })
                        } else if(val === "no") {
                            allWindowsMaxi.forEach(win => {
                                win.classList.remove("LDF");
                                win.classList.remove("RDF");
                                win.classList.remove("BDF");
                                switch(localStorage.getItem("dockPos").toLowerCase()) {
                                    case "left":
                                        win.classList.add("LD");
                                        win.classList.remove("RD");
                                        win.classList.remove("BD");
                                        break;
                                    case "right":
                                        win.classList.add("RD");
                                        win.classList.remove("LD");
                                        win.classList.remove("BD");
                                        break;
                                    case "bottom":
                                        win.classList.add("BD");
                                        win.classList.remove("LD");
                                        win.classList.remove("RD");
                                        break;
                                }
                                window.parent.document.querySelector(".shell").classList.remove("L");
                                window.parent.document.querySelector(".shell").classList.remove("R");
                            })
                            localStorage.setItem("dockFull", "no");
                            window.parent.document.querySelector(".dock").classList.remove("dockFull");
                            dockFull.checked = false;
                        }
                        break;
                    case "shadow":
                        if(val === "yes") {
                            localStorage.setItem("shadow", "yes");
                            document.querySelector("#shadow").checked = true;
                        } else if(val === "no") {
                            localStorage.setItem("shadow", "no");
                            localStorage.setItem("winshadow", "default");
                            document.querySelector("#shadow").checked = false;
                            allWindows.forEach(win => {
                                win.style.boxShadow = "0 0 1px 1px var(--window-shadow-border), 0px 0px 13px 4px rgb(0 0 0 / 32%)";
                            })
                        }
                        break;
                    case "windowsfullscreenonopen":
                        if(val === "yes") {
                            localStorage.setItem("fullscreen", "yes");
                            document.querySelector("#fullscreen").checked = true;
                        } else if(val === "no") {
                            localStorage.setItem("fullscreen", "no");
                            document.querySelector("#fullscreen").checked = false;
                        }
                        break;
                    case "photocoverphotoapp":
                        if(val === "yes") {
                            localStorage.setItem("photoCoverApp", "yes");
                        } else if(val === "no") {
                            localStorage.setItem("photoCoverApp", "no");
                        }
                        break;
                    case "playerappautoplay":
                        if(val === "yes") {
                            localStorage.setItem("autoplay", "yes");
                        } else if(val === "no") {
                            localStorage.setItem("autoplay", "no");
                        }
                        break;
                    case "textappfont":
                        localStorage.setItem("textF", val);
                        break
                    case "textappfontsize":
                        localStorage.setItem("textS", val);
                        break
                    case "dockopaque":
                        if(val === "yes") {
                            window.parent.document.querySelector(".dock").classList.add("glassy");
                            localStorage.setItem("dockOpaque", "yes");
                        } else if(val === "no") {
                            window.parent.document.querySelector(".dock").classList.remove("glassy");
                            localStorage.setItem("dockOpaque", "no");
                        }
                        break;
                    case "accentshadow":
                        if(val === "yes") {
                            localStorage.setItem("accentShadow", "yes");
                            localStorage.setItem("winshadow", "default");
                            allWindows.forEach(win => {
                                win.style.boxShadow = "0 0 1px 1px var(--accentShadow), 0px 0px 13px 4px var(--accentShadow)";
                            })
                            themeAccentShadow.checked = true;
                            let accentShadow = getComputedStyle(window.parent.document.documentElement).getPropertyValue("--accentShadow");
                            document.querySelector("[input-color-value").style.backgroundColor = accentShadow;
                        } else if(val === "no") {
                            localStorage.setItem("accentShadow", "no");
                            if(localStorage.getItem("winshadow") === "default") {
                                if(localStorage.getItem("shadow") === "yes") {
                                    allWindows.forEach(win => {
                                        win.style.boxShadow = "0 0 1px 1px var(--window-shadow-border), 0px 0px 13px 4px rgb(0 0 0 / 32%)";
                                    })
                                }
                            } else if(localStorage.getItem("winshadow") != "default") {
                                if(localStorage.getItem("shadow") === "yes") {
                                    allWindows.forEach(win => {
                                        win.style.boxShadow = `0 0 1px 1px ${localStorage.getItem("winshadow")}, 0px 0px 13px 4px ${localStorage.getItem("winshadow")}`;
                                    })
                                }
                            }
                            themeAccentShadow.checked = false;
                        }
                        break;
                }
            }
        }
    }
})

// here is where the exportation of the settings happens
const exportSettings = document.querySelector("#exportSettings");

exportSettings.addEventListener("click", () => {
    let dockPos;
    let buttonPos;
    let powd;
    let ss;
    let dockFull;
    let theme;
    let wallpaper;
    let backF;
    let winShadow;
    let shadow;
    let fullscreen;
    let photoCoverApp;
    let autoplay;
    let textF;
    let textS;
    let radius;
    let customWinRadius;
    let buttonRound;
    let dockOpaque;
    let accentShadow;

    if(localStorage.getItem("dockPos")) {
        dockPos = `[dockPos]"${localStorage.getItem('dockPos')}"`;
    } else {
        dockPos = `[dockPos]"bottom"`;
    }
    if(localStorage.getItem("winBtnPos")) {
        buttonPos = `[buttonPos]"${localStorage.getItem('winBtnPos')}"`;
    } else {
        buttonPos = `[buttonPos]"right"`;
    }
    if(localStorage.getItem("powd")) {
        powd = `[shutdown]"${localStorage.getItem('powd')}"`;
    } else {
        powd = `[shutdown]"https://google.com"`;
    }
    if(localStorage.getItem("ss")) {
        ss = `[safeSearch]"${localStorage.getItem('ss')}"`;
    } else {
        ss = `[safeSearch]"ss_0"`;
    }
    if(localStorage.getItem("dockFull")) {
        dockFull = `[dockFull]"${localStorage.getItem('dockFull')}"`;
    } else {
        dockFull = `[dockFull]"no"`;
    }
    if(localStorage.getItem("theme")) {
        theme = `[theme]"${localStorage.getItem('theme')}"`;
    } else {
        theme = `[theme]"dark"`;
    }
    if(localStorage.getItem("background")) {
        wallpaper = `[wallpaper]"${localStorage.getItem('background')}"`;
    } else {
        wallpaper = `[wallpaper]"default"`;
    }
    if(localStorage.getItem("backF")) {
        backF = `[wallpaperFill]"${localStorage.getItem('backF')}"`;
    }
    if(localStorage.getItem("winshadow")) {
        winShadow = `[customShadow]"${localStorage.getItem('winshadow')}"`;
    } else {
        winShadow = `[customShadow]"default"`;
    }
    if(localStorage.getItem("shadow")) {
        shadow = `[shadow]"${localStorage.getItem('shadow')}"`;
    } else {
        shadow = `[shadow]"yes"`;
    }
    if(localStorage.getItem("fullscreen")) {
        fullscreen = `[windowsFullscreenOnOpen]"${localStorage.getItem('fullscreen')}"`;
    } else {
        fullscreen = `[windowsFullscreenOnOpen]"no"`;
    }
    if(localStorage.getItem("autoplay")) {
        autoplay = `[playerAppAutoplay]"${localStorage.getItem('autoplay')}"`;
    } else {
        autoplay = `[playerAppAutoplay]"no"`;
    }
    if(localStorage.getItem("photoCoverApp")) {
        photoCoverApp = `[photoCoverPhotoApp]"${localStorage.getItem('photoCoverApp')}"`;
    } else {
        photoCoverApp = `[photoCoverPhotoApp]"no"`;
    }
    if(localStorage.getItem("radius")) {
        radius = `[roundWin]"${localStorage.getItem('radius')}"`;
    } else {
        radius = `[roundWin]"yes"`;
    }
    if(localStorage.getItem("roundness")) {
        customWinRadius = `[customWinRadius]"${localStorage.getItem('roundness')}"`;
    } else {
        customWinRadius = `[customWinRadius]"12"`;
    }
    if(localStorage.getItem("btnr")) {
        buttonRound = `[roundBtns]"${localStorage.getItem('btnr')}"`;
    } else {
        buttonRound = `[roundBtns]"yes"`;
    }
    if(localStorage.getItem("textF")) {
        textF = `[textAppFont]"${localStorage.getItem('textF')}"`;
    } else {
        textF = `[textAppFont]"default"`;
    }
    if(localStorage.getItem("textS")) {
        textS = `[textAppFontSize]"${localStorage.getItem('textS')}"`;
    } else {
        textS = `[textAppFontSize]"16"`;
    }
    if(localStorage.getItem("dockOpaque")) {
        dockOpaque = `[dockOpaque]"${localStorage.getItem('dockOpaque')}"`;
    } else {
        dockOpaque = `[dockOpaque]"yes"`;
    }
    if(localStorage.getItem("accentShadow")) {
        accentShadow = `[accentShadow]"${localStorage.getItem('accentShadow')}"`;
    } else {
        accentShadow = `[accentShadow]"no"`;
    }
    let file = `${dockPos}${buttonPos}${powd}${ss}${dockFull}${theme}${wallpaper}${backF}${winShadow}${shadow}${fullscreen}${photoCoverApp}${autoplay}${textF}${textS}${radius}${customWinRadius}${buttonRound}${dockOpaque}${accentShadow}`
    let blob = new Blob([file], {type: "text/plain"});
    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "settings.tbs";
    link.click();
})