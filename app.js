let mouseDown = false;
let canvas = document.getElementById("canvas");
let setBlack = false;
let setColor = true;


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



// SIZING

let canvasMedium = document.getElementById("twentyFour");
canvasMedium.addEventListener("click", () => canvasSize("medium", 576));

let canvasLarge = document.getElementById("thirtyTwo");
canvasLarge.addEventListener("click", () => canvasSize("large", 1024));

let canvasSmall = document.getElementById("sixteen");
canvasSmall.addEventListener("click", () => canvasSize("small", 256));


function canvasSize(size, num) {

    let menu = document.getElementById("canvasSizeMenu");
    menu.classList.toggle("show");

    canvas.classList.replace(canvas.className, size);
    let previousCanvas = document.getElementById("canvas");

    while (previousCanvas.firstChild) {
        previousCanvas.removeChild(previousCanvas.lastChild);
    };

    loadCanvas(num);
};



// INK COLOR

let blackInk = document.getElementById("black");
blackInk.addEventListener("click", function() {
    let menu = document.getElementById("colorModeMenu");
    menu.classList.toggle("show");

    setColor = false;
    setBlack = true;
});

let colorInk = document.getElementById("color");
colorInk.addEventListener("click", function() {
    let menu = document.getElementById("colorModeMenu");
    menu.classList.toggle("show");
    
    setBlack = false;
    setColor = true;
});



// CANVAS

function loadCanvas(number) {

    for (let i=0; i<number; i++) {

        let square = document.createElement("div");

        square.style.backgroundColor = "transparent";

        square.classList.add("pixel");
        document.getElementById("canvas").appendChild(square);

        square.addEventListener("click", dot);
        square.addEventListener("mouseover", draw);
    
    };
};



// DROPDOWNS

let sizeDropdown = document.getElementById("sizeDropdown");
let colorDropdown = document.getElementById("colorDropdown");

sizeDropdown.addEventListener("click", (event) => expand("canvasSizeMenu", event));
colorDropdown.addEventListener("click", (event) => expand("colorModeMenu", event));

function expand(name, event) {

    let menu = document.getElementById(name);
    menu.classList.toggle("show");

    if (!event.target.matches(".dropbtn")) {

        let items = document.getElementsByClassName("dropdown-items");
        for (let i=0; i<items.length; i++) {
            let expandMenu = items[i];
            if (expandMenu.classList.contains("show")) {
                expandMenu.classList.remove("show");
            }
        };
    };

};




// SKETCH

function draw(element) {
    if (mouseDown) {
        (setBlack) ? element.target.style.backgroundColor = "#000000" :
        element.target.style.backgroundColor = `rgb(${color()},${color()},${color()})`;
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

function color() {
    return Math.floor(Math.random()*255);
};







