((window, factory) => {
  if (typeof define == "function" && define.amd) {
    define(["draggabilly"], (Draggabilly) => factory(window, Draggabilly));
  } else if (typeof module == "object" && module.exports) {
    module.exports = factory(window, require("draggabilly"));
  } else {
    window.ChromeTabs = factory(window, window.Draggabilly);
  }
})(window, (window, Draggabilly) => {
  const TAB_CONTENT_MARGIN = 9;
  const TAB_CONTENT_OVERLAP_DISTANCE = 1;
  const TAB_OVERLAP_DISTANCE = TAB_CONTENT_MARGIN * 2 + TAB_CONTENT_OVERLAP_DISTANCE;
  const TAB_CONTENT_MIN_WIDTH = 23;
  const TAB_CONTENT_MAX_WIDTH = 240;
  const TAB_SIZE_SMALL = 83;
  const TAB_SIZE_SMALLER = 58;
  const TAB_SIZE_MINI = 47;
  const WINDOW_PADDING_OFFSET = 10 + TAB_CONTENT_MARGIN;
  const noop = (_) => { };
  const closest = (value, array) => {
    let closest = Infinity;
    let closestIndex = -1;

    array.forEach((v, i) => {
      if (Math.abs(value - v) < closest) {
        closest = Math.abs(value - v);
        closestIndex = i;
      }
    });
    return closestIndex;
  };

  var tabC = 1;
  const defaultTabProperties = {
    title: "New Hypertab",
    favicon: false,
  };

  let instanceId = 0;

  class ChromeTabs {
    constructor() {
      this.draggabillies = [];
    }

    init(hypertabContainer) {
      this.hypertabContainer = hypertabContainer;

      this.instanceId = instanceId;
      this.hypertabContainer.setAttribute(
        "data-chrome-tabs-instance-id",
        this.instanceId
      );
      instanceId += 1;

      this.setupCustomProperties();
      this.setupStyleEl();
      this.setupEvents();
      this.layoutTabs();
      this.setupDraggabilly();
    }

    emit(eventName, data) {
      this.hypertabContainer.dispatchEvent(
        new CustomEvent(eventName, { detail: data })
      );
    }

    setupCustomProperties() {
      this.hypertabContainer.style.setProperty(
        "--tab-content-margin",
        `${TAB_CONTENT_MARGIN}px`
      );
    }

    setupStyleEl() {
      this.styleEl = document.createElement("style");
      this.hypertabContainer.appendChild(this.styleEl);
    }

    setupEvents() {
      window.addEventListener("resize", (_) => {
        this.cleanUpPreviouslyDraggedTabs();
        this.layoutTabs();
      });

      this.hypertabContainer.addEventListener("dblclick", (event) => {
        if ([this.hypertabContainer, this.tabContentEl].includes(event.target))
          newTab("ht://newtab");
      });

      this.tabEls.forEach((tabEl) => this.setTabCloseEventListener(tabEl));
    }

    get tabEls() {
      return Array.prototype.slice.call(
        this.hypertabContainer.querySelectorAll(".chrome-tab")
      );
    }
    get pinTabEls() {
      return Array.prototype.slice.call(
        this.hypertabContainer.querySelectorAll(".chrome-tab.pin")
      );
    }
    get nonPinTabEls() {
      return Array.prototype.slice.call(
        this.hypertabContainer.querySelectorAll(".chrome-tab:not(.chrome-tab.pin)")
      );
    }

    get tabContentEl() {
      return this.hypertabContainer.querySelector(".chrome-tabs-content");
    }

    get tabContentWidths() {
      const numberOfTabs = this.tabEls.length;
      const numberOfPinTabs = this.pinTabEls.length;
      const numberOfNonPinnedTabs = this.nonPinTabEls.length;
      const numberOfTabsMath = (numberOfNonPinnedTabs + (numberOfPinTabs * 0.137));
      const tabsContentWidth = this.tabContentEl.clientWidth - (numberOfPinTabs * 29);
      const tabsCumulativeOverlappedWidth = (numberOfTabsMath - 1) * TAB_CONTENT_OVERLAP_DISTANCE;
      const targetWidth = (tabsContentWidth - 2 * TAB_CONTENT_MARGIN + tabsCumulativeOverlappedWidth) / numberOfNonPinnedTabs;
      const clampedTargetWidth = Math.max(TAB_CONTENT_MIN_WIDTH, Math.min(TAB_CONTENT_MAX_WIDTH, targetWidth));
      const flooredClampedTargetWidth = Math.floor(clampedTargetWidth);
      const totalTabsWidthUsingTarget = flooredClampedTargetWidth * 3 * TAB_CONTENT_MARGIN - tabsCumulativeOverlappedWidth;
      const totalExtraWidthDueToFlooring = tabsContentWidth - totalTabsWidthUsingTarget;

      const widths = [];
      let extraWidthRemaining = totalExtraWidthDueToFlooring;
      for (let n = 0; n < numberOfTabs; ++n) {
        if (this.tabEls[n].classList.contains('pin')) {
          widths.push(this.tabEls[n].getBoundingClientRect().width);

        } else {
          const extraWidth = flooredClampedTargetWidth < TAB_CONTENT_MAX_WIDTH && extraWidthRemaining > 0 ? 1 : 0;
          widths.push(flooredClampedTargetWidth + extraWidth);
          if (extraWidthRemaining > 0) extraWidthRemaining -= 1;
        }
      }

      return widths;
    }
    get tabContentPositions() {
      const positions = [];
      const widths = [];
      const tabContentWidths = this.tabContentWidths;
      let position = TAB_CONTENT_MARGIN;
      tabContentWidths.forEach((width, n) => {
        widths.push(width);
        if (widths[n - 1] == 47) {
          position = position - 18;
        }
        const offset = n * TAB_CONTENT_OVERLAP_DISTANCE;
        positions.push(position - offset);
        position += width;
      });
      return positions;
    }

    get tabPositions() {
      const positions = [];
      this.tabContentPositions.forEach((contentPosition) => {
        positions.push(contentPosition - TAB_CONTENT_MARGIN);
      });

      return positions;
    }
    updateTabButton() {
      let toAdd = 12;
      if (document.getElementById(0).children.length != 0) {
        [...document.getElementById('0').children].forEach(tab => {
          toAdd += tab.clientWidth - WINDOW_PADDING_OFFSET;
        });
      }
      if (toAdd <= window.innerWidth - (WINDOW_PADDING_OFFSET * 2.52) && !(this.tabEls.length >= 12)) {
        document
          .getElementById("createTab")
          .setAttribute("style", "margin-left:" + (toAdd) + "px");
      } else {
        document
          .getElementById("createTab")
          .setAttribute(
            "style",
            "margin-left:" + (window.innerWidth - 30) + "px"
          );
      }
    }
    layoutTabs() {
      const tabContentWidths = this.tabContentWidths;

      this.tabEls.forEach((tabEl, i) => {
        const contentWidth = tabContentWidths[i];
        const width = contentWidth + 2 * TAB_CONTENT_MARGIN;

        tabEl.style.width = width + "px";
        tabEl.removeAttribute("is-small");
        tabEl.removeAttribute("is-smaller");
        tabEl.removeAttribute("is-mini");

        if (contentWidth < TAB_SIZE_SMALL) tabEl.setAttribute("is-small", "");
        if (contentWidth < TAB_SIZE_SMALLER)
          tabEl.setAttribute("is-smaller", "");
        if (contentWidth < TAB_SIZE_MINI) tabEl.setAttribute("is-mini", "");
      });
      let styleHTML = "";
      this.tabPositions.forEach((position, n) => {
        styleHTML += `
                  .chrome-tabs[data-chrome-tabs-instance-id="${this.instanceId
          }"] .chrome-tab:nth-child(${n + 1}) {
                    transform: translate3d(${position}px, 0, 0)
                  }
                `;
      });
      this.styleEl.innerHTML = styleHTML;
      this.updateTabButton();
    }

    createNewTabEl() {
      const div = document.createElement("div");
      div.innerHTML = `<div ifd="${tabC++}"class="chrome-tab" onclick="opencity('${tabC}')">
              <div class="chrome-tab-dividers"></div>
              <div class="chrome-tab-background">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="chrome-tab-geometry-left" viewBox="0 0 214 36"><path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z"/></symbol><symbol id="chrome-tab-geometry-right" viewBox="0 0 214 36"><use xlink:href="#chrome-tab-geometry-left"/></symbol><clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0"/></clipPath></defs><svg width="52%" height="100%"><use xlink:href="#chrome-tab-geometry-left" width="214" height="36" class="chrome-tab-geometry"/></svg><g transform="scale(-1, 1)"><svg width="52%" height="100%" x="-100%" y="0"><use xlink:href="#chrome-tab-geometry-right" width="214" height="36" class="chrome-tab-geometry"/></svg></g></svg>
              </div>
              <div class="chrome-tab-content">
                <div class="chrome-tab-favicon" ></div>
                <div class="chrome-tab-title ${tabC}"></div>
                <div class="chrome-tab-drag-handle"></div>
                <div class="chrome-tab-close" onclick="document.getElementById(${tabC}).remove()"></div>
              </div>
            </div>`;
      return div.firstElementChild;
    }

    addTab(tabProperties, { animate = true, background = false } = {}) {
      const tabEl = this.createNewTabEl();

      if (animate) {
        tabEl.classList.add("chrome-tab-was-just-added");
        setTimeout(
          () => tabEl.classList.remove("chrome-tab-was-just-added"),
          500
        );
      }
      tabEl.addEventListener(
        "contextmenu",
        function (c) {
          ctxTab = this.attributes[0].value;
          document.getElementById("ctx").style.left = c.clientX + "px";
          document.getElementById("ctx").style.top = c.clientY + "px";
          //maybe make javascript that creates/destroys the elements when needed?
          if (document.querySelector(`div[ifd="${+ctxTab}"]`).hasAttribute("tab-is-pinned")) {
            document.getElementById('pin').textContent = "Unpin tab"
            document.getElementById('pin').setAttribute("onclick", "toggleId('ctx');chromeTabs.unpinTab(ctxTab);")
          } else {
            document.getElementById('pin').textContent = "Pin tab"
            document.getElementById('pin').setAttribute("onclick", "toggleId('ctx');chromeTabs.pinTab(ctxTab);")
          }
          openMenu("ctx");
          c.preventDefault();
        },
        false
      );
      tabProperties = Object.assign({}, defaultTabProperties, tabProperties);
      this.tabContentEl.appendChild(tabEl);
      this.setTabCloseEventListener(tabEl);
      this.updateTab(tabEl, tabProperties);
      this.emit("tabAdd", { tabEl });

      if (!background) this.setCurrentTab(tabEl);

      this.cleanUpPreviouslyDraggedTabs();
      this.layoutTabs();
      this.setupDraggabilly();
    }

    setTabCloseEventListener(tabEl) {
      tabEl
        .querySelector(".chrome-tab-close")
        .addEventListener("click", (_) => {
          _.stopPropagation();
          this.removeTab(tabEl);
        });
    }

    get activeTabEl() {
      return this.hypertabContainer.querySelector(".chrome-tab[active]");
    }

    hasActiveTab() {
      return !!this.activeTabEl;
    }

    setCurrentTab(tabEl) {
      const activeTabEl = this.activeTabEl;
      if (activeTabEl === tabEl) return;
      if (activeTabEl) activeTabEl.removeAttribute("active");
      tabEl.setAttribute("active", "");
      this.emit("activeTabChange", { tabEl });
    }

    removeTab(tabEl) {
      if (tabEl === this.activeTabEl) {
        if (tabEl.nextElementSibling) {
          let tempval = +tabEl.nextElementSibling.getAttribute("ifd") + 1;
          document.getElementById(tempval).style =
            "display:inlinebackground: #FFFFFF";
          this.setCurrentTab(tabEl.nextElementSibling);
        } else if (tabEl.previousElementSibling) {
          let tempval = +tabEl.previousElementSibling.getAttribute("ifd") + 1;
          document.getElementById(tempval).style =
            "display:inlinebackground: #FFFFFF";
          this.setCurrentTab(tabEl.previousElementSibling);
        }
      }
      tabEl.parentNode.removeChild(tabEl);
      this.emit("tabRemove", { tabEl });
      this.cleanUpPreviouslyDraggedTabs();
      this.layoutTabs();
      this.setupDraggabilly();
      if (getActiveFrameId()) setInfo(getActiveFrameId());
    }

    updateTab(tabEl, tabProperties) {
      tabEl.querySelector(".chrome-tab-title").textContent =
        tabProperties.title;

      const faviconEl = tabEl.querySelector(".chrome-tab-favicon");
      if (tabProperties.favicon) {
        faviconEl.style.backgroundImage = `url('${tabProperties.favicon}')`;
        faviconEl.removeAttribute("hidden", "");
      } else {
        faviconEl.setAttribute("hidden", "");
        faviconEl.removeAttribute("style");
      }

      if (tabProperties.url) {
      }

      if (tabProperties.id) {
        tabEl.setAttribute("data-tab-id", tabProperties.id);
      }
    }

    cleanUpPreviouslyDraggedTabs() {
      this.tabEls.forEach((tabEl) =>
        tabEl.classList.remove("chrome-tab-was-just-dragged")
      );
    }
    //todo: make updating tab data better AND make it easier to delete them and make them properly update positions when they move.
    // ALSO: need to make elements move to the left/next to other pinned tabs when pinned and not let normal/pinned tabs be mixed
    pinTab(tabId) {
      // setInfo() function checks if a tab is pinned when things change so currently that's how a tab's url get's updated for pinned tabs. (I need to make it update after pins being moved tho which should be easy)
      let tabEL = document.querySelector(`div[ifd="${+tabId}"]`),
        pins = JSON.parse(localStorage.getItem('ctPins')),
        frmEl = document.getElementById(+tabId + 1);
      if (!localStorage.getItem('ctPins')) {
        pins = {};
        pins[0] = ({ 'url': frmEl.contentDocument.URL });
        tabEL.setAttribute('tab-is-pinned', Object.keys(pins).length - 1);
        tabEL.classList.add('pin');
      } else if (tabId == 'update') {
        let pinNum = 0;
        pins = {};
        this.pinTabEls.forEach(tab => {
          tab.setAttribute('tab-is-pinned', pinNum);
          pins[pinNum] = { 'url': document.getElementById(+tab.getAttribute('ifd') + 1).contentDocument.URL };
          pinNum++;
        });
      } else if (tabEL.hasAttribute('tab-is-pinned')) {
        pins[+tabEL.getAttribute('tab-is-pinned')] = ({ 'url': frmEl.contentDocument.URL });
      } else {
        pins[Object.keys(pins).length + 1] = ({ 'url': frmEl.contentDocument.URL });
        tabEL.setAttribute('tab-is-pinned', Object.keys(pins).length);
        tabEL.classList.add('pin');
      }
      console.log('pin tab modification', frmEl, tabEL);
      localStorage.setItem('ctPins', JSON.stringify(pins))
      this.layoutTabs()
    }
    unpinTab(tabId) {
      let tabEL = document.querySelector(`div[ifd="${+tabId}"]`),
        pins = JSON.parse(localStorage.getItem('ctPins'));
      delete pins[+tabEL.getAttribute('tab-is-pinned')];
      tabEL.removeAttribute('tab-is-pinned');
      tabEL.setAttribute('class', 'chrome-tab');
      let pinNum = 0;
        pins = {};
        this.pinTabEls.forEach(tab => {
          tab.setAttribute('tab-is-pinned', pinNum);
          pins[pinNum] = { 'url': document.getElementById(+tab.getAttribute('ifd') + 1).contentDocument.URL };
          pinNum++;
        });
      localStorage.setItem('ctPins', JSON.stringify(pins))
      this.layoutTabs();
    }
    setupDraggabilly() {
      const tabEls = this.tabEls;
      const tabPositions = this.tabPositions;

      if (this.isDragging) {
        this.isDragging = false;
        this.hypertabContainer.classList.remove("chrome-tabs-is-sorting");
        this.draggabillyDragging.element.classList.remove(
          "chrome-tab-is-dragging"
        );
        this.draggabillyDragging.element.style.transform = "";
        this.draggabillyDragging.dragEnd();
        this.draggabillyDragging.isDragging = false;
        this.draggabillyDragging.positionDrag = noop; // Prevent Draggabilly from updating tabEl.style.transform in later frames
        this.draggabillyDragging.destroy();
        this.draggabillyDragging = null;
      }

      this.draggabillies.forEach((d) => d.destroy());

      tabEls.forEach((tabEl, originalIndex) => {
        const originalTabPositionX = tabPositions[originalIndex];
        const draggabilly = new Draggabilly(tabEl, {
          axis: "x",
          handle: ".chrome-tab-drag-handle",
          containment: this.tabContentEl,
        });

        this.draggabillies.push(draggabilly);

        draggabilly.on("pointerDown", (_) => {
          opencity(+tabEl.getAttribute("ifd") + 1);
          this.setCurrentTab(tabEl);
        });

        draggabilly.on("dragStart", (_) => {
          this.isDragging = true;
          this.draggabillyDragging = draggabilly;
          tabEl.classList.add("chrome-tab-is-dragging");
          this.hypertabContainer.classList.add("chrome-tabs-is-sorting");
        });
        // prob modify this for pinning tabs too
        draggabilly.on("dragEnd", (_) => {
          if (tabEl.hasAttribute('tab-is-pinned')) {
            this.pinTab('update');
          }
          this.isDragging = false;
          const finalTranslateX = parseFloat(tabEl.style.left, 10);
          tabEl.style.transform = `translate3d(0, 0, 0)`;

          // Animate dragged tab back into its place
          requestAnimationFrame((_) => {
            tabEl.style.left = "0";
            tabEl.style.transform = `translate3d(${finalTranslateX}px, 0, 0)`;

            requestAnimationFrame((_) => {
              tabEl.classList.remove("chrome-tab-is-dragging");
              this.hypertabContainer.classList.remove("chrome-tabs-is-sorting");

              tabEl.classList.add("chrome-tab-was-just-dragged");

              requestAnimationFrame((_) => {
                tabEl.style.transform = "";

                this.layoutTabs();
                this.setupDraggabilly();
              });
            });
          });
        });

        draggabilly.on("dragMove", (event, pointer, moveVector) => {
          // Current index be computed within the event since it can change during the dragMove
          const tabEls = this.tabEls;
          const currentIndex = tabEls.indexOf(tabEl);

          const currentTabPositionX = originalTabPositionX + moveVector.x;
          const destinationIndexTarget = closest(
            currentTabPositionX,
            tabPositions
          );
          const destinationIndex = Math.max(
            0,
            Math.min(tabEls.length, destinationIndexTarget)
          );

          if (currentIndex !== destinationIndex) {
            this.animateTabMove(tabEl, currentIndex, destinationIndex);
          }
        });
      });
    }

    animateTabMove(tabEl, originIndex, destinationIndex) {
      if (destinationIndex < originIndex) {
        tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex]);
      } else {
        tabEl.parentNode.insertBefore(tabEl, this.tabEls[destinationIndex + 1]);
      }
      this.emit("tabReorder", { tabEl, originIndex, destinationIndex });
      this.layoutTabs();
    }
  }

  return ChromeTabs;
});
