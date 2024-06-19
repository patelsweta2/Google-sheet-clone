let currentActiveSheet = 1;
let currentSheetIndex = 1;

const main = document.getElementById("main");
const footer = document.getElementById("footer");
const searchInput = document.getElementById("searchInput");

const sheets = [];
let data = [];
let searchData;
let searchIndex;

const body = document.body;
const addSheets = document.getElementById("addSheet");
const sheetDiv = document.getElementById("sheets");

let index = 1;

let gridHeader;
let grid;

function createGrid(e) {
  gridHeader = document.createElement("div");
  grid = document.createElement("div");
  gridHeader.className = "grid-header";
  grid.className = "grid";
  grid.id = index++;
  grid.appendChild(gridHeader);
  sheets.push(grid);
  //sheet create

  const sheet = document.createElement("div");

  //console.log(sheet.classList);
  sheet.innerText = `Sheet${sheets.length}`;
  sheet.className = "sheet";
  //   sheet.addEventListener("click", sheetClicked);
  sheetDiv.appendChild(sheet);
  if (e === 1) {
    main.insertBefore(sheets[0], footer);
    sheet.classList.add("sheet-active");
  }
  createInsideGrid();
}
createGrid(index);

function createInsideGrid() {
  const srNo = document.createElement("div");
  srNo.className = "column";
  srNo.innerText = "";
  gridHeader.appendChild(srNo);
  const newData = [];

  for (let i = 65; i <= 90; i++) {
    const column = document.createElement("div");
    const char = String.fromCharCode(i);
    const spanText = document.createElement("p");
    column.style.display = "flex";
    spanText.innerText = char;
    spanText.className = "spanText";

    column.id = char;
    column.className = "column";
    const span = document.createElement("span");
    // span.addEventListener("click", sortingFunction);
    span.className = "material-icons spanSort";
    span.innerText = "arrow_drop_down";

    const div = document.createElement("div");
    div.className = "dropdown";
    div.innerHTML = `<button class="dropbtn material-icons" onclick="drop(this)">arrow_drop_down</button>
    <div class="dropdown-content">
    <a href="#" onclick="sortAtoZ(this)"><span class="dropbtn material-icons icons">sort_by_alpha</span>Sort Sheet A to Z</a>
    <a href="#" onclick="sortZtoA(this)"><span class="dropbtn material-icons icons" style="top:42px;left:9px">sort_by_alpha_alt</span>Sort Sheet Z to A</a>
    </div>`;
    column.appendChild(spanText);
    column.appendChild(div);
    gridHeader.appendChild(column);
  }

  function createRow(num) {
    const row = document.createElement("div");
    row.className = "row";
    const rowData = [];
    for (let i = 64; i <= 90; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (i === 64) {
        cell.innerText = num;
        cell.id = num;
      } else {
        cell.contentEditable = true;
        cell.id = String.fromCharCode(i) + num;
        // cell.addEventListener("focus", onCellFocus);
        // cell.addEventListener("blur", onCellBlur);
        // cell.addEventListener("input", onCellInput);
        rowData.push(cell);
      }
      row.appendChild(cell);
    }
    newData.push(rowData);
    grid.appendChild(row);
  }
  for (let i = 1; i < 100; i++) {
    createRow(i);
  }
  data.push(newData);
}
addSheets.addEventListener("click", createGrid);
