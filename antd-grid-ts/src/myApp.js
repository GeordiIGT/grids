import { DownOutlined } from '@ant-design/icons';
import React, { Profiler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Dropdown, Menu, Space, Table, Button, Typography, Popconfirm, Form, InputNumber, Input } from 'antd';
import getData, { resetCounter } from './data';
const menu = (
  <Menu items={[
    { key: '1', label: 'Action 1', },
    { key: '2', label: 'Action 2', },
  ]} />
);


const timer = { timeStart: 0, timeGDDuration: 0, timeEnd: 0 };
const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const App = () => {
  let data = getData(5).rs;
  resetCounter();
  const [rowData, setRowData] = useState(data);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      label: '',
      percentage: '',
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      p5: '',
      p6: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setRowData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setRowData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    { key: 'label', dataIndex: 'label', title: 'Label', editable: true, },
    { key: 'percentage', dataIndex: 'percentage', title: 'Percentage %', editable: true, headerTooltip: "Percentage %", minWidth: 150, editable: true, },
    { key: 'p1', dataIndex: 'p1', title: 'p1', editable: true },
    { key: 'p2', dataIndex: 'p2', title: 'p2', editable: true },
    { key: 'p3', dataIndex: 'p3', title: 'p3', editable: true },
    { key: 'p4', dataIndex: 'p4', title: 'p4', editable: true },
    { key: 'p5', dataIndex: 'p5', title: 'p5', editable: true },
    { key: 'p6', dataIndex: 'p6', title: 'p6', editable: true },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  function onUpdateRecords(numOfRecords) {
    console.log("Start: " + numOfRecords + " rows. *************************************************************************************************************");
    timer.timeStart = new Date().getTime();
    resetCounter();
    const { rs, genDuration } = getData(numOfRecords);
    data = rs;
    timer.timeGDDuration = genDuration;
    console.log("Data generating completed\nTime cost: " + timer.timeGDDuration + " ms, new data length is " + rs.length);
    setRowData(rs);
  }
  function tableUpdatedHandler(id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    
    timer.timeEnd = new Date().getTime();
    if (timer.timeStart !== 0 && actualDuration > 50) {
      // console.log("Render completed:"+evt.rowData.currentValue.length+" rows now\n"+evt.rowData.previousValue.length+" rows previously.");
      console.log((timer.timeEnd - timer.timeStart) + " milliseconds past.**************************************************************************************");
    }
  }
  return (
    <div>
      {/* <Button style={{ marginBottom: '5px', fontWeight: 'bold' }} onClick={onBtnExportDataAsExcel} >Export to Excel({numOfData} records)</Button> */}
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(50); }}>50 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(200); }}>200 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(1000); }}>1000 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(10000); }}>10,000 rows</Button>
      <Button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(100000); }}>100,000 rows</Button>
      <Form form={form} component={false}>
        <Profiler id='tablePro' onRender={tableUpdatedHandler}>
          <Table
            className="components-table-demo-nested"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            columns={mergedColumns}
            rowClassName="editable-row"
            dataSource={rowData}
            pagination={false}
          />
        </Profiler>
      </Form>
    </div>
  );
};

export default App;