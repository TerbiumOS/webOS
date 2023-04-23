const body = document.body;
let termId;
window.addEventListener('message', function (e) {
    const data = JSON.parse(e.data);
    termId = data.id;
});
class xor {
    static encode(str) {
        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    };
    static decode(str) {
        return decodeURIComponent(str.slice(0, -1)).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('');
    };
};
const state = document.querySelector("html").getAttribute("data-state");
const output = document.createElement("div");
const commandBefore = document.createElement("div");
commandBefore.classList.add("commandSection");
// add back the -video command once done
const commands = ["help", "-h", "open", "echo", "logout", "shutdown", "version", "sp", "math", "theme"];
if(state === "new") {
    body.innerHTML = `
    <svg width="612" height="116" class="term" viewBox="0 0 612 116" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="fill" d="M588.558 73.6024L591.623 76.5027L588.66 79.6349L590.542 77.1486C590.825 76.7749 590.811 76.2548 590.507 75.8975L588.558 73.6024Z"/>
        <path class="fill" d="M573.9 96.9413C573.499 96.5618 573.481 95.9288 573.861 95.5277L600.139 67.3712C600.519 66.97 601.152 66.9525 601.553 67.332L610.103 75.4215C610.504 75.801 610.521 76.434 610.142 76.8351L583.863 104.992C583.484 105.393 582.851 105.41 582.45 105.031L573.9 96.9413Z"/>
        <rect class="fill" width="40.2439" height="13.4096" rx="1" transform="matrix(0.725662 0.688052 -0.686502 0.727128 580.593 47.575)"/>
        <mask id="path-4-outside-1_412_6" maskUnits="userSpaceOnUse" x="-3.05176e-05" y="0" width="560" height="116" fill="black">
            <rect fill="white" x="-3.05176e-05" width="560" height="116"/>
            <path d="M35 111.35C33.3431 111.35 32 110.007 32 108.35V26.15C32 24.4932 30.6568 23.15 29 23.15H4.99997C3.34312 23.15 1.99997 21.8069 1.99997 20.15V6.95C1.99997 5.29315 3.34312 3.95 4.99997 3.95H79.25C80.9068 3.95 82.25 5.29315 82.25 6.95V20.15C82.25 21.8069 80.9068 23.15 79.25 23.15H55.25C53.5931 23.15 52.25 24.4932 52.25 26.15V108.35C52.25 110.007 50.9068 111.35 49.25 111.35H35Z"/>
            <path d="M148.998 92.2421C150.541 93.0067 151.133 94.9179 150.177 96.35C146.989 101.122 142.943 105.072 138.039 108.2C132.339 111.9 125.339 113.75 117.039 113.75C111.439 113.75 106.239 112.8 101.439 110.9C96.7394 108.9 92.6394 106.15 89.1394 102.65C85.6394 99.15 82.8894 95.05 80.8894 90.35C78.9894 85.55 78.0394 80.3 78.0394 74.6C78.0394 69.3 78.9894 64.3 80.8894 59.6C82.7894 54.8 85.4394 50.65 88.8394 47.15C92.2394 43.55 96.2394 40.7 100.839 38.6C105.539 36.5 110.689 35.45 116.289 35.45C122.189 35.45 127.439 36.45 132.039 38.45C136.639 40.35 140.489 43.05 143.589 46.55C146.689 49.95 149.039 54 150.639 58.7C152.239 63.4 153.039 68.5 153.039 74C153.039 74.7 153.039 75.3 153.039 75.8C152.939 76.4 152.889 76.95 152.889 77.45V77.45C152.71 78.3487 151.996 79.1 151.08 79.1H100.816C99.0016 79.1 97.5816 80.7072 98.0487 82.4604C98.4821 84.0871 99.0623 85.567 99.7894 86.9C101.089 89 102.639 90.8 104.439 92.3C106.339 93.7 108.389 94.75 110.589 95.45C112.789 96.05 115.039 96.35 117.339 96.35C121.839 96.35 125.539 95.35 128.439 93.35C130.62 91.8238 132.457 90.0335 133.95 87.9792C134.896 86.6784 136.627 86.1135 138.068 86.8274L148.998 92.2421ZM131.83 65.15C132.995 65.15 133.912 64.1492 133.561 63.038C133.338 62.3278 133.03 61.5818 132.639 60.8C131.939 59.2 130.839 57.7 129.339 56.3C127.939 54.9 126.139 53.75 123.939 52.85C121.839 51.95 119.289 51.5 116.289 51.5C112.089 51.5 108.389 52.7 105.189 55.1C102.647 57.0069 100.704 59.5134 99.3611 62.6197C98.8287 63.851 99.792 65.15 101.133 65.15H131.83Z"/>
            <path d="M165.589 40.85C165.589 39.1931 166.932 37.85 168.589 37.85H181.039C182.696 37.85 184.039 39.1931 184.039 40.85V47.3084C184.039 47.718 184.371 48.05 184.781 48.05V48.05C185.062 48.05 185.317 47.8907 185.449 47.6427C186.323 46.0004 187.453 44.4861 188.839 43.1C190.339 41.6 191.989 40.3 193.789 39.2C195.689 38.1 197.689 37.25 199.789 36.65C201.989 36.05 204.139 35.75 206.239 35.75C208.839 35.75 211.039 36 212.839 36.5C214.428 36.9182 215.807 37.4412 216.977 38.0692C217.374 38.2827 217.551 38.7504 217.423 39.1833L212.726 55.1531C212.551 55.7508 211.877 56.0425 211.298 55.8122C210.387 55.4497 209.4 55.1623 208.339 54.95C206.939 54.55 205.189 54.35 203.089 54.35C200.389 54.35 197.939 54.9 195.739 56C193.539 57 191.639 58.45 190.039 60.35C188.539 62.25 187.339 64.5 186.439 67.1C185.639 69.6 185.239 72.35 185.239 75.35V108.35C185.239 110.007 183.896 111.35 182.239 111.35H168.589C166.932 111.35 165.589 110.007 165.589 108.35V40.85Z"/>
            <path d="M227.405 6.95001C227.405 5.29315 228.749 3.95 230.405 3.95H244.055C245.712 3.95 247.055 5.29315 247.055 6.95V36.2L245.945 45.9123C245.897 46.3321 246.226 46.7 246.648 46.7V46.7C246.9 46.7 247.132 46.5653 247.264 46.3503C249.069 43.4002 251.799 40.8668 255.455 38.75C259.255 36.55 263.955 35.45 269.555 35.45C274.255 35.45 278.705 36.45 282.905 38.45C287.205 40.35 290.955 43.05 294.155 46.55C297.455 49.95 300.055 54.05 301.955 58.85C303.855 63.65 304.805 68.9 304.805 74.6C304.805 80.3 303.855 85.55 301.955 90.35C300.055 95.15 297.455 99.3 294.155 102.8C290.955 106.2 287.205 108.9 282.905 110.9C278.705 112.8 274.255 113.75 269.555 113.75C263.955 113.75 259.255 112.65 255.455 110.45C251.81 108.34 249.085 105.815 247.28 102.876C247.138 102.645 246.888 102.5 246.617 102.5V102.5C246.196 102.5 245.855 102.841 245.855 103.262V108.35C245.855 110.007 244.512 111.35 242.855 111.35H230.405C228.749 111.35 227.405 110.007 227.405 108.35V6.95001ZM265.505 95.6C268.105 95.6 270.555 95.1 272.855 94.1C275.255 93.1 277.355 91.7 279.155 89.9C280.955 88.1 282.405 85.9 283.505 83.3C284.605 80.7 285.155 77.8 285.155 74.6C285.155 71.4 284.605 68.5 283.505 65.9C282.405 63.3 280.955 61.1 279.155 59.3C277.355 57.5 275.255 56.1 272.855 55.1C270.555 54.1 268.105 53.6 265.505 53.6C262.905 53.6 260.405 54.1 258.005 55.1C255.705 56 253.655 57.35 251.855 59.15C250.055 60.95 248.605 63.15 247.505 65.75C246.405 68.35 245.855 71.3 245.855 74.6C245.855 77.9 246.405 80.85 247.505 83.45C248.605 86.05 250.055 88.25 251.855 90.05C253.655 91.85 255.705 93.25 258.005 94.25C260.405 95.15 262.905 95.6 265.505 95.6Z"/>
            <path d="M327.564 27.2C325.864 27.2 324.214 26.9 322.614 26.3C321.114 25.6 319.764 24.7 318.564 23.6C317.464 22.4 316.564 21.05 315.864 19.55C315.264 18.05 314.964 16.4 314.964 14.6C314.964 12.8 315.264 11.15 315.864 9.65C316.564 8.15 317.464 6.85 318.564 5.75C319.764 4.55 321.114 3.65 322.614 3.05C324.214 2.35 325.864 2 327.564 2C331.064 2 334.064 3.25 336.564 5.75C339.064 8.15 340.314 11.1 340.314 14.6C340.314 18.1 339.064 21.1 336.564 23.6C334.064 26 331.064 27.2 327.564 27.2ZM320.814 111.35C319.158 111.35 317.814 110.007 317.814 108.35V40.85C317.814 39.1931 319.158 37.85 320.814 37.85H334.464C336.121 37.85 337.464 39.1931 337.464 40.85V108.35C337.464 110.007 336.121 111.35 334.464 111.35H320.814Z"/>
            <path d="M406.283 102.521C406.283 102.095 405.937 101.75 405.511 101.75V101.75C405.245 101.75 404.998 101.888 404.854 102.112C402.578 105.643 399.555 108.472 395.783 110.6C391.883 112.7 387.433 113.75 382.433 113.75C373.133 113.75 366.183 110.9 361.583 105.2C357.083 99.5 354.833 91.9 354.833 82.4V40.85C354.833 39.1931 356.176 37.85 357.833 37.85H371.483C373.14 37.85 374.483 39.1931 374.483 40.85V80C374.483 85.3 375.633 89.25 377.933 91.85C380.333 94.35 383.783 95.6 388.283 95.6C390.983 95.6 393.333 95.05 395.333 93.95C397.433 92.75 399.183 91.2 400.583 89.3C402.083 87.3 403.183 85 403.883 82.4C404.683 79.7 405.083 76.85 405.083 73.85V40.85C405.083 39.1931 406.426 37.85 408.083 37.85H421.733C423.39 37.85 424.733 39.1931 424.733 40.85V108.35C424.733 110.007 423.39 111.35 421.733 111.35H409.283C407.626 111.35 406.283 110.007 406.283 108.35V102.521Z"/>
            <path d="M441.566 40.85C441.566 39.1931 442.909 37.85 444.566 37.85H457.016C458.672 37.85 460.016 39.1931 460.016 40.85V46.6747C460.016 47.1029 460.363 47.45 460.791 47.45V47.45C461.055 47.45 461.301 47.3146 461.447 47.094C463.722 43.6583 466.745 40.877 470.516 38.75C474.516 36.55 478.916 35.45 483.716 35.45C489.316 35.45 494.016 36.75 497.816 39.35C500.423 41.1343 502.513 43.2013 504.085 45.5508C504.987 46.8997 507.143 47.067 508.191 45.8283C510.209 43.4448 512.701 41.3354 515.666 39.5C519.866 36.8 524.966 35.45 530.966 35.45C535.466 35.45 539.366 36.2 542.666 37.7C545.966 39.1 548.666 41.1 550.766 43.7C552.966 46.3 554.616 49.45 555.716 53.15C556.816 56.75 557.366 60.7 557.366 65V108.35C557.366 110.007 556.022 111.35 554.366 111.35H540.716C539.059 111.35 537.716 110.007 537.716 108.35V68.6C537.716 58.6 533.616 53.6 525.416 53.6C522.816 53.6 520.516 54.2 518.516 55.4C516.516 56.5 514.816 58.05 513.416 60.05C512.116 61.95 511.066 64.25 510.266 66.95C509.566 69.65 509.216 72.55 509.216 75.65V108.35C509.216 110.007 507.872 111.35 506.216 111.35H492.566C490.909 111.35 489.566 110.007 489.566 108.35V68.6C489.566 58.6 485.266 53.6 476.666 53.6C474.166 53.6 471.966 54.2 470.066 55.4C468.166 56.5 466.566 58.05 465.266 60.05C463.966 61.95 462.966 64.25 462.266 66.95C461.566 69.65 461.216 72.55 461.216 75.65V108.35C461.216 110.007 459.872 111.35 458.216 111.35H444.566C442.909 111.35 441.566 110.007 441.566 108.35V40.85Z"/>
        </mask>
        <path class="stroke" d="M35 111.35C33.3431 111.35 32 110.007 32 108.35V26.15C32 24.4932 30.6568 23.15 29 23.15H4.99997C3.34312 23.15 1.99997 21.8069 1.99997 20.15V6.95C1.99997 5.29315 3.34312 3.95 4.99997 3.95H79.25C80.9068 3.95 82.25 5.29315 82.25 6.95V20.15C82.25 21.8069 80.9068 23.15 79.25 23.15H55.25C53.5931 23.15 52.25 24.4932 52.25 26.15V108.35C52.25 110.007 50.9068 111.35 49.25 111.35H35Z" stroke-width="4" mask="url(#path-4-outside-1_412_6)"/>
        <path class="stroke" d="M148.998 92.2421C150.541 93.0067 151.133 94.9179 150.177 96.35C146.989 101.122 142.943 105.072 138.039 108.2C132.339 111.9 125.339 113.75 117.039 113.75C111.439 113.75 106.239 112.8 101.439 110.9C96.7394 108.9 92.6394 106.15 89.1394 102.65C85.6394 99.15 82.8894 95.05 80.8894 90.35C78.9894 85.55 78.0394 80.3 78.0394 74.6C78.0394 69.3 78.9894 64.3 80.8894 59.6C82.7894 54.8 85.4394 50.65 88.8394 47.15C92.2394 43.55 96.2394 40.7 100.839 38.6C105.539 36.5 110.689 35.45 116.289 35.45C122.189 35.45 127.439 36.45 132.039 38.45C136.639 40.35 140.489 43.05 143.589 46.55C146.689 49.95 149.039 54 150.639 58.7C152.239 63.4 153.039 68.5 153.039 74C153.039 74.7 153.039 75.3 153.039 75.8C152.939 76.4 152.889 76.95 152.889 77.45V77.45C152.71 78.3487 151.996 79.1 151.08 79.1H100.816C99.0016 79.1 97.5816 80.7072 98.0487 82.4604C98.4821 84.0871 99.0623 85.567 99.7894 86.9C101.089 89 102.639 90.8 104.439 92.3C106.339 93.7 108.389 94.75 110.589 95.45C112.789 96.05 115.039 96.35 117.339 96.35C121.839 96.35 125.539 95.35 128.439 93.35C130.62 91.8238 132.457 90.0335 133.95 87.9792C134.896 86.6784 136.627 86.1135 138.068 86.8274L148.998 92.2421ZM131.83 65.15C132.995 65.15 133.912 64.1492 133.561 63.038C133.338 62.3278 133.03 61.5818 132.639 60.8C131.939 59.2 130.839 57.7 129.339 56.3C127.939 54.9 126.139 53.75 123.939 52.85C121.839 51.95 119.289 51.5 116.289 51.5C112.089 51.5 108.389 52.7 105.189 55.1C102.647 57.0069 100.704 59.5134 99.3611 62.6197C98.8287 63.851 99.792 65.15 101.133 65.15H131.83Z" stroke-width="4" mask="url(#path-4-outside-1_412_6)"/>
        <path class="stroke" d="M165.589 40.85C165.589 39.1931 166.932 37.85 168.589 37.85H181.039C182.696 37.85 184.039 39.1931 184.039 40.85V47.3084C184.039 47.718 184.371 48.05 184.781 48.05V48.05C185.062 48.05 185.317 47.8907 185.449 47.6427C186.323 46.0004 187.453 44.4861 188.839 43.1C190.339 41.6 191.989 40.3 193.789 39.2C195.689 38.1 197.689 37.25 199.789 36.65C201.989 36.05 204.139 35.75 206.239 35.75C208.839 35.75 211.039 36 212.839 36.5C214.428 36.9182 215.807 37.4412 216.977 38.0692C217.374 38.2827 217.551 38.7504 217.423 39.1833L212.726 55.1531C212.551 55.7508 211.877 56.0425 211.298 55.8122C210.387 55.4497 209.4 55.1623 208.339 54.95C206.939 54.55 205.189 54.35 203.089 54.35C200.389 54.35 197.939 54.9 195.739 56C193.539 57 191.639 58.45 190.039 60.35C188.539 62.25 187.339 64.5 186.439 67.1C185.639 69.6 185.239 72.35 185.239 75.35V108.35C185.239 110.007 183.896 111.35 182.239 111.35H168.589C166.932 111.35 165.589 110.007 165.589 108.35V40.85Z" stroke-width="4" mask="url(#path-4-outside-1_412_6)"/>
        <path class="stroke" d="M227.405 6.95001C227.405 5.29315 228.749 3.95 230.405 3.95H244.055C245.712 3.95 247.055 5.29315 247.055 6.95V36.2L245.945 45.9123C245.897 46.3321 246.226 46.7 246.648 46.7V46.7C246.9 46.7 247.132 46.5653 247.264 46.3503C249.069 43.4002 251.799 40.8668 255.455 38.75C259.255 36.55 263.955 35.45 269.555 35.45C274.255 35.45 278.705 36.45 282.905 38.45C287.205 40.35 290.955 43.05 294.155 46.55C297.455 49.95 300.055 54.05 301.955 58.85C303.855 63.65 304.805 68.9 304.805 74.6C304.805 80.3 303.855 85.55 301.955 90.35C300.055 95.15 297.455 99.3 294.155 102.8C290.955 106.2 287.205 108.9 282.905 110.9C278.705 112.8 274.255 113.75 269.555 113.75C263.955 113.75 259.255 112.65 255.455 110.45C251.81 108.34 249.085 105.815 247.28 102.876C247.138 102.645 246.888 102.5 246.617 102.5V102.5C246.196 102.5 245.855 102.841 245.855 103.262V108.35C245.855 110.007 244.512 111.35 242.855 111.35H230.405C228.749 111.35 227.405 110.007 227.405 108.35V6.95001ZM265.505 95.6C268.105 95.6 270.555 95.1 272.855 94.1C275.255 93.1 277.355 91.7 279.155 89.9C280.955 88.1 282.405 85.9 283.505 83.3C284.605 80.7 285.155 77.8 285.155 74.6C285.155 71.4 284.605 68.5 283.505 65.9C282.405 63.3 280.955 61.1 279.155 59.3C277.355 57.5 275.255 56.1 272.855 55.1C270.555 54.1 268.105 53.6 265.505 53.6C262.905 53.6 260.405 54.1 258.005 55.1C255.705 56 253.655 57.35 251.855 59.15C250.055 60.95 248.605 63.15 247.505 65.75C246.405 68.35 245.855 71.3 245.855 74.6C245.855 77.9 246.405 80.85 247.505 83.45C248.605 86.05 250.055 88.25 251.855 90.05C253.655 91.85 255.705 93.25 258.005 94.25C260.405 95.15 262.905 95.6 265.505 95.6Z" stroke-width="4" mask="url(#path-4-outside-1_412_6)"/>
        <path class="stroke" d="M327.564 27.2C325.864 27.2 324.214 26.9 322.614 26.3C321.114 25.6 319.764 24.7 318.564 23.6C317.464 22.4 316.564 21.05 315.864 19.55C315.264 18.05 314.964 16.4 314.964 14.6C314.964 12.8 315.264 11.15 315.864 9.65C316.564 8.15 317.464 6.85 318.564 5.75C319.764 4.55 321.114 3.65 322.614 3.05C324.214 2.35 325.864 2 327.564 2C331.064 2 334.064 3.25 336.564 5.75C339.064 8.15 340.314 11.1 340.314 14.6C340.314 18.1 339.064 21.1 336.564 23.6C334.064 26 331.064 27.2 327.564 27.2ZM320.814 111.35C319.158 111.35 317.814 110.007 317.814 108.35V40.85C317.814 39.1931 319.158 37.85 320.814 37.85H334.464C336.121 37.85 337.464 39.1931 337.464 40.85V108.35C337.464 110.007 336.121 111.35 334.464 111.35H320.814Z" stroke-width="4" mask="url(#path-4-outside-1_412_6)"/>
        <path class="stroke" d="M406.283 102.521C406.283 102.095 405.937 101.75 405.511 101.75V101.75C405.245 101.75 404.998 101.888 404.854 102.112C402.578 105.643 399.555 108.472 395.783 110.6C391.883 112.7 387.433 113.75 382.433 113.75C373.133 113.75 366.183 110.9 361.583 105.2C357.083 99.5 354.833 91.9 354.833 82.4V40.85C354.833 39.1931 356.176 37.85 357.833 37.85H371.483C373.14 37.85 374.483 39.1931 374.483 40.85V80C374.483 85.3 375.633 89.25 377.933 91.85C380.333 94.35 383.783 95.6 388.283 95.6C390.983 95.6 393.333 95.05 395.333 93.95C397.433 92.75 399.183 91.2 400.583 89.3C402.083 87.3 403.183 85 403.883 82.4C404.683 79.7 405.083 76.85 405.083 73.85V40.85C405.083 39.1931 406.426 37.85 408.083 37.85H421.733C423.39 37.85 424.733 39.1931 424.733 40.85V108.35C424.733 110.007 423.39 111.35 421.733 111.35H409.283C407.626 111.35 406.283 110.007 406.283 108.35V102.521Z" stroke-width="4" mask="url(#path-4-outside-1_412_6)"/>
        <path class="stroke" d="M441.566 40.85C441.566 39.1931 442.909 37.85 444.566 37.85H457.016C458.672 37.85 460.016 39.1931 460.016 40.85V46.6747C460.016 47.1029 460.363 47.45 460.791 47.45V47.45C461.055 47.45 461.301 47.3146 461.447 47.094C463.722 43.6583 466.745 40.877 470.516 38.75C474.516 36.55 478.916 35.45 483.716 35.45C489.316 35.45 494.016 36.75 497.816 39.35C500.423 41.1343 502.513 43.2013 504.085 45.5508C504.987 46.8997 507.143 47.067 508.191 45.8283C510.209 43.4448 512.701 41.3354 515.666 39.5C519.866 36.8 524.966 35.45 530.966 35.45C535.466 35.45 539.366 36.2 542.666 37.7C545.966 39.1 548.666 41.1 550.766 43.7C552.966 46.3 554.616 49.45 555.716 53.15C556.816 56.75 557.366 60.7 557.366 65V108.35C557.366 110.007 556.022 111.35 554.366 111.35H540.716C539.059 111.35 537.716 110.007 537.716 108.35V68.6C537.716 58.6 533.616 53.6 525.416 53.6C522.816 53.6 520.516 54.2 518.516 55.4C516.516 56.5 514.816 58.05 513.416 60.05C512.116 61.95 511.066 64.25 510.266 66.95C509.566 69.65 509.216 72.55 509.216 75.65V108.35C509.216 110.007 507.872 111.35 506.216 111.35H492.566C490.909 111.35 489.566 110.007 489.566 108.35V68.6C489.566 58.6 485.266 53.6 476.666 53.6C474.166 53.6 471.966 54.2 470.066 55.4C468.166 56.5 466.566 58.05 465.266 60.05C463.966 61.95 462.966 64.25 462.266 66.95C461.566 69.65 461.216 72.55 461.216 75.65V108.35C461.216 110.007 459.872 111.35 458.216 111.35H444.566C442.909 111.35 441.566 110.007 441.566 108.35V40.85Z" stroke-width="4" mask="url(#path-4-outside-1_412_6)"/>
    </svg>
    <div class="termin"></div>
    `;
    document.querySelector(".termin").innerHTML = `
        <div style="line-height: 1.6;">
            Welcome to the Terbium Terminal type <code class="command">help</code> for available commands and keybindings or<br> <code class="command">-h <mark class="codeMark">command</mark></code> for a commands usage.
        </div>
        <div class="linebreak"></div>
        <div class="warning">
            The Terminal is in beta and may not work as expected or may not have all the features planned, read the changelog for more info
        </div>
        <div class="linebreak"></div>
    `
    commandBefore.innerHTML = `
        <p>Terbium:</p><div class="commandP" contentEditable spellcheck="false"></div>
    `;
    document.querySelector(".termin").appendChild(commandBefore);
    document.querySelector("html").setAttribute("data-state", "old");
}

const command = commandBefore.querySelector(".commandP");

command.addEventListener("keydown", (e) => {
    let commandHistoryElement = document.querySelector(".commandHistory");
    if (!commandHistoryElement) {
        commandHistoryElement = document.createElement("div");
        commandHistoryElement.classList.add("commandHistory");
        commandHistoryElement.classList.add("hidden");
        commandHistoryElement.innerHTML = `
            <button style="position: absolute;right: 10px;top: 10px;">Close</button>
            <h3 style="position: absolute;left: 50%;transform: translateX(-50%);">Command History</h3>
            <div class="command-container"></div>
        `;
        commandHistoryElement.querySelector("button").addEventListener("click", () => {
            commandHistoryElement.classList.toggle("hidden");
            document.querySelector("html").style.overflow = "";
        });
        body.appendChild(commandHistoryElement);
    }
    if (e.key === "Enter") {
        const newCommand = command.innerText;
        commandHistoryElement.querySelector(".command-container").innerHTML += `
            <div class="commandP commandChild">${newCommand}</div>
        `;
        e.preventDefault();
        output.innerHTML = "";
        if(command.textContent.split(" ")[0] === "help") {
            output.innerHTML = `
                <p>Available commands & keybindings:</p>
                <h3>Commands</h3>
                <p><code class="command">sp</code> --> Set a new password or leave it blank to remove it</p>
                <p><code class="command">open</code> --> Opens your specified app that is available by url loading</p>
                <p><code class="command">help</code> --> this command</p>
                <p><code class="command">-h</code> --> Shows the usage of a command</p>
                <p><code class="command">echo</code> --> echo your text</p>
                <p><code class="command">logout</code> --> logout/restart of Terbium</p>
                <p><code class="command">shutdown</code> --> shutdown Terbium</p>
                <p><code class="command">math</code> --> Do some math</p>
                <p><code class="command">theme</code> --> Change the theme</p>
                <div class="linebreak"></div>
                <h3>Keybindings</h3>
                <p><code class="command">Ctrl + L</code> --> Clear the terminal</p>
                <p><code class="command">Escape</code> --> Clear the command</p>
                <p><code class="command">Ctrl + H</code> --> Show previous commands</p>
            `;
        }
        const availableCommands = ["sp", "open", "help", "-h", "echo", "logout", "shutdown", "math", "theme"];
        if(!availableCommands.includes(command.textContent.split(" ")[0])) {
            output.innerHTML = `
                <p>Command not found</p>
                <div class="linebreak"></div>
            `;
        }
        if(command.textContent.split(" ")[0] === "theme") {
            const availableThemes = ["dark", "night", "fracital", "almond"];
            if(!availableThemes.includes(command.textContent.split(" ")[1])) {
                output.innerHTML = `
                    <p>Theme not found</p>
                    <div class="linebreak"></div>
                `;
            }
            if(command.textContent.split(" ")[1] === "" || !command.textContent.split(" ")[1]) {
                output.innerHTML = `
                    <p>Missing argument <code class="command">theme name</code></p>
                    <div class="linebreak"></div>
                `;
            }
            if(availableThemes.includes(command.textContent.split(" ")[1])) {
                if(command.textContent.split(" ")[1] === document.querySelector("html").getAttribute("data-theme")) {
                    output.innerHTML = `
                        <p>Theme is already set to <code class="command">${command.textContent.split(" ")[1]}</code></p>
                        <div class="linebreak"></div>
                    `;
                    return
                }
                document.querySelector("html").setAttribute("data-theme", command.textContent.split(" ")[1]);
                localStorage.setItem("theme", command.textContent.split(" ")[1]);
                window.parent.document.querySelector("html").setAttribute("data-theme", command.textContent.split(" ")[1]);
                const win = window.parent.document.querySelectorAll(".win");
                for(let i = 0; i < win.length; i++) {
                    const element = win[i];
                    element.querySelector("iframe").contentWindow.document.querySelector("html").setAttribute("data-theme", command.textContent.split(" ")[1]);
                }
                output.innerHTML = `
                    <p>Theme changed to <code class="command">${command.textContent.split(" ")[1]}</code></p>
                    <div class="linebreak"></div>
                `;
            }
        }
        if(command.textContent.split(" ")[0] === "echo") {
            const text = command.textContent.split(" ").slice(1).join(" ");
            output.innerHTML = `
                <p>${text}</p>
                <div class="linebreak"></div>
            `;
        }
        if(command.textContent.split(" ")[0] === "-h") {
            if(command.textContent.split(" ")[1]) {
                if(availableCommands.includes(command.textContent.split(" ")[1])) {

                    const lastArg = command.textContent.split(" ")[1];
                    if(lastArg === "sp") {
                        output.innerHTML = `
                            <p>Set a new password or leave it blank to remove it</p>
                            <p>Usage: <code class="command">sp <mark class="codeMark">new password</mark></code></p>
                        `;
                    }
                    if(lastArg === "open") {
                        output.innerHTML = `
                            <p>Opens your specified app that is available by url loading</p>
                            <p>Usage: <code class="command">open <mark class="codeMark">app name</mark></code></p>
                        `;
                    }
                    if(lastArg === "help") {
                        output.innerHTML = `
                            <p>Shows this help message</p>
                            <p>Usage: <code class="command">help</code></p>
                        `;
                    }
                    if(lastArg === "echo") {
                        output.innerHTML = `
                            <p>Echo your text</p>
                            <p>Usage: <code class="command">echo <mark class="codeMark">text to be echoed</mark></code></p>
                        `;
                    }
                    if(lastArg === "logout") {
                        output.innerHTML = `
                            <p>Logout/restart of Terbium</p>
                            <p>Usage: <code class="command">logout</code></p>
                        `;
                    }
                    if(lastArg === "shutdown") {
                        output.innerHTML = `
                            <p>Shutdown Terbium</p>
                            <p>Usage: <code class="command">shutdown</code></p>
                        `;
                    }
                    if(lastArg === "math") {
                        output.innerHTML = `
                            <p>Calculate math</p>
                            <p>Usage: <code class="command">math <mark class="codeMark">2+2</mark></code></p>
                            <p>This will return 4</p>
                        `;
                    }
                    if(lastArg === "theme") {
                        output.innerHTML = `
                            <p>Change the theme</p>
                            <p>Usage: <code class="command">theme <mark class="codeMark">theme name</mark></code></p>
                            <p class="extraSpace">Available themes: <code class="command">dark</code>, <code class="command">night</code>, <code class="command">fracital</code></p>
                        `;
                    }
                } else {
                    output.innerHTML = `
                        <p>Command <code class="command">${command.textContent.split(" ")[1]}</code> not found</p>
                    `;
                }
            } else {
                output.innerHTML = `
                    <p>Missing argument <code>command</code</p>
                `;
            }
        }
        if(command.textContent.split(" ")[0] === ("logout")) {
            if(localStorage.getItem("pass") === null || localStorage.getItem("pass") === "none") {
                const password = prompt("Would you like to set a password? (y/n)");
                if(password === "y") {
                    const newPassword = prompt("What would you like your password to be?");
                    localStorage.setItem("pass", xor.encode(newPassword));
                    output.innerHTML = `
                        <p>Password set</p>
                        <div class="linebreak"></div>
                    `;
                } else {
                    output.innerHTML = `
                        <p>Ok</p>
                        <div class="linebreak"></div>
                    `;
                }
            } else {
                window.parent.window.location.reload();
            }
        }
        if(command.textContent.split(" ")[0] === ("shutdown")) {
            window.parent.window.open(localStorage.getItem("powd"), "_self");
        }
        if(command.textContent.split(" ")[0] === ("version")) {
            output.innerHTML = `
                <p>Terbium Version: ${version}</p>
                <div class="linebreak"></div>
            `;
        }
        let message;
        if(command.textContent.split(" ")[0] === ("open")) {
            const text = command.textContent.split(" ").slice(1).join(" ");
            const url = window.location.href.split("/")[2].split(".")[0];
            let apps = ["cmd", "terminal", "video", "canvas", "color", "help", "changelog", "settings", "yt", "code", "text", "browser", "image", "discord", "ruffle", "calc", "tiktok"];
            let message;
            if(apps.includes(text)) {
                switch(text) {
                    case "cmd" || "terminal":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../terminal/terminal.html]",
                                icon: "(icon)[../resources/terminal.svg]",
                                title: "(title)[Terbium Terminal]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[terminal]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "video":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../player/player.html]",
                                icon: "(icon)[../resources/video.svg]",
                                title: "(title)[Terbium Player]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[player]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "canvas":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../canvas/canvas.html]",
                                icon: "(icon)[../resources/canvas.svg]",
                                title: "(title)[Terbium Canvas]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[canvas]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "color":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../color/color.html]",
                                icon: "(icon)[../resources/color.svg]",
                                title: "(title)[Terbium Color]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[color]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "help":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../resources/help.svg]",
                                icon: "(icon)[../resources/help.svg]",
                                title: "(title)[Terbium Help]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[help]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "changelog":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../changes/index.html]",
                                icon: "(icon)[../resources/changelog.svg]",
                                title: "(title)[Terbium Changelog]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[changelog]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "settings":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../settings.html]",
                                icon: "(icon)[../resources/settings.svg]",
                                title: "(title)[Terbium Settings]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[settings]",
                                oneInstance: "(oneInstance)[true]"
                            }
                        })
                    break;
                    case "yt" || "youtube":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[https://youtube.com]",
                                icon: "(icon)[../resources/yt.png]",
                                title: "(title)[YouTube]",
                                os: "(os)[false]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[youtube]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "code":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[https://vscode.dev]",
                                icon: "(icon)[../resources/vsc.ico]",
                                title: "(title)[Visual Studio Code]",
                                os: "(os)[false]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[code]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "text":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../textEditor/editor.html]",
                                icon: "(icon)[../resources/text.svg]",
                                title: "(title)[Terbium Text Editor]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[text]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "browser":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[./hypertabs/index.html]",
                                icon: "(icon)[../resources/browser.svg]",
                                title: "(title)[Terbium Browser]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[browser]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "image":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../image/image.html]",
                                icon: "(icon)[../resources/image.svg]",
                                title: "(title)[Terbium Image Viewer]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[image]",
                                urlToOpen: `(urlToOpen)[undefined]`,
                                textAppText: `(textAppText)[undefined]`,
                                controlsTypes: `(controls)[all]`,
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "discord":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[https://discord.com]",
                                icon: "(icon)[../resources/discord.png]",
                                title: "(title)[Discord]",
                                os: "(os)[false]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[discord]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "ruffle":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../ruffle/ruffle.html]",
                                icon: "(icon)[../resources/ruffle.png]",
                                title: "(title)[Ruffle]",
                                os: "(os)[false]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[ruffle]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "calc":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[../calc/calc.html]",
                                icon: "(icon)[../resources/calc.svg]",
                                title: "(title)[Terbium Calculator]",
                                os: "(os)[true]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[calc]",
                                controlsTypes: `(controls)[close]`,
                                resizable: `(resizable)[false]`,
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                    case "tiktok":
                        message = JSON.stringify({
                            type: "newWindow",
                            fields: {
                                link: "(link)[https://tiktok.com]",
                                icon: "(icon)[../resources/tiktok.png]",
                                title: "(title)[TikTok]",
                                os: "(os)[false]",
                                fullscreen: "(fullscreen)[false]",
                                appName: "(appName)[tiktok]",
                                oneInstance: "(oneInstance)[false]"
                            }
                        })
                    break;
                }
                window.parent.postMessage(message, "*");
            } else if(text.startsWith("http://") || text.startsWith("https://")) {
                message = JSON.stringify({
                    type: "newWindow",
                    fields: {
                        link: "(link)[./hypertabs/index.html]",
                        icon: "(icn)[../resources/browser.svg]",
                        title: "(title)[Terbium Browser]",
                        os: "(os)[true]",
                        fullscreen: "(fs)[false]",
                        appName: "(appname)[browser]",
                        urlToOpen: `(urlToOpen)[${text}]`
                    }
                })
                window.parent.postMessage(message, "*");
            } else if(text == "" || !text.startsWith("http://") || !text.startsWith("https://")) {
                output.innerHTML = `
                    <p>Missing argument <code>app</code></p>
                    <div class="linebreak"></div>
                `;
            } else {
                output.innerHTML = `
                    <p><code>${text}</code> was not found, check the name</p>
                    <div class="linebreak"></div>
                `;
            }
        }
        if(command.textContent.split(" ")[0] === ("sp")) {
            const text = command.textContent.split(" ").slice(1).join(" ");
            if(text === "none" || text === "") {
                localStorage.setItem("pass", "none");
                if(window.parent.document.querySelector(".logout")) {
                    window.parent.document.querySelector(".logout").remove();
                }
                output.innerHTML = `
                    <p>Password removed</p>
                    <div class="linebreak"></div>
                `;
            } else {
                localStorage.setItem("pass", xor.encode(text));
                const logoutHolder = document.createElement("div");
                logoutHolder.classList.add("sys");
                logoutHolder.classList.add("logout");
                logoutHolder.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="sysicon" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 12h14l-3 -3m0 6l3 -3" />
                    </svg>
                `;
                window.parent.document.querySelector(".sysc").appendChild(logoutHolder);
                output.innerHTML = `
                    <p>Password set</p>
                    <div class="linebreak"></div>
                `;
            }
        }
        if(command.textContent.split(" ")[0] === ("math")) {
            const text = command.textContent.split(" ").slice(1).join(" ");
            if(text === "") {
                output.innerHTML = `
                    <p>Missing argument <code>math</code></p>
                    <div class="linebreak"></div>
                `;
            } else {
                try {
                    output.innerHTML = `
                        <p>${text} = <code>${eval(text)}</code></p>
                        <div class="linebreak"></div>
                    `;
                } catch(e) {
                    output.innerHTML = `
                        <p>Invalid math</p>
                        <div class="linebreak"></div>
                    `;
                }
            }
        }
        if(command.textContent.split(" ")[0] === ("-video")) {
            const text = command.textContent.split(" ").slice(1).join(" "); 
            if(text === "" || !text.includes("https://" || "http://")) {
                output.innerHTML = `
                    <p>Missing argument <code>video url</code></p>
                    <div class="linebreak"></div>
                `;
            }
            if(text.includes("https://" || "http://")) {
                const url = text.split("://")[1];
                if(url) {
                    const dots = document.querySelector(".dots");
                    if(!dots) {
                        output.innerHTML = `
                            <p>Testing connection<p class="dots">...</p></p>
                            <div class="linebreak"></div>
                        `;
                    }
                    const loadingINT = setInterval(() => {
                        if(output.querySelector(".dots").textContent.length < 3) {
                            output.querySelector(".dots").textContent += ".";
                        } else {
                            output.querySelector(".dots").textContent = "";
                        }
                    }, 500)
                    setTimeout(() => {
                        const xhr = new XMLHttpRequest();
                        xhr.open("GET", text, true);
                        xhr.send();
                        xhr.onreadystatechange = function() {
                            if(xhr.readyState === 4) {
                                console.log(xhr.status);
                                if(xhr.status === 200) {
                                    clearInterval(loadingINT);
                                    output.innerHTML = `
                                        <p>the video player is now playing <code>${text}</code></p>
                                        <div class="linebreak"></div>
                                    `;
                                } else if(xhr.status === 404) {
                                    clearInterval(loadingINT);
                                    output.innerHTML = `
                                        <p>Invalid video url</p>
                                        <div class="linebreak"></div>
                                    `;
                                };
                            };
                        };
                    });
                if(text.startsWith("https://imgur.com/")) {
                    console.log(text);
                    const iframe = document.createElement("iframe");
                    iframe.style.display = "none";
                    iframe.src = "sw" + "/" + xor.encode(text);
                    document.body.appendChild(iframe);
                    const post = iframe.contentDocument.querySelector(".PostVideo-video-wrapper").querySelector("video").querySelector("source").src;
                    if(post) {
                        output.innerHTML = `
                            <p>the video player is now playing <code>${post}</code></p>
                            <div class="linebreak"></div>
                        `;
                    } else {
                        console.log("no video");
                    }
                }
                const message = JSON.stringify({
                    videoLink: text,
                });
                window.parent.postMessage(message, '*');
                }
            }
        }
        command.innerHTML = "";
    } else if (e.key === "Escape") {
        e.preventDefault();
        command.innerHTML = "";
    } else if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        output.innerHTML = "";
    } else if(e.key === "Tab") {
        e.preventDefault();
        const commandArray = command.textContent.split(" ");
        if(commandArray.length === 1) {
            const text1 = command.textContent.split(" ")[0];
            for(let i = 0; i < commands.length; i++) {
                if(commands[i].startsWith(text1)) {
                    command.innerHTML = commands[i];
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.setStart(command.childNodes[0], command.textContent.length);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if(commandArray.length === 2) {
            const text1 = command.textContent.split(" ")[0];
            const text2 = command.textContent.split(" ")[1];
            if(text1 === "open") {
                let apps = ["cmd", "terminal", "video", "canvas", "color", "help", "changelog", "settings", "yt", "code", "text", "browser", "image"];
                for(let i = 0; i < apps.length; i++) {
                    if(apps[i].startsWith(text2)) {
                        command.innerHTML = `open ${apps[i]}`;
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.setStart(command.childNodes[0], command.textContent.length);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } 
            
            if(text1 === "-h") {
                let comms = ["help", "open", "echo", "logout", "shutdown", "version", "sp", "math", "theme"];
                for(let i = 0; i < comms.length; i++) {
                    if(comms[i].startsWith(text2)) {
                        command.innerHTML = `-h ${comms[i]}`;
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.setStart(command.childNodes[0], command.textContent.length);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            }

            if(text1 === "theme") {
                let themes = ["night", "dark", "fracital", "almond"];
                for(let i = 0; i < themes.length; i++) {
                    if(themes[i].startsWith(text2)) {
                        command.innerHTML = `theme ${themes[i]}`;
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.setStart(command.childNodes[0], command.textContent.length);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            }
        }
    } else if(e.ctrlKey && e.key === "h") {
        e.preventDefault();
        let commandContainer = document.querySelector(".command-container");
        commandHistoryElement.classList.toggle("hidden");
        if(commandHistoryElement.classList.contains("hidden")) {
            document.querySelector("html").style.overflow = "";
        } else {
            document.querySelector("html").style.overflow = "hidden";
        }
        for(let i = 0; i < commandContainer.children.length; i++) {
            commandContainer.children[i].addEventListener("click", function() {
                command.innerHTML = this.textContent;
                const range = document.createRange();
                const sel = window.getSelection();
                range.setStart(command.childNodes[0], command.textContent.length);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                commandHistoryElement.classList.toggle("hidden");
                document.querySelector("html").style.overflow = "";
            });
        }
    }
    document.querySelector(".termin").appendChild(output);
    output.classList.add("output");
})

window.addEventListener("load", function(e) {
    command.focus();
});

window.addEventListener("click", function(e) {
    command.focus();
})

function getCaretCoordinates() {
    let x = 0,
    y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
            const range = selection.getRangeAt(0).cloneRange();
            range.collapse(true);
            const rect = range.getClientRects()[0];
            if (rect) {
                x = rect.left;
                y = rect.top;
            }
        }
    }
  return { x, y };
}

function getCaretIndex(element) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
            const range = window.getSelection().getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            position = preCaretRange.toString().length;
        }
    }
    return position;
}

function getCursorPosition() {
    let pos = 0;
    const sel = window.getSelection();
    if (sel.rangeCount) {
        const range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == command) {
            pos = range.endOffset;
        }
    }
    return pos;
}

window.getCaretCoordinates = getCaretCoordinates;
window.getCaretIndex = getCaretIndex;
window.getCursorPosition = getCursorPosition;

window.onmousedown = (e) => {
    if(e.button === 2) {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            output.innerHTML = `
                <p>Firefox sadly won't allow clipboard reading :(</p>
                <div class="linebreak"></div>
            `;
            document.querySelector(".termin").appendChild(output);
        } else {
            navigator.clipboard.readText().then(clipText => {
                command.innerHTML = command.textContent + clipText;
            });
        }
    }
}