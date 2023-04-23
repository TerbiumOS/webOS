const clockele = document.getElementById("time");
const ft = document.getElementById("ft");
const ftd = document.getElementById("ftd");
const ftt = document.getElementById("ftt");
const win = document.getElementById("drag");
const appsL = document.getElementById("appsL");
const showDesk = document.getElementById("showDesk");

showDesk.addEventListener("click", (e) => {
    const windowsTC = document.querySelectorAll(".win");
    for (let i = 0; i < windowsTC.length; i++) {
        const element = windowsTC[i];
        if(element.querySelector(".mini")) {
            element.querySelector(".mini").click();
        }
    }
});

// clock
setInterval(function () {
    var dt = new Date();
    var h = dt.getHours().toLocaleString();
    var m = dt.getMinutes();    
    
    var ap;
    if(h < 12) {
        ap = "AM";
    } else {
        ap = "PM";
    }
    h = ("0" + h).slice(-2);
    if(h > 13) {
        h = (h - 12);
    } else if(h == 0) {
        h = 12;
    }
    h = (h > 12) ? h - 12 : h;
    m = ("0" + m).slice(-2);
    clockele.innerHTML = h + ":" + m + " " + ap;
}, 1000);

setInterval(function() {
    var dt = new Date();
    var h = dt.getHours().toLocaleString();
    var m = dt.getMinutes();  
    var s = dt.getSeconds();
    var ap = (h < 12) ? "AM" : "PM";

    h = (h > 12) ? h - 12 : h;
    h = ("0" + h).slice(-2);
    m = ("0" + m).slice(-2);

    s = ("0" + s).slice(-2);

    document.getElementById("ftt").innerHTML = h + ":" + m + ":" + s + " " + ap;
}, 1000);

let closeC = document.createElement('div');
closeC.classList.add("x-clock");
closeC.classList.add("nope");
closeC.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' id='close-clock'><line x1='18' y1='6' x2='6' y2='18' /><line x1='6' y1='6' x2='18' y2='18' /></svg>";
clockele.addEventListener("click", () => {
    if(ft.classList.contains("hidden")) {
        var dt = new Date();
        ft.classList.remove("hidden");
        ft.appendChild(closeC);
        ftd.innerHTML = dt.toDateString();
    }
    document.getElementById("background").addEventListener("click", () => {
        ft.classList.add("hidden");
    });
    document.getElementById("close-clock").addEventListener("click", () => {
        var closeCC = !!document.getElementById("close-clock");
        ft.classList.add("hidden");
        if(closeCC === false) {
            ft.removeChild(closeC)
        } else {
            return
        }
    });
    window.addEventListener("mousedown", (e) => {
        if (e.button == 0 && !e.target.closest(".fulltime") && ft.classList.contains("hidden") == false) {1
            var closeCC = !!document.getElementById("close-clock");
            ft.classList.add("hidden");
            if(closeCC === false) {
                ft.removeChild(closeC)
            } else {
                return
            }
        }
    });
});

// start menu
appsL.addEventListener("click", () => {
    if(document.querySelector(".apps").classList.contains("hidden")) {
        document.querySelector(".apps").classList.remove("hidden");
    }
    window.addEventListener("mousedown", (e) => {
        if (e.button == 0 && !e.target.closest(".apps") && document.querySelector(".apps").classList.contains("hidden") == false && !e.target.closest("#appsL")) {
            document.querySelector(".apps").classList.add("hidden");
        }
    });
});

// let brightTRACK = document.getElementById("brightTRACK");
// let brightVal = document.getElementById("brightVal");
// let bright = document.getElementById("bright");

// brightTRACK.oninput = function() {
//     switch(this.value) {
//         case "3":
//             bright.style.opacity = "100%";
//             brightVal.innerText = "100%";
//             break
//         case "2":
//             bright.style.opacity = "50%";
//             brightVal.innerText = "50%";
//             break
//         case "1":
//             bright.style.opacity = "10%";
//             brightVal.innerText = "10%";
//             break
//     }
// }

document.getElementById("power").addEventListener("click", () => {
    let pow = localStorage.getItem("powd");
    if(!pow) {
        window.open("https://google.com", "_self");
    } else {
        window.open(pow, "_self");
    }
})