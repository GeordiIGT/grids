'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import { LicenseManager } from 'ag-grid-enterprise'
// import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';







const GridExample = () => {

  LicenseManager.setLicenseKey("For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-9_July_2022_[v2]_MTY1NzMyMTIwMDAwMA==f869ef3f3920de11fba068b683fb56bd");
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  // const ColourCellRenderer = props => <span style={{ color: props.color, background: props.bgcolor }}> {props.value}</span >;
  const ColourCellRenderer = props => <span style={{ color: "red" }}> {props.value}</span >;
  const HeaderCellRenderer = props => props.value;
  const getCellStyle = params => {
    if (params.column.colId === "percentage" && Math.abs(parseFloat(params.value)) < 30) {
      return { color: 'red', background: 'yellow' }
    }
  };
  const [numOfData, setNumOfData] = useState(50);
  const [rowData, setRowData] = useState(getData(numOfData));
  const [columnDefs, setColumnDefs] = useState([
    // we're using the auto group column by default!
    {
      field: 'percentage', headerName: 'Percentage %', headerTooltip: "Percentage %", minWidth: 150, editable: true,
      valueFormatter: (params) => {
        params.value = Math.round(parseFloat(params.value) * 100) / 100 + "%";
        params.data.percentage = params.value;
        return params.value;
      }, cellStyle: getCellStyle,
      cellClassRules: { percentageHighLight: params => Math.abs(parseFloat(params.value)) < 30 },
    },
    // {
    //   field: 'mon', headerName: 'Monday <br/> 01/05/2022', headerTooltip: '01/05/2022 Mon', filter: 'agNumberColumnFilter', aggFunc: 'sum', minWidth: 150, cellRenderer: ColourCellRenderer, cellRendererParams: { color: 'red', bgcolor: "yellow" }, headerComponentParams: {
    //     menuIcon: 'fa-bars',
    //     template: `<div class="ag-cell-label-container" role="presentation">  
    //                 <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>  
    //                 <div ref="eLabel" class="ag-header-cell-label" role="presentation">
    //                  <div ref="eText" class="ag-header-cell-text"  role="columnheader"></div>    
    //                     <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>    
    //                     <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>    
    //                     <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>    
    //                     <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>    
    //                     <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>  
    //                 </div>
    //             </div>`,
    //   }
    // },
    { field: 'p1' },
    { field: 'p2' },
    { field: 'p3' },
    { field: 'p4' },
    { field: 'p5' },
    { field: 'p6' },
  ]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Label',
      cellClass: getIndentClass,
      minWidth: 250,
      cellRendererParams: {
        suppressCount: true,
      },
      cellClassRules: {
        'indent-1': params => params.data.label.length === 2,
        'indent-2': params => params.data.label.length === 3,
        'indent-3': params => params.data.label.length === 4,
      },
      flex: 1,
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      editable: true,
      filter: true,
      resizable: true,
      headerComponentParams: {
        menuIcon: 'fa-bars',
        template: `<div class="ag-cell-label-container" role="presentation">  
                      <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>  
                      <div ref="eLabel" class="ag-header-cell-label" role="presentation">    
                        <div ref="eText" class="ag-header-cell-text" role="columnheader"></div>    
                          <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>    
                          <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>    
                          <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>    
                          <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>    
                          <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>  
                      </div>
                  </div>`,
      },
      cellClassRules: {
        'rowLevel0_cell': (params) => params.data.rowColourIndex === 0,
        'rowLevel1_cell': (params) => params.data.rowColourIndex === 1,
        'rowLevel2_cell': (params) => params.data.rowColourIndex === 2,
      },
    };
  }, []);

  const rowStyle = { /*background: 'black'*/ };

  // set background colour on row according to the param.data property
  const getRowStyle = params => {
    if (params.data.rowColour !== "") {
      return { background: params.data.rowColour };
    }
  };

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  const onBtnExportDataAsExcel = useCallback(() => {
    gridRef.current.api.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }, []);
  const getDataPath = useCallback((data) => {
    return data.label;
  }, []);

  const excelStyles = useMemo(() => {
    return [
      {
        id: 'indent-1',
        alignment: {
          indent: 2,
        },
        // note, dataType: 'string' required to ensure that numeric values aren't right-aligned
        dataType: 'String',
      },
      {
        id: 'indent-2',
        alignment: {
          indent: 4,
        },
        dataType: 'String',
      },
      {
        id: 'indent-3',
        alignment: {
          indent: 6,
        },
        dataType: 'String',
      },
      {
        id: 'rowLevel0_cell',
        interior: {
          color: "#ffcc66", pattern: 'Solid'
        },
      },{
        id: 'rowLevel1_cell',
        interior: {
          color: "#ffcccc", pattern: 'Solid'
        },
      },{
        id: 'rowLevel2_cell',
        interior: {
          color: "#ccccff", pattern: 'Solid'
        },
      },
      {
        id: "percentageCol",
        interior: {
          color: "#ffcccc", pattern: 'Solid'
        }
      },
      // The cellClassStyle: background is green and font color is light green,
      // note that since this excel style it's defined after redFont
      // it will override the red font color obtained through cellClass:'red'
      {
        id: "percentageHighLight",
        alignment: {
          horizontal: 'Right', vertical: 'Bottom'
        },
        borders: {
          borderBottom: {
            color: "#000000", lineStyle: 'Continuous', weight: 1
          },
          borderLeft: {
            color: "#000000", lineStyle: 'Continuous', weight: 1
          },
          borderRight: {
            color: "#000000", lineStyle: 'Continuous', weight: 1
          },
          borderTop: {
            color: "#000000", lineStyle: 'Continuous', weight: 1
          }
        },
        font: { color: "#FF0000" },
        interior: {
          color: "#ffff00", pattern: 'Solid'
        }
      },
      {
        id: "cell",
        alignment: {
          vertical: "Center"
        }
      }
    ];
  }, []);
  const getIndentClass = (params) => {
    var indent = 0;
    var node = params.node;
    while (node && node.parent) {
      indent++;
      node = node.parent;
    }
    return 'indent-' + indent;
  };

  const rowGroupCallback = (params) => {
    return params.node.key;
  };

  function processCellForClipboard(params) {
    if (params.column.colId === 'percentage')
      return parseFloat(params.value) / 100;
    return params.value;
  }

  function processCellFromClipboard(params) {
    if (params.column.colId === 'percentage') {
      return validatingPercentageInput(params);
    }
    return params.value;
  }

  function validatingPercentageInput(params) {
    if (isNaN(parseFloat(params.value))) {
      console.error("Invalid data format for a percentage:" + params.value);
      return params.node.data.percentage;
    }

    if (params.value.indexOf("%") !== -1) { //contain a % symbol
      return Math.round(parseFloat(params.value) * 100) / 100 + "%";
    }
    //without a %, keep 2 decimal places
    return Math.round(parseFloat(params.value) * 10000) / 100 + "%";
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={onBtnExportDataAsExcel}
        style={{ marginBottom: '5px', fontWeight: 'bold' }}
      >
        Export to Excel({numOfData} records)
      </button>
      <div className="example-wrapper">
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowStyle={rowStyle} getRowStyle={getRowStyle}
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            treeData={true}
            animateRows={true}
            enableRangeSelection={true}
            processCellForClipboard={processCellForClipboard}
            processCellFromClipboard={processCellFromClipboard}
            groupDefaultExpanded={-1}
            getDataPath={getDataPath}
            excelStyles={excelStyles}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};




render(<GridExample></GridExample>, document.querySelector('#root'));
