import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var columnDefs: ColDef[] = [
  { field: 'index', width: 80 },
  { field: 'a' },
  { field: 'b' },
  { field: 'c' },
];

let defaultColDef = {
  resizable: true
};

// specify the data
var rowData = [];

for (let i = 0; i<1000000; i++) {
  rowData.push({
    index: i,
    a: Math.random(),
    b: Math.random(),
    c: Math.random(),
  });
}

// let the grid know which columns and what data to use
var gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  defaultColDef: defaultColDef
};


// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

