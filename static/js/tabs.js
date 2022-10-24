const active_Window = () => {document.querySelector('.chrome-tab[active]')}; // fill this after
const content_Window  = (id) => {return document.getElementById(id).content_Window};
let tabNum = 1;
class Tab {
    static create (url = './newwin.html') {
        let frameW = document.createElement("iframe"),
            div = document.createElement('div'),
            browserC = document.getElementsByClassName('chrome-tabs-content')[0],
            frameC = document.getElementById('frameC');
        div.setAttribute('num',tabNum);
        div.setAttribute('class','chrome-tab');
        
        div.setAttribute('active','');
        div.setAttribute('onclick',`Tab.switch(this.getAttribute('num'))`);
        div.innerHTML = `
            <div class="chrome-tab-content">
                <div class="chrome-tab-title">New Tab</div>
                <div class="chrome-tab-drag-handle"></div>
                <div class="chrome-tab-close" onclick="event.stopPropagation();Tab.remove(this.parentElement.parentElement.getAttribute('num'))"></div>
            </div>
        `;
        frameW.setAttribute('id',tabNum);
        frameW.setAttribute('class','frame')
        frameW.setAttribute('frameborder','0')
        frameW.src=url;
        browserC.appendChild(div);
        frameC.appendChild(frameW);
        if (tabNum > 0) {
            this.switch(tabNum)
        }

        let tabs = document.getElementsByClassName('chrome-tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.transform = `translate3d(${239*i}px, 0, 0)`;
        }
        tabNum++;
        // check for overflow in .chrome-tabs
        if (document.getElementsByClassName('chrome-tabs-content')[0].offsetWidth > document.getElementsByClassName('chrome-tabs')[0].offsetWidth) {
            document.getElementsByClassName('chrome-tabs')[0].style.height = "56px"
        }
    }
    static remove(id) {
        document.getElementsByClassName('chrome-tabs-content')
        if (document.querySelector(`.chrome-tab[num='${id}']`).hasAttribute('active') && document.querySelector(`.chrome-tab[num='${id}']`).previousElementSibling != null) {
            document.querySelector(`.chrome-tab[num='${id}']`).previousElementSibling.setAttribute('active','')
            document.getElementById(document.querySelector(`.chrome-tab[num='${id}']`).previousElementSibling.getAttribute('num')).style.display = 'unset';
        }
        document.querySelector(`.chrome-tab[num='${id}']`).remove();
        document.getElementById(id).remove();
        let tabs = document.getElementsByClassName('chrome-tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.transform = `translate3d(${239*i}px, 0, 0)`;
        }
    }
    static switch(to) {
        let curtab = document.querySelector('.chrome-tab[active]');
        document.getElementById(curtab.getAttribute('num')).style.display = 'none';
        curtab.removeAttribute('active');
        document.getElementById(to).style.display = 'unset';
        document.querySelector(`.chrome-tab[num='${to}']`).setAttribute('active','');
    }

}