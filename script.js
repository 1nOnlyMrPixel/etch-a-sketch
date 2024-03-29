const body = document.querySelector("body");

//OPTION BOX
const OptionBox = document.createElement("div");
const canvasData = document.createElement("p");
OptionBox.setAttribute(
  "style",
  `
height:40px;
width:800px;
display:flex;
justify-content:center;
align-items:center;
// border:2px solid black;
margin:30px auto;
box-sizing:border-box;
justify-content:space-evenly`
);
//OPTION BOX-->#1)BUTTON SET GRAIN SIZE
const button_set_grainNos = document.createElement("button");
button_set_grainNos.textContent = "Set No of Grains";
button_set_grainNos.setAttribute(
  "style",
  `
height:40px;
width:150px;
font-family:'Courier New', Courier, monospace;
box-sizing:border-box;
border-radius:5px;
border:1px solid gray;
background-color:white;
font-weight:bolder;
`
);
OptionBox.appendChild(button_set_grainNos);

//OPTION BOX-->#2)BUTTON SET CANVAS SIZE
const button_set_canvas_size = document.createElement("button");
button_set_canvas_size.textContent = "Set Canvas Size";
button_set_canvas_size.setAttribute(
  "style",
  `
height:40px;
width:150px;
font-family:'Courier New', Courier, monospace;
box-sizing:border-box;
border-radius:5px;
border:1px solid gray;
background-color:white;
font-weight:bolder;
`
);
OptionBox.appendChild(button_set_canvas_size);
body.appendChild(OptionBox);

//OPTION BOX-->#3)CLEAR BUTTON
const clearBox = document.createElement("button");
clearBox.textContent="Clear";
clearBox.setAttribute("style",`
height:40px;
width:150px;
font-family:'Courier New', Courier, monospace;
box-sizing:border-box;
border-radius:5px;
border:1px solid gray;
background-color:white;
font-weight:bolder;
display:none;
`)
OptionBox.appendChild(clearBox);
function showClearbtn()
{
  clearBox.style["display"]="inline";
}
clearBox.addEventListener("mouseover",mouseOverEffect);
clearBox.addEventListener("mouseout",mouseOutEffect);


//EVENT OPTION BOX-->#1)BUTTON SET GRAIN SIZE
let grainSize = 0;
button_set_grainNos.addEventListener("click", setGrainSize);
button_set_grainNos.addEventListener("mouseover",mouseOverEffect);
button_set_grainNos.addEventListener("mouseout",mouseOutEffect);
function setGrainSize(element) {
  if (grainSize > 0) 
    remove_no_of_Grids(grainSize);
  grainSize = Number(prompt("Enter the grain size"));
  if(grainSize<=100 && grainSize >0)
  {
  create_no_of_Grids(grainSize);
  showCanvas(container);
  showClearbtn();
  }
  else
  {
    grainSize=0;
    alert("Enter value in the range 0 to 100");
  }
}

clearBox.addEventListener("click",()=>clearGrids(grainSize));

//CANVAS
let canvasHeight = 0;
let canvasWidth = 0;
const container = document.createElement("div");
function showCanvas(element) {
  element.style["display"] = "flex";
}
function hideCanvas(element) {
  element.style["display"] = "none";
}
//EVENT OPTION BOX-->#2)BUTTON SET CANVAS SIZE
function setCanvas() {
  if (confirm("Current Drawing will be lost!!! Are you sure??")) {
    canvasHeight = Number(prompt("Enter Height of canvas!!"));
    canvasWidth = Number(prompt("Enter Width of canvas!!"));
    container.setAttribute(
      "style",
      `height:${canvasHeight}px;
      width:${canvasWidth}px;
      margin:40px auto;
      border:2px solid black;
      display:none;
      flex-wrap:wrap;
    justify-content:center`
    );
    updateCanvasData();
  }
}
button_set_canvas_size.addEventListener("click", setCanvas);
button_set_canvas_size.addEventListener("mouseover",mouseOverEffect);
button_set_canvas_size.addEventListener("mouseout",mouseOutEffect);


function mouseOverEffect(element,colour="rgb(196, 243, 209)")
{
  element.target.style["background-color"] = colour;
}
function mouseOutEffect(element,colour="white")
{
  element.target.style["background-color"] =colour;
}

//SET DEFAULT CANVAS HEIGHT AND WIDTH HERE
if (canvasHeight === 0 || canvasWidth === 0) {
  canvasHeight = 500;
  canvasWidth = 700;
}
container.setAttribute(
  "style",
  `height:${canvasHeight}px;
  width:${canvasWidth}px;
  margin:40px auto;
  border:2px solid black;
  display:none;
  flex-wrap:wrap;
  justify-content:center`
);
updateCanvasData();
body.appendChild(container);








//SHOWING CURRENT CANVAS DIMENSION
function updateCanvasData() {
  canvasData.setAttribute(
    "style",
    `
height:40px;
width:150px;
font-family:'Courier New', Courier, monospace;
box-sizing:border-box;text-align:center;font-size:13px`
  );
  canvasData.textContent = `Current Canvas:\n Height:${canvasHeight}\nWidth:${canvasWidth}`;
  OptionBox.appendChild(canvasData);
}

function create_no_of_Grids(n) {
  for (let i = 0; i < n; i++) {
    const rowBlocks = document.createElement("div");
    rowBlocks.setAttribute("style", "display:flex");
    rowBlocks.setAttribute("id", `row${i}`);
    for (let j = 0; j < n; j++) {
      console.log(`i=${i}\nj=${j}`);
      const pixelDiv = document.createElement("div");
      pixelDiv.setAttribute("id", `row${i}col${j}`);
      setpixelStyle(pixelDiv, n);
      rowBlocks.appendChild(pixelDiv);
      pixelDiv.addEventListener("mouseover", trailEffect);
    }
    container.appendChild(rowBlocks);
  }
}
function remove_no_of_Grids(n) {
  for (let i = 0; i < n; i++) {
    const rowBlocks = document.querySelector(`#row${i}`);
    for (let j = 0; j < n; j++) {
      const pixelDiv = document.querySelector(`#row${i}col${j}`);
      rowBlocks.removeChild(pixelDiv);
    }
    container.removeChild(rowBlocks);
  }
}
function clearGrids(n) {
  for (let i = 0; i < n; i++) {
    const rowBlocks = document.querySelector(`#row${i}`);
    for (let j = 0; j < n; j++) {
      const pixelDiv = document.querySelector(`#row${i}col${j}`);
      pixelDiv.style["background-color"]="white";
    }
    rowBlocks.style["background-color"]="white";
  }
}
function setpixelStyle(elemnt, n) {
  let perboxHeight = canvasHeight / n;
  let perboxWidth = canvasWidth / n;
  elemnt.setAttribute(
    "style",
    `height:${perboxHeight}px;
    width:${perboxWidth}px;
    box-sizing:border-box`
  );
}
function trailEffect(e) {
  document.getElementById(`${e.target.id}`).style["background-color"] =
    "royalblue";
}
