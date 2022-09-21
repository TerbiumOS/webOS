let notification = document.createElement("div");
function terbiumNotification(icon, author, message, time) {
    notification.className = "notification";
    notification.style.opacity = "0";
    notification.innerHTML = `
        <div class="shape1"></div>
        <div class="shape2"></div>
        <img class='notifAppIcon' src='${icon}'>
        <div class='notification-content'>
            <div class='notification-title'>
                <span class='notification-titleApp'>${author}</span>
            </div>
            <div class="notification-body">
                <span class="notification-body-text">${message}</span>
            </div>
        </div>
    `;
    let height = notification.offsetHeight + "px";
    notification.style.transform = `translateY(${height})`;
    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = `translateX(0)`;
        setTimeout(() => {
            notification.style.opacity = "0";
            notification.style.transform = `translateY(${height})`;
            setTimeout(() => {
                notification.remove();
            }, 200)
        }, time);
    }, 1000);
    document.body.appendChild(notification);
}