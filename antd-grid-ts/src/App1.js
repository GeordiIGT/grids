import { Button, Table } from 'antd';
import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import { Profiler, useEffect, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import getData, { resetCounter } from './data';

const VirtualTable = (props) => {
    const { columns, scroll } = props;
    const [tableWidth, setTableWidth] = useState(0);
    const widthColumnCount = columns.filter(({ width }) => !width).length;
    const mergedColumns = columns.map((column) => {
        if (column.width) {
            return column;
        }
        return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
    });
    const gridRef = useRef();
    const [connectObject] = useState(() => {
        const obj = {};
        Object.defineProperty(obj, 'scrollLeft', {
            get: () => null,
            set: (scrollLeft) => {
                if (gridRef.current) {
                    gridRef.current.scrollTo({
                        scrollLeft,
                    });
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

    const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
        ref.current = connectObject;
        const totalHeight = rawData.length * 54;
        return (
            <Grid
                ref={gridRef}
                className="virtual-grid"
                columnCount={mergedColumns.length}
                columnWidth={(index) => {
                    const { width } = mergedColumns[index];
                    return totalHeight > scroll.y && index === mergedColumns.length - 1
                        ? width - scrollbarSize - 5
                        : width;
                }}
                height={scroll.y}
                rowCount={rawData.length}
                rowHeight={() => 54}
                width={tableWidth}
                onScroll={({ scrollLeft }) => {
                    onScroll({
                        scrollLeft,
                    });
                }}
            >
                {({ columnIndex, rowIndex, style }) => (
                    <div
                        className={classNames('virtual-table-cell', {
                            'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
                        })}
                        style={style}
                    >
                        {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
                    </div>
                )}
            </Grid>
        );
    };

    return (
        <ResizeObserver onResize={({ width }) => {
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
}; // Usage

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
    const data = getData(10).rs;
    resetCounter();
    const [rowData, setRowData] = useState(data);
    function onUpdateRecords(numOfRecords) {
        console.log("Start: " + numOfRecords + " rows. *************************************************************************************************************");
        timer.timeStart = new Date().getTime();
        resetCounter();
        const { rs, genDuration } = getData(numOfRecords);
        timer.timeGDDuration = genDuration;
        console.log("Data generating completed\nTime cost: " + timer.timeGDDuration + " ms, new data length is " + rs.length);
        setRowData(rs);
    }

    // useEffect(() => {
    //     timer.timeEnd = new Date().getTime();
    //     if (timer.timeStart !== 0) {
    //         // console.log("Render completed:"+evt.rowData.currentValue.length+" rows now\n"+evt.rowData.previousValue.length+" rows previously.");
    //         console.log((timer.timeEnd - timer.timeStart) + " milliseconds past.**************************************************************************************");
    //     }
    // }, [rowData]);

    function callback(arg) { 
        timer.timeEnd = new Date().getTime();
        if (timer.timeStart !== 0) {
            // console.log("Render completed:"+evt.rowData.currentValue.length+" rows now\n"+evt.rowData.previousValue.length+" rows previously.");
            console.log((timer.timeEnd - timer.timeStart) + " milliseconds past.**************************************************************************************");
        }
    }
    return (
        <div>
            <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(50); }}>50 rows</Button>
            <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(200); }}>200 rows</Button>
            <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(1000); }}>1000 rows</Button>
            <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(10000); }}>10,000 rows</Button>
            <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(100000); }}>100,000 rows</Button>
            <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(1000000); }}>1M rows</Button>
            <Profiler id="Main" onRender={callback}>
                <VirtualTable
                    columns={columns}
                    dataSource={rowData}
                    scroll={{
                        y: 900,
                        x: '100vw',
                    }}
                />
            </Profiler>
        </div>
    );
};

export default App;
