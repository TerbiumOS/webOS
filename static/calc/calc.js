const screen = document.querySelector('[screen]');
const screenDef = screen.getAttribute('def');
const screenInput = screen.querySelector('[inputNumber]');
const screenOutput = screen.querySelector('[output]');
const numberButtons = document.querySelectorAll('[numberButton]');
const operatorButtons = document.querySelectorAll('[operator]');
const eqOperator = document.querySelector('[eq]');
const delOperator = document.querySelector('[del]');
const acOperator = document.querySelector('[ac]');
const decimalOperator = document.querySelector('[decimal]');

const betaAlert = localStorage.getItem('betaAlert');
if(betaAlert == null) {
    alert("This is in beta so there may be bugs. Please report any bugs you find to the Github at https://github.com/TerbiumOS/webOS");
    localStorage.setItem('betaAlert', 'true');
}

let operatorKeys = ["+", "-", "*", "/", ".", "(", ")"];

screenInput.value = screenDef;
window.addEventListener("keydown", (e) => {
    if(screenInput.value.length > 23) {
        if(e.key != "Backspace") {
            if(screenInput.style.fontSize == "calc(15px)") return;
        };
        screenInput.style.fontSize = "calc(24px - (1px * " + (screenInput.value.length - 23) + "))";
    }
    if(screenOutput.value != "") {
        if(e.key == "/") {
            e.preventDefault();
            screenInput.value = screenOutput.value + e.key;
            screenOutput.value = "";
            return;
        }
        if(e.key == "*" || e.key == "+" || e.key == "-" || e.key == ".") {
            screenInput.value = screenOutput.value + e.key;
            screenOutput.value = "";
            return;
        }
        if(e.key == "Shift" || e.key == "Alt" || e.key == "Meta") return;
        screenInput.value = ""
        screenOutput.value = ""
        screenOutput.classList.add("cursN");
        screenOutput.classList.remove("cursT");
    };
    if(screenInput.value == screenDef) screenInput.value = "";
    if(e.key == "Alt") return;
    if(e.key == "Backspace") {
        screenInput.value = screenInput.value.slice(0, -1);
    }
    else if(e.key == "=") {
        screenOutput.value = eval(screenInput.value);
        screenOutput.classList.add("cursT");
        screenOutput.classList.remove("cursN");
    } else if(e.key == "Enter") {
        if(screenInput.value == "") return;
        if(operatorKeys.includes(screenInput.value.slice(-1))) return;
        e.preventDefault();
        screenOutput.value = eval(screenInput.value);
        screenOutput.classList.add("cursT");
        screenOutput.classList.remove("cursN");
    }
    else if(e.key == "/") {
        e.preventDefault();
        if(screenOutput.value != "") {
            screenInput.value = screenOutput.value + e.key;
            screenOutput.value = "";
        }
        if(screenInput.value == "") return;
        if(operatorKeys.includes(screenInput.value.slice(-1))) return;
        else if(!isNaN(screenInput.value.slice(-1))) {
            screenInput.value += e.key;
        }
    }
    else if(e.key == "+" || e.key == "-" || e.key == "*" || e.key == ".") {
        if(screenOutput.value != "") {
            screenInput.value = screenOutput.value + e.key;
            screenOutput.value = "";
            return;
        }
        if(screenInput.value == "") return;
        if(operatorKeys.includes(screenInput.value.slice(-1))) return;
        else if(!isNaN(screenInput.value.slice(-1))) {
            screenInput.value += e.key;
        }
    }
    else if(!isNaN(e.key) || e.ctrlKey + e.key == "c" || e.ctrlKey + e.key == "v" || e.ctrlKey + e.key == "x") {
        screenInput.value += e.key;
    }
})
screenInput.onblur = () => {
    if(screenInput.value == "") screenInput.value = screenDef;
    if(screenInput.value != screenDef) {
        let input = screenInput.value;
        let inputArray = input.split("");
        let inputArrayFiltered = inputArray.filter(item => !isNaN(item) || operatorKeys.includes(item));
        if(inputArrayFiltered.length != inputArray.length) {
            screenInput.value = screenDef;
        }
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if(screenInput.value.length > 23) {
            if(screenInput.style.fontSize == "calc(15px)") return;
            screenInput.style.fontSize = "calc(24px - (1px * " + (screenInput.value.length - 23) + "))";
        }
        const value = e.target.getAttribute('number');
        if(screenOutput.value != "") {
            screenInput.value = ""
            screenOutput.value = ""
        };
        if(screenInput.value == screenDef) screenInput.value = "";
        screenInput.value += value;
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if(screenInput.value.length > 23) {
            if(screenInput.style.fontSize == "calc(15px)") return;
            screenInput.style.fontSize = "calc(24px - (1px * " + (screenInput.value.length - 23) + "))";
        }
        const value = e.target.getAttribute('op');
        if(value === "(" || value === ")") {
            if(screenInput.value == screenDef) screenInput.value = "";
            screenInput.value += value;
            return;
        }
        if(screenOutput.value != "") {
            screenInput.value = screenOutput.value + value;
            screenOutput.value = "";
            return;
        }
        if(screenInput.value == "") return;
        if(operatorKeys.includes(screenInput.value.slice(-1))) return;
        if(value === "=") return
        else if(!isNaN(screenInput.value.slice(-1))) {
            screenInput.value += value;
        }
    })
})

decimalOperator.addEventListener('click', (e) => {
    if(screenOutput.value != "") {
        screenInput.value = screenOutput.value + ".";
        screenOutput.value = "";
        return;
    }
    if(screenInput.value == screenDef) screenInput.value = "";
    screenInput.value += ".";
})

eqOperator.addEventListener('click', (e) => {
    let inputAYE = screenInput.value.split("");
    if(inputAYE.includes("(") && inputAYE.includes(")")) {
        let numBefore = "";
        let numBeforeIndex = 0;
        for(let i = inputAYE.indexOf("(") - 1; i >= 0; i--) {
            if(!isNaN(inputAYE[i])) {
                numBefore = inputAYE[i] + numBefore;
                numBeforeIndex = i;
            } else break;
        }

        let numAfter = "";
        let numAfterIndex = 0;
        for(let i = inputAYE.indexOf(")") + 1; i < inputAYE.length; i++) {
            if(!isNaN(inputAYE[i])) {
                numAfter += inputAYE[i];
                numAfterIndex = i;
            } else break;
        }
        let numInside = "";
        for(let i = inputAYE.indexOf("(") + 1; i < inputAYE.indexOf(")"); i++) {
            if(!isNaN(inputAYE[i])) {
                numInside += inputAYE[i];
            }
        }
        // if(numBefore != "" && numInside != "") {
        //     let numBeforeNumInside = numBefore * numInside;
        //     inputAYE.splice(numBeforeIndex, numBefore.length + numInside.length + 2, numBeforeNumInside);
        //     screenInput.value = inputAYE.join("");
        // }
        // if(numAfter != "" && numInside != "") {
        //     let numAfterNumInside = numAfter * numInside;
        //     inputAYE.splice(numAfterIndex - numInside.length, numAfter.length + numInside.length + 2, numAfterNumInside);
        //     let lastVal = inputAYE.join("");
        //     lastVal = lastVal.slice(2);
        //     screenOutput.value = lastVal
        //     return;
        // }

        // this is to make the eval function follow the order of operations when there is an equation inside parenthesis
        let insideEq;
        let doesParensHaveEq = false;
        let solvedParenthesis = [];
        let insideParenthesis = [];
        let insideParenthesisIndex = [];
        let insideParenthesisIndex2 = [];
        for(let i = 0; i < inputAYE.length; i++) {
            if(inputAYE[i] == "(") {
                insideParenthesisIndex.push(i);
            }
            if(inputAYE[i] == ")") {
                insideParenthesisIndex2.push(i);
            }
        }
        for(let i = 0; i < insideParenthesisIndex.length; i++) {
            let inside = "";
            for(let j = insideParenthesisIndex[i] + 1; j < insideParenthesisIndex2[i]; j++) {
                inside += inputAYE[j];
            }
            insideParenthesis.push(inside);
            doesParensHaveEq = true;
            insideEq = insideParenthesis.join("");
        }
        if(doesParensHaveEq == true) {
            solvedParenthesis = eval(insideEq);
            let solvedMutiply;
            // check if solvedMutiply should be solvedParenthesis * numBefore or solvedParenthesis * numAfter
            if(numBefore != "") {
                solvedMutiply = solvedParenthesis * numBefore;
            } else if(numAfter != "") {
                solvedMutiply = solvedParenthesis * numAfter;
            }
            console.log(solvedMutiply);
            screenOutput.value = solvedMutiply;
        }
    }
    if(screenInput.value == "") return;
    if(operatorKeys.includes(screenInput.value.slice(-1))) return;
    screenOutput.value = eval(screenInput.value);
    screenOutput.classList.add("cursT");
    screenOutput.classList.remove("cursN");
})

delOperator.addEventListener('click', (e) => {
    if(screenInput.value.length > 23) {
        if(screenInput.style.fontSize == "calc(23px)") {
            screenInput.style.fontSize = "calc(24px)";
        };
        screenInput.style.fontSize = "calc(24px - (1px * " + (screenInput.value.length - 23) + "))";
    }
    if(screenOutput.value != "") {
        screenInput.value = ""
        screenOutput.value = ""
        screenOutput.classList.add("cursN");
        screenOutput.classList.remove("cursT");
    };
    screenInput.value = screenInput.value.slice(0, -1);
})

acOperator.addEventListener('click', (e) => {
    if(screenInput.style.fontSize != "calc(24px)" || screenInput.style.fontSize != "calc(23px)") screenInput.style.fontSize = "calc(24px)";
    screenInput.value = screenDef;
    screenOutput.value = "";
    screenOutput.classList.add("cursN");
    screenOutput.classList.remove("cursT");
})