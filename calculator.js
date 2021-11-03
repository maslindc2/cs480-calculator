const inputElement = document.querySelector('.input');
const outputElement = document.querySelector('.operation .value');
const resultElement = document.querySelector('.result .value');
const operators = ["+","-","*","/"];
const POWER = "POWER(";

//Stack where operation is displayed on the front end
//Formula is what is used on the backend to solve what the user inputs
let data = {
    operation: [],
    formula: []
}

let ans = 0;

let calculatorButtons = [
    {
        name : "radians",
        symbol : "RAD",
        formula : false,
        type : "key"
    },
    {
        name : "degrees",
        symbol : "DEG",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "mathFunction"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "mathFunction"
    },
    {
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "mathFunction"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "open-curly",
        symbol : "{",
        formula : "{",
        type : "number"
    },
    {
        name : "close-curly",
        symbol : "}",
        formula : "}",
        type : "number"
    },
    {
        name : "open-bracket",
        symbol : "[",
        formula : "[",
        type : "number"
    },
    {
        name : "close-bracket",
        symbol : "]",
        formula : "]",
        type : "number"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trig(Math.cos,",
        type : "trigFunction"
    },
    {
        name : "sin",
        symbol : "sin",
        formula : "trig(Math.sin,",
        type : "trigFunction"
    },
    {
        name : "tan",
        symbol : "tan",
        formula : "trig(Math.tan,",
        type : "trigFunction"
    },
    {
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },
    {
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },
    {
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "invTrig(Math.acos,",
        type : "trigFunction"
    },
    {
        name : "asin",
        symbol : "asin",
        formula : "invTrig(Math.asin,",
        type : "trigFunction"
    },
    {
        name : "atan",
        symbol : "atan",
        formula : "invTrig(Math.atan,",
        type : "trigFunction"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },
    {
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },
    {
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },
    {
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },
    {
        name : "ctg",
        symbol : "ctg",
        formula : "cotangent(",
        type : "trigFunction"
    },
    {
        name : "actg",
        symbol : "actg",
        formula : "arccotangent(",
        type : "trigFunction"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },
    {
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },
    {
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },
    {
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },
    {
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "mathFunction"
    },
    {
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "mathFunction"
    },
    {
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },
    {
        name : "decimal",
        symbol : ".",
        formula : ".",
        type : "number"
    },
    {
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },
    {
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },
    {
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },
];

function createButtons(){
    const buttonsPerRow = 7;
    let addedButtons = 0;
    calculatorButtons.forEach(button => {
        if(addedButtons % buttonsPerRow == 0){
            inputElement.innerHTML += `<div class="row"></div>`;
        }
        const row = document.querySelector(".row:last-child");
        row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`
        addedButtons ++;
    })
}
createButtons();

//Sets default mode to radians
let RADIAN = true;
const radiansButton = document.getElementById("radians")
const degreesButton = document.getElementById("degrees")

//Sets the active mode to RAD button
radiansButton.classList.add("activeAngle");
function angleToggle(){
    radiansButton.classList.toggle("activeAngle");
    degreesButton.classList.toggle("activeAngle");
}

//Listens for click events on all of buttons inside calculator
//Checks to see what clicked button matches calculatorButtons
inputElement.addEventListener("click", event => {
    const targetButton = event.target;
    calculatorButtons.forEach(button => {
        if(button.name == targetButton.id) calculator(button);
    })
})
