import React from 'react';

import { PivotGrid, Scrolling,Export } from 'devextreme-react/pivot-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { exportPivotGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
const dataSource = {
  remoteOperations: true,
  store: getStoreData(),
  fields: getFieldData(),
};
window.dataSource = dataSource;

function getStoreData(){
  const rt = createStore({
    key: 'OrderID',
    loadUrl: 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales/Orders',
  });
  debugger;
  return rt;
}

function getFieldData(){
  return [{
    caption: 'Category',
    dataField: 'ProductCategoryName',
    width: 250,
    expanded: true,
    sortBySummaryField: 'SalesAmount',
    sortBySummaryPath: [],
    sortOrder: 'desc',
    area: 'row',
  }, {
    caption: 'Subcategory',
    dataField: 'ProductSubcategoryName',
    width: 250,
    sortBySummaryField: 'SalesAmount',
    sortBySummaryPath: [],
    sortOrder: 'desc',
    area: 'row',
  }, {
    caption: 'Product',
    dataField: 'ProductName',
    area: 'row',
    sortBySummaryField: 'SalesAmount',
    sortBySummaryPath: [],
    sortOrder: 'desc',
    width: 250,
  }, {
    caption: 'Date',
    dataField: 'DateKey',
    dataType: 'date',
    area: 'column',
  }, {
    caption: 'Amount',
    dataField: 'SalesAmount',
    summaryType: 'sum',
    format: 'currency',
    area: 'data',
  }, {
    caption: 'Store',
    dataField: 'StoreName',
  }, {
    caption: 'Quantity',
    dataField: 'SalesQuantity',
    summaryType: 'sum',
  }, {
    caption: 'Unit Price',
    dataField: 'UnitPrice',
    format: 'currency',
    summaryType: 'sum',
  }, {
    dataField: 'Id',
    visible: false,
  }];
}

function App() {
  const onExporting = React.useCallback((e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sales');
    exportPivotGrid({
      component: e.component,
      worksheet,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Sales.xlsx');
      });
    });
    e.cancel = true;
  });
  return (
    <PivotGrid
      allowSorting={true}
      allowSortingBySummary={true}
      allowFiltering={true}
      height={920}
      showBorders={true}
      rowHeaderLayout="tree"
      dataSource={dataSource}
      onExporting={onExporting}
    >
      <Scrolling mode="virtual" />
      <Export enabled={true} />
    </PivotGrid>
  );
}

export default App;
