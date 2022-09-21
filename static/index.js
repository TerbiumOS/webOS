function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

let ctxm = document.getElementById("ctx");

function share() {
    navigator.clipboard.writeText("https://terbium.ga");
}

function bd() {
    let query = prompt("Image URL here");
    if(query === "default") {
        document.getElementById("background").src = "";
        document.getElementById("background").classList.add("bHidden");
        logoWall.classList.remove("hidden");
        localStorage.setItem("background", "default");
    } else if(query === "reset") {
        document.getElementById("background").src = "";
        document.getElementById("background").classList.add("bHidden");
        logoWall.classList.remove("hidden");
        localStorage.setItem("background", "default");
    } else if(query) {
        localStorage.setItem("background", `${query}`);
        document.getElementById("background").src=`${query}`;
        document.querySelector(".logoWall").classList.add("hidden");
        document.getElementById("background").classList.remove("bHidden");
    } 
    if(query == false) {
        return;
    }
}

function hidectx() {
    if(!ctxm.classList.contains("hide") || ctxm.classList.contains("show")) {
        ctxm.classList.add("hide");
        ctxm.classList.remove("show");
    }
}

window.oncontextmenu = function (e) {
    ctxm.classList.remove("hide");
    ctxm.classList.add("show");
    ctxm.style.top = e.pageY + "px";
    ctxm.style.left = e.pageX + "px";
    ctxm.querySelector(".menu").innerHTML = `
        <a class="ctxbt" id="share" onclick="share(); hidectx();">Share</a>
        <a class="ctxbt" onclick="bd(); hidectx();">Background</a>
        <a class="ctxbt" onclick='windows("../settings.html", "../resources/terbium.svg", "Terbium Settings", false, true, false, "settings"); hidectx();'>Settings</a>
    `
    e.preventDefault();
    document.addEventListener("click", hidectx);
    return false;
}

if(localStorage.getItem("winshadow") === null || localStorage.getItem("shadow") === null) {
    localStorage.setItem("winshadow", "default");
    localStorage.setItem("shadow", "yes");
}

if(localStorage.getItem("showDeskOnHover") === null) {
    localStorage.setItem("showDeskOnHover", "yes");
}

// localStorage.setItem("background", "default");

if(!localStorage.getItem("background")) {
    document.getElementById("background").classList.add("bHidden");
    document.querySelector(".logoWall").classList.remove("hidden");
} else if(localStorage.getItem("background") == "default") {
    document.querySelector(".logoWall").classList.remove("hidden");
    document.getElementById("background").classList.add("bHidden");
} else if(localStorage.getItem("background")) {
    document.getElementById("background").src=localStorage.getItem("background");
    document.getElementById("background").classList.remove("bHidden");
    document.querySelector(".logoWall").classList.add("hidden");
}

switch (localStorage.getItem("backF")) {
    case "contain":
        background.style.objectFit = "contain";
        break
    case "cover":
        background.style.objectFit = "cover";
        break
    default: "contain";
}

// check if the key that is pressed is a letter only
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z][A-Z]/i);
}

let loginDetails = document.createElement("div");
if(localStorage.getItem("pass") == "new" || localStorage.getItem("pass") == null) {
    loginDetails.className = "loginDetails";
    loginDetails.innerHTML = `
        <p class="passState">Create A Password</p>
        <div class="inputC">
            <div class="input">
                <input type="password" oninput="strengthChecker()" onfocus="let inp = document.querySelector('.inputC'); inp.classList.add('focus');" onblur="document.querySelector('.inputC').classList.remove('focus')" name="pass" id="pass" class="pass passN">
                <a class="showHide" id="showHide" onclick="toggle();">
                    <svg class="eye" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.82843 37.3553C0.266336 38.9174 0.266336 41.4501 1.82843 43.0122L15.2635 56.4472C28.9318 70.1156 51.0926 70.1156 64.7609 56.4472L78.196 43.0122C79.7581 41.4501 79.7581 38.9174 78.196 37.3553L64.7609 23.9203C51.0926 10.2519 28.9318 10.2519 15.2635 23.9203L1.82843 37.3553ZM40 54C47.732 54 54 47.732 54 40C54 32.268 47.732 26 40 26C32.268 26 26 32.268 26 40C26 47.732 32.268 54 40 54Z"/>
                    </svg>
                </a>
                <svg class="spinner noSpin" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="6"></circle></svg>
            </div>
            <div class="bott" id="secureAmount"></div>
        </div>
        <div class="strengthMessage" id="strengthMessage">Strength</div>
        <a class="skip misc">CONTINUE WITHOUT A PASSWORD</a>
    `;
    let params = {
        count: false,
        letters: false,
        numbers: false,
        special: false,
    }
    
    let secureAmount = loginDetails.querySelector('#secureAmount');
    function strengthChecker() {
        let password = document.getElementById('pass').value;
        let strengthMessage = document.getElementById('strengthMessage');
        params.letters = (/[a-z]+/.test(password)) ? true : false;
        params.numbers = (/[0-9]+/.test(password)) ? true : false;
        params.special = (/[!\"$%&/()=?@~`\\.\';:+-^_]+/.test(password)) ? true : false;
        params.count = (password.length > 8) ? true : false;
        
        let strength = Object.values(params).filter(value => value);
        secureAmount.innerHTML = "";
        for(let i in strength) {
            let span = document.createElement('span');
            span.classList.add('secureAmount');
            secureAmount.appendChild(span);
        }
        let spanRef = document.querySelectorAll('.secureAmount');
        for(let i = 0; i < spanRef.length; i++) {
            switch(spanRef.length - 1) {
                case 0:
                    spanRef[i].style.backgroundColor = '#ff5c5c';
                    strengthMessage.innerHTML = 'Strength: <mark class="weak">Weak</mark>';
                    break;
                case 1:
                    spanRef[i].style.backgroundColor = '#ffb74d';
                    strengthMessage.innerHTML = 'Strength: <mark class="mid">Medium</mark>';
                    break;
                case 2:
                    spanRef[i].style.backgroundColor = '#ffeb3b';
                    strengthMessage.innerHTML = 'Strength: <mark class="strong">Strong</mark>';
                    break;
                case 3:
                    spanRef[i].style.backgroundColor = '#87f78b';
                    strengthMessage.innerHTML = 'Strength: <mark class="secure">Secure</mark>';
                    break;
            }
        }
    }
    
    function toggle() {
        let password = document.getElementById('pass');
        let eye = document.getElementById('showHide');
        if(password.type === 'password'){
            password.type = 'text';
            eye.querySelector('.eye').querySelector("path").classList.add('showing');
        } else {
            password.type = 'password';
            eye.querySelector('.eye').querySelector("path").classList.remove('showing');
        }
    }
    loginDetails.querySelector(".skip").addEventListener("click", function() {
        let ask = "Are you sure you want to continue without a password?";
        if(confirm(ask) === true) {
            localStorage.setItem("pass", "none");
            loginDetails.remove();
        } else {
            return;
        }
    })
    document.body.appendChild(loginDetails);
} else if(localStorage.getItem("pass") != "none" && localStorage.getItem("pass") != "new") {
    loginDetails.className = "loginDetails";
    loginDetails.innerHTML = `
        <p class="passState">Enter Your Password</p>
        <div class="inputC">
            <svg class="spinner noSpin" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="6"></circle></svg>
            <div class="input">
                <input type="password" onfocus="let inp = document.querySelector('.inputC'); inp.classList.add('focus');" onblur="document.querySelector('.inputC').classList.remove('focus')" name="pass" id="pass" class="pass passE">
                <a class="showHide" id="showHide" onclick="toggle();">
                    <svg class="eye" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.82843 37.3553C0.266336 38.9174 0.266336 41.4501 1.82843 43.0122L15.2635 56.4472C28.9318 70.1156 51.0926 70.1156 64.7609 56.4472L78.196 43.0122C79.7581 41.4501 79.7581 38.9174 78.196 37.3553L64.7609 23.9203C51.0926 10.2519 28.9318 10.2519 15.2635 23.9203L1.82843 37.3553ZM40 54C47.732 54 54 47.732 54 40C54 32.268 47.732 26 40 26C32.268 26 26 32.268 26 40C26 47.732 32.268 54 40 54Z"/>
                    </svg>
                </a>
            </div>
            <div class="bott" id="secureAmount"></div>
        </div>
        <a class="forgot">Forgot Password?</a>
    `;
    function toggle() {
        let password = document.getElementById('pass');
        let eye = document.getElementById('showHide');
        if(password.type === 'password'){
            password.type = 'text';
            eye.querySelector('.eye').querySelector("path").classList.add('showing');
        } else {
            password.type = 'password';
            eye.querySelector('.eye').querySelector("path").classList.remove('showing');
        }
    }
    document.body.appendChild(loginDetails);
    loginDetails.querySelector(".passE").focus();
    document.querySelector('.forgot').addEventListener('click', function() {
        let ask = "Are you sure you want to reset your password?";
        if(confirm(ask) === true) {
            let setNew = prompt("Enter new password");
            if(setNew === null) {
                return
            } else if(setNew === "") {
                localStorage.setItem("pass", "none");
                loginDetails.remove();
            } else {
                localStorage.setItem("pass", xor.encode(setNew));
                alert("next time your password is: " + setNew);
                loginDetails.remove();
            }
        } else {
            return;
        }
    })
}

let state;
let pass = document.querySelector('.passN');
let passE = document.querySelector('.passE');
if(localStorage.getItem("pass") == null) {
    pass.addEventListener('keyup', function(e) {
        state = "create";
        let input = pass.value;
        let password = xor.encode(input);
        if(e.keyCode == 13) {
            submit(password, state);
        }
    });
} else if(localStorage.getItem("pass") != "none") {
    passE.addEventListener('keyup', function(e) {
        state = "login";
        let input = passE.value;
        let password = xor.encode(input);
        if(e.keyCode == 13) {
            submit(password, state);
        }
    });
} else if(localStorage.getItem("pass") == "none") {
    let notifScr = document.createElement("script");
    notifScr.src = `./js/not.js`;
    document.body.appendChild(notifScr);
}
submit = function(password, firstTime) {
    let spinner = document.querySelector(".spinner");
    let cpswd = localStorage.getItem("pass");
    let passd = password;
    if(firstTime === "create") {
        pass.value = "";
        pass.setAttribute("placeholder", "")
        pass.blur()
        localStorage.setItem("pass", passd);
        spinner.classList.remove("spin");
        spinner.classList.add("noSpin");
        setTimeout(() => {
            loginDetails.remove();
        }, 1200)
    } else if(firstTime === "login") {
        if(passd === cpswd) {
            passE.value = "";
            passE.blur();
            document.querySelector(".inputC").style.boxShadow = "none";
            document.querySelector(".input").style.opacity = "0";
            document.querySelector(".passState").style.opacity = "0";
            document.querySelector(".passE").style.opacity = "0";
            document.querySelector(".bott").style.opacity = "0";
            spinner.classList.add("spin");
            spinner.classList.remove("noSpin");
            setTimeout(() => {
                document.querySelector(".inputC").style.boxShadow = "0 4px 7px 3px #0000004a";
                document.querySelector(".input").style.opacity = "1";
                document.querySelector(".passE").style.opacity = "1";
                document.querySelector(".bott").style.opacity = "1";
                document.querySelector(".showHide").remove();
                spinner.classList.remove("spin");
                spinner.classList.add("noSpin");
                passE.setAttribute("placeholder", "Sucessfully Logged In");
                document.querySelector(".inputC").classList.add("success");
                passE.classList.add("success");
                setTimeout(() => {
                    loginDetails.remove();
                    let notifScr = document.createElement("script");
                    notifScr.src = `./js/not.js`;
                    document.body.appendChild(notifScr);
                }, 700)
            }, 1200);
        } else if(passd !== cpswd) {
            passE.value = "";
            passE.blur();
            document.querySelector(".inputC").style.boxShadow = "none";
            document.querySelector(".input").style.opacity = "0";
            document.querySelector(".passState").style.opacity = "0";
            document.querySelector(".passE").style.opacity = "0";
            document.querySelector(".bott").style.opacity = "0";
            spinner.classList.add("spin");
            spinner.classList.remove("noSpin");
            setTimeout(() => {
                document.querySelector(".input").classList.add("err");
                document.querySelector(".inputC").style.boxShadow = "0 4px 7px 3px #0000004a";
                document.querySelector(".input").style.opacity = "1";
                document.querySelector(".passState").style.opacity = "1";
                document.querySelector(".passState").innerText = "Reenter Your Password";
                document.querySelector(".passE").style.opacity = "1";
                document.querySelector(".bott").style.opacity = "1";
                passE.focus();
                spinner.classList.remove("spin");
                spinner.classList.add("noSpin");
                document.querySelector(".inputC").classList.add("err")
                passE.value = "";
                passE.setAttribute("placeholder", "Incorrect Password");
            }, 1200);
        }
    }
}

const appsOpen = document.getElementById("appsOpen");
const appsClose = document.getElementById("appsClose");
const main = document.querySelector("#main");
const appsCloseTBP = document.querySelector("#appsClose");
const shell = document.querySelector("#shell");

const apps = document.querySelectorAll(".deskapp");
// add an event listener to all apps buttons
for(let i = 0; i < apps.length; i++) {
    apps[i].addEventListener("click", function() {
        main.classList.toggle("open");
        main.classList.toggle("closedA");
        document.querySelector(".appsDesk").classList.toggle("openA");
        document.querySelector(".showDesk").classList.remove("noBorderRadius");
        document.querySelector("#appSearch").value = "";
        for(let i = 0; i < apps.length; i++) {
            apps[i].classList.remove("appShow")
            apps[i].classList.remove("appHide")
        }
    });
}

appsOpen.onclick = () => {
    document.querySelector(".appsDesk").classList.toggle("openA");
    main.classList.toggle("open");
    main.classList.toggle("closedA");
    document.querySelector(".showDesk").classList.add("noBorderRadius");
    shell.classList.add("noShadow");
    document.querySelector("#appSearch").value = "";
    for(let i = 0; i < apps.length; i++) {
        apps[i].classList.remove("appShow")
        apps[i].classList.remove("appHide")
    }
}

appsClose.onclick = () => {
    document.querySelector(".appsDesk").classList.toggle("openA");
    main.classList.toggle("open");
    main.classList.toggle("closedA");
    document.querySelector(".showDesk").classList.remove("noBorderRadius");
    shell.classList.remove("noShadow");
    document.querySelector("#appSearch").value = "";
    for(let i = 0; i < apps.length; i++) {
        apps[i].classList.remove("appShow")
        apps[i].classList.remove("appHide")
    }
}

if(localStorage.getItem("dockPos") == null) {
    localStorage.setItem("dockPos", "Bottom");
    dock.classList.remove("dockH");
    dock.classList.add("dock");
    dock.classList.add("dBottom");
    dock.classList.remove("dLeft");
    dock.classList.remove("dRight");
    appsClose.classList.add("bottom");
    appsClose.classList.remove("left");
    appsClose.classList.remove("right");
}

if(localStorage.getItem("powd") == null) {
    localStorage.setItem("powd", "https://www.google.com");
}

switch(localStorage.getItem("dockPos").toLowerCase()) {
    case "left":
        dock.classList.remove("dockH");
        dock.classList.add("dock");
        dock.classList.add("dLeft");
        dock.classList.remove("dRight");
        dock.classList.remove("dBottom");
        appsClose.classList.add("left");
        appsClose.classList.remove("bottom");
        appsClose.classList.remove("right");
        break;
    case "right":
        dock.classList.remove("dockH")
        dock.classList.add("dock");
        dock.classList.add("dRight");
        dock.classList.remove("dLeft");
        dock.classList.remove("dBottom");
        appsClose.classList.add("right");
        appsClose.classList.remove("bottom");
        appsClose.classList.remove("left");
        break;
    case "bottom":
        dock.classList.remove("dockH");
        dock.classList.add("dock");
        dock.classList.add("dBottom");
        dock.classList.remove("dLeft");
        dock.classList.remove("dRight");
        appsClose.classList.add("bottom");
        appsClose.classList.remove("left");
        appsClose.classList.remove("right");
        break;
    default:
        dock.classList.remove("dockH");
        dock.classList.add("dock");
        dock.classList.add("dBottom");
        dock.classList.remove("dLeft");
        dock.classList.remove("dRight");
        appsClose.classList.add("bottom");
        appsClose.classList.remove("left");
        appsClose.classList.remove("right");
        break;
}

const AppSearch = document.querySelector("#appSearch");
AppSearch.addEventListener("input", function() {
    let apps = document.querySelectorAll(".deskapp");
    let val = AppSearch.value.toLowerCase();
    for(let i = 0; i < apps.length; i++) {
        let app = apps[i].getAttribute("data-appName").toLowerCase();
        if(app.includes(val)) {
            apps[i].classList.add("appShow")
            apps[i].classList.remove("appHide")
        } else {
            apps[i].classList.add("appHide")
            apps[i].classList.remove("appShow")
        }
    }
});

document.querySelector(".logout").onclick = () => {
    location.reload();
}

if(localStorage.getItem("pass") === null || localStorage.getItem("pass") === "none") {
    document.querySelector(".logout").remove();
}