import React, { useRef, useState, useCallback, useEffect } from "react";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import { PivotGrid, Scrolling, Export } from "devextreme-react/pivot-grid";
import Paper from "@mui/material/Paper";
import { tasks, employees, priorities } from "./demo-data/tree-data";
import {
  DataTypeProvider,
  TreeDataState,
  SortingState,
  SelectionState,
  FilteringState,
  PagingState,
  CustomTreeData,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSelection,
} from "@devexpress/dx-react-grid";
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableTreeColumn,
  PagingPanel,
  TableColumnResizing,
  Toolbar,
  TableColumnVisibility,
  ColumnChooser,
  VirtualTable,
  ExportPanel
} from "@devexpress/dx-react-grid-material-ui";
// import employees from './employees';
import getTasks from "./data";
import saveAs from 'file-saver';
// const staffs = {
//   remoteOperations: false,
//   store: employees(100000),
//   fields: getFieldData(),
// };

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
  });
};
const timer = { timeStart: 0, timeGDDuration: 0, timeEnd: 0 };


const EmployeeFormatter = ({ row }) => (
  <div
    style={{
      display: "flex",
    }}
  >
    <div
      style={{
        display: "inline-block",
        background: "white",
        borderRadius: "3px",
        width: "30px",
        height: "30px",
        margin: "-8px 8px -8px 0",
        textAlign: "center",
      }}
    ></div>
    {employees.find((e) => e.ID === row.Assigned_Employee_ID).Name}
  </div>
);
const getChildRows = (row, rows) => {
  const childRows = rows.filter((r) => r.Parent_ID === (row ? row.ID : 0));
  return childRows.length ? childRows : null;
};
const random = (max, min) => {
  max = max || 100;
  min = min || 0;
  return Math.floor(Math.random() * max) + min;
}
function App() {
  // const staffs = employees(100000);
  // const allowedPageSizes = [10, 20, 500, 1000, 5000, 10000, 100000];
  const exporterRef = useRef(null);
  const [columns] = useState([
    { name: "Subject", title: "Label" },
    {
      name: "percentage",
      title: "% percentage",
      getCellValue: (row) => `${row.percentage}%`,
    },
    {
      name: "P1",
      title: "P1",
      //   getCellValue: (row) =>
      //     employees.find((e) => e.ID === row.Assigned_Employee_ID).Name,
    },
    {
      name: "P2",
      title: "P2",
      //   getCellValue: (row) =>
      //     priorities.find((p) => p.ID === row.Priority).Value,
    },
    {
      name: "P3",
      title: "P3",
      //   getCellValue: (row) => `${row.P3}%`,
    },
    {
      name: "P4",
      title: "P4",
      //   getCellValue: (row) => row.Start_Date.split("T")[0],
    },
    {
      name: "P5",
      title: "P5",
      //   getCellValue: (row) => row.Due_Date.split("T")[0],
    },
    {
      name: "P6",
      title: "P6",
      //   getCellValue: (row) => row.Due_Date.split("T")[0],
    },
    {
      name: "P7",
      title: "P7",
      //   getCellValue: (row) => row.Due_Date.split("T")[0],
    },
  ]);
  const [rowsNumber, setRowsNumber] = useState(10);

  const newTaks = getTasks(rowsNumber);
  const [rows, setRows] = useState(newTaks);
  // console.log('rows:', rows)
  const [pageSizes] = useState([100]);
  const [defaultColumnWidths] = useState([
    { columnName: "Subject", width: 150 },
    { columnName: "percentage", width: 150 },
    { columnName: "P1", width: 80 },
    { columnName: "P2", width: 80 },
    { columnName: "P3", width: 80 },
    { columnName: "P4", width: 80 },
    { columnName: "P5", width: 80 },
    { columnName: "P6", width: 80 },
    { columnName: "P7", width: 80 },
  ]);
  const [defaultHiddenColumnNames] = useState(["Priority", "Completion"]);
  const [tableColumnExtensions] = useState([
    { columnName: "Completion", align: "right" },
  ]);
  const [employeeColumns] = useState(["Assigned_Employee_ID"]);
  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);
  const changeRowsNumber = (num) => {
    console.log("Start: "+num+" rows. *************************************************************************************************************");
    timer.timeStart = new Date().getTime();
    setRowsNumber(num);
    const newTaks = getTasks(num);
    setRows(newTaks)
    timer.timeGDDuration = (new Date().getTime()) - timer.timeStart;
    console.log("Data generating completed\nTime cost: " + timer.timeGDDuration + " ms, new data length is " + newTaks.length);
  }
  const contentReady = (e) => {
    console.log('contentReady', e)
  }
  useEffect(() => {
    // Update the document title using the browser API

    console.log('contentReady');
    timer.timeEnd = new Date().getTime();
    if (timer.timeStart !== 0) {
      // console.log("Render completed:"+evt.rowData.currentValue.length+" rows now\n"+evt.rowData.previousValue.length+" rows previously.");
      console.log((timer.timeEnd - timer.timeStart) + " milliseconds past.**************************************************************************************");
    }
  }, [rows]);
  return (
    <div className="App">
      <button style={{ marginLeft: '10px' }} onClick={() => changeRowsNumber(50)}>50</button>
      <button style={{ marginLeft: '10px' }} onClick={() => changeRowsNumber(200)}>200</button>
      <button style={{ marginLeft: '10px' }} onClick={() => changeRowsNumber(1000)}>1000</button>
      <button style={{ marginLeft: '10px' }} onClick={() => changeRowsNumber(10000)}>10000</button>
      <button style={{ marginLeft: '10px' }} onClick={() => changeRowsNumber(100000)}>100000</button>
      <GridExporter
          ref={exporterRef}
          rows={rows}
          columns={columns}
          onSave={onSave} />
      <Paper>
        <Grid rows={rows} columns={columns} onContentReady={(e) => contentReady(e)} >
          {/* <DataTypeProvider
          for={employeeColumns}
          formatterComponent={EmployeeFormatter}
        /> */}

          <TreeDataState />
          <FilteringState />
          <SortingState />
          <SelectionState />
          {/* <PagingState defaultCurrentPage={0} defaultPageSize={pageSizes[1]} /> */}

          <CustomTreeData getChildRows={getChildRows} />
          <IntegratedFiltering />
          <IntegratedSelection />
          <IntegratedSorting />
          {/* <IntegratedPaging /> */}

          <Table columnExtensions={tableColumnExtensions} />
          <TableColumnVisibility
            defaultHiddenColumnNames={defaultHiddenColumnNames}
          />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow showSortingControls />
          {/* <TableFilterRow /> */}
          <TableTreeColumn for="Subject" />

          <Toolbar />
          {/* <Paging enabled={false} /> */}
          {/* <ColumnChooser /> */}
          {/* <VirtualTable height={800} /> */}
          {/* <PagingPanel
          pageSizes={pageSizes}
        /> */}
          <ExportPanel startExport={startExport} />
        </Grid>
        
      </Paper>
    </div>
  );
}

export default App;