let themeMAIN = window.parent.document.querySelector("html");
switch(localStorage.getItem("theme")) {
    case "dark":
        document.documentElement.setAttribute('data-theme', 'dark');
        themeMAIN.setAttribute("data-theme", "dark");
        break
    case "light":
        document.documentElement.setAttribute('data-theme', 'light');
        themeMAIN.setAttribute("data-theme", "light");
        break
    case "night":
        document.documentElement.setAttribute('data-theme', 'night');
        themeMAIN.setAttribute("data-theme", "night");
        break
    case "fracital":
        document.documentElement.setAttribute('data-theme', 'fracital');
        themeMAIN.setAttribute("data-theme", "fracital");
        break
    case "fracital":
        document.documentElement.setAttribute('data-theme', 'custom');
        themeMAIN.setAttribute("data-theme", "custom");
        break
}