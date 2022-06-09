function getData(numOfRows) {

  const sample = genANodeData();
  numOfRows = (numOfRows && numOfRows > sample.length) ? Math.ceil(numOfRows) : sample.length;
  const numOfLoops = Math.ceil(numOfRows / sample.length);
  let rs = [];
  let numOfPermanent = 0;
  let numOfContract = 0;
  let counter;
  for (let i = 0; i < numOfLoops; i++) {
    sample.forEach(item => {
      const newHierarchy = item.orgHierarchy.map(name => name + i);
      // const employmentType = item.employmentType;
      const employmentType = (item.employmentType === 'Permanent') ? item.employmentType + (numOfPermanent++) : item.employmentType + (numOfContract++);
      const monVal = random(100);//(newHierarchy.length>1)?random(100):0;
      rs.push({
        jobTitle: item.jobTitle + i, employmentType: employmentType, orgHierarchy: newHierarchy, 'mon': monVal, 'tue': random(100), 'wed': random(100), 'thu': random(100), 'fri': random(100), 'sat': random(100), 'sun': random(100), 'percentage': "50%"
      });
    })
  }
  console.log("number of Permanent:" + numOfPermanent + ", number of Contract:" + numOfContract);
  return rs;
}

function random(max, min) {
  max = max || 100;
  min = min || 0;
  return Math.floor(Math.random() * max) + min;
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
