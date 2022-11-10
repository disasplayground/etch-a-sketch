let mouseDown = false;
let setBlack = false; 
let setColor = true; //random color ink is set as default
let setErase = false;
let currentInk = "";
const canvas = document.getElementById("canvas"); //container for the grid
const erasers = document.getElementById("erasers"); //reset and erase
const reset = document.getElementById("reset");
const erase = document.getElementById("erase");


// establish mousedown for sketching

document.body.onmousedown = function() {
    if (mouseDown !== true) {
        mouseDown = !mouseDown;
    };
};

document.body.onmouseup = function() {
    if (mouseDown) {
        mouseDown = !mouseDown;
    };
};

loadCanvas(256);



// SIZING (small, medium, large)

const canvasMedium = document.getElementById("twentyFour");
canvasMedium.addEventListener("click", () => canvasSize("medium", 576));

const canvasLarge = document.getElementById("thirtyTwo");
canvasLarge.addEventListener("click", () => canvasSize("large", 1024));

const canvasSmall = document.getElementById("sixteen");
canvasSmall.addEventListener("click", () => canvasSize("small", 256));



function canvasSize(size, num) { //delete previous canvas and load the new size

    const menu = document.getElementById("canvasSizeMenu");
    menu.classList.toggle("show");

    canvas.classList.replace(canvas.className, size);

    while (canvas.firstChild) { //remove if there's content inside canvas 
        canvas.removeChild(canvas.lastChild);
    };

    loadCanvas(num);
};



// INK COLOR

const blackInk = document.getElementById("black");
blackInk.addEventListener("click", function() {
    let menu = document.getElementById("colorModeMenu");
    menu.classList.toggle("show"); //hide dropdown items once something is selected

    setColor = false;
    setBlack = true;
    deactivateEraseButton(); //erase button automatically deactivates if an ink is selected

    currentInk = "black"; //save currently used ink to go back to after using the eraser

});

const colorInk = document.getElementById("color");
colorInk.addEventListener("click", function() {
    let menu = document.getElementById("colorModeMenu");
    menu.classList.toggle("show");

    setBlack = false;
    setColor = true;
    deactivateEraseButton();

    currentInk = "color";
});



// CANVAS

function loadCanvas(number) {

    for (let i=0; i<number; i++) { //create pixels with for loop

        const square = document.createElement("div");

        square.style.backgroundColor = "transparent";
        square.classList.add("pixel"); //add a class called pixel
        canvas.appendChild(square);

        square.addEventListener("click", dot); //clicking on a square puts a dot
        square.addEventListener("mouseover", draw); //hovering over squares on mousedown draws on them

    };
};



// DROPDOWNS

const sizeDropdown = document.getElementById("sizeDropdown"); //dropdown menu for canvas sizing
const colorDropdown = document.getElementById("colorDropdown"); //dropdown menu for ink color

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



// SKETCH

function draw(element) { //draw with the active color
    if (mouseDown) {
        (setBlack) ? element.target.style.backgroundColor = "#000000" :
        (setColor) ? element.target.style.backgroundColor = `rgb(${color()},${color()},${color()})`: //use random color for each square
        element.target.style.backgroundColor = "transparent";
    };
};

function dot(element) { 
    if (element.target.style.backgroundColor === "transparent") {
        (setBlack) ? element.target.style.backgroundColor = "#000000" :
        element.target.style.backgroundColor = `rgb(${color()}, ${color()}, ${color()})`;
    } else {
        element.target.style.backgroundColor = "transparent";
    };
};

function color() { //randomize color with Math.random()
    return Math.floor(Math.random()*255);
};



// ERASERS

reset.addEventListener("click", function() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = "transparent"; //clear canvas
    });
});


erase.addEventListener("click", function() {
    
    if (setBlack || setColor) {
        setBlack = false;
        setColor = false;
        activateEraseButton();
    } else {
        (currentInk === "black") ? (setBlack = true, setColor = false) : (setColor = true, setBlack = false) //return to current ink after erasing
        deactivateEraseButton();
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







