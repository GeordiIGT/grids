import { tasks } from "./demo-data/tree-data";
function getTasks (rowsNumber) {
  let rows = Math.ceil(rowsNumber/7);
  let initId = 0;
  let resultArr = [];
  for(let i = 0; i< rows; i++){
      let nodeParentId,subParentId1,subParentId2;
      tasks.forEach((taskItem)=>{
          initId++;
          if(taskItem.Subject == 'Node 1') {
              nodeParentId = initId
              let a = {
                  "ID": initId,
                  "Owner_ID": 1,
                  "Parent_ID": 0,
                  "Subject": "Node" + i,
                  "percentage": 50,
                  "P1": 'P1',
                  "P2": "P2",
                  "P3": "P3",
                  "P4": "P4",
                  "P5": "P5",
                  "P6": "P6",
                  "P7": "P7",
              };
              resultArr.push(a)
          }
          if(taskItem.Subject == 'SOH') {
              subParentId1 = initId;
              let a = {
                  "ID": initId,
                  "Owner_ID": nodeParentId,
                  "Parent_ID": nodeParentId,
                  "Subject": "SOH" + i,
                  "percentage": random(50),
                  "P1":  random(500),
                  "P2": random(500),
                  "P3": random(500),
                  "P4": random(500),
                  "P5": random(500),
                  "P6": random(500),
                  "P7": random(500),
              };
              resultArr.push(a);
          }
          if(taskItem.Subject == 'GR (Gross requirement)' || taskItem.Subject == 'Stock coverage') {
              let a = {
                  "ID": initId,
                  "Owner_ID": subParentId1,
                  "Parent_ID": subParentId1,
                  "Subject": taskItem.Subject + i,
                  "percentage": random(50),
                  "P1":  random(500),
                  "P2": random(500),
                  "P3": random(500),
                  "P4": random(500),
                  "P5": random(500),
                  "P6": random(500),
                  "P7": random(500),
              };
              resultArr.push(a);
          }
          if(taskItem.Subject == 'Hist 2000') {
              subParentId2 = initId;
              let a = {
                  "ID": initId,
                  "Owner_ID": nodeParentId,
                  "Parent_ID": nodeParentId,
                  "Subject": "Hist 2000" + i,
                  "percentage": random(50),
                  "P1":  random(500),
                  "P2": random(500),
                  "P3": random(500),
                  "P4": random(500),
                  "P5": random(500),
                  "P6": random(500),
                  "P7": random(500),
              };
              resultArr.push(a);
          }
          if(taskItem.Subject == 'Hist 2001' || taskItem.Subject == 'Hist 2002') {
              let a = {
                  "ID": initId,
                  "Owner_ID": subParentId2,
                  "Parent_ID": subParentId2,
                  "Subject": taskItem.Subject + i,
                  "percentage": random(50),
                  "P1":  random(500),
                  "P2": random(500),
                  "P3": random(500),
                  "P4": random(500),
                  "P5": random(500),
                  "P6": random(500),
                  "P7": random(500),
              };
              resultArr.push(a);
          }
      })
  }
     return resultArr;
}

function getData(numOfRows) {
  const time1 = new Date().getTime();
  const sample = genANodeData();
  numOfRows = (numOfRows && numOfRows > sample.length) ? Math.ceil(numOfRows) : sample.length;
  const numOfLoops = Math.ceil(numOfRows / sample.length);
  let rs = [];
  let numOfPermanent = 0;
  let numOfContract = 0;
  let counter = 1;
  for (let i = 0; i < numOfLoops; i++) {
    for (let j = 0; j < sample.length; j++) {
      const item = sample[j];
      // sample.forEach(item => {
      const newHierarchy = item.orgHierarchy.map(name => name + i);
      if (newHierarchy.length > 0) {
        const hierarchy = formatHierarchy(newHierarchy);
        const employmentType = (item.employmentType === 'Permanent') ? item.employmentType + (numOfPermanent++) : item.employmentType + (numOfContract++);
        const monVal = random(100);//(newHierarchy.length>1)?random(100):0;
        hierarchy["EmployeeID"] = counter++;
        hierarchy['jobTitle'] = item.jobTitle + i;
        hierarchy['employmentType'] = employmentType;
        hierarchy['mon'] = monVal;
        hierarchy['tue'] = random(100);
        hierarchy['wed'] = random(100);
        hierarchy['thu'] = random(100);
        hierarchy['fri'] = random(100);
        hierarchy['sat'] = random(100);
        hierarchy['sun'] = random(100);
        hierarchy['percentage'] = "50%";
        rs.push(hierarchy);
      }
    };
  }
  console.log("number of Permanent:" + numOfPermanent + ", number of Contract:" + numOfContract);
  const time2 = new Date().getTime();
  console.log("Data generating cost: " + (time2 - time1) + " milliseconds");
  console.log(rs);
  return rs;
}

function random(max, min) {
  max = max || 100;
  min = min || 0;
  return Math.floor(Math.random() * max) + min;
}

function formatHierarchy(levels) {
  let rt = {};
  for (let i = 0; i < levels.length; i++) {
    rt['level_' + i] = levels[i];
  }
  return rt;
}

function genANodeData() {
  var rowData = [
    {
      orgHierarchy: ['Erica Rogers'],
      jobTitle: 'CEO',
      employmentType: 'Permanent',
    },
    {
      orgHierarchy: ['Erica Rogers', 'Malcolm Barrett'],
      jobTitle: 'Exec. Vice President',
      employmentType: 'Permanent',
    },

    {
      orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker'],
      jobTitle: 'Director of Operations',
      employmentType: 'Permanent',
    },
    {
      orgHierarchy: [
        'Erica Rogers',
        'Malcolm Barrett',
        'Esther Baker',
        'Brittany Hanson',
      ],
      jobTitle: 'Fleet Coordinator',
      employmentType: 'Permanent',
    },
    {
      orgHierarchy: [
        'Erica Rogers',
        'Malcolm Barrett',
        'Esther Baker',
        'Brittany Hanson',
        'Leah Flowers',
      ],
      jobTitle: 'Parts Technician',
      employmentType: 'Contract',
    },
    {
      orgHierarchy: [
        'Erica Rogers',
        'Malcolm Barrett',
        'Esther Baker',
        'Brittany Hanson',
        'Tammy Sutton',
      ],
      jobTitle: 'Service Technician',
      employmentType: 'Contract',
    },
    {
      orgHierarchy: [
        'Erica Rogers',
        'Malcolm Barrett',
        'Esther Baker',
        'Derek Paul',
      ],
      jobTitle: 'Inventory Control',
      employmentType: 'Permanent',
    },

    {
      orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland'],
      jobTitle: 'VP Sales',
      employmentType: 'Permanent',
    },
    {
      orgHierarchy: [
        'Erica Rogers',
        'Malcolm Barrett',
        'Francis Strickland',
        'Morris Hanson',
      ],
      jobTitle: 'Sales Manager',
      employmentType: 'Permanent',
    },
    {
      orgHierarchy: [
        'Erica Rogers',
        'Malcolm Barrett',
        'Francis Strickland',
        'Todd Tyler',
      ],
      jobTitle: 'Sales Executive',
      employmentType: 'Contract',
    },
    {
      orgHierarchy: [
        'Erica Rogers',
        'Malcolm Barrett',
        'Francis Strickland',
        'Bennie Wise',
      ],
      jobTitle: 'Sales Executive',
      employmentType: 'Contract',
    },
    {
      orgHierarchy: [
        'Erica Rogers',
        'Malcolm Barrett',
        'Francis Strickland',
        'Joel Cooper',
      ],
      jobTitle: 'Sales Executive',
      employmentType: 'Permanent',
    },
  ];
  return rowData;
}


export default getTasks;