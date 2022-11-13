const _setInfo = setInfo;
class Tab {
  static async getActive() {
    return document.getElementById(getActiveFrameId()).contentDocument;
  }
  static async getList() {
    let children = document.querySelector(".chrome-tabs-content").children;
    for (child in children) {
      console.log(typeof child);
      if (typeof child === "number") {
        console.log(children[child].attributes);
      }
    }
  }
}
class Page {
  static async register(info) {
    let img = document.createElement("img");
    img.className = "extenico";
    img.src = info.icon64;
    img.setAttribute("onclick", info.name + ".Menu()");
    console.log(document.getElementById("extensionlist"));
    document.getElementById("extensionlist").appendChild(img);
  }
  static async showEx(details) {
    let ediv = document.createElement("div");
    ediv.style.width = "512px";
    ediv.style.height = "512px";
  }
  static async URL(tab) {}
  static async params(tab) {}
  static async frame(tab) {}
}
class Util {
  static formUrl(url) {
    let purl;
    try {
      purl = new URL(url);
      console.log(purl);
    } catch {
      alert(
        "An extension has caused an issue while making a web request! ",
        console.trace()
      );
    }
    return xor.encode(purl.origin + purl.pathname + purl.search);
  }
}
class Request {
  static async post(url, headers = {}, data) {
    url = Util.formUrl(url);
    console.log(url);
    let res = await fetch(prefix + url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return res;
  }
  static async get(url, headers = {}) {
    url = Util.formUrl(url);
    let res = await fetch(prefix + url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return res;
  }
  static async put(url, headers = {}, data = {}) {
    url = Util.formUrl(url);
    let res = await fetch(prefix+ url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return res;
  }
  //   finish this one
  static async delete(url, headers = {}, data = {}) {
    url = Util.formUrl(url);
    let res = await fetch(prefix + url, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return res;
  }
}
