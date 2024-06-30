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
const addSheets = document.getElementById("addSheets");
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

  // Create a new sheet tab
  const sheet = document.createElement("div");
  sheet.innerText = `Sheet${sheets.length}`;
  sheet.className = "sheet";
  sheet.addEventListener("click", sheetClicked);
  sheetDiv.appendChild(sheet);

  // Show the first sheet initially
  if (e === 1) {
    main.insertBefore(sheets[0], footer);
    sheet.classList.add("sheet-active");
  }

  createInsideGrid();
}

// Initialize the first grid
createGrid(1);

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
    // const span = document.createElement("span");
    // span.addEventListener("click", sortingFunction);
    // span.className = "material-icons spanSort";
    // span.innerText = "arrow_drop_down";

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
        cell.addEventListener("focus", onCellFocus);
        cell.addEventListener("blur", onCellBlur);
        cell.addEventListener("input", onCellInput);
        rowData.push(cell);
      }
      row.appendChild(cell);
    }
    newData.push(rowData);
    grid.appendChild(row);
  }

  for (let i = 1; i <= 100; i++) {
    createRow(i);
  }
  data.push(newData);
}

// Attach event listener to the addSheets button
addSheets.addEventListener("click", createGrid);
let dropdownContent;
function drop(e) {
  e.nextElementSibling.classList.toggle("show");
  dropdownContent = e.nextElementSibling;
}

function sortDataByColumn(columnIndex) {
  const d = [];
  for (let i = 0; i < 100; i++) {
    const value =
      data[parseInt(currentSheetIndex) - 1][i][columnIndex].innerText;

    if (value !== "") d.push(value);
  }
  d.sort();
  for (let j = 0; j < 100; j++) {
    const cellId = String.fromCharCode(65 + j) + j;
    console.log(cellId);
    const cell = data[parseInt(currentSheetIndex) - 1][j][columnIndex];
    cell.id = cellId;
    cell.innerText = d[j] === undefined ? "" : d[j];
  }
}

function sortDataByColumnReverse(columnIndex) {
  const d = [];
  for (let i = 0; i < 100; i++) {
    const value =
      data[parseInt(currentSheetIndex) - 1][i][columnIndex].innerText;
    if (value !== "") d.push(value);
  }
  d.reverse();
  for (let j = 0; j < 100; j++) {
    const cellId = String.fromCharCode(65 + columnIndex + 1) + j;
    console.log(cellId);
    const cell = data[parseInt(currentSheetIndex) - 1][j][columnIndex];
    cell.innerText = d[j] === undefined ? "" : d[j];
  }
}

function sheetClicked(e) {
  const index = e.target.innerText.replace("Sheet", "");
  e.target.classList.add("sheet-active");
  currentActiveSheet = "Sheet" + index;
  console.log("clicked");
  currentSheetIndex = index;
  sheets[index - 1].style.display = "block";
  for (let i = 0; i < sheets.length; i++) {
    console.log(i != index - 1, i, index - 1);
    if (i !== index - 1) {
      sheets[i].style.display = "none";
    }
  }
  main.insertBefore(sheets[index - 1], footer);
  manageSheetState(currentActiveSheet);
}

function manageSheetState(index) {
  const sheetList = document.getElementsByClassName("sheet");
  for (let i = 0; i < sheetList.length; i++) {
    if (sheetList[i].innerText !== index) {
      sheetList[i].classList.remove("sheet-active");
    }
  }
}

// function sortingFunction(e) {
//   console.log("popup", popup);
//   e.target.appendChild(popup);
// }

function sortAtoZ(e) {
  const columnName = e.parentNode.parentNode.parentNode;
  //   console.log("parentNode", columnName);
  const index = columnName.id.charCodeAt(0) - 65;
  sortDataByColumn(index);
}

function sortZtoA(e) {
  const columnName = e.parentNode.parentNode.parentNode;
  const index = columnName.id.charCodeAt(0) - 65;
  sortDataByColumnReverse(index);
}

searchInput.addEventListener("click", () => {
  searchInput.style.color = "#000";
  searchInput.innerText = "";

  searchData = [];
  searchIndex = [];
  for (let i = 0; i < data[parseInt(currentSheetIndex) - 1].length; i++) {
    for (let j = 0; j < data[parseInt(currentSheetIndex) - 1][0].length; j++) {
      if (data[parseInt(currentSheetIndex) - 1][i][j].innerText != "") {
        searchData.push(data[parseInt(currentSheetIndex) - 1][i][j]);
        searchIndex.push(data[parseInt(currentSheetIndex) - 1][i][j].id);
        // console.log(searchData);
      }

      data[parseInt(currentSheetIndex) - 1][i][j].style.backgroundColor =
        "white";
      data[parseInt(currentSheetIndex) - 1][i][j].style.border =
        "2px solid #e1e1e1";
      data[parseInt(currentSheetIndex) - 1][i][j].style.borderTopWidth = "0px";
      data[parseInt(currentSheetIndex) - 1][i][j].style.borderRightWidth =
        "0px";
    }
  }
});

searchInput.addEventListener("input", searchInCell);

function searchInCell(e) {
  for (let i = 0; i < searchData.length; i++) {
    if (
      searchData[i].innerText.includes(searchInput.innerText) &&
      searchInput.innerText !== ""
    ) {
      searchData[i].style.backgroundColor = "#73d18f";
      searchData[i].style.border = "2px solid #146c2e";
    } else {
      searchData[i].style.backgroundColor = "white";
      searchData[i].style.border = "1px solid #e1e1e1";
      searchData[i].style.borderTopWidth = "0px";
      searchData[i].style.borderRightWidth = "0px";
    }
  }
}

function exportFile() {
  const exportedData = {
    currentActiveSheet: currentActiveSheet,
    currentSheetIndex: currentSheetIndex,
    data: data,
  };
  const blob = new Blob([JSON.stringify(exportedData)], {
    type: "application/json",
  });
  const link = document.createElement("a");

  link.download = "filename.json";
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = [
    "application/json",
    link.download,
    link.href,
  ].join(":");
  const evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  link.dispatchEvent(evt);
  link.remove();
}

// function importFile(fileData) {
//   sheets.forEach((sheet) => sheet.remove());
//   sheets.length = 0;
//   data.length = 0;

//   // parse the imported data
//   const importedData = JSON.parse(fileData);

//   //Update the current sheet and data
//   currentActiveSheet = importedData.currentActiveSheet;
//   currentSheetIndex = importedData.currentSheetIndex;
//   data = importedData.data;

//   // Recreate sheets and their content
//   data.forEach((sheetData, sheetIndex) => {
//     createGrid(sheetIndex + 1);
//     sheetData.forEach((rowData, rowIndex) => {
//       rowData.forEach((cellData, colIndex) => {
//         const cell = data[sheetIndex][rowIndex][colIndex];
//         const cellId = String.fromCharCode(65 + colIndex) + rowIndex;
//         cell.id = cellId;
//         cell.innerText = cellData.innerText;
//         // Add any other properties or styles you need to restore
//       });
//     });
//   });
//   // Update the UI to reflect the imported state
//   manageSheetState(currentActiveSheet);
// }

// let uploadElement = document.getElementById("uploadElement");
// uploadElement.addEventListener("click", function () {
//   let inputVal = document.createElement("input");
//   inputVal.setAttribute("type", "file");
//   inputVal.click();

//   inputVal.addEventListener("change", () => {
//     var fr = new FileReader();
//     let files = inputVal.files;
//     let filesObj = files[0];
//     fr.readAsText(filesObj);
//     fr.addEventListener("load", (e) => {
//       importFile(fr.result);
//     });
//   });
// });
