// Copyright 2022 snoot & almondLAN
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and

// get the data-theme attribute from the html tag
const theme = document.documentElement.getAttribute("data-theme");
let colorOne;
let colorTwo;
if(theme == "dark") {
    colorOne = "#31bd4e";
    colorTwo = "#1e6226";
} else if (theme == "fracital") {
    colorOne = "#FF40F7";
    colorTwo = "#482447";
} else if(theme == "night") {
    colorOne = "#fff7a5";
    colorTwo = "#8a844b";
} else if(theme == "almond") {
    colorOne = "#d8882c";
    colorTwo = "#995f1f";
}

let mc = document.getElementById("mc");
let vc = document.querySelector(".vc");
let mcDataAutoPlay = !!vc.getAttribute("data-auto");
document.addEventListener("load", () => {
    if(mcDataAutoPlay === false) return
    else {
        if(vc.getAttribute("data-auto") === "yes") {
            mc.setAttribute("autoplay", true);
        }
    }
})

const ppb = document.querySelector(".pbt");
const mpb = document.querySelector(".mpb");
const fs = document.querySelector(".fs");
let vcc = document.querySelector(".vcc");
let mt = document.querySelector(".mt");
let vols = document.querySelector(".vols");
let ct = document.querySelector(".ct");
let tT = document.querySelector(".tt");
let ps = document.querySelector(".ps");
let previ = document.querySelector(".previ");
let thumbnail = document.querySelector(".thumbnail");
let tlc = document.querySelector(".tlc");
let setti = document.querySelector(".setti");


tlc.addEventListener("mousemove", htu);
tlc.addEventListener("mousedown", toggleTheScrubbing);
document.addEventListener("mouseup", e => {
    if(isScrubbing) {
        toggleTheScrubbing(e)
    }
});
document.addEventListener("mousemove", e => {
    if(isScrubbing) {
        htu(e)
    }
});
ps.addEventListener("click", cps)
mpb.addEventListener("click", pip);
fs.addEventListener("click", fsa);

//timeline
let isScrubbing = false;
let wasPaused; 
function toggleTheScrubbing(e) {
    const rect = tlc.getBoundingClientRect();
    const perc = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    isScrubbing = (e.buttons & 1) === 1;
    vc.classList.toggle("scrubbing", isScrubbing);
    if(isScrubbing) {
        wasPaused = mc.paused;
        mc.pause();
    } else {
        mc.currentTime = perc * mc.duration
        if(!wasPaused) mc.play()
    }
    htu(e);
}

function htu(e) {
    const rect = tlc.getBoundingClientRect();
    const perc = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    const pin = Math.max(1, Math.floor((perc * mc.duration) / 10))
    tlc.style.setProperty("--prev-pos", perc);
    if(isScrubbing) {
        e.preventDefault();
        tlc.style.setProperty("--prog-pos", perc);
    }
}

// play / pause
function tp() {
    mc.paused ? mc.play() : mc.pause();
}

mc.addEventListener("click", tp);

mc.addEventListener("play", () => {
    vc.classList.remove("paused");
});

mc.addEventListener("pause", () => {
    vc.classList.add("paused");
});

ppb.addEventListener("click", tp);

// mute
mt.addEventListener("click", mute);

function mute() {
    mc.muted = !mc.muted
}

mc.addEventListener("loadeddata", () => {
    tT.textContent = formatDuration(mc.duration);
});

mc.addEventListener("timeupdate", () => {
    ct.textContent = formatDuration(mc.currentTime);
    const perc = mc.currentTime / mc.duration;
    tlc.style.setProperty("--prog-pos", perc);
})

const LZF = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
});

function formatDuration(time) {
    const s = Math.floor(time % 60)
    const m = Math.floor(time / 60) % 60
    const h = Math.floor(time / 3600)
    if (h === 0) {
        return `${m}:${LZF.format(s)}`
    } else {
        return `${h}:${LZF.format(
            m
        )}:${LZF.format(s)}`
    }
}

// volume icon changer
mc.addEventListener("volumechange", () => {
    vols.value = mc.volume
    let vl;
    if(mc.muted || mc.volume === 0) {
        vols.value = 0;
        vl = "muted"
    } else if(mc.volume >= .5) {
        vl = "high";
    } else {
        vl = "low"
    }
    vc.dataset.volumeLevel = vl;
    mc.volume
    mc.muted
});

// Show times
mc.addEventListener("loadeddata", () => {
    tT.textContent = formatDuration(mc.duration)
});

function skip(duration) {
    mc.currentTime += duration;
}

let ua = navigator.userAgent.toLowerCase();
if (ua.includes("firefox")) {
    mpb.remove();
}

//Picture in picture
function pip() {
    if (ua.includes("firefox")) {
        return
    }
    if(vc.classList.contains("pip")) {
        document.exitPictureInPicture();
    } else {
        mc.requestPictureInPicture()
    }
}

mc.addEventListener("enterpictureinpicture", () => {
    vc.classList.add("pip");
});

mc.addEventListener("leavepictureinpicture", () => {
    vc.classList.remove("pip");
});

if(localStorage.getItem("tha") === "true") {
    vc.classList.toggle("tha");
}

// fullscreen
function fsa() {
    if(document.fullscreenElement == null) {
        vc.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    vc.classList.toggle("fully", document.fullscreenElement);
});

let psu = document.createElement('ul'),
li2 = document.createElement('li'),
playbackSpeed = document.createElement('p'),
lpb = document.createElement("li"),
lp1 = document.createElement("li"),
lp2 = document.createElement("li"),
lp3 = document.createElement("li"),
lp4 = document.createElement("li"),
lp5 = document.createElement("li"),
lp6 = document.createElement("li"),
lp7 = document.createElement("li"),
lp8 = document.createElement("li"),
p1 = document.createElement("p"),
p2 = document.createElement("p"),
p3 = document.createElement("p"),
p4 = document.createElement("p"),
p5 = document.createElement("p"),
p6 = document.createElement("p"),
p7 = document.createElement("p"),
p8 = document.createElement("p"),
p8inp = document.createElement("input"),
repeatLi = document.createElement('li'),
repeat = document.createElement('p');
lpb.classList.add("lpb");
lpb.innerHTML = "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='15 18 9 12 15 6'></polyline></svg>"
p1.innerText = "0.75";
p2.innerText = "0.5";
p3.innerText = "0.25";
p4.innerText = "Normal";
p5.innerText = "1.25";
p6.innerText = "1.5";
p7.innerText = "1.75";
p8.innerText = "7";
p8.innerText = "Custom";
playbackSpeed.innerText = 'Playback speed'
psu.classList.add("psu");

nodes = [
    lp1,
    lp2,
    lp3,
    lp4,
    lp5,
    lp6,
    lp7,
    lp8,
    lpb,
];

nodesMini = [
    lp1,
    lp2,
    lp3,
    lp4,
    lp5,
    lp6,
    lp7,
    lp8,
]

function cps() {
    if(!setti.classList.contains("open")) {
        setti.appendChild(psu);
        setti.classList.add("open");
        psu.appendChild(li2);
        li2.appendChild(playbackSpeed);
        psu.appendChild(repeatLi);
        repeatLi.appendChild(repeat);
        if(mc.classList.contains("repeatOff")) {
            repeat.innerText = "Repeat is off";
        } else if(mc.classList.contains("repeatOn")) {
            repeat.innerText = "Repeat is on";
        }
        repeatLi.addEventListener("click", () => {
            if(mc.classList.contains("repeatOff")) {
                mc.classList.remove("repeatOff");
                mc.classList.add("repeatOn");
                repeat.innerText = "Repeat is on";
                mc.loop = true;
                if(psu.parentNode != null) {
                    psu.parentNode.removeChild(psu);
                }
            } else if(mc.classList.contains("repeatOn")) {
                mc.classList.remove("repeatOn");
                mc.classList.add("repeatOff");
                repeat.innerText = "Repeat is off";
                mc.loop = false;
                if(psu.parentNode != null) {
                    psu.parentNode.removeChild(psu);
                }
            }
        });
        playbackSpeed.addEventListener("click", () => {
            setti.classList.add("playback");
            if(li2.parentNode != null) {
                li2.parentNode.removeChild(li2);
            }
            if(repeatLi.parentNode != null) {
                repeatLi.parentNode.removeChild(repeatLi);
            }
            psu.appendChild(lpb);
            psu.appendChild(lp1);
            psu.appendChild(lp2);
            psu.appendChild(lp3);
            psu.appendChild(lp4);
            psu.appendChild(lp5);
            psu.appendChild(lp6);
            psu.appendChild(lp7);
            psu.appendChild(lp8);
            lp1.appendChild(p1);
            for (let i = 0; i < nodesMini.length; i++) {
                nodesMini[i].onclick = () => {
                    let playbackSpeedVal = nodesMini[i].textContent;
                    if(playbackSpeedVal === "Normal") {
                        mc.playbackRate = "1";
                    } else {
                        mc.playbackRate = playbackSpeedVal;
                    }
                    setti.classList.remove("open");
                    if(psu.parentNode != null) {
                        psu.parentNode.removeChild(psu);
                    }
                }
            }
            lp2.appendChild(p2);
            lp3.appendChild(p3);
            lp4.appendChild(p4);
            lp5.appendChild(p5);
            lp6.appendChild(p6);
            lp7.appendChild(p7);
            lp8.appendChild(p8);
            lp8.classList.add("gridPanel")
            lp8.appendChild(p8);
            lp8.appendChild(p8inp);
            p8inp.setAttribute("max", "6.75");
            p8inp.setAttribute("min", "0.75");
            p8inp.setAttribute("type", "range");
            p8inp.setAttribute("step", "0.5");
            p8inp.classList.add("playbackSpeedCustom");
            var playbackPercInit = (p8inp.value / p8inp.max) * 100;
            p8inp.style.background = `linear-gradient(to right, ${colorOne} ${playbackPercInit}%, ${colorTwo} ${playbackPercInit}%)`
            lp8.addEventListener("input", () => {
                var playbackPerc = (p8inp.value / p8inp.max) * 100;
                var playbackPercVal = (p8inp.value / p8inp.max) * 7;
                playbackPercVal = playbackPercVal.toFixed(2);
                p8.textContent = `Custom: ${playbackPercVal}`
                p8inp.style.background = `linear-gradient(to right, ${colorOne} ${playbackPerc}%, ${colorTwo} ${playbackPerc}%)`
                let val = p8inp.value;
                mc.playbackRate = val;
            });
        });

        lpb.addEventListener("click", () => {
            setti.classList.remove("playback")
            for (let i = 0; i < nodes.length; i++) {
                if(nodes[i].parentNode != null) {
                    nodes[i].parentNode.removeChild(nodes[i])
                }
            }
            psu.appendChild(li2);
            psu.appendChild(repeatLi);
            repeatLi.appendChild(repeat);
            li2.appendChild(playbackSpeed);
        });
    } else if(setti.classList.contains("open")) {
        setti.classList.remove("open");
        if(psu.parentNode != null) {
            psu.parentNode.removeChild(psu);
        }
    }
    if(setti.classList.contains("playback")) {
        setti.classList.remove("playback")
        for (let i = 0; i < nodes.length; i++) {
            if(nodes[i].parentNode != null) {
                nodes[i].parentNode.removeChild(nodes[i])
            }
        }
    }
}

// keybindings
window.addEventListener("keydown", e => {
    const tn = document.activeElement.tagName.toLowerCase();
    if(tn === "input") return
    switch(e.key.toLowerCase()) {
        case " ":
            if(tn === "button") {
                e.preventDefault();
                tp();
            } else {
                e.preventDefault();
                tp();
            }
            break
        case "k":
            tp();
            break
        case "f": 
            fsa()
            break
        case "p":
            pip();
            break
        case "arrowleft":
            skip(-5)
            break
        case "arrowright":
            skip(5)
            break
        case "arrowdown":
            skip(-5)
            break
        case "arrowup":
            skip(5)
            break
        case "m":
            mute()
            break
        case "s":
            cps()
            break
        case "y":
            if(mc.classList.contains("repeatOff")) {
                mc.classList.remove("repeatOff");
                mc.classList.add("repeatOn");
                repeat.innerText = "Repeat is on";
                mc.loop = true;
            } else if(mc.classList.contains("repeatOn")) {
                mc.classList.remove("repeatOn");
                mc.classList.add("repeatOff");
                repeat.innerText = "Repeat is off";
                mc.loop = false;
            }
            break;
        case "1":
            mc.playbackRate = "0.75"
            break;
        case "2":
            mc.playbackRate = "0.50"
            break;
        case "3":
            mc.playbackRate = "0.25"
            break;
        case "4":
            mc.playbackRate = "1"
            break;
        case "5":
            mc.playbackRate = "1.25"
            break;
        case "6":
            mc.playbackRate = "1.50"
            break;
        case "7":
            mc.playbackRate = "1.75"
            break;
        case "/":
            event.preventDefault();
            alert("Keybinds are as follows:\n\nPlay/pause (k or space bar)\nSkip in time (arrow keys)\nTheater mode (t)\nPicture in picture (chrome and others: p)\nFullscreen (f)\nMute (m)\nSettings Panel (s):\n\nSettings toggles:\n\nRepeat toggle (y)");
            break
    }
});

var volPerc = 100;
vols.addEventListener("input", e => {
    volPerc = (vols.value / vols.max) * 100;
    vols.style.background = `linear-gradient(to right, ${colorOne} ${volPerc}%, ${colorTwo} ${volPerc}%)`
    mc.volume = e.target.value;
    mc.muted = e.target.value === 0;
})

function volumeMove(type) {
    if(type === "up") {
        if(vols.value >= 0.95) {
            vols.value = 1;
            mc.volume = 1;
            return
        }
        if(mc.volume < 1) {
            mc.volume += 0.05;
            vols.value = mc.volume;
        }
        volPerc = (vols.value / vols.max) * 100;
        vols.style.background = `linear-gradient(to right, ${colorOne} ${volPerc}%, ${colorTwo} ${volPerc}%)`
    } else if(type === "down") {
        if(vols.value <= 0.05) {
            vols.value = 0;
            mc.volume = 0;
            return
        }
        if(mc.volume > 0) {
            mc.volume -= 0.05;
            vols.value = mc.volume;
        }
        volPerc = (vols.value / vols.max) * 100;
        vols.style.background = `linear-gradient(to right, ${colorOne} ${volPerc}%, ${colorTwo} ${volPerc}%)`
    }
}

document.addEventListener("wheel", e => {
    if(e.target.classList.contains("tl")) {
        if(e.deltaY < 0) {
            skip(5);
        } else if(e.deltaY > 0) {
            skip(-5);
        }
    } else {
        if(e.deltaY < 0) {
            volumeMove("up");
        } else if(e.deltaY > 0) {
            volumeMove("down");
        }
    }
})