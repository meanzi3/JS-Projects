const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector("#export-btn");

const ROWS = 10;
const COLS = 10;

const spreadsheet = [];

const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
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
      let disabled = false;

      // 1 ~ 9 헤더 설정
      if (j == 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }

      // A ~ I 헤더 설정
      if (i == 0) {
        cellData = alphabets[j - 1];
        isHeader = true;
        disabled = true;
      }

      if (!cellData) {
        cellData = "";
      }

      const rowName = i;
      const columnName = alphabets[j - 1];

      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
  console.log(spreadsheet);
}

// cell elements 생성
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = "cell_" + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add("header");
  }

  cellEl.onclick = () => handleCellClick(cell);
  return cellEl;
}

// 셀 클릭 이벤트 함수
function handleCellClick(cell) {
  // 이전에 클릭한 셀의 헤더 active 먼저 지우기
  clearHeaderActiveStates();

  // 클릭한 셀의 column, row 정보 가져오기
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];

  // 요소 가져오기
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);

  // active 주기
  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");
}

function getElFromRowCol(row, col) {
  return document.querySelector("#cell_" + row + col);
}

function clearHeaderActiveStates() {
  const headers = document.querySelectorAll(".header.active");
  headers.forEach((header) => header.classList.remove("active"));
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
