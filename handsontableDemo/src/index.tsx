import ReactDOM from "react-dom";
import "pikaday/css/pikaday.css";
import "./styles.css";
import { HotTable, HotColumn } from "@handsontable/react";
import { data } from "./constants";
import { ProgressBarRenderer } from "./renderers/ProgressBar";
import { StarsRenderer } from "./renderers/Stars";

import React, { useRef } from 'react';
import { registerAllModules } from 'handsontable/registry';

import {
  drawCheckboxInRowHeaders,
  addClassesToRows,
  changeCheckboxCell,
  alignHeaders
} from "./hooksCallbacks";

import "handsontable/dist/handsontable.min.css";
registerAllModules();
let hotSettings = {
  // data: [
  //   {
  //     category: 'Best Rock Performance',
  //     artist: null,
  //     title: null,
  //     label: null,
  //     score: 50,
  //     __children: [
  //       {
  //         title: 'Don\'t Wanna Fight',
  //         artist: 'Alabama Shakes',
  //         label: 'ATO Records'
  //       },
  //       {
  //         title: 'What Kind Of Man',
  //         artist: 'Florence & The Machine',
  //         label: 'Republic'
  //       },
  //       {
  //         title: 'Something From Nothing',
  //         artist: 'Foo Fighters',
  //         label: 'RCA Records'
  //       },
  //       {
  //         title: 'Ex\'s & Oh\'s',
  //         artist: 'Elle King',
  //         label: 'RCA Records'
  //       },
  //       {
  //         title: 'Moaning Lisa Smile',
  //         artist: 'Wolf Alice',
  //         label: 'RCA Records/Dirty Hit'
  //       }
  //     ]
  //   },
  //   {
  //     category: 'Best Metal Performance',
  //     score: 55,
  //     __children: [
  //       {
  //         title: null,
  //         artist: 'Ghost',
  //         label: null,
  //         __children: [
  //           {
  //             title: 'Ghost',
  //             artist: 'Ghost',
  //             label: 'Republic',
  //             __children: [
  //               {
  //                 title: 'Ghost expl.',
  //                 artist: 'Ghost',
  //                 label: 'Republic',
  //               },
  //               {
  //                 title: 'Ghost radio edition',
  //                 artist: 'Ghost',
  //                 label: 'Republic',
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         title: 'Identity',
  //         artist: 'August Burns Red',
  //         label: 'Fearless Records'
  //       },
  //       {
  //         title: '512',
  //         artist: 'Lamb Of God',
  //         label: 'Epic Records'
  //       },
  //       {
  //         title: 'Thank You',
  //         artist: 'Sevendust',
  //         label: '7Bros Records'
  //       },
  //       {
  //         title: 'Custer',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records'
  //       },
  //     ]
  //   },
  //   {
  //     category: 'Best Rock Song',
  //     score: 35,
  //     __children: [
  //       {
  //         title: 'Don\'t Wanna Fight',
  //         artist: 'Alabama Shakes',
  //         label: 'ATO Records',
  //       },
  //       {
  //         title: 'Ex\'s & Oh\'s',
  //         artist: 'Elle King',
  //         label: 'RCA Records',
  //       },
  //       {
  //         title: 'Hold Back The River',
  //         artist: 'James Bay',
  //         label: 'Republic',
  //       },
  //       {
  //         title: null,
  //         artist: 'Highly Suspect',
  //         label: null,
  //         __children: [
  //           {
  //             title: 'My girl left me',
  //             artist: 'Highly Suspect',
  //             label: 'Republic',
  //           }, {
  //             title: 'Avocado',
  //             artist: 'Highly Suspect',
  //             label: 'Atlantic',
  //           }
  //         ]
  //       },
  //       {
  //         title: 'What Kind Of Man',
  //         artist: 'Florence & The Machine',
  //         label: 'Republic',
  //       },
  //     ]
  //   },
  //   {
  //     category: 'Best Rock Album',
  //     score: 59,
  //     __children: [
  //       {
  //         title: 'Drones',
  //         artist: 'Muse',
  //         label: 'Warner Bros. Records',
  //       }, {
  //         title: null,
  //         artist: 'James Bay',
  //         label: null,
  //         __children: [
  //           {
  //             title: 'Video star',
  //             artist: 'James Bay',
  //             label: 'Warner Bros. Records',
  //           }, {
  //             title: 'Let it go',
  //             artist: 'James Bay',
  //             label: 'Republic',
  //           }, {
  //             title: 'My own',
  //             artist: 'James Bay',
  //             label: 'Atlantic',
  //           }
  //         ]
  //       }, {
  //         title: 'Kintsugi',
  //         artist: 'Death Cab For Cutie',
  //         label: 'Atlantic',
  //       }, {
  //         title: 'Mister Asylum',
  //         artist: 'Highly Suspect',
  //         label: '300 Entertainment',
  //       }, {
  //         title: '.5: The Gray Chapter',
  //         artist: 'Slipknot',
  //         label: 'Roadrunner Records',
  //       }
  //     ]
  //   }
  // ],
  data:[
    {
      orgHierarchy:'Erica Rogers',
      jobTitle: 'CEO',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      __children:[{
        orgHierarchy:'Malcolm Barrett',
      jobTitle: 'Exec. Vice Presiden',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      __children:[{
        orgHierarchy:'Esther Baker',
      jobTitle: 'Director of Operations',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      __children:[{
        orgHierarchy:'Brittany Hanson',
      jobTitle: 'Fleet Coordinator',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      __children:[{
        orgHierarchy:'Leah Flowers',
      jobTitle: 'Parts Technician',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      },{
        orgHierarchy:'Tammy Sutton',
      jobTitle: 'Service Technician',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      }]
      },{
        orgHierarchy:'Derek Paul',
      jobTitle: 'Inventory Control',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      }]
      },{
        orgHierarchy:'Francis Strickland',
      jobTitle: 'VP Sales',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      __children:[{
        orgHierarchy:'Morris Hanson',
      jobTitle: 'Sales Manager',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      },{
        orgHierarchy:'Todd Tyler',
      jobTitle: 'Sales Executive',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      },{
        orgHierarchy:'Bennie Wise',
      jobTitle: 'Sales Executive',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      },{
        orgHierarchy:'Joel Cooper',
      jobTitle: 'Sales Executive',
      employmentType: 'Permanent',
      mon: '1',
      tue:'2',
      wed:'3',
      thu:'4',
      fri:'5',
      sat:'6',
      sun:'7',
      percentage:'50%',
      }]
      }]
      }]
      
    }
  ],
  rowHeaders: true,
  rowHeaderWidth: 70,
  mergeCells: true,
  columnSorting: true,
  colWidths: [200, 200, 200, 200, 100,100,100,100,100,100,100],
  colHeaders: true,
  nestedRows: true,
  contextMenu: true,
  nestedHeaders: [
    ['Main', { label: 'Details', colspan: 4 }, { label: 'Details1', colspan: 4 }],
    ['orgHierarchy', 'jobTitle', 'employmentType', 'mon', 'tue','wed','thu','fri','sat','sun','percentage']
  ],
  collapsibleColumns: [
    { row: -4, col: 1, collapsible: true },
    { row: -3, col: 1, collapsible: true },
    { row: -2, col: 1, collapsible: true },
    { row: -2, col: 3, collapsible: true }
  ],
  columns: [
  	{
    data: 'orgHierarchy'
    },{
    data: 'jobTitle'
    },{
    data: 'employmentType'
    },{
      type: 'numeric',
      data: 'mon',
      // renderer: function (instance, td, row, col, prop, value, cellProperties) {
      //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
      //   if(value){
      //   	td.innerHTML = `${value}%`
      //   }
      // }
    },{
      type: 'numeric',
      data: 'tue',
      // renderer: function (instance, td, row, col, prop, value, cellProperties) {
      //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
      //   if(value){
      //   	td.innerHTML = `${value}%`
      //   }
      // }
    },{
      type: 'numeric',
      data: 'wed',
      // renderer: function (instance, td, row, col, prop, value, cellProperties) {
      //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
      //   if(value){
      //   	td.innerHTML = `${value}%`
      //   }
      // }
    },{
      type: 'numeric',
      data: 'thu',
      // renderer: function (instance, td, row, col, prop, value, cellProperties) {
      //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
      //   if(value){
      //   	td.innerHTML = `${value}%`
      //   }
      // }
    },{
      type: 'numeric',
      data: 'fri',
      // renderer: function (instance, td, row, col, prop, value, cellProperties) {
      //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
      //   if(value){
      //   	td.innerHTML = `${value}%`
      //   }
      // }
    },{
      type: 'numeric',
      data: 'sat',
      // renderer: function (instance, td, row, col, prop, value, cellProperties) {
      //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
      //   if(value){
      //   	td.innerHTML = `${value}%`
      //   }
      // }
    },{
      type: 'numeric',
      data: 'sun',
      // renderer: function (instance, td, row, col, prop, value, cellProperties) {
      //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
      //   if(value){
      //   	td.innerHTML = `${value}%`
      //   }
      // }
    },{
      type: 'numeric',
      data: 'percentage',
      // renderer: function (instance, td, row, col, prop, value, cellProperties) {
      //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
      //   if(value){
      //   	td.innerHTML = `${value}%`
      //   }
      // }
    }
  ],
  licenseKey: 'non-commercial-and-evaluation'
};



const App = () => {
  const hotTableComponent:any = useRef(null);

  // const renderData = (baseData:any) => {
  //   let DDData:any = [];
  //   for(let i = 0; i < 30; i++) {
  //     DDData = DDData.concat(baseData)
  //   }
  //   return DDData;
  // }
  // let newData = renderData(data)

  const exportBtn = () => {
    // The Handsontable instance is stored under the `hotInstance` property of the wrapper component.
    if(hotTableComponent.current) {
      let hot = hotTableComponent.current.hotInstance;
      let exportPlugin = hot.getPlugin('exportFile');
      
      hot.batch(()=>{
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
  const random = (max:number, min:number) => {
    max = max || 100;
    min = min || 0;
    return Math.floor(Math.random() * max) + min;
  }
  const getData = (loopsNum:number = 1) => {
    let result:any = [];
    let newData = hotSettings.data;
    const getChildren = (displayNumber:any,childrenArr:any) => {
      return childrenArr.map((item:any)=>{
        return {
          orgHierarchy: item.orgHierarchy + displayNumber,
          jobTitle: item.jobTitle + displayNumber,
          employmentType: item.employmentType + displayNumber,
          mon: random(100,0),
          tue: random(100,0),
          wed: random(100,0),
          thu: random(100,0),
          fri: random(100,0),
          sat: random(100,0),
          sun: random(100,0),
          percentage: 50,
          __children: item.__children ? getChildren(displayNumber,item.__children) : null
        }
      })
    }
    for(let i = 0; i < loopsNum; i ++) {
      newData.forEach((item)=>{
        let childrenArr:any = [];
        if(item.__children) {
          childrenArr = getChildren(i,item.__children)
        }
        result.push({
          orgHierarchy: item.orgHierarchy + i,
          jobTitle: item.jobTitle + i,
          employmentType: item.employmentType + i,
          mon: random(100,0),
          tue: random(100,0),
          wed: random(100,0),
          thu: random(100,0),
          fri: random(100,0),
          sat: random(100,0),
          sun: random(100,0),
          percentage: 50,
          __children: childrenArr
        })
      })
    }
    return result;
  }
  
  let a:any = getData(3000)
  hotSettings.data = a;
  return (
    <div className="controls">
       <button onClick={exportBtn}>Export</button>
    <HotTable ref={hotTableComponent} settings={hotSettings}/>
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
