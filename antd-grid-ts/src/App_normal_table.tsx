import { DownOutlined } from '@ant-design/icons';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Badge, Dropdown, Menu, Space, Table, Button } from 'antd';
import getData from './data';
const menu = (
  <Menu items={[
    { key: '1', label: 'Action 1', },
    { key: '2', label: 'Action 2', },
  ]} />
);
const columns = [
  { key: 'label', dataIndex: 'label', title: 'Label' },
  { key: 'percentage', dataIndex: 'percentage', title: 'Percentage %', headerTooltip: "Percentage %", minWidth: 150, editable: true, },
  { key: 'p1', dataIndex: 'p1' },
  { key: 'p2', dataIndex: 'p2' },
  { key: 'p3', dataIndex: 'p3' },
  { key: 'p4', dataIndex: 'p4' },
  { key: 'p5', dataIndex: 'p5' },
  { key: 'p6', dataIndex: 'p6' },
];

const timer = { timeStart: 0, timeGDDuration: 0, timeEnd: 0 };

const App = () => {
  const [rowData, setRowData] = useState(getData(5).rs);
  const expandedRowRender = (item: any) => {
    const mycolumns = [
      { key: 'label', dataIndex: 'label', title: 'Label' },
      { key: 'percentage', dataIndex: 'percentage', title: 'Percentage %', headerTooltip: "Percentage %", minWidth: 150, editable: true, },
      { key: 'p1', dataIndex: 'p1' },
      { key: 'p2', dataIndex: 'p2' },
      { key: 'p3', dataIndex: 'p3' },
      { key: 'p4', dataIndex: 'p4' },
      { key: 'p5', dataIndex: 'p5' },
      { key: 'p6', dataIndex: 'p6' },
    ];
    const data = getData(12).rs;
    function insertMultiTab(num: number) {
      let rt = "";
      if (num > 1) {
        for (let i = 0; i < Math.ceil(num); i++) {
          rt += "/t";
        }
      }
      return rt;
    }
    return <Table columns={mycolumns} dataSource={data} pagination={false} showHeader={false} />;
  };
  function onChangeHandler(arg:any){
    debugger;
  }

  function onUpdateRecords(numOfRecords: number) {
    console.log("Start: " + numOfRecords + " rows. *************************************************************************************************************");
    // console.log("Button clicked, start generating " + numOfRecords + " rows of data.");
    timer.timeStart = new Date().getTime();
    const { rs, genDuration } = getData(numOfRecords);
    timer.timeGDDuration = genDuration;
    console.log("Data generating completed\nTime cost: " + timer.timeGDDuration + " ms, new data length is " + rs.length);
    setRowData(rs);
  }
  const data = getData(50).rs;
  return (
    <div>
      {/* <Button style={{ marginBottom: '5px', fontWeight: 'bold' }} onClick={onBtnExportDataAsExcel} >Export to Excel({numOfData} records)</Button> */}
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(50); }}>50 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(200); }}>200 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(10000); }}>10,000 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(100000); }}>100,000 rows</Button>

      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={rowData}
        pagination={false}
      />
    </div>
  );
};

export default App;