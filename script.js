const content = document.getElementById('content');
const btnClear = document.getElementById('clear');
const btnEraser = document.getElementById('eraser');
const btnRainbow = document.getElementById('rainbow');
const btnDarken = document.getElementById('darken');
const btnSizeGrid = document.getElementById('size');
const colorPicker = document.getElementById('color-picker');
const btnColor = document.getElementById('color');
const sizeValue = document.getElementById('size-value');

const defaultSize = "16";
const defaultColor = "#333333";
const defaultMode = "color"

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

// default value for first time load the page
function defaultValue(){
  colorPicker.value = "#333333";
  btnSizeGrid.value = "16";
  currentColor = defaultColor;
  currentMode = defaultMode;
  currentSize = defaultSize;

  updateSize();
  showPixel();
}

// text size information text
function updateSize(){
  sizeValue.textContent = `${btnSizeGrid.value} x ${btnSizeGrid.value}`;
}

function setCurrentSize(){
  currentSize = btnSizeGrid.value;
  clearGrid();
}

// to set the mode and show what mode is active
function setCurrentMode(newMode){
  currentMode = newMode;

  if(currentMode == "eraser"){
    btnEraser.classList.add('active');
    btnRainbow.classList.remove('active');
    btnColor.classList.remove('active');
    btnDarken.classList.remove('active');
  } else if(currentMode == "color"){
    btnColor.classList.add('active');
    btnEraser.classList.remove('active');
    btnRainbow.classList.remove('active');
    btnDarken.classList.remove('active');
  } else if(currentMode == "rainbow"){
    btnRainbow.classList.add('active');
    btnColor.classList.remove('active');
    btnEraser.classList.remove('active');
    btnDarken.classList.remove('active');
  }
}

function changeColor(e){
  if(currentMode == "color"){
    e.target.style.background = `${colorPicker.value}`;
  }
  else if(currentMode == "rainbow"){
    const randomOne = Math.floor(Math.random()*256);
    const randomTwo = Math.floor(Math.random()*256);
    const randomThree = Math.floor(Math.random()*256);
    e.target.style.background = `rgb(${randomOne}, ${randomTwo}, ${randomThree})`;
  }
  else if(currentMode == "eraser"){
    e.target.style.background = "#ffffff";
  }
}

// to show the grid in the content
function showPixel(){
  content.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  content.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

  for (let i = 0; i <= currentSize * currentSize; i++) {
    const divGrid = document.createElement('div');
    divGrid.addEventListener('mouseover', changeColor);
    content.appendChild(divGrid);
  }

  updateSize();
}

// reset the grid
function clearGrid() {
  content.textContent = "";
  currentMode = "color";
  colorPicker.value = "#333333";

  showPixel();

  btnRainbow.classList.remove('active');
  btnColor.classList.remove('active');
  btnEraser.classList.remove('active');
  btnDarken.classList.remove('active');
}

function darkenMode(){
  content.textContent = "";
  colorPicker.value = "#000000"
  content.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  content.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

  for(let i = 0; i <= currentSize * currentSize; i++){
    const divGrid = document.createElement('div');
    divGrid.addEventListener('mouseover', function(){
     if(divGrid.classList.contains("darken")){
       // to add the opacity + 0.1 when the element has class darken
       divGrid.style.opacity = (Number(divGrid.style.opacity) + 0.1); 
     } else{
       divGrid.classList.add('darken');
       divGrid.style.opacity = 0.1;
       divGrid.style.background = `${colorPicker.value}`;
     }
    })
    content.appendChild(divGrid);
  }

  updateSize();

  btnDarken.classList.add('active');
  btnRainbow.classList.remove('active');
  btnColor.classList.remove('active');
  btnEraser.classList.remove('active');
}

btnClear.addEventListener('click', clearGrid);
btnColor.addEventListener('click', () => setCurrentMode("color"));
btnEraser.addEventListener('click', () => setCurrentMode("eraser"));
btnRainbow.addEventListener('click', () => setCurrentMode("rainbow"));
btnSizeGrid.addEventListener('change', setCurrentSize);
btnSizeGrid.addEventListener('mousemove', updateSize);
btnDarken.addEventListener('click', darkenMode);
window.addEventListener('load', defaultValue);