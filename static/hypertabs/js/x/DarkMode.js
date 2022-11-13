/*
    Dark Mode extension for Hypertabs by luphoria.
    Very good for use as a base for whatever extension you may want to create!

    version 0.
    REVISIONS: created extension.
*/
class DarkMode {
  static async Menu() {
    // Menu is a REQUIRED function for any extension with an icon. It is usually expected to open a small window that gives settings, or a tab.
    if (typeof DarkMode_menu === "undefined") {
      // initialize
      window.DarkMode_menu = document.createElement("div");
      DarkMode_menu.id = "darkmode_menu";
      DarkMode_menu.classList.add("extension_menu");
      DarkMode_menu.style.width = "300px";
      DarkMode_menu.style.height = "300px";
      DarkMode_menu.style.right = 0;
      DarkMode_menu.style.paddingLeft = "4px";
      DarkMode_menu.style.backgroundColor = "#202124";
      DarkMode_menu.style.position = "absolute";
      DarkMode_menu.innerHTML = `
                <h1 style="color: white; text-align: center;">Dark Mode</h1>
                <div style="text-align:center">
                <button onclick='DarkMode.invert()'>Toggle dark/light mode</button><br />
                <button onclick='DarkMode.toggleToWhitelist(document.getElementById(getActiveFrameId()).contentDocument.domain)'>Add/remove current site to whitelist</button><br />
                <button onclick='DarkMode.export()'>export whitelist</button>
                </div>`;
      return document
        .getElementsByClassName("mock-browser")[0]
        .append(DarkMode_menu);
    }
    // otherwise, just toggle it on/off.
    return toggleId(DarkMode_menu.id);
  }
  static async toggleToWhitelist(domain) {
    DarkMode.invert();
    if (!toggleList.darken.includes(domain)) {
      toggleList.darken.push(domain);
    } else {
      toggleList.darken.pop(domain);
    }
    localStorage.setItem("dkm-list",JSON.stringify(toggleList));
    console.log(localStorage.getItem("dkm-list"));
    return
  }
  static async invert() {
    var el,
      identifier = "HTdkthm",
      doc = document.getElementById(getActiveFrameId()).contentDocument,
      passed = doc.getElementById(identifier);
    null != passed
      ? passed.parentNode.removeChild(passed)
      : ((el = doc.createElement("style")),
        (el.id = identifier),
        el.appendChild(
          doc.createTextNode(
            `
            :root{
                background-color:#000000;
                filter:invert(100%)
            }
            img, video, svg, iframe {
                filter:invert(100%)
            }
            `
          )
        ),
        (doc.head || doc.querySelector("head")).appendChild(el));
  }
  static async export() {
    return alert(localStorage.getItem("dkm-list"));
  }
}

Page.register({
  icon64:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACyUlEQVR4Xu2aTYiNURjHp5mmCSOpaTSaEA1ZKF8LsRiUUpqyQMpiwm7EREnTyJ5RFppSaqyUslRKMsrCUrKShY1IRr5Cycfjdzr35s5/5n3ve2djznPfX/039z3Pc/vd+3bvOe85LS0lJSX/EzNbqK81BYjvJTfJAr3mGoRXkLvkF9mu112D8HHyxSKX9bpbkG0n1yrigdfWLLc+oovIgxr5wGkd5xJEO8kjkX9nzfDLj2QbuSfygREd6xJEr6q5xV/+bh3rDiQPqXmFSR3rDiR7yHs1rzCk492B5C21rvCb9Oh4VyC4jfwR8SovdLw7kJxU6xpu63hXILhRjYVRrXEFghNqLAxojRuQ67B/i5wstmidG5AbUNtZWKd1brDpK70slmudG5B7prazsFjrXBDELM7x69GltS5AbJOaZrBea12A2H41zaBfa12A2Ak1zeCA1roAsTNqmoHPmSBiI2qawR2tdYEVvwOmtNYFiA2qaQ59Wp88SO1TyxyGtT55kFqjljk80frkQaqVfFXTHDZoj+SxmZsfeYxpffIgNaqWOXwgS7VH0iC0VS3rcFF7JA9Sz9Uyh++kV3skDUJn1bIOE9ojaRDqJt/UMoewf+DrQSlCY2pZhynz9KgMmS6r/3RYCYcnWrVXsiAzrIYFGNc+yWJxZvhYDQtwSXslCzJ95KMaFuCC9koWi6vEsCXeKOOkXfslCSKn1K4gYW2xTPsliTU+QaryiuzSfkmCyBD5KYJFCeeJ058rILHH4kpwLny2eCd1at+kQKDXZj87WJRP5ApZrb2TAoFj5M10t4YI/y7hgzxJ1mr/JLB4hvg8eVtrNkdekhvkHDlINpMl+p7zEounSwbJQyu2y5xHWGHeJ4dJh77XvMfikvoouW7xzEHWkbsqP8hTi9/+EfO4BY/UStJPdlaym+wgq0ibji8pKSkpKSkpKcpfD60zBiqrtQkAAAAASUVORK5CYII=",
  Info: "Dark Mode extension for Hypertabs by luphoria.",
  Description:
    "This extension can toggle a dark mode on pages viewed via Hypertabs.",
  page: "DarkMode",
  name: "DarkMode",
});

localStorage.getItem("dkm-list") || localStorage.setItem("dkm-list", '{"darken":[]}');
let toggleList;
try {
  toggleList = JSON.parse(localStorage.getItem("dkm-list"));
} catch {
  alert("DarkMode configuration could not be initialized.");
  localStorage.setItem("dkm-list", '{"darken":[]}');
  toggleList = JSON.parse('{"darken":[]}');
}


setInfo = (parameters) => {
  if (
    toggleList.darken.includes(
      document.getElementById(parameters).contentDocument.domain
    )
  )
    DarkMode.invert();
  _setInfo(parameters);
};
