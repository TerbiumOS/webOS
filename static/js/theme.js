let themeMAIN = window.parent.document.querySelector("html");
switch(localStorage.getItem("theme")) {
    case "dark":
        document.documentElement.setAttribute("data-theme", "dark");
        break
    case "night":
        document.documentElement.setAttribute("data-theme", "night");
        break
    case "fracital":
        document.documentElement.setAttribute("data-theme", "fracital");
        break
    case "almond":
        document.documentElement.setAttribute("data-theme", "almond");
        break
}