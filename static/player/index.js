const currentWindow = window.parent.document.querySelector(`.winFocus`);
const settingsV = currentWindow.querySelector(`.settingsV`);
const settings = document.querySelector('.settingsWindow');
settingsV.addEventListener('click', function () {
    if (!settings.classList.contains('show')) {
        settings.style.zIndex = 101;
        setTimeout(() => {
            settings.style.opacity = 1;
            settings.classList.toggle('show');
        }, 50)
    } else if(settings.classList.contains('show')) {
        settings.style.zIndex = -1;
        setTimeout(() => {
            settings.style.opacity = 0;
            settings.classList.toggle('show');
        }, 50)
    }
});

const ap = document.querySelector('#ap');
ap.addEventListener('click', function () {
    switch(ap.checked) {
        case true:
            document.querySelector("video").autoplay = true;
            localStorage.setItem('autoplay', 'yes');
            break;
        case false:
            document.querySelector("video").autoplay = false;
            localStorage.setItem('autoplay', 'no');
            break;
        default:
            break;
    }
});

if(localStorage.getItem('autoplay') === "yes") {
    ap.checked = true;
    document.querySelector("video").autoplay = true;
} else if(localStorage.getItem('autoplay') === "no") {
    ap.checked = false;
    document.querySelector("video").autoplay = false;
}

let videoName;
let dateMod;
let size;
let format;
let truncateTitleSub;
let duration;

const openFile = currentWindow.querySelector(".openF");
openFile.addEventListener("click", () => {
    if(!document.querySelector(".info").classList.contains("infH")) {
        document.querySelector(".info").classList.toggle("infH");
    }
    const choice = document.createElement("div");
    if (document.querySelector(".choice")) {
        document.querySelector(".choice").remove();
    } else {
        choice.classList.add("choice");
        choice.classList.add("back");
        choice.innerHTML = `
            <div class="top">
                <h3>Open a video</h3>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon close" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>
            <div class="choice-container">
                <form>
                    <input type="file" class="choice-button file" id="file">
                </form>
            </div>
            <div class="choice-container">
                <input type="url" placeholder="Enter a URL" class="choice-button input" id="url">
                <button class="btn" id="url-submit">Submit</button>
            </div>
        `;
        document.body.appendChild(choice);
        document.querySelector(".close").onclick = () => {
            choice.remove();
        }
        const urlSubmit = document.querySelector("#url-submit");
        urlSubmit.addEventListener("click", () => {
            const url = document.querySelector("#url").value;
            if (!url.startsWith("http") || !url.startsWith("https")) {
                alert("Invalid URL");
                return;
            } else {
                document.getElementById("mc").focus();
                document.getElementById("mc").src = url;
                document.querySelector("video").play();
                choice.remove();
            }
        });
        const file = document.querySelector("#file");
        file.addEventListener("change", () => {
            const o = file.files[0];
            const r = new FileReader();
            r.readAsDataURL(o);
            videoName = o.name.replace(/\.[^/.]+$/, "");
            if (o.name.length > 55) {
                truncateTitleSub = o.name.replace(/\.[^/.]+$/, "");
                videoName = o.name.substring(0, 55) + "...";
            }
            dateMod = new Date(o.lastModified).toLocaleString();
            size = o.size;
            if (o.size < 1000) {
                size = o.size + " B";
            } else if (o.size < 1000000) {
                size = (o.size / 1000).toFixed(2) + " KB";
            } else if (o.size < 1000000000) {
                size = (o.size / 1000000).toFixed(2) + " MB";
            } else {
                size = (o.size / 1000000000).toFixed(2) + " GB";
            }
            format = o.type.replace("video/", "").toUpperCase();
            let video = URL.createObjectURL(o);
            document.getElementById("mc").focus();
            document.getElementById("mc").src = video;
            document.querySelector("video").play();
            choice.remove();
            setTimeout(() => {
                if(document.querySelector(".tt").innerHTML !== "1:22" && document.querySelector(".tt").innerHTML !== "0:00") {
                    duration = document.querySelector(".tt").innerHTML;
                }
            }, 200)
        });
    }
});