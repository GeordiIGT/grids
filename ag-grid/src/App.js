import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import CustomHeader from './customHeader';
import MyHeaderComponent from './myHeaderComponent';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
function genData(numOfRows) {
  const rs = [];
  const names = ['Tony Smith', 'Andrew Connel', 'Kevin Flanagan', 'Bricker McGee', 'Gil Lopes', 'Sophie Beckham']
  const languages = ['English', 'Spanish', 'Swedish', 'French', 'Portuguese', 'Italian', 'Greek', 'Chinese', 'German', 'Maltese', 'Norwegian'];
  //country code reference from https://flagcdn.com/en/codes.json; https://flags.fmcdn.net/ https://flags.fmcdn.net/data/flags/mini/{countryCode}.png
  const countriesDic = { "ar": "Argentina", "br": "Brazil", "co": "Colombia", "fr": "France", "de": "Germany", "gr": "Greece", "is": "Iceland", "it": "Italy", "mt": "Malta", "pt": "Portugal", "no": "Norway", "es": "Spain", "gb": "United Kingdom", "uy": "Uruguay", "be": "Belgium", "se": "Sweden", };
  const countries = Object.values(countriesDic);
  const countryCodes = Object.keys(countriesDic);

  for (let i = 1; i <= numOfRows; i++) {
    rs.push({ index: i, name: getEfromA(names), language: getEfromA(languages), country: getEfromA(countries) });
  }
  return rs;
}
function getEfromA(arr) {
  const index = Math.floor(Math.random() * (arr.length - 0)) + 0;
  return arr[index];
}

const App = () => {
  const ColourCellRenderer = props => <span style={{ color: props.color, background: props.bgcolor }}> {props.value}</span >;
  const HeaderCellRenderer = props => props.value;
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData] = useState(genData(100000));
  const [buttonLabel, setButtonLabel] = useState("Push Me");
  //  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  const components = {
    //customHeader: CustomHeader,
    agColumnHeader: CustomHeader,
    //agColumnHeader: MyHeaderComponent,
  };

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'index', headerName: 'No.', width: 80 },
    { field: 'name', filter: true },//, rowGroup: true， cellRenderer: CubeComponent},
    { field: 'mon', headerName: 'Monday <br/> 01/05/2022', width: 180 },
    { field: 'language', headerName: 'language', filter: true, cellRenderer: ColourCellRenderer, cellRendererParams: { color: 'red', bgcolor: "yellow" } },
    { field: 'country', headerName: 'country' },
    { field: 'tue', headerName: 'Tuesday \n 02/05/2022' },
    { field: 'wed', headerName: 'Wednessday \n 03/05/2022' },
    { field: 'thu', headerName: 'Thursday \n 04/05/2022' },
    { field: 'fri', headerName: 'Friday \n 05/05/2022' },
    { field: 'sat', headerName: 'Saturday \n 06/05/2022' },
    { field: 'sun', headerName: 'Sunday \n 07/05/2022' }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    editable: true
  }));


  // define a column type (you can define as many as you like)
  const columnTypes = {
    nonEditableColumn: { editable: false },
    dateColumn: {
      filter: 'agDateColumnFilter',
      suppressMenu: true
    }
  };

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
    setButtonLabel(event.data[event.colDef.field] + " at Row " + event.rowIndex);
  }, []);

  // Example load data from sever
  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    console.log("button clicked");
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>

      {/* Example using Grid's API */}<span>Clicked on column </span>
      <button onClick={buttonListener}>{buttonLabel}</button>






      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      {/*<div className="ag-theme-alpine" style={{ width: 750, height: 1500 }}>*/}
      <div className="ag-theme-alpine" style={{ width: 1050, height: 800 }}>

        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        // components = {components} //Optional - regist a customized Header component.
        />
      </div>
    </div>
  );
};
export default App;
render(<App />, document.getElementById('root'));