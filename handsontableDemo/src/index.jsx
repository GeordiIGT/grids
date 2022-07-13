import {render} from "react-dom";
import React, { useState, useEffect, useRef } from 'react';
import './handsontable.min.css';
import './styles.css';
import { HotTable, HotColumn } from '@handsontable/react';
import { getData, getColumnDef, getDataInstantly } from './data';
import { registerAllModules } from 'handsontable/registry';
import Handsontable from "handsontable";

registerAllModules();
const timer = { timeStart: 0, timeGDDuration: 0, timeEnd: 0 };
let index;
const App = () => {
	const hotSettings = {
		data: getDataInstantly().rs,
		rowHeaderWidth: 70, 

		columnSorting: true, 
		colWidths: [200], 
		colHeaders: true, 
		nestedRows: true, 
		contextMenu: true, 
		manualColumnResize: true,
		nestedHeaders: [
			//['Node', 'label', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12'],
			[ 'label', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12'],
		],
		collapsibleColumns: [
			{ row: -4, col: 1, collapsible: true }, // Add the button to the 4th-level header of the 1st column - counting from the first table row upwards.
			{ row: -3, col: 5, collapsible: true }, // Add the button to the 3rd-level header of the 5th column - counting from the first table row upwards.
		],
		columns: getColumnDef(),
		hiddenColumns: true,
		// mergeCells: true,
		mergeCells: [
			{ row: 0, col: 0, rowspan: 1, colspan:12 },
			{ row: 5, col: 0, rowspan: 1, colspan:12 },
		],
		// beforeMergeCells: beforeMergeCellsHandler,
		wordWrap: false,
		renderer: function(instance, td, row, col, prop, value, cellProperties) {
			Handsontable.renderers.TextRenderer.apply(this, arguments);
			let className = "truncated";
			if(col === 0 && instance){
				const rowD = instance.getSourceDataAtRow(row);
				// const mytd = td;  //定义这两个变量是因为再浏览器调试模式下，无法再console里访问td和instance这两个传参变量，我只能域定义了他们
				// const myhot = instance;
				if(rowD.hierarchy && rowD.hierarchy.length > 1){
					className = "truncated indent-"+rowD.hierarchy.length;
				}
			}
			td.innerHTML = `<div class='${className}'>${(!!value)?value:""}</div>`;		
		},
		cells: setCellStyles,
		// beforeOnCellMouseOver: cellOnMouseOverHandler,
		// beforeOnCellMouseOut: cellOnMouseOutHandler,
		licenseKey: 'non-commercial-and-evaluation',
		rowHeaders: function () {
			//this function will stop showing hierarchy numbers in the row header area.
			return "";
		},

	};
	const hotTableComponent = useRef(null);
	const [numOfRows, setNumOfRows] = useState(1);
	const [options, setOptions] = useState(hotSettings);
	const [rowDatas, setRowDatas] = useState();

	useEffect(() => {
		async function fetchData() {
			const { rs, fields, genDuration } = await getData(numOfRows);

			hotSettings.data = rs;
			hotSettings.collumns = genColumnDef(fields);
			// fields.unshift('Node', 'Time Series');
			fields.unshift('Time Series');
			fields.push('Percentage %');
			hotSettings.nestedHeaders = [fields];
			window.hot = hotTableComponent.current.hotInstance;
			window.rs = rs;
			// window.mydata = getDataInstant(2).rs;
			// setRowDatas(rs);
			hotTableComponent.current.hotInstance.loadData(rs);
			hotTableComponent.current.hotInstance.updateSettings(hotSettings);
			// debugger;
			if (timer.timeStart !== 0) {
				timer.timeGDDuration = genDuration;
				console.log(
					'Data generating completed\nTime cost: ' + timer.timeGDDuration + ' ms, new data length is ' + rs.length
				);
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
			});
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
				rowHeaders: true,
			});
		}
	};
	function onUpdateRecords(num) {
		setNumOfRows(num);
	}

	function genColumnDef(fields) {
		const columns = [];
		columns.push({ data: 'label' });
		for (let i = 0; i < fields.length; i++) {
			columns.push({ data: 'p' + i });
		}
		columns.push({
			type: 'numeric',
			data: 'percentage',
			renderer: function (instance, td, row, col, prop, value) {
				td.innerHTML = `${value}%`;
			},
		});
		return columns;
	}

	function doAction() {
		alert('Action made')
	}

	function myBtns(instance, td, row, col, prop, value, cellProperties) {
		value = prop;
		Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
		td.innerHTML = `<button class="myBt bt-${row}" onclick="doAction()">button</button>`;
	}

	function setCellStyles(row, col, prop) {
		if (hotTableComponent && hotTableComponent.current) {
			const hotTable = hotTableComponent.current.hotInstance;
			const cell = hotTable.getCell(row, col);
			const { nodeLabel, rowColour } = hotTable.getSourceDataAtRow(row);
			if (cell && rowColour) {
				// debugger;
				// cell.setAttribute('style', 'background-color:'+rowColour);
			}
			// const cellPrp = {};

			// if (col === 0 && nodeLabel === undefined) {
			// 	cellPrp.renderer = myBtns;
			// 	cellPrp.readOnly = true;
			// }
			// return cellPrp;
		}
	}

	function cellOnMouseOverHandler(e, coords, td) {
		if (coords.row < 0) {
			return;
		}
		index = coords.row;
		for (let i = 0; i < this.countCols(); i++) {
			if (coords.col >= 0) {
				this.setCellMeta(index, i, 'className', 'myRow');
			}
		}
		this.render();
	}

	function cellOnMouseOutHandler(e, coords, td) {
		for (let i = 0; i < this.countCols(); i++) {
			if (coords.col >= 0) {
				this.setCellMeta(index, i, 'className', 'myErase');
			}
		}
	}

	function beforeMergeCellsHandler(cellRange,auto) {
		debugger;
	}


	return (
		<div className="handSontabletest">
			<button onClick={exportBtn}>Export</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(-1); }}> Get Org Data</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(50); }} > 50 Nodes </button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(200); }} > 200 Nodes </button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(10000); }} > 10,000 Nodes </button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(100000); }} > 100,000 Nodes </button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(1000000); }} > 1M Nodes </button>
			<HotTable id="myHT" ref={hotTableComponent} settings={options} />
		</div>
	);
};
render(<App />, document.querySelector('#root'));
