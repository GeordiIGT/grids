let counter = 0;
export const resetCounter = ()=>{
    counter = 0;
};
function getData(numOfRows: number) {
    const time1 = new Date().getTime();
    const sample = genANodeData();
    numOfRows = (numOfRows && numOfRows > 7) ? Math.ceil(numOfRows) : 7;
    const numOfLoops = Math.ceil(numOfRows / 7);
    let rs: any = [];
    let counter = 0;
    for (let i = 0; i < numOfLoops; i++) {
        for (const item of sample) {
            // if (item.label.length > 1) {
            rs.push(formatObjRecursively(item, i));
        }
    }
    const time2 = new Date().getTime();
    // console.log("Data generating cost: " + (time2 - time1) + " milliseconds");
    return { "rs": rs, "genDuration": (time2 - time1) };
}

function formatObjRecursively(obj: any, surfix: number) {
    const newLabel = obj.label.map((name: string) => name + "_" + counter);
    const rt = {
        key: surfix + "_" + counter++,
        label: newLabel.pop(),
        p1: obj.p1,
        p2: obj.p2,
        p3: obj.p3,
        p4: obj.p4,
        p5: obj.p5,
        p6: obj.p6,
        rowColour: (obj.rowColour) ? obj.rowColour : "",
        rowColourIndex: obj.rowColourIndex,
        'percentage': random(100) + "%",
        children: [],
    };

    if (obj.children && obj.children.length !== 0) {//has children
        const children = obj.children.map((item: any) => formatObjRecursively(item, surfix));
        if(children !== undefined) rt.children = children;
    }
    return rt;
}

function random(max: number = 100, min: number = 0): number {
    return Math.floor(Math.random() * max) + min;
}

function genANodeData(): any[] {
    var rowData = [
        {
            label: ["Node"],
            p1: "P1",
            p2: "P2",
            p3: "P3",
            p4: "P4",
            p5: "P5",
            p6: "P6",
            rowColour: "#ffcc66",
            rowColourIndex: 0,
            children: [
                {
                    label: ["Node", 'SOH'],
                    p1: 500,
                    p2: 800,
                    p3: 800,
                    p4: "",
                    p5: "",
                    p6: "",
                    rowColour: "#ffcccc",
                    rowColourIndex: 1,
                    children: [
                        {
                            label: ["Node", 'SOH', 'Gross Req'],
                            p1: 200,
                            p2: 300,
                            p3: 200,
                            p4: 300,
                            p5: 200,
                            p6: 100,
                            rowColour: "#ffcccc",
                            rowColourIndex: 1
                        },
                        {
                            label: ["Node", 'SOH', 'Stock Coverage'],
                            p1: 2,
                            p2: 3,
                            p3: 4,
                            p4: '',
                            p5: '',
                            p6: '',
                            rowColour: "#ffcccc",
                            rowColourIndex: 1
                        },
                    ]
                },
                {
                    label: ["Node", 'Hist 2000'],
                    p1: 500,
                    p2: 700,
                    p3: 800,
                    p4: 900,
                    p5: 200,
                    p6: 300,
                    rowColour: "#ccccff",
                    rowColourIndex: 2,
                    children: [
                        {
                            label: ["Node", 'Hist 2000', 'Hist 2001'],
                            p1: 700,
                            p2: 800,
                            p3: 900,
                            p4: 500,
                            p5: 678,
                            p6: 235,
                            rowColour: "#ccccff",
                            rowColourIndex: 2
                        },
                        {
                            label: ["Node", 'Hist 2000', 'Hist 2002'],
                            p1: 565,
                            p2: 5457,
                            p3: 455,
                            p4: 676,
                            p5: 245,
                            p6: 467,
                            rowColour: "#ccccff",
                            rowColourIndex: 2
                        },
                    ],
                },
            ],
        },
    ];
    return rowData;
}


export default getData;