let colorHEX;
class picker {
    constructor(target, width, height) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.target.width = width;
        this.target.height = height;
        this.context = this.target.getContext("2d");
        this.pickerCirc = { x: 0, y: 0, width: 7, height: 7 };
        this.listen();
    }

    draw() {
        this.build()
    }

    build() {
        let grad = this.context.createLinearGradient(0, 0, this.width, 0);
        //rainbow gradient
        grad.addColorStop(0, "rgb(255, 0, 0)");
        grad.addColorStop(0.15, "rgb(255, 0, 255)");
        grad.addColorStop(0.33, "rgb(0, 0, 255)");
        grad.addColorStop(0.49, "rgb(0, 255, 255)");
        grad.addColorStop(0.67, "rgb(0, 255, 0)");
        grad.addColorStop(0.84, "rgb(255, 255, 0)");
        grad.addColorStop(1, "rgb(255, 0, 0)");
        this.context.fillStyle = grad;
        this.context.fillRect(0, 0, this.width, this.height);
        //black and white gradient
        grad = this.context.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0.9, "rgba(0, 0, 0, 1)");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        grad.addColorStop(0.1, "rgba(255, 255, 255, 1)");
        this.context.fillStyle = grad;
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.beginPath();
        this.context.arc(this.pickerCirc.x, this.pickerCirc.y, this.pickerCirc.width, 0, Math.PI * 2);
        if(colorHEX === "#000000") {
            this.context.strokeStyle = "#ffffff";
        } else {
            this.context.strokeStyle = "#000000";
        }
        this.context.stroke();
        this.context.closePath();
    }

    listen() {
        let ismousedown = false;
        const mousedown = (e) => {
            let currentXValue = e.clientX - this.target.offsetLeft;
            let currentYValue = e.clientY - this.target.offsetTop;
            if(currentYValue > this.pickerCirc.y
            && currentYValue < this.pickerCirc.y + this.pickerCirc.width
            && currentXValue > this.pickerCirc.x
            && currentXValue < this.pickerCirc.x + this.pickerCirc.width) {
                ismousedown = true;
            } else {
                this.pickerCirc.x = currentXValue;
                this.pickerCirc.y = currentYValue;
                ismousedown = true;
                this.callback(this.getColor())
            }
        }
        const mousemove = (e) => {
            if(ismousedown) {
                let currentXValue = e.clientX - this.target.offsetLeft;
                let currentYValue = e.clientY - this.target.offsetTop;
                this.pickerCirc.x = currentXValue;
                this.pickerCirc.y = currentYValue;
                this.callback(this.getColor())
            }
        }
        const mouseup = () => {
            ismousedown = false;
        }
        this.target.addEventListener("mousedown", mousedown);
        this.target.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    }

    getColor() {
        let imageData = this.context.getImageData(this.pickerCirc.x, this.pickerCirc.y, 1, 1);
        return { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] }
    }

    change(call) {
        this.callback = call;
    }
}
let picka = new picker(document.getElementById("color"), 251, 202);
setInterval(() => picka.draw(), 1);
picka.change((color) => {
    const rgbEquivalent = document.querySelector(".rgbEquivalent");
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    colorHEX = "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
    document.getElementById("hex").style.color = `#565656`;
    rgbEquivalent.style.color = `#565656`;
    if(colorHEX === "#ffffff") {
        document.getElementById("hex").style.color = `#000000`;
        rgbEquivalent.style.color = `#000000`;
    } else {
        document.getElementById("hex").style.color = `#565656`;
        rgbEquivalent.style.color = `#565656`;
    }
    if(picka.pickerCirc.y >= 90) {
        document.getElementById("hex").style.color = `#ffffff`;
        rgbEquivalent.style.color = `#ffffff`;
    }
    document.getElementById("hex").textContent = colorHEX;
    rgbEquivalent.textContent = `rgb(${color.r}, ${color.g}, ${color.b})`;
    let selected = document.getElementById("colorIndi");
    selected.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    let picker = document.getElementById("picker");
    picker.style.outline = `1px solid rgb(${color.r}, ${color.g}, ${color.b})`;
});

let colorPREVIEW = document.getElementById("colorIndi");