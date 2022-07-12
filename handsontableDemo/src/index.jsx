
// import { ReactDOM } from 'react';
import { render } from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import "./handsontable.min.css";
import "./styles.css";
import { HotTable, HotColumn } from "@handsontable/react";
import { getData, getColumnDef, getDataInstantly } from "./data";
import { registerAllModules } from 'handsontable/registry';
import Handsontable from "handsontable";

registerAllModules();
const timer = { timeStart: 0, timeGDDuration: 0, timeEnd: 0 };
let hotSettings = {
	data:getDataInstantly(2).rs,
	rowHeaders: true,
	rowHeaderWidth: 70,
	columnSorting: true,
	colWidths: [200, 200, 200, 200, 100, 100, 100],
	colHeaders: true,
	nestedRows: true,
	contextMenu: true,
	wordWrap: false,
	renderer: function(instance, td, row, col, prop, value, cellProperties) {
		Handsontable.renderers.TextRenderer.apply(this, arguments);
		td.innerHTML = `<div class="truncated padded">${value}</div>`
	},
	nestedHeaders: [
		['label','p1', 'p2','p3','p4','p5','p6']
	],
	collapsibleColumns: [
		{ row: -4, col: 1, collapsible: true },
		{ row: -3, col: 1, collapsible: true },
		{ row: -2, col: 1, collapsible: true },
		{ row: -2, col: 3, collapsible: true }
	],
	mergeCells: [
		{ row: 0, col: 0, rowspan: 1, colspan: 4 },
	],
	columns: getColumnDef(),
	licenseKey: 'non-commercial-and-evaluation'
};
const App = () => {
	const hotTableComponent = useRef(null);
	const [numOfRows, setNumOfRows] = useState(1);
	const [options, setOptions] = useState(hotSettings);
	const [rowDatas, setRowDatas] = useState();
	useEffect(() => {
		async function fetchData() {
			const { rs, fields, genDuration } = await getData(numOfRows);
			// hotSetting
			hotSettings.data = rs;
			hotSettings.collumns = getColumnDef();
			(window).hot = hotTableComponent.current.hotInstance;
			(window).rs = rs;
			hotTableComponent.current.hotInstance.updateSettings(hotSettings);
			// debugger;
			if (timer.timeStart !== 0) {
				timer.timeGDDuration = genDuration;
				console.log('Data generating completed\nTime cost: ' + timer.timeGDDuration + ' ms, new data length is ' + rs.length);
			}
		}
		fetchData();
	}, [numOfRows]);
	const exportBtn = () => {
		// The Handsontable instance is stored under the `hotInstance` property of the wrapper component.
		if (hotTableComponent.current) {
			let hot = hotTableComponent.current.hotInstance;
			let exportPlugin = hot.getPlugin('exportFile');
			hot.batch(() => {
				hot.getPlugin('nestedRows').collapsingUI.expandChildren(0);
				hot.getPlugin('nestedRows').collapsingUI.expandChildren(6);
				hot.getPlugin('nestedRows').collapsingUI.expandChildren(7);
				hot.getPlugin('nestedRows').collapsingUI.expandChildren(8);
				hot.getPlugin('nestedRows').collapsingUI.expandChildren(15);
				hot.getPlugin('nestedRows').collapsingUI.expandChildren(19);
				hot.getPlugin('nestedRows').collapsingUI.expandChildren(23);
				hot.getPlugin('nestedRows').collapsingUI.expandChildren(25);
			})
			exportPlugin.downloadFile('csv', {
				bom: false,
				columnDelimiter: ',',
				columnHeaders: true,
				exportHiddenColumns: true,
				exportHiddenRows: true,
				fileExtension: 'csv',
				filename: 'Handsontable-CSV-file_[YYYY]-[MM]-[DD]',
				mimeType: 'text/csv',
				rowDelimiter: '\r\n',
				rowHeaders: true
			});
		}

	};
	function onUpdateRecords(num) {
		setNumOfRows(num);
	}

	return (
		<div className="handSontabletest">
			<button onClick={exportBtn}>Export</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(-1); }} > Get Org Data</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(50); }} > 50 Nodes</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(200); }} > 200 Nodes</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(10000); }} > 10,000 Nodes</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(100000); }} > 100,000 Nodes</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(1000000); }} > 1M Nodes</button>
			<HotTable id="myHT" ref={hotTableComponent} settings={options}/>
		</div>
	);
};
// export default App;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
render(<App />, document.querySelector('#root'));
