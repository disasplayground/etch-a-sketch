
const canvas = document.getElementById("canvas"); //container for the grid
const erasers = document.getElementById("erasers"); //reset and erase
const reset = document.getElementById("reset");
const erase = document.getElementById("erase");
const canvasMenu = document.getElementById("canvasSizeMenu");
const inkMenu = document.getElementById("colorModeMenu");
const sizeDropdown = document.getElementById("sizeDropdown"); //dropdown menu for canvas sizing
const colorDropdown = document.getElementById("colorDropdown"); //dropdown menu for ink color

let mouseDown = false;
let setBlack = false; 
let setColor = true; //random color ink is set as default
let setGradient = false;
let setErase = false;
let currentInk = "";
let gradientDown = 255; //to set gradient ink
let gradientUp = 0; //to set gradient ink

let blackActive = () => {
    setBlack = true;
    setColor = false;
    setGradient = false;
};

let colorActive = () => {
    setColor = true;
    setBlack = false;
    setGradient = false;
};

let gradientActive = () => {
    resetGradient();
    setGradient = true;
    setBlack = false;
    setColor = false;
};

let eraserActive = () => {
    setGradient = false;
    setBlack = false;
    setColor = false;
};

let resetGradient = () => {
    gradientUp = 0;
    gradientDown = 255;
}




// establish mousedown for sketching

document.body.onmousedown = () => {
    if (mouseDown !== true) {
        mouseDown = !mouseDown;
    };
};

document.body.onmouseup = () => {
    if (mouseDown) {
        mouseDown = !mouseDown;
    };
};


// set up menu collapse on click anywhere if it's open
document.addEventListener("click", (evt) => {
    if (evt.target !== sizeDropdown && canvasMenu.classList.contains("show")) {
        canvasMenu.classList.remove("show");
    } if (evt.target !== colorDropdown && inkMenu.classList.contains("show")) {
        inkMenu.classList.remove("show");
    };
});


// establish initial canvas size

function firstCanvas() {
    let userCanvas = prompt("Enter canvas size (4-100):");
    if (userCanvas >= 4 && userCanvas <= 100) {
        canvasSize(userCanvas);
    } else {
        alert("Please enter a valid number!");
        firstCanvas();
    };
};

firstCanvas();



// SIZING (small, medium, large)

const canvasMedium = document.getElementById("twentyFour");
canvasMedium.addEventListener("click", () => canvasSize(24));

const canvasLarge = document.getElementById("thirtyTwo");
canvasLarge.addEventListener("click", () => canvasSize(32));

const canvasSmall = document.getElementById("sixteen");
canvasSmall.addEventListener("click", () => canvasSize(16));

let userSize = document.getElementById("menuInput");
userSize.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (userSize.value >= 4 && userSize.value <= 100) {
            canvasSize(userSize.value);
        } else {
            alert("Please enter a valid number!")
        };
    };
});



function canvasSize(num) { //delete previous canvas and load the new size

    if (canvasMenu.classList.contains("show")) {
        canvasMenu.classList.remove("show");
    };

    document.getElementById("canvas").style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    document.getElementById("canvas").style.gridTemplateRows = `repeat(${num}, 1fr)`;

    while (canvas.firstChild) { //remove if there's content inside canvas 
        canvas.removeChild(canvas.lastChild);
    };


    loadCanvas(num);


};




// CANVAS

function loadCanvas(number) {

    for (let i=0; i<(number*number); i++) { //create pixels with for loop

        const square = document.createElement("div");

        square.style.backgroundColor = "transparent";
        square.classList.add("pixel"); //add a class called pixel
        canvas.appendChild(square);

        square.addEventListener("click", dot); //clicking on a square puts a dot
        square.addEventListener("mouseover", draw); //hovering over squares on mousedown draws on them

    };
};



// INK COLOR SELECTION

const blackInk = document.getElementById("black");
blackInk.addEventListener("click", function() {
    inkMenu.classList.toggle("show"); //hide dropdown items once something is selected

    blackActive();
    deactivateEraseButton(); //erase button automatically deactivates if an ink is selected

    currentInk = "black"; //save currently used ink to go back to after using the eraser

});

const colorInk = document.getElementById("color");
colorInk.addEventListener("click", function() {
    inkMenu.classList.toggle("show");

    colorActive();
    deactivateEraseButton();

    currentInk = "color";
});

const gradientInk = document.getElementById("gradient");
gradientInk.addEventListener("click", function() {
    inkMenu.classList.toggle("show");

    gradientActive();
    deactivateEraseButton();

    currentInk = "gradient";
});



// DRAW

function draw(element) { //draw with the active color
    if (mouseDown) {
        if (setBlack) {
            element.target.style.backgroundColor = "#000000";
            currentInk = "black";
        } if (setColor) {
            element.target.style.backgroundColor = `rgb(${color()},${color()},${color()})`;
            currentInk = "color";
        } if (setGradient) {
            drawGradient(element);
            currentInk = "gradient";
        } if (setErase) {
            element.target.style.backgroundColor = "transparent"
        };

    };
};

function dot(element) { 
    if (element.target.style.backgroundColor === "transparent") {
        (setBlack) ? element.target.style.backgroundColor = "#000000" :
        (setColor) ? element.target.style.backgroundColor = `rgb(${color()}, ${color()}, ${color()})`:
        drawGradient(element) ;
    } else {
        element.target.style.backgroundColor = "transparent";
    };
};

function color() { //randomize color with Math.random()
    return Math.floor(Math.random()*256);
};

function gradientColor1(max) {
    let min = (max - 15);
    return Math.floor(Math.random()*(max-min)+min)+1;
};

function gradientColor2(min) {
    let max = (min + 15);
    return Math.floor(Math.random()*(max-min)+min)+1;
};


function drawGradient(element) { //create gradient that gets darker and reaches black after 15 squares and then back

    if (gradientDown <= 255 && gradientDown > 0) {
        gradientDown -= 15;
        gradientUp = 0;
        element.target.style.backgroundColor = `rgb(${gradientColor1(gradientDown)},${gradientColor2(gradientDown)},${gradientColor2(gradientDown)})`;
    } if (gradientDown === 0 && gradientUp === 0) {
        element.target.style.backgroundColor = "#000000";
        gradientDown -= 1;
        gradientUp += 15;
    } if (gradientUp > 0 && gradientUp < 240) {
        element.target.style.backgroundColor = `rgb(${gradientColor2(gradientUp)},${gradientColor2(gradientUp)},${gradientColor2(gradientUp)})`;
        gradientUp += 15;
    } if (gradientUp === 240) {
        element.target.style.backgroundColor = `rgb(${gradientColor2(gradientUp)},${gradientColor2(gradientUp)},${gradientColor2(gradientUp)})`; 
        gradientDown = 255;
    };

}


// ERASERS

reset.addEventListener("click", function() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = "transparent"; //clear canvas
    });
});


erase.addEventListener("click", function() {
    
    if (setBlack || setColor || setGradient) {
        activateEraseButton();
        eraserActive();

    } else {
        deactivateEraseButton();
        if (currentInk === "black") {
            blackActive();
        } if (currentInk === "color") {
            colorActive();
        } if (currentInk === "gradient") {
            gradientActive();
        };
    };

});


function activateEraseButton() {
    setErase = true;
    erase.classList.remove("btn");
    erase.classList.add("eraser-active");
};

function deactivateEraseButton() {
    setErase = false;
    erase.classList.add("btn");
    erase.classList.remove("eraser-active");
};



// DROPDOWNS

sizeDropdown.addEventListener("click", (event) => expand("canvasSizeMenu", event)); //clicking on the button shows and expands the hidden div and its buttons
colorDropdown.addEventListener("click", (event) => expand("colorModeMenu", event));

function expand(name, event) {

    let menu = document.getElementById(name);
    menu.classList.toggle("show"); //toggle the 'show' class

    if (!event.target.matches(".dropbtn")) {

        let items = document.getElementsByClassName("dropdown-items");
        for (let i=0; i<items.length; i++) {
            let expandMenu = items[i];
            if (expandMenu.classList.contains("show")) { 
                expandMenu.classList.remove("show"); //hide menu on the second click
            }
        };
    };
};


