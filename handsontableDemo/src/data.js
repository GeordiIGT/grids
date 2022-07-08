// import axios from 'axios';
// import { throwError, throwMapError, POST, PUT, DELETE } from '@libs/api/axiosUtils';
// import { accounting } from '@libs/utils/NumberUtils';
import { cloneDeep } from 'lodash';
export const SELECTED_CLASS = "selected";
export const ODD_ROW_CLASS = "odd";
export const getColumnDef = function () {
    return [
        {
            data: 'label'
        }, {
            data: 'p1'
        }, {
            data: 'p2'
        }, {
            data: 'p3',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'p4',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'p5',
            // renderer: function (instance:any, td:any, row:any, col:any, prop:any, value:any, cellProperties:any) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'p6',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'rowColour',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'rowColourIndex',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            type: 'numeric',
            data: 'percentage',
            renderer: function (instance, td, row, col, prop, value) {
                td.innerHTML = `${value}%`
            }
        }
    ];
};
/************************************************************************************************/
export const getData = async function (numOfRows = 0) {
    const time1 = new Date().getTime();
    numOfRows = numOfRows > 0 ? numOfRows : 10;
    const response = await requeireData(numOfRows);                       
     // const response = await getServerData();
    const { rows: sample, fields } = parseResponse(response);
    let numOfLoops = 1;
    if (numOfRows > sample.length) {
        numOfRows = numOfRows && numOfRows > sample.length ? Math.ceil(numOfRows) : sample.length;
        numOfLoops = Math.ceil(numOfRows / sample.length);
    }
    let rs = [];
    for (let i = 0; i < numOfLoops; i++) {
        sample.forEach((item) => {
            if (numOfLoops === 1) {
                item.percentage = random(100) + '%';
                rs.push(item);
            } else {
                // const newItem = structuredClone(item);
                // const newItem = JSON.parse(JSON.stringify(item));
                const newItem = cloneDeep(item);
                newItem.percentage = random(100) + '%';
                newItem.label = newItem.label + '_' + i;
                newItem.hierarchy = newItem.hierarchy.map((key) => key + '_' + i);
                rs.push(newItem);
            }
        });
    }
    const time2 = new Date().getTime();
    // console.log("Data generating cost: " + (time2 - time1) + " milliseconds");
    return { rs: rs, fields: fields, genDuration: time2 - time1 };
};

function random(max, min) {
    max = max || 100;
    min = min || 0;
    return Math.floor(Math.random() * max) + min;
}

async function requeireData(size) {
    /* const templateId = 1653703;
    const url = '/hehe/api/grid?templateId='+templateId+'&size='+size;
    const nodeIds = [11232503, 11565063];
       
    return axios
        //.get(url)
        .post(url, nodeIds)
        .then((response) => {
            return response.data;
        })
        .catch(throwMapError);
*/
    return getServerData();
}

function parseResponse(resp) {
    let rt;
    let fieldsArray = [];
    let nodeRow = {};
    if (resp.gridValue && resp.gridValue.gridColumns) {
        for (let i = 0; i < resp.gridValue.gridColumns.length; i++) {
            const item = resp.gridValue.gridColumns[i];
            if (i > -1) {
                fieldsArray.push(resp.gridContext.chronology + ' ' + item.title);
            } else {
                fieldsArray.push(resp.gridContext.chronology + '\n' + item.title);
            }
            // nodeRow['p' + i] = '';
        }
        rt = parseAllBlocks(resp.gridValue, nodeRow);
    }
    return { rows: rt, fields: fieldsArray };
}

function parseAllBlocks(nodeResp, nodeRowDef = {}, rtArr = []) {
    if (nodeResp && nodeResp.blocks) {
        const { blocks, gridRows } = nodeResp;
        let counter = 0;
        for (const block of blocks) {
            const { gridRowValues, node } = block;
            const newNodeRow = cloneDeep(nodeRowDef);
            const parentKey = (counter++).toString();
            newNodeRow.label = node.name + ' (' + node.description + ')';
            newNodeRow.startDate = node.startDate;
            newNodeRow.rowColour = '#ffcc66';
            newNodeRow.rowColourIndex = 0;
            newNodeRow.hierarchy = [parentKey];
            rtArr.push(newNodeRow);
            if(gridRowValues.length === gridRows.length){
                for (let j = 0 ; j< gridRowValues.length; j++) {
                    const row = gridRowValues[j].cellValues;
                    const rowDef = gridRows[j];
                    const aRowData = {
                        label: rowDef.title,
                        colourDef:rowDef.rowColor,
                        isPercentage: rowDef.formattingMessage.percent,
                        decimalNumber: rowDef.formattingMessage.decimalNumber,
                        //   label: [...newNodeRow.label, row.title],
                        //   rowColour: '#ffcc66',
                        //   rowColourIndex: 0,
                    };
                    for (let i = 0; i < row.length; i++) {
                        aRowData['p' + i] = row[i].value !== 'NaN' ? row[i].value : '';
                        aRowData.editable = row[i].editable;
                        aRowData.fontColour = row[i].fontColour;
                        aRowData.bgColour = row[i].bgColour;
                        // aRowData['p'+i] = accounting().formatNumber(row.values[i].value,row.formatting.decimalNumber,window.decimalConfig.separ,window.decimalConfig.decpt);
                    }
                    const key = (counter++).toString();
                    aRowData.hierarchy = [parentKey, key];
                    rtArr.push(aRowData);
                }
            }else{
                new Error("Unexpected unequal length of grid row values and row definition");
            }
        }
    }
    return rtArr;
}

function getServerData() {
    const rt = {
        "nodes": [
            {
                "id": 11232503,
                "name": "120706-410_410-14932",
                "description": "PP BIO POMFRB 4*90-SCACHAP-ACCORD Aout-Dec 2021 Ligne 33",
                "startDate": { "value": "2022/21" },
                "timeSeries": [
                    {
                        "key": { "id": 368, "version": 0 },
                        "value": {
                            "timePointRange": {
                                "start": { "value": "2022/21" },
                                "end": { "value": "2022/32" }
                            },
                            "preBlankCount": 0,
                            "values": [
                                110.0,
                                190.0,
                                130.0,
                                140.0,
                                50.0,
                                60.0,
                                70.0,
                                150.0,
                                1.0,
                                3.0,
                                5.0,
                                "NaN"
                            ]
                        }
                    },
                    {
                        "key": { "id": 369, "version": 0 },
                        "value": {
                            "timePointRange": {
                                "start": { "value": "2022/21" },
                                "end": { "value": "2022/32" }
                            },
                            "preBlankCount": 0,
                            "values": [
                                100.0, 100.0, 100.0, 100.0, 100.0, 100.0, 100.0,
                                100.0, 100.0, 100.0, 100.0, 100.0
                            ]
                        }
                    },
                    {
                        "key": { "id": 428, "version": 0 },
                        "value": {
                            "timePointRange": {
                                "start": { "value": "2022/21" },
                                "end": { "value": "2022/32" }
                            },
                            "preBlankCount": 0,
                            "values": [
                                56.0,
                                67.0,
                                76.0,
                                78.0,
                                78.0,
                                66.0,
                                89.0,
                                6.0,
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN"
                            ]
                        }
                    }
                ]
            },
            {
                "id": 11565063,
                "name": "028515-10000_10000-0",
                "description": "MAT CLA POM 8*100 COUP-CARREFOUR ENTREPOT AB 407-Ne pas supprimer - technique : import noeud agg inexistant",
                "startDate": { "value": "2022/21" },
                "timeSeries": [
                    {
                        "key": { "id": 368, "version": 0 },
                        "value": {
                            "timePointRange": {
                                "start": { "value": "2022/21" },
                                "end": { "value": "2022/32" }
                            },
                            "preBlankCount": 0,
                            "values": [
                                11.0, 12.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0,
                                10.0, 10.0, 10.0, 10.0
                            ]
                        }
                    },
                    {
                        "key": { "id": 369, "version": 0 },
                        "value": {
                            "timePointRange": {
                                "start": { "value": "2022/21" },
                                "end": { "value": "2022/32" }
                            },
                            "preBlankCount": 0,
                            "values": [
                                111.0, 112.0, 113.0, 114.0, 115.0, 116.0, 117.0,
                                118.0, 119.0, 120.0, 121.0, 100.0
                            ]
                        }
                    },
                    {
                        "key": { "id": 428, "version": 0 },
                        "value": {
                            "timePointRange": {
                                "start": { "value": "2022/21" },
                                "end": { "value": "2022/32" }
                            },
                            "preBlankCount": 12,
                            "values": [
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN",
                                "NaN"
                            ]
                        }
                    }
                ]
            }
        ],
        "gridContext": {
            "chronology": "Week",
            "fmCalendar": { "workDays": 7, "firstDayOfWeek": "MONDAY" },
            "timePointRange": {
                "start": { "value": "2022/21" },
                "end": { "value": "2022/32" }
            },
            "gridRowConfig": [
                {
                    "index": 0,
                    "title": "Weekly Indistinct Data Storage n°2",
                    "timeSeriesConfig": {
                        "timeSeriesKey": { "id": 369, "version": 0 },
                        "dateRange": {
                            "start": { "value": "2022/21" },
                            "end": { "value": "2022/32" }
                        }
                    },
                    "formatting": { "decimalNumber": 0, "percent": false },
                    "rowColor": {
                        "conditionalFormatting": {
                            "conditionColorItems": [
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                }
                            ],
                            "dimension": 0,
                            "enabled": false,
                            "fromIndex": -1,
                            "fromType": 0,
                            "operator": 0
                        },
                        "defaultLineColor": "rgb(255,255,255)"
                    },
                    "formula": {
                        "formulaType": "NULL",
                        "formulaIndex": {
                            "index1": -1,
                            "index2": -1,
                            "index3": -1
                        },
                        "constantValue": 0.0
                    }
                },
                {
                    "index": 1,
                    "title": "Weekly Indistinct Data Storage n°1",
                    "timeSeriesConfig": {
                        "timeSeriesKey": { "id": 368, "version": 0 },
                        "dateRange": {
                            "start": { "value": "2022/21" },
                            "end": { "value": "2022/32" }
                        }
                    },
                    "formatting": { "decimalNumber": 0, "percent": false },
                    "rowColor": {
                        "conditionalFormatting": {
                            "conditionColorItems": [
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                }
                            ],
                            "dimension": 0,
                            "enabled": false,
                            "fromIndex": -1,
                            "fromType": 0,
                            "operator": 0
                        },
                        "defaultLineColor": "rgb(255,255,255)"
                    },
                    "formula": {
                        "formulaType": "NULL",
                        "formulaIndex": {
                            "index1": -1,
                            "index2": -1,
                            "index3": -1
                        },
                        "constantValue": 0.0
                    }
                },
                {
                    "index": 2,
                    "title": "Weekly Indistinct Data Storage n°1",
                    "timeSeriesConfig": {
                        "timeSeriesKey": { "id": 368, "version": 0 },
                        "dateRange": {
                            "start": { "value": "2022/21" },
                            "end": { "value": "2022/32" }
                        }
                    },
                    "formatting": { "decimalNumber": 0, "percent": true },
                    "rowColor": {
                        "conditionalFormatting": {
                            "conditionColorItems": [
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                }
                            ],
                            "dimension": 0,
                            "enabled": false,
                            "fromIndex": -1,
                            "fromType": 0,
                            "operator": 0
                        },
                        "defaultLineColor": "rgb(255,255,255)"
                    },
                    "formula": {
                        "formulaType": "NULL",
                        "formulaIndex": {
                            "index1": -1,
                            "index2": -1,
                            "index3": -1
                        },
                        "constantValue": 0.0
                    }
                },
                {
                    "index": 3,
                    "title": "Weekly Indistinct Data Storage n°4",
                    "timeSeriesConfig": {
                        "timeSeriesKey": { "id": 428, "version": 0 },
                        "dateRange": {
                            "start": { "value": "2022/21" },
                            "end": { "value": "2022/32" }
                        }
                    },
                    "formatting": { "decimalNumber": 0, "percent": false },
                    "rowColor": {
                        "conditionalFormatting": {
                            "conditionColorItems": [
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                },
                                {
                                    "color": "rgb(255,255,255)",
                                    "locked": false,
                                    "value": ""
                                }
                            ],
                            "dimension": 0,
                            "enabled": false,
                            "fromIndex": -1,
                            "fromType": 0,
                            "operator": 0
                        },
                        "defaultLineColor": "rgb(255,255,255)"
                    },
                    "formula": {
                        "formulaType": "NULL",
                        "formulaIndex": {
                            "index1": -1,
                            "index2": -1,
                            "index3": -1
                        },
                        "constantValue": 0.0
                    }
                }
            ]
        },
        "gridValue": {
            "gridRows": [
                {
                    "title": "Weekly Indistinct Data Storage n°2",
                    "formattingMessage": { "decimalNumber": 0, "percent": false }
                },
                {
                    "title": "Weekly Indistinct Data Storage n°1",
                    "formattingMessage": { "decimalNumber": 0, "percent": false }
                },
                {
                    "title": "Weekly Indistinct Data Storage n°1",
                    "formattingMessage": { "decimalNumber": 0, "percent": true }
                },
                {
                    "title": "Weekly Indistinct Data Storage n°4",
                    "formattingMessage": { "decimalNumber": 0, "percent": false }
                }
            ],
            "gridColumns": [
                { "title": "2022/21" },
                { "title": "2022/22" },
                { "title": "2022/23" },
                { "title": "2022/24" },
                { "title": "2022/25" },
                { "title": "2022/26" },
                { "title": "2022/27" },
                { "title": "2022/28" },
                { "title": "2022/29" },
                { "title": "2022/30" },
                { "title": "2022/31" },
                { "title": "2022/32" }
            ],
            "blocks": [
                {
                    "node": {
                        "id": 11232503,
                        "name": "120706-410_410-14932",
                        "description": "PP BIO POMFRB 4*90-SCACHAP-ACCORD Aout-Dec 2021 Ligne 33",
                        "startDate": null,
                        "timeSeries": null
                    },
                    "gridRowValues": [
                        {
                            "cellValues": [
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 },
                                { "value": 100.0 }
                            ]
                        },
                        {
                            "cellValues": [
                                { "value": 110.0 },
                                { "value": 190.0 },
                                { "value": 130.0 },
                                { "value": 140.0 },
                                { "value": 50.0 },
                                { "value": 60.0 },
                                { "value": 70.0 },
                                { "value": 150.0 },
                                { "value": 1.0 },
                                { "value": 3.0 },
                                { "value": 5.0 },
                                { "value": "NaN" }
                            ]
                        },
                        {
                            "cellValues": [
                                { "value": 110.0 },
                                { "value": 190.0 },
                                { "value": 130.0 },
                                { "value": 140.0 },
                                { "value": 50.0 },
                                { "value": 60.0 },
                                { "value": 70.0 },
                                { "value": 150.0 },
                                { "value": 1.0 },
                                { "value": 3.0 },
                                { "value": 5.0 },
                                { "value": "NaN" }
                            ]
                        },
                        {
                            "cellValues": [
                                { "value": 56.0 },
                                { "value": 67.0 },
                                { "value": 76.0 },
                                { "value": 78.0 },
                                { "value": 78.0 },
                                { "value": 66.0 },
                                { "value": 89.0 },
                                { "value": 6.0 },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" }
                            ]
                        }
                    ]
                },
                {
                    "node": {
                        "id": 11565063,
                        "name": "028515-10000_10000-0",
                        "description": "MAT CLA POM 8*100 COUP-CARREFOUR ENTREPOT AB 407-Ne pas supprimer - technique : import noeud agg inexistant",
                        "startDate": null,
                        "timeSeries": null
                    },
                    "gridRowValues": [
                        {
                            "cellValues": [
                                { "value": 111.0 },
                                { "value": 112.0 },
                                { "value": 113.0 },
                                { "value": 114.0 },
                                { "value": 115.0 },
                                { "value": 116.0 },
                                { "value": 117.0 },
                                { "value": 118.0 },
                                { "value": 119.0 },
                                { "value": 120.0 },
                                { "value": 121.0 },
                                { "value": 100.0 }
                            ]
                        },
                        {
                            "cellValues": [
                                { "value": 11.0 },
                                { "value": 12.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 }
                            ]
                        },
                        {
                            "cellValues": [
                                { "value": 11.0 },
                                { "value": 12.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 },
                                { "value": 10.0 }
                            ]
                        },
                        {
                            "cellValues": [
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" },
                                { "value": "NaN" }
                            ]
                        }
                    ]
                }
            ]
        }
    };
    return new Promise((rs) => {
        setTimeout(function () {
            rs(rt);
        }, 500);
    });
}