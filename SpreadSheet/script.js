const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector("#export-btn");

const ROWS = 10;
const COLS = 10;

const spreadsheet = [];

const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

class Cell {
  constructor(isHeader, disabled, data, row, column, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.active = active;
  }
}

initSpreadsheet();

// 초기화
function initSpreadsheet() {
  for (let i = 0; i < ROWS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = "";
      let isHeader = false;

      // 1 ~ 9 헤더 설정
      if (j == 0) {
        cellData = i;
        isHeader = true;
      }

      // A ~ I 헤더 설정
      if (i == 0) {
        cellData = alphabets[j - 1];
        isHeader = true;
      }

      if (!cellData) {
        cellData = "";
      }

      const cell = new Cell(isHeader, false, cellData, i, j, false);
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
  console.log(spreadsheet);
}

function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = "cell_" + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add("header");
  }
  return cellEl;
}

function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";
    for (let j = 0; j < spreadsheet[i].length; j++) {
      rowContainerEl.append(createCellEl(spreadsheet[i][j]));
      spreadSheetContainer.append(rowContainerEl);
    }
  }
}
