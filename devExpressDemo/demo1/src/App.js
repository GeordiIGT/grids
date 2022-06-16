import React, { useCallback, useMemo, useRef, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import DataGrid, {Column, Pager, Paging} from 'devextreme-react/data-grid';
// import employees from './employees';
import employees from './data';
 
function App() {
    const [rowData, setRowData] = useState(employees(100000));
    const allowedPageSizes = [10, 20, 500, 1000, 5000, 10000, 100000];
    const buttonOnclick = (num)=>{
        debugger;
    };
    const onContentReadyHandler= (evt)=>{
        debugger;
        console.log("Render completed");
    };
    return (
        <div className="App">
            <button onClick={()=>{buttonOnclick(50)}}>50</button>
            <DataGrid
                dataSource={rowData}
                keyExpr="EmployeeID"
                allowColumnResizing={true}
                showBorders={true}
                onContentReady={onContentReadyHandler}
                >
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={allowedPageSizes}
                    showNavigationButtons={true}
                />
                <Column dataField="EmployeeID" caption="ID" /> 
                <Column dataField= 'jobTitle' />
                <Column dataField= 'employmentType' />
                <Column dataField= 'percentage' caption='Percentage %' tooltip = "Percentage %" width = {100} />
                <Column dataField= 'mon' caption='Monday <br/> 01/05/2022' tooltip =  '01/05/2022 Mon' filter='agNumberColumnFilter' aggFunc='sum'  minWidth={150} cellRenderer={"ColourCellRenderer"} cellRendererParams={{ color: 'red', bgcolor: "yellow" }} />
                <Column dataField= 'tue' caption='Tuesday \n 02/05/2022' tooltip =  '02/05/2022 Tue' />
                <Column dataField= 'wed' caption='Wednessday \n 03/05/2022' tooltip =  '03/05/2022 Wed' />
                <Column dataField= 'thu' caption='Thursday \n 04/05/2022' tooltip =  '03/05/2022 Thur' />
                <Column dataField= 'fri' caption='Friday \n 05/05/2022' tooltip =  '03/05/2022 Fri' />
                <Column dataField= 'sat' caption='Saturday \n 06/05/2022' tooltip =  '03/05/2022 Sat' />
                <Column dataField= 'sun' caption='Sunday \n 07/05/2022' tooltip =  '03/05/2022 Sun' />
                {/* <Paging enabled={false} /> */}
            </DataGrid>
        </div>
    );
}
 
export default App;