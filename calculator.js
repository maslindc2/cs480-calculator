const inputElement = document.querySelector('.input');
const outputElement = document.querySelector('.operation .value');
const resultElement = document.querySelector('.result .value');
const operators = ["+","-","*","/"];
const POWER = "POWER(";

//Stack where operation is displayed on the front end
//Formula is what is used on the backend to solve what the user inputs
let data = {operation: [], formula: []}
let answer = 0;

//Used for storing all the buttons (symbol, operation and formula) for each button
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

//Creates all the buttons using calculatorButtons array
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

//Handles trignometric operations from degrees to radians when degree mode is set
function trig(callback, angle){
    //If in degrees mode convert the angle into radians for correct calculation
    if(!RADIAN){
        angle = angle * Math.PI/180
    }
    //Send to eval in calculator function
    return callback(angle);
}
//Handles converting of inverse trignometric operations from degrees to radians when degree mode is set
function invTrig(callback, value){
    let angle= callback(value);
    if(!RADIAN){
        angle = angle * 180/Math.PI;
    }
    return angle;
}

/**These functions hanle cotangent and arccotangent.
 * Since the built in Math object does not support ctg or actg, I had to make my own
 */
function cotangent(angle) {
    if(!RADIAN){
        angle = angle * (Math.PI/180)
    }
    return 1/Math.tan(angle);
}
function arccotangent(angle){
    if(!RADIAN){
        angle = angle * (Math.PI/180)
    }
    //Selects the correct calculation of arccotangent depending on the angle size
    if (angle > 1) {
        return Math.atan(1/angle);
    }else if(angle < -1){
        return Math.PI + Math.atan(1/angle);
    }else{
        return Math.PI - Math.atan(angle);
    }    
}
// Calculator function handles all functionality of the buttons
function calculator(button) {

    //If the button is an operator push the operator to formula and operation
    if(button.type == "operator"){
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    //If button is a number push number to formula and operation
    }else if(button.type == "number"){
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    //If button is a trig operation push to formula and oepration with open paren
    }else if(button.type == "trigFunction"){
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);
    
    //If the button is a math function 
    }else if(button.type == "mathFunction"){
        let symbol, formula;
        //If power add ^( sign to operation add the formula from calculatorButtons to formula stack
        if (button.name == "power") {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        //Square add ^( sign as well as to the power of 2
        }else if(button.name == "square"){
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2)");
            data.formula.push("2)");
        }else{
            symbol = button.symbol + "(";;
            formula = button.formula + "(";
            data.operation.push(symbol);
            data.formula.push(formula);
        }
    //If the button is a key
    }else if(button.type == "key"){
        //If its clear both stacks and set the result to 0 (resets it to how the page loads initially)
        if(button.name == "clear"){
            data.operation = [];
            data.formula = [];
            updateOutputResult(0);
        //When delete button is pressed pop the symbol from both formula and operation
        }else if(button.name == "delete"){
            data.operation.pop();
            data.formula.pop();
        //If Radians is pushed call angleToggle to switch the mode
        }else if(button.name == "radians"){
            RADIAN = true;
            angleToggle();
        //If degrees is pushed set RAIDAN to false and switch the mode
        }else if(button.name == "degrees"){
            RADIAN = false;
            angleToggle();
        }
    //If calculate is pushed
    }else if (button.type == "calculate") {
        formulaStr = data.formula.join('');
        //Searches for exponents
        let powerResult = search(data.formula, POWER);
        //Searches for bases of exponents
        const bases = powerBaseFinder(data.formula, powerResult);
        bases.forEach( base => {
            let toReplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";
            formulaStr = formulaStr.replace(toReplace, replacement);
        })
        
        //Attempt to calculate the result
        let result;
        try{
            result = eval(formulaStr);
        }catch(error){
            if(error instanceof SyntaxError){
                result = "Syntax Error!"
                updateOutputResult(result);
                return;
            }
        }
        //Set ans
        answer = result
        data.operation = [result];
        data.formula = [result];
        updateOutputResult(result);
        return;
    }
    updateOutputOperation(data.operation.join(''));
}
//Update the output box with the current operation
function updateOutputOperation(operation){
    outputElement.innerHTML = operation
}
//Update the result after calculation
function updateOutputResult(result) {
    resultElement.innerHTML = result
}

//Looks for powers inside the formula array, keyword is the power to search for.  
//Once a match has been found adds the index to search_result array and continues then returns the array at the end.
function search(array, keyword){
    let search_result = [];
    array.forEach((element, index) => {
        if(element == keyword) search_result.push(index);
    })
    return search_result;
}

//Gets the bases of all powers in the formula, append them to base.  Returns 
function powerBaseFinder(formula, powerSearchResult) {
    let powerBases = []; 
    powerSearchResult.forEach(powerIndex => {
        let base = [];
        let parenthesisCount = 0;
        let previousIndex = powerIndex - 1;
        //Loop over the formula and find the bases inside the formula stack
        while(previousIndex >= 0){
            if(formula[previousIndex] == "(") parenthesisCount--;
            if(formula[previousIndex] == ")") parenthesisCount++;
            let isOperator = false;
            operators.forEach(operator => {
                if(formula[previousIndex] == operator) isOperator = true;
            })
            let isPower = formula[previousIndex] == POWER;
            //If the next item is an operator and we have the whole base break from the while loop
            if((isOperator && parenthesisCount == 0) || isPower) break;
            //Moves the current previousIndex to the front of the base array
            base.unshift(formula[previousIndex]);
            previousIndex--;
        }
        powerBases.push(base.join('' ));
    })
    return powerBases;
}