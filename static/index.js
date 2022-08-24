window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix
});

function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

let dock = document.getElementById("dock");
let style = document.getElementById("rels");
let favi = document.getElementById("favi");
let terbi = document.getElementById("terb");
let setc = document.getElementById("setc");
let ytmc = document.getElementById("ytm");
let amc = document.getElementById("am");
let spc = document.getElementById("sp");
let tdc = document.getElementById("td");
// let addApp = document.getElementById("addApp");

// submitapp.addEventListener("click", () => {
//     let prompt = document.createElement("div");
//     prompt.id = "AddAppPrompt";
//     prompt.classList.add("addAppPrompt");
//     prompt.innerHTML = `<div class="promptTitle">Submit custom app</div><div class="promptContent"><div class="contentC"><h3 class="info">Website</h3><input type="text" class="promptInput url"></div><div class="contentC"><h3 class="info">Icon</h3><input type="text" class="promptInput iconi"></div><div class="contentC"><h3 class="info">App title</h3><input type="text" class="promptInput name"></div><div class="formState"><a class="save formButton">save</a><a class="cancel formButton">cancel</a></div></div>`
//     let cancel = prompt.querySelector(".cancel");
//     let save = prompt.querySelector(".save");
//     save.addEventListener("click", () => {
//         let urlValue;
//         let iconValue;
//         let nameValue;
//         let url = prompt.querySelector(".url");
//         let icon = prompt.querySelector(".iconi");
//         let name = prompt.querySelector(".name");
//         urlValue = url.value.toLowerCase();
//         iconValue = icon.value.toLowerCase();
//         nameValue = name.value.toLowerCase();
//     });

//     cancel.addEventListener("click", () => {
//         let confirmy = confirm("are you sure you wan to cancel")
//         if(confirmy) {
//             cancel.parentNode.parentNode.parentNode.remove()
//         } else {
//             return
//         }
//     });

//     var promptState = !!document.getElementById("AddAppPrompt");
//     if(promptState === false) {
//         document.body.appendChild(prompt)
//     } else {
//         return
//     }
// })

function share() {
    navigator.clipboard.writeText("https://terbium.ga");
}

function bd() {
    let query = prompt("Image URL here");
    if(query === "default") {
        localStorage.setItem("background", `default`);
        document.getElementById("background").src=`./resources/default.png`;
    } else if(query === "reset") {
        localStorage.setItem("background", `default`);
        document.getElementById("background").src=`./resources/default.png`;
    } else if(query) {
        localStorage.setItem("background", `${query}`);
        document.getElementById("background").src=`${query}`;
    } 
    if(query == false) {
        return;
    }
}

// localStorage.setItem("background", "default");

if(!localStorage.getItem("background")) {
    document.getElementById("background").src="./resources/default.png";
} else if(localStorage.getItem("background") == "default") {
    document.getElementById("background").src="./resources/default.png";
} else if(localStorage.getItem("background")) {
    document.getElementById("background").src=localStorage.getItem("background");
}

switch (localStorage.getItem("musicApp")) {
    case "ytm":
        if(ytmc.classList.contains("dockbtnH")) {
            ytmc.classList.remove("dockbtnH");
            if(!spc.classList.contains("dockbtnH")) {
                spc.classList.add("dockbtnH");
            } else if(!amc.classList.contains("dockbtnH")) {
                amc.classList.add("dockbtnH");
            } else if(!tdc.classList.contains("dockbtnH")) {
                tdc.classList.add("dockbtnH");
            }
        }
        break
    case "am":
        if(amc.classList.contains("dockbtnH")) {
            amc.classList.remove("dockbtnH");
            if(!spc.classList.contains("dockbtnH")) {
                spc.classList.add("dockbtnH");
            } else if(!ytmc.classList.contains("dockbtnH")) {
                ytmc.classList.add("dockbtnH")   
            } else if(!tdc.classList.contains("dockbtnH")) {
                tdc.classList.add("dockbtnH");
            }
        }
        break
    case "sp":
        if(spc.classList.contains("dockbtnH")) {
            spc.classList.remove("dockbtnH");
            if(!ytmc.classList.contains("dockbtnH")) {
                ytmc.classList.add("dockbtnH");
            } else if(!amc.classList.contains("dockbtnH")) {
                amc.classList.add("dockbtnH")   
            } else if(!tdc.classList.contains("dockbtnH")) {
                tdc.classList.add("dockbtnH");
            }
        }
        break
    case "td":
        if(tdc.classList.contains("dockbtnH")) {
            tdc.classList.remove("dockbtnH");
            if(!spc.classList.contains("dockbtnH")) {
                spc.classList.add("dockbtnH");
            } else if(!ytmc.classList.contains("dockbtnH")) {
                ytmc.classList.add("dockbtnH")   
            } else if(!amc.classList.contains("dockbtnH")) {
                amc.classList.add("dockbtnH");
            }
        }
        break
    default: "ytm";
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
        <a class="skip">CONTINUE WITHOUT A PASSWORD</a>
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