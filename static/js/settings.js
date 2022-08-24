const dark = document.getElementById("dark");
const night = document.getElementById("night");
const frac = document.getElementById("frac");

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

dark.addEventListener("click", () => {
    let html = document.documentElement.getAttribute("data-theme");
    if(html !== "dark") {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeMAIN.setAttribute("data-theme", "dark");
    }
    if(html === "dark") {
        alert("Dark theme is already enabled");
        return
    }
});

night.addEventListener("click", () => {
    let html = document.documentElement.getAttribute("data-theme");
    if(html !== "night") {
        document.documentElement.setAttribute('data-theme', 'night');
        localStorage.setItem('theme', 'night');
        themeMAIN.setAttribute("data-theme", "night");
    }
    if(html === "night") {
        alert("Night theme is already enabled");
        return
    }
});

frac.addEventListener("click", () => {
    let html = document.documentElement.getAttribute("data-theme");
    if(html !== "fracital") {
        document.documentElement.setAttribute('data-theme', 'fracital');
        localStorage.setItem('theme', 'fracital');
        themeMAIN.setAttribute("data-theme", "fracital");
    }
    if(html === "fracital") {
        alert("Fracital theme is already enabled");
        return
    }
});

defaultb.addEventListener("click", () => {
    background.src = "./resources/default.png";
    localStorage.setItem("background", "default");
});

dd.addEventListener("keydown", (e) => {
    if(e.keyCode == "13"){
        if(dd.value == "default") {
            background.src = "./resources/default.png";
            localStorage.setItem("background", "default");
        } else if(dd.value == "" || !dd.value.includes("https://")) {
            return
        } else {
            background.src = dd.value;
            localStorage.setItem("background", dd.value)
        }
    }
});

if(localStorage.getItem("background")) {
    dd.value = localStorage.getItem("background");
} else if(!localStorage.getItem("background")) {
    dd.value = ""
}

function contain() {
    background.style.objectFit = "contain"
    localStorage.setItem("backF", "contain");
}

function stretch() {
    background.style.objectFit = "cover";
    localStorage.setItem("backF", "cover");
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

const radius = document.getElementById("radius");
const shadow = document.getElementById("shadow");
const btnr = document.getElementById("btnr");
const roundness = document.getElementById("roundness");
const clearRoundness = document.getElementById("clearRoundness");
const fullscreen = document.getElementById("fullscreen");
const customShadow = document.getElementById("customShadow");
const clearCustomShadow = document.getElementById("clearCustomShadow");
const login = document.getElementById("login");

const win = window.parent.document.querySelectorAll(".win");
const btns = window.parent.document.querySelectorAll(".winc");

// enable or disable login
if(localStorage.getItem("pass") === "none") {
    login.checked = false;
} else if(localStorage.getItem("pass") != "none") {
    login.checked = true;
}

login.addEventListener("click", () => {
    switch(login.checked) {
        case true:
            let setNew = prompt("Enter new password");
            if(setNew === null) {
                login.checked = false;
                return
            } else if(setNew === "") {
                login.checked = false;
                return
            } else {
                localStorage.setItem("pass", xor.encode(setNew));
                alert("next time your password is: " + setNew);
            }
        case false:
            localStorage.setItem("pass", "none");
            break;
        default:
            break;
    }
})

// enabling and disabling of always maximized apps

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

//adding the roundness to the windows on the number change

if(localStorage.getItem("roundness") === null) {
} else {
    roundness.value = localStorage.getItem("roundness");
    for (let i = 0; i < win.length; i++) {
        const element = win[i];
        element.classList.remove("radius");
        element.classList.add("custom");
        element.style.borderRadius = `${roundness.value}px`
    }
}
if (localStorage.getItem("roundnessAmount") === null) {
    localStorage.setItem("roundnessCustomState", "yes");
}
let roundnessCustomState = localStorage.getItem("roundnessCustomState");
roundness.addEventListener("change", e => {
    localStorage.setItem("roundnessCustomState", "yes");
    console.log(roundness.value);
    for (let i = 0; i < win.length; i++) {
        const element = win[i];
        element.classList.remove("radius");
        element.classList.add("custom");
        element.style.borderRadius = `${roundness.value}px`;
    }
    localStorage.setItem("roundness", roundness.value);
});

clearRoundness.addEventListener("click", e => {
    roundnessState = false;
    roundnessAmount = 12;
    for (let i = 0; i < win.length; i++) {
        const element = win[i];
        element.classList.remove("custom");
        element.classList.add("radius");
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
    }
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

if(localStorage.getItem("winshadow") === null) {
    localStorage.setItem("winshadow", "#000000")
}

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
}

customShadow.addEventListener("input", () => {
    let hex = customShadow.value;
    var red = parseInt(hex[1]+hex[2],16);
    var green = parseInt(hex[3]+hex[4],16);
    var blue = parseInt(hex[5]+hex[6],16);
    let rgb = `rgb(${red}, ${green}, ${blue}, 0.32)`;
    
    if(shadow.checked === false) {
        shadow.checked = true;
        localStorage.setItem("shadow", "yes");
    }
    customShadow.setAttribute("value", rgb);
    for (let i = 0; i < win.length; i++) {
        const element = win[i];
        element.style.boxShadow = `0 0 13px 3px ${rgb}`;
    }
    localStorage.setItem("winshadow", `${rgb}`);
});

clearCustomShadow.addEventListener("click", () => {
    for (let i = 0; i < win.length; i++) {
        const element = win[i];
        element.style.boxShadow = `0 0 13px 3px rgba(0, 0, 0, 0.32)`;
    }
    localStorage.setItem("winshadow", "#000000")
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
    switch(shadow.checked) {
        case true:
            localStorage.setItem("shadow", "yes");
            for (let i = 0; i < win.length; i++) {
                const element = win[i];
                element.style.boxShadow = `${localStorage.getItem("winshadow")}`;
                element.classList.remove("noShadow");
            }
            break;
        case false:
            localStorage.setItem("shadow", "no");
            for (let i = 0; i < win.length; i++) {
                const element = win[i];
                element.classList.add("noShadow");
                element.classList.add("shadow");
            }
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
    switch(radius.checked) {
        case true:
            localStorage.setItem("radius", "yes");
            for (let i = 0; i < win.length; i++) {
                const element = win[i];
                element.classList.add("radius");
                element.classList.remove("noRad");
                if(element.classList.contains("custom")) {
                    element.classList.remove("custom");
                }
            }
            if(localStorage.getItem("roundness") != null) {
                for (let i = 0; i < win.length; i++) {
                    const element = win[i];
                    element.classList.add("noRad");
                    element.classList.remove("radius");
                    if(localStorage.getItem("roundnessCustomState") === "yes") {
                        element.style.borderRadius = localStorage.getItem("roundness");
                        element.classList.add("custom");
                    }
                }
            }
            break;
        case false:
            localStorage.setItem("radius", "no");
            for (let i = 0; i < win.length; i++) {
                const element = win[i];
                element.classList.remove("radius");
            }
            if(localStorage.getItem("roundness") != null) {
                for (let i = 0; i < win.length; i++) {
                    const element = win[i];
                    element.classList.add("noRad");
                    if(localStorage.getItem("roundnessCustomState") === "yes") {
                        element.style.borderRadius = 0;
                        element.classList.remove("custom");
                    }
                }
            }
            break;
        default:
            break;
    }
});


// browser customization
const dropText = document.querySelector(".dropText");
switch(localStorage.getItem("ss")) {
    case "ss_0":
        dropText.innerHTML = "None";
        break;
    case "ss_1":
        dropText.innerHTML = "Moderate";
        break;
    case "ss_2":
        dropText.innerHTML = "Strict";
        break;
    default:
        localStorage.setItem("ss", "ss_0");
        dropText.innerHTML = "None"
        break;
}
const dropBtns = document.querySelectorAll(".dropbtn");
for (let i = 0; i < dropBtns.length; i++) {
    const element = dropBtns[i];
    let parent = element.parentElement;
    let dropContent = parent.querySelector(".drop-content");
    element.addEventListener("click", () => {
        if(!dropContent.classList.contains("show")) {
            dropContent.classList.add("show");
            element.classList.add("dropMorph");
            element.classList.remove("dropBtn");
        } else {
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
            }
            element.classList.remove("dropMorph");
            element.classList.add("dropBtn");
            element.querySelector(".dropText").innerHTML = dropOptions[ie].getAttribute("data-option_name");
            localStorage.setItem("ss", dropOptions[ie].getAttribute("data-option"))
        });
        
    }
}