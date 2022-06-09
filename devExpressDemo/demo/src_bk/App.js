import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import DataGrid, {Column, Pager, Paging} from 'devextreme-react/data-grid';
// import employees from './employees';
import employees from './data';
 
function App() {
    const staffs = employees(100000);
    const allowedPageSizes = [10, 20, 500, 1000, 5000, 10000, 100000];
    return (
        <div className="App">
            <DataGrid
                dataSource={staffs}
                keyExpr="EmployeeID"
                allowColumnResizing={true}
                showBorders={true}>
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

// import React, { useState } from 'react';
// import Paper from '@mui/material/Paper';
// import {
//   TreeDataState,
//   CustomTreeData,
// } from '@devexpress/dx-react-grid';
// import {
//   Grid,
//   Table,
//   TableHeaderRow,
//   TableTreeColumn,
// } from '@devexpress/dx-react-grid-material-ui';

// import {
//   generateRows,
//   defaultColumnValues,
// } from '../../../demo-data/generator';

// const getChildRows = (row, rootRows) => (row ? row.items : rootRows);

// export default () => {
//   const [columns] = useState([
//     { name: 'name', title: 'Name' },
//     { name: 'gender', title: 'Gender' },
//     { name: 'city', title: 'City' },
//     { name: 'car', title: 'Car' },
//   ]);
//   const [data] = useState(generateRows({
//     columnValues: {
//       ...defaultColumnValues,
//       items: ({ random }) => (random() > 0.5
//         ? generateRows({
//           columnValues: {
//             ...defaultColumnValues,
//             items: () => (random() > 0.5
//               ? generateRows({
//                 columnValues: {
//                   ...defaultColumnValues,
//                 },
//                 length: Math.trunc(random() * 5) + 1,
//                 random,
//               })
//               : null),
//           },
//           length: Math.trunc(random() * 3) + 1,
//           random,
//         })
//         : null),
//     },
//     length: 3,
//   }));
//   const [tableColumnExtensions] = useState([
//     { columnName: 'name', width: 300 },
//   ]);

//   return (
//     <Paper>
//       <Grid
//         rows={data}
//         columns={columns}
//       >
//         <TreeDataState />
//         <CustomTreeData
//           getChildRows={getChildRows}
//         />
//         <Table
//           columnExtensions={tableColumnExtensions}
//         />
//         <TableHeaderRow />
//         <TableTreeColumn
//           for="name"
//         />
//       </Grid>
//     </Paper>
//   );
// };