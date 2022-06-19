function getData(numOfRows: number) {
    const time1 = new Date().getTime();
    const sample = genANodeData();
    numOfRows = (numOfRows && numOfRows > sample.length) ? Math.ceil(numOfRows) : sample.length;
    const numOfLoops = Math.ceil(numOfRows / sample.length);
    let rs: any = [];
    let counter = 0;
    for (let i = 0; i < numOfLoops; i++) {
        for (const item of sample) {
            // if (item.label.length > 1) {
            const newLabel = item.label.map((name: string) => name + "_" + i);
            rs.push({
                key: i + "" + counter,
                label: newLabel,
                p1: item.p1,
                p2: item.p2,
                p3: item.p3,
                p4: item.p4,
                p5: item.p5,
                p6: item.p6,
                rowColour: (item.rowColour) ? item.rowColour : "",
                rowColourIndex: item.rowColourIndex,
                'percentage': random(100) + "%"
            });
            counter++;
            // }
        }
    }
    const time2 = new Date().getTime();
    // console.log("Data generating cost: " + (time2 - time1) + " milliseconds");
    return { "rs": rs, "genDuration": (time2 - time1) };
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
        },
        {
            label: ["Node", 'SOH'],
            p1: 500,
            p2: 800,
            p3: 800,
            p4: "",
            p5: "",
            p6: "",
            rowColour: "#ffcccc",
            rowColourIndex: 1
        },
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
        {
            label: ["Node", 'Hist 2000'],
            p1: 500,
            p2: 700,
            p3: 800,
            p4: 900,
            p5: 200,
            p6: 300,
            rowColour: "#ccccff",
            rowColourIndex: 2
        },
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
    ];
    return rowData;
}
export default getData;