import React, { useState, useCallback } from 'react'

import ReactDataGrid from '@inovua/reactdatagrid-enterprise'
import '@inovua/reactdatagrid-enterprise/index.css'

import Button from '@inovua/reactdatagrid-community/packages/Button'

import DATASET_URL from './DATASET_URL'

const gridStyle = { marginTop: 10, minHeight: 550 }

const defaultColumns = [
  { name: 'id', header: 'Id', defaultVisible: false, type: 'number', maxWidth: 40 },
  { name: 'firstName', header: 'First Name', defaultFlex: 2 },
  { name: 'lastName', header: 'Last Name', defaultFlex: 2 },
  { name: 'email', header: 'Email', defaultFlex: 3 }
];

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columns] = useState(defaultColumns);

  const loadData = useCallback(() => {
    const newDataSource = () => {
      const limit = 50;
      return fetch(DATASET_URL + '?limit='+limit)
        .then(response => {
          const totalCount = response.headers.get('X-Total-Count');
          return response.json().then(data => {
            return { data, count: totalCount * 1 };
          })
        });
      }

    setDataSource(newDataSource)
  }, []);

  return (
    <div>
      <Button onClick={() => loadData()} style={{marginRight: 10}}>
        Load async data
      </Button>
      <Button
        disabled={Array.isArray(dataSource)}
        onClick={() => setDataSource([])}
      >Clear data</Button>
      <ReactDataGrid
        style={gridStyle}
        idProperty="id"
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}

export default () => <App />