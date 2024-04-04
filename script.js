const main = document.querySelector("main");
const containerArea = document.createElement("div");
containerArea.setAttribute("id", "containerArea");
const optionArea = document.createElement("div");
optionArea.setAttribute("id", "optionArea");
const canvasArea = document.createElement("div");
canvasArea.setAttribute("id", "canvasArea");
const optionBox = document.createElement("div");
optionBox.setAttribute("id", "optionBox");
const canvas = document.createElement("div");
canvas.setAttribute("id", "canvas");
const inpCol = document.createElement("input");
let inputColor = "";
inpCol.setAttribute("type", "color");
inpCol.setAttribute("id", "chooseColor");
inpCol.setAttribute(
  "style",
  `
display:none;
height:20px;
width:20px;`
);
inpCol.addEventListener("click", updateUserColor);

function updateUserColor() {
  inputColor = document.getElementById("chooseColor").value;
  userColorPen = true;
  updateToggleButtonData();
}

//SETTING UP MAIN DIV STYLING
main.setAttribute("style", `margin:10px 0;`);

//SETTING UP CONTAINER AREA STYLING

containerArea.setAttribute(
  "style",
  `
height:600px;
display:flex;
// border:2px solid royalblue`
);
main.appendChild(containerArea);

//SETTING UP OPTION AREA STYLING

optionArea.setAttribute(
  "style",
  `
width:300px;
display:flex;
justify-content:center;
align-items:center;
// border:2px solid crimson`
);
containerArea.appendChild(optionArea);

//SETTING UP CANVAS AREA STYLING

canvasArea.setAttribute(
  "style",
  `
height:600px;
width:80%;
display:flex;
justify-content:center;
align-items:center;
box-sizing:border-box;
// border:2px solid red`
);
containerArea.appendChild(canvasArea);

//SETTING UP OPTION BOX STYLING

optionBox.setAttribute(
  "style",
  `
height:400px;
width:250px;
display:flex;
flex-direction:column;
justify-content:center;
justify-content:space-evenly;
align-items:center;
// border:5px solid blue`
);
optionArea.appendChild(optionBox);

//SETTING UP CANVA STYLING
let defaultcanvasHeight = 550;
let defaultcanvasWidth = 700;
canvas.setAttribute(
  "style",
  `
height:${defaultcanvasHeight}px;
width:${defaultcanvasWidth}px;
display:flex;
flex-wrap:wrap;
background-color:white;
border:2px solid black;`
);
canvasArea.appendChild(canvas);

//SETTING UP BUTTONS IN OPTION BOX

//PIXEL SIZE BTN
const btnSetPixelSize = document.createElement("button");
btnSetPixelSize.setAttribute("id", "btnSetPixelSize");
btnSetPixelSize.textContent = "Set Pixel Size";

//COLOR GRAY BTN

const btnSetPenColorGray = document.createElement("button");
btnSetPenColorGray.setAttribute("id", "btnSetPenColorGray");
btnSetPenColorGray.textContent = "Color:Gray";

const grayPenToggleValue = document.createElement("span");
grayPenToggleValue.setAttribute("id", "grayPenToggleValue");
grayPenToggleValue.textContent = "[off]";

btnSetPenColorGray.appendChild(grayPenToggleValue);

//COLOR RANDOM BTN

const btnSetPenColorRandom = document.createElement("button");
btnSetPenColorRandom.setAttribute("id", "btnSetPenColorRandom");
btnSetPenColorRandom.textContent = "Color:Random";

const randomPenToggleValue = document.createElement("span");
randomPenToggleValue.setAttribute("id", "randomPenToggleValue");
randomPenToggleValue.textContent = "[off]";

btnSetPenColorRandom.appendChild(randomPenToggleValue);

//COLOR USER INPUT BTN

const btnSetPenColorUser = document.createElement("button");
btnSetPenColorUser.setAttribute("id", "btnSetPenColorUser");
btnSetPenColorUser.textContent = "Select Color";

//INTENSITY BTN

const btnSetPenIntensity = document.createElement("button");
btnSetPenIntensity.setAttribute("id", "btnSetPenIntensity");
btnSetPenIntensity.textContent = "Intensity Mode:";

const intensityToggleValue = document.createElement("span");
intensityToggleValue.setAttribute("id", "intensityToggleValue");
intensityToggleValue.textContent = "[off]";

btnSetPenIntensity.appendChild(intensityToggleValue);

//CLEAR BTN

const btnClearCanvas = document.createElement("button");
btnClearCanvas.setAttribute("id", "btnClearCanvas");
btnClearCanvas.textContent = "Clear";

const arr = [
  btnSetPixelSize,
  btnSetPenColorGray,
  btnSetPenColorRandom,
  btnSetPenColorUser,
  btnSetPenIntensity,
  btnClearCanvas,
];

//ADDING CLICK,COLOUR,TOGGLE EVENTS TO BUTTONS
for (let i = 0; i < arr.length; i++) {
  optionBox.appendChild(arr[i]);
  setButtonStyle(arr[i]);
  arr[i].addEventListener("mouseover", btnHoverIn);
  arr[i].addEventListener("mouseout", btnHoverOut);
  if (i == 0) {
    arr[i].addEventListener("click", setPixelSize);
  }
  if (i == 1 || i == 2 || i == 4) {
    updateButtonColor(arr[i]);
    arr[i].addEventListener("click", () => {
      updateToggle(arr[i]);
    });
  }
  if (i == 3) {
    //SELECT USER INPUT COLOR
    arr[i].addEventListener("click", () => {
      if (userColorPen === false) {
        userColorPen = true;
        randomColorPen = false;
        grayColorPen = false;
        console.log("clicked button");
        inpCol.style["display"] = "inline";
        btnSetPenColorUser.appendChild(inpCol);
      }
      updateToggleButtonData();
    });
  }
  if (i == 5) {
    arr[i].addEventListener("click", () => clearGrids(pixelSize));
  }
}
//STYLE FUNCTION FOR OPTION BUTTONS

function setButtonStyle(element) {
  let requiredElement = element.id;
  document.querySelector(`#${requiredElement}`).setAttribute(
    "style",
    `
    height:50px;
    width:250px;
    font-family:'Courier New', Courier, monospace;
    font-weight: bolder;
    font-size: 15px;
    text-align:center;
    background-color:white;
    border:1px solid #BF9CFF;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    border-radius:20px`
  );
}

//HOVERING EFFECT ON THE BUTTON
function btnHoverIn(element) {
  let requiredElementId = element.target.id;
  if (requiredElementId != "") {
    let Tag = document.querySelector(`#${requiredElementId}`).tagName;
    if (!(Tag === "SPAN")) {
      document.querySelector(`#${requiredElementId}`).style[
        "background-color"
      ] = "#BF9CFF";
      document.querySelector(`#${requiredElementId}`).style["border"] = "none";
    }
  }
}
function btnHoverOut(element) {
  let requiredElementId = element.target.id;
  if (requiredElementId != "") {
    let Tag = document.querySelector(`#${requiredElementId}`).tagName;
    if (!(Tag === "SPAN")) {
      document.querySelector(`#${requiredElementId}`).style[
        "background-color"
      ] = "white";
      document.querySelector(`#${requiredElementId}`).style["border"] =
        "1px solid #BF9CFF";
    }
  }
}

//TOGGLING EFFECT OF BUTTONS
let grayColorPen = true;
let randomColorPen = false;
let intensityMode = false;
let userColorPen = false;

updateToggleButtonData();

//FUNCTION TO UPDATE TOGGLE VALUES

function updateToggle(element) {
  let elementName = document.querySelector(`#${element.id}`).children[0]
    .tagName;
  console.log(element);
  if (elementName === "SPAN") {
    let spanId = document.querySelector(`#${element.id}`).children[0].id;
    let requiredElementValue = document.querySelector(`#${spanId}`);
    switch (spanId) {
      case "grayPenToggleValue":
        if (grayColorPen === false) {
          grayColorPen = true;
          randomColorPen = false;
          userColorPen = false;
        } else {
          grayColorPen = false;
        }
        break;
      case "randomPenToggleValue":
        if (randomColorPen === false) {
          randomColorPen = true;
          grayColorPen = false;
          userColorPen = false;
        } else {
          randomColorPen = false;
        }
        break;
      case "intensityToggleValue":
        if (intensityMode === false) {
          intensityMode = true;
        } else {
          intensityMode = false;
        }
        break;
    }
    updateToggleButtonData();
  }
}

//FUNCTION TO UPDATE TOGGLE VALUES ON BUTTONS
function updateToggleButtonData() {
  let gray = document.querySelector(`#grayPenToggleValue`);
  let randomCol = document.querySelector(`#randomPenToggleValue`);
  let intenseValue = document.querySelector(`#intensityToggleValue`);
  gray.style["color"] = "red";
  randomCol.style["color"] = "red";
  intenseValue.style["color"] = "red";
  if (grayColorPen === false) {
    gray.textContent = "[off]";
  }
  if (grayColorPen === true) {
    gray.textContent = "[on]";
    gray.style["color"] = "green";
    randomCol.textContent = "[off]";
    inpCol.style["display"] = "none";
  }
  if (randomColorPen === false) {
    randomCol.textContent = "[off]";
  }
  if (randomColorPen === true) {
    randomCol.textContent = "[on]";
    randomCol.style["color"] = "green";
    gray.textContent = "[off]";
    inpCol.style["display"] = "none";
  }
  if (intensityMode === false) {
    intenseValue.textContent = "[off]";
  }
  if (intensityMode === true) {
    intenseValue.textContent = "[on]";
    intenseValue.style["color"] = "green";
  }
  if (userColorPen === true) {
    randomCol.textContent = "[off]";
    gray.textContent = "[off]";
    inpCol.style["display"] = "inline";
  }
}

//FUNCTION TO UPDATE TOGGLE BUTTON COLOR

function updateButtonColor(element) {
  let tar = document.getElementById(element.children[0].id);
  tar.style["color"] = "red";
}

let pixelSize = 0;
function setPixelSize(element) {
  if (pixelSize > 0) remove_no_of_Grids(pixelSize);
  pixelSize = Number(prompt("Enter the grain size"));
  if (pixelSize <= 100 && pixelSize > 0) {
    create_no_of_Grids(pixelSize);
    // showClearbtn();
  } else {
    pixelSize = 0;
    alert("Enter value in the range 0 to 100");
  }
}
function create_no_of_Grids(n) {
  pixelSize = n;
  for (let i = 0; i < n; i++) {
    const rowBlocks = document.createElement("div");
    rowBlocks.setAttribute("style", "display:flex;box-sizing:border-box");
    rowBlocks.setAttribute("id", `row${i}`);
    for (let j = 0; j < n; j++) {
      const pixelDiv = document.createElement("div");
      pixelDiv.setAttribute("id", `row${i}col${j}`);
      setpixelStyle(pixelDiv, n);
      rowBlocks.appendChild(pixelDiv);
      pixelDiv.addEventListener("mouseover", trailEffect);
    }
    canvas.appendChild(rowBlocks);
  }
}

function remove_no_of_Grids(n) {
  for (let i = 0; i < n; i++) {
    const rowBlocks = document.querySelector(`#row${i}`);
    for (let j = 0; j < n; j++) {
      const pixelDiv = document.querySelector(`#row${i}col${j}`);
      rowBlocks.removeChild(pixelDiv);
    }
    canvas.removeChild(rowBlocks);
  }
}

function setpixelStyle(elemnt, n) {
  let perboxHeight = defaultcanvasHeight / n;
  let perboxWidth = defaultcanvasWidth / n;
  elemnt.setAttribute(
    "style",
    `
    height:${perboxHeight}px;
    width:${perboxWidth}px;
    opacity:100%;
    // border:1px solid gray;
    background-color:white;
    box-sizing:border-box;`
  );
}

function trailEffect(e) {
  let opacity = Number(document.getElementById(e.target.id).style.opacity);
  if (opacity < 1.0 && opacity >= 0.0 && intensityMode === true)
    opacity = +opacity + 0.1;
  else opacity = 1;
  if (randomColorPen) {
    if (
      document.getElementById(e.target.id).style["backgroundColor"] ===
        "white" ||
      document.getElementById(e.target.id).style["backgroundColor"] === "black"
    ) {
      document.getElementById(`${e.target.id}`).style[
        "background-color"
      ] = `rgb(${randColor()} ${randColor()} ${randColor()})`;
    }
    document.getElementById(`${e.target.id}`).style["opacity"] = `${opacity}`;
  }
  if (grayColorPen) {
    document.getElementById(`${e.target.id}`).style["opacity"] = `${opacity}`;
    document.getElementById(`${e.target.id}`).style["background-color"] =
      "black";
  }
  if (userColorPen) {
    updateUserColor();
    document.getElementById(`${e.target.id}`).style["opacity"] = `${opacity}`;
    console.log(inputColor);
    document.getElementById(`${e.target.id}`).style[
      "background-color"
    ] = `${inputColor}`;
  }
}
function randColor() {
  let randCol = Math.floor(Math.random() * 255);
  return randCol;
}

function clearGrids(n) {
  grayColorPen = true;
  randomColorPen = false;
  intensityMode = false;
  userColorPen = false;
  updateToggleButtonData();

  for (let i = 0; i < n; i++) {
    const rowBlocks = document.querySelector(`#row${i}`);
    for (let j = 0; j < n; j++) {
      const pixelDiv = document.querySelector(`#row${i}col${j}`);
      pixelDiv.style["background-color"] = "white";
      pixelDiv.style["opacity"] = "0";
    }
    rowBlocks.style["background-color"] = "white";
  }
}
create_no_of_Grids(3);
