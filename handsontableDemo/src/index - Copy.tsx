import ReactDOM from "react-dom";
import "pikaday/css/pikaday.css";
import "./styles.css";
import { HotTable, HotColumn } from "@handsontable/react";
import { getData, getColumnDef, getDataInstant } from "./data";
import { ProgressBarRenderer } from "./renderers/ProgressBar";
import { StarsRenderer } from "./renderers/Stars";

import React, { useEffect, useRef, useState } from 'react';
import { registerAllModules } from 'handsontable/registry';

import {
	drawCheckboxInRowHeaders,
	addClassesToRows,
	changeCheckboxCell,
	alignHeaders
} from "./hooksCallbacks";

import "handsontable/dist/handsontable.min.css";
import { func } from "prop-types";
registerAllModules();
const timer = { timeStart: 0, timeGDDuration: 0, timeEnd: 0 };

let hotSettings: {
	data: any,
	rowHeaders: boolean,
	rowHeaderWidth: number,
	mergeCells: boolean,
	columnSorting: boolean,
	colWidths: number[],
	colHeaders: boolean,
	nestedRows: boolean,
	contextMenu: boolean,
	nestedHeaders: any,
	collapsibleColumns: any,
	columns:any,
	licenseKey: string 
} = {
	data: [],
	rowHeaders: true,
	rowHeaderWidth: 70,
	mergeCells: true,
	columnSorting: true,
	colWidths: [200, 200, 200, 200, 100, 100, 100, 100, 100, 100, 100],
	colHeaders: true,
	nestedRows: true,
	contextMenu: true,
	nestedHeaders: [
		['Main', { label: 'Details', colspan: 4 }, { label: 'Details1', colspan: 4 }],
		['orgHierarchy', 'jobTitle', 'employmentType', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'percentage']
	],
	collapsibleColumns: [
		{ row: -4, col: 1, collapsible: true },
		{ row: -3, col: 1, collapsible: true },
		{ row: -2, col: 1, collapsible: true },
		{ row: -2, col: 3, collapsible: true }
	],
	columns: getColumnDef(),
	licenseKey: 'non-commercial-and-evaluation'
};
hotSettings.data = getDataInstant(1);
const App = () => {
	const [numOfRows, setNumOfRows] = useState(1);
	const [options, setOptions] = useState(hotSettings);
	const hotTableComponent: any = useRef(null);
	useEffect(() => {
		async function fetchData() {
			const { rs, fields, genDuration } = await getData(numOfRows);
			// hotSettings.data = rs;
			// setOptions(hotSettings);
			// setOptions({nestedRows: false});
			// setNumOfRows(rs.length);
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


	function onUpdateRecords(num: number) {

	}
	console.log(options);
	return (
		<div className="controls">
			<button onClick={exportBtn}>Export</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(-1); }} > Get Org Data</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(50); }} > 50 Nodes</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(200); }} > 200 Nodes</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(10000); }} > 10,000 Nodes</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(100000); }} > 100,000 Nodes</button>
			<button style={{ marginLeft: '15px' }} onClick={() => { onUpdateRecords(1000000); }} > 1M Nodes</button>
			<HotTable ref={hotTableComponent} settings={options} />
		</div>

		// <HotTable
		//   data={newData}
		//   height={850}
		//   colWidths={[140, 192, 100, 90, 90, 110, 97, 100, 126]}
		//   colHeaders={[
		//     "Company name",
		//     "Name",
		//     "Sell date",
		//     "In stock",
		//     "Qty",
		//     "Progress",
		//     "Rating",
		//     "Order ID",
		//     "Country"
		//   ]}
		//   // nestedHeaders={[
		//   //   ['A', { label: 'B', colspan: 8 }, 'C'],
		//   //   ['D', { label: 'E', colspan: 4 }, { label: 'F', colspan: 4 }, 'G'],
		//   //   ['H', { label: 'I', colspan: 2 }, { label: 'J', colspan: 2 }, { label: 'K', colspan: 2 }, { label: 'L', colspan: 2 }, 'M'],
		//   //   ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
		//   // ]}
		//   // collapsibleColumns={[
		//   //   { row: -2, col: 1, collapsible: true },
		//   //   { row: -3, col: 1, collapsible: true },
		//   //   { row: -2, col: 1, collapsible: true },
		//   //   { row: -2, col: 3, collapsible: true }
		//   // ]}
		//   dropdownMenu={true}
		//   hiddenColumns={{
		//     indicators: true
		//   }}
		//   contextMenu={true}
		//   multiColumnSorting={true}
		//   filters={true}
		//   rowHeaders={true}
		//   afterGetColHeader={alignHeaders}
		//   beforeRenderer={addClassesToRows}
		//   afterGetRowHeader={drawCheckboxInRowHeaders}
		//   afterOnCellMouseDown={changeCheckboxCell}
		//   manualRowMove={true}
		//   licenseKey="non-commercial-and-evaluation"
		//   columns={[{
		//     type: 'numeric',
		//     data: 'Qty',
		//     numericFormat: {
		//       pattern: {
		//         output: 'percent',
		//         mantissa: 0
		//       }
		//     }
		//   } ]}
		// >
		//   <HotColumn data={1} />
		//   <HotColumn data={3} />
		//   <HotColumn data={4} type="date" allowInvalid={false} />
		//   <HotColumn data={6} type="checkbox" className="htCenter" />
		//   <HotColumn data={7} type="numeric" numericFormat={{pattern: {
		//         output: 'percent',
		//         mantissa: 0
		//       }}} />
		//   <HotColumn data={8} readOnly={true} className="htMiddle">
		//     {/* @ts-ignore Element inherits some props. It's hard to type it. */}
		//     <ProgressBarRenderer hot-renderer />
		//   </HotColumn>
		//   <HotColumn data={9} readOnly={true} className="htCenter">
		//     {/* @ts-ignore Element inherits some props. It's hard to type it. */}
		//     <StarsRenderer hot-renderer />
		//   </HotColumn>
		//   <HotColumn data={5} />
		//   <HotColumn data={2} />
		// </HotTable>
	);
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
