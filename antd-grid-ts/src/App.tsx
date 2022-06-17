import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu, Space, Table } from 'antd';
const menu = (
  <Menu items={[
    { key: '1', label: 'Action 1', },
    { key: '2', label: 'Action 2', },
  ]} />
);
const App = () => {
  const expandedRowRender = () => {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name', },
      { title: 'Date', dataIndex: 'date', key: 'date', },
      { title: 'Status', key: 'state', render: () => (<span><Badge status="success" />Finished</span>), },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum', },
      {
        title: 'Action', dataIndex: 'operation', key: 'operation', render: () => (
          <Space size="middle">
            <a>Edit</a>
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>More<DownOutlined /></a>
            </Dropdown>
          </Space>),
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: insertMultiTab(i) + '2014-12-24 23:12:00',
        name: i + '_This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    function insertMultiTab(num: number) {
      let rt = "";
      if (num > 1) {
        for (let i = 0; i < Math.ceil(num); i++) {
          rt += "/t";
        }
      }
      return rt;
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', },
    { title: 'Platform', dataIndex: 'platform', key: 'platform', },
    { title: 'Version', dataIndex: 'version', key: 'version', },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum', },
    { title: 'Creator', dataIndex: 'creator', key: 'creator', },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a>, },
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }
  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={data}
    />
  );
};

export default App;