import "@grapecity/wijmo.styles/wijmo.css";
// import "bootstrap.css";
import "./App.css";
//
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as wjcGrid from "@grapecity/wijmo.react.grid";
import { getWorkers } from "./data";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: getWorkers()
        };
    }
    render() {
        return <div className="container-fluid">
            <wjcGrid.FlexGrid itemsSource={this.state.workers} headersVisibility="Column" selectionMode="Row" beginningEdit={this.onBeginningEdit.bind(this)} childItemsPath={['checks', 'earnings']} initialized={this.initialWorkerGrid.bind(this)}>
                <wjcGrid.FlexGridColumn binding="name" isReadOnly={true}></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="hours" dataType="Number" format="n2"></wjcGrid.FlexGridColumn>
                <wjcGrid.FlexGridColumn binding="rate" dataType="Number" format="n2"></wjcGrid.FlexGridColumn>
            </wjcGrid.FlexGrid>
        </div>;
    }
    componentDidMount() {
        this.workerGrid.rows.forEach((row) => {
            row.isReadOnly = false;
        });
    }
    initialWorkerGrid(grid) {
        this.workerGrid = grid;
    }
    onBeginningEdit(flexGird, e) {
        let item = flexGird.rows[e.row].dataItem, binding = flexGird.columns[e.col].binding;
        if (!(binding in item)) { // property not on this item?
            e.cancel = true; // can't edit!
        }
    }
}
// ReactDOM.render(<App />, document.getElementById('app'));
