/*
import { Table } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

const VirtualTable = (props: Parameters<typeof Table>[0]) => {
  const { columns, scroll } = props;
  const [tableWidth, setTableWidth] = useState(0);

  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map(column => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        {...props}
        className="virtual-table"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

// Usage
const columns = [
  { title: 'A', dataIndex: 'key', width: 150 },
  { title: 'B', dataIndex: 'key' },
  { title: 'C', dataIndex: 'key' },
  { title: 'D', dataIndex: 'key' },
  { title: 'E', dataIndex: 'key', width: 200 },
  { title: 'F', dataIndex: 'key', width: 100 },
];

const data = Array.from({ length: 100000 }, (_, key) => ({ key }));

const App: React.FC = () => (
  <VirtualTable columns={columns} dataSource={data} scroll={{ y: 300, x: '100vw' }} />
);

export default App;
*/
import { DownOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Dropdown, Menu, Space, Table, Button } from 'antd';
import getData, {resetCounter} from './data';
const menu = (
  <Menu items={[
    { key: '1', label: 'Action 1', },
    { key: '2', label: 'Action 2', },
  ]} />
);
const columns = [
  { key: 'label', dataIndex: 'label', title: 'Label' },
  { key: 'percentage', dataIndex: 'percentage', title: 'Percentage %', headerTooltip: "Percentage %", minWidth: 150, editable: true, },
  { key: 'p1', dataIndex: 'p1', title: 'p1' },
  { key: 'p2', dataIndex: 'p2', title: 'p2' },
  { key: 'p3', dataIndex: 'p3', title: 'p3' },
  { key: 'p4', dataIndex: 'p4', title: 'p4' },
  { key: 'p5', dataIndex: 'p5', title: 'p5' },
  { key: 'p6', dataIndex: 'p6', title: 'p6' },
];

const timer = { timeStart: 0, timeGDDuration: 0, timeEnd: 0 };

const App = () => {
  const data = getData(5).rs;
  resetCounter();
  const [rowData, setRowData] = useState(data);
  function onChangeHandler(arg: any) {
    debugger;
  }

  function onUpdateRecords(numOfRecords: number) {
    console.log("Start: " + numOfRecords + " rows. *************************************************************************************************************");
    timer.timeStart = new Date().getTime();
    resetCounter();
    const { rs, genDuration } = getData(numOfRecords);
    timer.timeGDDuration = genDuration;
    console.log("Data generating completed\nTime cost: " + timer.timeGDDuration + " ms, new data length is " + rs.length);
    setRowData(rs);
  }
  useEffect(() => {
    timer.timeEnd = new Date().getTime();
    if (timer.timeStart !== 0) {
      // console.log("Render completed:"+evt.rowData.currentValue.length+" rows now\n"+evt.rowData.previousValue.length+" rows previously.");
      console.log((timer.timeEnd - timer.timeStart) + " milliseconds past.**************************************************************************************");
    }
  }, [rowData]);
  return (
    <div>
      {/* <Button style={{ marginBottom: '5px', fontWeight: 'bold' }} onClick={onBtnExportDataAsExcel} >Export to Excel({numOfData} records)</Button> */}
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(50); }}>50 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(200); }}>200 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(1000); }}>1000 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(10000); }}>10,000 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(100000); }}>100,000 rows</Button>

      <Table
        className="components-table-demo-nested"
        columns={columns}
        // expandable={{
        //   expandedRowRender,
        // }}
        dataSource={rowData}
        pagination={false}
      />
    </div>
  );
};

export default App;