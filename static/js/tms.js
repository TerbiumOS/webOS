class TMS {
    constructor() {
        this.version = "1.44";
        this.build = "LTS";
    }
    version() {
        return this.version;
    }
    build() {
        return this.build;
    }
}

class tmsNotification {
    constructor(icon, author, message, time, oneTimeNotification) {
        this.icon = icon;
        this.author = author;
        this.message = message;
        this.time = time;
        this.oneTimeNotification = oneTimeNotification;
        this.notification();
    }
    notification() {
        const params = [];
        for(const arg in this) {
            if(this.hasOwnProperty(arg)) {
                if(this[arg] == undefined) {
                    continue;
                }
                let argIdentifier;
                let argItem
    
                argIdentifier = this[arg].substring(this[arg].indexOf("(") + 1, this[arg].indexOf(")"));
                argItem = this[arg].substring(this[arg].indexOf("[") + 1, this[arg].indexOf("]"));
                params.push(`(${argIdentifier})[${argItem}]`);
            }
        }

        let icon;
        let author;
        let message;
        let time;
        let oneTime;

        params.filter((item) => {
            let brackVal = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
            if(item.includes("undefined")) {
                return brackVal;
            }
            if(item.includes("null")) {
                return brackVal;
            }
            if(item.includes("icon")) {
                icon = brackVal;
            }
            if(item.includes("author")) {
                author = brackVal;
            }
            if(item.includes("message")) {
                message = brackVal;
            }
            if(item.includes("time")) {
                time = brackVal;
            }
            if(item.includes("oneTimeNotification")) {
                oneTime = brackVal;
            }
        });
        if(icon == undefined || icon == null || icon == "" || icon == "()[]") {
            console.error("Icon is undefined");
            return;
        }
        if(author == undefined || author == null || author == "" || author == "()[]") {
            console.error("Author is undefined");
            return;
        }
        if(message == undefined || message == null || message == "" || message == "()[]") {
            console.error("Message is undefined");
            return;
        }
        if(time == undefined || time == null || time == "" || time == "()[]") {
            console.error("Time is undefined");
            return;
        }

        notification.classList.add("notification");
        notification.style.opacity = "0";
        notification.innerHTML = `
            <div class="shape1"></div>
            <div class="shape2"></div>
            <img class='notifAppIcon' src='${icon}'>
            <div class='notification-content'>
                <div class='notification-title'>
                    <span class='notification-titleApp'>${author}</span>
                </div>
                <div class="notification-body">
                    <span class="notification-body-text">${message}</span>
                </div>
            </div>
        `;
        let height = notification.offsetHeight + "px";
        notification.style.transform = `translateY(${height})`;
        setTimeout(() => {
            notification.style.opacity = "1";
            notification.style.transform = `translateX(0)`;
            setTimeout(() => {
                notification.style.opacity = "0";
                notification.style.transform = `translateY(${height})`;
                setTimeout(() => {
                    notification.remove();
                }, 200)
            }, time);
        }, 1000);
        document.body.appendChild(notification);
    }
}

window.addEventListener("message", (e) => {
    var data;
    try {
        data = JSON.parse(e.data);
    } catch (error) {
        return;
    }
    // const data = JSON.parse(e.data);
    if (data.type === "notification") {
        const fields = data.fields;
        const icon = fields.icon;
        const author = fields.author;
        const message = fields.message;
        const time = fields.time;
        new tmsNotification(icon, author, message, time);
    }
    if(data.type === "getSystemInfo") {
        let tms = new TMS();
        let version = tms.version;
        let build = tms.build;

        window.postMessage(JSON.stringify({
            type: "systemInfo",
            fields: {
                version: version,
                build: build
            }
        }))
    }
})