const position = document.getElementById("position");
const formulas = document.getElementById("formulas");
const textAlignElements = document.getElementsByClassName("text-align");
const fontSizeSelector = document.getElementById("font-size-selector");
const fontFamilySelector = document.getElementById("font-selector");

// menuItems
const bold = document.getElementById("bold");
const italic = document.getElementById("italic");
const underline = document.getElementById("underline");

const activeOp = {
  sheet: {},
};

position.innerText = "";

let activeCell = null;
let previousCell = null;
let previousActiveOptionsState;
let copiedCell = null;

let activeOptionState;

function onCellFocus(e) {
  highlighRowAndColumn(e);
  //   console.log("id", e.target.id);
  //   console.log("active", activeCell);
  if (activeCell && activeCell === e.target.id) return;
  activeCell = e.target;
  position.innerText = activeCell.id;

  const computedStyle = getComputedStyle(activeCell);

  activeOptionState = {
    fontFamily: computedStyle.fontFamily,
    isBoldSelected: computedStyle.fontWeight === "600",
    isItalicSelected: computedStyle.fontStyle === "italic",
    isUnderLineSelected:
      computedStyle.textDecoration === "underline solid rgb(0,0,0)",
    textAlign: computedStyle.textAlign,
    textColor: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize,
    sheetName: currentActiveSheet,
    cellId: activeCell.id,
    textContent: activeCell.innerText,
  };
  activeOp[activeCell.id] = activeOptionState;
  //   console.log("state", activeOptionState);
  //   manageButtonState(computedStyle);

  if (previousCell) {
    previousCell.style.border = "1px solid #e1e1e1";
    previousCell.style.borderRightWidth = "0px";
    previousCell.style.borderTopWidth = "0px";
  }
}

function highlighRowAndColumn(e) {
  const currentId = e.target;
  //   console.log(currentId);
  const columnId = e.target.parentNode.children[0];
  const parenNode = e.target.parentNode.parentNode;
  //   console.log("parent", parentNode);
  //   console.log("column", columnId);
  const rowId = currentId.id.replace(columnId.innerText, "");
  const num = rowId.charCodeAt(0) - 65;
  const rowElement = document.getElementById(rowId);

  const changeColumnColor = parenNode.children[0].children[num + 1];
  columnId.style.backgroundColor = "#D3E3FD";
  changeColumnColor.style.backgroundColor = "D3E3FD";
  currentId.style.border = "none";
  currentId.style.border = "3px solid green";
  position.innerText = currentId.id;
  formulas.innerText = currentId.innerText.trim();
}

function onCellBlur(e) {
  const currentId = e.target;
  const columnId = e.target.parentNode.children[0];
  const parenNode = e.target.parentNode.parentNode;
  const rowId = currentId.id.replace(columnId.innerText, "");
  const num = rowId.charCodeAt(0) - 65;
  const rowElement = document.getElementById(rowId);
  const changeColumnColor = parenNode.children[0].children[num + 1];

  columnId.style.backgroundColor = "white";
  changeColumnColor.style.backgroundColor = "white";
  //   currentId.style.border = "none";
  previousCell = e.target;
}

function onCellInput(e) {
  formulas.innerText = e.target.innerText;
}
