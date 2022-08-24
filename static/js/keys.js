let frame = document.getElementById("frame");

window.addEventListener("keydown", e => {
  switch(e.key.toLowerCase()) {
    case "shift q":
      frame.contentWindow.location.reload();
      break;
    default:
      break;
  }
})