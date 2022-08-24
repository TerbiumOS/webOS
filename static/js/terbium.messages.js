let id;

window.onmessage = (e) => {
    id = e.data;
}

window.onclick = function() {
    let windows = window.parent.document.querySelectorAll('.win');
    for (let i = 0; i < windows.length; i++) {
        windows[i].style.zIndex = "1";
    }
    window.parent.document.getElementById(id).style.zIndex = 2;
}