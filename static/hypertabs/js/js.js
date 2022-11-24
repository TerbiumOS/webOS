const prefix = "/sw/";
const URL_BAR = document.getElementById("urlbar");
const ACTIVE_WINDOW = () => { return document.getElementById(getActiveFrameId()).contentWindow; }
const CONTENT_WINDOW = (n) => { return document.getElementById(n).contentWindow }
const ACTIVE_DOCUMENT = () => { return document.getElementById(getActiveFrameId()).contentDocument; }

let history = {},
  sir = true;

const htHandler = (url) => {
  // handle URLs accessed through the `ht://` "protocol"
  url = url.slice(5);
  return (
    internal_pages[url] ||
    internal_pages["newtab"] ||
    alert("something is very wrong, please refresh")
  );
};

const getActiveFrameId = () => {
  if (document.querySelector(".chrome-tab[active]"))
    return (
      +document.querySelector(".chrome-tab[active]").getAttribute("ifd") + 1
    );
  return null;
};

function addPageToHistory(id, page) {
  if (!sir) {
    sir = true;
    return;
  }

  if (!(id in history)) {
    history[id] = [[], -1];
  }

  if (history[id][1] < history[id][0].length - 1) {
    history[id][0] = history[id][0].slice(0, history[id][1] + 1);
  }

  if (history[id][0][[history[id].length - 1]] == page) return;

  history[id][0].push(page);
  history[id][1] = history[id][0].length - 1;
}
function getPage(id) {
  return ((history[id] || [])[0] || [])[history[id][1]] || htHandler("ht://newtab");
}
function getBack(id) {
  sir = false;
  history[id][1]--;
  return getPage(id);
}
function getForward(id) {
  if (history[id][1] >= history[id][0].length - 1) return getPage(id);

  sir = false;
  history[id][1]++;
  return getPage(id);
}
// get's bookmark URL
function getIcon(id) {
  let urlIco = CONTENT_WINDOW(id).document.querySelector(
    'link[rel="favicon"], link[rel="shortcut icon"], link[rel="icon"]'
  );
  if (urlIco !== null) {
    if (urlIco.href.includes("data:image/png;base64")) return urlIco.href;
    return "//" + location.host + path + xor.encode(urlIco.href);
  } else
    return (
      "//" +
      location.host +
      path +
      xor.encode(
        "http://" +
        CONTENT_WINDOW(id).document.domain +
        "/favicon.ico"
      )
    );
}
// Sets tab information
function setInfo(frameId) {
  //if the site we are on is not proxied.
  CONTENT_WINDOW(frameId).addEventListener("keydown", function (key) {
    if (key.ctrlKey) {
      if (
        window.parent.document.getElementsByClassName("chrome-tab")[
        key.key - 1
        ]
      ) {
        window.parent.document
          .getElementsByClassName("chrome-tab")
        [key.key - 1].click();
        chromeTabs.setCurrentTab(
          document.getElementsByClassName("chrome-tab")[key.key - 1]
        );
      }
    }
  });
  CONTENT_WINDOW(frameId).addEventListener("mousedown", function () {
    window.hideId("optionsdrop");
    window.hideId("ctx");
    if (document.querySelectorAll(".extension_menu"))
      document
        .querySelectorAll(".extension_menu")
        .forEach((a) => (a.style.display = "none"));
  });
  URL_BAR.value = "";
  if (
    !CONTENT_WINDOW(frameId).location.href.includes(path)
  ) {
    //do this for history then return..
    addPageToHistory(
      frameId,
      CONTENT_WINDOW(frameId).location.href
    );
    return;
  }
  //get current page url.
  let regUrl = CONTENT_WINDOW(frameId).location.href;
  //grabbing title stuff (corrosion sucks with this)
  if (
    CONTENT_WINDOW(frameId).document.getElementsByTagName("title")[0].firstChild.textContent
  )
    document.getElementsByClassName(frameId)[0].firstChild.data = CONTENT_WINDOW(frameId).document.getElementsByTagName("title")[0].firstChild.textContent;
  else
    document.getElementsByClassName(frameId)[0].firstChild.data = xor.decode(
      regUrl.split(path).slice(1).join(path)
    );
  //set url bar
  if (getActiveFrameId() == frameId) {
    URL_BAR.value = xor.decode(
      regUrl.split(path).slice(1).join(path)
    );
  }
  // set the favicon of page
  document.querySelector(
    `div[ifd="${+frameId - 1}"]`
  ).children[2].children[0].attributes[1].value = `background-image: url(${getIcon(
    frameId
  )})`;
  if (document.querySelector(`div[ifd="${+frameId - 1}"]`).hasAttribute('tab-is-pinned')) {
    chromeTabs.pinTab(+frameId - 1);
  }
  // add the page to local history
  addPageToHistory(
    frameId,
    ACTIVE_WINDOW().location.href
  );
}
function hideId(...x) {
  // Hides hypertab ID.
  x.forEach((frame) => {
    document.getElementById(frame).style.display = "none";
  });
}
function showId(...x) {
  // Shows hypertab ID.
  x.forEach((frame) => {
    document.getElementById(frame).style.display = "block";
  });
}
function toggleId(...x) {
  // Toggles between two hypertabs
  x.forEach((frame) => {
    if (getComputedStyle(document.getElementById(frame)).display === "none") {
      showId(frame);
    } else {
      hideId(frame);
    }
  });
}
function openMenu(...x) {
  // displays additional settings!
  let elems = x.map((id) => document.getElementById(id));
  let shouldOpen = true;
  elems.forEach((elm) => {
    if (getComputedStyle(elm).display !== "none") shouldOpen = false;
  });
  if (shouldOpen) showId(elems[0].id);
  else elems.forEach((elm) => hideId(elm.id));
}
function inspect() {
  let firebug = document.createElement("script");
  firebug.setAttribute("src", "/fbl/firebug-lite-debug.js");
  ACTIVE_DOCUMENT().body.appendChild(firebug)(function () {
    if (
      ACTIVE_WINDOW().firebug.version
    ) {
      ACTIVE_WINDOW().firebug.init();
    } else {
      setTimeout(arguments.callee);
    }
  })();
  void firebug;
}

function opencity(frame) {
  // creates the actual frame inside the hypertab!
  let proxyFrames = document.getElementsByClassName("iframething");

  for (let iframeIndex = 0; iframeIndex < proxyFrames.length; iframeIndex++)
    proxyFrames[iframeIndex].style.display = "none";

  document.getElementById(frame).style = "display:inline; background: #FFFFFF";
  document.getElementById(frame).focus();

  let regUrl = ACTIVE_WINDOW().location.href;
  URL_BAR.value = xor.decode(
    regUrl.split(path).slice(1).join(path)
  );
  // listen for attribute changes with soon to be favicon (not done)
}
function skipAd() {
  while (ACTIVE_DOCUMENT().getElementsByClassName("video-ads")[0].innerHTML !== "") {
    var banner = false;
    for (var i = 0; i < ACTIVE_DOCUMENT().getElementsByClassName("ytp-ad-overlay-close-button").length; i++) {
      ACTIVE_DOCUMENT().getElementsByClassName("ytp-ad-overlay-close-button")[i].click();
      banner = true;
    };
    if (banner === false) {
      ACTIVE_DOCUMENT().getElementsByClassName("html5-main-video")[0].currentTime = ACTIVE_DOCUMENT().getElementsByClassName("html5-main-video")[0].duration;
      ACTIVE_DOCUMENT().getElementsByClassName("ytp-ad-skip-button")[0].click();
    };
  };
}
let newTab = (url, uxor = true) => {
  // creates a new hypertab!!
  chromeTabs.addTab({
    title: "New Hypertab",
    favicon: "favicon.ico",
  });

  URL_BAR.value = "";

  let frameId = tabNum++;
  let frame = document.createElement("IFRAME");

  if (url.startsWith("ht://")) {
    frame.setAttribute("src", htHandler(url));
  }
  else if (uxor == false) {
    frame.setAttribute("src", url);
  } else {
    frame.setAttribute("src", "//" + location.host + path + xor.encode(url));
  }

  frame.setAttribute("allow", "fullscreen");
  frame.setAttribute(
    "sandbox",
    "allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
  );
  document.body.appendChild(frame);
  frame.setAttribute("class", "iframething");
  frame.setAttribute("style", "display:none background: #FFFFFF");
  frame.setAttribute("id", frameId);
  frame.setAttribute("onload", `setInfo(` + frameId + `)`);

  opencity(frameId);
  return document.querySelector(`div[ifd="${+frameId - 1}"]`);
};
let hypertabContainer = document.querySelector(".chrome-tabs");
let chromeTabs = new ChromeTabs();
chromeTabs.init(hypertabContainer);
let tabNum = 2; // 0 and 1 are reserved for the GUI
let ctxTab = 1;
document.querySelector("#urlbar").addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    // suggest searches
    try {
      fetch(
        prefix +
        xor.encode(
          `https://duckduckgo.com/ac?q=${URL_BAR.value
          }`
        )
      )
        .then((a) => a.text())
        .then((a) => JSON.parse(`[${a.split("\n")[5].slice(0, -1)}]`)[0])
        .then((a) => {
          (document.getElementById("searchsuggestions").innerHTML = ""),
            a.forEach((a) =>
              addEl("option", document.getElementById("searchsuggestions"), {
                className: "search-opt",
                value: a.phrase,
              })
            );
        });
    } catch { }
    return;
  }
  // if user is entering a new URL!
  URL_BAR.blur();
  if (URL_BAR.value.startsWith("javascript:")) {
    try {
      jsUri = decodeURIComponent(
        URL_BAR.value.substring(11)
      );
    } catch {
      jsUri = URL_BAR.value.substring(11);
    }
    ACTIVE_WINDOW().eval(jsUri);
    if (
      !ACTIVE_DOCUMENT().baseURI.endsWith(
        location.host + "/internal/newTab/main.php"
      )
    ) {
      URL_BAR.value = ACTIVE_DOCUMENT().baseURI;
    } else {
      URL_BAR.value = "";
    }
    return;
  }
  if (URL_BAR.value.startsWith("ht://")) {
    value = htHandler(URL_BAR.value);
    document.getElementById(getActiveFrameId()).src = value;
    return;
  }
  if (
    !URL_BAR.value.includes(".") ||
    URL_BAR.value.includes(" ")
  ) {
    value =
      "//" +
      location.host +
      path +
      xor.encode(
        window.searchEngine +
        encodeURIComponent(URL_BAR.value)
      );
    document.getElementById(getActiveFrameId()).src = value;
    addPageToHistory(getActiveFrameId(), value);
    return;
  }
  if (!URL_BAR.value.startsWith("http://") && !URL_BAR.value.startsWith("https://")) {
    value =
      "//" +
      location.host +
      path +
      xor.encode("http://" + URL_BAR.value);
    document.getElementById(getActiveFrameId()).src = value;
  } else {
    value =
      "//" +
      location.host +
      path +
      xor.encode(URL_BAR.value);
    document.getElementById(getActiveFrameId()).src = value;
  }

  event.preventDefault();
});

document.getElementById("optionsdrop").style.display = "none";
if (!("tabbkg" in localStorage)) {
  // theming! | redo this shit
  localStorage.setItem("tabbkg", "#202124");
  localStorage.setItem("tabhover", "#292b2e");
  localStorage.setItem("tabact", "#323639");
  localStorage.setItem("tabacttit", "#f1f3f4");
  localStorage.setItem("tabinatit", "#9ca1a7");
  localStorage.setItem("searchbar", "#202124");
  localStorage.setItem("mockb", "#323639");
  localStorage.setItem("nt", "#FFF");
  localStorage.setItem("ua", navigator.userAgent);
}

let items = [
  "tabbkg",
  "tabhover",
  "tabact",
  "tabacttit",
  "tabinatit",
  "searchbar",
  "ua",
];
// redo this
function applyTheme(frame) {
  switch (frame) {
    case "Apply":
      for (let iframeIndex = 0; iframeIndex < items.length; iframeIndex++) {
        localStorage.setItem(
          items[iframeIndex],
          `${document.getElementById(items[iframeIndex]).value}`
        );
      }
      localStorage.setItem("mockb", document.getElementById("tabact").value);
      location.reload();
      break;
    case "Dark":
    case "Reset":
      localStorage.setItem("tabbkg", "#202124");
      localStorage.setItem("tabhover", "#202124");
      localStorage.setItem("tabact", "#323639");
      localStorage.setItem("tabacttit", "#9ca1a7");
      localStorage.setItem("tabacttit", "#f1f3f4");
      localStorage.setItem("tabinatit", "#9ca1a7");
      localStorage.setItem("searchbar", "#202124");
      localStorage.setItem("mockb", "#323639");
      localStorage.setItem("nt", "#FFF");
      location.reload();
      break;
    case "Light":
      localStorage.setItem("tabbkg", "#f4f5f6");
      localStorage.setItem("tabhover", "#f4f5f6");
      localStorage.setItem("tabact", "#fff");
      localStorage.setItem("tabacttit", "#9ca1a7");
      localStorage.setItem("tabacttit", "#45474a");
      localStorage.setItem("tabinatit", "#5f6368");
      localStorage.setItem("searchbar", "#D0D8E8 ");
      localStorage.setItem("mockb", "#fff");
      localStorage.setItem("nt", "#323639");
      location.reload();
      break;
  }
}

for (let iframeIndex = 0; iframeIndex < items.length; iframeIndex++) {
  // this is what ACTUALLY applies the theme to the tabs
  document.getElementById(items[iframeIndex]).value = localStorage.getItem(
    items[iframeIndex]
  );
}

document.cookie = `cua=${localStorage.getItem("ua")}`; // custom User Agent (TODO)
// document.head.insertAdjacentHTML("beforeend", `<style>.chrome-tabs.chrome-tabs-dark-theme {background: ${localStorage.getItem('tabbkg')}} .dropdown-content {background-color: ${localStorage.getItem('tabbkg')}} .mock-browser-content {background-color: ${localStorage.getItem('mockb')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tabs-bottom-bar {background-color: ${localStorage.getItem('tabact')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab[active] .chrome-tab-background > svg .chrome-tab-geometry {fill: ${localStorage.getItem('tabact')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab .chrome-tab-background > svg .chrome-tab-geometry {fill: ${localStorage.getItem('tabhover')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab[active] .chrome-tab-title {color: ${localStorage.getItem('tabacttit')}} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab .chrome-tab-title {color: ${localStorage.getItem('tabinatit')}} #urlbar {background: ${localStorage.getItem('searchbar')} color: ${localStorage.getItem('nt')} } #createTab {color: ${localStorage.getItem('nt')}} .dropdown-content frame {color: ${localStorage.getItem('nt')}} #urlbutton {color: ${localStorage.getItem('nt')}} #options {color: ${localStorage.getItem('nt')}} </style>`)

// // anti-GG
// window.onbeforeunload = function () {
//   return "t";
// };

window.searchEngine =
  localStorage.getItem("htsearchEngine") ||
  "https://searx.priv.pw/search?q=";
document.getElementById("customSearch").value = window.searchEngine;

//bookmarks
function AddBookmark(id) {
  let data = JSON.parse(localStorage.getItem("bookmarks"));
  console.log(
    CONTENT_WINDOW(id).location.href +
    "  " +
    getIcon(id) +
    " " +
    CONTENT_WINDOW(id).document.getElementsByTagName("title")[0].firstChild.textContent
  );
  data.push([
    CONTENT_WINDOW(id).location.href,
    getIcon(id),
    CONTENT_WINDOW(id).document.getElementsByTagName("title")[0].firstChild.textContent,
  ]);
  localStorage.setItem("bookmarks", JSON.stringify(data));
}
function setUA(ua) {
  switch (ua) {
    case "chrome":
      break;
    case "firefox":
      break;
    case "iphone":
      break;
    case "ipad":
      break;
    default:
      break;
  }
}
window.toggleActiveExtension = (ext) => {
  if (!ActiveExtensions.active.includes(ext)) {
    console.info("==== ADDED extension ====\n" + ext);
    window.ActiveExtensions.active.push(ext);
  } else {
    console.info("== REMOVED extension ====\n" + ext);
    window.ActiveExtensions.active.pop(ext);
  }
  localStorage.setItem("ActiveExtensions", JSON.stringify(ActiveExtensions));
  console.log(localStorage.getItem("ActiveExtensions"));
};

localStorage.getItem("ActiveExtensions") ||
  localStorage.setItem("ActiveExtensions", '{"active":["core"]}');
// custom dropdown menu code mf?

// activate all extensions from ActiveExtensions
try {
  window.ActiveExtensions = JSON.parse(localStorage.getItem("ActiveExtensions"));
} catch {
  alert("ActiveExtensions could not be initialized.");
  localStorage.setItem("ActiveExtensions", '{"active":["core"]}');
  window.ActiveExtensions = JSON.parse('{"active":["core"]}');
}
ActiveExtensions.active.forEach((ext) => {
  console.log("==== ACTIVE EXTENSION ====\n" + ext);
  let extScript = document.createElement("script");
  extScript.setAttribute("src", "./js/x/" + ext + ".js");
  document.body.appendChild(extScript);
});
if (localStorage.getItem("ctPins")) {
  let pins = JSON.parse(localStorage.getItem("ctPins"));
  for (pin in pins) {
    var tab = newTab(pins[pin].url, false);
    tab.setAttribute("tab-is-pinned", pin);
    tab.classList.add("pin");
  };
}
let addEl = (a, b, c) =>
  Object.assign(b.appendChild(document.createElement(a)), c);

newTab("ht://newtab");
