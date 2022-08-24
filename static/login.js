let params = {
    count: false,
    letters: false,
    numbers: false,
    special: false,
}

let secureAmount = document.getElementById('secureAmount');
function strengthChecker() {
    let password = document.getElementById('pass').value;
    let strengthMessage = document.getElementById('strengthMessage');
    params.letters = (/[a-z]+/.test(password)) ? true : false;
    params.numbers = (/[0-9]+/.test(password)) ? true : false;
    params.special = (/[!\"$%&/()=?@~`\\.\';:+-^_]+/.test(password)) ? true : false;
    params.count = (password.length > 8) ? true : false;
    
    let strength = Object.values(params).filter(value => value);
    secureAmount.innerHTML = "";
    for(let i in strength) {
        let span = document.createElement('span');
        span.classList.add('secureAmount');
        secureAmount.appendChild(span);
    }
    let spanRef = document.querySelectorAll('.secureAmount');
    for(let i = 0; i < spanRef.length; i++) {
        switch(spanRef.length - 1) {
            case 0:
                spanRef[i].style.backgroundColor = '#ff5c5c';
                strengthMessage.innerHTML = 'Strength: Weak';
                break;
            case 1:
                spanRef[i].style.backgroundColor = '#ffb74d';
                strengthMessage.innerHTML = 'Strength: Medium';
                break;
            case 2:
                spanRef[i].style.backgroundColor = '#ffeb3b';
                strengthMessage.innerHTML = 'Strength: Strong';
                break;
            case 3:
                spanRef[i].style.backgroundColor = '#87f78b';
                strengthMessage.innerHTML = 'Strength: Secure';
                break;
        }
    }
}

function toggle() {
    let password = document.getElementById('pass');
    let eye = document.getElementById('showHide');
    if(password.type === 'password'){
        password.type = 'text';
        eye.querySelector('.eye').querySelector("path").classList.add('showing');
    } else {
        password.type = 'password';
        eye.querySelector('.eye').querySelector("path").classList.remove('showing');
    }
}