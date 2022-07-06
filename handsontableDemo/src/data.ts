export const SELECTED_CLASS = "selected";
export const ODD_ROW_CLASS = "odd";
export const getData = async function (numOfrows: number = 1) {
    const time1 = new Date().getTime();
    let result: any = [];
    let newData = getARow();
    const getChildren = (displayNumber: any, childrenArr: any) => {
        return childrenArr.map((item: any) => {
            return {
                orgHierarchy: item.orgHierarchy + displayNumber,
                jobTitle: item.jobTitle + displayNumber,
                employmentType: item.employmentType + displayNumber,
                mon: random(100, 0),
                tue: random(100, 0),
                wed: random(100, 0),
                thu: random(100, 0),
                fri: random(100, 0),
                sat: random(100, 0),
                sun: random(100, 0),
                percentage: 5,
                __children: item.__children ? getChildren(displayNumber, item.__children) : null
            }
        })
    }
    for (let i = 0; i < numOfrows; i++) {
        newData.forEach((item) => {
            let childrenArr: any = [];
            if (item.__children) {
                childrenArr = getChildren(i, item.__children)
            }
            result.push({
                orgHierarchy: item.orgHierarchy + i,
                jobTitle: item.jobTitle + i,
                employmentType: item.employmentType + i,
                mon: random(100, 0),
                tue: random(100, 0),
                wed: random(100, 0),
                thu: random(100, 0),
                fri: random(100, 0),
                sat: random(100, 0),
                sun: random(100, 0),
                percentage: 5,
                __children: childrenArr
            })
        })
    }
    const time2 = new Date().getTime();
    // console.log("Data generating cost: " + (time2 - time1) + " milliseconds");
    return { rs: result, fields: [], genDuration: time2 - time1 };
};

export const getDataInstant = function (numOfrows: number = 1) {
    const time1 = new Date().getTime();
    let result: any = [];
    let newData = getARow();
    const getChildren = (displayNumber: any, childrenArr: any) => {
        return childrenArr.map((item: any) => {
            return {
                orgHierarchy: item.orgHierarchy + displayNumber,
                jobTitle: item.jobTitle + displayNumber,
                employmentType: item.employmentType + displayNumber,
                mon: random(100, 0),
                tue: random(100, 0),
                wed: random(100, 0),
                thu: random(100, 0),
                fri: random(100, 0),
                sat: random(100, 0),
                sun: random(100, 0),
                percentage: 5,
                __children: item.__children ? getChildren(displayNumber, item.__children) : null
            }
        })
    }
    for (let i = 0; i < numOfrows; i++) {
        newData.forEach((item) => {
            let childrenArr: any = [];
            if (item.__children) {
                childrenArr = getChildren(i, item.__children)
            }
            result.push({
                orgHierarchy: item.orgHierarchy + i,
                jobTitle: item.jobTitle + i,
                employmentType: item.employmentType + i,
                mon: random(100, 0),
                tue: random(100, 0),
                wed: random(100, 0),
                thu: random(100, 0),
                fri: random(100, 0),
                sat: random(100, 0),
                sun: random(100, 0),
                percentage: 5,
                __children: childrenArr
            })
        })
    }
    const time2 = new Date().getTime();
    // console.log("Data generating cost: " + (time2 - time1) + " milliseconds");
    return { rs: result, fields: [], genDuration: time2 - time1 };
};
const random = (max: number, min: number) => {
    max = max || 100;
    min = min || 0;
    return Math.floor(Math.random() * max) + min;
};


function getARow() {
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

    return [
        {
            orgHierarchy: 'Erica Rogers',
            jobTitle: 'CEO',
            employmentType: 'Permanent',
            mon: '1',
            tue: '2',
            wed: '3',
            thu: '4',
            fri: '5',
            sat: '6',
            sun: '7',
            percentage: 50,
            __children: [{
                orgHierarchy: 'Malcolm Barrett',
                jobTitle: 'Exec. Vice Presiden',
                employmentType: 'Permanent',
                mon: '1',
                tue: '2',
                wed: '3',
                thu: '4',
                fri: '5',
                sat: '6',
                sun: '7',
                percentage: 50,
                __children: [{
                    orgHierarchy: 'Esther Baker',
                    jobTitle: 'Director of Operations',
                    employmentType: 'Permanent',
                    mon: '1',
                    tue: '2',
                    wed: '3',
                    thu: '4',
                    fri: '5',
                    sat: '6',
                    sun: '7',
                    percentage: 50,
                    __children: [{
                        orgHierarchy: 'Brittany Hanson',
                        jobTitle: 'Fleet Coordinator',
                        employmentType: 'Permanent',
                        mon: '1',
                        tue: '2',
                        wed: '3',
                        thu: '4',
                        fri: '5',
                        sat: '6',
                        sun: '7',
                        percentage: 50,
                        __children: [{
                            orgHierarchy: 'Leah Flowers',
                            jobTitle: 'Parts Technician',
                            employmentType: 'Permanent',
                            mon: '1',
                            tue: '2',
                            wed: '3',
                            thu: '4',
                            fri: '5',
                            sat: '6',
                            sun: '7',
                            percentage: 50,
                        }, {
                            orgHierarchy: 'Tammy Sutton',
                            jobTitle: 'Service Technician',
                            employmentType: 'Permanent',
                            mon: '1',
                            tue: '2',
                            wed: '3',
                            thu: '4',
                            fri: '5',
                            sat: '6',
                            sun: '7',
                            percentage: 50,
                        }]
                    }, {
                        orgHierarchy: 'Derek Paul',
                        jobTitle: 'Inventory Control',
                        employmentType: 'Permanent',
                        mon: '1',
                        tue: '2',
                        wed: '3',
                        thu: '4',
                        fri: '5',
                        sat: '6',
                        sun: '7',
                        percentage: 50,
                    }]
                }, {
                    orgHierarchy: 'Francis Strickland',
                    jobTitle: 'VP Sales',
                    employmentType: 'Permanent',
                    mon: '1',
                    tue: '2',
                    wed: '3',
                    thu: '4',
                    fri: '5',
                    sat: '6',
                    sun: '7',
                    percentage: 50,
                    __children: [{
                        orgHierarchy: 'Morris Hanson',
                        jobTitle: 'Sales Manager',
                        employmentType: 'Permanent',
                        mon: '1',
                        tue: '2',
                        wed: '3',
                        thu: '4',
                        fri: '5',
                        sat: '6',
                        sun: '7',
                        percentage: 50,
                    }, {
                        orgHierarchy: 'Todd Tyler',
                        jobTitle: 'Sales Executive',
                        employmentType: 'Permanent',
                        mon: '1',
                        tue: '2',
                        wed: '3',
                        thu: '4',
                        fri: '5',
                        sat: '6',
                        sun: '7',
                        percentage: 50,
                    }, {
                        orgHierarchy: 'Bennie Wise',
                        jobTitle: 'Sales Executive',
                        employmentType: 'Permanent',
                        mon: '1',
                        tue: '2',
                        wed: '3',
                        thu: '4',
                        fri: '5',
                        sat: '6',
                        sun: '7',
                        percentage: 50,
                    }, {
                        orgHierarchy: 'Joel Cooper',
                        jobTitle: 'Sales Executive',
                        employmentType: 'Permanent',
                        mon: '1',
                        tue: '2',
                        wed: '3',
                        thu: '4',
                        fri: '5',
                        sat: '6',
                        sun: '7',
                        percentage: 50,
                    }]
                }]
            }]

        }
    ];
}

export const getColumnDef = function () {
    return [
        {
            data: 'orgHierarchy'
        }, {
            data: 'jobTitle'
        }, {
            data: 'employmentType'
        }, {
            data: 'mon',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            type: 'numeric',
            data: 'tue',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'wed',
            // renderer: function (instance:any, td:any, row:any, col:any, prop:any, value:any, cellProperties:any) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'thu',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'fri',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'sat',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            data: 'sun',
            // renderer: function (instance, td, row, col, prop, value, cellProperties) {
            //   Handsontable.renderers.NumericRenderer.apply(this, arguments);
            //   if(value){
            //   	td.innerHTML = `${value}%`
            //   }
            // }
        }, {
            type: 'numeric',
            data: 'percentage',
            renderer: function (instance: any, td: any, row: any, col: any, prop: any, value: any) {
                td.innerHTML = `${value}%`
            }
        }
    ];
};