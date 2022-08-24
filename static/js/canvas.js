// const canvas = document.createElement('canvas');
const canvas = document.getElementById('canvas');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
let newCANVAS = document.getElementById("new");
//get canvas offsets
const canvasX = canvas.offsetLeft;
const canvasY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasX;
canvas.height = window.innerHeight - canvasY;

//painting vars
let painting = false;
let lineWidth = 3;
let color;
let startX;
let startY;
let empty = true;

toolbar.addEventListener("click", e => {
    //check the target button of the toolbar
    if(e.target.id === "clear") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        empty = true;
    }
    if(e.target.id === "save") {
        var canvasURI = canvas.toDataURL("image/png");
        const sl = document.createElement("a");
        const span = document.createElement("span");
        if(document.getElementById("save").classList.contains("last")) {
            if(empty == true) {
                alert("you haven't drawn anything bozo")
            } else {
                document.getElementById("save").classList.remove("last");
                sl.classList.add("last");
                sl.classList.add("link");
                sl.innerText = "untitled.png"
                toolbar.appendChild(sl);
                sl.appendChild(span);
                sl.download = 'untitled.jpg';
                sl.href = canvas.toDataURL();
            }
        }
    }
});

// newCANVAS.addEventListener("click", () => {
//     let size = prompt("choose the dimensions\n\nlike this '32 52' each parameter seperated by a space\n\nif you don't the script will interpret it fully as the width and set the height to '1'");
//     if(size == false) {
//         return;
//     } else {
//         size.toLowerCase()
//         let text = size.split(" ");
//         let width = text[0];
//         let height = text[1];
//         console.log(width + "+" + height);
//         canvas.width = width;
//         canvas.height = height;
//         document.body.appendChild(canvas);
//     }
// })

toolbar.addEventListener("change", e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }
    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!painting) return;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvasX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener("mouseleave", () => {
    if(painting) {
        painting = false;
        ctx.stroke();
        ctx.beginPath();
    }
})

canvas.addEventListener("mousedown", (e) => {
    empty = false;
    painting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener("mouseup", (e) => {
    painting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth - canvasX;
    canvas.height = window.innerHeight - canvasY;
});