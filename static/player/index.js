const settingsV = window.parent.document.querySelector(`.settingsV`);
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
            localStorage.setItem('autoplay', 'true');
            break;
        case false:
            document.querySelector("video").autoplay = false;
            localStorage.setItem('autoplay', 'false');
            break;
        default:
            break;
    }
});

if(localStorage.getItem('autoplay') === "true") {
    ap.checked = true;
    document.querySelector("video").autoplay = true;
} else if(localStorage.getItem('autoplay') === "false") {
    ap.checked = false;
    document.querySelector("video").autoplay = false;
}

const openFile = window.parent.document.querySelector(".openF");
openFile.addEventListener("click", () => {
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
            // check if the url is invalid or does not start with http or https
            if (!url.startsWith("http") || !url.startsWith("https")) {
                alert("Invalid URL");
                return;
            } else {
                document.getElementById("mc").src = url;
                choice.remove();
            }
        });
        const file = document.querySelector("#file");
        file.addEventListener("change", () => {
            const o = file.files[0];
            const r = new FileReader();
            r.readAsDataURL(o);
            r.onload = () => {
                document.getElementById("mc").focus();
                const t = r.result;
                document.getElementById("mc").src = t;
            }
            choice.remove();
        });
    }
});